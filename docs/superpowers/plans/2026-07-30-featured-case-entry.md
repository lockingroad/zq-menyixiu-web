# Featured Case Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将“枣强门市”图文案例置于 `/cases` 首位，并增加符合现有风格的状态标签。

**Architecture:** 在案例配置中保存置顶和标签信息，由可测试的 `groupRepairCasesByLocation(cases)` 统一生成展示顺序；案例页只负责渲染排序结果和标签。

**Tech Stack:** Next.js 16、React 19、Node.js 内置测试、现有全局 CSS。

## Global Constraints

- 详情 URL 保持 `/cases/hualian-south-industrial-roller-door` 不变。
- 地点展示统一使用“枣强门市”。
- 不重复渲染案例。
- 不引入新依赖。

---

### Task 1: 案例排序与数据

**Files:**
- Modify: `tests/case-detail.test.mjs`
- Modify: `src/lib/config.js`
- Modify: `src/app/cases/page.js`

**Interfaces:**
- Consumes: `repairCases`
- Produces: `groupRepairCasesByLocation(cases) -> Array<{ location, id, items, count, featured }>`

- [ ] **Step 1: Write the failing test**

在动态导入的配置模块中断言 `groupRepairCasesByLocation` 存在，并验证首个分组、首个案例、地点、`featured` 和 `badges`。

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/case-detail.test.mjs`

Expected: FAIL，因为 `groupRepairCasesByLocation` 尚未导出，地点仍为长名称。

- [ ] **Step 3: Write minimal implementation**

在 `src/lib/config.js` 中将案例地点改为“枣强门市”，增加：

```js
featured: true,
badges: ['新案例', '图文实拍'],
```

实现 `groupRepairCasesByLocation(cases)`，让包含 `featured` 案例的分组优先，并在分组内优先排列置顶案例。`src/app/cases/page.js` 改为导入该函数。

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/case-detail.test.mjs`

Expected: 2 tests PASS。

### Task 2: 标签 UI 与构建验证

**Files:**
- Modify: `src/app/cases/page.js`
- Modify: `src/app/page.js`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `item.badges: string[]`
- Produces: 现有案例卡片内的状态标签组

- [ ] **Step 1: Render badges**

在案例卡片标签区域渲染主分类和 `item.badges`，首页与案例页使用相同类名。

- [ ] **Step 2: Add matching styles**

使用 `--color-primary`、`--color-accent` 和现有圆角变量，为“新案例”“图文实拍”提供低饱和背景和清晰文字。

- [ ] **Step 3: Run complete verification**

Run:

```bash
node --test tests/case-detail.test.mjs
npm run build
git diff --check
```

Expected: 测试和生产构建均成功，静态路由列表包含 `/cases/hualian-south-industrial-roller-door`。

