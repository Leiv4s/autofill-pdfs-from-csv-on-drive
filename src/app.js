import PdfController from "./pdfController.js";
import Tools from "./tools.js";
import CSVDownloader from "./conect.js";
import dotenv from 'dotenv';

dotenv.config();
const url = process.env.URL;
const outputFilePath = 'src/csv/dados.csv';
const csvDownloader = new CSVDownloader(url, outputFilePath);
csvDownloader.downloadCSV();


let tools = new Tools();
let pdfController = new PdfController();



class Condition {
    constructor(){}
    async rodar(data) {
        
        for (let i = 0; i < data.length; i++) {
            
            let diretorio = "result/";
            let nomePasta = `${data[i][0]}`;
            let pastaPessoa = await tools.haveFolder("result/",diretorio+nomePasta)
            if(!pastaPessoa){
                tools.criarPasta(diretorio,nomePasta)
            }

            let saidaRequerimento = `result/${nomePasta}/requerimento - ${nomePasta}.pdf`    
            pdfController.createRequerimento("src/pdfs/requerimento.pdf", saidaRequerimento,i,data)
            
            let saidaTermoRepresentacao = `result/${nomePasta}/termo representação - ${nomePasta}.pdf`    
            pdfController.createTermoRepresentacao("src/pdfs/termo de representacao.pdf",saidaTermoRepresentacao,i,data)
            
            let saidaProcuracao = `result/${nomePasta}/procuracao - ${nomePasta}.pdf`    
            pdfController.createProcuracao("src/pdfs/procuracao.pdf",saidaProcuracao,i,data);
            
            let saidaContrato = `result/${nomePasta}/contrato honorários - ${nomePasta}.pdf`    
            pdfController.createContrato("src/pdfs/contrato de honorarios.pdf",saidaContrato,i,data);
            
            let saidaDeclaracaoPescador = `result/${nomePasta}/declaracao atv. pesqueira - ${nomePasta}.pdf`
            pdfController.createDeclaracaoPescador("src/pdfs/declaracao atividade pesqueira.pdf",saidaDeclaracaoPescador,i,data);
            
            let saidaDeclaracaoFiliacao = `result/${nomePasta}/declaracao de filiação - ${nomePasta}.pdf`
            pdfController.createDeclaracaoFiliacao("src/pdfs/declaracao de filiacao.pdf",saidaDeclaracaoFiliacao,i,data);
            
            let saidaDeclaracaoResidencia = `result/${nomePasta}/declaracao de residencia - ${nomePasta}.pdf`
            pdfController.createDeclaracaoResidencia("src/pdfs/declaracao de residencia.pdf",saidaDeclaracaoResidencia,i,data);
        }  
    }
}

let app = new Condition();
(async () => {
    await tools.limparPasta("result/");
    const data = await tools.readCSV("src/csv/dados.csv");
    await app.rodar(data);
})();


