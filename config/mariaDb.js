const Boom = require("@hapi/boom")
const {maria_db} = require("./index")


var mariadb = require("knex")({
    client: 'mysql',
    connection:{
        ...maria_db
    },
    pool: {min: 0, max: 7}


})
console.log("hola desde mariaDb")
module.exports = mariadb
