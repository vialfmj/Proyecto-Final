const fs = require("fs")


class Cart {
    getCart = async(idCart)=>{
        let respuesta = await fs.promises.readFile(`utils/carts/${idCart}.txt`, "utf-8")
        return respuesta
     }
    addCart = async ()=>{
        const generateId = () => Math.random().toString(36).substr(2, 18);
        let idCart= generateId()
        let idGen = generateId()
        let cartData =[{
            "title": "nuevoProducto",
            "price": "nuevoPrecio",
            "thumbnail": "nuevaUrl",
            "id" : idGen
        }]

        let respuesta = await fs.promises.writeFile(`utils/carts/${idCart}.txt`,JSON.stringify(cartData))
        return `se creo un nuevo carrito en con el id: ${idCart}`
    }
    deleteCart = async (id)=>{
        let respuesta = await fs.promises.unlink(`utils/carts/${id}.txt`,err=>{
            if (err)
                return "no se pudo borrar el carrito"
            else
                return "el carrito fue borrado"
        })
    }
    addToCart= async (id, producto)=>{
        let respuesta = JSON.parse(await this.getCart(id))
        const generateId = () => Math.random().toString(36).substr(2, 18);
        let idGen= generateId()
        producto = {
            ...producto,
            id: idGen

        }
        respuesta = [...respuesta, producto]
        let escritura = await fs.promises.writeFile(`utils/carts/${id}.txt`,JSON.stringify(respuesta))
        return 'producto agregado'

    }
    deleteProdFromCart = async (id, id_prod)=>{
        let cart = await this.getCart(id)
        let parseCart = JSON.parse(cart)
        let index = parseCart.findIndex(product => product.id === id_prod)
        let sliced=parseCart.splice(index,1)
        let respuesta = await fs.promises.writeFile(`utils/carts/${id}.txt`,JSON.stringify(parseCart))
        return "se elimino el elemento"
    }
}
module.exports = new Cart