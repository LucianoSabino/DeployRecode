//Importações
const express = require('express');
const router = express.Router();
const userControl = require("../controllers/admin/userControl/userControl");
const authorization = require('../middleware/authorization');
const userVerify = require("../middleware/userVerify");
const portControl = require('../controllers/admin/portsControl/portControl');
const institutionControl = require('../controllers/admin/userControl/institutionControl');


//Rotas de Admin
router.get("/admin/relatoriosPortos", authorization.auth, userVerify.adminVerify, userControl.relatoriosPortos); //Devolve a Lista de Portos
router.post("/admin/relatorioPorto", authorization.auth, userVerify.adminVerify, userControl.gerarPdfRelatorioPortoId); //Devolve um relatorios
router.get("/admin/listuser", authorization.auth, userVerify.adminVerify, userControl.listUser); //Devolve a Lista de Usuarios Não ADMIN/SUBADMIN do APP
router.get("/admin/listadmin", authorization.auth, userVerify.adminVerify, userControl.listAdmins);
router.get("/adminprofile/:id", authorization.auth, userVerify.adminVerify, userControl.perfilAdmin);
router.post("/admin/listuser/profile", authorization.auth, userVerify.adminVerify, userControl.userProfile); //Devolve o Perfil apartir do id dado
router.post("/admin/listuser/profile/promote", authorization.auth, userVerify.adminVerify, userControl.promoteSubAdmin); //Rota que promove o User à administrador
router.delete("/admin/delete", authorization.auth, userVerify.adminVerify, userControl.removeAdmin); //Removendo admin pelo id

//Rotas de Portos
router.get("/admin/listaPorto", authorization.auth, userVerify.adminVerify, portControl.listPorts); //Devolve a Lista de Portos
router.post("/admin/lerPorto", authorization.auth, userVerify.adminVerify, portControl.readPort); //Devolve um Porto
router.get("/admin/dificuldades", authorization.auth, userVerify.adminVerify, portControl.listDifficulty);
router.post("/admin/criarPorto", authorization.auth, userVerify.adminVerify, portControl.createPort);
router.post("/admin/atualizarPorto", authorization.auth, userVerify.adminVerify, portControl.updatePort);
router.delete("/admin/deletarPorto", authorization.auth, userVerify.adminVerify, portControl.deletePort);

//Rotas de Perguntas
router.get("/admin/listarTodasPerguntas", authorization.auth, userVerify.adminVerify, portControl.listAllQuestions);
router.post("/admin/listarPergunta", authorization.auth, userVerify.adminVerify, portControl.listUniqueQuestion);
router.post("/admin/adicionarPergunta", authorization.auth, userVerify.adminVerify, portControl.createUniqueQuestion);
router.post("/admin/atualizarPergunta", authorization.auth, userVerify.adminVerify, portControl.updateUniqueQuestion);
router.delete("/admin/deletarPergunta", authorization.auth, userVerify.adminVerify, portControl.deleteUniqueQuestion);

//Rotas de Instituições
router.get("/admin/listarTodasInstituicoes", authorization.auth, userVerify.adminVerify, institutionControl.listAllInstitutions);
router.post("/admin/criarInstituicao", authorization.auth, userVerify.adminVerify, institutionControl.createInstitution);
router.post("/admin/atualizarInstituicao", authorization.auth, userVerify.adminVerify, institutionControl.updateInstituition);

//Exportando a rota
module.exports = router;