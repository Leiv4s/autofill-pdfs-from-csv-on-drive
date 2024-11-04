import {readFile, writeFile,readdir, stat,mkdir,rm} from "fs/promises"
import {join,resolve} from "path";


class Tools {

    constructor(){}

        

    async  readCSV(filePath){
        try {
            const data = await readFile(filePath, 'utf-8');
            const rows = data.split('\n');
            const array = rows.map(row => row.split(','));
            return array;
        } catch (error) {
            console.error('Erro ao ler o arquivo CSV:', error);
        }
    }

    async haveFolder(directoryPath, folderName){
        try {
            const filesAndFolders = await readdir(directoryPath);
            
            for (const item of filesAndFolders) {
                const itemPath = join(directoryPath, item);
                const stats = await stat(itemPath);
                
                if (stats.isDirectory() && item === folderName) {
                    return true;
                }
            }
            
            return false;
        } catch (error) {
            console.error('Erro ao verificar o diretório:', error);
            return false;
        }

    }


    async criarPasta(diretorio, nomePasta) {
        try {
            const caminhoCompleto = `${diretorio}/${nomePasta}`;
            await mkdir(caminhoCompleto, { recursive: true });
            console.log(`Pasta criada com sucesso em: ${caminhoCompleto}`);
        } catch (error) {
            console.error('Erro ao criar a pasta:', error);
        }
    }


    async limparPasta(directoryName) {
        const pastaProjeto = resolve(process.cwd()); // Obtém o diretório atual do projeto
        const targetFolder = join(pastaProjeto, directoryName); // Cria o caminho da pasta informada

        try {
            // Verifica se a pasta existe
            const files = await readdir(targetFolder);
            // Remove todos os arquivos e subpastas
            for (const file of files) {
                const filePath = join(targetFolder, file);
                const stats = await stat(filePath);
                if (stats.isDirectory()) {
                    await rm(filePath, { recursive: true }); // Altere para rm
                } else {
                    await unlink(filePath); // Remove o arquivo
                }
            }
            console.log(`Todos os arquivos em '${targetFolder}' foram removidos com sucesso!`);
        } catch (error) {
            console.error(`Erro ao limpar a pasta '${directoryName}':`, error);
        }
    }
    

}

export default Tools
