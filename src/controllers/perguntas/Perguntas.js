//Importações
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Fim Importações

module.exports = {
    //Devolve as perguntas do porto
    async getPerguntas(req, res) {
        let userId = req.data.id;

        await prisma.acessaPorto.findFirst({
            where: {
                userId,
                estadoPortoId: 1
            }
        }).then(async acessaPort => {
            if (acessaPort !== undefined && acessaPort !== null) {

                await prisma.pergunta.findMany({
                    where: {
                        portoId: acessaPort.portoId
                    },
                    select: {
                        id: true,
                        descricao: true,
                        imagem: true,
                        multiplasAlternativas: true,
                        alternativas: {
                            orderBy: {
                                id: 'asc'
                            },
                            select: {
                                id: true,
                                descricao: true,
                                imagem: true,
                            }
                        }
                    }
                }).then(perguntas => {
                    // Encontrar a pergunta com perguntaAtualId
                    let perguntaAtual = perguntas.find(pergunta => pergunta.id === acessaPort.perguntaAtualId);

                    // Filtrar as perguntas a partir da perguntaAtualId
                    let perguntasSeguintes = perguntas.filter(pergunta => pergunta.id > acessaPort.perguntaAtualId);

                    // Reorganizar o array para colocar a perguntaAtualId no começo
                    let perguntasParaFrontend = [perguntaAtual, ...perguntasSeguintes];

                    res.status(200).send({ data: perguntasParaFrontend });
                })

            } else {
                res.sendStatus(404);
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json("Erro Interno do Servidor");
        })


    },
    async respondendoPerguntas(req, res) {
        let userId = req.data.id
        if (req.body.perguntaId !== undefined && req.body.alternativaMarcadaId !== undefined) {
            let { perguntaId, alternativaMarcadaId } = req.body

            let acessaPorto = await prisma.acessaPorto.findFirst({
                where: {
                    userId: userId,
                    estadoPortoId: 1
                },
                include: {
                    pergunta: true,
                    porto: {
                        include: {
                            perguntas: {
                                select: {
                                    id: true,
                                    multiplasAlternativas: true,
                                    alternativas: {
                                        select: {
                                            id: true,
                                            correta: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json("Erro Interno do Servidor");
            })

            if (acessaPorto !== null || acessaPorto?.length > 0) {
                let perguntaAtual = acessaPorto.pergunta;

                // Consultar o modelo "porto" para obter as perguntas do porto correspondente
                let porto = acessaPorto.porto;

                let perguntasDoPorto = porto.perguntas;
                let ultimaPerguntaDoPorto = perguntasDoPorto[perguntasDoPorto.length - 1];

                // Verificar se a pergunta atual do usuário é a última pergunta do porto
                let estaNaUltimaPergunta = perguntaAtual.id === ultimaPerguntaDoPorto.id;

                if (perguntaId == perguntaAtual.id) {
                    //Respondendo a Ultima Pergunta
                    perguntaId = parseInt(perguntaId)
                    alternativaMarcadaId = alternativaMarcadaId.split(",");

                    //Apenas o Id do acessa porto
                    const acessaPortoId = acessaPorto.id

                    //Encontro as alternativas corretas da pergunta respondida
                    let alternativas = porto.perguntas.find(pergunta => pergunta.id === perguntaId).alternativas;

                    alternativaMarcadaId = alternativaMarcadaId.map(Number);

                    if (perguntaAtual.multiplasAlternativas === false && alternativaMarcadaId.length > 1) {
                        res.status(400).json("Pergunta não aceita múltiplas alternativas")
                    }
                    else {
                        //Logica para verificar se a resposta da pergunta respondida é a correta
                        let acertou = false;
                        let corretaAlternativaId;
                        if (alternativas.length === 1) {
                            corretaAlternativaId = alternativas[0].id
                        } else {
                            corretaAlternativaId = [];
                            alternativas.forEach(alternativa => {
                                if (alternativa.correta === true) {
                                    corretaAlternativaId.push(alternativa.id);
                                }
                            })
                        }

                        if (alternativas.length === 1) {
                            if (corretaAlternativaId === alternativaMarcadaId) {
                                acertou = true
                            }
                        } else {
                            if (corretaAlternativaId.length === alternativaMarcadaId.length) {
                                for (let i = 0; i < corretaAlternativaId.length; i++) {
                                    acertou = true;
                                    if (corretaAlternativaId[i] !== alternativaMarcadaId[i]) {
                                        acertou = false;
                                        break;
                                    }
                                }
                            }
                        }

                        //Criando a respostas-pergunta
                        await prisma.respostaPergunta.create({
                            data: {
                                userId: userId,
                                acessoPortoId: acessaPortoId,
                                PerguntaId: perguntaId,
                                acertou: acertou
                            }
                        }).then(async respostaPergunta => {
                            // Verifica se possui mais de uma alternativa marcada
                            if (Array.isArray(alternativaMarcadaId)) {
                                // Percorre lista de Alternativas
                                alternativaMarcadaId.forEach(async alternativa => {
                                    // Adiciona a alternativa marcada ao banco
                                    await prisma.alternativaMarcada.create({
                                        data: {
                                            respostaPerguntaId: respostaPergunta.id,
                                            alternativaMarcadaId: alternativa
                                        }
                                    })
                                })
                            }
                            else {
                                await prisma.alternativaMarcada.create({
                                    data: {
                                        respostaPerguntaId: respostaPergunta.id,
                                        alternativaMarcadaId: alternativaMarcadaId
                                    }
                                })
                            }
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json("Erro Interno do Servidor");
                        })

                        if (estaNaUltimaPergunta) {
                            //Encontrar a porcentagem após finalizar o porto
                            let acessaPortoFinal = await prisma.acessaPorto.findFirst({
                                where: {
                                    userId: userId,
                                    estadoPortoId: 1
                                },
                            }).catch(err => {
                                console.log(err);
                                res.status(500).json("Erro Interno do Servidor");
                            })

                            let perguntas = await prisma.pergunta.findMany({
                                where: {
                                    portoId: acessaPortoFinal.portoId
                                }
                            })

                            const verificarRespostas = []
                            await Promise.all(perguntas.map(async pergunta => {
                                await prisma.respostaPergunta.findFirst({
                                    where: {
                                        acessoPortoId: acessaPortoFinal.id,
                                        PerguntaId: pergunta.id,
                                        acertou: true
                                    },
                                    select: {
                                        acertou: true,
                                        alternativaMarcada: true
                                    }
                                }).then(respostaUser => {
                                    if (respostaUser !== undefined && respostaUser !== null) {
                                        verificarRespostas.push(respostaUser)
                                    }
                                })
                            }))

                            //Verificando o nº de Perguntas certas e erradas, e passando o resultado
                            let perguntasCertas = verificarRespostas?.length ? verificarRespostas.length : 0;
                            let perguntasErradas = perguntas ? perguntas.length - perguntasCertas : 0;
                            let resultado = 0
                            let mensagem;
                            Promise.all(verificarRespostas).then(async () => {
                                let porcentagem = ((perguntasCertas) / (perguntasCertas + perguntasErradas)) * 100
                                if (porcentagem >= 50) {
                                    resultado = 2
                                    mensagem = 'Passou'
                                } else {
                                    resultado = 3
                                    mensagem = 'Falhou'
                                }
                                //Atualizando o Resultado do acessa Porto e devolvendo o resultado para o front
                                await prisma.acessaPorto.update({
                                    where: {
                                        id: acessaPortoId
                                    },
                                    data: {
                                        estadoPortoId: resultado
                                    }
                                }).then(async () => {
                                    //Mudando o NIVEL do USER
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

                                    //Pegar os ACESSAPORTO do USER
                                    let acessPortUser = await prisma.acessaPorto.findMany({
                                        where: {
                                            userId,
                                            porto: {
                                                dificuldade: {
                                                    descricao: nivelUser
                                                }
                                            },
                                            estadoPortoId: 2
                                        },
                                        distinct: ['portoId']
                                    })

                                    //Portos do Mesmo Nivel do User
                                    let portosPorNivel = await prisma.porto.findMany({
                                        where: {
                                            dificuldade: {
                                                descricao: nivelUser
                                            }
                                        }
                                    })

                                    let totalPortos = portosPorNivel.length
                                    let totalPortosPassou = acessPortUser.length

                                    if (totalPortosPassou === totalPortos && nivelUser !== 'Avançado') {
                                        await prisma.user.findUnique({
                                            where: {
                                                id: userId
                                            }
                                        }).then(async user => {
                                            let newLevel = 0
                                            if (user.nivelId === 1) {
                                                newLevel = 2
                                            }

                                            if (user.nivelId === 2) {
                                                newLevel = 3
                                            }

                                            await prisma.user.update({
                                                where: {
                                                    id: user.id
                                                },
                                                data: {
                                                    nivelId: newLevel
                                                }
                                            }).catch(err => {
                                                console.log(err);
                                                res.status(500).json("Erro Interno do Servidor");
                                            })
                                        }).catch(err => {
                                            console.log(err);
                                            res.status(500).json("Erro Interno do Servidor");
                                        })
                                    }
                                    res.status(201).json({
                                        conclusao: "Concluido",
                                        numAcertos: perguntasCertas,
                                        porcentagem: porcentagem,
                                        mensagem
                                    })
                                }).catch(err => {
                                    console.log(err);
                                    res.status(500).json("Erro Interno do Servidor");
                                })
                            })
                        } else {
                            //Responder Pergunta Não Ultima 
                            perguntaId = perguntaId + 1
                            //Fazer o update do acessa porto, mudar a pergunta atual para a proxima
                            await prisma.acessaPorto.update({
                                where: {
                                    id: acessaPortoId
                                },
                                data: {
                                    perguntaAtualId: perguntaId
                                }
                            }).then(() => {
                                res.sendStatus(200)
                            }).catch(err => {
                                console.log(err)
                                res.status(500).json("Erro Interno do Servidor");
                            })

                        }
                    }
                } else {
                    res.status(400).json("Pergunta já respondida ou não reconhecida.")
                }
            } else {
                res.status(404).json("Não há perguntas Pendentes")
            }
        } else {
            res.status(404).json("Informações Inválidas")
        }
    },
}