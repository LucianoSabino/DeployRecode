//Importações
const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login/Login");
const recoverPasswordController = require("../controllers/emailBuilder/recoverPassword");
const authenticate = require("../middleware/authorization");
//Fim das Importações

router.get("/", (req, res) => {
  res.send("Rota teste da api!");
});

//Rotas de Login
router.post("/login", loginController.login); //Fazer o Login no APP
//router.post("/login/forgotpassword", recoverPasswordController.recoverPassword) //Metodo para Receber o Email, e envia uma Email de Redefinição
//router.post("/login/changepassword", authenticate.auth, recoverPasswordController.changingPassword) //Recebe a nova senha e altera
//Fim Rotas de Login

//Exportando a rota
module.exports = router;
