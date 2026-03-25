# 枣强卷帘门维修服务网站

“枣强门壹修”本地服务展示站，基于 Next.js 构建。网站用于承载卷帘门、伸缩门、道闸杆、防盗门等安装维修服务信息，并补充常见故障知识库与抖音公开案例内容。

## 技术栈

- Next.js 16
- React 19
- 原生 CSS
- Markdown 内容源：`gray-matter` + `remark`

## 本地开发

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

默认访问地址：

```text
http://localhost:3000
```

构建生产版本：

```bash
npm run build
```

本地预览生产版本：

```bash
npm run start
```

## 项目结构

```text
.
├── content/
│   └── faq/                  # FAQ Markdown 内容
├── public/
│   ├── images/               # 站点图片素材
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── faq/
│   │   │   ├── [slug]/page.js
│   │   │   └── page.js
│   │   ├── layout.js
│   │   └── page.js           # 首页
│   ├── components/           # Header / Footer / 回顶等公共组件
│   ├── lib/
│   │   ├── config.js         # 电话、服务项、抖音信息、案例配置
│   │   └── markdown.js       # FAQ 读取与渲染
│   └── index.css             # 全局样式与设计 token
├── next.config.js
├── package.json
└── README.md
```

## 内容维护

### 1. 修改首页和服务信息

以下内容主要在 `src/lib/config.js` 维护：

- 联系电话
- 抖音主页链接
- 抖音账号信息
- 主营服务项
- 首页“近期真实维修案例”

首页结构本身位于 `src/app/page.js`。

### 2. 修改 FAQ 知识库

FAQ 内容来自 `content/faq/*.md`。每篇文章使用 Markdown 编写，并通过 `src/lib/markdown.js` 读取。

新增 FAQ 的基本步骤：

1. 在 `content/faq/` 下新增一个 `.md` 文件。
2. 补充 frontmatter，例如 `title`、`date`、`tag`、`excerpt`、`readTime`。
3. 文件名会作为文章的 `slug`，自动生成详情页路由。

### 3. 修改站点样式

全局配色、按钮、卡片、响应式布局等都在 `src/index.css` 中维护。

## 页面说明

- `/`：首页，包含服务介绍、真实案例、FAQ 摘要、抖音信息
- `/faq`：FAQ 列表页
- `/faq/[slug]`：FAQ 详情页

## 部署

这是标准 Next.js 项目，可直接部署到 Vercel 或其他支持 Node.js 的平台。

Vercel 常规流程：

1. 推送到 Git 仓库。
2. 在 Vercel 导入仓库。
3. 使用默认 Next.js 构建配置即可完成部署。

## 当前内容特点

- 首页文案已经按枣强本地维修场景做过收敛
- 抖音信息区使用公开主页内容整理，不再使用搜索页跳转
- Footer 与按钮已去掉不稳定的深色背景 emoji 表现
