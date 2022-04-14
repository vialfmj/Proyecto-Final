const MariaDbContainer = require("../../contenedores/mariaDbContainer")
const mariadb = require("../../../config/mariaDb")
const Boom = require("@hapi/boom")

class MariaDbDaoCart extends MariaDbContainer{
    constructor(){
        super(mariadb)
    }
    addCart = async()=>{
       try {
           const generateId = () => Math.random().toString(36).substr(2, 18);
           const idCart= generateId()
           await mariadb.schema.createTable(`${idCart}`, table => {
               table.increments()
               table.string("nombre");
               table.float("precio");
               table.integer("id_prod")
               table.integer("cantidad")
            })
      return idCart
       } catch (error) {
           Boom.badData(error)
       }
         
    }
    getCart = async (idBuscado) =>{
        try {
            let rows = await mariadb.from(idBuscado).select("*")
            if(rows)
            return rows
            else 
            return []
        } catch (error) {
            Boom.badData(error)
        }

    }
    addToCart = async (id,producto)=>{
        try {
            await mariadb(`${id}`).insert({
                nombre: producto.nombre,
                precio: producto.precio,
                id_prod: producto.id,
            })
            return "se agrego al carrito"
        } catch (error) {
            Boom.badData(error)
        }

    }
    deleteProdFromCart = async (cart,id_prod) => {
        try {
            console.log(cart, id_prod)
            await mariadb.from(cart).where({id: id_prod }).del()
        } catch (error) {
            Boom.badData(error)
        }
    }
}

module.exports = MariaDbDaoCart