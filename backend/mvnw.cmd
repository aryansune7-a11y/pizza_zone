@REM ----------------------------------------------------------------------------
@REM Portable Maven Runner for Windows
@REM ----------------------------------------------------------------------------

@setlocal
@set BASE_DIR=%~dp0
@set MAVEN_DIR=%BASE_DIR%\.mvn\wrapper\apache-maven-3.9.9
@set MAVEN_EXE=%MAVEN_DIR%\bin\mvn.cmd

@IF EXIST "%MAVEN_EXE%" GOTO run

@echo Downloading & Unpacking Portable Apache Maven 3.9.9...
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; $zip = '%BASE_DIR%\.mvn\wrapper\mvn.zip'; $out = '%BASE_DIR%\.mvn\wrapper'; (New-Object Net.WebClient).DownloadFile('https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.9/apache-maven-3.9.9-bin.zip', $zip); Expand-Archive -Path $zip -DestinationPath $out -Force; Remove-Item $zip"

:run
"%MAVEN_EXE%" %*
