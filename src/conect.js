import fs from 'fs';

class CSVDownloader {
    constructor(url, outputFilePath) {
        this.url = url;
        this.outputFilePath = outputFilePath;
    }

    async downloadCSV() {
        try {
            const csvData = await this.fetchCSVData();
            if (!csvData) {
                console.error("Nenhum dado foi recebido da URL.");
                return;
            }

            this.saveToFile(csvData);
            console.log(`Arquivo CSV salvo com sucesso em: ${this.outputFilePath}`);
        } catch (error) {
            console.error('Erro ao baixar o CSV:', error);
        }
    }

    async fetchCSVData() {
        const response = await fetch(this.url);

        // Log do status e tipo de conteúdo da resposta
        console.log(`Status da resposta: ${response.status}`);
        console.log(`Tipo de conteúdo: ${response.headers.get('content-type')}`);

        if (!response.ok) {
            throw new Error(`Erro ao buscar o CSV: ${response.statusText}`);
        }

        return await response.text();
    }

    saveToFile(data) {
        fs.writeFileSync(this.outputFilePath, data);
    }
}

export default CSVDownloader
