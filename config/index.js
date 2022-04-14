require("dotenv").config()
const serviceAccount = require("../coder-backend-ecommerce-firebase-adminsdk-a1pxr-cf97970fd6.json")

let config= {
    port: process.env.PORT
}
let mongo_db = {
    uri: process.env.MONGO_DB_URI,
    name: process.env.DB_NAME,
}
let firebase_db = {
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    serviceAccount: serviceAccount
}
let maria_db = {
    host: process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_NAME
}

module.exports = {config, mongo_db, firebase_db, maria_db}