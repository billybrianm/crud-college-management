@echo off
nuget.exe update -self
nuget.exe restore TechnicalTestMagniFinance.sln
cd \Program Files\dotnet\
dotnet.exe build %~dp0TechnicalTestMagniFinance
dotnet.exe test %~dp0TechnicalTestMagniFinance
cd \Program Files\IIS Express
iisexpress /path:"%~dp0TechnicalTestMagniFinance
pause >nul