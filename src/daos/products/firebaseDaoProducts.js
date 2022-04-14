const FirebaseDbContainer = require("../../contenedores/firebaseDbContainer")
const {admin} = require("../../../config/fireBase")
const db = admin.firestore();
const query = db.collection("productos")
const Boom = require("@hapi/boom")

class FirebaseDbDaoProducts extends FirebaseDbContainer{
    constructor(){
        super(admin)
    }
    getAll= async ()=>{
        try {
            const snapshot = await query.get()
            let productos = []
            snapshot.forEach(doc =>{
                productos = [...productos, doc.data()]
            })
            return productos
        } catch (error) {
            return Boom.badData(error)
        }
    }
    getById = async(idBuscado) =>{
        try {
            const snapshot = await query.doc(idBuscado).get()
            const producto = snapshot.data()
            return producto
        } catch (error) {
            Boom.badData(error)
        }
    }
    add = async (producto,admin) =>{
        try{
            if(admin === true){
                const ref = await query.add(producto)
                const id_Prod = ref.id
                await query.doc(id_Prod).update({id: id_Prod})
                return `${id_Prod}`
            }
            else
            return{
                error:{ 
                    ruta: 'http://localhost:8080/api/productos',
                    metodo: 'POST',
                    estado: 'no autorizada'
                }
            }
        } catch(error){
            return Boom.badData(error)
        }
    }
    update = async (id, updatedProduct,admin) =>{
        try {
            if(admin===true){
                await query.doc(id).update(updatedProduct)
                return "exito"
            }
            else
            return{
                error:{ 
                    ruta: 'http://localhost:8080/api/productos',
                    metodo: 'POST',
                    estado: 'no autorizada'
                }
            }
        } catch (error) {
            return Boom.badData(error)
        }
    }
    delete = async (id,admin) =>{
        try {
            if(admin === true){
                await query.doc(id).delete()
                return "se eliminio el producto:"+id
            }
            else
            return{
                error:{ 
                    ruta: 'http://localhost:8080/api/productos',
                    metodo: 'POST',
                    estado: 'no autorizada'
                }
            }
        } catch (error) {
            return Boom.badData(error)
        }
    }


}
module.exports = FirebaseDbDaoProducts