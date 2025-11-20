# 活动介绍图片功能说明

## 功能概述

在活动介绍（Introduction）部分添加了图片显示功能，可以在说明文字之后展示一张或多张活动相关图片。

## 使用方法

### 1. 数据配置

在 `data/YYYY.json` 的 `introduction` 对象中添加 `images` 字段：

#### 方式1: 简单字符串数组
```json
{
  "introduction": {
    "title": "活动标题",
    "subtitle": "活动副标题",
    "subtitleEn": "Event subtitle",
    "theme": "活动主题",
    "themeDescription": "主题描述",
    "images": [
      "images/2025/partner1.jpg",
      "images/2025/partner2.jpg",
      "images/2025/qrcode.jpg"
    ]
  }
}
```

#### 方式2: 对象数组（支持alt文本）
```json
{
  "introduction": {
    "title": "活动标题",
    "subtitle": "活动副标题",
    "subtitleEn": "Event subtitle",
    "theme": "活动主题",
    "themeDescription": "主题描述",
    "images": [
      {
        "url": "images/2025/partner1.jpg",
        "alt": "合作伙伴Logo"
      },
      {
        "image": "images/2025/partner2.jpg",
        "caption": "赞助商"
      },
      {
        "url": "images/2025/qrcode.jpg",
        "alt": "报名二维码"
      }
    ]
  }
}
```

### 2. 字段说明

#### 简单模式（字符串）
- 直接提供图片URL
- 自动使用默认alt文本："活动图片"

#### 对象模式
| 字段 | 说明 | 必填 |
|------|------|------|
| url 或 image | 图片URL | ✅ |
| alt 或 caption | 图片描述文本 | ❌ |

### 3. 显示规则

- **无图片**: 不显示图片区域
- **1张图片**: 全宽显示
- **2张图片**: 各占50%宽度
- **3张及以上**: 自适应网格布局（每行最多3张）

## 显示效果

### 布局位置
```
活动介绍卡片
├── 标题
├── 副标题（中文）
├── 副标题（英文）
├── 主题区域
│   ├── 主题标题
│   └── 主题描述
├── 活动条款链接（可选）
└── 图片区域 ⬅️ 新增
    ├── 图片1
    ├── 图片2
    └── 图片3...
```

### 视觉效果

#### 单张图片
```
┌─────────────────────────────┐
│                             │
│      [图片全宽显示]          │
│                             │
└─────────────────────────────┘
```

#### 两张图片
```
┌──────────────┬──────────────┐
│              │              │
│   [图片1]    │   [图片2]    │
│              │              │
└──────────────┴──────────────┘
```

#### 三张及以上
```
┌─────────┬─────────┬─────────┐
│ [图片1] │ [图片2] │ [图片3] │
├─────────┼─────────┼─────────┤
│ [图片4] │ [图片5] │ [图片6] │
└─────────┴─────────┴─────────┘
```

## 样式特点

### 1. 响应式布局
- **桌面端**: 自适应网格，每行最多3张
- **平板端**: 自适应网格，每行最多2张
- **移动端**: 单列显示，每行1张

### 2. 交互效果
- 鼠标悬停时图片轻微放大
- 添加阴影效果
- 平滑过渡动画

### 3. 图片样式
- 圆角边框（8px）
- 自动适应容器宽度
- 保持原始宽高比
- 可点击（cursor: pointer）

## CSS样式

```css
.intro-images {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
}

.intro-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.intro-image:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

## 使用场景

### 场景1: 显示合作伙伴Logo
```json
{
  "introduction": {
    "images": [
      "images/2025/partner1.png",
      "images/2025/partner2.png",
      "images/2025/partner3.png"
    ]
  }
}
```

### 场景2: 显示报名二维码
```json
{
  "introduction": {
    "images": [
      {
        "url": "images/2025/qrcode.jpg",
        "alt": "扫码报名参加活动"
      }
    ]
  }
}
```

### 场景3: 显示活动海报
```json
{
  "introduction": {
    "images": [
      {
        "url": "images/2025/poster.jpg",
        "alt": "Amarathon 2025 活动海报"
      }
    ]
  }
}
```

### 场景4: 不显示图片
```json
{
  "introduction": {
    "images": []
  }
}
```
或者直接不添加 `images` 字段。

## 技术实现

### JavaScript
```javascript
// 生成图片区域HTML
let imagesHtml = '';
if (introduction.images && Array.isArray(introduction.images) && introduction.images.length > 0) {
    const imagesContent = introduction.images.map(img => {
        if (typeof img === 'string') {
            return `<img src="${img}" alt="活动图片" class="intro-image">`;
        } else if (img.url || img.image) {
            const imgUrl = img.url || img.image;
            const imgAlt = img.alt || img.caption || '活动图片';
            return `<img src="${imgUrl}" alt="${imgAlt}" class="intro-image">`;
        }
        return '';
    }).filter(html => html).join('');
    
    if (imagesContent) {
        imagesHtml = `<div class="intro-images">${imagesContent}</div>`;
    }
}
```

## 注意事项

1. **图片格式**: 支持JPG、PNG、WebP、SVG等常见格式
2. **图片大小**: 建议单张图片不超过500KB
3. **图片尺寸**: 建议宽度至少600px
4. **图片优化**: 使用压缩工具优化图片以提升加载速度
5. **无障碍**: 建议为每张图片提供有意义的alt文本
6. **数量限制**: 建议不超过6张图片，避免页面过长

## 浏览器兼容性

- ✅ Chrome/Edge (最新版)
- ✅ Firefox (最新版)
- ✅ Safari (最新版)
- ✅ 移动浏览器
- ⚠️ IE11 (基本支持，但无网格布局)

## 未来扩展

### 可能的改进
1. 添加图片点击放大功能（Lightbox）
2. 支持图片懒加载
3. 添加图片轮播功能
4. 支持视频嵌入
5. 添加图片说明文字

## 总结

活动介绍图片功能已完成：
- 📸 支持多张图片显示
- 🎨 响应式网格布局
- ✨ 悬停动画效果
- 📱 完整的移动端支持
- ⚙️ 灵活的配置方式
- ✅ 可选功能，不影响现有数据

所有功能已完成并通过验证！
