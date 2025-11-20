# 📊 数据管理指南

## 🗂️ 数据文件结构

```
data/
├── years.json          # 年份配置文件
├── template.json       # 新年份数据模板
├── 2024.json          # 2024年数据
├── 2025.json          # 2025年数据
└── YYYY.json          # 其他年份数据
```

## 📝 添加新年份数据

### 步骤 1：创建新年份数据文件

1. 复制 `data/template.json` 为 `data/YYYY.json`（YYYY为年份）
2. 编辑新文件，替换所有占位符：
   - `YYYY` → 实际年份
   - `MM` → 实际月份
   - `DD` → 实际日期
   - 更新具体内容

### 步骤 2：更新年份配置

编辑 `data/years.json`：
```json
{
  "availableYears": [2024, 2025, 2026],  // 添加新年份
  "defaultYear": 2026                    // 可选：更新默认年份
}
```

### 步骤 3：验证数据

1. 检查JSON语法是否正确
2. 确保所有必需字段都已填写
3. 测试网站加载是否正常

## 🔧 数据字段说明

### 基础信息
- `banner`: 横幅图片信息
- `introduction`: 活动介绍（标题、副标题、主题）
  - `title`: 活动标题
  - `subtitle`: 中文副标题
  - `subtitleEn`: 英文副标题
  - `theme`: 活动主题
  - `themeDescription`: 主题描述
  - `termsLink`: （可选）活动条款链接，显示在介绍卡片底部
- `announcement`: 活动公告

### 特殊字段（可选）
- `liveStatus`: 直播状态（仅2024年有）
- `slackInvite`: Slack邀请链接
- `termsLink`: 顶层条款链接（显示在直播状态区域）
- `termsPdfUrl`: PDF条款链接（2025年显示在活动条款Tab）
- `partners`: 合作伙伴信息
- `liveSchedule`: 直播安排

### 显示控制（可选）
- `tabVisibility`: Tab显示配置（手动控制Tab显示/隐藏）
- `sectionVisibility`: 区域显示配置（手动控制区域显示/隐藏）

**注意**: 如果不配置，系统会根据数据自动判断是否显示。详见 [智能显示系统文档](SMART_VISIBILITY_SYSTEM.md)

### 内容数据
- `userGroups`: 用户组分布
- `gallery`: 活动图片
- `agenda`: 演讲议程
- `committee`: 组委会成员

## 🎯 数据更新最佳实践

### 1. JSON语法检查
使用在线JSON验证器或命令行工具：
```bash
# 使用Python检查语法
python -m json.tool data/2024.json

# 使用Node.js检查语法
node -e "console.log(JSON.parse(require('fs').readFileSync('data/2024.json')))"
```

### 2. 字符转义
注意特殊字符的转义：
- 双引号：`\"` 
- 反斜杠：`\\`
- 换行符：`\n`

### 3. 图片路径
- 使用相对路径或完整URL
- 确保图片文件存在且可访问

### 4. 数据一致性
- 保持字段命名一致
- 确保数组结构统一
- 验证链接有效性

## 🚀 部署更新

### 自动部署
数据更新后，GitHub Actions会自动重新部署网站：
1. 提交更改到GitHub
2. 等待Actions完成
3. 验证网站更新

### 手动验证
```bash
# 本地测试
python -m http.server 8000
# 访问 http://localhost:8000
```

## 🐛 常见问题

### JSON语法错误
**错误**: `SyntaxError: Expected ',' or '}' after property value`
**解决**: 检查JSON语法，确保：
- 所有字符串用双引号包围
- 对象和数组正确闭合
- 没有多余的逗号

### 数据不显示
**可能原因**:
1. 文件路径错误
2. JSON语法错误
3. 必需字段缺失
4. 网络请求失败

**解决方法**:
1. 检查浏览器控制台错误
2. 验证JSON语法
3. 确认文件存在

### 图片不显示
**可能原因**:
1. 图片路径错误
2. 图片文件不存在
3. 跨域问题

**解决方法**:
1. 使用完整URL或正确的相对路径
2. 确保图片文件已上传
3. 检查图片访问权限

## 📋 数据检查清单

添加新年份数据时，请检查：

- [ ] JSON语法正确
- [ ] 年份配置已更新
- [ ] 所有必需字段已填写
- [ ] 图片链接有效
- [ ] 外部链接可访问
- [ ] 本地测试通过
- [ ] 部署后验证正常

## 🔄 数据迁移

如果需要从旧的单文件格式迁移：

1. 备份原始 `data.json`
2. 按年份拆分数据到单独文件
3. 创建 `years.json` 配置
4. 测试新格式是否正常工作
5. 删除旧的 `data.json`（可选）