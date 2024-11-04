import {PDFDocument} from "pdf-lib";
import {readFile, writeFile} from "fs/promises"

class PdfController {

    constructor () {}


    async mapPDF(input){
        var pdfDoc = await PDFDocument.load(await readFile(input))
        var fieldNames = pdfDoc.getForm().getFields();
        fieldNames = fieldNames.map((f)=>f.getName())
        return {fieldNames,pdfDoc}
    }

    setFontSizeForAllFields(form, fieldNames, fontSize) {
        fieldNames.forEach(name => {
            const textField = form.getTextField(name);
            textField.setFontSize(fontSize);
        });
    }

    async createRequerimento(input,output,x,data){
        try {
            let {fieldNames,pdfDoc} = await this.mapPDF(input);
            const form = pdfDoc.getForm()
            this.setFontSizeForAllFields(form,fieldNames,11)
            form.getTextField(fieldNames[12]).setText(data[x][0])//nome
            form.getTextField(fieldNames[0]).setText(data[x][1])//dataNasc
            form.getTextField(fieldNames[1]).setText(data[x][2])//nomeMae
            form.getTextField(fieldNames[2]).setText(data[x][3])//rg
            form.getTextField(fieldNames[3]).setText(data[x][5])//pis
            form.getTextField(fieldNames[4]).setText(data[x][4])//cpf
            form.getTextField(fieldNames[5]).setText(data[x][6])//cei
            form.getTextField(fieldNames[6]).setText(data[x][7])//rua
            form.getTextField(fieldNames[7]).setText(data[x][8])//numero
            form.getTextField(fieldNames[8]).setText(data[x][9])//complemento(aqui setei pra add o bairro)
            form.getTextField(fieldNames[9]).setText(data[x][10])//municipio
            form.getTextField(fieldNames[10]).setText(data[x][11])//estado
            form.getTextField(fieldNames[11]).setText(data[x][12])//cep


            let pdfBytes = await pdfDoc.save()
            await writeFile(output, pdfBytes)
        } catch (error) {
            console.log("erro no createRequerimento "+error)
        }

    }
    
    async createTermoRepresentacao(input,output,x,data){
        
        try {
            let {fieldNames, pdfDoc} = await this.mapPDF(input);
            const form = pdfDoc.getForm()
            this.setFontSizeForAllFields(form,fieldNames,11)
            form.getTextField(fieldNames[6]).setText(data[x][0])//nome
            form.getTextField(fieldNames[0]).setText(data[x][4])//cpf
            form.getTextField(fieldNames[1]).setText(data[x][3])//rg
            form.getTextField(fieldNames[2]).setText(data[x][7])//rua
            form.getTextField(fieldNames[3]).setText(data[x][8])//numero
            form.getTextField(fieldNames[4]).setText(data[x][10])//cidade
            form.getTextField(fieldNames[5]).setText(data[x][12])//cep
            let pdfBytes = await pdfDoc.save()
            
            await writeFile(output, pdfBytes)
            
        } catch (error) {
            console.log("erro no createTermoRepresentacao "+error)
        }
    }
    
    async createProcuracao(input, output, x,data){
        try {
            let {fieldNames,pdfDoc} = await this.mapPDF(input);
            const form = pdfDoc.getForm();
            this.setFontSizeForAllFields(form,fieldNames,11)
            form.getTextField(fieldNames[0]).setText(data[x][0])//nome
            form.getTextField(fieldNames[1]).setText(data[x][4])//cpf
            form.getTextField(fieldNames[2]).setText(data[x][3])//rg
            form.getTextField(fieldNames[3]).setText(data[x][7])//rua
            form.getTextField(fieldNames[4]).setText(data[x][8])//numero
            form.getTextField(fieldNames[5]).setText(data[x][9])//bairro
            form.getTextField(fieldNames[6]).setText(data[x][10])//cidade
            form.getTextField(fieldNames[7]).setText(data[x][10])//cidade

            
            let pdfBytes = await pdfDoc.save()
            await writeFile(output, pdfBytes)

        } catch (error) {
            console.log("erro no createProcuração "+error)
        }
    }
    
    async createContrato(input,output,x,data){
        try {
            let {fieldNames,pdfDoc} = await this.mapPDF(input);
            const form = pdfDoc.getForm();
            this.setFontSizeForAllFields(form,fieldNames,11)
            form.getTextField(fieldNames[6]).setText(data[x][0])//nome
            form.getTextField(fieldNames[5]).setText(data[x][4])//cpf
            form.getTextField(fieldNames[4]).setText(data[x][3])//rg
            form.getTextField(fieldNames[3]).setText(data[x][7])//rua
            form.getTextField(fieldNames[2]).setText(data[x][8])//numero
            form.getTextField(fieldNames[1]).setText(data[x][9])//bairro
            form.getTextField(fieldNames[0]).setText(data[x][10])//municipio

            let pdfBytes = await pdfDoc.save()
            await writeFile(output, pdfBytes)
        }catch (error) {
            console.log("erro no createContrato "+error)
        }
    }

    async createDeclaracaoPescador(input,output,x,data){
        try {
            let {fieldNames,pdfDoc} = await this.mapPDF(input);
            const form = pdfDoc.getForm();
            this.setFontSizeForAllFields(form,fieldNames,11)
            form.getTextField(fieldNames[0]).setText(data[x][0])//nome
            form.getTextField(fieldNames[1]).setText(data[x][4])//cpf
            form.getTextField(fieldNames[2]).setText(data[x][3])//rg
            form.getTextField(fieldNames[3]).setText(data[x][7])//rua
            form.getTextField(fieldNames[4]).setText(data[x][8])//numero
            form.getTextField(fieldNames[5]).setText(data[x][9])//bairro
            form.getTextField(fieldNames[6]).setText(data[x][10])//cidade
            form.getTextField(fieldNames[7]).setText(data[x][10])//cidade

            let pdfBytes = await pdfDoc.save()
            await writeFile(output, pdfBytes)
        }catch (error) {
            console.log("erro no createDeclaracaoPescador "+error)
        }
    }

    async createDeclaracaoFiliacao(input,output,x,data){
        try {
            let {fieldNames,pdfDoc} = await this.mapPDF(input);
            const form = pdfDoc.getForm();
            this.setFontSizeForAllFields(form,fieldNames,11)
            form.getTextField(fieldNames[0]).setText(data[x][4])//cpf
            form.getTextField(fieldNames[1]).setText(data[x][0])//nome
            form.getTextField(fieldNames[2]).setText(data[x][3])//rg
            form.getTextField(fieldNames[3]).setText(data[x][8])//rua
            form.getTextField(fieldNames[4]).setText(data[x][9])//bairro
            form.getTextField(fieldNames[5]).setText(data[x][10])//cidade
            form.getTextField(fieldNames[6]).setText(data[x][11])//uf
            form.getTextField(fieldNames[7]).setText(data[x][7])//uf


            let pdfBytes = await pdfDoc.save()
            await writeFile(output, pdfBytes)
        }catch (error) {
            console.log("erro no createDeclaracaoFiliacao "+error)
        }
    }

    async createDeclaracaoResidencia(input,output,x,data){
        try {
            let {fieldNames,pdfDoc} = await this.mapPDF(input);
            const form = pdfDoc.getForm();
            this.setFontSizeForAllFields(form,fieldNames,11)
            form.getTextField(fieldNames[2]).setText(data[x][0])//nome
            form.getTextField(fieldNames[3]).setText(data[x][4])//cpf
            form.getTextField(fieldNames[4]).setText(data[x][3])//rg
            form.getTextField(fieldNames[5]).setText(data[x][7])//rua
            form.getTextField(fieldNames[6]).setText(data[x][8])//numero
            form.getTextField(fieldNames[0]).setText(data[x][9])//bairro
            form.getTextField(fieldNames[8]).setText(data[x][10])//municipio
            form.getTextField(fieldNames[7]).setText(data[x][12])//cep


            let pdfBytes = await pdfDoc.save()
            await writeFile(output, pdfBytes)
        }catch (error) {
            console.log("erro no createDeclaracaoResidência "+error)
        }
    }

}



export default PdfController;

