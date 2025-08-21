//Importações
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Fim Importações

module.exports = {
    //Devolve a lista de Portos cadastrados no sistema
    async getPorts(req, res) {
        let userId = req.data.id;

        //Pegando o nivel do usuario requisitante
        let nivelUser = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                nivel: {
                    select: {
                        descricao: true
                    }
                }
            }
        })
        nivelUser = nivelUser.nivel.descricao
        let portos = 0;
        //Passando os portos de nivel Básico Apenas sem Encadeamonto
        if (nivelUser === "Básico") {
            portos = await prisma.porto.findMany({
                where: {
                    dificuldade: {
                        descricao: 'Básico'
                    },
                    predecessor: null,
                    publicado: true
                },
                select: {
                    id: true,
                    nome: true,
                    descricao: true,
                    dificuldadeId: true,
                },
                orderBy: {
                    id: 'asc'
                }
            })
            //Passando os Portos de todos os Niveis sem Encadeamento
        } else if (nivelUser === "Avançado") {
            portos = await prisma.porto.findMany({
                where: {
                    predecessor: null,
                    publicado: true
                },
                select: {
                    id: true,
                    nome: true,
                    descricao: true,
                    dificuldadeId: true,
                },
                orderBy: {
                    id: 'asc'
                }
            })
            //Passando os Portos intermediarios e abaixo, sem encadeamento
        } else {
            portos = await prisma.porto.findMany({
                where: {
                    dificuldade: {
                        descricao: {
                            in: ['Básico', 'Intermediário']
                        }
                    },
                    predecessor: null,
                    publicado: true
                },
                select: {
                    id: true,
                    nome: true,
                    descricao: true,
                    dificuldadeId: true,
                },
                orderBy: {
                    id: 'asc'
                }
            })
        }
        //PASSANDO os Portos que dependem de Encadeamento de Outro Porto
        let portosEncadeados = await prisma.$queryRaw`
            select distinct p.id, p.nome, p.descricao, n.id as dificuldadeId, p.publicado from porto p 
            inner join acessaporto a on a.portoId = p.predecessorId 
            inner join estadoporto e on e.id = a.estadoPortoId 
            inner join nivel n on n.id = p.dificuldadeId 
            inner join user u on a.userId = ${userId}
            where e.descricao = 'Passou' and u.nivelId >= p.dificuldadeId 
        `;

        if (portosEncadeados.length != 0 && portosEncadeados) {
            portos.push(...portosEncadeados);
        }

        //Filtrar os Portos Publicados
        //portos = portos.filter(obj => obj.publicado !== 0 || obj.publicado !== false);

        if (!portos || portos.length == 0) {
            res.status(404).json("Não foram encontrados Portos");
        } else {
            let pendente = await prisma.acessaPorto.findMany({
                where: {
                    userId: userId,
                    estadoPortoId: 1
                },
                select: {
                    portoId: true
                }
            })
            if (pendente.length > 0) {
                res.status(200).send({ data: portos, data1: pendente });
            } else {
                res.status(200).send({ data: portos });
            }
        }
    },
    //Verifica se existem portos não finalizados pelo usuario
    async getPortNotFinished(req, res) {
        let userId = req.data.id;
        let onGoingPort = await prisma.acessaPorto.findFirst({
            where: {
                userId,
                estadoPorto: {
                    descricao: 'Andamento'
                }
            },
            select: {
                id: true,
                portoId: true,
                perguntaAtualId: true
            }
        })

        if (onGoingPort == undefined || onGoingPort.length == 0) {
            res.status(404).json("Não à portos pendentes de conclusão");
        } else {
            res.sendStatus(200);
        }
    },
    //Responder um Porto
    async onGoingPort(req, res) {
        let userId = req.data.id;

        //Verifico se o user tentando inicializar um porto já possui um inicializado
        await prisma.acessaPorto.findMany({
            where: {
                userId: userId,
                estadoPortoId: 1
            }
        }).then(async acessaPorto => {
            if (acessaPorto.length !== 0) {
                return res.status(400).json("Porto pendente")
            } else {
                if (req.body.portoId !== undefined && req.body.portoId.length !== 0) {
                    let portoId = parseInt(req.body.portoId)

                    //Encontro o porto selecionado e suas perguntas
                    let porto = await prisma.porto.findUnique({
                        where: {
                            id: portoId
                        },
                        include: {
                            perguntas: {
                                orderBy: {
                                    id: 'asc'
                                }
                            }
                        }
                    }).catch(err => {
                        console.log(err)
                        res.status(500).json("Erro Interno do Servidor")
                    })

                    let perguntaAtualId = 0

                    //Verifico se existem perguntas e seleciono o Id da primeira
                    if (porto.perguntas.length > 0) {
                        perguntaAtualId = porto.perguntas[0].id;
                    }

                    //Crio a tabela acessa porto e inicio o Estado do porto em Andamento 
                    await prisma.acessaPorto.create({
                        data: {
                            portoId: portoId,
                            userId: userId,
                            perguntaAtualId: perguntaAtualId,
                            estadoPortoId: 1
                        }
                    }).then(() => {
                        res.sendStatus(201)
                    }).catch(err => {
                        console.log(err)
                        res.status(500).json("Erro Interno do Servidor")
                    })
                } else {
                    res.status(400).json("Informações Inválidas")
                }
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json("Erro Interno do servidor")
        })
    },
}