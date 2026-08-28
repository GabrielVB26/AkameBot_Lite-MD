<h1 align="center">🩸⚔️ AkameBot_Lite-MD ⚔️🩸</h1>

<p align="center">
  <img src="https://i.postimg.cc/y8y5hJjS/a1ab5cc1d621061308dec1aab68131fe.jpg" width="300" alt="AkameBot Lite" />
</p>

<p align="center"><b>Bot de WhatsApp ligero para administración, protección, juegos, economía, stickers y herramientas de grupo.</b></p>

---

## 🩸 HERRAMIENTAS

### 🛡️ Administración y protección
- AntiLink
- AntiSpam
- AntiFalsos
- Autoaceptar
- Bienvenida
- Modo administrador
- Mute / Unmute
- Ban / Kick
- Promote / Demote
- Advertencias
- Invocaciones y anuncios
- Gestión del grupo

### 🎮 Juegos
- Piedra, Papel o Tijera
- PVP
- Adivinanzas
- Retos y preguntas
- Dados
- Incursiones y exploraciones

### 💰 Economía
- Registro
- Perfil y cartera
- Niveles y experiencia
- Misiones
- Tienda
- Reputación
- Rankings
- Recompensas

### 🎨 Stickers
- Stickers desde imágenes
- Stickers desde vídeos cortos

### ⚙️ Sistema
- Actualización automática
- SerBot / Servip
- Información del bot
- Ping
- Canal oficial

---

## 📱 INSTALACIÓN EN TERMUX

### 🚀 Automática

```bash
pkg update -y && pkg upgrade -y && pkg install git nodejs-lts ffmpeg wget tesseract -y && termux-setup-storage -y && git clone https://github.com/GabrielVB26/AkameBot_Lite-MD && cd AkameBot_Lite-MD && npm install && npm start
```

### 🛠️ Manual

```bash
pkg update -y
pkg upgrade -y
pkg install git nodejs-lts ffmpeg wget tesseract -y
termux-setup-storage
git clone https://github.com/GabrielVB26/AkameBot_Lite-MD
cd AkameBot_Lite-MD
npm install
npm start
```

---

## 🐧 INSTALACIÓN EN VPS / LINUX

### 🚀 Automática

```bash
git clone https://github.com/GabrielVB26/AkameBot_Lite-MD && cd AkameBot_Lite-MD && npm install && npm start
```

### 🛠️ Manual

```bash
git clone https://github.com/GabrielVB26/AkameBot_Lite-MD
cd AkameBot_Lite-MD
npm install
npm start
```

---

# 📖 MANUAL DE COMANDOS

> Todos los comandos pueden escribirse con prefijo (`.`, `#`, `/`, `!`, `?`, `*`, `•`) o sin prefijo. Cuando un comando necesite un usuario, puedes mencionarlo con `@` o responder directamente a su mensaje.

## 🛡️ Administración

**`antilink on/off`** — activa o desactiva la protección contra enlaces de WhatsApp.

**`antispam on/off`** — activa o desactiva la protección contra spam.

**`antifalsos on/off`** — activa o desactiva la detección de identificadores sospechosos.

**`autoaceptar on/off`** — activa o desactiva la aprobación automática de solicitudes.

**`welcome on/off`** — activa o desactiva las bienvenidas.

**`modoadmin on/off`** — limita los comandos a administradores.

**`bot on/off`** — activa o desactiva Akame únicamente en ese grupo.

**`mute @`** — silencia a un miembro.

**`unmute @`** — quita el silencio.

**`ban @`** — expulsa a un miembro.

**`promote @`** — da administrador.

**`demote @`** — quita administrador.

**`del`** — elimina el mensaje respondido.

**`advertir @`** — añade una advertencia.

**`advertencias @`** — consulta las advertencias de un miembro.

**`advertenciasall`** — muestra todas las advertencias del grupo.

**`quitaradvertencia @`** — elimina una advertencia.

**`reiniciaradvertencias @`** — reinicia las advertencias de un miembro.

**`borraradvertenciasall`** — borra todas las advertencias del grupo.

**`invitar @`** — envía una invitación a un usuario.

**`abrir`** — abre el grupo.

**`cerrar`** — cierra el grupo.

**`invocar`** — menciona a todos los miembros.

**`anuncio`** — realiza un anuncio grupal.

**`etiquetar`** — notifica al grupo mencionando a sus miembros.

**`calcular`** — realiza cálculos.

## 🎮 Juegos

**`dado`** — lanza un dado.

**`pvp @`** — desafía a un miembro a Piedra, Papel o Tijera.

**`ppt piedra/papel/tijera`** — juega contra Akame.

**`adivina`** — inicia una adivinanza.

**`reto`** — obtiene un reto.

**`verdad`** — obtiene una pregunta.

**`incursion`** — inicia una incursión.

**`explorar`** — inicia una exploración.

**`parejas`** — selecciona una pareja del grupo.

## 💰 Economía y RPG

**`reg`** — registra tu cuenta.

**`listreg`** — muestra los registrados.

**`perfil`** — muestra tu perfil.

**`cartera`** — consulta tus Golds.

**`nivel`** — muestra tu nivel.

**`daily`** — reclama la recompensa diaria.

**`mision`** — inicia una misión.

**`tienda`** — abre la tienda.

**`regalar @`** — regala Golds.

**`robar @`** — intenta robar Golds.

**`ruleta`** — juega a la ruleta.

**`tragamonedas`** — juega a la tragamonedas.

**`levelup`** — consulta las opciones de nivel.

**`reputacion`** — consulta la reputación.

**`rank`** — muestra el ranking de reputación.

**`rankcoins`** — muestra el ranking de Golds.

**`ranknivel`** — muestra el ranking de niveles.

## 🎨 Stickers

**`s`** — crea un sticker.

**`sticker`** — crea un sticker.

## ⚙️ Sistema

**`menu`** — muestra el menú.

**`actualizar`** — actualiza Akame desde el repositorio.

**`reiniciar`** — reinicia el bot.

**`ping`** — muestra el estado del bot.

**`botcompleto`** — muestra información del bot.

**`grupos`** — muestra información de grupos.

**`serbot`** — muestra cómo ser bot.

**`servip`** — muestra información de la versión VIP.

**`canal`** — muestra el canal oficial.

## 👑 Creador

**`seradmin`** — da administrador al creador.

**`noseradmin`** — quita administrador al creador.

**`antiprivado on/off`** — controla el acceso al privado del bot.

**`botglobal on/off`** — activa o desactiva el bot globalmente.

**`bangp`** — bloquea un grupo.

**`desbangp`** — levanta el bloqueo de un grupo.

---

## 📢 CANAL OFICIAL

https://whatsapp.com/channel/0029VbD46om42DcdavNtDO16

---

## 📜 LICENCIA

**Copyright © 2026 Gabriel-V. Todos los derechos reservados.**
