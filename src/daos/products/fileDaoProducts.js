const fs = require("fs")

const FileContainer = require("../../contenedores/fileContainer")

class FileDaoProducts extends FileContainer{
    constructor(){
        super("DB/productos.json")
    }
    getAll= async ()=>{
        let respuesta = await fs.promises.readFile(this.path, 'utf-8')
        return JSON.parse(respuesta)
    }
    getById= async (idBuscado)=>{
        
            const res = await fs.promises.readFile(this.path,"utf-8")
            let respuesta = JSON.parse(res)
           if(respuesta)
            {
                let coincidencia = respuesta.find(element => element.id === idBuscado)
                if(coincidencia)
                return coincidencia
                else
                return "no hay coincidencia"
            }
            else 
            return 'no se encontro coincidencia'
    }
    add = async (producto,admin)=>{
        if(admin === true){
            const generateId = () => Math.random().toString(36).substr(2, 18);
            let id= generateId()
    
            let prodToAdd = {
                ...producto,
                id: id
            }
            let productList = await fs.promises.readFile(this.path, 'utf-8')
            let productListParsed = JSON.parse(productList)
            productListParsed = [
                ...productListParsed,
                prodToAdd
            ]
            let escritura = await fs.promises.writeFile(this.path,JSON.stringify(productListParsed))
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
    update = async (idBuscado, newProducto, admin)=>{
        if(admin === true){
            let respuesta = await this.getAll()
            let productos = respuesta
            let newElement ={
                ...newProducto,
                id: idBuscado
            }
            if(productos){
                let posicion = productos.findIndex(prod=> prod.id=== idBuscado)
                productos[posicion] = newElement
                let escritura = await fs.promises.writeFile(this.path,JSON.stringify(productos))
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
    delete = async (idBuscado, admin) =>{
        let retorno
        if(admin === true){
            let getProducts = await this.getAll()
            let productos = getProducts
            let indice = productos.findIndex(prod => prod.id === idBuscado)
            let sliced = productos.splice(indice, 1)
            if(sliced.length > 0)
            {
                let escritura = await fs.promises.writeFile(this.path,JSON.stringify(productos))
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

module.exports = FileDaoProducts