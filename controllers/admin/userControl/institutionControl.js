const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



module.exports = {
    async listAllInstitutions(req, res) {
        await prisma.institution.findMany().then((institutions) => {
            res.status(200).json(institutions);
        }).catch((error) => {
            res.status(400).json({ error: error });
        })
    },

    async createInstitution(req, res) {
        const name = req.body.nome;
        const sigla = req.body.sigla;

        let institution = await prisma.institution.findMany({
            where: {
                nome: name
            }
        })
        
        if(institution.length > 0) {
            return res.status(400).json({ error: "Instituição já cadastrada" });
        }else{
            await prisma.institution.create({
                data: {
                    nome: name,
                    sigla: sigla
                }
            }).then((institution) => {
                res.status(200).json(institution);
            }).catch((error) => {
                res.status(400).json({ error: error });
            })
        }
        
    },

    async updateInstituition(req, res) {
        const id = parseInt(req.body.id);
        const name = req.body.nome;
        const sigla = req.body.sigla;

        await prisma.institution.update({
            where: {
                id: id
            },
            data: {
                nome: name,
                sigla: sigla
            }
        }).then(() => {
            res.status(200);
        }).catch((error) => {
            console.log(error);
            res.status(400);
        })
    }


}