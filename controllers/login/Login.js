// Importação
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
require("dotenv").config();
// Fim importação

const JWTsecret = process.env.JWT;
const prisma = new PrismaClient();

module.exports = {
  async login(req, res) {
    async function encontrarUsuario(email) {
      const usuario = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return usuario;
    }

    async function verificarCredenciais(email, password) {
      const usuario = await encontrarUsuario(email);
      if (
        usuario &&
        (await bcryptjs.compare(password, usuario.password)) &&
        usuario.email == email
      ) {
        jwt.sign(
          {
            id: usuario.id,
            admin: usuario.admin,
            subAdmin: usuario.subAdmin,
          },
          JWTsecret,
          { expiresIn: "24h" },
          (err, token) => {
            if (err) {
              console.log(err);
              res.status(500);
            } else {
              if (usuario.subAdmin || usuario.admin) {
                res.status(200).send({ token: token, data: true });
              } else {
                res.status(200).send({ token: token });
              }
            }
          }
        );
      } else {
        return res.status(400).json("Credenciais inválidas.");
      }
    }

    const { email, password } = req.body;
    verificarCredenciais(email, password);
  },
};
