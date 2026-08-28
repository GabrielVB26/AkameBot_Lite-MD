// AkameBot-MD 

// refugio de Night Raid

// Hecho en venezuela

// Sígueme en todas mis redes para estar informados con las novedades de la base

// Propietario: Gabriel-V 🩸

//Modulos
const { default: makeWASocket,
  DisconnectReason, JulsBotIncConnect, getAggregateVotesInPollMessage, delay, makeCacheableSignalKeyStore, useMultiFileAuthState,
 fetchLatestBaileysVersion, 
 generateForwardMessageContent,
 prepareWAMessageMedia, 
 generateWAMessageFromContent, 
 generateMessageID,
  downloadContentFromMessage, 
  jidDecode,
   proto } = require("baileys")
const fs = require('fs')
const path = require('path')

// Rutas de datos de moderación. Deben existir antes de registrar eventos de WhatsApp.
const moderacionPath = './settings/Grupo/Json/moderacion.json';
const roboPath = './settings/Grupo/Json/robo.json';
const mutePath = './settings/Grupo/Json/mute.json';
const antifalsosPath = './settings/Grupo/Json/antifalsos.json';
const autoaceptarPath = './settings/Grupo/Json/autoaceptar.json';
const antispamPath = './settings/Grupo/Json/antispam.json';
const invitacionesPath = './settings/Grupo/Json/invitaciones.json';
const antilinkAvisosPath = './settings/Grupo/Json/antilink_avisos.json';

for (const [file, initial] of [
  [mutePath, { groups: {} }],
  [antifalsosPath, { groups: {} }],
  [autoaceptarPath, { groups: {} }],
  [antispamPath, { groups: {} }],
  [invitacionesPath, { pending: {} }],
  [antilinkAvisosPath, { groups: {} }]
]) {
  if (!fs.existsSync(file)) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(initial, null, 2));
  }
}
const { Boom } = require('@hapi/boom')
const NodeCache = require("node-cache")
const readline = require("readline")
const PhoneNumber = require('awesome-phonenumber')
const cfonts = require('cfonts');
const pino = require('pino')
const util = require("util")
const speed = require("performance-now");
const mimetype = require('mime-types')
const { exec, spawn, execSync } = require("child_process")
let phoneNumber = "5199999999"; // cambiar número
const axios = require("axios")

//color
const chalk = require('chalk')
const color = (text, color) => { return !color ? chalk.green(text) : chalk.keyword(color)(text) };
 
 //baner
const banner = cfonts.render("AKAME| BOT", {
  font: 'pallet',
  align: 'center',
  colors: ["blue"]
})
      
const {getExtension, getRandom } =require('./fuction/settings/fuctions.js')

 //Stickers (Calcomanías digitales)
const { sendVideoAsSticker, sendImageAsSticker } = require('./fuction/sticker/rename.js');
const { sendVideoAsSticker2, sendImageAsSticker2 } = require('./fuction/sticker/rename2.js');

;
 
 //Grupos js
const { MoneyOfSender, addkoin, delkoin, AddReg, checkOfReg , addLevel, addXp,levelOfsender , xpOfsender ,checkOfRegM ,addkoinM , delkoinM , MoneyOfM,Rxp, addRxp ,addRep , delRep , repUser  } = require('./settings/Grupo/Js/reg.js')
     
           // GAMES
const  { addClaim , checkClaim , timeClaim ,expiredClaim } = require('./Games/Js/claim.js')
const { checkCasino,checkAttp,checkEmoji,checkEve, addClaimTraga, checkClaimTraga, timeClaimTraga, checkRuleta,checkMinar,addCasino,addAttp,addEmoji,addEve,addRuleta ,addMinar,expiredCasino,expiredMinar,expiredAttp,expiredEmoji,expiredEve,expiredRuleta,timeAttp,timeEmoji,timeEve,timeRuleta,timeMinar,timeCasino,expiredDayli,JsonDayli,addDayli,timeDayli,checkDayli,checkPescar,timePescar,addPescar,expiredPescar}
 = require('./Games/Js/mining.js')


      
    // Menu bot js
const Menu = require ('./settings/Bot/Js/menu.js')
const { obtenerFeature, establecerFeature } = require('./fuction/auto.js')
const {
  puedeUsar,
  iniciarPpt,
  iniciarAdivinaJuego,
  procesarMensajeJuego,
  marcarMensajeAdivina,
  obtenerReto,
  obtenerVerdad,
  tienePvpActivo
} = require('./Games/Js/extra.js')

 //configurar ggrupos
const welkom = JSON.parse(fs.readFileSync('./settings/Grupo/Json/welkom.json')) 
// Antilink: activo por defecto en todos los grupos.
// Se conserva el formato antiguo (array) y las desactivaciones nuevas se guardan en "disabled".
const antilinkPath = './settings/Grupo/Json/antilink.json';
function cargarConfigAntilink() {
  try {
    const raw = JSON.parse(fs.readFileSync(antilinkPath, 'utf8'));
    if (Array.isArray(raw)) return { enabled: raw, disabled: [] };
    return {
      enabled: Array.isArray(raw?.enabled) ? raw.enabled : [],
      disabled: Array.isArray(raw?.disabled) ? raw.disabled : []
    };
  } catch {
    return { enabled: [], disabled: [] };
  }
}
function guardarConfigAntilink(data) {
  fs.mkdirSync(path.dirname(antilinkPath), { recursive: true });
  fs.writeFileSync(antilinkPath, JSON.stringify({
    enabled: [...new Set(data.enabled || [])],
    disabled: [...new Set(data.disabled || [])]
  }, null, 2) + '\n');
}
function antiLinkActivo(grupo) {
  const cfg = cargarConfigAntilink();
  return !cfg.disabled.includes(grupo); // ON de fábrica; solo OFF explícito lo desactiva.
}
function contieneEnlaceWhatsApp(texto = '') {
  const t = String(texto).replace(/[\u200B-\u200D\uFEFF]/g, '').toLowerCase();
  return [
    /(?:https?:\/\/)?(?:www\.)?chat\.whatsapp\.com(?:[\/?#:\s]|$)/i,
    /(?:https?:\/\/)?(?:www\.)?wa\.me(?:[\/?#:\s]|$)/i,
    /(?:https?:\/\/)?(?:www\.)?api\.whatsapp\.com(?:[\/?#:\s]|$)/i,
    /(?:https?:\/\/)?(?:www\.)?whatsapp\.com\/(?:channel|invite|groups?|send)(?:[\/?#:\s]|$)/i
  ].some(re => re.test(t));
}
let bngp = JSON.parse(fs.readFileSync('./settings/Grupo/Json/grupo.json'))
const antiprivadoPath = './settings/Grupo/Json/chat.json';

function cargarAntiprivado() {
  try {
    const raw = JSON.parse(fs.readFileSync(antiprivadoPath, 'utf8'));
    if (Array.isArray(raw)) {
      return { activo: raw.includes('activo'), avisados: [] };
    }
    return { activo: raw?.activo === true, avisados: Array.isArray(raw?.avisados) ? raw.avisados : [] };
  } catch {
    return { activo: false, avisados: [] };
  }
}

function guardarAntiprivado(data) {
  fs.mkdirSync(path.dirname(antiprivadoPath), { recursive: true });
  fs.writeFileSync(antiprivadoPath, JSON.stringify({
    activo: data.activo === true,
    avisados: Array.isArray(data.avisados) ? [...new Set(data.avisados)] : []
  }, null, 2));
}
const registro = JSON.parse(fs.readFileSync('./settings/Grupo/Json/registros.json')) 
const Exportion = JSON.parse(fs.readFileSync('./Games/Json/exportion.json'))
const Exportion1 = JSON.parse(fs.readFileSync('./Games/Json/Exportion1.json'))
const Cuestions = JSON.parse(fs.readFileSync('./Games/Json/cuestions.json'))
              
   // 𝚃𝙸𝙼𝙴
const moment = require("moment-timezone") 
const time = moment.tz('America/Caracas').format('DD/MM HH:mm:ss')
const horap = moment().format('HH')
var timeFt ='Saludos 🩸'
if (horap >= '01' && horap <= '05') {
  timeFt = '𝘽𝙪𝙚𝙣𝙤𝙨 𝙙𝙞𝙖𝙨 🩸'
} else if (horap >= '05' && horap <= '12') {
  timeFt = '𝘽𝙪𝙚𝙣𝙤𝙨 𝙙𝙞𝙖𝙨 ☀️'
} else if (horap >= '12' && horap <= '18') {
  timeFt = '𝘽𝙪𝙚𝙣𝙖𝙨 𝙩𝙖𝙧𝙙𝙚𝙨 ⛅'
} else if (horap >= '18' && horap <= '23') {
  timeFt = '𝙗𝙪𝙚𝙣𝙖𝙨 𝙣𝙤𝙘𝙝𝙚𝙨 🌑'
}



 //Configuraciones 
var { creador, owner, Bot, JpgBot } = require("./settings/settings.json");

// Imágenes oficiales del bot: menú, bienvenida y registro.
// Se selecciona una al azar para evitar repetir siempre la misma.
const BOT_IMAGES = [
  "https://i.postimg.cc/y8y5hJjS/a1ab5cc1d621061308dec1aab68131fe.jpg",
  "https://i.postimg.cc/L66mZp20/69524701dbfe8aa48279cf7e0412219c.jpg",
  "https://i.postimg.cc/GtY2cnPj/36f08b27de4b0fdc4ec4c3054f8527c6.jpg"
];

const getBotImage = () => BOT_IMAGES[Math.floor(Math.random() * BOT_IMAGES.length)];        
const prefixo = ['.', '#', '/', '!', '?', '*', '•']; // Prefijos compatibles de AkameBot_Lite-MD



const pairingCode = true;

const useMobile = process.argv.includes("--mobile")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

function getGroupAdmins(participants) {
admins = []
for (let i of participants) {
if(i.admin == 'admin') admins.push(i.id)
if(i.admin == 'superadmin') admins.push(i.id)
}
return admins
}

// ===================== AKAMEBOT: UTILIDADES COMPARTIDAS =====================
// Estas funciones viven fuera de messages.upsert porque también las usan
// los eventos de solicitudes de ingreso y de participantes.
const removeAccents = (str = '') => String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const AUTOACEPTAR_ARAB_COUNTRY_CODES = new Set([
  '20','212','213','216','218','222','249','252','253','269',
  '961','962','963','964','965','966','967','968','970','971','972','973','974',
  '975','976','977','978','979','990','991','992','993','994','995','996','998'
]);

function normalizarJid(jid) {
  return String(jid || '').split(':')[0].trim().toLowerCase();
}

function mismoJid(a, b) {
  const A = normalizarJid(a);
  const B = normalizarJid(b);
  if (!A || !B) return false;
  if (A === B) return true;
  const [aId, aType] = A.split('@');
  const [bId, bType] = B.split('@');
  if (aType === 'lid' || bType === 'lid') return false;
  if (aType !== 's.whatsapp.net' || bType !== 's.whatsapp.net') return false;
  return aId.replace(/\D/g, '') === bId.replace(/\D/g, '');
}

function cargarJsonSimple(filePath, inicial) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(inicial, null, 2) + '\n');
      return JSON.parse(JSON.stringify(inicial));
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.log(`[AKAME JSON] ${filePath}: ${e.message}`);
    return JSON.parse(JSON.stringify(inicial));
  }
}

function guardarJsonSimple(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

// Las protecciones principales vienen activadas de fábrica.
// Un grupo solo las desactiva cuando guarda explícitamente false.
function funcionActivaPorDefecto(filePath, grupo, defecto = true) {
  const data = cargarJsonSimple(filePath, { groups: {} });
  const valor = data?.groups?.[grupo];
  return typeof valor === 'boolean' ? valor : defecto;
}

function esAdminFlexible(sock, listaDeAdmins = []) {
  if (!sock?.authState?.creds?.me) return false;

  const botId = sock.authState.creds.me.id;
  const botLid = sock.authState.creds.me.lid;

  const clean = (jid) => jid?.split(':')[0];

  return listaDeAdmins.some(adminJid => {
    const adminRefugio = clean(adminJid);
    return (
      adminJid === botId ||
      adminJid === botLid ||
      adminJid === botId.replace(/:\d+/, '') ||
      adminJid === botLid.replace(/:\d+/, '') ||
      adminRefugio === clean(botId) ||
      adminRefugio === clean(botLid)
    );
  });
}

function obtenerMiembroPorIdentidad(miembros, jid) {
  return (miembros || []).find(p =>
    mismoJid(p?.id, jid) || mismoJid(p?.lid, jid) || mismoJid(p?.phoneNumber, jid)
  );
}

function obtenerMencionado(info) {
  const context = info?.message?.extendedTextMessage?.contextInfo
    || info?.message?.contextInfo
    || null;
  if (context?.mentionedJid?.length) return context.mentionedJid[0];
  if (context?.participant) return context.participant;
  return null;
}

function obtenerMencionExplicita(info) {
  const context = info?.message?.extendedTextMessage?.contextInfo
    || info?.message?.contextInfo
    || null;
  return context?.mentionedJid?.[0] || null;
}

function obtenerObjetivo(info, argumento, miembros = []) {
  const citado = obtenerMencionado(info);
  if (citado) return citado;
  const mencionado = obtenerMencionExplicita(info);
  if (mencionado) return mencionado;
  const numero = String(argumento || '').replace(/[^0-9]/g, '');
  if (!numero) return null;
  const encontrado = miembros.find(p => [p?.id, p?.lid, p?.phoneNumber].filter(Boolean).some(id => {
    const raw = String(id).split('@')[0].split(':')[0].replace(/[^0-9]/g, '');
    return raw === numero;
  }));
  return encontrado?.id || encontrado?.lid || `${numero}@s.whatsapp.net`;
}

function esObjetivoValido(jid) {
  return typeof jid === 'string' && /@(s\.whatsapp\.net|lid)$/.test(jid);
}

function esNumeroArab(jid) {
  const value = String(jid || '').trim().toLowerCase();
  if (value.endsWith('@lid')) return false;
  if (!value.endsWith('@s.whatsapp.net')) return true;
  const raw = value.split('@')[0].split(':')[0].replace(/\D/g, '');
  if (!raw || raw.length < 7 || raw.length > 15) return true;
  return [...AUTOACEPTAR_ARAB_COUNTRY_CODES].some(code => raw.startsWith(code));
}

// AUTOACEPTAR no necesita llamar a sock.onWhatsApp() para cada solicitud:
// la propia solicitud ya viene de WhatsApp y ese chequeo adicional podía disparar
// rate-overlimit cuando había varias solicitudes/grupos. Solo validamos el formato.
function esSolicitudValida(jid) {
  if (!jid || esNumeroArab(jid)) return false;
  if (String(jid).endsWith('@lid')) return true;
  return String(jid).endsWith('@s.whatsapp.net');
}

const AUTOACEPTAR_GROUP_BACKOFF_MS = 30 * 60 * 1000;
const AUTOACEPTAR_REQUEST_BACKOFF_MS = 30 * 60 * 1000;

function esForbidden(error) {
  const texto = String(error?.message || error || '').toLowerCase();
  const status = Number(error?.output?.statusCode || error?.statusCode || error?.data?.statusCode || 0);
  return status === 403 || /forbidden|not-authorized|not authorized|unauthorized/.test(texto);
}

function registrarBackoffAutoaceptar(sock, key, ms = AUTOACEPTAR_GROUP_BACKOFF_MS) {
  if (!sock.__akameAutoaceptarBackoff) sock.__akameAutoaceptarBackoff = new Map();
  sock.__akameAutoaceptarBackoff.set(key, Date.now() + ms);
}

function enBackoffAutoaceptar(sock, key) {
  const hasta = sock.__akameAutoaceptarBackoff?.get(key) || 0;
  if (!hasta) return false;
  if (Date.now() >= hasta) {
    sock.__akameAutoaceptarBackoff.delete(key);
    return false;
  }
  return true;
}

function limpiarBackoffAutoaceptar(sock) {
  const mapa = sock.__akameAutoaceptarBackoff;
  if (!mapa) return;
  const ahora = Date.now();
  for (const [key, hasta] of mapa) {
    if (hasta <= ahora) mapa.delete(key);
  }
}

async function procesarSolicitudesAuto(sock, jid, opciones = {}) {
  if (!jid?.endsWith('@g.us')) return;
  if (typeof sock.groupRequestParticipantsList !== 'function' || typeof sock.groupRequestParticipantsUpdate !== 'function') return;
  if (sock.__akameAutoaceptarLocks?.has(jid)) return;

  limpiarBackoffAutoaceptar(sock);
  if (enBackoffAutoaceptar(sock, jid)) return;

  if (!sock.__akameAutoaceptarLocks) sock.__akameAutoaceptarLocks = new Set();
  sock.__akameAutoaceptarLocks.add(jid);

  try {
    const cfg = cargarJsonSimple(autoaceptarPath, { groups: {} });
    if (cfg.groups?.[jid] === false) return;

    // groupMetadata permite comprobar el estado real del grupo antes de consultar
    // y procesar solicitudes. joinApprovalMode es la señal de que el grupo usa
    // aprobación de ingreso; si está desactivado no hay razón para intentar aprobar.
    const meta = await sock.groupMetadata(jid);
    if (meta?.joinApprovalMode !== true) return;

    const admins = (meta.participants || [])
      .filter(p => p?.admin)
      .flatMap(p => [p.id, p.lid].filter(Boolean));
    if (!esAdminFlexible(sock, admins)) return;

    const solicitudes = await sock.groupRequestParticipantsList(jid);
    if (!Array.isArray(solicitudes) || !solicitudes.length) return;

    const aprobar = [], rechazar = [];
    for (const req of solicitudes) {
      const target = req?.jid || req?.id || req?.participant;
      if (!target) continue;
      if (enBackoffAutoaceptar(sock, `${jid}:${normalizarJid(target)}`)) continue;
      if (esSolicitudValida(target)) aprobar.push(target);
      else rechazar.push(target);
    }

    if (rechazar.length) {
      try {
        const resultado = await sock.groupRequestParticipantsUpdate(jid, rechazar, 'reject');
        for (const item of Array.isArray(resultado) ? resultado : []) {
          const status = String(item?.status || '200');
          if (status !== '200') registrarBackoffAutoaceptar(sock, `${jid}:${normalizarJid(item?.jid)}`, AUTOACEPTAR_REQUEST_BACKOFF_MS);
        }
      } catch (error) {
        if (esForbidden(error)) {
          for (const target of rechazar) registrarBackoffAutoaceptar(sock, `${jid}:${normalizarJid(target)}`, AUTOACEPTAR_REQUEST_BACKOFF_MS);
          // No se reintenta una operación rechazada por WhatsApp en cada ciclo.
          console.log(`[AUTOACEPTAR] ${jid}: WhatsApp rechazó la gestión de ${rechazar.length} solicitud(es); se omiten temporalmente.`);
        } else {
          console.log(`[AUTOACEPTAR] ${jid}: no se pudieron rechazar solicitudes (${error?.message || error}).`);
        }
      }
    }

    if (aprobar.length) {
      try {
        const resultado = await sock.groupRequestParticipantsUpdate(jid, aprobar, 'approve');
        let aprobadas = 0;
        for (const item of Array.isArray(resultado) ? resultado : []) {
          const status = String(item?.status || '200');
          if (status === '200') aprobadas++;
          else registrarBackoffAutoaceptar(sock, `${jid}:${normalizarJid(item?.jid)}`, AUTOACEPTAR_REQUEST_BACKOFF_MS);
        }
        console.log(`[AUTOACEPTAR] ${jid}: aprobadas=${aprobadas}, rechazadas=${rechazar.length}`);
      } catch (error) {
        if (esForbidden(error)) {
          // Una respuesta 403/forbidden no se vuelve a golpear cada 3 minutos.
          // Se pone el grupo en pausa y se deja que el evento/sondeo continúe con otros grupos.
          registrarBackoffAutoaceptar(sock, jid, AUTOACEPTAR_GROUP_BACKOFF_MS);
          console.log(`[AUTOACEPTAR] ${jid}: WhatsApp rechazó la aprobación; grupo en pausa temporal.`);
        } else {
          console.log(`[AUTOACEPTAR] ${jid}: error al aprobar (${error?.message || error}).`);
        }
      }
    }
  } catch (e) {
    if (esForbidden(e)) {
      registrarBackoffAutoaceptar(sock, jid, AUTOACEPTAR_GROUP_BACKOFF_MS);
      console.log(`[AUTOACEPTAR] ${jid}: acceso rechazado por WhatsApp; grupo en pausa temporal.`);
    } else {
      console.log(`[AUTOACEPTAR] ${jid}: error de consulta (${e?.message || e}).`);
    }
  } finally {
    sock.__akameAutoaceptarLocks.delete(jid);
  }
}

function iniciarAutoaceptar(sock) {
  if (sock.__akameAutoaceptarTimer) clearInterval(sock.__akameAutoaceptarTimer);
  // El evento group.join-request hace el trabajo inmediato. Este intervalo solo
  // sirve como respaldo para solicitudes cuyo evento se haya perdido.
  sock.__akameAutoaceptarTimer = setInterval(async () => {
    if (sock.__akameAutoaceptarPolling) return;
    sock.__akameAutoaceptarPolling = true;
    try {
      const cfg = cargarJsonSimple(autoaceptarPath, { groups: {} });
      let gruposActivos = Object.entries(cfg.groups || {})
        .filter(([, activo]) => activo !== false)
        .map(([jid]) => jid);
      if (typeof sock.groupFetchAllParticipating === 'function') {
        try {
          const todos = await sock.groupFetchAllParticipating();
          gruposActivos = [...new Set([
            ...gruposActivos,
            ...Object.keys(todos || {})
          ])].filter(jid => cfg.groups?.[jid] !== false);
        } catch {}
      }
      for (const jid of gruposActivos) {
        await procesarSolicitudesAuto(sock, jid);
        await delay(1000);
      }
    } catch (e) {
      console.log('[AUTOACEPTAR] Error general:', e.message);
    } finally {
      sock.__akameAutoaceptarPolling = false;
    }
  }, 180000);
}

function isBotAdminForMetadata(sock, metadata) {
  const admins = (metadata?.participants || []).filter(p => p?.admin).flatMap(p => [p.id, p.lid].filter(Boolean));
  return esAdminFlexible(sock, admins);
}

async function startProo() {
  console.clear();
  console.log(banner.string);
  console.log(chalk.cyanBright("🩸AkameBot_Lite-MD"));

  // Estado de sesión
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const { version, isLatest } = await fetchLatestBaileysVersion();
  const msgRetryCounterCache = new NodeCache();

  // Crear socket
  const sock = makeWASocket({
    version,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false, // Desactivado para no mostrar QR
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }))
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    msgRetryCounterCache,
    syncFullHistory: false,
  });

  // 🟢 Si no hay sesión registrada, generar el código de vinculación de 8 dígitos
  if (!sock.authState.creds.registered) {
    let number = await question(
      chalk.blue("🩸 Ingrese el número del dispositivo (con código de país): ")
    );
    rl.close();
    number = number.replace(/[^0-9]/g, "");

    if (!number) {
      console.log(chalk.red("❌ Error lógico: El número es inexistente."));
      process.exit(1);
    }

    console.log(chalk.cyan("⏱️  Solicitando sello de vinculación a los servidores..."));
    try {
      const code = await sock.requestPairingCode(number);
      console.log(chalk.bgBlue.white("🩸 SELLO DE VINCULACIÓN:"), chalk.bold.white(code));
    } catch (err) {
      console.error(chalk.red("❌ La conexion ha sido interrumpida"), err.message);
      process.exit(1);
    }
  }


  // El monitor de solicitudes se inicia una sola vez por conexión.
  iniciarAutoaceptar(sock);

  // 🔄 Monitorear el estado de conexión
  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
      if (reason === DisconnectReason.loggedOut) {
        console.log(chalk.red("❌ Conexion cortada: Sesión cerrada. Elimine la carpeta 'session' para restaurar la conexión."));
      } else {
        console.log(chalk.yellow("⚠️ Problemas de conexión: conexión cerrada."));
        // Si start.sh supervisa el proceso, dejamos que un único proceso vuelva
        // a levantar Akame. Evita sockets duplicados y sesiones criptográficas
        // concurrentes que pueden terminar en Bad MAC.
        if (process.env.AKAME_SUPERVISOR === '1') {
          process.exit(1);
        } else {
          setTimeout(() => startProo(), 1500);
        }
      }
    } else if (connection === "open") {
      console.log(chalk.blueBright("✅ AkameBot_Lite-MD: Conexión establecida con éxito en la base."));
      exec("rm -rf tmp && mkdir tmp");

    }
  });


  // Guardar credenciales cuando se actualicen
  sock.ev.on("creds.update", saveCreds);



    
               // 𝙲𝙾𝙽𝙴𝚇𝙸𝙾𝙽 
        // 𝙱𝙸𝙴𝙽𝚅𝙴𝙽𝙸𝙳𝙰 𝚈 𝙳𝙴𝚂𝙿𝙴𝙳𝙸𝙳𝙰 
// Solicitudes de ingreso: procesa inmediatamente cuando WhatsApp notifica una nueva solicitud.
sock.ev.on('group.join-request', async (req) => {
  try {
    // Solo una solicitud nueva debe disparar el procesamiento inmediato.
    // Los eventos revocados/rechazados no deben provocar otra consulta/acción.
    if (req?.action && req.action !== 'created') return;
    const cfg = cargarJsonSimple(autoaceptarPath, { groups: {} });
    if (cfg.groups?.[req.id] === false) return;
    await procesarSolicitudesAuto(sock, req.id);
  } catch (e) {
    if (esForbidden(e)) return;
    console.log('[AUTOACEPTAR] Evento error:', e.message);
  }
});

sock.ev.on('group-participants.update', async (anu) => {
  if (anu.action !== 'add') return;
  try {
    const cfg = cargarJsonSimple(antifalsosPath, { groups: {} });
    if (cfg.groups?.[anu.id] === false) return;
    const metadata = await sock.groupMetadata(anu.id);
    if (!isBotAdminForMetadata(sock, metadata)) return;
    const sospechosos = (anu.participants || []).filter(esNumeroArab);
    if (sospechosos.length) {
      await sock.groupParticipantsUpdate(anu.id, sospechosos, 'remove');
      console.log(`[ANTIFALSOS] Eliminados en ${anu.id}: ${sospechosos.join(', ')}`);
    }
  } catch (e) {
    console.log('[ANTIFALSOS] Error:', e.message);
  }
});

sock.ev.on("group-participants.update", async (anu) => {
if(!welkom.includes(anu.id)) return
try {
const metadata = await sock.groupMetadata(anu.id)
  participants = anu.participants
  for (let num of participants){
 
if(anu.action == 'add') {
const grup = metadata.subject
const num = anu.participants[0]
const mem = metadata.participants.length
const descr = metadata.desc
const sol = `
🩸 *𝐀𝐊𝐀𝐌𝐄: 𝐁𝐀𝐒𝐄*

Bienvenido a *${grup}*, @${num.split('@')[0]}. Yo soy *AkameBot_Lite-MD*.

Cumple las normas de esta base con disciplina. Quienes causen desorden serán eliminados de inmediato. Si tienes voluntad, sobrevivirás.

『 👥 Ya somos ${mem} miembros 』
`

await sock.sendMessage(anu.id, {
  image: { url:getBotImage() },
  caption: sol,
  mentions: [num]
})
}

if (anu.action == 'promote') {
    num = anu.participants[0]    
    teks = `
🩸 *𝐑𝐄𝐂𝐎𝐍𝐎𝐂𝐈𝐌𝐈𝐄𝐍𝐓𝐎*

🪪 *Nombre:* @${num.split('@')[0]}
🌐 *Grupo:* ${metadata.subject}

Has demostrado ser digno. A partir de ahora eres un ADMIN; Cumple con tu deber y no me causes problemas.
`
  await sock.sendMessage(anu.id,{image : { url :getBotImage() }, caption : teks, mentions: [num]})
    }


} 
}catch(e) {
console.log('Error: %s', color(e, "red"))
}
})

//Bienvenida y despedidas

sock.ev.on('creds.update', saveCreds)
sock.ev.on("messages.upsert",  () => { })

sock.ev.on('messages.upsert', async m => {
 try {
 const info = m.messages[0]
 if (!info.message) return 
 if (info.key && info.key.remoteJid == "status@broadcast") return
 const altpdf = Object.keys(info.message)
 const type = altpdf[0] == "senderKeyDistributionMessage" ? altpdf[1] == "messageContextInfo" ? altpdf[2] : altpdf[1] : altpdf[0]
const content = JSON.stringify(info.message)
const from = info.key.remoteJid
 var body = (type === 'conversation') ? info.message.conversation : (type == 'imageMessage') ? info.message.imageMessage.caption : (type == 'videoMessage') ? info.message.videoMessage.caption : (type == 'extendedTextMessage') ? info.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? info.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? info.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? info.message.templateButtonReplyMessage.selectedId : ''

const budy = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''

var pes = (type === 'conversation' && info.message.conversation) ? info.message.conversation : (type == 'imageMessage') && info.message.imageMessage.caption ? info.message.imageMessage.caption : (type == 'videoMessage') && info.message.videoMessage.caption ? info.message.videoMessage.caption : (type == 'extendedTextMessage') && info.message.extendedTextMessage.text ? info.message.extendedTextMessage.text : ''

const numerodono = [
  `${owner}`
];


const verificarN = async(sla) => {
const [result] = await sock.onWhatsApp(sla)
if(result == undefined) {
enviar("Este usuário no existe en WhatsApp")
} else {
enviar(`${sla} Número existente en WhatsApp con  id: ${result.jid}`)
}
}
    
// Constantes is
 const isGroup = info.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? info.key.participant: from
const groupMetadata = isGroup ? await sock.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupMembers = isGroup ? groupMetadata.participants || [] : [];
const nome = info.pushName ? info.pushName : ''
const groupAdmins = groupMembers.filter(p => p.admin);
const Sadm = isGroup ? getGroupAdmins(groupAdmins) :''
const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const text = args.join(' ')
// MULTIPREFIJO
const prefixes = prefixo.map(prefix => prefix.toLowerCase());
const rawBudy = String(budy || '').trim();
const lowerBudy = rawBudy.toLowerCase();
const usedPrefix = prefixes.find(prefix => lowerBudy.startsWith(prefix));
const hasPrefix = Boolean(usedPrefix);
const isCmd = hasPrefix;
const commandSource = hasPrefix ? rawBudy.slice(usedPrefix.length).trim() : rawBudy;
const commandArgs = commandSource ? commandSource.split(/\s+/) : [];
const comando = removeAccents(commandArgs[0] || '').toLowerCase();
  // MULTIPREFIJO
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? sock.sendMessage(from, {text: teks.trim(), mentions: memberr}) : sock.sendMessage(from, {text: teks.trim(), mentions: memberr})}
const quoted = info.quoted ? info.quoted : info
const mime = (quoted.info || quoted).Mimetype || ""
const sleep = async (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}
const pushname = info.pushName ? info.pushName : ''
const isBot = info.key.fromMe ? true : false
const senderNumber = sender.split("@")[0]
const BotNumber = sock.user.id.split(':')[0]+'@s.whatsapp.net'
const isOwner = numerodono.includes(sender);


const isGroupAdmins = groupAdmins.some(admin =>
  [admin?.id, admin?.lid, admin?.phoneNumber].filter(Boolean).some(id => mismoJid(id, sender))
);
const isBotGroupAdmins = esAdminFlexible(sock,
  groupAdmins.flatMap(p => [p?.id, p?.lid, p?.phoneNumber].filter(Boolean))
);

// 🩸 MUTE: borra automáticamente cualquier mensaje de usuarios silenciados.
// Solo se aplica en grupos y requiere que Akame sea administradora.
if (isGroup && !isBot) {
  const antiData = cargarJsonSimple(antifalsosPath, { groups: {} });
  if (funcionActivaPorDefecto(antifalsosPath, from, true) && isBotGroupAdmins && (sender.endsWith('@s.whatsapp.net') || sender.endsWith('@lid'))) {
    const digits = sender.split('@')[0].split(':')[0].replace(/[^0-9]/g, '');
    // Solo considera inválidos identificadores claramente malformados.
    // No usa país/nacionalidad como criterio.
    if (digits.length < 7 || digits.length > 15) {
      try {
        await sock.groupParticipantsUpdate(from, [sender], 'remove');
        return;
      } catch {}
    }
  }
}

if (isGroup && !isBot) {
  const muteData = cargarJsonSimple(mutePath, { groups: {} });
  const muted = muteData.groups?.[from] || [];
  const estaMuteado = muted.some(jid => mismoJid(jid, sender));
  if (estaMuteado) {
    if (isBotGroupAdmins) {
      try {
        await sock.sendMessage(from, {
          delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender }
        });
      } catch (e) {
        console.log('No se pudo borrar mensaje de usuario muteado:', e.message);
      }
    }
    return;
  }
}

const isUrl = (url) => { return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi')) }
const deviceType = info.key.id.length > 21 ? 'Android' : info.key.id.substring(0, 2) == '3A' ? 'IPhone' : 'WhatsApp web'
const options = { timeZone: 'America/Lima', hour12: false }
const data = new Date().toLocaleDateString('PE', { ...options, day: '2-digit', month: '2-digit', year: '2-digit' })
const hora = new Date().toLocaleTimeString('PE', options) 

           // Constantes if nuevas
  const iswelkom = isGroup ? welkom.includes(from) : false
const isBanGp = isGroup ? bngp.includes(from) : false
const antiprivadoEstado = cargarAntiprivado()
const isAntipv = antiprivadoEstado.activo === true
const isReg = checkOfReg(sender)
 const isAntiLink = isGroup ? antiLinkActivo(from) : false 
const coins = MoneyOfSender(sender)
 
 // 🟢 Sistema de encendido/apagado global del bot

const estadoPath = './settings/estadoBot.json'


if (!fs.existsSync(estadoPath)) {
  fs.writeFileSync(estadoPath, JSON.stringify({ activo: true }, null, 2))
}
let botActivo = JSON.parse(fs.readFileSync(estadoPath)).activo
function guardarEstadoBot(estado) {
  fs.writeFileSync(estadoPath, JSON.stringify({ activo: estado }, null, 2))
  botActivo = estado
}

//

//MODO ADMIN 

const modoAdminPath = './settings/Grupo/Json/modo_admin.json';
const modoAdminList = fs.existsSync(modoAdminPath) ? JSON.parse(fs.readFileSync(modoAdminPath)) : [];
const isModoAdmin = isGroup ? modoAdminList.includes(from) : false;

// Estado individual por grupo: bot on/off pausa o reanuda Akame solo en este grupo.
const estadoGruposPath = './settings/Grupo/Json/estado_grupos.json';
function cargarEstadoGrupos() {
  try {
    const data = JSON.parse(fs.readFileSync(estadoGruposPath, 'utf8'));
    return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
  } catch { return {}; }
}
function guardarEstadoGrupos(data) {
  fs.mkdirSync(path.dirname(estadoGruposPath), { recursive: true });
  fs.writeFileSync(estadoGruposPath, JSON.stringify(data || {}, null, 2));
}
const estadoGrupos = cargarEstadoGrupos();
const grupoActivo = !isGroup || estadoGrupos[from] !== false;



 //Funciones nuevas
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
} 
function DLT_FL(file) {
        try {
            fs.unlinkSync(file);
        } catch (error) {
            return;
        }
    }
    
 const enviar = (texto, opciones = {}) => {
 sock.sendMessage(from, { text: texto, ...opciones }, { quoted: info })
 }
 
 //rangos
const rangos = JSON.parse(fs.readFileSync('./settings/rangos.json'))
const YouN = levelOfsender(sender)
const Mlevel = rangos[YouN] || 'Operativo sin Rango'

 
 

 
 const Rrxp = Rxp(sender)
 const Crxp = xpOfsender(sender)
 var Mrxp ;
 if(Crxp <= Rrxp + 50){
 var Mrxp = '▒▒▒▒▒▒▒▒▒▒ 0%'
 }else if(Crxp <= Rrxp + 100){
 var Mrxp = '█▒▒▒▒▒▒▒▒▒ 10%'
 }else if(Crxp <= Rrxp + 200){
 var Mrxp = '██▒▒▒▒▒▒▒▒ 20%'
 }else if(Crxp <= Rrxp + 300){
 var Mrxp = '███▒▒▒▒▒▒▒ 30%'
 } else if(Crxp <= Rrxp + 400){
 var Mrxp = '████▒▒▒▒▒▒ 40%'
 }else if(Crxp <= Rrxp + 500){
 var Mrxp = '█████▒▒▒▒▒ 50%'
 }else if(Crxp <= Rrxp + 600){
 var Mrxp = '██████▒▒▒▒ 60%'
 }else if(Crxp <= Rrxp + 700){
 var Mrxp = '███████▒▒▒ 70%'
 }else if(Crxp <= Rrxp + 800){
 var Mrxp = '████████▒▒ 80%'
 }else if(Crxp <= Rrxp + 999){
 var Mrxp = '█████████▒ 90%'
 } else if(Crxp >= Rrxp + 1000){
 var Mrxp = '██████████ 100%'
 }
 
             // 𝙽iveles
 // Constantes if
 const isImage = type == "imageMessage"
const isVideo = type == "videoMessage"
const isAudio = type == "audioMessage"
const isSticker = type == "stickerMessage"
const isContact = type == "contactMessage"
const isLocation = type == "locationMessage"
const isProduct = type == "productMessage"
const isMedia = (type === "imageMessage" || type === "videoMessage" || type === "audioMessage") 
typeMessage = body.substr(0, 50).replace(/\n/g, "")
if (isImage) typeMessage = "Image"
else if (isVideo) typeMessage = "Video"
else if (isAudio) typeMessage = "Audio"
else if (isSticker) typeMessage = "Sticker"
else if (isContact) typeMessage = "Contact"
else if (isLocation) typeMessage = "Location"
else if (isProduct) typeMessage = "Product"
const isQuotedMsg = type === "extendedTextMessage" && content.includes("textMessage")
const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage")
const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage")
const isQuotedDocument = type === "extendedTextMessage" && content.includes("documentMessage")
const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage")
const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage")
const isQuotedContact = type === "extendedTextMessage" && content.includes("contactMessage")
const isQuotedLocation = type === "extendedTextMessage" && content.includes("locationMessage")
const isQuotedProduct = type === "extendedTextMessage" && content.includes("productMessage")


const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]) }
return buffer}



//funcion para mencionar 

// ===================== AKAMEBOT: MODERACIÓN Y ACTIVIDAD =====================

const moderacionInicial = {
  palabras: [
    'idiota', 'imbecil', 'imbécil', 'estupido', 'estúpido', 'estupida', 'estúpida',
    'pendejo', 'pendeja', 'cabron', 'cabrón', 'cabrona', 'mierda', 'puto', 'puta',
    'maricon', 'maricón', 'zorra', 'coño', 'gay'
  ],
  advertencias: {},
  activo: {}
};

function cargarJsonSeguro(path, inicial) {
  try {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify(inicial, null, 2) + '\n');
      return JSON.parse(JSON.stringify(inicial));
    }
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  } catch {
    return JSON.parse(JSON.stringify(inicial));
  }
}

function guardarJsonSeguro(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}

function normalizarTextoModeracion(texto = '') {
  return removeAccents(String(texto))
    .toLowerCase()
    .replace(/[0-9]/g, '')
    .replace(/[^\p{L}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function contienePalabraProhibida(texto, palabras) {
  const limpio = normalizarTextoModeracion(texto);
  return palabras.some(palabra => {
    const p = normalizarTextoModeracion(palabra);
    return p && limpio.split(/\s+/).includes(p);
  });
}

function obtenerAdvertencias(grupo, usuario) {
  const data = cargarJsonSeguro(moderacionPath, moderacionInicial);
  return Number(data.advertencias?.[grupo]?.[usuario] || 0);
}

function cambiarAdvertencias(grupo, usuario, cantidad) {
  const data = cargarJsonSeguro(moderacionPath, moderacionInicial);
  if (!data.advertencias[grupo]) data.advertencias[grupo] = {};
  data.advertencias[grupo][usuario] = Math.max(0, Number(cantidad) || 0);
  guardarJsonSeguro(moderacionPath, data);
  return data.advertencias[grupo][usuario];
}

// Anti-spam: ventana temporal real por usuario.
// Cuenta mensajes y stickers mezclados para que no se pueda esquivar el límite alternando tipos.
const antispamEstado = new Map();
const antispamSanciones = new Map();
const ANTISPAM_VENTANA_MS = 7000;
const ANTISPAM_LIMITE_MENSAJES = 6;
const ANTISPAM_LIMITE_STICKERS = 4;

function antiSpamActivo(grupo) {
  return funcionActivaPorDefecto(antispamPath, grupo, true);
}
function establecerAntiSpam(grupo, activo) {
  const data = cargarJsonSimple(antispamPath, { groups: {} });
  if (!data.groups) data.groups = {};
  data.groups[grupo] = Boolean(activo);
  guardarJsonSimple(antispamPath, data);
}
function registrarAntiSpam(grupo, usuario, esSticker = false) {
  const ahora = Date.now();
  const clave = `${grupo}:${normalizarJid(usuario)}`;
  let estado = antispamEstado.get(clave);
  if (!estado) estado = { mensajes: [], stickers: [] };
  estado.mensajes = estado.mensajes.filter(t => ahora - t <= ANTISPAM_VENTANA_MS);
  estado.stickers = estado.stickers.filter(t => ahora - t <= ANTISPAM_VENTANA_MS);
  estado.mensajes.push(ahora);
  if (esSticker) estado.stickers.push(ahora);
  antispamEstado.set(clave, estado);
  return {
    mensajes: estado.mensajes.length,
    stickers: estado.stickers.length,
    excedeMensajes: estado.mensajes.length >= ANTISPAM_LIMITE_MENSAJES,
    excedeStickers: estado.stickers.length >= ANTISPAM_LIMITE_STICKERS
  };
}
function limpiarAntiSpam(grupo, usuario) {
  antispamEstado.delete(`${grupo}:${normalizarJid(usuario)}`);
}
function limpiarAntiSpamGrupo(grupo) {
  const base = `${grupo}:`;
  for (const clave of antispamEstado.keys()) {
    if (clave.startsWith(base)) antispamEstado.delete(clave);
  }
  for (const clave of antispamSanciones.keys()) {
    if (clave.startsWith(base)) antispamSanciones.delete(clave);
  }
}

function obtenerTemaTop(texto) {
  return String(texto || 'aleatorio').trim().replace(/\s+/g, ' ') || 'aleatorio';
}

function seleccionarUsuariosAleatorios(participantes, cantidad = 10) {
  const candidatos = [...new Map(
    participantes
      .filter(p => p?.id && !p.id.includes('status@broadcast'))
      .map(p => [p.id, p])
  ).values()];
  for (let i = candidatos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidatos[i], candidatos[j]] = [candidatos[j], candidatos[i]];
  }
  return candidatos.slice(0, Math.min(cantidad, candidatos.length));
}

// ===================== INTERACCIONES / ESCENAS =====================
// Cada acción tiene frases propias y una etiqueta compatible con una API pública
// de imágenes/GIFs anime. Si la imagen no está disponible, se envía la escena en texto.
//  Time
const runtime = function(seconds) {
    seconds = Number(seconds);
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60); // Utilizando Math.floor() para asegurar que los segundos sean enteros
    const parts = [];    
    if (days > 0) {
        parts.push(days + (days === 1 ? " 𝙳𝙸𝙰" : " 𝙳𝙸𝙰𝚂"));
    }
    if (hours > 0) {
        parts.push(hours + (hours === 1 ? " 𝙷𝙾𝚁𝙰" : " 𝙷𝙾𝚁𝙰𝚂"));
    }
    if (minutes > 0) {
        parts.push(minutes + (minutes === 1 ? "  𝙼𝙸𝙽𝚄𝚃𝙾" : " 𝙼𝙸𝙽𝚄𝚃𝙾𝚂"));
    }
   if (remainingSeconds > 0) {
    parts.push(remainingSeconds + (remainingSeconds === 1 ? " 𝚂𝙴𝙶𝚄𝙽𝙳𝙾" : " 𝚂𝙴𝙶𝚄𝙽𝙳𝙾𝚂"));
    }    
    return parts.join(', ');
}

  // Respuesta
     const respuesta = {
  admin: "『 🚫 No eres un Administrador 』",
  botadmin: "『 ⚠️ El bot requiere rango de Administrador para ejecutar esto 』",
  grupos: "『 💬 Comando disponible solo en geupos 』",
  vacio: "『 ❓ Falta información para procesar el reporte 』",
  miowner: "『 ⛔ Solo Gabriel-V, propietario de AkameBot_Lite-MD, tiene acceso a esto. 』",

  registro: `
╔═════ 🩸 𝐒𝐄𝐃𝐄 🩸 ═════╗
  No apareces en nuestros registros.
  Para usar el bot escribe:
  
  🔹 .reg
╚════════════════════╝
`,

  yaregistro: `
╔═════ 🩸 𝐒𝐄𝐃𝐄 🩸 ═════╗
  Tu nombre ya está registrado en los 
  archivos del bot.
╚════════════════════╝
`,

  coins: `『 🪙 Golds insuficientes para esta transacción @${sender.split('@')[0]} 』`
}


 
   // Verificados
 const SvnC = {key : {participant : '0@s.whatsapp.net'},message : {contactMessage : {displayName : `${pushname}`}}};
 
  // Funciones para crear códigos de 6 Digitos
  
  function generarCodigo() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 6; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indice);
    }
    return codigo;
}


 // MENSAJES EN CONSOLA
 
// comando pv
if  (!isGroup && isCmd) console.log( '\n  ╔─━━━━ ', color(' CMD 「 USUARIO 」','blue'), '━━━━─╗','\n',
color(' GRUPO :','blue'),color(groupName,'cyan'),'\n',
color(' NOMBRE :','blue'),color(pushname,'cyan'),'\n',
color(' COMANDO :','blue'),color(comando,'cyan'),'\n',
color(' HORA :','blue'),color(hora,'cyan'),'\n',
color(' DATOS :','blue'),color(data,'cyan'),'\n',color(' ╚─━━━━━━ '),color ('AKAME','blue'), '━━━━━─╝')

//pv
if (!isCmd && !isGroup) console.log( '\n  ╔─━━━━━', color(' CHAT 「 BOT 」','blue'), '━━━━━─╗','\n',
color(' GRUPO :','blue'),color(groupName,'cyan'),'\n',
color(' NOMBRE :','blue'),color(pushname,'cyan'),'\n',
color(' MENSAJE :','blue'),color(budy,'cyan'),'\n',
color(' HORA :','blue'),color(hora,'cyan'),'\n',
color(' DATOS :','blue'),color(data,'cyan'),'\n',color(' ╚─━━━━━━━━ '),color ('【✔】 ','blue'), '━━━━━━━━━─╝')

//comando grupo
if (isCmd && isGroup) console.log( '\n  ╔─━━━ ', color('  CMD 「 USUARIO 」','blue'), '━━━─╗','\n',
color(' GRUPO :','blue'),color(groupName,'cyan'),'\n',
color(' NOMBRE :','blue'),color(pushname,'cyan'),'\n',
color(' COMANDO :','blue'),color(comando,'cyan'),'\n',
color(' HORA :','blue'),color(hora,'cyan'),'\n',
color(' DATOS :','blue'),color(data,'cyan'),'\n',color(' ╚─━━━━━━ '),color ('AKAME','blue'), '━━━━━─╝')

//mensaje grupo
if (!isCmd && isGroup) console.log( '\n  ╔─━━━━━', color(' CHAT 「 BOT 」','blue'), '━━━━━─╗','\n',
color(' GRUPO :','blue'),color(groupName,'cyan'),'\n',
color(' NOMBRE :','blue'),color(pushname,'cyan'),'\n',
color(' MENSAJE :','blue'),color(budy,'cyan'),'\n',
color(' HORA :','blue'),color(hora,'cyan'),'\n',
color(' DATOS :','blue'),color(data,'cyan'),'\n',color(' ╚─━━━━━━━━━ '),color ('【✔】 ','blue'), '━━━━━━━━━─╝')
// Grupo bloqueado: nadie puede usar comandos allí, excepto el creador
// cuando necesita levantar la restricción.
const comandosDesbloqueoGrupo = ['desbangp', 'desbang', 'desban', 'unban'];
if (isBanGp && !(isOwner && comandosDesbloqueoGrupo.includes(comando))) {
  return;
}
      // ANTIPRIVADO: avisa una sola vez y luego ignora los mensajes privados.
if (isAntipv && !isGroup && !isOwner) {
  const pvpActivo = typeof tienePvpActivo === 'function' && tienePvpActivo(sender);
  if (!pvpActivo) {
    const estadoPrivado = cargarAntiprivado();
    const clavePrivado = normalizarJid(sender || from);
    if (!estadoPrivado.avisados.includes(clavePrivado)) {
      estadoPrivado.avisados.push(clavePrivado);
      guardarAntiprivado(estadoPrivado);
      await enviar('🚫 *Está prohibido escribir al privado del bot.*\n\nPor favor escriba en un grupo o en la comunidad principal.');
    }
    return;
  }
}

// INICIO DE COMANDOS
//solo funciona si está activado el bot
// Si el grupo está en modo admin y el usuario no es admin ni owner, se bloquea su acceso
if (isModoAdmin && !isGroupAdmins && !isOwner && !['actualizar','update','upgrade'].includes(comando)) return;
if (!botActivo && !isOwner && !['actualizar','update','upgrade'].includes(comando)) return

// Si Akame está apagada en un grupo, solo bot on puede reactivarla.
if (isGroup && !grupoActivo && comando !== 'bot') return

  // ===================== ANTILINK GLOBAL =====================
  // Solo bloquea enlaces de WhatsApp. Redes como YouTube, Facebook,
  // Instagram, TikTok, X y Telegram quedan permitidas.
  if (isGroup && isAntiLink && !isGroupAdmins && !isOwner && !isBot) {
    const textoAntilink = String(body || budy || '');
    if (contieneEnlaceWhatsApp(textoAntilink)) {
      if (!isBotGroupAdmins) {
        await enviar('⚠️ No soy administrador del grupo, así que no puedo aplicar el Antilink.');
        return;
      }
      const avisosData = cargarJsonSimple(antilinkAvisosPath, { groups: {} });
      if (!avisosData.groups) avisosData.groups = {};
      if (!avisosData.groups[from]) avisosData.groups[from] = {};
      const claveAviso = normalizarJid(sender);
      const faltas = Number(avisosData.groups[from][claveAviso] || 0) + 1;
      avisosData.groups[from][claveAviso] = faltas;
      guardarJsonSimple(antilinkAvisosPath, avisosData);

      // Primero se informa y después se elimina/expulsa.
      if (faltas === 1) {
        await enviar(
          `⚠️ *ENLACE NO PERMITIDO*

@${sender.split('@')[0].split(':')[0]}, los enlaces de WhatsApp no están permitidos en este grupo.

🔔 Esta es tu primera advertencia. Si vuelves a enviar otro enlace prohibido, serás eliminado.`,
          { mentions: [sender] }
        );
        try { await sock.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } }); } catch {}
      } else {
        await enviar(
          `🚫 *ENLACE PROHIBIDO*

@${sender.split('@')[0].split(':')[0]}, has vuelto a enviar un enlace de WhatsApp.

⛔ Segunda advertencia: serás eliminado del grupo.`,
          { mentions: [sender] }
        );
        await new Promise(resolve => setTimeout(resolve, 1200));
        try { await sock.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } }); } catch {}
        try {
          const miembro = obtenerMiembroPorIdentidad(groupMembers, sender);
          const objetivo = miembro?.id || miembro?.phoneNumber || sender;
          await sock.groupParticipantsUpdate(from, [objetivo], 'remove');
        } catch (err) { console.log('[ANTILINK] Error al expulsar:', err?.message || err); }
        delete avisosData.groups[from][claveAviso];
        guardarJsonSimple(antilinkAvisosPath, avisosData);
      }
      return;
    }
  }

  // Purga Imperial: 3 advertencias antes de expulsar.
  if (isGroup && !isBot && !isGroupAdmins && !isOwner && body) {
    const modData = cargarJsonSeguro(moderacionPath, moderacionInicial);
    if (modData.activo?.[from] === true && modData.palabras?.length && contienePalabraProhibida(body, modData.palabras)) {
      const actual = obtenerAdvertencias(from, sender);
      const siguiente = Math.min(actual + 1, 3);
      cambiarAdvertencias(from, sender, siguiente);

      if (isBotGroupAdmins) {
        try {
          await sock.sendMessage(from, {
            delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender }
          });
        } catch {}
      }

      if (siguiente >= 3 && isBotGroupAdmins) {
        try {
          await sock.groupParticipantsUpdate(from, [sender], 'remove');
          await enviar(`🩸 *𝐏𝐔𝐑𝐆𝐀 𝐈𝐌𝐏𝐄𝐑𝐈𝐀𝐋*\n\n@${sender.split('@')[0]} alcanzó *3/3 advertencias* y ha sido expulsado.\n\n*Akame:* «Tres oportunidades fueron suficientes.»`, { mentions: [sender] });
        } catch {
          await enviar(`🩸 *𝐏𝐔𝐑𝐆𝐀 𝐈𝐌𝐏𝐄𝐑𝐈𝐀𝐋*\n\n@${sender.split('@')[0]} alcanzó *3/3 advertencias*, pero no pude expulsarlo porque necesito ser administrador.`, { mentions: [sender] });
        }
      } else {
        await enviar(`⚠️ *𝐀𝐃𝐕𝐄𝐑𝐓𝐄𝐍𝐂𝐈𝐀 𝐃𝐄 𝐀𝐊𝐀𝐌𝐄*\n\n@${sender.split('@')[0]}, cuida tu lenguaje.\n*Advertencias: ${siguiente}/3*`, { mentions: [sender] });
      }
    }
  }

  // ===================== ANTI-SPAM DE MENSAJES/STICKERS =====================
  if (isGroup && !isBot && !isGroupAdmins && !isOwner && antiSpamActivo(from)) {
    const mensajeActual = info?.message || {};
    const esStickerActual = Boolean(mensajeActual.stickerMessage) || type === 'stickerMessage';
    const esTextoActual = Boolean(String(body || '').trim());
    const esMensajeRastreable = esStickerActual || esTextoActual || Boolean(
      mensajeActual.imageMessage || mensajeActual.videoMessage || mensajeActual.documentMessage || mensajeActual.audioMessage
    );

    if (esMensajeRastreable) {
      const resultado = registrarAntiSpam(from, sender, esStickerActual);
      if (resultado.excedeMensajes || resultado.excedeStickers) {
        limpiarAntiSpam(from, sender);
        const claveSancion = `${from}:${normalizarJid(sender)}`;
        const nuevaSancion = (antispamSanciones.get(claveSancion) || 0) + 1;
        antispamSanciones.set(claveSancion, nuevaSancion);
        const motivo = resultado.excedeStickers ? 'stickers' : 'mensajes';

        try {
          if (isBotGroupAdmins) {
            await sock.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
          }
        } catch {}

        if (nuevaSancion === 1) {
          await enviar(
            `⚠️ *ANTI-SPAM*\n\n@${sender.split('@')[0]}, estás enviando demasiados ${motivo} en muy poco tiempo.\n\n🔔 Esta es tu primera advertencia. Si continúas, serás eliminado del grupo.`,
            { mentions: [sender] }
          );
        } else if (isBotGroupAdmins) {
          await enviar(
            `🚫 *ANTI-SPAM*\n\n@${sender.split('@')[0]} continuó enviando spam después de la advertencia.\n\n⛔ Serás eliminado del grupo.`,
            { mentions: [sender] }
          );
          await new Promise(resolve => setTimeout(resolve, 700));
          try {
            await sock.groupParticipantsUpdate(from, [sender], 'remove');
            antispamSanciones.delete(claveSancion);
          } catch (err) {
            await enviar(`⚠️ *ANTI-SPAM*\n\n@${sender.split('@')[0]} superó nuevamente el límite, pero no pude expulsarlo porque necesito ser administrador.`, { mentions: [sender] });
          }
        } else {
          await enviar(`⚠️ *ANTI-SPAM*\n\n@${sender.split('@')[0]} superó nuevamente el límite, pero necesito ser administrador para expulsarlo.`, { mentions: [sender] });
        }
      }
    }
  }

  // ===================== ACTUALIZACIÓN DESDE GITHUB =====================
  async function actualizarDesdeGitHub() {
    const repoUrl = 'https://github.com/GabrielVB26/AkameBot_Lite-MD.git';
    const cwd = process.cwd();
    const respaldoRoot = path.join(require('os').tmpdir(), `akame-update-backup-${Date.now()}`);
    const preservar = ['settings', 'session'];
    let reiniciar = false;

    const mover = (origen, destino) => {
      if (!fs.existsSync(origen)) return false;
      fs.mkdirSync(path.dirname(destino), { recursive: true });
      fs.renameSync(origen, destino);
      return true;
    };

    const restaurar = () => {
      for (const nombre of preservar) {
        const backup = path.join(respaldoRoot, nombre);
        const destino = path.join(cwd, nombre);
        if (!fs.existsSync(backup)) continue;
        if (fs.existsSync(destino)) fs.rmSync(destino, { recursive: true, force: true });
        fs.renameSync(backup, destino);
      }
      try { fs.rmSync(respaldoRoot, { recursive: true, force: true }); } catch {}
    };

    try {
      await enviar('🩸 *INICIANDO ACTUALIZACIÓN*\n\nComprobando si existe una nueva versión de AkameBot_Lite-MD...');

      try { execSync('git --version', { cwd, stdio: 'ignore' }); }
      catch { return enviar('❌ *No puedo actualizar automáticamente.*\n\nNecesito que Git esté instalado en este dispositivo.'); }

      const gitDir = path.join(cwd, '.git');
      const instalacionSinGit = !fs.existsSync(gitDir);

      // Conservamos los datos locales antes de tocar el árbol del repositorio.
      fs.mkdirSync(respaldoRoot, { recursive: true });
      for (const nombre of preservar) {
        mover(path.join(cwd, nombre), path.join(respaldoRoot, nombre));
      }

      if (instalacionSinGit) {
        execSync('git init', { cwd, stdio: 'pipe' });
      }
      try { execSync(`git remote set-url origin ${repoUrl}`, { cwd, stdio: 'pipe' }); }
      catch { execSync(`git remote add origin ${repoUrl}`, { cwd, stdio: 'pipe' }); }

      execSync('git fetch origin main --prune', { cwd, stdio: 'pipe', timeout: 180000 });
      const remoto = execSync('git rev-parse origin/main', { cwd, encoding: 'utf8' }).trim();
      let local = '';
      try { local = execSync('git rev-parse HEAD', { cwd, encoding: 'utf8' }).trim(); } catch {}

      if (local && local === remoto) {
        restaurar();
        return enviar('✅ *El bot ya está actualizado.*');
      }

      // La instalación descargada como ZIP puede tener archivos sin seguimiento.
      // Se eliminan para que Git pueda colocar exactamente la versión del repositorio.
      execSync('git clean -fd -e node_modules/ -e .env', { cwd, stdio: 'pipe' });
      execSync('git reset --hard origin/main', { cwd, stdio: 'pipe', timeout: 180000 });
      restaurar();

      try {
        execSync('npm install --omit=dev', { cwd, stdio: 'pipe', timeout: 300000 });
      } catch (npmError) {
        console.error('[UPDATE] npm install:', npmError.message);
      }

      reiniciar = true;
      await enviar('✅ *ACTUALIZACIÓN DESCARGADA*\n\n♻️ Reiniciando AkameBot_Lite-MD para aplicar los cambios...');

      // Si el bot está bajo start.sh, el supervisor se encargará de levantar
      // la nueva versión. Evitamos arrancar dos procesos simultáneamente.
      if (process.env.AKAME_SUPERVISOR === '1') {
        setTimeout(() => process.exit(0), 1200);
      } else {
        const child = spawn(process.execPath, [path.resolve(__filename), ...process.argv.slice(2)], {
          cwd, detached: true, stdio: 'ignore',
          env: { ...process.env, AKAME_SUPERVISOR: '0' }
        });
        child.unref();
        setTimeout(() => process.exit(0), 1200);
      }
    } catch (e) {
      console.error('[UPDATE] Error:', e);
      if (!reiniciar) restaurar();
      await enviar('❌ *No pude completar la actualización.*\n\nLa instalación actual no fue reemplazada. Revisa la consola de Termux para ver el motivo.');
    }
  }

    // ===================== RESPUESTA A INVITACIONES =====================
  if (!isBot && !isGroup && body) {
    const txt = removeAccents(String(body).trim().toLowerCase());
    if (['si','sí','no'].includes(txt)) {
      const data = cargarJsonSimple(invitacionesPath, { pending: {} });
      const pending = data.pending?.[sender];
      if (pending && Date.now() - Number(pending.created || 0) < 24 * 60 * 60 * 1000) {
        delete data.pending[sender];
        guardarJsonSimple(invitacionesPath, data);
        if (txt === 'no') { await enviar('🩸 Entendido. La invitación ha sido cancelada.'); return; }
        try {
          await sock.groupParticipantsUpdate(pending.group, [sender], 'add');
          await enviar('🟢 Akame envió tu solicitud para volver al grupo. Si WhatsApp requiere aprobación, quedará pendiente para los administradores.');
        } catch (e) {
          const cfg = await sock.groupInviteCode(pending.group).catch(() => null);
          const link = cfg ? `https://chat.whatsapp.com/${cfg}` : '';
          await enviar(`🩸 No pude agregarte directamente. WhatsApp puede estar bloqueando la reincorporación automática.${link ? `\n\n🔗 ${link}` : ''}`);
        }
        return;
      }
    }
  }

  // ===================== MENSAJES SIN PREFIJO =====================
  // Las respuestas de juegos pueden llegar como texto normal.
  if (!isBot && !hasPrefix && body) {
    try {
      if (await procesarMensajeJuego(sock, from, sender, body, isGroup, info)) return;
    } catch (error) {
      console.error('[AKAME/SIN-PREFIJO] Error:', error?.message || error);
    }
  }

  // Los comandos también pueden escribirse sin prefijo.
  // Los mensajes normales caen en default y no generan respuesta.
switch(comando) {

//Comandos owner


  

  
  
case 'actualizar':
  case 'update':
  case 'upgrade': {
    if (!isReg) return enviar(respuesta.registro);
    await actualizarDesdeGitHub();
  }
  break;

  case 'seradmin': {
  if (!isOwner) return enviar(respuesta.miowner);
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isBotGroupAdmins) return enviar('🩸 Primero necesito ser administradora del grupo.');

  const ownerConfigurado = String(owner || '').trim();
  const miembroOwner = (groupMembers || []).find(p => {
    const ids = [p?.id, p?.lid, p?.phoneNumber].filter(Boolean).map(normalizarJid);
    if (!ownerConfigurado) return false;
    const ownerNormalizado = normalizarJid(ownerConfigurado);
    if (ids.includes(ownerNormalizado)) return true;
    // Si settings.json guarda un número y WhatsApp entrega un LID, usamos
    // también phoneNumber/id para encontrar al mismo participante.
    const ownerNumero = ownerNormalizado.split('@')[0].split(':')[0].replace(/\D/g, '');
    if (ownerNumero && ownerNormalizado.endsWith('@s.whatsapp.net')) {
      return ids.some(id => id.endsWith('@s.whatsapp.net') && id.split('@')[0].split(':')[0].replace(/\D/g, '') === ownerNumero);
    }
    return false;
  });

  if (!miembroOwner) return enviar('🩸 No encuentro al creador guardado como owner entre los participantes del grupo.');
  const objetivoOwner = miembroOwner.id || miembroOwner.lid || miembroOwner.phoneNumber;
  if (!objetivoOwner) return enviar('🩸 El creador no tiene un identificador válido para recibir administrador.');
  if (miembroOwner.admin) return enviar('🩸 Ya tienes administrador, Jefe.');

  try {
    await sock.groupParticipantsUpdate(from, [objetivoOwner], 'promote');
    await enviar(`👑 *Dando admin a mi creador*\n\n@${objetivoOwner.split('@')[0].split(':')[0]}, ahora eres administrador.`, { mentions: [objetivoOwner] });
  } catch (e) {
    console.error('[AUTOADMIN]', e);
    await enviar('🩸 No pude darte administrador. Comprueba que Akame tenga administrador en este grupo.');
  }
}
break;

case 'noseradmin': {
  if (!isOwner) return enviar(respuesta.miowner);
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isBotGroupAdmins) return enviar('🩸 Necesito ser administradora para quitarte el admin.');

  const ownerConfigurado = String(owner || '').trim();
  const miembroOwner = (groupMembers || []).find(p => {
    const ids = [p?.id, p?.lid, p?.phoneNumber].filter(Boolean).map(normalizarJid);
    const ownerNormalizado = normalizarJid(ownerConfigurado);
    if (ids.includes(ownerNormalizado)) return true;
    const ownerNumero = ownerNormalizado.split('@')[0].split(':')[0].replace(/\D/g, '');
    return ownerNumero && ownerNormalizado.endsWith('@s.whatsapp.net') && ids.some(id => id.endsWith('@s.whatsapp.net') && id.split('@')[0].split(':')[0].replace(/\D/g, '') === ownerNumero);
  });

  if (!miembroOwner) return enviar('🩸 No encuentro al creador guardado como owner entre los participantes del grupo.');
  const objetivoOwner = miembroOwner.id || miembroOwner.lid || miembroOwner.phoneNumber;
  if (!objetivoOwner) return enviar('🩸 El creador no tiene un identificador válido.');
  if (!miembroOwner.admin) return enviar('🩸 Ya no tienes administrador, Jefe.');
  try {
    await sock.groupParticipantsUpdate(from, [objetivoOwner], 'demote');
    await enviar(`🫡 *ADMIN RETIRADO*\n\n@${objetivoOwner.split('@')[0].split(':')[0]}, he retirado tu administrador por tu orden.`, { mentions: [objetivoOwner] });
  } catch (e) {
    console.error('[NOSERADMIN]', e);
    await enviar('🩸 No pude quitarte administrador.');
  }
}
break;

case 'autoaceptar': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  if (!isBotGroupAdmins) return enviar(respuesta.botadmin);
  if (typeof sock.groupRequestParticipantsList !== 'function' || typeof sock.groupRequestParticipantsUpdate !== 'function') {
    return enviar('🩸 Esta versión de Baileys no expone la gestión de solicitudes de ingreso.');
  }
  const valor = String(args[0] || '').toLowerCase();
  if (!['on', 'off'].includes(valor)) return enviar('🩸 Usa *autoaceptar on* para activar o *autoaceptar off* para desactivar.');
  const cfg = cargarJsonSimple(autoaceptarPath, { groups: {} });
  cfg.groups[from] = valor === 'on';
  guardarJsonSimple(autoaceptarPath, cfg);
  if (valor === 'on') {
    await procesarSolicitudesAuto(sock, from);
    return enviar('🟢 *AUTOACEPTAR ACTIVADO*\n\nAkame aprobará automáticamente las solicitudes normales y rechazará números árabes o identificadores claramente falsos.');
  }
  return enviar('🔴 *AUTOACEPTAR DESACTIVADO*\n\nAkame dejará de procesar automáticamente las solicitudes de ingreso.');
}
break;

case 'antispam': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  if (!isBotGroupAdmins) return enviar(respuesta.botadmin);
  const valor = String(args[0] || '').toLowerCase();
  if (!['on','off'].includes(valor)) return enviar(`🛡️ *USO:* .antispam on | .antispam off`);
  const activo = valor === 'on';
  establecerAntiSpam(from, activo);
  limpiarAntiSpamGrupo(from);
  return enviar(activo
    ? '🟢 *ANTI-SPAM ACTIVADO*\n\nAkame vigilará ráfagas excesivas de mensajes y stickers consecutivos.'
    : '🔴 *ANTI-SPAM DESACTIVADO*');
}
break;

case 'advertenciasall': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  const data = cargarJsonSeguro(moderacionPath, moderacionInicial);
  const grupo = data.advertencias?.[from] || {};
  const entradas = Object.entries(grupo).filter(([, n]) => Number(n) > 0);
  if (!entradas.length) return enviar('⚠️ *ADVERTENCIAS*\n\nNo hay personas con advertencias en este grupo.');
  const menciones = entradas.map(([jid]) => jid);
  const texto = entradas.map(([jid,n],i) => `${i+1}. @${jid.split('@')[0]} — *${n}*`).join('\n');
  return enviar(`⚠️ *ADVERTENCIAS DEL GRUPO*\n\n${texto}`, { mentions: menciones });
}
break;

case 'reiniciaradvertenciasall': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  const data = cargarJsonSeguro(moderacionPath, moderacionInicial);
  if (data.advertencias?.[from]) data.advertencias[from] = {};
  guardarJsonSeguro(moderacionPath, data);
  return enviar('🧹 *ADVERTENCIAS REINICIADAS*\n\nSe eliminaron todas las advertencias registradas de este grupo.');
}
break;

case 'borraradvertenciasall': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  const data = cargarJsonSeguro(moderacionPath, moderacionInicial);
  if (data.advertencias?.[from]) data.advertencias[from] = {};
  guardarJsonSeguro(moderacionPath, data);
  return enviar('🧹 *ADVERTENCIAS BORRADAS*\n\nSe eliminaron todas las advertencias de este grupo.');
}
break;

case 'del': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  if (!isBotGroupAdmins) return enviar(respuesta.botadmin);
  const ctx = info?.message?.extendedTextMessage?.contextInfo;
  if (!ctx?.stanzaId) return enviar('🗑️ Responde al mensaje que quieres eliminar usando `.del`.');
  try {
    await sock.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: ctx.stanzaId, participant: ctx.participant || undefined } });
    return;
  } catch (e) {
    return enviar('❌ No pude eliminar ese mensaje.');
  }
}
break;

case 'abrir': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  if (!isBotGroupAdmins) return enviar(respuesta.botadmin);
  try { await sock.groupSettingUpdate(from, 'not_announcement'); return enviar('🔓 *GRUPO ABIERTO*\n\nTodos los participantes pueden enviar mensajes nuevamente.'); }
  catch { return enviar('❌ No pude abrir el grupo.'); }
}
break;

case 'cerrar': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  if (!isBotGroupAdmins) return enviar(respuesta.botadmin);
  try { await sock.groupSettingUpdate(from, 'announcement'); return enviar('🔒 *GRUPO CERRADO*\n\nSolo los administradores pueden enviar mensajes.'); }
  catch { return enviar('❌ No pude cerrar el grupo.'); }
}
break;

case 'invitar': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isBotGroupAdmins) return enviar('🩸 Necesito ser administradora para obtener el enlace de invitación.');
  let numero = '';
  const objetivoInvitacion = obtenerObjetivo(info, args[0], groupMembers);
  if (objetivoInvitacion) {
    const miembroInvitacion = obtenerMiembroPorIdentidad(groupMembers, objetivoInvitacion);
    const fuente = miembroInvitacion?.phoneNumber || miembroInvitacion?.id || objetivoInvitacion;
    numero = String(fuente).split('@')[0].split(':')[0].replace(/[^0-9]/g, '');
  } else {
    numero = String(args[0] || '').replace(/[^0-9]/g, '');
  }
  if (numero.length < 7 || numero.length > 15) return enviar('📩 Indica un número válido o responde al mensaje de un miembro. Ejemplo: `.invitar +584129912462`');
  const jid = `${numero}@s.whatsapp.net`;
  try {
    const inviteCode = await sock.groupInviteCode(from);
    const link = `https://chat.whatsapp.com/${inviteCode}`;
    const invitador = `@${sender.split('@')[0]}`;
    const data = cargarJsonSimple(invitacionesPath, { pending: {} });
    if (!data.pending) data.pending = {};
    data.pending[jid] = { group: from, inviter: sender, created: Date.now() };
    guardarJsonSimple(invitacionesPath, data);
    await sock.sendMessage(jid, { text: `🩸 Hola. ${invitador} te invita a unirte al grupo.\n\n🔗 ${link}\n\nSi fuiste expulsado anteriormente, responde *sí* para que Akame intente agregarte directamente, o *no* para cancelar.`, mentions: [sender] });
    return enviar(`📩 Invitación enviada a *+${numero}*.`);
  } catch (e) {
    console.error('[INVITAR]', e?.message || e);
    return enviar('❌ No pude enviar la invitación. Comprueba que el número tenga WhatsApp y que Akame sea administradora.');
  }
}
break;

case 'dado':
case 'dados':
case 'dadu': {
  if (isGroup && !obtenerFeature(from, 'juegos')) return enviar('🩸 Los juegos automáticos están desactivados en este grupo.');
  const espera = puedeUsar(`dado:${sender}`, 5000);
  if (espera) return enviar(`🎲 Espera ${espera}s antes de lanzar otro dado.`);
  const resultado = Math.floor(Math.random() * 6) + 1;
  await enviar(`🎲 *DADO DE AKAME*\n\n⚔️ Resultado: *${resultado}/6*\n\n*Akame:* «La suerte también forma parte de una misión.»`);
}
break;

case 'ppt':
case 'piedrapapeltijera':
case 'pvp': {
  if (isGroup && !obtenerFeature(from, 'juegos')) return enviar('🩸 Los juegos automáticos están desactivados en este grupo.');
  let objetivo = obtenerObjetivo(info, '', groupMembers);
  let argumento = objetivo || q.trim();
  let menciones = objetivo ? [objetivo] : [];
  if (objetivo && isGroup) {
    const miembro = obtenerMiembroPorIdentidad(groupMembers, objetivo);
    if (miembro) {
      // Guardamos todos los identificadores conocidos para que la aceptación
      // también funcione cuando WhatsApp cambie entre LID y número.
      argumento = miembro.id || miembro.phoneNumber || miembro.lid || objetivo;
      menciones = [miembro.id || miembro.lid || miembro.phoneNumber || objetivo];
      if (miembro.lid) menciones.push(miembro.lid);
    }
  }
  const resultado = await iniciarPpt(sock, from, sender, argumento, info, menciones);
  await enviar(resultado, menciones.length ? { mentions: [...new Set(menciones)] } : undefined);
}
break;

case 'adivina':
case 'adivinanza': {
  if (!isGroup) return enviar('🩸 Este juego funciona en grupos.');
  if (!obtenerFeature(from, 'juegos')) return enviar('🩸 Los juegos automáticos están desactivados en este grupo.');
  const resultado = iniciarAdivinaJuego(from, sender);
  if (resultado.error) return enviar(resultado.error);
  const sent = await sock.sendMessage(from, { text: resultado.text }, { quoted: info });
  if (typeof marcarMensajeAdivina === 'function') marcarMensajeAdivina(from, sent?.key?.id);
}
break;

case 'reto': {
  if (isGroup && !obtenerFeature(from, 'juegos')) return enviar('🩸 Los juegos automáticos están desactivados en este grupo.');
  const espera = puedeUsar(`reto:${sender}`, 10000);
  if (espera) return enviar(`⏳ Espera ${espera}s antes de pedir otro reto.`);
  await enviar(`🎯 *RETO DE NIGHT RAID*\n\n${obtenerReto()}\n\n*Akame:* «Cumple tu misión.»`);
}
break;

case 'verdad': {
  if (isGroup && !obtenerFeature(from, 'juegos')) return enviar('🩸 Los juegos automáticos están desactivados en este grupo.');
  const espera = puedeUsar(`verdad:${sender}`, 10000);
  if (espera) return enviar(`⏳ Espera ${espera}s antes de pedir otra verdad.`);
  await enviar(`🤔 *VERDAD DE AKAME*\n\n${obtenerVerdad()}`);
}
break;

case 'menu':
case 'help': {

    const Mnu = Menu(timeFt, Bot, sender, groupName, groupMembers);

    // Enviar imagen del menú completa
    await sock.sendMessage(from, {
        image: { url:getBotImage() },
        caption: Mnu,
        mentions: [sender]
    }, { quoted: info });
}
break;

case 'bot': {
  if (!isGroup) return enviar('🩸 En privado, usa *menu* o *ping*.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  const estado = String(args[0] || '').toLowerCase();
  if (!['on','off'].includes(estado)) return enviar('🩸 Usa *bot on* para activar Akame en este grupo o *bot off* para desactivarla.');
  const estados = cargarEstadoGrupos();
  if (estado === 'on') {
    if (estados[from] !== false) return enviar('🟢 *AKAME YA ESTÁ ACTIVA EN ESTE GRUPO*');
    estados[from] = true;
    guardarEstadoGrupos(estados);
    return enviar('🟢 *AKAME ACTIVADA*\n\nVolveré a responder normalmente en este grupo.');
  }
  if (estados[from] === false) return enviar('🔴 *AKAME YA ESTÁ DESACTIVADA EN ESTE GRUPO*');
  estados[from] = false;
  guardarEstadoGrupos(estados);
  return enviar('🔴 *AKAME DESACTIVADA EN ESTE GRUPO*\n\nUsa *bot on* para reactivarla.');
}
break;

case 'botglobal': {
  if (!isOwner) return enviar(respuesta.miowner);
  const estado = String(args[0] || '').toLowerCase();
  if (!['on','off'].includes(estado)) return enviar('🩸 Usa *botglobal on* o *botglobal off*.');
  if (estado === 'on') {
    if (botActivo) return enviar('🟢 *BOT GLOBAL YA ESTÁ ACTIVO*');
    guardarEstadoBot(true);
    return enviar('🟢 *BOT GLOBAL ACTIVADO*\n\nAkame vuelve a estar disponible en todos los grupos.');
  }
  if (!botActivo) return enviar('🔴 *BOT GLOBAL YA ESTÁ DESACTIVADO*');
  guardarEstadoBot(false);
  return enviar('🔴 *BOT GLOBAL DESACTIVADO*\n\nAkame dejará de procesar comandos hasta que uses *botglobal on*.');
}
break;

case 'antiprivado':
case 'antipv': {
  if (!isOwner) return enviar(respuesta.miowner);
  const estadoPrivado = cargarAntiprivado();
  const orden = String(args[0] || '').toLowerCase();

  if (orden === 'on') {
    if (estadoPrivado.activo) return enviar('La barrera ya está alzada por órdenes de Gabriel-V.');
    estadoPrivado.activo = true;
    estadoPrivado.avisados = [];
    guardarAntiprivado(estadoPrivado);
    return enviar('🩸 *ANTIPRIVADO ACTIVADO*\n\nEstá prohibido escribir al privado del bot. Los usuarios recibirán un único aviso y después Akame ignorará sus mensajes privados.');
  }

  if (orden === 'off') {
    if (!estadoPrivado.activo) return enviar('La barrera ya estaba abajo por órdenes de Gabriel-V.');
    estadoPrivado.activo = false;
    estadoPrivado.avisados = [];
    guardarAntiprivado(estadoPrivado);
    return enviar('Defensa desactivada. El acceso al privado ha sido restaurado por órdenes de Gabriel-V.');
  }

  return enviar('Indique la orden: on para activar o off para desactivar la barrera, Akame.');
}
break;

case 'reiniciar': {
    if (!isOwner) return enviar(respuesta.miowner);
    
    enviar(`🩸 *Por órdenes de Gabriel-V, voy a reiniciar mi presencia...*`);
    
    console.log("=== REINICIO DE SISTEMA: ORDEN DEL PATRÓN ===");
    
    setTimeout(async () => {
        process.exit(0);
    }, 1500);
}
break;


//información 

case 'infobot': case 'ping': {
let timestamp = speed()
let latensi = speed() - timestamp
uptime = process.uptime()
botinfo = `
╔═【 🩸 𝑬𝒔𝒕𝒂𝒅𝒐 𝒅𝒆 𝒍𝒂 𝑺𝒆𝒅𝒆 】═╗
⏰  𝐇𝐎𝐑𝐀 »  ${time}
📅  𝐅𝐄𝐂𝐇𝐀 »  ${data}
🤖  *BOT* »  Akame
⚡  𝐕𝐄𝐋𝐎𝐂𝐈𝐃𝐀𝐃 »  ${latensi.toFixed(4)} ms
⏳  𝐆𝐔𝐀𝐑𝐃𝐈𝐀 »  ${runtime(uptime)}
💾  𝐄𝐍𝐄𝐑𝐆𝐈́𝐀 »  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
🩸  𝐄𝐒𝐓𝐀𝐃𝐎 »  Lista para la batalla
╚══❖═══════❖══╝
`
sock.sendMessage(from, { image: { url: getBotImage() }, caption: botinfo }, { quoted: info })
}
break 

case 'botcompleto':
enviar(`🩸 *Akame está en su puesto. Lista para la misión.*`);
break

case 'grupos':
case 'grupo':
enviar(`⚔️ *Akme atenta*`);
break

case 'serdueño':
case 'sercreador':
case 'owner':
case 'serowner':
enviar(`🩸 *Mi lealtad es inquebrantable. Este sistema solo reconoce la autoridad de Gabriel-V*`);
break

case 'canal':
case 'canales':
case 'canalbot': {
  return enviar(`El canal del Bot de Akame es:\n\nhttps://whatsapp.com/channel/0029VbD46om42DcdavNtDO16\n\nAhí podrás ver las novedades y actualizaciones de Akame.`);
}
break



case 'serbot':
    try {
        const moneybot = `🤖 *¿QUIERES SER BOT?*\n\nAprende cómo convertirte en bot, instalar AkameBot_Lite-MD y conocer las novedades en nuestro canal oficial.\n\n📢 *Canal oficial:*\nhttps://whatsapp.com/channel/0029VbD46om42DcdavNtDO16`;
        await enviar(moneybot);
    } catch (e) {
        console.error(e);
        await enviar("La técnica de comunicación ha fallado, Akame.");
    }
break;

case 'vip':
case 'servip': {
  return enviar(`💎 *AKAMEBOT_LITE-MD*\n\n¿Quieres conocer las novedades de Akame? Consulta la información, novedades y disponibilidad de la versión VIP en nuestro canal oficial.\n\n📢 *Canal oficial:*\nhttps://whatsapp.com/channel/0029VbD46om42DcdavNtDO16`);
}
break;


//AJUSTES DEL GRUPO

case 'welcome':
case 'bienvenida': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  if (!isBotGroupAdmins) return enviar('🩸 Necesito ser administrador del grupo para gestionar las bienvenidas.');
  const opcion = String(args[0] || '').toLowerCase();
  if (!['on','off'].includes(opcion)) return enviar('🩸 Usa *welcome on* para activar o *welcome off* para desactivar.');
  if (opcion === 'on') {
    if (welkom.includes(from)) return enviar('🟢 *La bienvenida ya está activada en este grupo.*');
    welkom.push(from);
    fs.writeFileSync('./settings/Grupo/Json/welkom.json', JSON.stringify([...new Set(welkom)], null, 2));
    return enviar('🟢 *BIENVENIDA ACTIVADA*\n\nAkame dará la bienvenida a los nuevos integrantes.');
  }
  if (!welkom.includes(from)) return enviar('🔴 *La bienvenida ya está desactivada en este grupo.*');
  const indice = welkom.indexOf(from);
  welkom.splice(indice, 1);
  fs.writeFileSync('./settings/Grupo/Json/welkom.json', JSON.stringify(welkom, null, 2));
  return enviar('🔴 *BIENVENIDA DESACTIVADA*\n\nAkame dejará de enviar bienvenidas automáticas.');
}
break

case 'bang':
case 'bangp': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isOwner) return enviar('🩸 Solo el creador puede bloquear este grupo.');

  const JsonGp = './settings/Grupo/Json/grupo.json';
  if (bngp.includes(from)) return enviar('🔴 *Este grupo ya está bloqueado.*');
  bngp.push(from);
  bngp = [...new Set(bngp)];
  fs.writeFileSync(JsonGp, JSON.stringify(bngp, null, 2));
  return enviar('🔴 *GRUPO BLOQUEADO*\n\nAkame dejará de responder en este grupo hasta que el creador quite la restricción.');
}
break

case 'desbangp':
case 'desbang':
case 'desban':
case 'unban': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isOwner) return enviar('🩸 Solo el creador puede levantar esta restricción.');

  const JsonGp = './settings/Grupo/Json/grupo.json';
  if (!bngp.includes(from)) return enviar('🟢 *Este grupo no está bloqueado.*');
  bngp = bngp.filter(g => g !== from);
  fs.writeFileSync(JsonGp, JSON.stringify(bngp, null, 2));
  return enviar('🟢 *RESTRICCIÓN LEVANTADA*\n\nAkame vuelve a estar disponible en este grupo.');
}
break

case 'invocar':
case 'revivir':
if(!isReg) return enviar(respuesta.registro)
if(!isGroup) return enviar('Esta técnica solo es funcional dentro de los grupos.')
if(!isGroupAdmins) return enviar(respuesta.admin) 
members_id = []
teks = (args.length > 1) ? body.slice(8).trim(): ''
teks += `\n🩸 *RECUENTO TOTAL:* ${groupMembers.length}\n`
nu = 0
for (let mem of groupMembers) {
nu += 1
teks += ` ➫[${nu.toString()}] @${mem.id.split('@')[0]}\n`
members_id.push(mem.id)
}
mentions(`
🩸 ❝ *INVOCACIÓN DEL GRUPO* ❞ 
*aparezcan todos*

${teks}
`, members_id, true)
break


case 'anuncio':{
if(!isGroup) return enviar('Esta técnica de comunicación solo es válida dentro de los grupos')
if(!isGroupAdmins) return enviar('Solo los Administradores tienen autoridad para emitir anuncios generales.') 
if(!q) return enviar('Debe proporcionar el mensaje para el anuncio.')
men = []
num = 0
teks = `
🩸 ❝ *AVISO DE LOS ADMINISTRADORES* ❞
 👉 ❝ ${q} ❞ 👈 
\n`
for(let m of groupMembers){
num +=1 
teks += `• [${num.toString()}] @${m.id.split('@')[0]}\n`
men.push(m.id)
}
mentions(teks,men,true)
}
break 

case 'modoadmin': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  const estado = String(args[0] || '').toLowerCase();
  if (!['on','off'].includes(estado)) return enviar('🩸 Usa *modoadmin on* para limitar los comandos a administradores o *modoadmin off* para permitirlos a todos.');
  const JsonModoAdmin = './settings/Grupo/Json/modo_admin.json';
  let modoAdmin = cargarJsonSimple(JsonModoAdmin, []);
  if (!Array.isArray(modoAdmin)) modoAdmin = [];
  if (estado === 'on') {
    if (modoAdmin.includes(from)) return enviar('🟢 *MODO ADMIN YA ESTÁ ACTIVADO*');
    modoAdmin.push(from);
    guardarJsonSimple(JsonModoAdmin, [...new Set(modoAdmin)]);
    return enviar('🟢 *MODO ADMIN ACTIVADO*\n\nSolo los administradores podrán usar los comandos del grupo.');
  }
  if (!modoAdmin.includes(from)) return enviar('🔴 *MODO ADMIN YA ESTÁ DESACTIVADO*');
  modoAdmin = modoAdmin.filter(g => g !== from);
  guardarJsonSimple(JsonModoAdmin, modoAdmin);
  return enviar('🔴 *MODO ADMIN DESACTIVADO*\n\nLos miembros vuelven a tener acceso a los comandos permitidos.');
}
break;

case 'etiquetar' :
case 'notify' :
  if(!isReg) return enviar(respuesta.registro)
  if(!isGroupAdmins) return enviar("Solo los Administradores pueden convocar a las filas de esta manera.")
  if(!isGroup) return enviar('Esta acción no puede ejecutarse en un chat privado.')
  if(!q) return enviar('Debe escribir el mensaje para que los Administradores notifiquen a las filas.')
  
  var group = await sock.groupMetadata(from)
  var member = group['participants']
  var mem = []
  member.map(async adm => {
    mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
  })
  
  var optionshidetag = {
    text : `🩸 *NOTIFICACIÓN DE LOS ADMINISTRADORES:*\n\n${q}`,
    contextInfo: { mentionedJid: mem },
    quoted: info
  }
  sock.sendMessage(from, optionshidetag)
break


case 'kick' :
case 'ban' :
case 'muere' :{
if (!isGroup) return  
if(!isGroupAdmins) return enviar('Solo los Administradores tienen autoridad para expulsar a un integrante.')
if(!isBotGroupAdmins) return enviar (respuesta.botadmin)
let mentioned = obtenerObjetivo(info, args[0], groupMembers);

if (!mentioned) return enviar("⚠️ Debe etiquetar a un integrante para ser eliminado por mi.");

if(mentioned === BotNumber || mentioned === owner) return enviar(`🤨 No seas ridículo. Jamás osaría eliminar a mi creador`)
await sock.groupParticipantsUpdate(from, [mentioned] , 'remove')
enviar(`🩸 El objetivo ha sido eliminado por mi bajo las órdenes del admin.`)
}
break 
     
case 'antilink': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar('Solo los Administradores pueden gestionar las barreras del sector.');
  if (!isBotGroupAdmins) return enviar(respuesta.botadmin);

  const valor = String(args[0] || '').toLowerCase();
  if (!['on', 'off'].includes(valor)) {
    return enviar('🩸 Usa *antilink on* para activar o *antilink off* para desactivar.');
  }

  const activar = valor === 'on';
  const cfg = cargarConfigAntilink();
  cfg.enabled = cfg.enabled || [];
  cfg.disabled = cfg.disabled || [];

  if (activar) {
    cfg.disabled = cfg.disabled.filter(g => g !== from);
    if (!cfg.enabled.includes(from)) cfg.enabled.push(from);
    guardarConfigAntilink(cfg);
    return enviar('🟢 *ANTILINK ACTIVADO*\n\nAkame eliminará y expulsará a quien envíe enlaces de WhatsApp o enlaces prohibidos.');
  }

  if (!cfg.disabled.includes(from)) cfg.disabled.push(from);
  guardarConfigAntilink(cfg);
  return enviar('🔴 *ANTILINK DESACTIVADO*\n\nLa protección contra enlaces queda desactivada en este grupo.');
}
break;

case 's':
case 'sticker':
  if(!isReg) return enviar(respuesta.registro)
  if(coins < 1) return enviar(`Su tesorería no cuenta con los **Golds** suficientes para esta técnica.`)

  // Primero detectamos si hay un mensaje citado
  var RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
  
  // Modificado: Ahora el bot mira el mensaje actual ANTES que el citado para permitir enviar foto + s
  var boij2 = info.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage
  var boij = info.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || RSM?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage

  var pack = `🩸AKAMEBOT_LITE-MD🩸\n🇻🇪 Hecho en Venezuela\n👑 Creador: Gabriel-V\n⭐ Sticker pedido por: ${pushname}\n `
  var author2 = `🗺️ En el Grupo: ${groupName} `

  if(boij2){
    enviar(`🩸 *Creando sticker, espere un momento...*`)
    owgi = await getFileBuffer(boij2, 'image')
    let encmediaa = await sendImageAsSticker2(sock, from, owgi, info, { packname:pack, author:author2})
    await DLT_FL(encmediaa)
    await addXp(sender,1)
    await delkoin(sender,1)
    
  } else if(boij && boij.seconds < 11){
    enviar(`Creando sticker, espere un momento...`)
    owgi = await getFileBuffer(boij, 'video')
    let encmedia = await sendVideoAsSticker2(sock, from, owgi, info, { packname:pack, author:author2})
    await DLT_FL(encmedia)
    await addXp(sender,1)
    await delkoin(sender,1)
    
  } else {
    return enviar(`Marque una imagen o un vídeo (máximo 10 segundos). No me haga perder el tiempo.`)
  }
break

case 'calcular':
case 'cal':
  if (!isReg) return enviar(respuesta.registro)
  if(args.length == 0) return enviar(`🩸 *SISTEMA DE CÁLCULO DE AKAME*\n\nUse los símbolos: + (Suma), - (Resta), / (División), * (Multiplicación).\n\n*Ejemplo:* !cal 4+4`)
  try {
    const resultzx = eval(q)
    await sleep(1000)
    enviar(`🩸 *RESULTADO:* \n${q} = *${resultzx}*`)
  } catch {
    enviar('La operación es inválida. Mantenga el orden.')
  }
break;
            
//Nesecita clave API ////
case 'perfil' : case 'cartera' :
case 'nivel' : case 'minivel' :{
if(!isReg) return enviar(respuesta.registro)
var saldo = MoneyOfSender(sender)
const Xp = xpOfsender(sender)
const Mnv = levelOfsender(sender)
const Rxxp = Rxp(sender)
const myrep2 = repUser(sender)
const Xpnull = Rxxp - 1000
if(Xp === null) return addXp(sender,Xpnull)
const Mp = `
╔══✦❖✦══【 𝑷𝒆𝒓𝒇𝒊𝒍 𝒅𝒆𝒍 𝑪𝒂𝒛𝒂𝒅𝒐𝒓 】══✦❖✦══╗
🏷️  𝐍𝐨𝐦𝐛𝐫𝐞      »  @${sender.split('@')[0]}
⚔️  𝐑𝐚𝐧𝐠𝐨       »  ${Mlevel}
👑  𝐑𝐞𝐩𝐮𝐭𝐚𝐜𝐢𝐨́𝐧  »  ${myrep2}
💰  𝐓𝐞𝐬𝐨𝐫𝐞𝐫𝐢́𝐚  »  🪙${saldo} 𝐘𝐞𝐧𝐞𝐬
📈  𝐍𝐢𝐯𝐞𝐥       »  ${Mnv} ➜ ${Mnv + 1}
📚  𝐄𝐗𝐏         »  ${Xp} / ${Rxxp + 1000}
╚══✦❖✦══【 𝐏𝐫𝐨𝐠𝐫𝐞𝐬𝐨 】══✦❖✦══╝
▰▰ ${Mrxp} ▰▰
`
   sock.sendMessage(from,{text : Mp, mentions : [sender]},{quoted : info})        
}
break 

//comando tragamonedas 
case 'tragamonedas':
case 'tragamoneda':
if (!isReg) return enviar("Debe registrarse en el refugio de Night Raid para participar.");
const apuestas = 1; // Coste en Golds
if (coins < apuestas) return enviar("No posee suficientes **Golds** para apostar.");

const ahora = Date.now();
const tiempoGuardado = timeClaimTraga(sender) || 0;
const tiempoRestante = tiempoGuardado - ahora;

if (tiempoRestante > 0) {
    return await enviar(`🩸 Akame le ordena esperar ${runtime(tiempoRestante / 10)} para volver a probar su suerte.`);
} else {
    const espera = 8 * 60 * 60 * 1000; // 8 horas
    await addClaimTraga(sender, espera);
}

// Restar un Gold por jugar
await delkoin(sender, apuestas);

const simbolos = ['🩸', '⚔️', '👺', '🔥', '🦋', '⚡', '🐗', '🐍', '💖', '🌑'];

const obtenerFila = () => [
    simbolos[Math.floor(Math.random() * simbolos.length)],
    simbolos[Math.floor(Math.random() * simbolos.length)],
    simbolos[Math.floor(Math.random() * simbolos.length)]
];

const filaArriba = obtenerFila();
const filaAbajo = obtenerFila();
let filaCentro;
const probabilidad = Math.random(); 

if (probabilidad < 0.6) {
    const simboloGanador = simbolos[Math.floor(Math.random() * simbolos.length)];
    filaCentro = [simboloGanador, simboloGanador, simboloGanador]; 
} else {
    filaCentro = obtenerFila(); 
}

const esGanador = filaCentro[0] === filaCentro[1] && filaCentro[1] === filaCentro[2];

let resultadoMensaje = "😢 Su técnica ha fallado... Regrese mas tarde.";
let premioTexto = "";

if (esGanador) {
    const premioCantidad = Math.floor(Math.random() * 6) + 5; 
    const tipoPremio = Math.random() < 0.5 ? 'coins' : 'exp'; 

    if (tipoPremio === 'coins') {
        await addkoin(sender, premioCantidad);
        premioTexto = `🎉 Ha obtenido ${premioCantidad} **Golds** para su tesorería.`;
    } else {
        await addXp(sender, premioCantidad);
        premioTexto = `📚 Ha ganado ${premioCantidad} de experiencia.`;
    }
    resultadoMensaje = "🎉 ¡Victoria en el campo de batalla! 🎉";
}

const mensajeCasino = `
         *༻  🎰 𝙏𝙍𝘼𝙂𝘼𝙈𝙊𝙉𝙀𝘿𝘼𝙎 𝙎𝙀𝘿𝙀 🎰 ༺*
            ┏━━━━┛🔱┗━━━━┓
             ||   【${filaArriba[0]}】【${filaArriba[1]}】【${filaArriba[2]}】   ||
           ◢◞───────────◟◣
        █ ||   【${filaCentro[0]}】【${filaCentro[1]}】【${filaCentro[2]}】   || █
           ◥◝───────────◜◤
             ||   【${filaAbajo[0]}】【${filaAbajo[1]}】【${filaAbajo[2]}】   ||
            ┗━━━━┓🔱┏━━━━┛
   🩸◆━━━━━━━▣✦▣━━━━━━━━◆🩸
Inversión: ${apuestas} Gold.
${resultadoMensaje}
${premioTexto}
`;

setTimeout(() => {
    enviar(mensajeCasino);
}, 3000);
break;



case "dayli": case "daily":
if(!isGroup) return
if(!isReg) return 
const dayli = checkDayli(sender)
if(dayli) {
    const ahora = Date.now()
    const time = timeDayli(sender)
    const result = ahora - time
    const resultado = (0 - result) / 1000;
    return sock.sendMessage(from,{text : `🩸 Akame le ordena esperar ${runtime(resultado)} para recibir nuevos suministros del Night Raid.`},{quoted : info})
} else {
    const time = 24* 60* 60* 1000
    await addDayli(sender,time)
    const montoExperiencia = 5
    const monto = 1
    enviar(`
⏳🩸 𝐒𝐔𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐎𝐒 𝐃𝐈𝐀𝐑𝐈𝐎𝐒 🩸⏳

El Night Raid le ha otorgado ${monto} **Gold** y ${montoExperiencia} de experiencia por su servicio.
`)
    await addkoin(sender,monto)
    await addXp(sender,montoExperiencia)
}
break

case 'reg': case 'registrarme': case 'registrame': case 'rg':
    if (isReg) return enviar(respuesta.yaregistro)
    const nombre = pushname
    await AddReg(sender, nombre)
    sock.sendMessage(from, {
        image: { url:getBotImage() },
        caption: `★━━━━★━━━━★★━━━━★
         *༻  𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎  ༺*
📜 Agente de Night Raid aceptado: *${nombre}*
🪙 Has recibido *50 Golds* de parte del Night Raid como equipo inicial.
🩸 Bajo la supervisión de Akame.
◆━━━━━━━▣✦▣━━━━━━━━◆`
    }, { quoted: info })
    break

case 'levelup': {
    const XpR = xpOfsender(sender)
    const Rxxp = Rxp(sender)
    if(XpR >= Rxxp + 1000) {
        await addLevel(sender , 1)
        sleep(100)
        await addkoin(sender,10)
        sleep(100)
        await addXp(sender,100)
        sleep(100)
        await addRxp(sender,1000)
        const Mup = ` 
        ★━━━ 𝐀𝐒𝐂𝐄𝐍𝐒𝐎 𝐃𝐄 𝐑𝐀𝐍𝐆𝐎 ━━━★
✪ @${sender.split('@')[0]}
🩸 El Night Raid reconoce su nuevo rango. Siga entrenando para no decepcionar a Akame.
`
        sock.sendMessage(from,{text : Mup , mentions : [sender]},{quoted : info})
    } else {
        enviar(`
❌ Experiencia insuficiente. *${pushname}*, el Night Raid exige que entrene con más rigor.
`)
    }
}
break




case 'mision': case 'misión': case 'encargo': case 'patrulla': case 'asalto': {
    if(!isReg) return enviar(respuesta.registro)
    if(!isGroup) return enviar(respuesta.grupos)
    const isMin = checkMinar(sender)
    if(isMin) {
        const ahora = Date.now()
        const time = timeMinar(sender)
        const result = ahora - time
        const resultado = (0 - result) / 1000;
        return enviar(`🩸 Se encuentra en recuperación tras la batalla... espere ${runtime(resultado)} para la siguiente misión.`)
    } else {
        const time = 1 * 60 * 1000 // 1 minuto de espera
        await addMinar(sender,time)
        const numbeR = [5, 6, 7, 8, 9, 10];
        const randomIndex = Math.floor(Math.random() * numbeR.length);
        const monto = numbeR[randomIndex];
        enviar(`
               ★━━━ 𝐌𝐈𝐒𝐈𝐎́𝐍 𝐃𝐄 𝐂𝐀𝐙𝐀 ━━━★
🩸 Tras un arduo enfrentamiento, ha exterminado a un grupo de enemigos del Imperio.
💰 El Night Raid le otorga una recompensa de *${monto} Golds*.
💬 ❝ el refugio de Night Raid garantiza un pago mínimo de *5 Golds* por mantener los sectores seguros. ❞

⏳ Descanse, recibirá nuevas órdenes en 1 minuto.
`)
        await addkoin(sender,monto)
    }
}
break 

case "duelo": case "enfrentar": case "ruleta": {
    if (!q) return enviar(`Indique la cantidad de Golds que está dispuesto a arriesgar en batalla.`);
    if (!isReg) return enviar(respuesta.registro)
    const monto = parseInt(q)
    if (isNaN(monto) || monto <= 0) return enviar(`Indique un monto válido en Golds.`);
    if (monto > MoneyOfSender(sender)) return enviar(`No posee esa cantidad de Golds en su tesorería.`);
    if (monto > 5) return enviar('No se permite arriesgar más de 5 Golds en un duelo de alto rango.');

    const isMinxxx = checkRuleta(sender)
    if(isMinxxx) {
        const ahora = Date.now()
        const time = timeRuleta(sender)
        const result = ahora - time
        const resultado = (0 - result) / 1000;
        return enviar(`🩸 Su espíritu está agotado por el duelo previo. Espere ${runtime(resultado)} para volver a pelear.`)
    } else {
        const time = 1 * 60 * 1000 // 1 minuto de espera
        await addRuleta(sender,time)
        const ppt = ["muere", "vive"]; 
        const pptb = ppt[Math.floor(Math.random() * ppt.length)];  
        let vit;

        if (pptb === "muere") {
            vit = `⚔️ 「Una unidad imperial aparece frente a ${pushname}...」
⚔️ 「¡La batalla es demasiado agresiva!」
💀 「${pushname} ha sido **derrotado** y el Night Raid retira ${monto} Golds por su incompetencia.」`;
            await delkoin(sender, monto);
        } else if (pptb === "vive") {
            vit = `⚔️ 「Una unidad imperial aparece frente a ${pushname}...」
🩸 「¡Murasame: Ataca!」
🏆 「El enemigo del Imperio es decapitado. ${pushname} sobrevive y gana ${monto} Golds de botín.」`;
            await addkoin(sender, monto);
        }

        const datatt = `
╭━━━╾⭑✦ 🩸 ✦⭑╼━━━╮
      ⌬ 𝐄𝐍𝐅𝐑𝐄𝐍𝐓𝐀𝐌𝐈𝐄𝐍𝐓𝐎 ⌬
${vit}
⌛ Siguiente informe de avistamiento en 1 minuto...
╰━━━╾⭑✦ ⚔️ ✦⭑╼━━━╯
`;
        enviar(datatt);
    }
}
break



case "explorar": case "incursion": case "operacion": case "suministros": {
    if (q) return enviar(`No ponga ninguna palabra, solo use el comando para iniciar la exploración.`);
    if (!isReg) return enviar(respuesta.registro)
    
    const isMinxxx = checkPescar(sender)
    if(isMinxxx) {
        const ahora = Date.now()
        const time = timePescar(sender)
        const result = ahora - time
        const resultado = (0 - result) / 1000;
        return enviar(`🩸 Sus heridas están sanando... espere ${runtime(resultado)} para volver a explorar nuevas rutas.`)
    } else {
        const time = 1 * 60 * 1000; // 1 minuto de espera
        await addPescar(sender, time)
        
        const escenarios = ["medicina", "amuleto", "mapa", "Murasame_rota", "veneno", "trampa"];
        const evento = escenarios[Math.floor(Math.random() * escenarios.length)];
        let vit;

        // Lógica de Exploración de el refugio de Night Raid
        if (evento === "medicina") {
            vit = `🩸 「Durante la exploración encontraste suministros médicos. Al entregarlos a la **Night Raid**, obtienes 20 de EXP 📚」`;
            await addXp(sender, 20);
        } else if (evento === "amuleto") {
            vit = `🗡️ 「Explorando un santuario recuperaste un amuleto antiguo. La **Logística de el refugio de Night Raid** te otorga 8 Golds 🪙 por el hallazgo.」`;
            await addkoin(sender, 8);
        } else if (evento === "mapa") {
            vit = `📜 「Localizaste un mapa de guaridas enemigas. Recibes 4 Golds 🪙 y 5 de EXP 📚 de la **Night Raid**.」`;
            await addkoin(sender, 4);
            await addXp(sender, 5);
        } else if (evento === "Murasame_rota") {
            vit = `⚔️ 「En el camino encontraste una fragmento de Murasame. Los herreros te dan 3 Golds 🪙 y 3 de EXP 📚 por el acero recuperado.」`;
            await addkoin(sender, 3);
            await addXp(sender, 3);
        } else if (evento === "veneno") {
            vit = `🧪 「Exploraste un laboratorio abandonado y recuperaste veneno. Recibes 1 Gold 🪙 y 2 de EXP 📚 para el refugio de Night Raid.」`;
            await addkoin(sender, 1);
            await addXp(sender, 2);
        } else if (evento === "trampa") {
            vit = `🗡️ 「¡Descuido! Caíste en una trampa durante la exploración. La **Night Raid** tuvo que rescatarte... qué vergüenza. 🤣」`;
        }

        const datatt = `
╔════ ⭑✦.  🩸  ✦⭑ ════╗
     ❖ 𝐄𝐗𝐏𝐋𝐎𝐑𝐀𝐂𝐈𝐎́𝐍 𝐃𝐄 𝐑𝐔𝐓𝐀𝐒 ❖
${vit}
⌛ Nuevos sectores disponibles en 1 minuto...
╚════ ⭑✦ ⚔️ ✦⭑ ════╝
`;

        enviar(datatt);
    }
}
break



case 'listreg': case 'censomiembros de Night Raid': {
    if (!isGroup) return enviar("⚠️ Solo los Administradores pueden ver el censo en el grupo.");
    let R_ = []
    let teks = '🩸 *𝐂𝐄𝐍𝐒𝐎 𝐃𝐄 𝐂𝐀𝐙𝐀𝐃𝐎𝐑𝐄𝐒 𝐃𝐄 𝐋𝐀 𝐒𝐄𝐃𝐄* ⚔️\n\n'
    for(let R of registro){
        teks += `• 🛡️ @${R.id.split('@')[0]}\n`
        R_.push(R.id)
    }
    teks += `\n*Total de efectivos:* ${registro.length} agente de Night Raids.`
    mentions(teks, R_, true)
}
break 

case 'regalar':
case 'enviar':
case 'donar':
case 'enviaryenes': {
  if (!isGroup) return enviar("⚠️ Este comando solo funciona en grupos");

  (async () => {
    try {
      const emisor = sender;
      const mencionado = obtenerObjetivo(info, args[0], groupMembers);
      const montoToken = args.find(v => /^\d+(?:\.\d+)?$/.test(String(v)));
      const monto = Number(montoToken);

      if (!esObjetivoValido(mencionado)) return enviar("🩸 Menciona a un miembro o responde a su mensaje para enviarle suministros.\nEj: .enviar @ 10");
      if (mencionado === emisor) return enviar("🩸 No puede enviarse suministros a sí mismo.");
      if (isNaN(monto) || monto <= 0) return enviar("🩸 Ingrese una cantidad válida de Golds.");

      const saldoEmisor = await MoneyOfSender(emisor);
      if (saldoEmisor < monto) return enviar("❌ No posee suficientes **Golds** en su tesorería para este envío.");

      // Realizar transferencia de suministros
      await delkoin(emisor, monto);
      await addkoin(mencionado, monto);
      await sleep(100);

      enviar(`✅ **𝐒𝐔𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐎𝐒 𝐄𝐍𝐕𝐈𝐀𝐃𝐎𝐒**\n\nHas enviado *${monto} Golds* 🪙 al receptor. El intercambio ha sido registrado por la Night Raid.`, {
        mentions: [emisor, mencionado]
      });
    } catch (e) {
      enviar('❌ Error en los registros: ' + e.message);
    }
  })();
}
break;



case 'rep': case 'mirep': case 'reputacion': case 'reputación':
if(!isReg) return enviar(respuesta.registro)
const myrep = repUser(sender)

// Definimos el mensaje base con el estilo del Night Raid
const msmReputacion = (rango, mensaje) => `
╭━━━╾⭑✦ 𝑪𝑼𝑬𝑹𝑷𝑶 𝑫𝑬 𝑪𝑨𝒁𝑨𝑫𝑶𝑹𝑬𝑺 ✦⭑╼━━━╮
  ⚔️ **𝑼𝒔𝒖𝒂𝒓𝒊𝒐:** ${pushname}
  📊 **𝑹𝒆𝒑𝒖𝒕𝒂𝒄𝒊𝒐𝒏:** ${myrep}
  🎖️ **𝑹𝒂𝒏𝒈𝒐:** ${rango}
  
  ${mensaje}
╰━━━╾⭑✦ 𝑨𝒌𝒂𝒎𝒆𝑩𝒐𝒕-𝑴𝑫 ✦⭑╼━━━╯
`

if (myrep < 20) {
    await sock.sendMessage(from, {
        image: { url: getBotImage() },
        caption: msmReputacion("Novato (Agente de Night Raid) 🍢", "*¡Ánimo! Sigue entrenando duro para no morir en tu primera misión.*")
    }, { quoted: info });
} else if (myrep >= 21 && myrep <= 40) {
    await sock.sendMessage(from, {
        image: { url: getBotImage() },
        caption: msmReputacion("Aprendiz Avanzado (Operativo Avanzado) ⚔️", "*Se nota el progreso, pero tus movimientos aún son lentos. ¡No bajes la guardia!*")
    }, { quoted: info });
} else if (myrep >= 41 && myrep <= 60) {
    await sock.sendMessage(from, {
        image: { url: getBotImage() },
        caption: msmReputacion("Operativo Experimentado (Operativo) ⚡", "*¡Bien hecho! Ya eres capaz de enfrentar enemigos del Imperio con confianza.*")
    }, { quoted: info });
} else if (myrep >= 61 && myrep <= 80) {
    await sock.sendMessage(from, {
        image: { url: getBotImage() },
        caption: msmReputacion("Operativo de Élite (Kinoe) 🔥", "*Tu fuerza es admirable. Estás a un paso de la grandeza.*")
    }, { quoted: info });
} else {
    await sock.sendMessage(from, {
        image: { url: getBotImage() },
        caption: msmReputacion("Ejecutor de Élite ✨", "*¡Increíble! Has alcanzado la cima. Eres una leyenda viviente para Akame.*")
    }, { quoted: info });
}
break 

case 'top': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  const tema = obtenerTemaTop(q);
  const seleccionados = seleccionarUsuariosAleatorios(groupMembers, 10);
  if (!seleccionados.length) return enviar('🩸 No hay suficientes miembros para formar el Top.');
  const menciones = seleccionados.map(p => p.id);
  let mensaje = `🩸 *𝐀𝐊𝐀𝐌𝐄 — 𝐓𝐎𝐏 𝟏𝟎*\n\n*Top:* ${tema}\n\n`;
  seleccionados.forEach((p, i) => {
    const icono = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}️⃣`;
    mensaje += `${icono} @${p.id.split('@')[0]}\n`;
  });
  mensaje += `\n*Akame:* «La clasificación ha sido decidida.»`;
  await sock.sendMessage(from, { text: mensaje, mentions: menciones }, { quoted: info });
}
break;

case 'robar': case 'rob': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isReg) return enviar(respuesta.registro);
  const objetivo = obtenerObjetivo(info, args[0], groupMembers);
  if (!esObjetivoValido(objetivo)) return enviar('🩸 Menciona a un usuario o responde a su mensaje. Ejemplo: .robar @');
  if (objetivo === sender) return enviar('🩸 Akame no permite robarte a ti mismo.');
  if (!checkOfRegM(objetivo)) return enviar('🩸 El objetivo no está registrado en la economía.');
  const robos = cargarJsonSeguro(roboPath, {});
  const roboKey = `${from}:${sender}`;
  const ultimo = Number(robos[roboKey] || 0);
  const espera = 10 * 60 * 1000;
  const restante = espera - (Date.now() - ultimo);
  if (restante > 0) return enviar(`🩸 Debes esperar ${Math.ceil(restante / 60000)} minuto(s) antes de intentar otro robo.`);
  const saldoObjetivo = Number(MoneyOfM(objetivo) || 0);
  if (saldoObjetivo <= 0) return enviar('🩸 Ese objetivo es tan pobre que no tiene Golds que puedas robar.');
  const maximo = Math.max(1, Math.min(500, Math.floor(saldoObjetivo * 0.25)));
  const exito = Math.random() < 0.55;
  robos[roboKey] = Date.now();
  guardarJsonSeguro(roboPath, robos);
  if (exito) {
    const botin = Math.max(1, Math.floor(Math.random() * maximo) + 1);
    await delkoinM(objetivo, botin);
    await addkoin(sender, botin);
    return enviar(`🩸 *𝐑𝐎𝐁𝐎 𝐄𝐉𝐄𝐂𝐔𝐓𝐀𝐃𝐎*\n\n@${sender.split('@')[0]} consiguió robarle *${botin} Golds 🪙* a @${objetivo.split('@')[0]}.\n\n*Akame:* «No dejes rastros.»`, { mentions: [sender, objetivo] });
  }
  const multa = Math.min(100, Math.max(1, Math.floor((Number(MoneyOfSender(sender) || 0)) * 0.05)));
  if (multa > 0) await delkoin(sender, multa);
  return enviar(`⚠️ *𝐑𝐎𝐁𝐎 𝐅𝐀𝐋𝐋𝐈𝐃𝐎*\n\n@${sender.split('@')[0]} fue descubierto. Perdió *${multa} Golds 🪙* como penalización.\n\n*Akame:* «Te atraparon.»`, { mentions: [sender] });
}
break;

case 'palabras': case 'filtro': case 'wordfilter': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  const valor = String(args[0] || '').toLowerCase();
  if (!['on','off'].includes(valor)) return enviar('🩸 Usa *palabras on* para activar o *palabras off* para desactivar.');
  const data = cargarJsonSeguro(moderacionPath, moderacionInicial);
  if (!data.activo) data.activo = {};
  data.activo[from] = valor === 'on';
  guardarJsonSeguro(moderacionPath, data);
  await enviar(`🩸 *FILTRO DE PALABRAS ${valor === 'on' ? 'ACTIVADO' : 'DESACTIVADO'}*`);
}
break;


case 'mute': case 'silenciar': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  if (!isBotGroupAdmins) return enviar(respuesta.botadmin);

  const objetivo = obtenerObjetivo(info, args[0], groupMembers);
  if (!esObjetivoValido(objetivo)) return enviar('🩸 Responde al mensaje del usuario o usa .mute @usuario / .mute número.');
  if (objetivo === sender || objetivo === BotNumber || numerodono.includes(objetivo)) return enviar('🩸 Ese objetivo no puede ser silenciado.');
  const miembro = groupMembers.find(p => p.id === objetivo);
  if (miembro?.admin) return enviar('🩸 No puedo silenciar a un administrador. Primero quítale el admin.');

  const dataMute = cargarJsonSimple(mutePath, { groups: {} });
  if (!dataMute.groups[from]) dataMute.groups[from] = [];
  const idsMute = [objetivo, miembro?.lid].filter(Boolean);
  for (const id of idsMute) {
    if (!dataMute.groups[from].some(jid => mismoJid(jid, id))) dataMute.groups[from].push(id);
  }
  guardarJsonSimple(mutePath, dataMute);

  await enviar(`🔇 *MUTE ACTIVADO*\n\n@${objetivo.split('@')[0].split(':')[0]} quedará silenciado y sus mensajes serán eliminados automáticamente mientras Akame sea administradora.`, { mentions: [objetivo] });
}
break;

case 'unmute': case 'desmute': case 'desilenciar': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);

  const objetivo = obtenerObjetivo(info, args[0], groupMembers);
  if (!esObjetivoValido(objetivo)) return enviar('🩸 Responde al mensaje del usuario o usa .unmute @usuario / .unmute número.');

  const dataMute = cargarJsonSimple(mutePath, { groups: {} });
  const lista = dataMute.groups[from] || [];
  const miembroObjetivo = obtenerMiembroPorIdentidad(groupMembers, objetivo);
  const idsObjetivo = [objetivo, miembroObjetivo?.id, miembroObjetivo?.lid].filter(Boolean);
  dataMute.groups[from] = lista.filter(jid => !idsObjetivo.some(id => mismoJid(jid, id)));
  guardarJsonSimple(mutePath, dataMute);

  await enviar(`🔊 *MUTE DESACTIVADO*\n\n@${objetivo.split('@')[0].split(':')[0]} ya puede enviar mensajes normalmente.`, { mentions: [objetivo] });
}
break;

case 'promote': case 'promover': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  if (!isBotGroupAdmins) return enviar(respuesta.botadmin);

  const objetivo = obtenerObjetivo(info, args[0], groupMembers);
  if (!esObjetivoValido(objetivo)) return enviar('🩸 Responde al mensaje o usa .promote @usuario / .promote número.');
  try {
    await sock.groupParticipantsUpdate(from, [objetivo], 'promote');
    await enviar(`🛡️ *ADMIN OTORGADO*\n\n@${objetivo.split('@')[0].split(':')[0]} ahora es administrador.`, { mentions: [objetivo] });
  } catch (e) {
    await enviar(`🩸 No pude dar administrador a ese usuario.\n\n${e.message || 'WhatsApp rechazó la operación.'}`);
  }
}
break;

case 'demote': case 'degradar': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  if (!isBotGroupAdmins) return enviar(respuesta.botadmin);

  const objetivo = obtenerObjetivo(info, args[0], groupMembers);
  if (!esObjetivoValido(objetivo)) return enviar('🩸 Responde al mensaje o usa .demote @usuario / .demote número.');
  if (objetivo === BotNumber || objetivo === sender) return enviar('🩸 No voy a quitarle el admin a ese objetivo.');

  try {
    await sock.groupParticipantsUpdate(from, [objetivo], 'demote');
    await enviar(`🛡️ *ADMIN RETIRADO*\n\n@${objetivo.split('@')[0].split(':')[0]} ya no es administrador.`, { mentions: [objetivo] });
  } catch (e) {
    await enviar(`🩸 No pude quitarle el administrador a ese usuario.\n\n${e.message || 'WhatsApp rechazó la operación.'}`);
  }
}
break;

case 'antifalsos': case 'antifake': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  if (!isBotGroupAdmins) return enviar(respuesta.botadmin);

  const valor = String(args[0] || '').toLowerCase();
  const antiData = cargarJsonSimple(antifalsosPath, { groups: {} });
  if (valor === 'on') {
    antiData.groups[from] = true;
    guardarJsonSimple(antifalsosPath, antiData);
    return enviar('🛡️ *ANTIFALSOS ACTIVADO*\n\nAkame vigilará identificadores de WhatsApp anómalos o no válidos. Se rechazan solicitudes con prefijos configurados como árabes o identificadores claramente inválidos.');
  }
  if (valor === 'off') {
    antiData.groups[from] = false;
    guardarJsonSimple(antifalsosPath, antiData);
    return enviar('🛡️ *ANTIFALSOS DESACTIVADO*');
  }
  return enviar('🩸 Usa .antifalsos on o .antifalsos off.');
}
break;

case 'advertir': case 'warn': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  const objetivo = obtenerObjetivo(info, args[0], groupMembers);
  if (!objetivo) return enviar('🩸 Menciona a un usuario o responde a su mensaje para advertirlo.');
  const actual = obtenerAdvertencias(from, objetivo);
  const nuevo = Math.min(3, actual + 1);
  cambiarAdvertencias(from, objetivo, nuevo);
  await enviar(`⚠️ *𝐀𝐃𝐕𝐄𝐑𝐓𝐄𝐍𝐂𝐈𝐀*\n\n@${objetivo.split('@')[0]} tiene *${nuevo}/3* advertencias.\n\n*Akame:* «La próxima decisión será más severa.»`, { mentions: [objetivo] });
}
break;

case 'advertencias': case 'warnings': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  const objetivo = obtenerMencionado(info) || sender;
  const cantidad = obtenerAdvertencias(from, objetivo);
  await enviar(`⚠️ *𝐀𝐃𝐕𝐄𝐑𝐓𝐄𝐍𝐂𝐈𝐀𝐒*\n\n@${objetivo.split('@')[0]} tiene *${cantidad}/3* advertencias.`, { mentions: [objetivo] });
}
break;

case 'quitaradvertencia': case 'delwarn': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  const objetivo = obtenerObjetivo(info, args[0], groupMembers);
  if (!objetivo) return enviar('🩸 Menciona a un usuario o responde a su mensaje.');
  const nuevo = Math.max(0, obtenerAdvertencias(from, objetivo) - 1);
  cambiarAdvertencias(from, objetivo, nuevo);
  await enviar(`🩸 Se eliminó una advertencia a @${objetivo.split('@')[0]}. Ahora tiene *${nuevo}/3*.`, { mentions: [objetivo] });
}
break;

case 'reiniciaradvertencias': case 'resetwarn': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  const objetivo = obtenerObjetivo(info, args[0], groupMembers);
  if (!objetivo) return enviar('🩸 Menciona a un usuario o responde a su mensaje.');
  cambiarAdvertencias(from, objetivo, 0);
  await enviar(`🩸 Las advertencias de @${objetivo.split('@')[0]} han sido reiniciadas.`, { mentions: [objetivo] });
}
break;

case 'agregarpalabra': case 'addword': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  const palabra = normalizarTextoModeracion(q);
  if (!palabra) return enviar('🩸 Escribe una palabra para añadir.');
  const data = cargarJsonSeguro(moderacionPath, moderacionInicial);
  if (!data.palabras.includes(palabra)) data.palabras.push(palabra);
  guardarJsonSeguro(moderacionPath, data);
  await enviar(`🩸 La palabra *${palabra}* ha sido añadida a la Purga Imperial.`);
}
break;

case 'eliminarpalabra': case 'delword': {
  if (!isGroup) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  const palabra = normalizarTextoModeracion(q);
  const data = cargarJsonSeguro(moderacionPath, moderacionInicial);
  data.palabras = data.palabras.filter(p => p !== palabra);
  guardarJsonSeguro(moderacionPath, data);
  await enviar(`🩸 La palabra *${palabra || 'indicada'}* ha sido eliminada del filtro.`);
}
break;

case 'listaofensivas': case 'filterwords': {
  if (!isGroup && !isOwner) return enviar('🩸 Este comando solo funciona en grupos.');
  if (!isGroupAdmins && !isOwner) return enviar(respuesta.admin);
  const data = cargarJsonSeguro(moderacionPath, moderacionInicial);
  await enviar(`🩸 *𝐏𝐀𝐋𝐀𝐁𝐑𝐀𝐒 𝐕𝐈𝐆𝐈𝐋𝐀𝐃𝐀𝐒*\n\n${data.palabras.map((p, i) => `${i + 1}. ${p}`).join('\n')}`);
}
break;

case 'rank': case 'rankrep': 
    if(!isGroup) return 
    if(!isGroupAdmins) return enviar(respuesta.admin)
    let teks2 = `╭━━━╾⭑✦ 𝑹𝑨𝑵𝑲 𝑫𝑬 𝑯𝑶𝑵𝑶𝑹 ✦⭑╼━━━╮\n  *⚔️ TOP 10 MIEMBROS CON MÁS REPUTACIÓN*\n\n`;
    registro.sort((a, b) => b.rep - a.rep)
           .slice(0, 10)
           .forEach((usuario, indice) => {
               teks2 += `  ${indice + 1}. *${usuario.nombre}* ➫ _${usuario.rep}_ de Reputación\n`;
           });
    teks2 += `╰━━━╾⭑✦ 𝑨𝒌𝒂𝒎𝒆𝑩𝒐𝒕-𝑴𝑫 ✦⭑╼━━━╯`
    enviar(teks2)
break 

case 'rankcoins': {
    if (!isGroup) return;
    if(!isGroupAdmins) return enviar(respuesta.admin)
    const pathi = './settings/Grupo/Json/registros.json';
    const registro = JSON.parse(fs.readFileSync(pathi, 'utf8'));

    let rankingMensaje = `╭━━━╾⭑✦ 𝑹𝑨𝑵𝑲 𝑫𝑬 𝑹𝑰𝑸𝑼𝑬𝒁𝑨 ✦⭑╼━━━╮\n  *🪙 TOP 10 MILLONARIOS DEL CUERPO*\n\n`;

    const rankingArray = Array.isArray(registro)
      ? registro
      : Object.entries(registro).map(([jid, data]) => ({
          nombre: data.nombre || jid.split('@')[0],
          dinero: data.dinero || 0,
        }));

    rankingArray
      .sort((a, b) => b.dinero - a.dinero)
      .slice(0, 10)
      .forEach((usuario, index) => {
        rankingMensaje += `  ${index + 1}. *${usuario.nombre}* ➫ _${usuario.dinero}_ Golds\n`;
      });
    
    rankingMensaje += `╰━━━╾⭑✦ 𝑨𝒌𝒂𝒎𝒆𝑩𝒐𝒕-𝑴𝑫 ✦⭑╼━━━╯`
    enviar(rankingMensaje);
}
break;

case 'ranknivel': {
    if(!isGroup) return 
    if(!isGroupAdmins) return enviar(respuesta.admin)
    let teks = `╭━━━╾⭑✦ 𝑹𝑨𝑵𝑲 𝑫𝑬 𝑷𝑶𝑫𝑬𝑹 ✦⭑╼━━━╮\n  *🆙 TOP 10 MIEMBROS POR NIVEL*\n\n`
    registro.sort((a,b) => b.nivel - a.nivel)
           .slice(0, 10) // Agregué el slice para que no sea infinito
           .forEach((usuario,index) => {
               teks += `  ${index + 1}. *${usuario.nombre}* ➫ Nivel _*${usuario.nivel}*_\n`
           });
    teks += `╰━━━╾⭑✦ 𝑨𝒌𝒂𝒎𝒆𝑩𝒐𝒕-𝑴𝑫 ✦⭑╼━━━╯`
    enviar(teks)
}
break 

case "tienda":
if (!q) return enviar(`
╭━━━╾⭑✦ 𝑴𝑬𝑹𝑪𝑨𝑫𝑶 𝑫𝑬 𝑨𝑲𝑨𝑴𝑬 ✦⭑╼━━━╮
  🏴 "Bienvenido, miembro de Night Raid. Prepárate bien."
━━━━━━━━━━━━━━━━━━━━━━
⚔️ **𝑨𝒓𝒕𝒊𝒄𝒖𝒍𝒐 1:**
👉 \`.tienda 1\`
🏷️ 50 𝒀𝒆𝒏𝒆𝒔 🪙 🔁 200 𝑬𝑿𝑷 🧪
*(Aumenta tu fuerza de entrenamiento)*

🏷️ **𝑨𝒓𝒕𝒊𝒄𝒖𝒍𝒐 2:**
👉 \`.tienda 2 [nivel] [nombre]\`
🏷️ 50 𝒀𝒆𝒏𝒆𝒔 🪙 🔁 𝑵𝒖𝒆𝒗𝒐 𝑹𝒂𝒏𝒈𝒐 🎖️
*(Cambia el nombre de los rangos oficiales)*

🌀 **𝑨𝒓𝒕𝒊𝒄𝒖𝒍𝒐 3:**
👉 \`.emojimix 😇+😈\`
🏷️ 1 𝒀𝒆𝒏 🪙 🔁 𝑪𝒐𝒎𝒃𝒊𝒏𝒂𝒓 𝑬𝒎𝒐𝒋𝒊𝒔

🎨 **𝑨𝒓𝒕𝒊𝒄𝒖𝒍𝒐 4:**
👉 \`.sticker\` (en imagen/video)
🏷️ 1 𝒀𝒆𝒏 🪙 🔁 𝑪𝒓𝒆𝒂𝒓 𝑺𝒕𝒊𝒄𝒌𝒆𝒓𝒔
╰━━━╾⭑✦ 𝑨𝒌𝒂𝒎𝒆𝑩𝒐𝒕-𝑴𝑫 ✦⭑╼━━━╯
`);

// COMPRA DE EXP
if (q.startsWith("1")) {
    if (coins < 50) return enviar("❌ No tienes suficientes Golds. Necesitas al menos 50 🪙 para este entrenamiento.");
    await delkoin(sender, 50);
    await addXp(sender, 200);

    return enviar(`⚔️ ¡Excelente, ${pushname}! Has invertido 50 Golds en entrenamiento intenso. Ganaste 200 EXP.`);
}

// CAMBIO DE RANGO
if (q.startsWith("2")) {
    const args = q.split(" ");
    const nivel = parseInt(args[1]);
    const nuevoNombre = args.slice(2).join(" ");

    if (isNaN(nivel) || !nuevoNombre) {
        return enviar("❌ Formato incorrecto, miembro de Night Raid. Usa: .tienda 2 <nivel> <nuevo nombre>\nEjemplo: .tienda 2 5 Los Operativos de Élite");
    }

    if (coins < 50) {
        return enviar("❌ No tienes suficientes Golds para proponer un nuevo orden de rangos. Necesitas 50 🪙.");
    }

    const path = './settings/rangos.json';
    let rangosData;

    try {
        rangosData = JSON.parse(fs.readFileSync(path));
    } catch (e) {
        return enviar("⚠️ Error en los registros del Night Raid. El archivo de rangos no responde.");
    }

    rangosData[nivel] = nuevoNombre;

    try {
        fs.writeFileSync(path, JSON.stringify(rangosData, null, 2));
        await delkoin(sender, 50);

        return enviar(`✅ ¡Orden actualizado, ${pushname}!\nEl rango del nivel *${nivel}* ahora es:\n✨ *${nuevoNombre}* ✨\nSe han cobrado 50 Golds por el trámite.`);
    } catch (e) {
        return enviar("⚠️ El mensajero de Night Raid se perdió. No se pudo guardar el cambio.");
    }
}

break;

//DESCARGAS
case 'alea': case 'casar' : case 'parejas': {
    if(!isReg) return enviar(respuesta.registro)
    const men1 = groupMembers[Math.floor(Math.random() * groupMetadata.participants.length)]
    const men3 = groupMembers[Math.floor(Math.random() * groupMetadata.participants.length)]
    const men2 = men1.id
    const men4 = men3.id
    
    const rmen = `✨ **𝑫𝑬𝑪𝑹𝑬𝑻𝑶 𝑫𝑬 𝑨𝑴𝑶𝑹** ✨\n\n🌸 @${men4.split('@')[0]} esta enamorad@ de @${men2.split('@')[0]}.\n\n*¡celebramos esta unión! Deberían casarse y fortalecer su linaje.* 💍`
    
    sock.sendMessage(from, { text: rmen, mentions: [men4, men2] }, { quoted: info })
}
break 

// COMANDOS SIN PREFIJO
default:

// Eval para el Dueño
if (budy.startsWith('=>Duueño')) {
    if (!isOwner) return enviar(respuesta.miowner)
    try {
        enviar(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
    } catch (e) {
        enviar(String(e))
    }
}

} // Cierre del switch principal

} catch (e) {
    e = String(e)
    if (!e.includes("this.isZero") && !e.includes("Could not find MIME for Buffer <null>") && !e.includes("Cannot read property 'conversation' of null") && !e.includes("Cannot read property 'contextInfo' of undefined") && !e.includes("Cannot set property 'mtype' of undefined") && !e.includes("jid is not defined")) {
        console.log('Error detectado por AkameBot: %s', color(e, 'red'))
    }
}

})
}

/////////// MONITOREO DEL ARCHIVO
// Iniciar los limpiadores de cooldown una sola vez.
// Antes estaban dentro de messages.upsert y podían crear intervalos repetidos por cada mensaje.
expiredClaim();
expiredMinar();
expiredAttp();
expiredEmoji();
expiredEve();
expiredDayli();
expiredPescar();
expiredRuleta();
expiredCasino();

startProo()
fs.watchFile('./index.js', (curr, prev) => {
    if (curr.mtime.getTime() !== prev.mtime.getTime()) {
        console.log(color('  [❗] ¡Atención Akame! El archivo Index fue modificado. Reiniciando...',"blue"));
        process.exit()
    }
})
