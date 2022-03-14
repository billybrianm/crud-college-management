@echo off
dotnet build TechnicalTestMagniFinance
dotnet test
cd \Program Files (x86)\IIS Express
iisexpress /path:%~dp0TechnicalTestMagniFinance
pause >nul