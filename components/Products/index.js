const express = require('express')
const productsController = require ('./controller/productsController')
module.exports = app => {
    let router = express.Router()
    app.use('/api/productos', router)
    router.get('/', productsController.getProducts)
    router.get('/:id', productsController.getProductById)
    router.post('/', productsController.addProduct)
    router.put('/:id', productsController.updateProduct)   
    router.delete('/:id', productsController.deleteProduct)
}