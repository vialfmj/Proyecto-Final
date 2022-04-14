const {mongoose} = require("../config/mongoDB")
let {Schema, model} = require("mongoose")


let productoSchema = require ("./schemas/producto")
const schema = new Schema(productoSchema,{
    timestamps: true,
    versionKey: false
})
let carritoSchema = require("./schemas/carrito")
const schema2 = new Schema(carritoSchema,{
    timestamps: true,
    versionKey: false
})
let ProductoModel = model('productos',schema)
let CartModel = model("carts", schema2)

module.exports={
    ProductoModel,
    CartModel
}