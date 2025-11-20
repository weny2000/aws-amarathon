# 智能显示/隐藏系统

## 概述

网站现在支持智能的Tab和区域显示/隐藏功能。系统会根据数据内容自动判断是否显示某个Tab或区域，也支持手动配置。

## 功能特点

### 1. 自动智能隐藏
- 没有数据的Tab和区域会自动隐藏
- 有数据的Tab和区域会自动显示
- 无需手动配置

### 2. 手动配置支持
- 可以通过配置文件强制显示/隐藏
- 配置优先级高于自动判断
- 灵活控制显示逻辑

### 3. 平滑切换
- 隐藏Tab时自动切换到可见Tab
- 避免显示空白内容
- 用户体验友好

## Tab显示规则

### 默认规则

#### 活动主页 (home)
- **默认**: 始终显示
- **条件**: 无
- **说明**: 作为主要入口，始终可见

#### 演讲议程 (agenda)
- **默认**: 有议程数据时显示
- **条件**: `data.agenda` 存在且长度 > 0
- **说明**: 没有议程时自动隐藏

#### Amarathon组委会 (committee)
- **默认**: 有组委会数据且不是2025年时显示
- **条件**: 
  - `data.committee` 或 `data.judges` 或 `data.advisers` 存在
  - 且 `year != 2025`
- **说明**: 2025年特殊处理，显示活动条款Tab

#### 活动条款 (terms)
- **默认**: 有PDF链接且是2025年时显示
- **条件**: 
  - `data.termsPdfUrl` 存在
  - 且 `year == 2025`
- **说明**: 仅2025年显示

### 手动配置

在数据文件中添加 `tabVisibility` 配置：

```json
{
  "tabVisibility": {
    "home": true,
    "agenda": false,
    "committee": true,
    "terms": false
  }
}
```

- `true`: 强制显示
- `false`: 强制隐藏
- 不配置: 使用默认规则

## 区域显示规则

### 默认规则

| 区域 | 显示条件 | 说明 |
|------|---------|------|
| banner-section | `data.banner` 存在 | 活动横幅 |
| introduction-section | `data.introduction` 存在 | 活动介绍 |
| live-schedule-section | `data.liveSchedule` 存在 | 直播安排 |
| live-status-section | `data.liveStatus` 存在 | 直播状态 |
| partners-section | 有合作伙伴数据 | 合作伙伴 |
| announcement-section | `data.announcement` 存在 | 活动召集 |
| gallery-section | `data.gallery` 存在且长度 > 0 | 活动图片 |

### 手动配置

在数据文件中添加 `sectionVisibility` 配置：

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

## 使用示例

### 示例 1: 完全自动（推荐）

不添加任何配置，系统自动根据数据判断：

```json
{
  "banner": { "image": "...", "alt": "..." },
  "introduction": { ... },
  "agenda": [ ... ],
  "announcement": { ... }
}
```

结果：
- ✅ 活动主页 Tab（有数据）
- ✅ 演讲议程 Tab（有数据）
- ❌ 组委会 Tab（无数据）
- ❌ 活动条款 Tab（无数据）

### 示例 2: 手动控制部分Tab

```json
{
  "tabVisibility": {
    "agenda": false
  },
  "banner": { ... },
  "introduction": { ... },
  "agenda": [ ... ]
}
```

结果：
- ✅ 活动主页 Tab
- ❌ 演讲议程 Tab（手动隐藏）
- ❌ 组委会 Tab（无数据）
- ❌ 活动条款 Tab（无数据）

### 示例 3: 隐藏特定区域

```json
{
  "sectionVisibility": {
    "live-schedule-section": false,
    "partners-section": false
  },
  "banner": { ... },
  "introduction": { ... },
  "liveSchedule": { ... },
  "partners": { ... }
}
```

结果：
- ✅ 活动横幅区域
- ✅ 活动介绍区域
- ❌ 直播安排区域（手动隐藏）
- ❌ 合作伙伴区域（手动隐藏）

### 示例 4: 2025年配置

```json
{
  "termsPdfUrl": "path/to/terms.pdf",
  "committee": [ ... ],
  "judges": [ ... ]
}
```

结果（2025年）：
- ✅ 活动主页 Tab
- ✅ 演讲议程 Tab（如有数据）
- ❌ 组委会 Tab（2025年自动隐藏）
- ✅ 活动条款 Tab（2025年自动显示）

结果（其他年份）：
- ✅ 活动主页 Tab
- ✅ 演讲议程 Tab（如有数据）
- ✅ 组委会 Tab（有数据）
- ❌ 活动条款 Tab（非2025年）

## 技术实现

### 核心函数

#### `updateTabVisibility(year, data)`
更新Tab显示状态

```javascript
// 自动判断 + 手动配置
const visibility = data.tabVisibility || getDefaultTabVisibility(year, data);
```

#### `updateSectionVisibility(data)`
更新区域显示状态

```javascript
// 自动判断 + 手动配置
const visibility = data.sectionVisibility || getDefaultSectionVisibility(data);
```

#### `getDefaultTabVisibility(year, data)`
获取默认Tab显示规则

```javascript
return {
    home: true,
    agenda: hasAgendaData(data),
    committee: hasCommitteeData(data) && year != 2025,
    terms: !!data.termsPdfUrl && year == 2025
};
```

### 辅助函数

- `hasAgendaData(data)` - 检查是否有议程数据
- `hasCommitteeData(data)` - 检查是否有组委会数据
- `hasPartnersData(partners)` - 检查是否有合作伙伴数据
- `hasGalleryData(gallery)` - 检查是否有图片数据

## 优势

### 1. 自动化
- 减少手动配置
- 避免显示空内容
- 提升用户体验

### 2. 灵活性
- 支持手动覆盖
- 适应不同年份需求
- 易于扩展

### 3. 一致性
- 统一的显示逻辑
- 统一的配置方式
- 易于维护

### 4. 智能化
- 根据数据自动判断
- 平滑的Tab切换
- 避免错误状态

## 注意事项

1. **配置优先级**: 手动配置 > 自动判断
2. **Tab切换**: 隐藏当前Tab时会自动切换到第一个可见Tab
3. **空状态**: 所有Tab都隐藏时，至少保留"活动主页"Tab
4. **数据验证**: 确保数据结构正确，避免判断错误

## 扩展建议

### 添加新Tab

1. 在HTML中添加Tab按钮和内容区域
2. 在 `updateTabVisibility()` 中添加Tab配置
3. 在 `getDefaultTabVisibility()` 中添加显示规则
4. 添加对应的检查函数（如需要）

### 添加新区域

1. 在HTML中添加区域（使用特定class）
2. 在 `updateSectionVisibility()` 中添加区域配置
3. 添加对应的检查函数（如需要）

## 调试

### 查看当前显示状态

在浏览器控制台执行：

```javascript
// 查看当前年份的Tab显示状态
console.log(getDefaultTabVisibility(AppState.currentYear, eventsData[AppState.currentYear]));

// 查看当前数据的区域显示状态
console.log(getDefaultSectionVisibility(eventsData[AppState.currentYear]));
```

### 强制显示所有Tab

临时测试用：

```javascript
document.querySelectorAll('.sub-nav-btn').forEach(btn => {
    btn.style.display = 'inline-block';
});
```

### 强制显示所有区域

临时测试用：

```javascript
document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'block';
});
```
