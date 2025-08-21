const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcryptjs = require("bcryptjs");
const fs = require("fs");

const instituicoes = require("./jsonInstituicoes.js");
const portosReais = require("./jsonPortosFinal.js");

module.exports = {
  //Dados iniciais para o APP ESTATISTICO
  //NIVEIS e ESTADOPORTO

  async initializationFunction() {
    //Verificar se Existem niveis Existentes, se Não, eles são Criados
    await prisma.nivel.findMany().then(async (niveis) => {
      if (niveis.length === 0 || niveis === undefined) {
        await prisma.nivel.create({
          data: {
            id: 1,
            descricao: "Básico",
          },
        });
        await prisma.nivel.create({
          data: {
            id: 2,
            descricao: "Intermediário",
          },
        });
        await prisma.nivel.create({
          data: {
            id: 3,
            descricao: "Avançado",
          },
        });
        console.log("Niveis Criados");
      }
    });

    //Verificar se Existem ESTADOPORTOS Existentes, se Não, eles são Criados
    await prisma.estadoPorto.findMany().then(async (estadoPorto) => {
      if (estadoPorto.length === 0 || estadoPorto === undefined) {
        await prisma.estadoPorto.create({
          data: {
            id: 1,
            descricao: "Andamento",
          },
        });
        await prisma.estadoPorto.create({
          data: {
            id: 2,
            descricao: "Passou",
          },
        });
        await prisma.estadoPorto.create({
          data: {
            id: 3,
            descricao: "Falhou",
          },
        });
        console.log("EstadoPorto Criados");
      }
    });
  },

  /*
    //Dados para teste APP ESTATISTICO
    //PORTOS, PERGUNTAS e ALTERNATIVAS
    async initializationPorts() {
        //Verifica se Existem Portos, se Não, eles são Criados
        await prisma.porto.findMany()
            .then(async portos => {
                if (portos.length === 0 || portos === undefined) {

                    let numPortosBasicos = 1
                    let numPortosInterme = 3
                    let numPortosAvançad = 5

                    while (numPortosBasicos < 3) {
                        await prisma.porto.create({
                            data: {
                                id: numPortosBasicos,
                                nome: "Porto Básico " + numPortosBasicos + " (Sem Encadeamento)",
                                descricao: "Porto Básico" + numPortosBasicos,
                                publicado: true,
                                dificuldadeId: 1
                            }
                        })
                        numPortosBasicos++;
                    }

                    while (numPortosInterme < 5) {
                        await prisma.porto.create({
                            data: {
                                id: numPortosInterme,
                                nome: "Porto Intermediário " + numPortosInterme + " (Sem Encadeamento)",
                                descricao: "Porto Intermediário " + numPortosInterme,
                                publicado: true,
                                dificuldadeId: 2
                            }
                        })
                        numPortosInterme++;
                    }

                    while (numPortosAvançad < 7) {
                        await prisma.porto.create({
                            data: {
                                id: numPortosAvançad,
                                nome: "Porto Avançado " + numPortosAvançad + " (Sem Encadeamento)",
                                descricao: "Porto Avançado " + numPortosAvançad,
                                publicado: true,
                                dificuldadeId: 3
                            }
                        })
                        numPortosAvançad++;
                    }

                    //Adicionar Perguntas a um Porto
                    let numPortos = 1
                    let numPerguntas = 1
                    let idPergunta = 1
                    let perguntas = []

                    while (numPortos < 7) {
                        while (numPerguntas < 5) {
                            perguntas.push({
                                id: idPergunta,
                                descricao: "Pergunta " + numPerguntas,
                                multiplasAlternativas: false,
                                imagem: null,
                            })
                            idPergunta++;
                            numPerguntas++;
                        }
                        //Adicionando as perguntas aos portos
                        await prisma.porto.update({
                            where: {
                                id: numPortos
                            },
                            data: {
                                perguntas: {
                                    createMany: {
                                        data: perguntas
                                    }
                                }
                            }
                        })
                        perguntas = [];
                        numPerguntas = 1;
                        numPortos++;
                    }

                    //Adicionar Alternativas a uma Pergunta
                    let numAlternativas = 1
                    let alternativas = []
                    let idAlternativas = 1
                    numPerguntas = 1

                    while (numPerguntas < 25) {
                        while (numAlternativas < 5) {
                            alternativas.push({
                                id: idAlternativas,
                                descricao: "Alternativa " + numAlternativas,
                                correta: false,
                                imagem: null,
                            })
                            idAlternativas++;
                            numAlternativas++;
                        }
                        await prisma.pergunta.update({
                            where: {
                                id: numPerguntas
                            },
                            data: {
                                alternativas: {
                                    createMany: {
                                        data: alternativas
                                    }
                                }
                            }
                        })

                        numAlternativas = 1;
                        alternativas = [];
                        numPerguntas++;
                    }

                    //Adicionar o campo respostaCertaId nas Perguntas Aleatoriamente
                    await prisma.pergunta.findMany({})
                        .then(perguntas => {
                            perguntas.forEach(async pergunta => {
                                await prisma.alternativa.findMany({
                                    where: {
                                        perguntaId: pergunta.id
                                    }
                                }).then(async alternativas => {
                                    // Selecionar aleatoriamente 1 a 3 alternativas
                                    let numAlternativasCorretas = Math.floor(Math.random() * 3) + 1;
                                    let i = 0;
                                    if(numAlternativasCorretas === 1){
                                        let alternativa = alternativas[i];
                                        await prisma.alternativa.update({
                                            where: {
                                                id: alternativa.id
                                            },
                                            data: {
                                                correta: true
                                            }
                                        })
                                    }else{
                                        while (i <= numAlternativasCorretas) {
                                            let alternativa = alternativas[i];
                                            await prisma.alternativa.update({
                                                where: {
                                                    id: alternativa.id
                                                },
                                                data: {
                                                    correta: true
                                                }
                                            })
                                            i++;
                                        }
                                        await prisma.pergunta.update({
                                            where: {
                                                id: pergunta.id
                                            },
                                            data: {
                                                multiplasAlternativas: true
                                            }
                                        })
                                    }                    
                                })
                            })
                            console.log("Portos Testes Criados")
                        })
                }
            })
    },
    */

  //Instituição Para testes Iniciais
  async initializationInstituition() {
    let insti = await prisma.institution.findMany();

    if (insti === undefined || insti.length === 0) {
      for (const instituicao of instituicoes) {
        await prisma.institution.create({
          data: {
            nome: instituicao.nome,
            sigla: instituicao.sigla,
          },
        });
      }
      console.log("Instituições iniciais Criadas");
    }
  },

  /*
    //Corrigindo a descrição das respostas corretas
    async alterarDescricaoRespostasCertas(){
        await prisma.alternativa.findMany({
            where: {
                correta: true
            }
        }).then(async alternativas => {
            alternativas.forEach(async alternativa => {
                await prisma.alternativa.update({
                    where: {
                        id: alternativa.id
                    },
                    data: {
                        descricao: "Resposta Correta"
                    }
                })
            })
        })
    },
    */

  //Teste
  async adicionandoPortosDeVerdade() {
    let portosReaisExistentes = await prisma.porto.findMany();
    if (portosReaisExistentes.length == 0) {
      for (const porto of portosReais) {
        await prisma.porto
          .findFirst({
            where: {
              nome: porto.nome,
            },
          })
          .then(async (portoExistente) => {
            if (portoExistente === null) {
              await prisma.porto
                .create({
                  data: {
                    nome: porto.nome,
                    descricao: porto.descricao,
                    publicado: true,
                    dificuldadeId: porto.dificuldadeId,
                  },
                })
                .then(async (portoCriado) => {
                  for (const pergunta of porto.perguntas) {
                    let buffer = null;
                    if (pergunta.imagem) {
                      buffer = fs.readFileSync(pergunta.imagem);
                    }
                    await prisma.pergunta
                      .create({
                        data: {
                          descricao: pergunta.descricao,
                          multiplasAlternativas: pergunta.multiplasAlternativas,
                          imagem: buffer,
                          portoId: portoCriado.id,
                        },
                      })
                      .then(async (perguntaCriada) => {
                        for (const resposta of pergunta.respostas) {
                          let buffer = null;
                          if (resposta.imagem) {
                            buffer = fs.readFileSync(resposta.imagem);
                          }
                          await prisma.alternativa.create({
                            data: {
                              descricao: resposta.descricao,
                              correta: resposta.correta,
                              imagem: buffer,
                              perguntaId: perguntaCriada.id,
                            },
                          });
                        }
                      });
                  }
                });
            }
          });
      }
    }
  },

  //Criar Conta de Administrador
  async criarContaGabriela() {
    let email = "gabriela@edu.ufrgs.com.br";
    await prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .then(async (user) => {
        if (user === undefined || user === null) {
          let senha = "admin12345";
          let salt = bcryptjs.genSaltSync(10);
          let hash = bcryptjs.hashSync(senha, salt);
          await prisma.user
            .create({
              data: {
                userName: "Gabi",
                email,
                password: hash,
                primNome: "Gabriela",
                sobreNome: "Cunha",
                nivelId: 3,
                admin: true,
                institutionId: 1,
              },
            })
            .then(() => {
              console.log("Conta de Administrador Criada");
            });
        }
      });
  },
};
