# 显示/隐藏快速指南

## 快速开始

### 方式1: 完全自动（推荐）

不需要任何配置，系统自动根据数据判断是否显示。

```json
{
  "banner": { ... },
  "introduction": { ... },
  "agenda": [ ... ]
}
```

### 方式2: 手动控制Tab

```json
{
  "tabVisibility": {
    "home": true,      // 显示活动主页
    "agenda": false,   // 隐藏演讲议程
    "committee": true, // 显示组委会
    "terms": false     // 隐藏活动条款
  }
}
```

### 方式3: 手动控制区域

```json
{
  "sectionVisibility": {
    "banner-section": true,
    "introduction-section": true,
    "live-schedule-section": false,
    "live-status-section": false,
    "partners-section": true,
    "announcement-section": true,
    "gallery-section": true
  }
}
```

## 常见场景

### 场景1: 活动筹备中（只显示基本信息）

```json
{
  "tabVisibility": {
    "agenda": false,
    "committee": false
  },
  "sectionVisibility": {
    "live-schedule-section": false,
    "live-status-section": false,
    "partners-section": false,
    "gallery-section": false
  },
  "banner": { ... },
  "introduction": { ... },
  "announcement": { ... }
}
```

### 场景2: 活动进行中（显示所有内容）

```json
{
  "banner": { ... },
  "introduction": { ... },
  "liveSchedule": { ... },
  "liveStatus": { ... },
  "partners": { ... },
  "agenda": [ ... ],
  "announcement": { ... }
}
```

### 场景3: 活动结束后（隐藏直播相关）

```json
{
  "sectionVisibility": {
    "live-schedule-section": false,
    "live-status-section": false
  },
  "banner": { ... },
  "introduction": { ... },
  "agenda": [ ... ],
  "gallery": [ ... ],
  "committee": [ ... ]
}
```

### 场景4: 2025年特殊配置

```json
{
  "termsPdfUrl": "path/to/terms.pdf",
  "banner": { ... },
  "introduction": { ... },
  "agenda": [ ... ]
}
```

自动效果：
- ✅ 显示活动条款Tab
- ❌ 隐藏组委会Tab

## 配置项说明

### Tab配置 (tabVisibility)

| 字段 | 说明 | 默认规则 |
|------|------|---------|
| home | 活动主页 | 始终显示 |
| agenda | 演讲议程 | 有数据时显示 |
| committee | 组委会 | 有数据且非2025年 |
| terms | 活动条款 | 有PDF且是2025年 |

### 区域配置 (sectionVisibility)

| 字段 | 说明 | 默认规则 |
|------|------|---------|
| banner-section | 活动横幅 | 有数据时显示 |
| introduction-section | 活动介绍 | 有数据时显示 |
| live-schedule-section | 直播安排 | 有数据时显示 |
| live-status-section | 直播状态 | 有数据时显示 |
| partners-section | 合作伙伴 | 有数据时显示 |
| announcement-section | 活动召集 | 有数据时显示 |
| gallery-section | 活动图片 | 有数据时显示 |

## 配置值

- `true` - 强制显示
- `false` - 强制隐藏
- 不配置 - 使用默认规则

## 注意事项

1. 手动配置优先级高于自动判断
2. 至少保留一个可见Tab
3. 隐藏当前Tab时会自动切换
4. 配置是可选的，不配置也能正常工作

## 调试技巧

### 查看当前配置

浏览器控制台：

```javascript
// 查看当前数据
console.log(eventsData[AppState.currentYear]);

// 查看Tab显示状态
console.log(getDefaultTabVisibility(AppState.currentYear, eventsData[AppState.currentYear]));
```

### 临时显示所有内容

浏览器控制台：

```javascript
// 显示所有Tab
document.querySelectorAll('.sub-nav-btn').forEach(btn => btn.style.display = 'inline-block');

// 显示所有区域
document.querySelectorAll('.section').forEach(s => s.style.display = 'block');
```
