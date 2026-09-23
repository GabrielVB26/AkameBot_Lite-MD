const xpNecesariaNivel = (nivel) => Math.floor(60 * Math.pow(Math.max(1, Number(nivel) || 1), 1.45) + 40 * Math.max(1, Number(nivel) || 1));

const crypto = require('crypto')
const fs = require('fs')
const moment = require("moment-timezone") 
const time = moment.tz('America/Lima').format('DD/MM HH:mm:ss')
let Nreg = JSON.parse(fs.readFileSync('./settings/Grupo/Json/registros.json'));

const registro = JSON.parse(fs.readFileSync('./settings/Grupo/Json/registros.json'))
/////REGISTRO
 const AddReg = ( sender, nombre) => {
     const obj = {
  id : sender ,
  nombre : nombre,
  nivel : 1,
  xp : 0,
  rxp : xpNecesariaNivel(1),
  dinero : 50,
  rep : 0,
  banco : 0}
            registro.push(obj)
            fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null , 2 )+'\n')
        }

        

        const checkOfReg = (sender) => {
            let status = false
            Object.keys(registro).forEach((i) => {
                if (registro[i].id === sender) {
                    status = true
                }
            })
            return status
        }
        
      const checkOfRegM  = (usuario) => {
            let status = false
            Object.keys(registro).forEach((i) => {
                if (registro[i].id === usuario) {
                    status = true
                }
            })
            return status
        }
        
 //////REGISTRO
 /////ECONOMÍA 

const delkoin = (sender, monto) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
registro[position].dinero -= monto
fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null , 2 )+'\n')
}
}

const addkoin = (sender, monto) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
registro[position].dinero += monto
fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null , 2 )+'\n')
}
}

const MoneyOfSender = (sender) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
return registro[position].dinero
}
}
 
 /// mentioned
 const delkoinM = (usuario, monto) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === usuario) {
position = i
}
})
if (position !== false) {
registro[position].dinero -= monto
fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null , 2 )+'\n')
}
}

const addkoinM = (usuario, monto) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === usuario) {
position = i
}
})
if (position !== false) {
registro[position].dinero += monto
fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null , 2 )+'\n')
}
}

const MoneyOfM = (usuario) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === usuario) {
position = i
}
})
if (position !== false) {
return registro[position].dinero
}
}
////ECONOMÍA 
////NIVEL
const addLevel = (sender, monto) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
registro[position].nivel += monto
fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null , 2 )+'\n')
}
}
/////ADD XP
const addXp = (sender, monto) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
registro[position].xp += monto
fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null , 2 )+'\n')
}
}
////NIVEL DEL USUARIO 
const levelOfsender = (sender) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
return registro[position].nivel
}
}
///XP DEL USUARIO 
 const xpOfsender = (sender) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
return registro[position].xp
}
}          
///////////RXP
const addRxp = (sender,monto) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
registro[position].rxp += monto
fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null , 2 )+'\n')
}
}
const Rxp = (sender) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
return registro[position].rxp
}
}





// Función para agregar reputación a un usuario
const addRep = (usuario, monto) => {
    let status = false;

    // Asegúrate de que el usuario sea una cadena
    if (typeof usuario === 'string') {
        // Recorta el valor del usuario para asegurarse de que no haya espacios adicionales
        usuario = usuario.trim();

        // Busca el usuario dentro de registro
        registro.forEach((user, index) => {
            // Recorta los valores de id de los usuarios en el JSON para evitar problemas con espacios
            let userId = user.id.trim();
            if (userId === usuario) {
                console.log(`Usuario encontrado: ${userId}`); // Depuración: Verificación de usuario
                user.rep += monto;  // Actualiza la reputación del usuario
                console.log(`Nueva reputación: ${user.rep}`); // Depuración: Verificación de reputación
                status = true;  // Marca que se encontró y se actualizó el usuario
            }
        });
    }

    // Si el usuario fue encontrado y se actualizó, guarda el archivo
    if (status) {
        console.log('Guardando cambios en el archivo JSON...');
        fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null, 2) + '\n');
        console.log('Cambios guardados correctamente.');
    } else {
        console.log('Usuario no encontrado o no se pudo actualizar.');
    }
}



// Función para agregar reputación a un usuario
const delRep = (usuario, monto) => {
    let status = false;

    // Asegúrate de que el usuario sea una cadena
    if (typeof usuario === 'string') {
        // Recorta el valor del usuario para asegurarse de que no haya espacios adicionales
        usuario = usuario.trim();

        // Busca el usuario dentro de registro
        registro.forEach((user, index) => {
            // Recorta los valores de id de los usuarios en el JSON para evitar problemas con espacios
            let userId = user.id.trim();
            if (userId === usuario) {
                console.log(`Usuario encontrado: ${userId}`); // Depuración: Verificación de usuario
                user.rep -= monto;  // Actualiza la reputación del usuario
                console.log(`Nueva reputación: ${user.rep}`); // Depuración: Verificación de reputación
                status = true;  // Marca que se encontró y se actualizó el usuario
            }
        });
    }

    // Si el usuario fue encontrado y se actualizó, guarda el archivo
    if (status) {
        console.log('Guardando cambios en el archivo JSON...');
        fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null, 2) + '\n');
        console.log('Cambios guardados correctamente.');
    } else {
        console.log('Usuario no encontrado o no se pudo actualizar.');
    }
}


const repUser = (sender) =>{
let position = false ;
Object.keys(registro).forEach((i) =>{
if(registro[i].id === sender){
position = i
}})
if(position !== false){
return registro[position].rep
}}
function saldoBanco(sender) { const u=registro.find(x=>x.id===sender); return u ? Number(u.banco||0) : 0; }
function depositar(sender,monto) { const u=registro.find(x=>x.id===sender); const n=Math.floor(Number(monto)||0); if(!u||n<=0||Number(u.dinero||0)<n)return false; u.dinero=Number(u.dinero||0)-n; u.banco=Number(u.banco||0)+n; fs.writeFileSync('./settings/Grupo/Json/registros.json',JSON.stringify(registro,null,2)+'\n'); return true; }
function retirar(sender,monto) { const u=registro.find(x=>x.id===sender); const n=Math.floor(Number(monto)||0); if(!u||n<=0||Number(u.banco||0)<n)return false; u.banco=Number(u.banco||0)-n; u.dinero=Number(u.dinero||0)+n; fs.writeFileSync('./settings/Grupo/Json/registros.json',JSON.stringify(registro,null,2)+'\n'); return true; }

////LEVEL  
   module.exports = {
   MoneyOfSender, 
   addkoin ,
    delkoin,  
    AddReg, 
    checkOfReg , 
    addLevel , 
    addXp , 
    levelOfsender , 
    xpOfsender ,
    checkOfRegM,
    addkoinM , 
    delkoinM ,
     MoneyOfM,
    Rxp,
    addRxp,
    addRep ,
    delRep , 
    repUser,
   saldoBanco,
   depositar,
   retirar,
   xpNecesariaNivel
    }