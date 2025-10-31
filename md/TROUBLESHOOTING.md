# 🔧 GitHub Pages 部署故障排除

## ❌ 错误：Get Pages site failed

### 问题描述
```
Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions
```

### 🛠️ 解决步骤

#### 步骤 1：检查仓库设置
1. 确保仓库是 **Public**（免费版GitHub Pages要求）
2. 如果是私有仓库，需要GitHub Pro账户

#### 步骤 2：正确启用 GitHub Pages
1. 进入仓库页面
2. 点击 **Settings** 标签
3. 在左侧菜单找到 **Pages**
4. 在 **Source** 部分：
   - ❌ 不要选择 "Deploy from a branch"
   - ✅ 选择 **"GitHub Actions"**
5. 点击 **Save**

#### 步骤 3：检查权限设置
1. 在仓库 Settings → Actions → General
2. 确保 **Workflow permissions** 设置为：
   - ✅ "Read and write permissions"
   - ✅ 勾选 "Allow GitHub Actions to create and approve pull requests"

#### 步骤 4：手动触发部署
1. 进入 **Actions** 标签
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击 **"Run workflow"** 按钮
4. 选择 main 分支
5. 点击 **"Run workflow"**

### 🔄 完整重新配置步骤

如果上述步骤不起作用，请按以下顺序重新配置：

#### 1. 重置 Pages 设置
```
Settings → Pages → Source → None → Save
等待 30 秒
Settings → Pages → Source → GitHub Actions → Save
```

#### 2. 检查文件结构
确保仓库根目录包含：
```
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html
├── script.js
├── styles.css
├── data.json
└── README.md
```

#### 3. 验证工作流文件
检查 `.github/workflows/deploy.yml` 文件是否存在且内容正确。

#### 4. 强制重新部署
```bash
# 创建一个空提交来触发部署
git commit --allow-empty -m "Trigger Pages deployment"
git push origin main
```

### 🚨 常见问题

#### 问题 1：仓库是私有的
**解决方案**：将仓库设置为公开，或升级到 GitHub Pro

#### 问题 2：分支名称不匹配
**解决方案**：确保推送到 `main` 分支，或修改工作流文件中的分支名称

#### 问题 3：权限不足
**解决方案**：
1. Settings → Actions → General
2. Workflow permissions → "Read and write permissions"
3. 勾选 "Allow GitHub Actions to create and approve pull requests"

#### 问题 4：工作流文件路径错误
**解决方案**：确保文件路径为 `.github/workflows/deploy.yml`

### 📞 仍然有问题？

1. **检查 Actions 日志**：
   - Actions 标签 → 选择失败的工作流 → 查看详细错误信息

2. **等待时间**：
   - 首次启用 Pages 可能需要 5-10 分钟生效

3. **清除缓存**：
   - 浏览器强制刷新（Ctrl+F5 或 Cmd+Shift+R）

4. **联系支持**：
   - 如果问题持续，可以联系 GitHub Support

### ✅ 成功标志

当配置正确时，你应该看到：
- Actions 页面显示绿色的 ✅ 成功标记
- Settings → Pages 显示绿色的部署状态
- 网站在 `https://USERNAME.github.io/REPOSITORY` 可访问