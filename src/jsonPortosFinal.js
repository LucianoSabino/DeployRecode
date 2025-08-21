const portos = [
  //Porto 1
  {
    nome: "Iniciando a Aventura",
    descricao: "O jogador deve selecionar as respostas corretas",
    publicado: true,
    dificuldadeId: 1,
    perguntas: [
      //Pergunta1
      {
        descricao:
          "O jogador deve selecionar a amostra, sendo ela apenas os animais marinhos distribuídos junto com outros animais (total de 9). Deve clicar fazendo a correspondência ao que se pede.",
        imagem: "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta1/Imagem1.png",
        multiplasAlternativas: true,
        respostas: [
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta1/Alternativas/Alternativa1.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta1/Alternativas/Alternativa2.png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta1/Alternativas/Alternativa3.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta1/Alternativas/Alternativa4.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta1/Alternativas/Alternativa5.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta1/Alternativas/Alternativa6.png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta1/Alternativas/Alternativa7.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta1/Alternativas/Alternativa8.png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta1/Alternativas/Alternativa9.png",
            correta: false,
          },
        ],
      },
      //Pergunta2
      {
        descricao:
          "O jogador deve quantificar a escolha anterior, comparando o total de animais selecionados aos números dispostos, clicando na alternativa correta.",
        imagem: "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta2/Imagem1.png",
        multiplasAlternativas: false,
        respostas: [
          {
            descricao: "4",
            imagem: null,
            correta: false,
          },
          {
            descricao: "5",
            imagem: null,
            correta: true,
          },
          {
            descricao: "6",
            imagem: null,
            correta: false,
          },
        ],
      },
      //Pergunta3
      {
        descricao:
          "De acordo com os animais apresentados anteriormente o jogador deve observar suas características para responder, qual animal é maior? (Uma tartaruga e uma baleia)",
        imagem: "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta3/Imagem1.png",
        multiplasAlternativas: false,
        respostas: [
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta3/Alternativas/Imagem1.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta3/Alternativas/Imagem2.png",
            correta: false,
          },
        ],
      },
      //Pergunta4
      {
        descricao:
          "O jogador deve selecionar apenas os animais marinhos respondendo quais animais apresentam a cor azul dentre os animais coloridos que estão distribuídos de forma aleatória.",
        imagem: "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta4/Imagem1.png",
        multiplasAlternativas: true,
        respostas: [
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta4/Alternativas/Imagem1.png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta4/Alternativas/Imagem2.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta4/Alternativas/Imagem3.png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta4/Alternativas/Imagem4.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta4/Alternativas/Imagem5.png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta4/Alternativas/Imagem6.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta4/Alternativas/Imagem7.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta4/Alternativas/Imagem8.png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta4/Alternativas/Imagem9.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta4/Alternativas/Imagem10.png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta4/Alternativas/Imagem11.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta4/Alternativas/Imagem12.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta4/Alternativas/Imagem13.png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta4/Alternativas/Imagem14.png",
            correta: true,
          },
        ],
      },
      //Pergunta5
      {
        descricao:
          "O jogador deve observar de dois a três polvos, e contar seus tentáculos respondendo qual deles possui menos tentáculos?",
        imagem: "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta5/Imagem1.png",
        multiplasAlternativas: false,
        respostas: [
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta5/Alternativas/Imagem1.png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoIniciandoAventura/Pergunta5/Alternativas/Imagem2.png",
            correta: true,
          },
        ],
      },
    ],
  },

  //Porto 2
  {
    nome: "Aventura Estatística",
    descricao:
      "O jogador deve responder sobre a relação e comparação das quantidades corretamente",
    publicado: true,
    dificuldadeId: 2,
    perguntas: [
      //pergunta 1
      {
        descricao: "Você consegue perceber qual destes animais mais se repete?",
        imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/imagem-porto4.png",
        multiplasAlternativas: false,
        respostas: [
          {
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta1/imagem-porto4 - Copy (2).png",
            correta: false,
          },
          {
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta1/imagem-porto4 - Copy (3).png",
            correta: true,
          },
          {
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta1/imagem-porto4 - Copy.png",
            correta: false,
          },
          {
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta1/imagem-porto4.png",
            correta: false,
          },
          {
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta1/imagem-porto41.png",
            correta: false,
          },

        ],
      },
      //pergunta 2
      {
        descricao: "Você consegue ver qual destes animais menos se repete?",
        imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/imagem-porto4.png",
        multiplasAlternativas: false,
        respostas: [
          {
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta1/imagem-porto4 - Copy (2).png",
            correta: false,
          },
          {
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta1/imagem-porto4 - Copy (3).png",
            correta: false,
          },
          {
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta1/imagem-porto4 - Copy.png",
            correta: false,
          },
          {
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta1/imagem-porto4.png",
            correta: true,
          },
          {
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta1/imagem-porto41.png",
            correta: false,
          },
        ],
      },
      //pergunta 3
      {
        descricao: "Algum deles repetiu o mesmo tanto de vezes?",
        imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/imagem-porto4.png",
        multiplasAlternativas: true,
        respostas: [
          {
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta1/imagem-porto4 - Copy (2).png",
            correta: true,
          },
          {
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta1/imagem-porto4 - Copy (3).png",
            correta: false,
          },
          {
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta1/imagem-porto4 - Copy.png",
            correta: false,
          },
          {
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta1/imagem-porto4.png",
            correta: false,
          },
          {
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta1/imagem-porto41.png",
            correta: true,
          },
        ],
      },
      //pergunta 4
      {
        descricao:
          "O jogador deve selecionar a amostra, sendo ela apenas os animais marinhos distribuídos junto com outros animais (total de 16). Deve clicar fazendo a correspondência ao que se pede.",
        imagem:
          "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/imagem-porto6 - Copy.png",
        multiplasAlternativas: true,
        respostas: [
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/alternativa1/porto6-alternativa1.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/alternativa2/porto6-alternativa2.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/alternativa3/porto6-alternativa3.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/alternativa4/porto6-alternativa4.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/alternativa5/porto6-alternativa5.png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/alternativa6/porto6-alternativa6.png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/alternativa7/porto6-alternativa7.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/alternativa8/porto6-alternativa8.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/alternativa9/porto6-alternativa9.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/alternativa10/porto6-alternativa10.png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/alternativa11/porto6-alternativa11.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/alternativa12/porto6-alternativa12.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/alternativa13/porto6-alternativa13.png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/alternativa14/porto6-alternativa14.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/alternativa15/porto6-alternativa15.png",
            correta: true,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta4/alternativa16/porto6-alternativa16.png",
            correta: false,
          },
        ],
      },
      //pergunta 5
      {
        descricao:
          "O jogador deve quantificar a escolha anterior, comparando o total de animais selecionados aos números dispostos, clicando na  bolha da alternativa correta. (De 3 a 5 animais; De 6 a 9 animais; De 8 a 10 animais.)",
        imagem: "./imagens_das_perguntas/PortoAventuraEstatistica/pergunta5/imagem-porto6-pergunta2.png",
        multiplasAlternativas: false,
        respostas: [
          {
            descricao: "De 3 a 5 animais",
            imagem: "",
            correta: false,
          },
          {
            descricao: "De 6 a 9 animais",
            imagem: "",
            correta: false,
          },
          {
            descricao: "De 8 a 10 animais",
            imagem: "",
            correta: true,
          },
        ],
      },
    ],
  },

  //Porto 3
  {
    nome: "Avançando na Estatística",
    descricao: "O jogador deve responder as perguntas corretamente",
    publicado: true,
    dificuldadeId: 3,
    perguntas: [
      //pergunta 1
      {
        descricao:
          "Qual destes animais possui 33 metros de comprimento e mais de 140 toneladas:",
        imagem:
          "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta1/imagem-porto8.png",
        multiplasAlternativas: false,
        respostas: [
          {
            //alternativas1
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta1/alternativa1/imagem-porto8-alternativa1.png",
            correta: false,
          },
          {
            //alternativas2
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta1/alternativa2/imagem-porto8-alternativa2.png",
            correta: false,
          },
          {
            //alternativas3
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta1/alternativa3/imagem-porto8-alternativa3.png",
            correta: false,
          },
          {
            //alternativas4
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta1/alternativa4/imagem-porto8-alternativa4.png",
            correta: false,
          },
          {
            //alternativas5
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta1/alternativa5/imagem-porto8-alternativa5.png",
            correta: true,
          },

        ],
      },
      //pergunta 2
      {
        descricao:
          "O jogador deve notar as características dos animais e responder: \nA partir do nome do animal, quantifique e marque: \n Qual mais se repete água-viva, peixes ou arraias?",
        imagem:
          "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta2/imagem-porto8-pergunta2.png",
        multiplasAlternativas: false,
        respostas: [
          //alternativa 1
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta2/alternativa1/imagem-porto8-pergunta2 - Copy.png",
            correta: false,
          },
          //alternativa 2
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta2/alternativa2/imagem-porto8-pergunta2 - Copy (3).png",
            correta: true,
          },
          //alternativa 3
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta2/alternativa3/imagem-porto8-pergunta2 - Copy (2).png",
            correta: false,
          },
        ],
      },
      //pergunta 3
      {
        descricao:
          "O jogador deve colocar os animais agrupados de acordo com suas semelhanças. Depois deve responder, qual destes representa a moda clicando no nome do animal (Ex.: arraia, tubarão, tartaruga, peixe e água-viva).",
        imagem:
          "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta3/imagem-porto9.png",
        multiplasAlternativas: false,
        respostas: [
          //alternativa 1
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta3/alternativa1/imagem-porto9 - Copy.png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta3/alternativa2/imagem-porto9 - Copy (5).png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta3/alternativa3/imagem-porto9 - Copy (3).png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta3/alternativa4/imagem-porto9 - Copy (4).png",
            correta: false,
          },
          {
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta3/alternativa5/imagem-porto9 - Copy (2).png",
            correta: true,
          },

        ],
      },
      //pergunta 4
      {
        descricao:
          "Agora os animais não se repetem mas possuem números que os correspondem. O jogador deve colocar em ordem crescente e responder, estourando a bolha com a opção correta, dizendo qual animal representa a mediana. A opção deve ser o nome do animal escrito.",
        imagem:
          "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta5/imagem-porto9-pergunta2.png",
        multiplasAlternativas: false,
        respostas: [
          {
            //alternativas
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta5/alternativa1/imagem-porto9-alternativa2 - Copy.png",
            correta: false,
          },
          {
            //alternativas
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta5/alternativa2/imagem-porto9-alternativa2 - Copy (4).png",
            correta: false,
          },
          {
            //alternativas
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta5/alternativa3/imagem-porto9-alternativa2 - Copy (3).png",
            correta: false,
          },
          {
            //alternativas
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta5/alternativa4/imagem-porto9-alternativa2 - Copy (2).png",
            correta: true,
          },
          {
            //alternativas
            descricao: "",
            imagem:
              "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta5/alternativa5/imagem-porto9-alternativa2 - Copy (5).png",
            correta: false,
          },

        ],
      },
      //pergunta 5
      {
        descricao:
          "Os Guardiões Marinhos/O Super Leminho recolheram alguns materiais do fundo do mar. Observe e diga qual é a quantidade total em quilogramas dos meses de julho, agosto e setembro. Marque a resposta mais próxima:",
        imagem: "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta6/imagem-porto11.png",
        multiplasAlternativas: false,
        respostas: [
          {
            //alternativa1
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta6/alternativa.png",
            correta: false,
          },
          {
            //alternativa2
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta6/alternativa2.png",
            correta: true,
          },
          {
            //alternativa3
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta6/alternativa3.png",
            correta: false,
          },
          {
            //alternativa4
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta6/alternativa4.png",
            correta: false,
          }
        ],
      },
      //pergunta 6
      {
        descricao:
          "Qual destes meses representa a mediana entre os números informados?",
        imagem: "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta7/imagem-porto12.png",
        multiplasAlternativas: false,
        respostas: [
          {
            //alternativas
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta7/alternativa.png",
            correta: false,
          },
          {
            //alternativas
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta7/alternativa2.png",
            correta: true,
          },
          {
            //alternativas
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta7/alternativa3.png",
            correta: false,
          },
          {
            //alternativas
            descricao: "",
            imagem: "./imagens_das_perguntas/PortoAvancandoNaEstatistica/pergunta7/alternativa4.png",
            correta: false,
          },
        ],
      },
    ],
  },
  /*
  {
    //porto10
    nome: "Porto 10",
    descricao: "Coleta de dados.",
    publicado: true,
    dificuldadeId: 2,
    perguntas: [
      {
        //pergunta1
        descricao:
          "Marque as respostas certa: \nQual a quantidade de lixo produzido pelo Brasil todos os dias?",
        imagem: "",
        multiplasAlternativas: true,
        respostas: [
          {
            //alternativa1
            descricao: "224.614 toneladas",
            imagem: "",
            correta: true,
          },
          {
            //alternativa2
            descricao: "340.600 toneladas",
            imagem: "",
            correta: true,
          },
          {
            //alternativa3
            descricao: "25.000 toneladas",
            imagem: "",
            correta: true,
          },
          {
            //alternativa4
            descricao: "102.432 toneladas",
            imagem: "",
            correta: true,
          },
        ],
      },
      {
        //pergunta2
        descricao:
          "Marque as respostas certa: \nQuantos por cento de todo esse lixo recebe o devido tratamento para não cair nos oceanos?",
        imagem: "",
        multiplasAlternativas: true,
        respostas: [
          {
            //alternativas
            descricao: "75%",
            imagem: "",
            correta: true,
          },
          {
            //alternativas
            descricao: "42%",
            imagem: "",
            correta: true,
          },
          {
            //alternativas
            descricao: "13,3% * ",
            imagem: "",
            correta: true,
          },
          {
            //alternativas
            descricao: "5,6%",
            imagem: "",
            correta: true,
          },
        ],
      },
      {
        //pergunta3
        descricao:
          "Marque as respostas certa: \n Qual o tipo de lixo que mais demora para se decompor?",
        imagem: "",
        multiplasAlternativas: true,
        respostas: [
          {
            //alternativas1
            descricao: "Copo plástico",
            imagem: "",
            correta: true,
          },
          {
            //alternativas2
            descricao: "Fralda",
            imagem: "",
            correta: true,
          },
          {
            //alternativas3
            descricao: "Garrafa plástica",
            imagem: "",
            correta: true,
          },
          {
            //alternativas4
            descricao: "Linha de pesca  (600 anos)",
            imagem: "",
            correta: true,
          },
        ],
      },
    ],
  }, 
  
  {
    //porto11
    nome: "Porto 11",
    descricao: "Organização e Análise",
    publicado: true,
    dificuldadeId: 3,
    perguntas: [
      {
        //pergunta1
        descricao:
          "Os Guardiões Marinhos/O Super Leminho recolheram alguns materiais do fundo do mar. Observe e diga qual é a quantidade total em quilogramas dos meses de julho, agosto e setembro. Marque a resposta certa:",
        imagem: "./imagens_das_perguntas/porto11/pergunta1/imagem-porto11.png",
        multiplasAlternativas: true,
        respostas: [
          {
            //alternativa1
            descricao: "",
            imagem: "./imagens_das_perguntas/porto11/pergunta1/alternativa.png",
            correta: true,
          },
          {
            //alternativa2
            descricao: "",
            imagem: "./imagens_das_perguntas/porto11/pergunta1/alternativa2.png",
            correta: true,
          },
          {
            //alternativa3
            descricao: "",
            imagem: "./imagens_das_perguntas/porto11/pergunta1/alternativa3.png",
            correta: true,
          },
          {
            //alternativa4
            descricao: "",
            imagem: "./imagens_das_perguntas/porto11/pergunta1/alternativa4.png",
            correta: true,
          }
        ],
      },
      {
        //pergunta2
        descricao:
          "Qual destes meses representa a mediana entre os números informados?",
        imagem: "./imagens_das_perguntas/porto11/pergunta2/imagem-porto12.png",
        multiplasAlternativas: true,
        respostas: [
          {
            //alternativas
            descricao: "",
            imagem: "./imagens_das_perguntas/porto11/pergunta2/alternativa.png",
            correta: true,
          },
          {
            //alternativas
            descricao: "",
            imagem: "./imagens_das_perguntas/porto11/pergunta2/alternativa2.png",
            correta: true,
          },
          {
            //alternativas
            descricao: "",
            imagem: "./imagens_das_perguntas/porto11/pergunta2/alternativa3.png",
            correta: true,
          },
          {
            //alternativas
            descricao: "",
            imagem: "./imagens_das_perguntas/porto11/pergunta2/alternativa4.png",
            correta: true,
          }
        ],
      },
    ],
  }, 
  
  {
    //porto12
    nome: "Porto 12",
    descricao: "Representação",
    publicado: true,
    dificuldadeId: 3,
    perguntas: [
      {
        //pergunta1
        descricao: "Veja o gráfico a seguir e clique nas informações que correspondem com os dados representados:",
        imagem: "./imagens_das_perguntas/porto12/pergunta1/imagem-porto12-pergunta1.png",
        multiplasAlternativas: true,
        respostas: [
          {
            //alternativas1
            descricao: "",
            imagem: "./imagens_das_perguntas/porto12/pergunta1/alternativa.png",
            correta: true,
          },
          {
            //alternativas2
            descricao: "",
            imagem: "./imagens_das_perguntas/porto12/pergunta1/alternativa2.png",
            correta: true,
          },
          {
            //alternativas3
            descricao: "",
            imagem: "./imagens_das_perguntas/porto12/pergunta1/alternativa3.png",
            correta: true,
          },
          {
            //alternativas4
            descricao: "",
            imagem: "./imagens_das_perguntas/porto12/pergunta1/alternativa4.png",
            correta: true,
          },
          {
            //alternativas5
            descricao: "",
            imagem: "",
            correta: true,
          },
        ],
      },
      {
        //pergunta2
        descricao: "Veja o gráfico a seguir e clique nas informações que correspondem com os dados representados:",
        imagem: "./imagens_das_perguntas/porto12/pergunta2/imagem-porto12-pergunta2.png",
        multiplasAlternativas: true,
        respostas: [
          {
            //alternativas1
            descricao: "",
            imagem: "./imagens_das_perguntas/porto12/pergunta2/alternativa.png",
            correta: true,
          },
          {
            //alternativas2
            descricao: "",
            imagem: "./imagens_das_perguntas/porto12/pergunta2/alternativa2.png",
            correta: true,
          },
          {
            //alternativas3
            descricao: "",
            imagem: "./imagens_das_perguntas/porto12/pergunta2/alternativa3.png",
            correta: true,
          },
          {
            //alternativas4
            descricao: "",
            imagem: "./imagens_das_perguntas/porto12/pergunta2/alternativa4.png",
            correta: true,
          },
        ],
      }
    ],
  }, 
  
  {
    nome: "Porto13",
    descricao: "Selecione a amostra",
    publicado: true,
    dificuldadeId: 2,
    perguntas: [
      {
        descricao: "Com a ajuda dos Guardiões Marinhos/O Super Leminho, o jogador deve selecionar somente os problemas que afetam a vida marinha:",
        imagem: "",
        multiplasAlternativas: true,
        respostas: [
          {
            descricao: "Acidificação dos Oceanos e corais",
            imagem: "",
            correta: true,
          },
          {
            descricao: "Cultura e turismo",
            imagem: "",
            correta: true,
          },
          {
            descricao: "Pesca legalizada",
            imagem: "",
            correta: true,
          },
          {
            descricao: "Poluição e lixos nos Oceanos",
            imagem: "",
            correta: true,
          },
          {
            descricao: "Investimento em tecnologia",
            imagem: "",
            correta: true,
          }, {
            descricao: "Aquecimento das águas",
            imagem: "",
            correta: true,
          }, {
            descricao: "Sobreexploração da pesca",
            imagem: "",
            correta: true,
          },
        ],
      },
    ],
  }, 
  
  {
    nome: "Porto 15",
    descricao: "Coleta de dados",
    publicado: true,
    dificuldadeId: 1,
    perguntas: [
      {
        descricao: "Quantos desses animais marinhos estão em extinção? | Foca-Monge-do-Havaí; | Cavalo Marinho | Tartaruga | Leão Marinho | Baleia Azul",
        imagem: "",
        multiplasAlternativas: true,
        respostas: [
          {
            descricao: "1",
            imagem: "",
            correta: true,
          },
          {
            descricao: "2",
            imagem: "",
            correta: true,
          },
          {
            descricao: "3",
            imagem: "",
            correta: true,
          },
          {
            descricao: "Todos os 5",
            imagem: "",
            correta: true,
          },
        ],
      },
      {
        descricao: "Qual das opções é uma ameaça para a vida marinha?",
        imagem: "",
        multiplasAlternativas: true,
        respostas: [
          {
            descricao: "Muita reprodução entre as espécies, em razão das condições ambientais.",
            imagem: "",
            correta: true,
          },
          {
            descricao: "A salinização dos oceanos, levando muitas espécies à extinção.",
            imagem: "",
            correta: true,
          },
          {
            descricao: "Obras de engenharia e extração de petróleo. *",
            imagem: "",
            correta: true,
          },
          {
            descricao: "Resfriamento das águas.",
            imagem: "",
            correta: true,
          },
        ],
      }, {
        descricao: "Segundo a BBC, em 2017: Qual lugar o Brasil ocupava no ranking, que leva em conta o tamanho da população vivendo em áreas costeiras, o total de resíduos gerados e o total de plástico jogado fora?",
        imagem: "",
        multiplasAlternativas: true,
        respostas: [
          {
            descricao: "2°",
            imagem: "",
            correta: true,
          },
          {
            descricao: "9°",
            imagem: "",
            correta: true,
          },
          {
            descricao: "10°",
            imagem: "",
            correta: true,
          },
          {
            descricao: "16°",
            imagem: "",
            correta: true,
          },
        ],
      },
    ],
  }, 
  
  {
    nome: "Porto 16",
    descricao: "Organização e análise",
    publicado: true,
    dificuldadeId: 1,
    perguntas: [
      {
        descricao: "Com o excesso da exploração pesqueira, agrava o empobrecimento dos mares, vinculado à falta de recursos das frotas mais humildes, favorece a pesca ilegal que movimenta 36 bilhões de dólares anuais, degrada os ecossistemas marinhos e coloca em perigo a segurança alimentar. Fonte: https://www.iberdrola.com/ \nSupondo estes como os níveis de pesca que aconteceram nos últimos anos, responda observando e analisando a tabela: \n\nQual é a média da pesca nos últimos anos?",
        imagem: "./imagens_das_perguntas/porto16/pergunta1/imagem-porto16-pergunta1.png",
        multiplasAlternativas: true,
        respostas: [
          {
            descricao: "4,7",
            imagem: "",
            correta: true,
          },
          {
            descricao: "5",
            imagem: "",
            correta: true,
          },
          {
            descricao: "5,6",
            imagem: "",
            correta: true,
          },
          {
            descricao: "5,61",
            imagem: "",
            correta: true,
          },
        ],
      },{
        descricao: "Qual ano representa a mediana?",
        imagem: "./imagens_das_perguntas/porto16/pergunta1/imagem-porto16-pergunta1.png",
        multiplasAlternativas: true,
        respostas: [
          {
            descricao: "2019",
            imagem: "",
            correta: true,
          },
          {
            descricao: "2021",
            imagem: "",
            correta: true,
          },
          {
            descricao: "2022",
            imagem: "",
            correta: true,
          },
          {
            descricao: "2020",
            imagem: "",
            correta: true,
          },
        ],
      },{
        descricao: "Com relação aos altos índices, qual a diferença entre o primeiro e o segundo colocado?",
        imagem: "./imagens_das_perguntas/porto16/pergunta2/imagem-porto16-pergunta2.png",
        multiplasAlternativas: true,
        respostas: [
          {
            descricao: "2,6",
            imagem: "",
            correta: true,
          },
          {
            descricao: "3,1",
            imagem: "",
            correta: true,
          },
          {
            descricao: "3,5",
            imagem: "",
            correta: true,
          },
          {
            descricao: "2,9",
            imagem: "",
            correta: true,
          },
        ],
      },{
        descricao: "Durante uma pesquisa, cerca de 14,4% dos animais estudados apresentaram lixo marinho no estômago ou esôfago (Instituto BioAmar). Observe as informações sobre os tipos de lixos encontrados nos animais marinhos durante a pesquisa:",
        imagem: "./imagens_das_perguntas/porto16/pergunta3/imagem-porto16-pergunta3.png",
        multiplasAlternativas: true,
        respostas: [
          {
            descricao: "4,760",
            imagem: "",
            correta: true,
          },
          {
            descricao: "4,076",
            imagem: "",
            correta: true,
          },
          {
            descricao: "4,76",
            imagem: "",
            correta: true,
          },
        ],
      },{
        descricao: "Qual o ano em que a linha de pesca foi menos encontrada?",
        imagem: "./imagens_das_perguntas/porto16/pergunta3/imagem-porto16-pergunta3.png",
        multiplasAlternativas: true,
        respostas: [
          {
            descricao: "4,760",
            imagem: "",
            correta: true,
          },
          {
            descricao: "4,076",
            imagem: "",
            correta: true,
          },
          {
            descricao: "4,76",
            imagem: "",
            correta: true,
          },
        ],
      },
    ],
  }, 
  
  {
  nome: "Porto 17",
  descricao: "Representação",
  publicado: true,
  dificuldadeId: 1,
  perguntas: [
    {
      descricao: "Marque as alternativas verdadeiras após analisar os dados dispostos no gráfico:",
      imagem: "./imagens_das_perguntas/porto17/pergunta2/iamgem-porto17-pergunta2.png",
      multiplasAlternativas: true,
      respostas: [
        {
          descricao: "Todos os materiais tiveram aumento de 2019 para 2020",
          imagem: "",
          correta: true,
        },
        {
          descricao: "O menor índice de kg linha de pesca foi em 2019",
          imagem: "",
          correta: true,
        },
        {
          descricao: "O maior índice de kg registrado em 2020 foi o de papel",
          imagem: "",
          correta: true,
        },
        {
          descricao: "Em 2019, em ordem crescente, o terceiro maior índice do é o de alumínio",
          imagem: "",
          correta: true,
        },{
          descricao: "Em 2021, em ordem decrescente, o segundo menor índice é o de isopor.",
          imagem: "",
          correta: true,
        },
      ],
    },
  ],
  } 

  */
];

module.exports = portos;
