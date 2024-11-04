@echo off
:: Exibe o diretório atual para verificação
echo Diretório atual: %cd%

:: Executa o comando npm install
echo Instalando dependências do projeto...
call npm install

:: Verifica se a instalação foi bem-sucedida
if %errorlevel% neq 0 (
    echo "Erro ao instalar as dependências. Verifique se o npm está instalado corretamente."
) else (
    echo "As dependências foram instaladas com sucesso!"
)

:: Aguarda que o usuário pressione uma tecla antes de fechar
echo Pressione qualquer tecla para sair...
pause >nul
