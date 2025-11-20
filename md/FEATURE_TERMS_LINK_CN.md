# 活动条款链接功能 - 快速指南

## 功能说明
在活动介绍部分添加可选的活动条款链接。

## 使用方法

在 `data/YYYY.json` 的 `introduction` 对象中添加 `termsLink` 字段：

```json
{
  "introduction": {
    "title": "活动标题",
    "subtitle": "活动副标题",
    "subtitleEn": "Event subtitle",
    "theme": "活动主题",
    "themeDescription": "主题描述",
    "termsLink": "https://example.com/terms.pdf"
  }
}
```

## 特点
- **可选字段**：不填写则不显示
- **显示位置**：活动介绍卡片底部
- **样式**：渐变紫粉色按钮（与页面整体风格一致），悬停有动画效果
- **行为**：新标签页打开链接
- **智能隐藏**：没有内容的区域（直播安排、合作伙伴）会自动隐藏

## 示例

### 有条款链接
```json
"termsLink": "https://dev-media.amazoncloud.cn/terms.pdf"
```

### 无条款链接（两种方式）
```json
"termsLink": ""
```
或直接不添加该字段。
