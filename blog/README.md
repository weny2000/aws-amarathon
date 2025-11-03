# 博客文章管理指南

## 目录结构

```
blog/
├── 2024/           # 2024年的文章
│   ├── event-highlights-1.md
│   └── event-highlights-2.md
├── 2025/           # 2025年的文章
│   └── welcome.md
├── index.json      # 博客索引配置
└── README.md       # 本文件
```

## 添加新文章

### 1. 创建Markdown文件

在对应年份的目录下创建新的`.md`文件，例如：

```bash
blog/2025/new-article.md
```

### 2. 编写Markdown内容

使用标准Markdown语法编写文章：

```markdown
# 文章标题

![图片描述](../../images/gallery/image.jpg)

## 章节标题

文章内容...

### 子章节

- 列表项1
- 列表项2

> 引用内容

---

*发布时间：2025年1月15日*
```

### 3. 更新索引配置

在`blog/index.json`中添加文章信息：

```json
{
  "2025": [
    {
      "id": "new-article",
      "title": "文章标题",
      "date": "2025-01-15",
      "image": "images/gallery/image.jpg",
      "summary": "文章简介"
    }
  ]
}
```

### 4. 在数据文件中引用

在`data/2025.json`的`gallery`部分添加：

```json
{
  "caption": "文章标题",
  "image": "images/gallery/image.jpg",
  "blogPost": "new-article"
}
```

## Markdown语法支持

- **标题**：`# H1`, `## H2`, `### H3`
- **粗体**：`**粗体文字**`
- **斜体**：`*斜体文字*`
- **链接**：`[链接文字](URL)`
- **图片**：`![图片描述](图片URL)`
- **列表**：`-` 或 `1.`
- **引用**：`> 引用内容`
- **代码**：`` `代码` `` 或 ` ```代码块``` `
- **分隔线**：`---`

## 访问文章

文章URL格式：
```
blog.html?year=2025&post=new-article
```

## 注意事项

1. 文件名使用小写字母和连字符（kebab-case）
2. 图片路径相对于blog.html文件
3. 确保图片文件存在于指定路径
4. 发布前检查Markdown渲染效果
