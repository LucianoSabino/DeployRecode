const { PrismaClient } = require('@prisma/client')
const fs = require('fs');
const prisma = new PrismaClient()

module.exports = {
    /**
     * Cria uma pergunta no banco de dados e retorna Verdadeiro em caso de sucesso e falso em caso de falha
     * @param {int} portoId 
     * @param {string} descricao 
     * @param {int} predecessorId 
     * @param {*} imagem 
     * @param {boolean} multiplasAlternativas 
     * @param {alternativa[]} alternativas 
     * @returns 
     */
    async createQuestion(portoId, descricao, predecessorId, imagem, multiplasAlternativas, alternativas) {
        if (portoId !== undefined && descricao !== undefined && multiplasAlternativas !== undefined
            && alternativas !== undefined && alternativas.length > 0) {
            // Coleta a imagem em Base64 e cria um buffer para armaeznar no banco de dados
            const img = imagem ? Buffer.from(imagem, 'base64') : null;
            return await prisma.pergunta.create({
                data: {
                    portoId,
                    descricao,
                    predecessorId,
                    imagem: img,
                    multiplasAlternativas
                }
            }).then((pergunta) => {
                alternativas.map(async alternativa => {
                    const altImg = alternativa.imagem ? Buffer.from(alternativa.imagem, 'base64') : null;
                    await prisma.alternativa.create({
                        data: {
                            perguntaId: pergunta.id,
                            descricao: alternativa.descricao,
                            imagem: altImg,
                            correta: alternativa.correta
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                });
                return true
            }).catch(err => {
                console.log(err)
                return false
            })
        }
        return false
    },

    /**
     * Atualiza uma pergunta no banco de dados e retorna Verdadeiro em caso de sucesso e falso em caso de falha
     * @param {int} perguntaId 
     * @param {string} descricao 
     * @param {int} predecessorId 
     * @param {*} imagem 
     * @param {boolean} multiplasAlternativas 
     * @param {alternativa[]} alternativas 
     * @returns 
     */
    async updateQuestion(perguntaId, descricao, predecessorId, imagem, multiplasAlternativas, alternativas) {
        if (perguntaId !== undefined && descricao !== undefined && multiplasAlternativas !== undefined
            && alternativas !== undefined && alternativas.length > 0) {

            // Coleta a imagem em Base64 e cria um buffer para armaeznar no banco de dados
            const img = imagem ? Buffer.from(imagem, 'base64') : null;
            return await prisma.pergunta.update({
                where: {
                    id: perguntaId
                },
                data: {
                    descricao,
                    predecessorId,
                    imagem: img,
                    multiplasAlternativas
                }
            }).then((pergunta) => {
                alternativas.map(async alternativa => {
                    const altImg = alternativa.imagem ? Buffer.from(alternativa.imagem, 'base64') : null;
                    if (alternativa.id !== undefined && alternativa.id !== '') {
                        await prisma.alternativa.update({
                            where: {
                                id: alternativa.id
                            },
                            data: {
                                perguntaId: pergunta.id,
                                descricao: alternativa.descricao,
                                imagem: alternativa.imagem,
                                imagem: altImg,
                                correta: alternativa.correta
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                    else {
                        await prisma.alternativa.create({
                            data: {
                                perguntaId: pergunta.id,
                                descricao: alternativa.descricao,
                                imagem: altImg,
                                correta: alternativa.correta
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                });
                return true
            }).catch(err => {
                console.log(err)
                return false
            })
        }
        return false
    },

    /**
     * Deleta uma pergunta e todas as alternativas do banco de dados
     * @param {int} perguntaId 
     */
    async deleteQuestion(perguntaId) {
        return await prisma.alternativa.deleteMany({
            where: {
                perguntaId: perguntaId
            }
        }).then(async () => {
            return await prisma.pergunta.delete({
                where: {
                    id: perguntaId
                }
            }).then(() => {
                return true
            }).catch(err => {
                console.log(err);
                return false
            })
        }).catch(err => {
            console.log(err);
            return false
        })
    },

    /**
     * Retorna a pergunta e as alternativas da pergunta
     * @returns 
     */
    async readQuestion(perguntaId) {
        return await prisma.pergunta.findUnique({
            where: {
                id: perguntaId
            },
            include: {
                alternativas: {
                    select: {
                        id: true,
                        descricao: true,
                        imagem: true,
                        correta: true
                    }
                }
            }
        }).then(pergunta => {
            return pergunta
        }).catch(err => {
            console.log(err)
            return null
        })
    }
}