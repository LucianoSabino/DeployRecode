const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWTsecret = process.env.JWT;

module.exports = {
  auth(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ error: "Token mal formatado" });
    }

    console.log("Token recebido:", token);
    console.log("JWTsecret carregado:", JWTsecret); // debug útil

    jwt.verify(token, JWTsecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token expirado ou inválido" });
      }

      req.user = decoded; // você pode acessar req.user.id, etc.
      next();
    });
  },
};
