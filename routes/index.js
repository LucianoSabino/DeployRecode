const loginRoute = require("./Login");
const adminRoute = require("./Admin");
const userRoute = require("./User");

module.exports = {
    async setRoutes(app){
        app.use(loginRoute); //Rotas de Login
        app.use(adminRoute); //Rotas de Admin
        app.use(userRoute); //Rotas de User
    }
}


