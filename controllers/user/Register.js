//Importações
const bcryptjs = require('bcryptjs');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Fim Importações

//Rota de Registro Prisma
module.exports = {
    //Criando um User
    async registerUser(req, res) {
        if (req.body.nick !== undefined &&
            req.body.name !== undefined &&
            req.body.surname !== undefined &&
            req.body.email !== undefined &&
            req.body.senha !== undefined &&
            req.body.instituicao !== undefined) {
            let { nick, name, surname, email, senha, instituicao } = req.body
            if (typeof email !== 'string' || email.trim().length === 0) {
                res.status(400).json('E-mail inválido')
            } else {
                email = email.trim();
                prisma.user.findUnique({ //Testando o Email
                    where: {
                        email: email
                    }
                }).then(async user => {
                    if (user === undefined || user === null) {
                        let salt = bcryptjs.genSaltSync(10);
                        let hash = bcryptjs.hashSync(senha, salt);
                        nick = nick.trim();
                        await prisma.user.findUnique({
                            where: {
                                userName: nick
                            }
                        }).then(async namee => {
                            if (namee === undefined || namee === null) {
                                instituicao = parseInt(instituicao);
                                await prisma.institution.findUnique({
                                    where: {
                                        id: instituicao
                                    }
                                }).then(async insti => {
                                    name = name.trim();
                                    surname = surname.trim();
                                    await prisma.user.create({
                                        data: {
                                            userName: nick,
                                            nivelId: 1,
                                            primNome: name,
                                            sobreNome: surname,
                                            email,
                                            password: hash,
                                            institutionId: insti.id
                                        }
                                    }).then(() => {
                                        res.sendStatus(200)
                                    }).catch(err => {
                                        console.log(err)
                                        res.status(500).json("Erro Interno do Servidor")
                                    })
                                }).catch(err => {
                                    console.log(err)
                                    res.status(500).json("Erro Interno do Servidor")
                                })
                            } else {
                                let nickname_existente = {
                                    nickname_existente: "Nick Já em Uso"
                                };
                                res.status(409).json(nickname_existente)
                            }
                        }).catch(err => {
                            console.log(err)
                            res.sendStatus(500)
                        })
                    } else {
                        let email_existente = {
                            email_existente: "Email Já em Uso"
                        };
                        res.status(409).json(email_existente)
                    }
                })
            }
        } else {
            res.status(404).json("Informações Inválidas")
        }
    },
    //Entregar a lista de Instituições para o Cadastro no Front
    async getInstituicoes(req, res) {
        prisma.institution.findMany({
            orderBy: {
                nome: 'asc'
            }
        })
            .then(instituicoes => {
                res.status(200).send({ data: instituicoes })
            })
            .catch(err => {
                console.log(err)
                res.status(500)
            })
    },
    //Criar uma Nova Instituição
    async createInstituition(req, res) {
        if (req.body.instiName !== undefined && req.body.instiSigla !== undefined) {
            let { instiName, instiSigla } = req.body
            
            instiName = instiName.trim();
            instiSigla = instiSigla.trim();
            
            //Verifica se o nome já é utilizado
            await prisma.institution.findFirst({
                where: {
                    nome: instiName
                }
            }).then(async insti => {
                if (insti !== undefined && insti !== null) {
                    res.status(400).send("Nome Já Existente")
                } else {
                    //Verifica se a sigla já é utilizado
                    await prisma.institution.findFirst({
                        where: {
                            sigla: instiSigla
                        }
                    }).then(async sigla => {
                        if (sigla !== undefined && sigla !== null) {
                            res.status(400).send("Sigla Já Existente")
                        } else {
                            //Cria a instituição
                            await prisma.institution.create({
                                data: {
                                    nome: instiName,
                                    sigla: instiSigla
                                }
                            }).then(instituicao => {
                                res.status(200).send({data: instituicao.id})
                            }).catch(err => {
                                console.log(err)
                                res.status(500).json("Erro Interno do Servidor")
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                        res.status(500).json("Erro Interno do Servidor")
                    })
                }
            }).catch(err => {
                console.log(err)
                res.status(500).json("Erro Interno do Servidor")
            })
        }else{
            res.status(400).json("Informações Inválidas.")
        }
    }
}