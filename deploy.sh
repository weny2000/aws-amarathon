#!/bin/bash

# Amarathon GitHub Pages 部署脚本

echo "🚀 开始部署 Amarathon 到 GitHub Pages..."

# 检查是否在 Git 仓库中
if [ ! -d ".git" ]; then
    echo "❌ 错误: 当前目录不是 Git 仓库"
    echo "请先运行: git init && git remote add origin YOUR_REPO_URL"
    exit 1
fi

# 检查必要文件是否存在
required_files=("index.html" "script.js" "styles.css" "data.json")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ 错误: 缺少必要文件 $file"
        exit 1
    fi
done

echo "✅ 文件检查通过"

# 检查 JSON 语法
echo "🔍 检查 JSON 语法..."
if command -v python3 &> /dev/null; then
    python3 -m json.tool data.json > /dev/null
    if [ $? -eq 0 ]; then
        echo "✅ JSON 语法正确"
    else
        echo "❌ 错误: data.json 语法错误"
        exit 1
    fi
fi

# 添加所有文件
echo "📁 添加文件到 Git..."
git add .

# 提交更改
echo "💾 提交更改..."
commit_message="Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$commit_message"

# 推送到 GitHub
echo "🌐 推送到 GitHub..."
git push origin main

echo "✅ 部署完成！"
echo "🌍 网站将在几分钟后在以下地址可用:"
echo "   https://$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\)\/\([^.]*\).*/\1.github.io\/\2/')"
echo ""
echo "📊 查看部署状态: https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\)\/\([^.]*\).*/\1\/\2/')/actions"