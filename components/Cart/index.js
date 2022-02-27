const express = require('express');

const cartController= require('./controller/cartController')



module.exports = app => {
    let router = express.Router()
    app.use('/api/carrito', router)
    router.post('/', cartController.addCart)
    router.delete('/:id', cartController.deleteCart)
    router.get('/:id/productos', cartController.getCart)
    router.post('/:id/productos',cartController.addToCart)
    router.delete('/:id/productos/:id_prod',cartController.deleteProdFromCart)
}