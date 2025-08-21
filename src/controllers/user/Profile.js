// Importações
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcryptjs = require("bcryptjs");

module.exports = {
  async Profile(req, res) {
    try {
      const userId = req.user.id;

      // Busca o usuário com as relações nivel e institution
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          nivel: true,
          institution: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // Monta o objeto de resposta com dados do usuário
      const respUser = {
        userName: user.userName,
        userPrimNome: user.primNome,
        userSobrenome: user.sobreNome,
        userNivel: user.nivel?.descricao || null,
        userInstituicao: user.institution?.nome || null,
      };

      // Busca portos acessados pelo usuário onde estadoPortoId != 1
      const respAcessaPortos = await prisma.acessaPorto.findMany({
        where: {
          userId,
          estadoPortoId: {
            not: 1,
          },
        },
        distinct: ["id"], // Prisma permite distinct em alguns bancos
        select: {
          id: true,
          porto: {
            select: {
              nome: true,
              dificuldadeId: true,
            },
          },
          estadoPorto: {
            select: {
              descricao: true,
            },
          },
        },
      });

      // Resposta combinando os dados
      return res.status(200).json({ data: respUser, data1: respAcessaPortos });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  async trocarSenha(req, res) {
    try {
      const userId = req.user.id; // Certifique-se que JWT middleware define req.user
      const { senhaAtual, senhaNova } = req.body;

      if (!senhaAtual || !senhaNova) {
        return res.status(400).json({ error: "Informações inválidas" });
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const senhaCorreta = await bcryptjs.compare(senhaAtual, user.password);
      if (!senhaCorreta) {
        return res.status(400).json({ error: "Senha atual incorreta" });
      }

      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(senhaNova, salt);

      await prisma.user.update({
        where: { id: userId },
        data: { password: hash },
      });

      return res.status(200).json({ message: "Senha alterada com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno ao trocar a senha" });
    }
  },

  async modificarPerfil(req, res) {
    try {
      const userId = req.user.id; // Novamente, garantir que req.user está definido
      let { nick, name, surname, password } = req.body;

      if (!nick || !name || !surname || !password) {
        return res.status(400).json({ error: "Informações inválidas" });
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const senhaCorreta = await bcryptjs.compare(password, user.password);
      if (!senhaCorreta) {
        return res.status(400).json({ error: "Senha inválida" });
      }

      nick = nick.trim();
      name = name.trim();
      surname = surname.trim();

      const usernick = await prisma.user.findUnique({
        where: { userName: nick },
      });

      if (usernick && usernick.id !== userId) {
        return res.status(400).json({ error: "Nickname já em uso" });
      }

      // Atualiza os dados do usuário
      await prisma.user.update({
        where: { id: userId },
        data: {
          userName: nick,
          primNome: name,
          sobreNome: surname,
        },
      });

      return res.status(201).json({ message: "Perfil alterado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
