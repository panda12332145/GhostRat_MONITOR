@echo off
REM ========================================
REM GhostRat Monitor - Development Server
REM Inicia o backend e frontend simultaneamente
REM ========================================

setlocal enabledelayedexpansion
cls

echo.
echo ============================================================
echo GhostRat Monitor - Development Server Launcher
echo ============================================================
echo.

REM Verificar se estamos no diretório correto
if not exist "package.json" (
    echo [ERRO] package.json nao encontrado!
    echo Por favor, execute este arquivo a partir da raiz do projeto.
    pause
    exit /b 1
)

REM Verificar se node_modules existe, caso contrario instalar
if not exist "node_modules" (
    echo [INFO] Instalando dependencias...
    call npm install
    if errorlevel 1 (
        echo [ERRO] Falha ao instalar dependencias
        pause
        exit /b 1
    )
    echo [OK] Dependencias instaladas
    echo.
)

echo [INFO] Iniciando servidores...
echo.

REM Criar um arquivo batch temporário para iniciar ambos os processos
set temp_batch=%temp%\ghostrat_temp.bat
(
    echo @echo off
    echo title GhostRat Monitor - Backend
    echo color 0B
    echo echo.
    echo echo ============================================================
    echo echo Backend ^(Express^) - Porta 3001
    echo echo ============================================================
    echo echo.
    echo node server.js
    echo if errorlevel 1 ^(
    echo   echo [ERRO] Falha ao iniciar backend
    echo   pause
    echo ^)
) > "%temp_batch%"

REM Iniciar backend em uma nova janela
start "GhostRat Backend (3001)" /D "%cd%" "%temp_batch%"

REM Aguardar um pouco para o backend iniciar
timeout /t 2 /nobreak >nul

REM Iniciar frontend
echo [OK] Backend iniciado
echo [INFO] Iniciando frontend (Vite)...
echo.

REM Criar outro batch para frontend
set temp_batch2=%temp%\ghostrat_frontend.bat
(
    echo @echo off
    echo title GhostRat Monitor - Frontend
    echo color 0A
    echo echo.
    echo echo ============================================================
    echo echo Frontend ^(Vite^) - Porta 5173
    echo echo ============================================================
    echo echo.
    echo npm run dev
    echo if errorlevel 1 ^(
    echo   echo [ERRO] Falha ao iniciar frontend
    echo   pause
    echo ^)
) > "%temp_batch2%"

start "GhostRat Frontend (5173)" /D "%cd%" "%temp_batch2%"

echo.
echo ============================================================
echo [OK] Servidores iniciados com sucesso!
echo ============================================================
echo.
echo Endpoints disponiveis:
echo   - Frontend:  http://localhost:5173
echo   - Backend:   http://localhost:3001
echo   - API:       http://localhost:3001/api
echo.
echo Voce pode fechar esta janela. Os servidores continuarao rodando.
echo Para parar, feche as janelas de backend e frontend.
echo.
pause

REM Limpar arquivos temporários
del /q "%temp%\ghostrat_temp.bat" 2>nul
del /q "%temp%\ghostrat_frontend.bat" 2>nul

endlocal
