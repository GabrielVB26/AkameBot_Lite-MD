#!/data/data/com.termux/files/usr/bin/bash

NOCOLOR='\033[0m'
RED='\033[0;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
CYAN='\033[1;36m'

# AkameBot_Lite-MD necesita ffmpeg para convertir imágenes/videos a WebP.
# En Termux lo instala automáticamente si falta. En VPS/Linux solo avisa
# para no ejecutar apt con permisos que el usuario no haya autorizado.
if ! command -v ffmpeg >/dev/null 2>&1; then
  if [ -n "${PREFIX:-}" ] && command -v pkg >/dev/null 2>&1; then
    echo -e "${YELLOW}⚙️ ffmpeg no está instalado. Instalándolo en Termux...${NOCOLOR}"
    pkg install ffmpeg -y || {
      echo -e "${RED}❌ No pude instalar ffmpeg. Ejecuta: pkg install ffmpeg -y${NOCOLOR}"
      exit 1
    }
  else
    echo -e "${YELLOW}⚠️ ffmpeg no está instalado. Los stickers de imagen/video necesitan ffmpeg.${NOCOLOR}"
    echo "Instálalo con el gestor de paquetes de tu distribución y vuelve a iniciar Akame."
  fi
fi

export AKAME_SUPERVISOR=1
while :
do
  echo -e "${RED}🩸 AKAMEBOT_LITE-MD EN MODO AUTOMÁTICO${NOCOLOR}"
  node index.js
  code=$?
  # Evita un bucle agresivo si el proceso terminó inmediatamente.
  sleep 2
  clear 2>/dev/null || true
  echo -e "${CYAN}♻️ Akame se reiniciará (código ${code})...${NOCOLOR}"
done
