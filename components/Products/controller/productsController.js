const config = require('../../../config')
const productsService = require('../services/productsService')

class ProductsContainer {
    getProducts = async (req,res,next)=>{
        let respuesta = await productsService.getProducts()
        res.send(respuesta)
    }
    getProductById = async (req,res,next)=>{
        const {id} = req.params
        let respuesta = await productsService.getProductById(Number(id))
        res.send(respuesta)
    }
    addProduct = async (req,res,next)=>{
        let {producto} = req.body
        let {admin} = req.body
        let respuesta = await productsService.addProduct(producto,admin)
        res.json(respuesta)
    }
    updateProduct = async (req,res,next)=>{
        let {id}= req.params
        let {producto, admin}= req.body
        let respuesta= await productsService.updateProduct(id,producto,admin)
        res.json(respuesta)
    }
    deleteProduct = async(req,res,next)=>{
        let {id} = req.params
        let {admin} =req.body
        let respuesta = await productsService.deleteProduct(id,admin)
        res.json(respuesta)


    }
}
module.exports = new ProductsContainer()