# ⚡ 快速开始指南

## 🎯 5分钟部署到 GitHub Pages

### 第一步：准备 GitHub 仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角 "+" → "New repository"
3. 仓库名称：`amarathon`
4. 设置为 **Public**
5. 点击 "Create repository"

### 第二步：上传代码

**选项 A：使用 Git 命令行**
```bash
git clone https://github.com/YOUR_USERNAME/amarathon.git
cd amarathon
# 复制所有项目文件到此目录
git add .
git commit -m "Initial commit"
git push origin main
```

**选项 B：直接上传文件**
1. 在 GitHub 仓库页面点击 "uploading an existing file"
2. 拖拽以下文件：
   - `index.html`
   - `script.js`
   - `styles.css`
   - `data.json`
   - `.github/workflows/deploy.yml`
   - `README.md`
3. 提交更改

### 第三步：启用 GitHub Pages

1. 仓库页面 → "**Settings**" → "**Pages**"
2. 在 **Source** 部分：
   - ❌ 不要选择 "Deploy from a branch"
   - ✅ 选择 "**GitHub Actions**"
3. 点击 "**Save**"

### 第三步补充：检查权限设置

1. Settings → "**Actions**" → "**General**"
2. 在 **Workflow permissions** 部分：
   - ✅ 选择 "Read and write permissions"
   - ✅ 勾选 "Allow GitHub Actions to create and approve pull requests"
3. 点击 "**Save**"

### 第四步：访问网站

🎉 完成！访问：`https://YOUR_USERNAME.github.io/amarathon`

---

## 📝 更新内容

要添加新年度数据或修改现有内容：

1. 编辑 `data.json` 文件
2. 提交更改到 GitHub
3. 网站会自动重新部署

## 🛠️ 本地开发

```bash
# 启动本地服务器
python -m http.server 8000
# 访问 http://localhost:8000
```

## 📞 需要帮助？

- 查看完整部署指南：`DEPLOYMENT.md`
- 检查 GitHub Actions 页面的部署状态
- 确保所有文件都已上传到仓库根目录