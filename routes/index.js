let apiCart = require('../components/Cart')

module.exports= app => {
    apiCart(app)
    app.get('/', (req, res, next)=>{
        res.send('desde routes')
    })

}