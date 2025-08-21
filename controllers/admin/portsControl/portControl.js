const { PrismaClient } = require("@prisma/client");
const { createQuestion, updateQuestion, deleteQuestion } = require("./questionsControl");
const prisma = new PrismaClient();

module.exports = {
    async listPorts(req, res) {
        await prisma.porto.findMany()
            .then(portos => {
                res.status(200).json({ data: portos });
            }).catch(err => {
                console.log(err);
                res.status(500).json("Erro Interno do Servidor");
            })
    },

    async readPort(req, res) {
        if (req.body.id !== undefined) {
            const portId = parseInt(req.body.id);

            await prisma.porto.findUnique({
                where: {
                    id: portId
                },
                include: {
                    perguntas: {
                        select: {
                            id: true,
                            descricao: true,
                            imagem: true,
                        }
                    }
                }
            }).then(porto => {
                res.status(200).json({ data: porto });
            }).catch(err => {
                console.log(err);
                res.status(500).json("Erro Interno do Servidor");
            })
        } else {
            res.status(404).json("Informações Inválidas");
        }
    },

    async listDifficulty(req, res) {
        await prisma.nivel.findMany()
            .then(dificuldades => {
                res.status(200).json({ data: dificuldades });
            }).catch(err => {
                console.log(err);
                res.status(500).json("Erro Interno do Servidor");
            })
    },

    async createPort(req, res) {
        if (req.body.nome !== undefined && req.body.descricao !== undefined &&
            req.body.dificuldade !== undefined && req.body.publicado !== undefined &&
            (req.body.perguntas !== undefined && req.body.perguntas.length > 0)) {
            const { nome, descricao, publicado, dificuldade, predecessorId, perguntas } = req.body;

            await prisma.porto.create({
                data: {
                    nome: nome,
                    descricao: descricao,
                    publicado: publicado,
                    dificuldadeId: dificuldade,
                    predecessorId: predecessorId
                }
            }).then(porto => {
                perguntas.map(async pergunta => {
                    createQuestion(porto.id, pergunta.descricao, pergunta.predecessorId, pergunta.imagem, pergunta.multiplasAlternativas, pergunta.alternativas);
                })
                res.status(201).json({ data: porto });
            }).catch(err => {
                console.log(err);
                res.status(500).json("Erro Interno do Servidor");
            })
        }
        else {
            res.status(400).json("Atributos obrigatórios não inseridos");
        }
    },

    async updatePort(req, res) {
        if (req.body.portId !== undefined && req.body.nome !== undefined && req.body.descricao !== undefined &&
            req.body.dificuldade !== undefined && req.body.predecessorId !== undefined) {
            const { portId, nome, descricao, dificuldade, predecessorId } = req.body;

            await prisma.porto.update({
                where: {
                    id: parseInt(portId)
                },
                data: {
                    nome: nome,
                    descricao: descricao,
                    dificuldadeId: parseInt(dificuldade),
                    predecessorId: parseInt(predecessorId)
                }
            }).then(porto => {               
                res.status(201).json({ data: porto });
            }).catch(err => {
                console.log(err);
                res.status(500).json("Erro Interno do Servidor");
            })
        }
        else {
            res.status(400).json("Atributos obrigatórios não inseridos");
        }
    },

    async deletePort(req, res) {
        if (req.body.id !== undefined) {
            const portoId = parseInt(req.body.id);
            await prisma.porto.findUnique({
                where: {
                    id: portoId
                },
                include: {
                    perguntas: {
                        select: {
                            id: true
                        }
                    }
                }
            }).then(async porto => {
                try {
                    const results = await Promise.all(porto.perguntas.map(async pergunta => {
                        return await deleteQuestion(pergunta.id);
                    }));

                    if (results.every(result => result)) {
                        await prisma.porto.delete({
                            where: {
                                id: portoId
                            }
                        });
                        res.status(200).json("Porto deletado com sucesso");
                    } else {
                        res.status(500).json("Erro Interno do Servidor");
                    }
                } catch (err) {
                    console.log(err);
                    res.status(500).json("Erro Interno do Servidor");
                }

            })

        } else {
            res.status(400).json("Informações Inválidas");
        }
    },

    async createUniqueQuestion(req, res) {
        const { portoId, descricao, predecessorId, imagem, multiplasAlternativas, alternativas } = req.body;
        if (portoId !== undefined && descricao !== undefined && multiplasAlternativas !== undefined && (alternativas !== undefined && alternativas.length > 0)) {
            createQuestion(portoId, descricao, predecessorId, imagem, multiplasAlternativas, alternativas).then(result => {
                if (result) {
                    res.status(201).json("Pergunta criada com sucesso");
                }
                else {
                    res.status(500).json("Erro Interno do Servidor");
                }
            });
        }
        else {
            res.status(400).json("Atributos obrigatórios não inseridos");
        }
    },

    async updateUniqueQuestion(req, res) {
        const { perguntaId, descricao, imagem, multiplasAlternativas, alternativas } = req.body;
        if (perguntaId !== undefined && descricao !== undefined && multiplasAlternativas !== undefined && (alternativas !== undefined && alternativas.length > 0)) {
            updateQuestion(perguntaId, descricao, imagem, multiplasAlternativas, alternativas).then(result => {
                if (result) {
                    res.status(200).json("Pergunta atualizada com sucesso");
                }
                else{
                    res.status(500).json("Erro Interno do Servidor");
                }
            });
        }
        else {
            res.status(400).json("Atributos obrigatórios não inseridos");
        }
    },

    async listAllQuestions(req, res) {
        const { portoId } = req.params
        if (portoId !== undefined) {
            await prisma.pergunta.findMany({
                where: {
                    portoId: portoId
                },
                include: {
                    alternativas: true
                }
            }).then(questions => {
                res.status(200).json({ data: questions });
            }).catch(err => {
                console.log(err);
                res.status(500).json("Erro Interno do Servidor");
            })
        } else {
            res.status(400).json("Atributos obrigatórios não inseridos");
        }
    },

    async listUniqueQuestion(req, res) {
        const { perguntaId } = req.body
        if (perguntaId !== undefined) {
            await prisma.pergunta.findUnique({
                where: {
                    id: parseInt(perguntaId)
                },
                include: {
                    alternativas: true
                }
            }).then(question => {
                res.status(200).json({ data: question });
            }).catch(err => {
                console.log(err);
                res.status(500).json("Erro Interno do Servidor");
            })
        } else {
            res.status(400).json("Atributos obrigatórios não inseridos");
        }
    },

    async deleteUniqueQuestion(req, res) {
        if (req.body.id !== undefined) {
            const perguntaId = req.body.id;

            await deleteQuestion(perguntaId).then(result => {
                if (result) {
                    res.status(200).json("Pergunta deletada com sucesso");
                } else {
                    res.status(500).json("Erro Interno do Servidor");
                }
            });

        } else {
            res.status(400).json("Informações Inválidas");
        }
    }

}