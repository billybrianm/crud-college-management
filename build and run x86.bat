@echo off
dotnet build TechnicalTestMagniFinance
dotnet test
cd \Program Files\IIS Express
iisexpress /path:%~dp0TechnicalTestMagniFinance
pause >nul