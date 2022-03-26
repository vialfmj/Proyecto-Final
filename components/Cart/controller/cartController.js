const res = require('express/lib/response')
const {config}= require('../../../config')
const cartService = require("../services/cartService")

class Cart {
  addCart = async (req, res, next)=>{
    let respuesta = await cartService.addCart()
    res.json(respuesta)
    
  }
  deleteCart = async (req,res,next)=>{
    const {id} = req.params
    let respuesta = await cartService.deleteCart(id)
    console.log(respuesta)
    res.send(respuesta)
  }
  getCart= async (req, res, next) => {
      const {id} = req.params
      let respuesta = await cartService.getCart(id)
      res.send(respuesta)
  }
  addToCart = async (req,res,next)=>{
    const {id} = req.params
    const {producto, admin} = req.body
    console.log(req.body)
    let respuesta =await cartService.addToCart(id,producto)
    res.json(respuesta)
  }
  deleteProdFromCart = async (req,res,next)=>{
    const {id} = req.params
    const {id_prod} = req.params
    console.log(id)
    let respuesta = await cartService.deleteProdFromCart(id,id_prod)
    res.send(respuesta)
  }                                                  
}
module.exports = new Cart()