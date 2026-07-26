# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在本仓库中工作时提供指引。

## 项目

枣强卷帘门维修（"枣强门壹修"）—— 本地维修服务展示站，覆盖卷帘门、伸缩门、道闸杆、防盗门等安装维修业务，位于枣强。技术栈为 **Next.js 16（App Router）+ React 19**、原生 CSS、Markdown 驱动内容。无 TypeScript、无 ESLint、无测试框架。

## 常用命令

```bash
npm install      # 安装依赖
npm run dev      # 开发服务器 http://localhost:3000
npm run build    # 生产构建
npm run start    # 运行生产构建
```

无 lint / test 脚本。验证改动请运行 `npm run build`（导入缺失或路由错误会导致构建失败）。

## 架构

**内容即数据，不是代码。** 频繁变更的站点文案集中在 `src/lib/config.js`：电话号码、抖音主页、`services`、`repairCases`、`serviceAreas`、FAQ 主题简介。首页 `src/app/page.js` 直接从这些导出渲染。修改业务信息 = 改 `config.js`，通常不动 JSX。

**维修案例（`repairCases`）。** `/cases` 按 `location` 分组做侧栏导航，名称必须统一。新增案例前须检索已有地点名；发现相似小区名时**先询问用户是否合并**，勿擅自新建近义地点。公开展示不写金额与客户来源。完整流程见 **`docs/添加维修案例说明.md`**。

**Markdown FAQ 系统。** `content/faq/*.md` 每个文件即一篇文章。**文件名（去掉 `.md`）即 slug**，决定路由 `/faq/[slug]`。模板用到的 frontmatter 字段：`title`、`date`（YYYY-MM-DD，同时作为排序依据，新→旧）、`tag`、`excerpt`、`readTime`。`src/lib/markdown.js` 用 `fs`/`gray-matter` 读取，再用 `remark`+`remark-html` 把正文渲染成 HTML。新增 FAQ：在 `content/faq/` 放一个 `.md` 并补全 frontmatter 即可，无需注册路由——`generateStaticParams` 会自动发现。这些是服务端组件，在构建/请求时读取文件系统。

**App Router 结构。**
- `src/app/layout.js`：根布局，引入 `@/index.css`，每页挂载 `Header`/`Footer`/`MobileCallBar`/`BackToTop`，设置全局 metadata + 百度站点验证 + favicon。
- `src/app/page.js`：首页（服务项、案例、FAQ 摘要、抖音信息）。
- `src/app/faq/page.js`：FAQ 列表；`src/app/faq/[slug]/page.js`：FAQ 详情，含 `generateStaticParams` + `generateMetadata`。

**路径别名：** `@/*` → `./src/*`（在 `jsconfig.json` 配置），例如 `import '@/index.css'`、`import { PHONE } from '@/lib/config'`。

**样式。** 全局样式与设计 token（CSS 自定义属性，如 `--color-primary`、`--radius-xl`、`--font-size-3xl`）都在 `src/index.css`。组件用原生 `className` 配少量内联 `style`。`.prose` 类用于渲染 FAQ 的 Markdown HTML。新增 UI 时复用已有 token/类，不要硬编码颜色。

## 约定

- 所有面向用户的文案均为简体中文——写文案时请保持一致。
- 服务项与 FAQ 标签有意使用 emoji 图标（见 `config.js`）；README 已注明 Footer/按钮上的深色背景 emoji 表现被刻意移除，请勿重新引入。
- SEO / 验证元数据（百度验证码、页面标题、keywords）位于 `src/app/layout.js` 及各页 `generateMetadata`。`public/` 下手动维护 `robots.txt` 与 `sitemap.xml`。
