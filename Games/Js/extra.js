const fs = require('fs');
const path = require('path');

const cooldowns = new Map();
const pendingPpt = new Map();
const pendingAdivina = new Map();

const retos = [
  'Haz una imitación de Akame durante 10 segundos. 🩸',
  'Escribe en el grupo una frase dramática como si fueras parte de Night Raid. ⚔️',
  'Menciona a alguien y dile que hoy tiene la misión de hacerte reír. 😂',
  'Envía un sticker que represente tu estado actual. 🎭',
  'Di cuál sería tu nombre en Night Raid. 🗡️',
  'Cuenta una pequeña anécdota graciosa del día. ✨',
  'Escribe tres cosas que llevarías a una misión peligrosa. 🎒',
  'Haz una rima con el nombre de Akame. 🩸'
];

const verdades = [
  '¿Cuál ha sido tu momento más vergonzoso en un grupo? 😳',
  '¿Qué personaje de anime te representa más y por qué?',
  '¿Cuál es el juego del bot que más te gusta?',
  '¿Qué harías si Akame te asignara una misión imposible?',
  '¿Cuál es tu mayor manía cuando estás en un grupo?',
  '¿Qué comida nunca compartirías con nadie? 🍜',
  '¿Cuál es el último anime que viste?',
  '¿Qué superpoder elegirías para una misión de Night Raid?'
];

function ahora() { return Date.now(); }

function puedeUsar(key, ms) {
  const ultimo = cooldowns.get(key) || 0;
  const restante = ms - (ahora() - ultimo);
  if (restante > 0) return Math.ceil(restante / 1000);
  cooldowns.set(key, ahora());
  return 0;
}

function elegir(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function cargarPreguntas() {
  const file = path.join(process.cwd(), 'Games', 'Json', 'cuestions.json');
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(data) ? data.filter(v => v && v.pregunta && (v.respuesta || v.respusta)) : [];
  } catch {
    return [];
  }
}

function iniciarAdivina(chat) {
  const preguntas = cargarPreguntas();
  if (!preguntas.length) return null;
  const pregunta = elegir(preguntas);
  const respuesta = String(pregunta.respuesta || pregunta.respusta).trim();
  const reto = {
    pregunta: String(pregunta.pregunta).trim(),
    respuesta,
    creado: ahora(),
    timeout: setTimeout(() => pendingAdivina.delete(chat), 90000)
  };
  pendingAdivina.set(chat, reto);
  return reto.pregunta;
}

function normalizar(valor = '') {
  return String(valor)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function procesarMensajeJuego(conn, from, sender, body, isGroup, info) {
  if (!body || body.startsWith('.') || body.startsWith('/') || body.startsWith('#') || body.startsWith('!') || body.startsWith('?') || body.startsWith('*') || body.startsWith('•')) {
    return false;
  }

  const texto = normalizar(body);
  if (!isGroup && !['piedra', 'papel', 'tijera'].includes(texto)) return false;

  // Aceptar/rechazar un duelo pendiente. Puede hacerse respondiendo
  // al mensaje de Akame o escribiendo aceptar/rechazar directamente.
  if (isGroup && ['aceptar', 'rechazar'].includes(texto)) {
    let retoKey = null;
    let reto = null;
    for (const [key, value] of pendingPpt.entries()) {
      if (!value?.retador) continue;
      if (value.chat !== from) continue;
      const objetivos = [value.objetivo, ...(value.objetivos || [])].filter(Boolean);
      if (objetivos.includes(sender) || (value.jugadores || []).includes(sender)) {
        retoKey = key;
        reto = value;
        break;
      }
    }
    if (!reto) return false;
    clearTimeout(reto.timeout);
    pendingPpt.delete(retoKey);

    if (texto === 'rechazar') {
      await conn.sendMessage(reto.chat, {
        text: `⚔️ @${sender.split('@')[0]} rechazó el duelo de @${reto.retador.split('@')[0]}.`,
        mentions: [sender, reto.retador]
      }, { quoted: info });
      return true;
    }

    reto.estado = {
      jugadores: [reto.retador, sender],
      elecciones: {},
      timeout: setTimeout(() => {
        pendingPpt.delete(reto.chat);
        conn.sendMessage(reto.chat, { text: '⏳ *Duelo cancelado:* nadie completó la jugada a tiempo.' }).catch(() => {});
      }, 90000)
    };
    pendingPpt.set(reto.chat, reto.estado);

    await conn.sendMessage(reto.chat, {
      text: `✊ *DUELO ACEPTADO*\n\n@${reto.retador.split('@')[0]} y @${sender.split('@')[0]}: revisen sus privados. Akame les pedirá la jugada.\n\nEl duelo durará 90 segundos.`,
      mentions: [reto.retador, sender]
    }, { quoted: info });
    const instrucciones = `🩸 *DUELO DE AKAME*\n\nHola. Estás participando en un duelo de Piedra, Papel o Tijera.\n\nDebes responder con una sola de estas opciones:\n✊ *piedra*\n🖐️ *papel*\n✌️ *tijera*\n\n⏱️ Tienes 90 segundos.`;
    await conn.sendMessage(reto.retador, { text: instrucciones }).catch(() => {});
    await conn.sendMessage(sender, { text: instrucciones }).catch(() => {});
    return true;
  }

  // Resolver elecciones privadas de un duelo.
  if (['piedra', 'papel', 'tijera'].includes(texto)) {
    for (const [chat, partida] of pendingPpt.entries()) {
      const idsPartida = [...(partida?.jugadores || []), ...(partida?.objetivos || [])];
      if (!idsPartida.includes(sender)) continue;
      partida.elecciones[sender] = texto;
      if (Object.keys(partida.elecciones).length < 2) {
        await conn.sendMessage(sender, { text: '✅ Jugada recibida. Espera a tu rival.' }).catch(() => {});
        return true;
      }

      clearTimeout(partida.timeout);
      pendingPpt.delete(chat);
      const [a, b] = partida.jugadores;
      const j1 = partida.elecciones[a];
      const j2 = partida.elecciones[b];
      const resultado = evaluarPpt(j1, j2);
      let mensaje = `✊🖐️✌️ *PIEDRA, PAPEL O TIJERA*\n\n@${a.split('@')[0]}: *${j1}*\n@${b.split('@')[0]}: *${j2}*\n\n`;
      if (resultado === 'empate') mensaje += '🤝 *Empate.* Nadie pierde.';
      else {
        const ganador = resultado === 'gana1' ? a : b;
        mensaje += `🏆 *Ganador:* @${ganador.split('@')[0]}\n🩸 Akame: «Buen duelo. La misión continúa.»`;
      }
      await conn.sendMessage(chat, { text: mensaje, mentions: [a, b] });
      return true;
    }
  }

  // Resolver una adivinanza pendiente.
  // SOLO se procesa si el usuario responde directamente al mensaje exacto
  // de la adivinanza enviado por Akame. Así los mensajes normales del grupo
  // nunca generan respuestas ni spam.
  const adiv = pendingAdivina.get(from);
  const quotedId = info?.message?.extendedTextMessage?.contextInfo?.stanzaId
    || info?.message?.imageMessage?.contextInfo?.stanzaId
    || info?.message?.videoMessage?.contextInfo?.stanzaId
    || info?.message?.documentMessage?.contextInfo?.stanzaId
    || info?.message?.conversation?.contextInfo?.stanzaId;

  const respondeAdivina = Boolean(
    adiv &&
    adiv.messageId &&
    quotedId &&
    String(quotedId) === String(adiv.messageId)
  );

  if (respondeAdivina && texto && ahora() - adiv.creado < 90000) {
    if (texto === normalizar(adiv.respuesta)) {
      clearTimeout(adiv.timeout);
      pendingAdivina.delete(from);
      await conn.sendMessage(from, {
        text: `🎯 *¡RESPUESTA CORRECTA!*\n\n@${sender.split('@')[0]} descubrió la respuesta: *${adiv.respuesta}*.\n\n🩸 Akame: «Misión cumplida.»`,
        mentions: [sender]
      }, { quoted: info });
      return true;
    }

    await conn.sendMessage(from, {
      text: `❌ *INCORRECTO*\n\n@${sender.split('@')[0]}, esa no es la respuesta. Sigue intentando mientras la misión siga activa.`,
      mentions: [sender]
    }, { quoted: info });
    return true;
  }

  return false;
}

function tienePvpActivo(sender) {
  if (!sender) return false;
  const normal = String(sender).split(':')[0].toLowerCase();
  const numero = normal.split('@')[0].replace(/\D/g, '');
  for (const partida of pendingPpt.values()) {
    const jugadores = [partida?.retador, partida?.objetivo, ...(partida?.objetivos || []), ...(partida?.jugadores || [])].filter(Boolean);
    if (jugadores.some(j => {
      const n = String(j).split(':')[0].toLowerCase();
      return n === normal || (numero && n.split('@')[0].replace(/\D/g, '') === numero);
    })) return true;
  }
  return false;
}

function evaluarPpt(a, b) {
  if (a === b) return 'empate';
  if ((a === 'piedra' && b === 'tijera') || (a === 'tijera' && b === 'papel') || (a === 'papel' && b === 'piedra')) return 'gana1';
  return 'gana2';
}

async function iniciarPpt(conn, from, sender, objetivo, info, identificadoresObjetivo = []) {
  const cooldown = puedeUsar(`ppt:${sender}`, 20000);
  if (cooldown) return `⏳ Espera ${cooldown}s antes de iniciar otro duelo.`;

  if (!objetivo) {
    return '✊🖐️✌️ *PIEDRA, PAPEL O TIJERA*\n\nUsa `.ppt piedra`, `.ppt papel` o `.ppt tijera` para jugar contra Akame.\nUsa `.ppt @usuario` para desafiar a otra persona.';
  }

  if (!objetivo.includes('@')) {
    const jugada = normalizar(objetivo);
    if (!['piedra', 'papel', 'tijera'].includes(jugada)) {
      return '🩸 Usa `.ppt piedra`, `.ppt papel` o `.ppt tijera`.';
    }
    const bot = elegir(['piedra', 'papel', 'tijera']);
    const resultado = evaluarPpt(jugada, bot);
    const texto = resultado === 'empate'
      ? '🤝 *Empate.*'
      : resultado === 'gana1'
        ? '🏆 *Ganaste el duelo contra Akame.*'
        : '💀 *Akame ganó el duelo.*';
    return `✊🖐️✌️ *PIEDRA, PAPEL O TIJERA*\n\nTú: *${jugada}*\nAkame: *${bot}*\n\n${texto}`;
  }

  const idsObjetivo = [...new Set([objetivo, ...(Array.isArray(identificadoresObjetivo) ? identificadoresObjetivo : [])].filter(Boolean))];
  const clave = `${from}:${objetivo}`;
  if (pendingPpt.has(clave)) return '⚠️ Ese usuario ya tiene un duelo pendiente en este grupo.';
  const timeout = setTimeout(() => pendingPpt.delete(clave), 60000);
  pendingPpt.set(clave, { retador: sender, objetivo, objetivos: idsObjetivo, chat: from, timeout });
  return `⚔️ *DESAFÍO DE NIGHT RAID*\n\n@${sender.split('@')[0]} desafía a @${objetivo.split('@')[0]} a Piedra, Papel o Tijera.\n\nEscribe *aceptar* o *rechazar* para responder al desafío.`;
}

function iniciarAdivinaJuego(from, sender) {
  const cooldown = puedeUsar(`adivina:${sender}`, 15000);
  if (cooldown) return { error: `⏳ Espera ${cooldown}s antes de iniciar otra adivinanza.` };
  if (pendingAdivina.has(from)) return { error: '🧩 Ya hay una adivinanza activa en este grupo. Responde la actual antes de iniciar otra.' };
  const pregunta = iniciarAdivina(from);
  if (!pregunta) return { error: '⚠️ No pude cargar las preguntas del juego.' };
  return { text: `🧩 *ADIVINANZA DE AKAME*\n\n❓ ${pregunta}\n\nResponde directamente en el grupo. Tienes *90 segundos*.` };
}

function obtenerReto() {
  return elegir(retos);
}

function obtenerVerdad() {
  return elegir(verdades);
}

function marcarMensajeAdivina(chat, messageId) {
  const partida = pendingAdivina.get(chat);
  if (partida) partida.messageId = messageId;
}

module.exports = {
  puedeUsar,
  iniciarPpt,
  iniciarAdivinaJuego,
  procesarMensajeJuego,
  marcarMensajeAdivina,
  obtenerReto,
  obtenerVerdad,
  tienePvpActivo
};
