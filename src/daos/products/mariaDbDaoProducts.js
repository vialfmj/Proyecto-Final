const MariaDbContainer = require("../../contenedores/mariaDbContainer")
const mariadb = require("../../../config/mariaDb")
const  Boom  = require("@hapi/boom")


class MariaDbDaoProducts extends MariaDbContainer{
    constructor(){
        super(mariadb)
    }
    getAll = async ()=>{
        try {
                let rows = await mariadb.from("productos").select("*")
                return rows
        } catch (error) {
            console.log(error)
        }
    }
    add = async (producto,admin)=>{
        try {
            if(admin === true){
                await mariadb("productos").insert(producto)
                return "producto agregado"
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
            Boom.badData(error)
        }
    }
    update = async (id,updatedProduct, admin) =>{
        try{
            if(admin=== true){
            await mariadb("productos").where({id: id}).update(updatedProduct)
            return "exito"
            }
            else
            return{
                error:{ 
                    ruta: 'http://localhost:8080/api/productos',
                    metodo: 'POST',
                    estado: 'no autorizada'
                }
            }
        }catch(error){
            return Boom.badData(error)
        }
    }
    delete = async (id,admin)=>{
        try {
            if(admin === true){
                await mariadb("productos").where({id: id}).del()
                return "se elimino el producto: "+id
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
            Boom.badData(error)
        }
    }
}

module.exports = MariaDbDaoProducts