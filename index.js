const express= require('express')
const {Contenedor}= require('./utils/Contenedor')
const app =express()
const port = 8080
const {Router}= express
const {engine}= require('express-handlebars')



app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const contenedor= new Contenedor('./utils/productos.txt')
const carrito= new Contenedor('./utils/carrito.txt')
const server =app.listen(port,()=>{
    console.log(`Server on http://localhost:${port}`)
})
server.on('error',error=>console.log(`error en el servidor: ${error}`))

app.get('/',(req,res,next)=>{


    res.send('pagina de inicio')
})

const routerProductos = new Router()
app.use('/api/productos',routerProductos)

const routerCarrito = new Router()
app.use('/api/Carrito',routerCarrito)

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
    respuesta= await contenedor.update(id)
})
routerProductos.delete('/:id',async(req,res,next)=>{
    let {id} = req.params
    respuesta = await contenedor.deleteById()
    res.send(`elemento ${id} ${respuesta}`)
})


routerCarrito.get(`/`,async(req,res,next)=>{
    respuesta= await carrito.getAll()
    res.render('index',{respuesta})    
})