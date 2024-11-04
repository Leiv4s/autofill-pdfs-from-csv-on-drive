@echo off
:: Definir o caminho do arquivo app.js
set "APP_PATH=%~dp0src\app.js"

:: Verificar se o arquivo app.js existe
if exist "%APP_PATH%" (
    echo Iniciando o app.js...
    node "%APP_PATH%"
    
    :: Verificar se o node retornou um código de sucesso
    if %ERRORLEVEL% == 0 (
        echo AUTOMACAO FINALIZADA COM SUCESSO!

    ) else (
        echo Ocorreu um erro ao executar o app.js.
    )
) else (
    echo O arquivo app.js nao foi encontrado em %APP_PATH%.
)

pause
