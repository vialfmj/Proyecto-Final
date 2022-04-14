const { admin } = require("../../../config/fireBase")
const FirebaseDbContainer = require("../../contenedores/firebaseDbContainer")
const db = admin.firestore();
const query = db.collection("carts")
const Boom = require("@hapi/boom")
class FirebaseDaoCart extends FirebaseDbContainer{
    constructor(){
        super(admin)
    }
    addCart = async () =>{
        try {
            const cart ={
                productos: []
            }
            const ref = await query.add(cart)
            const idCart = ref.id
            return idCart
        } catch (error) {
            return Boom.badData(error)
        }

    }
    getCart = async(idBuscado) =>{
        try {
            const snapshot = await query.doc(idBuscado).get()
            const {productos} = snapshot.data()
            return productos
        } catch (error) {
            Boom.badData(error)
        }
    }
    addToCart = async (id,producto) =>{
        try {
            const productos = await this.getCart(id)
            const newProductos = [...productos, producto]
            await query.doc(id).update({productos: newProductos})
            return "se agrego al carrito"
        } catch (error) {
            Boom.badData(error)
        }
    }
    deleteProdFromCart = async(id,id_prod)=>{
        try {
            const productos = await this.getCart(id)
            const newProductos = productos.filter(producto => producto.id !== id_prod)
            await query.doc(id).update({productos: newProductos})
            return "se elimino el producto"
        } catch (error) {
            Boom.badData(error)
        }
    }
}
module.exports = FirebaseDaoCart