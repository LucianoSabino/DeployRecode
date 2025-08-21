/*const transporter = require("./emailTransporter")
const { PrismaClient } = require("@prisma/client");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const JWTsecret = process.env.JWTsecret;
const prisma = new PrismaClient();

module.exports = {
    async recoverPassword(req, res) {
        if (req.body.email != undefined) {
            //Recbe o Email da requisição
            let email = req.body.email;

            prisma.user.findFirst({
                where: {
                    email: email
                }
            }).then(async user => {
                //Criando o token 
                let token = jwt.sign({ id: user.id }, JWTsecret, { expiresIn: '1h' })

                let resetPasswordLink //Para onde mandar o user?

                const emailContent =
                    `Olá,
                Uma solicitação de redefinição de senha para sua conta foi solicitada. Clique no link abaixo para criar uma nova senha:
                ${resetPasswordLink}
                Esse link expira em 1 hora
                Se você não solicitou essa redefinição, por favor, ignore este e-mail.
                Atenciosamente,
                App Estatístico`;

                let mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subjetc: "Redefinição de Senha",
                    text: emailContent
                };

                await transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json("Erro Interno do Servidor");
                    } else {
                        console.log(info.response);
                        res.status(200).json("Se seu Email estiver em nossa Base de Cadastro, um email de redefinição será enviado")
                    }
                })
            }).catch(err => {
                console.log(err)
                res.status(500).json("Erro Interno do Servidor")
            })
        } else {
            res.status(404).json("Informações Inválidas")
        }
    },
    async changingPassword(req, res) {
        let userId = req.data.id
        let { novaSenha } = req.body.novaSenha

        if (novaSenha != undefined) {
            prisma.user.findUnique({
                where: {
                    id: userId
                }
            }).then(async user => {
                let salt = bcryptjs.genSaltSync(10);
                let hash = bcryptjs.hashSync(novaSenha, salt);

                prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        password: hash
                    }
                }).then(() => {
                    res.status(200).json("Senha Alterada com Sucesso");
                }).catch(err => {
                    console.log(err);
                    res.status(500).json("Erro Interno do Servidor");
                })
            }).catch(err => {
                console.log(err);
                res.status(500).json("Erro Interno do Servidor");
            })
        } else {
            res.status(404).json("Informações Invalídas")
        }
    }
}*/