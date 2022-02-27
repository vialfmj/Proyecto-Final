const fs= require('fs')
let productos=[]
class Contenedor{
    constructor(nombreArchivo){

        this.archivo= nombreArchivo
    }
    save= async(producto)=>{
        try{
            const lectura= await fs.promises.readFile(this.archivo,'utf-8')
            if(!lectura){
                producto={
                ...
                producto,
                'id':1
            }
            productos= [
                ...
                productos,
                producto]
            let escritura= await fs.promises.writeFile(this.archivo,JSON.stringify(productos))
            return producto
                }
            else{
                {   let nuevoId=JSON.parse(lectura).length+1
                    producto={
                        ...producto,
                        'id':nuevoId
                    }
                    let toAppend=[
                        ...
                        JSON.parse(lectura),
                        producto
                    ]

                    let append= await fs.promises.writeFile(this.archivo,`${JSON.stringify(toAppend)}`)
                    console.log(`el id del producto agregado es:${producto.id}`)
                    return producto
                }
            }
        }catch(error){
            console.log(error)
        }
    }
    getAll= async ()=>{
        let respuesta
        respuesta= await fs.promises.readFile(this.archivo,'utf-8')
        return JSON.parse(respuesta)
    }
    getElementById=async(idBuscado)=>{
        const res= await fs.promises.readFile(this.archivo,'utf-8')
        let respuesta=JSON.parse(res)
        if(respuesta)
        {
            let coincidencia= respuesta.find(element=>element.id === idBuscado)
            return coincidencia

        }
        else{
            console.log('no se encontro el producto')
        }
    }
    update= async (idBuscado, newProducto)=>{

       let respuesta = await this.getAll()
       let id= Number(idBuscado)
       let newElement={
            ...newProducto,
           id: id
       }
       if(respuesta)
       {
//           let coincidencia= respuesta.find(element=>element.id === id)
           let posicion= respuesta.findIndex(element=> element.id=== id)
           respuesta[posicion]= newElement
           let escritura= await fs.promises.writeFile(this.archivo,JSON.stringify(respuesta))
       }
       else{
           console.log('no se encontro el producto')
       }
    }



    deleteById=async(elementoAEliminar)=>{
        let indice= elementoAEliminar-1
        let sliced
    try {
        let respuesta= await fs.promises.readFile(this.archivo,'utf-8')
        respuesta=JSON.parse(respuesta)
        sliced=respuesta.splice(indice,1)
        let escritura= await fs.promises.writeFile(this.archivo,JSON.stringify(respuesta))
        return 'eliminado'
    } catch (error) {
        console.log(error)
        
    }        
        

    }
    deleteAll=async()=>{
        respuesta= await fs.promises.writeFile(this.archivo,'[]')
    }
}
module.exports={
    Contenedor
}