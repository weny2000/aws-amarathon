@echo off
chcp 65001 >nul
echo 🚀 开始部署 Amarathon 到 GitHub Pages...

REM 检查是否在 Git 仓库中
if not exist ".git" (
    echo ❌ 错误: 当前目录不是 Git 仓库
    echo 请先运行: git init ^&^& git remote add origin YOUR_REPO_URL
    pause
    exit /b 1
)

REM 检查必要文件是否存在
set "files=index.html script.js styles.css data.json"
for %%f in (%files%) do (
    if not exist "%%f" (
        echo ❌ 错误: 缺少必要文件 %%f
        pause
        exit /b 1
    )
)

echo ✅ 文件检查通过

REM 添加所有文件
echo 📁 添加文件到 Git...
git add .

REM 提交更改
echo 💾 提交更改...
for /f "tokens=1-4 delims=/ " %%i in ('date /t') do set mydate=%%k-%%j-%%i
for /f "tokens=1-2 delims=: " %%i in ('time /t') do set mytime=%%i:%%j
git commit -m "Deploy: %mydate% %mytime%"

REM 推送到 GitHub
echo 🌐 推送到 GitHub...
git push origin main

echo ✅ 部署完成！
echo 🌍 网站将在几分钟后可用
echo 📊 请访问 GitHub 仓库的 Actions 页面查看部署状态
pause