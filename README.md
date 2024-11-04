# Documentação do Sistema de Geração de PDFs a Partir de Dados CSV

## Sumário
1. [Descrição Geral](#descrição-geral)
2. [Instalação e Configuração](#instalação-e-configuração)
3. [Estrutura de Diretórios](#estrutura-de-diretórios)
4. [Configuração de Ambiente](#configuração-de-ambiente)
5. [Componentes do Sistema](#componentes-do-sistema)
   - [CSVDownloader](#csvdownloader)
   - [PdfController](#pdfcontroller)
   - [Tools](#tools)
6. [Detalhes de Implementação](#detalhes-de-implementação)
   - [Fluxo Principal](#fluxo-principal)
   - [Estrutura de Arquivos Gerados](#estrutura-de-arquivos-gerados)
7. [Exclusão de Arquivos Sensíveis](#exclusão-de-arquivos-sensíveis)
8. [Instalação pelo Usuário Final](#instalação-pelo-usuário-final)
9. [Logs e Tratamento de Erros](#logs-e-tratamento-de-erros)



## Descrição Geral
Este programa realiza o download de dados em formato CSV a partir de uma URL, armazena o arquivo localmente, e, em seguida, gera múltiplos documentos PDF personalizados utilizando modelos pré-definidos. Cada PDF contém informações extraídas de uma linha do arquivo CSV e é organizado em uma estrutura de pastas baseada em cada indivíduo representado nos dados.


## Instalação e Configuração
Para rodar este sistema, é necessário possuir o Node.js (versão 20.13.1) instalado. Além disso, algumas dependências externas são utilizadas, como `pdf-lib`, para manipulação dos PDFs.

### Passos de Instalação:
1. Clone o repositório do projeto.
2. No diretório raiz, execute `npm install` para instalar as dependências.
3. Crie um arquivo `.env` com as configurações de ambiente necessárias (veja a seção [Configuração de Ambiente](#configuração-de-ambiente)).

## Estrutura de Diretórios
A estrutura de diretórios do projeto é a seguinte:

```bash
src/
├── csv/
│   └── dados.csv            # Arquivo CSV baixado
├── pdfs/                    # Modelos de PDF omitidos do repositório Git
├── result/                  # Pasta onde os PDFs gerados são salvos
├── pdfController.js         # Controlador de manipulação de PDFs
├── tools.js                 # Ferramentas utilitárias para manipulação de arquivos
├── connect.js               # Conector para realizar o download do CSV
```
Nota: A pasta src/pdfs/ contém modelos de PDF que são propriedade da instituição contratante, por isso, os arquivos não estão incluídos no repositório.


## Configuração de Ambiente 
O sistema utiliza variáveis de ambiente configuradas no arquivo `.env`. Abaixo, a lista das variáveis utilizadas: 
- **URL**: URL do arquivo CSV para download.

- Exemplo de arquivo `.env`: 
```plaintext 
URL=https://example.com/path/to/dados.csv
```


## Componentes do Sistema

### CSVDownloader
Classe responsável por baixar o arquivo CSV a partir de uma URL e salvá-lo localmente.

- **Método `downloadCSV()`**: 
  Realiza o download do CSV e salva no caminho especificado.

- **Método `fetchCSVData()`**: 
  Realiza a requisição à URL e retorna o conteúdo do CSV.

- **Método `saveToFile(data)`**: 
  Salva os dados no caminho configurado.


### PdfController
Controlador que manipula os PDFs com base nos modelos fornecidos.

- **Método `mapPDF(input)`**: 
  Carrega e mapeia os campos de um PDF.

- **Métodos de geração**: 
  - `createRequerimento`
  - `createTermoRepresentacao`
  - etc.
  
  Gera PDFs personalizados com dados fornecidos, ajustando os campos conforme o modelo.


### Tools
Classe utilitária para operações no sistema de arquivos.

- **Método `haveFolder(baseDir, folderPath)`**: 
  Verifica se uma pasta existe.

- **Método `criarPasta(baseDir, folderName)`**: 
  Cria uma pasta com o nome especificado.

- **Método `readCSV(filePath)`**: 
  Lê o conteúdo do arquivo CSV.

- **Método `limparPasta(dirPath)`**: 
  Limpa o conteúdo do diretório especificado.


## Detalhes de Implementação

### Fluxo Principal

1. **Download do CSV**: 
   O `CSVDownloader` faz o download e salva o arquivo CSV em `src/csv/dados.csv`.

2. **Leitura e Processamento**: 
   A classe `Condition` lê o arquivo CSV, cria pastas específicas para cada linha de dados e gera PDFs personalizados usando o `PdfController`.

3. **Criação dos PDFs**: 
   Para cada registro no CSV, são criados múltiplos documentos PDF, com dados específicos preenchidos nos modelos.


### Estrutura de Arquivos Gerados

Para cada indivíduo no arquivo CSV, o sistema cria uma estrutura de pastas em `result/` onde salva:

- `requerimento - <nome>.pdf`
- `termo representação - <nome>.pdf`
- `procuracao - <nome>.pdf`
- `contrato honorários - <nome>.pdf`
- `declaracao atv. pesqueira - <nome>.pdf`
- `declaracao de filiação - <nome>.pdf`
- `declaracao de residencia - <nome>.pdf`


## Exclusão de Arquivos Sensíveis

Os modelos de PDF localizados na pasta `./src/pdfs` são propriedade da instituição contratante e foram omitidos do controle de versão (`.gitignore`).

Para incluir novos modelos ou modificar os existentes, coloque os arquivos PDF na pasta `src/pdfs/` conforme a estrutura esperada pelos métodos da classe `PdfController`.


## Instalação pelo Usuário Final

Uma vez com a pasta do programa no seu PC, siga os passos abaixo:

1. Execute como administrador o arquivo `instalador.bat`, que está localizado na pasta `instalador`.
2. Em seguida, execute o arquivo `dependencies.bat` como usuário comum para instalar as dependências.

Com tudo instalado, basta adicionar as informações da pessoa que terá os formulários preenchidos e executar o arquivo `rodar.bat`. Os PDFs preenchidos serão gerados e salvos, separados por pessoa, na pasta `result`.


## Logs e Tratamento de Erros

- **Download do CSV**: 
  Logs são gerados para indicar o status da resposta e o tipo de conteúdo retornado.

- **Criação de PDFs**: 
  Cada método de geração de PDF possui tratamento de erros e loga mensagens caso ocorra algum problema, facilitando a depuração.

