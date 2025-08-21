//Importações
const express = require('express');
const router = express.Router();

const authenticate = require("../middleware/authorization");

const registerController = require("../controllers/user/Register");
const portController = require("../controllers/portos/Portos");
const questionsController = require("../controllers/perguntas/Perguntas");
const userProfileController = require("../controllers/user/Profile");
const authorization = require('../middleware/authorization');
const userVerify = require("../middleware/userVerify")
//Fim Importações

//Rotas de Usuario
//Rota Profile
router.get("/user/profile", authorization.auth, userVerify.userVerify, userProfileController.Profile); //Devolve as Informações do perfil do User Atual
router.post("/user/profile/changepassword", authorization.auth, userVerify.userVerify, userProfileController.trocarSenha); //Troca a senha doo Usuario
router.post("/user/profile/changeprofile", authorization.auth, userVerify.userVerify, userProfileController.modificarPerfil); //Modifica o Perfil do User

//Rotas de Register
router.post("/register/createinstituition", registerController.createInstituition); //Criando uma Instituição
router.get("/register", registerController.getInstituicoes); //Enviando as instituições
router.post("/register", registerController.registerUser); //Criando o User

//Rota de Porto
router.get("/user/pendingport", authenticate.auth, userVerify.userVerify, portController.getPortNotFinished); //Procurar Porto Pendente
router.get("/user/port", authenticate.auth, userVerify.userVerify, portController.getPorts); //Pegar os Portos disponiveis
router.post("/user/port/startport", authenticate.auth, userVerify.userVerify, portController.onGoingPort); //Começando um porto

//Rota de Perguntas de um Porto
router.get("/user/port/questions", authenticate.auth, userVerify.userVerify, questionsController.getPerguntas); //Pegar as Perguntas
router.post("/user/port/answerquestion", authenticate.auth, userVerify.userVerify, questionsController.respondendoPerguntas); //Respondendo as Perguntas

//Fim Rotas de Uusario

//Exportando a rota
module.exports = router;