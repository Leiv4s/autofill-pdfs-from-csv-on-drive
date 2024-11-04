@echo off
:: Verifica se o script está sendo executado como administrador
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo "Este script precisa ser executado como administrador."
    pause
    exit /b
)

:: Define a URL do instalador do Node.js
set NODE_JS_URL=https://nodejs.org/dist/v18.17.1/node-v18.17.1-x64.msi

:: Define o caminho para salvar o instalador
set NODE_JS_INSTALLER=%TEMP%\nodejs.msi

:: Faz o download do instalador
echo Baixando o Node.js...
powershell -Command "Invoke-WebRequest -Uri %NODE_JS_URL% -OutFile %NODE_JS_INSTALLER%"

:: Instala o Node.js
echo Instalando o Node.js...
msiexec /i %NODE_JS_INSTALLER% /quiet /norestart

:: Limpa o instalador após a instalação
del %NODE_JS_INSTALLER%

echo Node.js foi instalado com sucesso!

:: Navega para o diretório pai e executa npm install
cd ..
echo Instalando dependências do projeto...
start /wait npm install

:: Aguarda que o usuário pressione uma tecla antes de fechar
echo Pressione qualquer tecla para sair...
pause >nul
