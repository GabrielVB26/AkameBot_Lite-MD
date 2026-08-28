const fs = require('fs');
const path = require('path');
const AUTO_FEATURE_PATH = path.join(process.cwd(), 'settings', 'Grupo', 'Json', 'auto-funciones.json');
const DEFAULT_FEATURES = { audios: false, respuestas: false, acciones: false, juegos: true };
function ensureFile(){ fs.mkdirSync(path.dirname(AUTO_FEATURE_PATH), {recursive:true}); if(!fs.existsSync(AUTO_FEATURE_PATH)) fs.writeFileSync(AUTO_FEATURE_PATH, JSON.stringify({groups:{}},null,2)+'\n'); }
function readJson(){ ensureFile(); try{return JSON.parse(fs.readFileSync(AUTO_FEATURE_PATH,'utf8'));}catch{return {groups:{}};} }
function writeJson(data){ ensureFile(); fs.writeFileSync(AUTO_FEATURE_PATH, JSON.stringify(data,null,2)+'\n'); }
function obtenerFeature(grupo,feature){ if(!grupo || !grupo.endsWith('@g.us')) return true; const data=readJson(); const v=data.groups?.[grupo]?.[feature]; return typeof v==='boolean'?v:DEFAULT_FEATURES[feature]!==false; }
function establecerFeature(grupo,feature,activo){ const data=readJson(); if(!data.groups)data.groups={}; if(!data.groups[grupo])data.groups[grupo]={}; data.groups[grupo][feature]=Boolean(activo); writeJson(data); }
module.exports={obtenerFeature,establecerFeature};
