# Amarathon - AWS 技术马拉松

一个基于SPA架构的静态网站，展示AWS技术马拉松活动信息。

## 🌟 特性

- 📱 响应式设计，支持各种设备
- 🔄 SPA单页应用架构
- 📊 数据驱动，通过JSON文件管理内容
- 🎨 现代化UI设计
- 🚀 快速加载和平滑动画
- 📖 支持多年度数据展示

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, Vanilla JavaScript
- **架构**: SPA (Single Page Application)
- **数据**: JSON
- **部署**: GitHub Pages

## 📁 项目结构

```
├── index.html          # 主页面
├── script.js           # JavaScript逻辑
├── styles.css          # 样式文件
├── data.json           # 数据文件
└── README.md           # 项目说明
```

## 🚀 本地开发

1. 克隆项目
```bash
git clone https://github.com/YOUR_USERNAME/amarathon.git
cd amarathon
```

2. 启动本地服务器
```bash
# 使用Python
python -m http.server 8000

# 或使用Node.js
npx serve .

# 或使用PHP
php -S localhost:8000
```

3. 访问 `http://localhost:8000`

## 📝 数据更新

要更新活动数据，只需编辑 `data.json` 文件：

```json
{
  "2024": {
    "banner": { ... },
    "introduction": { ... },
    "announcement": { ... },
    ...
  }
}
```

## 🌐 在线访问

网站已部署到 GitHub Pages: [https://YOUR_USERNAME.github.io/amarathon](https://YOUR_USERNAME.github.io/amarathon)

## 📄 许可证

© 2025 Amazon Web Services, Inc. or its affiliates. All rights reserved.