# 活动条款Tab功能说明

## 功能概述

为2025年添加了专门的"活动条款"Tab，用于在网页中直接显示活动条款PDF文档。

## 使用方法

### 1. 在数据文件中配置PDF链接

在 `data/2025.json` 中添加 `termsPdfUrl` 字段：

```json
{
  "termsPdfUrl": "assert/2025/amarathon%20terms%20and%20conditions%202025%20v3.pdf"
}
```

### 2. Tab显示规则

- **2025年**：自动显示"活动条款"Tab，隐藏"Amarathon组委会"Tab
- **其他年份**：显示"Amarathon组委会"Tab，隐藏"活动条款"Tab

## 功能特性

### PDF查看器
- 使用iframe嵌入PDF文档，支持在线预览
- 高度设置为800px（桌面端）/ 600px（移动端）
- 自动适应容器宽度

### 工具栏
- 渐变紫粉色背景（与网站整体风格一致）
- 提供"下载PDF"按钮，可在新标签页打开PDF
- 按钮带悬停动画效果

### 降级方案
- 如果浏览器无法显示PDF，底部会显示下载链接
- 提供中英文双语提示

## 显示效果

```
┌─────────────────────────────────────────┐
│  活动条款 Terms and Conditions          │
├─────────────────────────────────────────┤
│  [工具栏]              📥 下载PDF       │
├─────────────────────────────────────────┤
│                                         │
│         [PDF文档显示区域]               │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│  如果PDF无法显示，请点击这里下载         │
│  If the PDF cannot be displayed...      │
└─────────────────────────────────────────┘
```

## 技术实现

### HTML结构
- 新增 `termsTab` 内容区域
- 新增"活动条款"Tab按钮（默认隐藏）

### JavaScript
- `renderTerms(termsPdfUrl)` - 渲染PDF查看器
- `updateTabVisibility(year)` - 根据年份控制Tab显示

### CSS样式
- `.terms-pdf-container` - PDF容器
- `.terms-toolbar` - 工具栏样式
- `.terms-pdf-viewer` - iframe查看器
- `.terms-fallback` - 降级提示

## 数据配置示例

```json
{
  "banner": { ... },
  "introduction": { ... },
  "termsPdfUrl": "assert/2025/amarathon%20terms%20and%20conditions%202025%20v3.pdf",
  "announcement": { ... }
}
```

## 注意事项

1. PDF文件路径需要正确，建议使用相对路径
2. 如果PDF文件名包含空格，需要使用URL编码（%20）
3. 某些浏览器可能不支持iframe显示PDF，会自动显示下载链接
4. PDF文件应放在网站可访问的目录下
5. 建议PDF文件大小不要太大，以免影响加载速度
