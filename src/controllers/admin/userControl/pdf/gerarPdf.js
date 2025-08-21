const PDFKit = require('pdfkit');

/* PDFKit utiliza um padrão de medida baseado em POLEGADAS. 
 * 1 Polegada = 72 pontos (Pontos é a unidade de medida do PDFKit)
 * Margem Superior e Esquerda: 3cm
 * Margem Inferior e Direita: 2cm
 */
const marginConfig = {
    top: 85.0392,
    bottom: 56.16,
    left: 85.0392,
    right: 56.16
}

module.exports = {
    async gerarPdf(stream, porto, relatorio) {
        const pdf = new PDFKit({
            size: 'A4',
            margins: marginConfig
        })

        pdf.pipe(stream)


        pdf.fontSize(18).font('Times-Roman').text(`${porto.nome}`, marginConfig.left, marginConfig.top + 20, {
            align: 'center'
        });

        pdf.fontSize(14).font('Times-Bold').text("Usuário", marginConfig.left + 15, marginConfig.top + 80, { width: 100, align: 'center' })
            .fontSize(14).text("Instituição", marginConfig.left + 120, marginConfig.top + 80, { width: 100, align: 'center' })
            .fontSize(14).text("Respostas Certas", marginConfig.left + 225, marginConfig.top + 70, { width: 100, align: 'center' })
            .fontSize(14).text("Respostas Erradas", marginConfig.left + 330, marginConfig.top + 70, { width: 100, align: 'center' })

        pdf.moveTo(marginConfig.left + 15, marginConfig.top + 105).lineTo(marginConfig.left + 430, marginConfig.top + 105).fillOpacity(0.5).fill().stroke().fillOpacity(1);
        // Posição y dos elementos do relatório
        let y = pdf.y + 15;

        // Contador de respostas certas
        let qtdAcertos = 0;

        // Contador de respostas erradas
        let qtdErros = 0;

        relatorio.map((user, i) => {

            pdf.fontSize(12).font('Times-Roman').text(user.userName, marginConfig.left + 15, y, { width: 100, align: 'center' })
                .fontSize(12).text(user.instituicao, marginConfig.left + 120, y, { width: 100, align: 'center' })
                .fontSize(12).text(user.acertos, marginConfig.left + 225, y, { width: 100, align: 'center' })
                .fontSize(12).text(user.erros, marginConfig.left + 330, y, { width: 100, align: 'center' })

            // Verifica se está no último elemento da tabela e desenha a linha horizontal
            if (i !== relatorio.length - 1) {
                pdf.moveTo(marginConfig.left + 15, y + 20).lineTo(marginConfig.left + 430, y + 20).fillOpacity(0.25).fill().stroke().fillOpacity(1);   
            }

            // Ajusta posiçao y do próximo elemento
            y += 30

            // Soma quantidade de acertos e erros
            qtdAcertos += parseInt(user.acertos);
            qtdErros += parseInt(user.erros);

        })

        // Desenhando linhas da primeira tabela

        // Linhas Verticais
        pdf.moveTo(marginConfig.left + 15, marginConfig.top + 60).lineTo(marginConfig.left + 15, pdf.y + 10).stroke();
        pdf.moveTo(marginConfig.left + 115, marginConfig.top + 60).lineTo(marginConfig.left + 115, pdf.y + 10).stroke();
        pdf.moveTo(marginConfig.left + 220, marginConfig.top + 60).lineTo(marginConfig.left + 220, pdf.y + 10).stroke();
        pdf.moveTo(marginConfig.left + 335, marginConfig.top + 60).lineTo(marginConfig.left + 335, pdf.y + 10).stroke();
        pdf.moveTo(marginConfig.left + 430, marginConfig.top + 60).lineTo(marginConfig.left + 430, pdf.y + 10).stroke();

        // Linhas Horizontais
        pdf.moveTo(marginConfig.left + 15, marginConfig.top + 60).lineTo(marginConfig.left + 430, marginConfig.top + 60).stroke();
        pdf.moveTo(marginConfig.left + 15, pdf.y + 10).lineTo(marginConfig.left + 430, pdf.y + 10).stroke();

        // Total de respostas, respostas Certas e respostas Erradas
        y = pdf.y + 50
        pdf.fontSize(14).text(`Total de Respostas: ${relatorio.length}`, marginConfig.left + 70, y, { width: 85, align: 'center' })
            .fontSize(14).text(`Total de Acertos: ${qtdAcertos}`, marginConfig.left + 190, y, { width: 85, align: 'center' })
            .fontSize(14).text(`Total de Erros: ${qtdErros}`, marginConfig.left + 310, y, { width: 85, align: 'center' })


        pdf.fontSize(10).text(`Data de emissão: ${new Date().toLocaleDateString()}`, marginConfig.left, pdf.page.height - 100, { align: 'left' });
        // Finaliza e fecha arquivo e stream.
        pdf.end();

    },

}