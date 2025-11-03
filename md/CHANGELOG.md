# 更新日志 Changelog

## 2024-11-03 - 演讲议程和组委会功能增强

### ✨ 新增功能

#### 演讲议程 (Agenda)
- 🎯 新增详细的演讲者信息展示
  - 演讲者姓名、国家、职位
  - 演讲者照片或默认头像
  - 社交媒体链接（Twitter, LinkedIn, GitHub等）
- ⏰ 双时区时间显示（UTC + 北京时间）
- 🏷️ 演讲难度级别标签（Level 200/300等）
- 🌐 语言标签显示
- 📝 详细的演讲摘要展示
- 🎨 现代化卡片式布局设计

#### 组委会 (Committee)
- 👤 成员照片展示
- 🌍 中英文双语支持
  - 职位（position/positionEn）
  - 描述（desc/descEn）
  - 工作职责（job/jobEn）
- 🔗 社交媒体图标链接
- 💼 详细的成员信息展示
- 🎨 优雅的卡片式布局

### 🎨 样式更新

- 新增演讲议程专用样式类
- 新增组委会专用样式类
- 响应式设计优化
- 悬停动画效果
- 移动端适配改进

### 📁 新增文件

- `UPDATE_NOTES.md` - 详细的更新说明文档
- `CHANGELOG.md` - 更新日志（本文件）
- `test-agenda.html` - 功能测试页面
- `data/2024-agenda-full.json` - 完整议程数据示例

### 🔧 技术改进

- 基于原始Vue代码（oldsite/index.vue和agenda.js）进行功能迁移
- 保持纯HTML/CSS/JavaScript实现，无框架依赖
- 向后兼容旧数据格式
- 优雅降级处理缺失数据

### 📖 文档

- 详细的数据结构说明
- 数据迁移指南
- 使用示例
- 测试建议

### 🧪 测试

可以通过以下方式测试新功能：

1. 打开 `test-agenda.html` 查看新样式效果
2. 在主页面切换到"演讲议程"和"Amarathon组委会"标签页
3. 测试响应式布局（调整浏览器窗口大小）

### 📝 数据格式示例

#### 演讲议程数据格式
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "sessionTitle": "演讲标题",
  "sessionSummary": "演讲摘要",
  "country": "国家",
  "language": "语言",
  "title": "职位",
  "sessionLevel": "Level 300 Advanced",
  "sessionTimeUTC": "4:03 AM",
  "sessionTimeBeijing": "12:03 PM",
  "photo": "照片URL",
  "linkedIn": "LinkedIn链接"
}
```

#### 组委会数据格式
```json
{
  "name": "姓名",
  "poster": "照片URL",
  "position": "职位",
  "positionEn": "Position",
  "job": "工作职责",
  "jobEn": "Job Responsibilities",
  "desc": "描述",
  "share": [
    {
      "src": "图标URL",
      "url": "链接"
    }
  ]
}
```

### 🚀 后续计划

- [ ] 添加演讲者照片资源
- [ ] 完善所有演讲议程的详细信息
- [ ] 添加搜索和筛选功能
- [ ] 添加演讲议程日历导出功能
- [ ] 优化移动端体验

### 🐛 已知问题

无

### 📞 反馈

如有问题或建议，请通过GitHub Issues反馈。

---

## 历史版本

### 2024-10-XX - 初始版本
- 基础SPA架构
- 年度切换功能
- 基础数据展示
