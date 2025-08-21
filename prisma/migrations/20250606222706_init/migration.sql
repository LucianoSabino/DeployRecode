-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT NOT NULL,
    "nivelId" INTEGER NOT NULL,
    "primNome" VARCHAR(30) NOT NULL,
    "sobreNome" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "subAdmin" BOOLEAN NOT NULL DEFAULT false,
    "institutionId" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institution" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "sigla" VARCHAR(10) NOT NULL,

    CONSTRAINT "institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gerenciaadmin" (
    "id" SERIAL NOT NULL,
    "userAtribuiuId" TEXT NOT NULL,
    "userAtribuidoId" TEXT NOT NULL,
    "acao" TEXT NOT NULL,
    "dateAtribui" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateAtualizacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gerenciaadmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "porto" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" TEXT NOT NULL,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "dificuldadeId" INTEGER NOT NULL,
    "predecessorId" INTEGER,

    CONSTRAINT "porto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manipulaporto" (
    "id" SERIAL NOT NULL,
    "idAdmin" TEXT NOT NULL,
    "portoId" INTEGER NOT NULL,
    "acao" TEXT NOT NULL,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "manipulaporto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nivel" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "nivel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acessaporto" (
    "id" SERIAL NOT NULL,
    "portoId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "perguntaAtualId" INTEGER NOT NULL,
    "estadoPortoId" INTEGER NOT NULL,

    CONSTRAINT "acessaporto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estadoporto" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "estadoporto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pergunta" (
    "id" SERIAL NOT NULL,
    "portoId" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "predecessorId" INTEGER,
    "imagem" BYTEA,
    "multiplasAlternativas" BOOLEAN NOT NULL,

    CONSTRAINT "pergunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alternativa" (
    "id" SERIAL NOT NULL,
    "perguntaId" INTEGER NOT NULL,
    "descricao" TEXT,
    "imagem" BYTEA,
    "correta" BOOLEAN NOT NULL,

    CONSTRAINT "alternativa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "respostapergunta" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "acessoPortoId" INTEGER NOT NULL,
    "PerguntaId" INTEGER NOT NULL,
    "acertou" BOOLEAN NOT NULL,
    "dataResposta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "respostapergunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alternativaMarcada" (
    "id" SERIAL NOT NULL,
    "respostaPerguntaId" INTEGER NOT NULL,
    "alternativaMarcadaId" INTEGER NOT NULL,

    CONSTRAINT "alternativaMarcada_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_userName_key" ON "user"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "institution_nome_key" ON "institution"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "institution_sigla_key" ON "institution"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "pergunta_predecessorId_key" ON "pergunta"("predecessorId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_nivelId_fkey" FOREIGN KEY ("nivelId") REFERENCES "nivel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gerenciaadmin" ADD CONSTRAINT "gerenciaadmin_userAtribuiuId_fkey" FOREIGN KEY ("userAtribuiuId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gerenciaadmin" ADD CONSTRAINT "gerenciaadmin_userAtribuidoId_fkey" FOREIGN KEY ("userAtribuidoId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "porto" ADD CONSTRAINT "porto_dificuldadeId_fkey" FOREIGN KEY ("dificuldadeId") REFERENCES "nivel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "porto" ADD CONSTRAINT "porto_predecessorId_fkey" FOREIGN KEY ("predecessorId") REFERENCES "porto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manipulaporto" ADD CONSTRAINT "manipulaporto_idAdmin_fkey" FOREIGN KEY ("idAdmin") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manipulaporto" ADD CONSTRAINT "manipulaporto_portoId_fkey" FOREIGN KEY ("portoId") REFERENCES "porto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acessaporto" ADD CONSTRAINT "acessaporto_portoId_fkey" FOREIGN KEY ("portoId") REFERENCES "porto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acessaporto" ADD CONSTRAINT "acessaporto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acessaporto" ADD CONSTRAINT "acessaporto_perguntaAtualId_fkey" FOREIGN KEY ("perguntaAtualId") REFERENCES "pergunta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acessaporto" ADD CONSTRAINT "acessaporto_estadoPortoId_fkey" FOREIGN KEY ("estadoPortoId") REFERENCES "estadoporto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pergunta" ADD CONSTRAINT "pergunta_portoId_fkey" FOREIGN KEY ("portoId") REFERENCES "porto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pergunta" ADD CONSTRAINT "pergunta_predecessorId_fkey" FOREIGN KEY ("predecessorId") REFERENCES "pergunta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alternativa" ADD CONSTRAINT "alternativa_perguntaId_fkey" FOREIGN KEY ("perguntaId") REFERENCES "pergunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostapergunta" ADD CONSTRAINT "respostapergunta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostapergunta" ADD CONSTRAINT "respostapergunta_acessoPortoId_fkey" FOREIGN KEY ("acessoPortoId") REFERENCES "acessaporto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostapergunta" ADD CONSTRAINT "respostapergunta_PerguntaId_fkey" FOREIGN KEY ("PerguntaId") REFERENCES "pergunta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alternativaMarcada" ADD CONSTRAINT "alternativaMarcada_respostaPerguntaId_fkey" FOREIGN KEY ("respostaPerguntaId") REFERENCES "respostapergunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alternativaMarcada" ADD CONSTRAINT "alternativaMarcada_alternativaMarcadaId_fkey" FOREIGN KEY ("alternativaMarcadaId") REFERENCES "alternativa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
