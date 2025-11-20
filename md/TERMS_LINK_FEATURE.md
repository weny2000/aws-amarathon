# 活动条款链接功能说明

## 功能概述

在活动介绍（Introduction）部分添加了可选的活动条款链接功能。该链接不是必须的，只有在数据中配置了 `termsLink` 字段时才会显示。

## 使用方法

### 1. 在数据文件中添加条款链接

在 `data/YYYY.json` 文件的 `introduction` 对象中添加 `termsLink` 字段：

```json
{
  "introduction": {
    "title": "活动标题",
    "subtitle": "活动副标题",
    "subtitleEn": "Event subtitle in English",
    "theme": "活动主题",
    "themeDescription": "主题描述",
    "termsLink": "https://example.com/terms-and-conditions.pdf"
  }
}
```

### 2. 可选字段

`termsLink` 字段是**可选的**：
- 如果提供了链接，会在活动介绍卡片底部显示一个带样式的条款链接按钮
- 如果不提供或留空，则不会显示任何条款相关内容

### 3. 显示效果

当配置了 `termsLink` 后，会在活动介绍卡片底部显示：
- 一条分隔线
- 一个橙色边框的按钮，显示 "📄 活动条款 Terms and Conditions"
- 鼠标悬停时按钮会有动画效果（背景变橙色，轻微上移）
- 点击后在新标签页打开条款文档

## 示例

### 有条款链接的配置
```json
{
  "introduction": {
    "title": "\"Amarathon\" 是由亚马逊云科技 User Group 开发者中国社区发起的 12 小时线上玩法",
    "subtitle": "活动介绍...",
    "subtitleEn": "Event description...",
    "theme": "\"Innovation Unleashed\"",
    "themeDescription": "今年的活动主题为 \"Innovation Unleashed\"",
    "termsLink": "https://dev-media.amazoncloud.cn/terms-of-events/terms%20and%20conditions.pdf"
  }
}
```

### 无条款链接的配置
```json
{
  "introduction": {
    "title": "\"Amarathon\" 是由亚马逊云科技 User Group 开发者中国社区发起的 12 小时线上玩法",
    "subtitle": "活动介绍...",
    "subtitleEn": "Event description...",
    "theme": "\"Innovation Unleashed\"",
    "themeDescription": "今年的活动主题为 \"Innovation Unleashed\""
  }
}
```

## 技术实现

### 修改的文件

1. **script.js** - `renderIntroduction()` 函数
   - 添加了条件渲染逻辑，只在 `introduction.termsLink` 存在时显示链接

2. **styles.css** - 新增样式
   - `.intro-terms` - 条款链接容器样式
   - `.intro-terms .terms-link` - 链接按钮样式
   - `.intro-terms .terms-link:hover` - 悬停效果

3. **data/template.json** - 模板更新
   - 在 `introduction` 对象中添加了 `termsLink` 字段示例

## 注意事项

- 链接会在新标签页打开（`target="_blank"`）
- 使用了 `rel="noopener noreferrer"` 确保安全性
- 样式与网站整体设计保持一致（使用 AWS 橙色主题）
- 响应式设计，在移动设备上也能正常显示
