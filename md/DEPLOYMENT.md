# 🚀 GitHub Pages 部署指南

## 步骤 1: 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 仓库名称建议使用: `amarathon` 或 `aws-amarathon`
4. 设置为 Public（GitHub Pages 免费版需要公开仓库）
5. 勾选 "Add a README file"
6. 点击 "Create repository"

## 步骤 2: 上传代码

### 方法 A: 使用 Git 命令行

```bash
# 1. 克隆你的空仓库
git clone https://github.com/YOUR_USERNAME/amarathon.git
cd amarathon

# 2. 复制所有项目文件到这个目录

# 3. 添加文件到 Git
git add .
git commit -m "Initial commit: Amarathon SPA website"

# 4. 推送到 GitHub
git push origin main
```

### 方法 B: 使用 GitHub 网页界面

1. 在 GitHub 仓库页面点击 "uploading an existing file"
2. 拖拽所有项目文件到页面
3. 填写提交信息: "Initial commit: Amarathon SPA website"
4. 点击 "Commit changes"

## 步骤 3: 启用 GitHub Pages

1. 在 GitHub 仓库页面，点击 "Settings" 标签
2. 在左侧菜单中找到 "Pages"
3. 在 "Source" 部分选择 "GitHub Actions"
4. 系统会自动检测到 `.github/workflows/deploy.yml` 文件

## 步骤 4: 等待部署完成

1. 回到仓库主页，点击 "Actions" 标签
2. 你会看到一个正在运行的工作流
3. 等待工作流完成（通常需要 1-3 分钟）
4. 部署完成后，你的网站将在以下地址可用：
   ```
   https://YOUR_USERNAME.github.io/amarathon
   ```

## 🔧 自定义配置

### 自定义域名（可选）

如果你有自己的域名：

1. 编辑 `CNAME` 文件，取消注释并修改为你的域名
2. 在你的域名提供商处添加 CNAME 记录指向 `YOUR_USERNAME.github.io`

### 更新网站内容

要更新网站内容：

1. 修改 `data.json` 文件添加新的年度数据
2. 提交并推送更改：
   ```bash
   git add data.json
   git commit -m "Update 2025 data"
   git push origin main
   ```
3. GitHub Actions 会自动重新部署网站

## 📊 监控部署状态

- **Actions 页面**: 查看部署历史和状态
- **Settings > Pages**: 查看当前部署状态和访问地址
- **Insights > Traffic**: 查看网站访问统计

## 🐛 常见问题

### 问题 1: 部署失败
- 检查 Actions 页面的错误日志
- 确保所有文件都已正确上传
- 检查 JSON 文件语法是否正确

### 问题 2: 网站无法访问
- 等待 5-10 分钟，DNS 传播需要时间
- 检查 GitHub Pages 设置是否正确
- 确保仓库是公开的

### 问题 3: 样式或脚本不加载
- 检查文件路径是否正确
- 确保所有文件都在仓库根目录

## 🎉 完成！

现在你的 Amarathon 网站已经成功部署到 GitHub Pages！

访问地址: `https://YOUR_USERNAME.github.io/amarathon`