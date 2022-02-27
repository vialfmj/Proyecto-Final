const fs = require('fs')

class Cart {
    constructor(nombreArchivo){
        this.archivo =nombreArchivo
    }

    createCart= async()=>{
        let cartData ={
            "producto": "producto",
            "price": "precio",
            "quantity": "cantidad" 
        }
        let escritura = await fs.promises.writeFile(this.archivo,JSON.stringify(cartData))
    }
}

module.exports={
    Cart
}