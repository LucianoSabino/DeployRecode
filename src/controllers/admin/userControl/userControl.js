const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const { gerarPdf } = require('./pdf/gerarPdf');

const prisma = new PrismaClient();

/**
 * Busca a maior quantidade de acerto por tentativa dos usuários que concluíram o porto.
 * @param {int} portoId 
 * @returns 
 */
async function relatoriosPortosId(portoId) {

    let usuariosConcluiramPortoSucesso = await prisma.$queryRaw`
        SELECT
            userInfo.userId,
            userInfo.userName,
            userInfo.instituicao,
            MAX(userInfo.acertos) AS acertos,
            CAST((COUNT(pgt.id) - MAX(userInfo.acertos)) AS DECIMAL) AS erros
        FROM
            (
            SELECT
                DISTINCT u.id AS userId,
                u.userName AS userName,
                i.sigla AS instituicao,
                CAST(acertos.qtd AS DECIMAL) AS acertos
            FROM
                user u
            INNER JOIN institution i ON
                i.id = u.institutionId
            INNER JOIN porto p ON
                p.id = ${portoId}
            INNER JOIN acessaporto a ON
                (a.userId = u.id
                    AND a.portoId = p.id)
            INNER JOIN (
                SELECT
                    r.acessoPortoId,
                    count(r.id) AS qtd
                FROM
                    respostapergunta r
                WHERE
                    r.acertou = true
                GROUP BY
                    r.acessoPortoId 
                            ) acertos ON
                (acertos.acessoPortoId = a.id)
            WHERE
                a.estadoPortoId = 2
                        ) AS userInfo
        INNER JOIN pergunta pgt ON
            (pgt.portoId = ${portoId})
        GROUP BY
            userInfo.userId,
            userInfo.userName,
            userInfo.instituicao
    `;

    return usuariosConcluiramPortoSucesso;
}

module.exports = {
    async listUser(req, res) {

        const users = await prisma.user.findMany({
            where: {
                admin: false,
                subAdmin: false
            },
            select: {
                id: true,
                userName: true,
                institution: {
                    select: {
                        sigla: true
                    }
                }
            },
            orderBy: {
                userName: 'asc'
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json("Erro Interno do Servidor");
        })

        if (users.length === 0) {
            res.status(404).json("Não foram encontrados Usuários");      
        } else {
            res.status(200).send({ data: users });
        }
    },

    async userProfile(req, res) {
        let userId = req.data.id;

        if (req.body.profileId !== undefined) {
            let profileId = req.body.profileId;

            await prisma.user.findUnique({
                where: {
                    id: profileId
                },
                include: {
                    nivel: true,
                    institution: true
                }
            }).then(async user => {
                if (user !== null || user !== undefined) {
                    let respAcessaPortos = await prisma.$queryRaw`
                    select distinct a.id, p.nome, p.dificuldadeId, e.descricao  from acessaporto a 
                    inner join porto p on p.id = a.portoId 
                    inner join estadoporto e on e.id = a.estadoPortoId  
                    where a.estadoPortoId != 1 and a.userId = ${user.id}
                 `

                    const userAlterador = await prisma.user.findUnique({
                        where: {
                            id: userId
                        },
                        select: {
                            admin: true,
                            subAdmin: true
                        }
                    })



                    const data = ({
                        id: user.id,
                        userName: user.userName,
                        userPrimNome: user.primNome,
                        userSobrenome: user.sobreNome,
                        userNivel: user.nivel.descricao,
                        userInstituicao: user.institution.nome,
                        isAdmin: user.admin ? true : user.subAdmin ? true : false,
                        vistoPorAdminChefe: userAlterador.admin ? true : false,
                    })
                    if (respAcessaPortos != undefined || respAcessaPortos !== null) {
                        res.status(200).send({ data, data1: respAcessaPortos });
                    } else if (respAcessaPortos === null) {
                        res.status(200).send({ data });
                    } else {
                        res.status(404).json("Perfil não encontrado");
                    }
                } else {
                    res.status(404).json("Usuário não encontrado");
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json("Erro Interno do Servidor");
            })
        } else {
            res.status(404).json("Informações Inválidas");
        }
    },

    async promoteSubAdmin(req, res) {
        let userId = req.data.id;

        if (req.body.idUpdated !== undefined) {
            let userUpdated = req.body.idUpdated;

            await prisma.user.update({
                where: {
                    id: userUpdated
                },
                data: {
                    subAdmin: true
                }
            }).then(async user => {
                if (user.subAdmin === true) {
                    await prisma.gerenciaAdmin.create({
                        data: {
                            userAtribuiuId: userId,
                            userAtribuidoId: user.id,
                            acao: "Promover à Sub-Administrador"
                        }
                    }).then(() => {
                        res.status(200).json("Permissão dada ao Usuário");
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json("Erro Interno do Servidor");
                    })
                } else {
                    res.status(500).json("Erro Interno do Servidor");
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json("Erro Interno do Servidor");
            })
        } else {
            res.status(401).json("Informações Inválidas");
        }
    },

    async relatoriosPortos(req, res) {
        await prisma.porto.findMany({
            select: {
                id: true,
                nome: true,
                dificuldadeId: true,
            }
        }).then(portos => {
            res.status(200).json({ data: portos });
        }).catch(err => {
            console.log(err);
            res.status(500).json("Erro Interno do Servidor");
        })
    },
    relatoriosPortosId,
    async gerarPdfRelatorioPortoId(req, res) {

        if (req.body?.id !== undefined) {
            const portoId = parseInt(req.body.id);

            // Busca as informações do relatório
            const usuariosConcluiramPortoSucesso = await relatoriosPortosId(portoId).catch(err => {
                console.error(err);
                res.status(500).json("Erro Interno do Servidor");
            });

            const porto = await prisma.porto.findUnique({
                where: {
                    id: portoId
                }
            }).catch(err => {
                console.error(err);
                res.status(500).json("Erro Interno do Servidor");
            });

            const pdfFolder = path.join('pdf/relatoriosPortos/');

            // Cria diretório para armazenar o arquivo temporariamente
            fs.mkdir(pdfFolder, { recursive: true }, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json("Erro Interno do Servidor");
                }
                else {
                    const fileName = `PORTO_ID${portoId}_${Date.now()}.pdf`;
                    const filePath = path.join(pdfFolder, fileName);

                    const pdfStream = fs.createWriteStream(filePath)

                    pdfStream.on('error', (err) => {
                        console.error(err);
                        res.status(500).json("Erro Interno do Servidor");
                    })

                    gerarPdf(pdfStream, porto, usuariosConcluiramPortoSucesso)

                    /* Importante: O PDFKit funciona de forma assincrona para Criar o arquivo PDF.
                     * Por isso é necessário criar uma promise para que seja possível retornar o arquivo na rota.
                     * Caso não tenha a promise, a resposta é enviada antes de gerar o arquivo.
                     */
                    return new Promise(resolve => {
                        pdfStream.on("finish", () => {
                            resolve();
                        });
                    }).then(() => {
                        res.status(200).download(filePath, fileName, (err) => {
                            if (err) {
                                console.error(err);
                                res.status(500).json("Erro Interno do Servidor");
                            }
                            fs.rm(path.join('pdf'), { recursive: true }, (err) => {
                                if (err) {
                                    console.error(`Erro ao apagar relatório ${filePath}`);
                                    console.error(err);
                                }
                            })
                        });
                    });

                }
            });

        } else {
            res.status(401).json("Informações Inválidas");
        }
    },

    async listAdmins(req, res) {
        let userId = req.data.id;

        try {
            const admins = await prisma.user.findMany({
                where: {
                    AND: [
                        {
                            OR: [
                                { admin: true },
                                { subAdmin: true }
                            ],
                        },
                        {
                            id: {
                                not: userId
                            }
                        }
                    ]                                   
                },
                select: {
                    id: true,
                    userName: true,
                    institution: {
                        select: {
                            sigla: true
                        }
                    }
                }
            });

            if (admins.length === 0) {
                return res.status(404).json("Nenhum administrador encontrado");
            }

            return res.status(200).json({ data: admins });
        } catch (err) {
            console.error(err);
            return res.status(500).json("Erro Interno do Servidor");
        }
    },

    async perfilAdmin(req, res) {
        const adminId = req.params.id;

        try {
            const admin = await prisma.user.findUnique({
                where: { id: adminId },
                select: {
                    id: true,
                    userName: true,
                    admin: true,
                    subAdmin: true,
                    nome: true,
                    sobreNome: true,
                    descricao: true,
                    institution: true
                    // Adicione aqui outros campos que você deseja retornar
                },
            });

            if (!admin) {
                return res.status(404).json("Administrador não encontrado");
            }

            return res.status(200).json({ data: admin });
        } catch (err) {
            console.error(err);
            return res.status(500).json("Erro Interno do Servidor");
        }
    },

    async removeAdmin(req, res) {
        let userAtribui = req.data.id;
        const userId = req.body.id;

        try {
            const user = await prisma.user.update({
                where: { id: userId },
                data: {
                    admin: false,
                    subAdmin: false
                }
            });

            if (!user) {
                return res.status(404).json("Usuário não encontrado");
            }

            await prisma.gerenciaAdmin.create({
                data: {
                    userAtribuiuId: userAtribui,
                    userAtribuidoId: userId,
                    acao: "Remover Perfil Sub-Administrador"
                }
            });

            return res.status(200).json("Usuário removido com sucesso");
        } catch (err) {
            console.error(err);
            return res.status(500).json("Erro Interno do Servidor");
        }
    }

}