let apiCart = require('../components/Cart')
let apiProducts = require('../components/Products')

module.exports= app => {
    apiCart(app)
    apiProducts(app)
    app.get('/', (req, res, next)=>{
        res.send('desde routes')
    })

}