const yargs = require("yargs")
let dbType
yargs.argv.DB_TYPE ? dbType = yargs.argv.DB_TYPE :
    dbType = "file";

const dinamicImport = (dbType) => {
    if (dbType === "file") {
        const FileDaoProducts = require("./daos/products/fileDaoProducts")
        const FileDaoCart = require("./daos/carts/fileDaoCart")
        const productsContainer = new FileDaoProducts()
        const cartContainer = new FileDaoCart()
        return {
            productsContainer,
            cartContainer
        }
    }
    else if (dbType === "mongodb") {
        const MongoDbDaoProducts = require("./daos/products/mongoDbDaoProducts")
        const MongoDbDaoCart = require("./daos/carts/mongoDbDaoCart")
        const productsContainer = new MongoDbDaoProducts()
        const cartContainer = new MongoDbDaoCart()
        return {
            productsContainer,
            cartContainer
        }
    }
    else if (dbType === "firebase") {
        const FirebaseDaoProducts = require("./daos/products/firebaseDaoProducts")
        const FirebaseDaoCart = require("./daos/carts/firebaseDaoCart")
        const productsContainer = new FirebaseDaoProducts()
        const cartContainer = new FirebaseDaoCart()
        return {
            productsContainer,
            cartContainer
        }
    }
    else if (dbType === "mariadb") {
        const MariaDbDaoProducts = require("./daos/products/mariaDbDaoProducts")
        const productsContainer = new MariaDbDaoProducts()
        const MariaDbDaoCart = require("./daos/carts/mariaDbDaoCart")
        const cartContainer = new MariaDbDaoCart()
        return {
            productsContainer,
            cartContainer
        }
    }
}
let db = dinamicImport(dbType)

module.exports = db