const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async userVerify(req, res, next) {
    let userId = req.user.id; // Corrigido aqui

    await prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .then((user) => {
        if (!user) {
          return res.status(401).json("User Não Autorizado");
        } else {
          next();
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Erro Interno do Servidor");
      });
  },

  async adminVerify(req, res, next) {
    let userId = req.user.id; // Corrigido aqui

    await prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .then((user) => {
        if (!user) {
          return res.status(401).json("Usuário não Autorizado");
        } else {
          if (user.admin || user.subAdmin) {
            next();
          } else {
            res.status(401).json("Usuário não é Administrador");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Erro Interno do Servidor");
      });
  },
};
