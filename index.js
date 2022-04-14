const express= require('express')
const app =express()
const {config} = require("./config")
const cors = require("cors");


app.use(cors());

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

const serverRoutes = require('./routes')
serverRoutes(app)

const server =app.listen(config.port,()=>{
    console.log(`Server on http://localhost:${config.port}`)
})
server.on('error',error=>console.log(`error en el servidor: ${error}`))

app.get('/',(req,res,next)=>{
    res.send('pagina de inicio')
})