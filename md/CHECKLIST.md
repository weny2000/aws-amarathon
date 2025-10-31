# ✅ GitHub Pages 部署检查清单

## 🔍 问题诊断清单

请逐项检查以下内容：

### 📁 仓库基础设置
- [ ] 仓库是 **Public**（公开）状态
- [ ] 仓库名称不包含特殊字符
- [ ] 你是仓库的所有者或有管理员权限

### 📄 文件结构检查
- [ ] `index.html` 存在于根目录
- [ ] `script.js` 存在于根目录  
- [ ] `styles.css` 存在于根目录
- [ ] `data.json` 存在于根目录
- [ ] `.github/workflows/deploy.yml` 或 `static.yml` 存在
- [ ] 工作流文件内容完整且语法正确

### ⚙️ GitHub Pages 设置
- [ ] Settings → Pages → Source 设置为 "**GitHub Actions**"
- [ ] 不是设置为 "Deploy from a branch"
- [ ] Pages 设置已保存

### 🔐 权限设置
- [ ] Settings → Actions → General → Workflow permissions
- [ ] 选择了 "**Read and write permissions**"
- [ ] 勾选了 "**Allow GitHub Actions to create and approve pull requests**"
- [ ] 权限设置已保存

### 🚀 部署状态
- [ ] Actions 页面显示工作流已运行
- [ ] 最新的工作流运行状态是绿色 ✅
- [ ] 没有红色 ❌ 错误标记
- [ ] 部署作业（deploy job）成功完成

### 🌐 访问测试
- [ ] 网站地址格式正确：`https://USERNAME.github.io/REPOSITORY`
- [ ] 网站可以正常访问
- [ ] 页面内容显示正确
- [ ] 没有 404 错误

## 🛠️ 快速修复命令

如果上述检查发现问题，可以尝试以下命令：

### 重新提交触发部署
```bash
git add .
git commit -m "Fix Pages deployment"
git push origin main
```

### 强制重新部署
```bash
git commit --allow-empty -m "Force Pages redeploy"
git push origin main
```

### 检查远程仓库状态
```bash
git remote -v
git status
git log --oneline -5
```

## 🔧 常见问题快速解决

### ❌ 仍然显示 "Get Pages site failed"
1. 等待 5-10 分钟（首次配置需要时间）
2. 手动触发工作流：Actions → Run workflow
3. 检查是否有多个工作流文件冲突

### ❌ 404 页面错误
1. 确认 `index.html` 在根目录
2. 检查文件名大小写是否正确
3. 等待 DNS 传播（最多 10 分钟）

### ❌ 样式或脚本不加载
1. 检查文件路径是否使用相对路径
2. 确认所有资源文件都已上传
3. 检查浏览器控制台是否有错误

## 📊 验证部署成功

当所有检查项都通过时：

1. **Actions 页面**显示绿色成功状态
2. **Settings → Pages** 显示活跃的部署
3. **网站链接**可以正常访问
4. **页面功能**正常工作（年度切换、标签页等）

## 🆘 仍需帮助？

如果按照清单检查后仍有问题：

1. 查看 `TROUBLESHOOTING.md` 详细故障排除
2. 查看 `STEP_BY_STEP.md` 逐步操作指南
3. 检查 GitHub Actions 的详细错误日志
4. 考虑重新创建仓库并重新上传文件