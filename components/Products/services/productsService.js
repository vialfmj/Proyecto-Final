const fs = require('fs')
const { deleteById } = require('../controller/productsController')
const productsController = require('../controller/productsController')


class ProductsContainer {
    getProducts = async ()=>{
        let respuesta = await fs.promises.readFile('utils/productos.txt', 'utf-8')
        return respuesta
    }
    getProductById = async (idBuscado)=>{
        const res = await fs.promises.readFile('utils/productos.txt')
        console.log(res)
        let respuesta = JSON.parse(res)
       if(respuesta)
        {
            let coincidencia = respuesta.find(element => element.id === idBuscado)
            return coincidencia
        }
        else 
        return 'no se encontro coincidencia'
    }
    addProduct = async (producto,admin)=>{
        if(admin === true){
            const generateId = () => Math.random().toString(36).substr(2, 18);
            let id= generateId()
    
            let prodToAdd = {
                ...producto,
                id: id
            }
            let productList = await fs.promises.readFile('utils/productos.txt', 'utf-8')
            let productListParsed = JSON.parse(productList)
            productListParsed = [
                ...productListParsed,
                prodToAdd
            ]
            let escritura = await fs.promises.writeFile('utils/productos.txt',JSON.stringify(productListParsed))
            return `producto agregado con el id: ${prodToAdd.id}`
        }
        else
        return {
            error:{ 
                ruta: 'http://localhost:8080/api/productos',
                metodo: 'POST',
                estado: 'no autorizada'

            }
        }
    }
    updateProduct = async (idBuscado, newProducto, admin)=>{
        if(admin === true){
            let respuesta = await this.getProducts()
            let productos = JSON.parse(respuesta)
            let newElement ={
                ...newProducto,
                id: idBuscado
            }
            if(productos){
                let posicion = productos.findIndex(prod=> prod.id=== idBuscado)
                productos[posicion] = newElement
                let escritura = await fs.promises.writeFile('utils/productos.txt',JSON.stringify(productos))
            }
            return `se actualizo el producto con id: ${idBuscado}`
        }
        else
        return {
            error:{ 
                ruta: 'http://localhost:8080/api/productos',
                metodo: 'DELETE',
                estado: 'no autorizada'

            }
        }
    }
    deleteProduct = async (idBuscado, admin) =>{
        let retorno
        if(admin === true){
            let getProducts = await this.getProducts()
            let productos = JSON.parse(getProducts)
            let indice = productos.findIndex(prod => prod.id === idBuscado)
            let sliced = productos.splice(indice, 1)
            console.log(sliced.length)
            if(sliced.length > 0)
            {
                let escritura = await fs.promises.writeFile('utils/productos.txt',JSON.stringify(productos))
                retorno = 'el producto se elimino con exito'
    
            }
            else
            retorno ='no se pudo borrar el elemento'
            return retorno
        }
        else
        return {
            error:{ 
                ruta: 'http://localhost:8080/api/productos',
                metodo: 'DELETE',
                estado: 'no autorizada'

            }
        }
    }

}
module.exports = new ProductsContainer