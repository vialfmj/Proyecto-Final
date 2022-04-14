const Boom = require("@hapi/boom")

const MongoDbContainer = require("../../contenedores/mongoDbContainer");
const mongoose = require("../../../config/mongoDB")
const {CartModel} = require("../../../models/index");


class MongoDbDaoCart extends MongoDbContainer{
    constructor(){
        super(mongoose)
    }
    addCart = async () =>{
        try {
            const newCart = await new CartModel()
            const resultado = await newCart.save()
            const {id} = resultado
            return `${id}`          
        } catch (error) {
            return Boom.badData(error)       
        }
    }
    getCart= async (id) =>{
        try {
            let cart = await CartModel.findById(id).lean()
            const {productos} = cart
            return productos

        } catch (error) {
            return Boom.badData(error)
        }
    }
    addToCart = async (id,producto)=>{
        try {
            let cart = await CartModel.findById(id).lean()
            let {productos} = cart
            productos = [...productos,producto]
            let newCart = await CartModel.findByIdAndUpdate(id,{productos:productos})
            return `se actualizo el cart`
        } catch (error) {
            return Boom.badData(error)
        }
    }
    deleteProdFromCart = async (id,id_prod)=>{
        try{
            let cart = await CartModel.findById(id).lean()
            let {productos} = cart
            let newProductos = productos.filter(producto => producto._id !== id_prod)
            await CartModel.findByIdAndUpdate(id,{productos: newProductos})
            return "se quito el producto"
        }catch(error){
            return Boom.badData(error)
        }
    }
}
module.exports = MongoDbDaoCart