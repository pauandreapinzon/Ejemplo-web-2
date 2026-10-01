@echo off
REM Vista previa local del sitio de Paula Pinzon
REM Requiere Node.js instalado (https://nodejs.org)
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js no esta instalado. Descargalo de https://nodejs.org e intenta de nuevo.
  pause
  exit /b 1
)
echo Instalando dependencias (solo la primera vez puede tardar)...
call npm install --no-audit --no-fund
echo Iniciando servidor local en http://localhost:8080 ...
start "" http://localhost:8080
call npm run dev
