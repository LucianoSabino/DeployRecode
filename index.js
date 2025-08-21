//Importações
const express = require("express"); //Importando Express
const app = express(); //Inicializando Express
const cors = require("cors"); //Importando Cors

//Importando Rotas dos Usuarios(Geral)
const rotasGlobais = require("./routes/index");

//Importando As Configurações Iniciais Do APP ESTATISTICO
const inicializador = require("./inicializadorTeste");

//Ativando Body Parser
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: "true" })); // to support URL-encoded bodies

//Ativando o Cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

//Setando o uso das Rotas
rotasGlobais.setRoutes(app);

// Configuração do next()
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.status === 404) {
    res.status(404).json({ response: "Resource not found." });
  } else {
    res
      .status(500)
      .json({
        response: {
          message: "Error processing sent data.",
          error: err.message,
        },
      });
  }
});

//Fim das Importações e Set's

app.listen(8080, async () => {
  await inicializador.initializationFunction();
  await inicializador.initializationInstituition();
  await inicializador.adicionandoPortosDeVerdade();
  await inicializador.criarContaGabriela();
  console.log("Rodando");
});
//
