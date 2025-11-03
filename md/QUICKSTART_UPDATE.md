# 快速开始 - 演讲议程和组委会更新

## 🎯 目标

本次更新将原始Vue网站（oldsite文件夹）中的演讲议程和组委会功能迁移到当前的纯HTML/CSS/JavaScript网站中。

## ⚡ 快速测试

### 1. 查看测试页面

直接在浏览器中打开 `test-agenda.html` 文件，可以看到：
- ✅ 新的演讲议程卡片式布局
- ✅ 演讲者详细信息展示
- ✅ 社交媒体链接
- ✅ 组委会成员卡片

### 2. 在主网站中查看

1. 打开 `index.html`
2. 点击"演讲议程"标签页
3. 点击"Amarathon组委会"标签页

## 📝 更新数据

### 方式一：使用现有数据格式（简单）

如果你的数据比较简单，可以继续使用原有格式：

```json
{
  "agenda": [
    {
      "time": "09:00 - 09:30",
      "title": "演讲标题",
      "speaker": "演讲者姓名",
      "description": "演讲描述"
    }
  ]
}
```

### 方式二：使用增强数据格式（推荐）

使用完整的数据格式获得更好的展示效果：

#### 步骤1：准备演讲议程数据

编辑 `data/2024.json` 或 `data/2025.json`，更新agenda部分：

```json
{
  "agenda": [
    {
      "firstName": "张",
      "lastName": "三",
      "sessionTitle": "云原生架构实践\nCloud Native Architecture",
      "sessionSummary": "深入探讨云原生架构设计模式...",
      "country": "中国",
      "language": "中文",
      "title": "高级架构师",
      "sessionLevel": "Level 300 Advanced",
      "sessionTimeUTC": "9:00 AM",
      "sessionTimeBeijing": "5:00 PM",
      "photo": "images/speakers/zhangsan.jpg",
      "linkedIn": "https://linkedin.com/in/zhangsan",
      "gitHub": "https://github.com/zhangsan"
    }
  ]
}
```

#### 步骤2：准备组委会数据

```json
{
  "committee": [
    {
      "name": "李四 Li Si",
      "poster": "images/committee/lisi.jpg",
      "position": "技术委员会主席",
      "positionEn": "Technical Committee Chair",
      "title": "AWS Hero",
      "desc": "负责技术方向规划和活动组织",
      "descEn": "Responsible for technical planning",
      "job": "活动策划、技术支持",
      "jobEn": "Event planning, Technical support",
      "share": [
        {
          "src": "images/icons/linkedin.png",
          "url": "https://linkedin.com/in/lisi"
        }
      ]
    }
  ]
}
```

## 🖼️ 添加图片

### 演讲者照片

1. 将演讲者照片放到 `images/speakers/` 目录
2. 建议尺寸：200x200像素，正方形
3. 格式：JPG或PNG
4. 命名：使用英文名，如 `john-doe.jpg`

### 组委会照片

1. 将成员照片放到 `images/committee/` 目录
2. 建议尺寸：400x500像素，竖版
3. 格式：JPG或PNG
4. 命名：使用拼音，如 `zhangsan.jpg`

### 社交媒体图标

1. 将图标放到 `images/icons/` 目录
2. 建议尺寸：32x32像素
3. 格式：PNG（支持透明背景）

## 🔄 从原始数据迁移

### 从agenda.js迁移

原始文件：`oldsite/agenda.js`

1. 打开 `oldsite/agenda.js`
2. 复制数组内容
3. 转换为JSON格式（去掉export default，添加适当的引号）
4. 粘贴到 `data/2024.json` 的 `agenda` 字段

参考示例：`data/2024-agenda-full.json`

### 从index.vue迁移组委会数据

原始文件：`oldsite/index.vue`

1. 在index.vue中找到 `translations.committee` 部分
2. 提取成员数据
3. 转换为JSON格式
4. 粘贴到 `data/2024.json` 的 `committee` 字段

## ✅ 验证更新

### 检查清单

- [ ] 数据文件格式正确（使用JSON验证工具）
- [ ] 图片文件已上传到正确位置
- [ ] 图片路径在JSON中正确引用
- [ ] 在浏览器中打开index.html测试
- [ ] 检查演讲议程标签页显示正常
- [ ] 检查组委会标签页显示正常
- [ ] 测试社交媒体链接可以正常打开
- [ ] 测试响应式布局（手机/平板/桌面）

### 浏览器测试

推荐在以下浏览器中测试：
- Chrome/Edge（最新版）
- Firefox（最新版）
- Safari（最新版）
- 移动浏览器

## 🎨 自定义样式

如果需要调整样式，编辑 `styles.css` 文件：

### 修改颜色

```css
:root {
    --aws-orange: #FF9900;  /* 主题色 */
    --aws-dark: #232F3E;    /* 深色背景 */
}
```

### 修改卡片间距

```css
.agenda-cards {
    gap: 24px;  /* 调整卡片间距 */
}
```

### 修改字体大小

```css
.session-title {
    font-size: 20px;  /* 调整标题大小 */
}
```

## 🐛 常见问题

### Q: 数据不显示？
A: 检查JSON格式是否正确，使用 [JSONLint](https://jsonlint.com/) 验证

### Q: 图片不显示？
A: 检查图片路径是否正确，确保图片文件存在

### Q: 样式错乱？
A: 清除浏览器缓存，强制刷新（Ctrl+F5）

### Q: 社交媒体图标不显示？
A: 如果没有图标图片，会显示默认emoji，这是正常的

## 📚 更多信息

- 详细文档：`UPDATE_NOTES.md`
- 更新日志：`CHANGELOG.md`
- 原始代码：`oldsite/` 目录

## 💡 提示

1. **渐进式更新**：可以先更新一部分数据，逐步完善
2. **保持备份**：修改前备份原始数据文件
3. **测试优先**：每次修改后都在浏览器中测试
4. **图片优化**：使用压缩工具减小图片大小，提升加载速度

## 🎉 完成！

更新完成后，你的网站将拥有：
- ✨ 专业的演讲议程展示
- 👥 详细的组委会成员介绍
- 📱 完美的响应式布局
- 🔗 便捷的社交媒体链接

祝你使用愉快！
