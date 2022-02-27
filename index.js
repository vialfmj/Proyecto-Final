const express= require('express')
const {Contenedor}= require('./utils/Contenedor')
const {Cart}=require('./utils/Cart')
const app =express()
const {Router}= express
const {engine}= require('express-handlebars')
const {config} = require("./config")


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

const serverRoutes = require('./routes')
serverRoutes(app)

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
console.log(config.port)

const contenedor= new Contenedor('./utils/productos.txt')
const server =app.listen(config.port,()=>{
    console.log(`Server on http://localhost:${config.port}`)
})
server.on('error',error=>console.log(`error en el servidor: ${error}`))

app.get('/',(req,res,next)=>{


    res.send('pagina de inicio')
})

const routerProductos = new Router()
app.use('/api/productos',routerProductos)

routerProductos.get(`/`,async(req,res,next)=>{
    respuesta= await contenedor.getAll()
    res.render('index',{respuesta})    
})
routerProductos.get('/:id',async(req,res,next)=>{
    const {id} = req.params
    respuesta= await contenedor.getElementById(Number(id))
    if(respuesta)
    res.render('producto',{respuesta})
    else
    res.send(' no hay coincidencia')
})
routerProductos.post('/',async(req,res,next)=>{
    let producto= req.body
    respuesta= await contenedor.save(producto)
    res.json({respuesta})
})
routerProductos.put('/:id',async (req,res)=>{
    let {id}= req.params
    let newProducto= req.body
    console.log(newProducto)
    respuesta= await contenedor.update(id,newProducto)
    res.send(`producto recibido: ${JSON.stringify(newProducto)}`)
})
routerProductos.delete('/:id',async(req,res,next)=>{
    let {id} = req.params
    respuesta = await contenedor.deleteById()
    res.send(`elemento ${id} ${respuesta}`)
})