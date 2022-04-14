const MongoDbContainer = require("../../contenedores/mongoDbContainer")
const mongoose = require("../../../config/mongoDB")
const {ProductoModel} = require("../../../models/index")
const Boom = require("@hapi/boom")
class MongoDbDaoProducts extends MongoDbContainer{
    constructor(){
        super(mongoose)
    }
    getAll= async ()=>{
        try {
            let lectura = await ProductoModel.find({}) 
            return lectura
        } catch (error) {
            console.log(error,"error in MongoDbContainer: getAll()")
        }

    }
    getById= async (idBuscado)=>{
        try {
            const res = await ProductoModel.findById(idBuscado)
            return res
       
        } catch (error) {
            console.log(error,"error in MongoDbContainer: getById()")
            }
    }
    add= async (producto,admin)=>{
        try {
            if(admin ===true){
                const newProduct = ProductoModel(producto)
                const newProductSaved = await newProduct.save()
                return `producto agregado con el id:${newProductSaved._id}`
   
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
    update= async (id, updatedProduct,admin)=>{
        try {
            if(admin===true){
                await ProductoModel.findByIdAndUpdate(id,updatedProduct)
                return `se modifico el producto con id: ${id}`
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
    delete= async (id, admin)=>{
        try {
            if(admin===true){
                await ProductoModel.findByIdAndDelete(id)
                return `se elimino el producto: ${id}`
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

module.exports = MongoDbDaoProducts