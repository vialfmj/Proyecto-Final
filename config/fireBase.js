const  Boom  = require("@hapi/boom")
const admin = require("firebase-admin")
const {firebase_db} = require("./index");

console.log("hola desde firebase");
(async ()=>{
    try {
        admin.initializeApp({
            credential: admin.credential.cert(firebase_db.serviceAccount),
            databaseURL: firebase_db.databaseURL
        })
        console.log("conexion de firebase establecida")
        
    } catch (error) {
        Boom.badRequest(error)
    }
})();

module.exports = {
    admin
}