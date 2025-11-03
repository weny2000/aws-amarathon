# Amarathon 网站更新说明

## 更新内容

本次更新基于oldsite文件夹中的原始Vue代码（index.vue和agenda.js），对当前网站进行了功能增强。

### 1. 演讲议程功能增强

#### 新增字段支持
演讲议程现在支持以下详细字段：

```json
{
  "id": 1,
  "firstName": "演讲者名",
  "lastName": "演讲者姓",
  "sessionTitle": "演讲标题（支持中英文）",
  "sessionSummary": "演讲摘要（详细描述）",
  "country": "国家/地区",
  "language": "演讲语言",
  "title": "演讲者职位",
  "sessionLevel": "Level 200 Intermediate",
  "sessionTimeUTC": "4:03 AM",
  "sessionTimeBeijing": "12:03 PM",
  "photo": "演讲者照片URL",
  "twitter": "Twitter链接",
  "facebook": "Facebook链接",
  "instagram": "Instagram链接",
  "gitHub": "GitHub链接",
  "linkedIn": "LinkedIn链接",
  "other": "其他链接"
}
```

#### 新增UI特性
- **时区显示**：同时显示UTC和北京时间
- **难度标签**：显示演讲难度级别（Level 200/300等）
- **语言标签**：明确标注演讲语言
- **演讲者信息**：包含照片、国家、职位等详细信息
- **社交媒体链接**：支持多个社交平台链接
- **响应式设计**：移动端和桌面端自适应布局

### 2. 组委会功能增强

#### 新增字段支持
组委会成员现在支持以下详细字段：

```json
{
  "name": "姓名（中英文）",
  "poster": "照片URL",
  "position": "职位（中文）",
  "positionEn": "职位（英文）",
  "title": "头衔",
  "desc": "描述（中文）",
  "descEn": "描述（英文）",
  "bio": "简介",
  "job": "工作职责（中文）",
  "jobEn": "工作职责（英文）",
  "share": [
    {
      "src": "社交媒体图标URL",
      "url": "社交媒体链接"
    }
  ]
}
```

#### 新增UI特性
- **照片展示**：支持成员照片展示
- **双语支持**：中英文职位和描述
- **社交媒体**：底部显示社交媒体图标链接
- **卡片式布局**：现代化的卡片式设计
- **悬停效果**：鼠标悬停时的动画效果

### 3. 样式更新

新增了以下CSS样式类：

#### 演讲议程样式
- `.agenda-cards` - 议程卡片容器
- `.agenda-card` - 单个议程卡片
- `.agenda-badge` - 难度标签
- `.agenda-time-section` - 时间区域
- `.session-title` - 演讲标题
- `.speaker-section` - 演讲者信息区域
- `.speaker-social` - 社交媒体链接

#### 组委会样式
- `.committee-grid` - 组委会网格布局
- `.committee-card` - 成员卡片
- `.committee-photo` - 成员照片
- `.committee-info` - 成员信息
- `.committee-social` - 社交媒体区域

### 4. 数据迁移指南

#### 从原始Vue代码迁移agenda数据

1. 将oldsite/agenda.js中的数据复制到JSON文件
2. 确保字段名称匹配（firstName, lastName, sessionTitle等）
3. 添加photo字段的图片URL
4. 更新到data/2024.json或data/2025.json的agenda数组中

示例数据文件已创建：`data/2024-agenda-full.json`

#### 从原始Vue代码迁移committee数据

1. 从index.vue的translations.committee中提取数据
2. 转换为JSON格式
3. 确保包含poster、name、position等字段
4. 更新到data/2024.json或data/2025.json的committee数组中

### 5. 兼容性说明

- **向后兼容**：旧的简单数据格式仍然支持
- **渐进增强**：新字段为可选，不影响现有数据
- **优雅降级**：缺少照片时显示默认头像

### 6. 使用方法

#### 更新演讲议程数据

编辑 `data/2024.json` 或 `data/2025.json`：

```json
{
  "agenda": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "sessionTitle": "Cloud Native Architecture",
      "sessionSummary": "Deep dive into cloud native...",
      "country": "USA",
      "language": "English",
      "title": "Senior Architect",
      "sessionLevel": "Level 300 Advanced",
      "sessionTimeUTC": "9:00 AM",
      "sessionTimeBeijing": "5:00 PM",
      "photo": "images/speakers/john-doe.jpg",
      "linkedIn": "https://linkedin.com/in/johndoe"
    }
  ]
}
```

#### 更新组委会数据

```json
{
  "committee": [
    {
      "name": "张三 Zhang San",
      "poster": "images/committee/zhangsan.jpg",
      "position": "技术委员会主席",
      "positionEn": "Technical Committee Chair",
      "desc": "负责技术方向规划",
      "descEn": "Responsible for technical planning",
      "job": "活动策划、技术支持",
      "jobEn": "Event planning, Technical support",
      "share": [
        {
          "src": "images/icons/linkedin.png",
          "url": "https://linkedin.com/in/zhangsan"
        }
      ]
    }
  ]
}
```

### 7. 测试建议

1. 在浏览器中打开index.html
2. 切换到"演讲议程"标签页，检查新的卡片式布局
3. 切换到"Amarathon组委会"标签页，检查成员信息展示
4. 测试响应式布局（调整浏览器窗口大小）
5. 测试社交媒体链接是否正常工作

### 8. 后续优化建议

1. 添加演讲者照片到images文件夹
2. 完善所有演讲议程的详细信息
3. 添加组委会成员的照片和社交媒体链接
4. 考虑添加搜索和筛选功能
5. 添加演讲议程的日历导出功能

## 技术栈

- 纯HTML/CSS/JavaScript（无框架依赖）
- 响应式设计
- JSON数据驱动
- 现代CSS Grid和Flexbox布局

## 文件结构

```
.
├── index.html              # 主页面
├── script.js               # JavaScript逻辑（已更新）
├── styles.css              # 样式表（已更新）
├── data/
│   ├── 2024.json          # 2024年数据
│   ├── 2025.json          # 2025年数据
│   └── 2024-agenda-full.json  # 完整议程示例
├── oldsite/
│   ├── index.vue          # 原始Vue组件
│   └── agenda.js          # 原始议程数据
└── UPDATE_NOTES.md        # 本文档
```

## 联系方式

如有问题或建议，请通过GitHub Issues反馈。
