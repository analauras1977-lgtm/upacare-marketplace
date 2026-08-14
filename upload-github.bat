@echo off
REM UpaCare Marketplace - Upload a GitHub (Windows)
REM Haz doble click en este archivo para subir TODO a GitHub

setlocal enabledelayexpansion

set TOKEN=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
set REPO_URL=https://analauras1977:!TOKEN!@github.com/analauras1977/upacare-marketplace.git

echo.
echo ========================================
echo   UpaCare - Upload a GitHub
echo ========================================
echo.

git config --global user.name "UpaCare"
git config --global user.email "info@upaentertainment.com"

git init
git add .
git commit -m "UpaCare Marketplace v1.0 - Production Ready"
git branch -M main
git remote add origin %REPO_URL%
git push -u origin main

echo.
echo ========================================
echo   ✅ LISTO! Codigo en GitHub
echo   📍 https://github.com/analauras1977/upacare-marketplace
echo ========================================
echo.

pause
