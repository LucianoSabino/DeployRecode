const app = require("../src/index"); // importa teu express já configurado

module.exports = (req, res) => {
  return app(req, res);
};
