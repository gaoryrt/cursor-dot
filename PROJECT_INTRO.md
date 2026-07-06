# cursor-dot 项目概览

> 供 agent 快速读取、供开发者快速上手的补充文档。安装与 API 示例见 [README.md](./README.md) / [README.zh-cn.md](./README.zh-cn.md)。

## 项目定位

**cursor-dot** 是一个零依赖的 vanilla JavaScript 库，在页面上渲染可自定义的圆形光标跟随效果，并在 hover 特定元素时切换样式。

面向：需要在营销页、作品集或交互演示中替换系统默认光标的前端开发者。

核心能力（均可在 `index.js` 中核对）：

1. **平滑光标跟随**：监听 `mousemove`，用 `requestAnimationFrame` 插值更新 DOM 圆点位置与透明度（`cursorDot` → `draw` / `onMouseMove`）。
2. **初始化样式配置**：支持 `zIndex`、`diameter`、`borderWidth`、`borderColor`、`easing`、`background` 等选项（`index.js` 第 8–15 行默认参数）。
3. **元素 hover 样式切换**：`cursor.over(selector | HTMLElement, style)` 绑定 `mouseover` / `mouseout`，可改背景、边框、缩放（`index.js` 第 68–86 行）。
4. **销毁与重建**：`cursor.destroy()` 移除监听、停止动画、清理 DOM（`index.js` 第 88–98 行）；可再次调用 `curDot()` 重新初始化。
5. **双分发形态**：CommonJS 主入口 `index.js`（npm 包）；浏览器全局变量 `window.curDot` 由 `dist/window.curDot.js` 打包产出（`package.json` `build` 脚本）。

典型用法场景：

- npm 项目：`import curDot from 'cursor-dot'` → 调用 `curDot()`（见 `example/index.js`）。
- 静态 HTML：引入 `dist/window.curDot.min.js` → 使用 `window.curDot()`（见 README Installation B）。

## 技术栈

| 类别 | 选型 | 证据 |
|------|------|------|
| 语言 | JavaScript（ES5/ES6 混用，无 TypeScript） | `index.js`、`package.json` |
| 运行时 | 浏览器 DOM API（`document`、`requestAnimationFrame`） | `index.js` |
| 模块格式 | CommonJS（`module.exports`） | `index.js` 第 103 行 |
| 测试 | AVA + browser-env + nyc 覆盖率 | `package.json` `devDependencies`、`test/test.js` |
| 构建 | Parcel Bundler v1 | `package.json` `scripts.build` |
| CI | Travis CI（Node 12.4.0，codecov） | `.travis.yml` |
| 包管理 | Yarn（存在 `yarn.lock`） | 仓库根目录 |

未发现：React/Vue、Webpack/Vite、环境变量配置框架。

## 入口链路（从启动到业务入口）

### A. npm / 模块引用链路

1. **安装依赖**：`yarn` 或 `npm install`（无 `package.json` scripts 中的 install 脚本，使用包管理器默认行为）。
2. **业务入口**：消费方 `import curDot from 'cursor-dot'` → Node/打包器解析 `package.json` `"main": "index.js"`。
3. **库核心**：`index.js` 导出 `cursorDot` 工厂函数 → 返回带 `.over()` / `.destroy()` 的 DOM 元素。
4. **示例业务**：`example/index.js` 创建实例并调用 `cursor.over(...)` 绑定 `.react1` / `.react2` / `.react3`。

### B. 浏览器 UMD/全局变量链路

1. **构建命令**：`yarn build` → `parcel build dist/window.curDot.js -o window.curDot.min.js`（来源：`package.json` `scripts.build`）。
2. **打包入口**：`dist/window.curDot.js` — `import curDot from '..'` 并 `window.curDot = curDot`。
3. **产物**：`dist/window.curDot.min.js`（及 `.map`）供 `<script src="...">` 引用。
4. **页面使用**：`window.curDot({ ... })` → 与模块路径相同的 `index.js` 实现。

### C. 本地示例页链路

1. **静态文件**：`example/index.html` 加载 `./index.js`（需本地 HTTP 服务或支持 ES module 的环境；仓库未提供 dev server 脚本）。
2. **示例逻辑**：`example/index.js` → `import curDot from '..'` → hover 演示。

关键导出点：`module.exports = cursorDot`（`index.js` 第 103 行）。

## 目录结构（文件树 + 目录用途）

```text
cursor-dot/
├─ index.js                    # 库唯一源码：cursorDot 工厂、动画循环、over/destroy API
├─ package.json                # 包元数据、main 入口、test/build scripts
├─ yarn.lock                   # Yarn 依赖锁定
├─ README.md                   # 英文：安装、用法、在线 demo 链接
├─ README.zh-cn.md             # 中文 README
├─ PROJECT_INTRO.md            # 本概览文档
├─ LICENSE                     # MIT 许可证
├─ .travis.yml                 # CI：Node 12 + codecov
├─ .gitignore                  # 忽略 node_modules、coverage、.cache 等
├─ smoothcursorfollowing.gif   # README 演示动图
├─ customhoverstyles.gif       # README hover 演示动图
├─ dist/                       # 浏览器构建产物（Parcel 输出）
│  ├─ window.curDot.js         # 打包入口：挂载 window.curDot
│  ├─ window.curDot.min.js     # 压缩版，供 CDN/静态引用
│  └─ window.curDot.min.js.map # Source map
├─ example/                    # 本地交互示例（非 npm 发布内容）
│  ├─ index.html               # 示例页骨架
│  ├─ index.js                 # 调用 curDot 与 cursor.over 演示
│  └─ main.css                 # 示例页样式
└─ test/
   └─ test.js                  # AVA 单测：插入 DOM、样式、over、destroy、重建
```

## 启动（Dev / Local）

仓库 **未定义** `dev` / `start` script（`package.json` 仅有 `test`、`build`、`report-coverage`）。

| 目的 | 命令 | 说明 |
|------|------|------|
| 安装依赖 | `yarn` 或 `npm install` | 安装 AVA、nyc、parcel-bundler 等 devDependencies |
| 运行测试 | `yarn test` 或 `npm test` | 执行 `nyc ava`（来源：`package.json` `scripts.test`） |
| 查看示例页 | 需自行启动静态服务器 | 例如在项目根目录：`npx serve example` 或 `python3 -m http.server` 并打开 `example/index.html`（**非仓库内置脚本，需用户确认工具**） |
| 在线 demo | 打开 README 中的 CodeSandbox 链接 | https://codesandbox.io/s/focused-ellis-g9mpm |

环境要求（来自 `.travis.yml` / `package.json`）：

- Node.js（CI 使用 12.4.0；本地建议使用 LTS，待用户确认兼容性）
- 浏览器环境（示例与库本身均依赖 DOM）

## 构建（Build / Production）

| 命令 | 来源 | 输出 |
|------|------|------|
| `yarn build` 或 `npm run build` | `package.json` `scripts.build` | `dist/window.curDot.min.js`（Parcel 从 `dist/window.curDot.js` 打包） |
| `yarn report-coverage` | `package.json` `scripts.report-coverage` | 生成 `coverage.lcov` 并调用 codecov（CI 场景） |

npm 包发布内容：`package.json` `"files": ["index.js"]` — 发布时仅包含源码入口，不含 `dist/`（浏览器用户需自行 build 或使用仓库内已提交的 `dist/`）。

## 配置与环境变量（如果有则写，没有则写「未发现」）

**未发现** 项目级环境变量或 `.env` 配置。

- `.gitignore` 忽略 `.env` / `.env.test`，但仓库内无对应文件或读取逻辑。
- 库行为完全由 `curDot(options)` 入参控制，无外部配置文件。

待补充（若需完善 Dev 体验）：可在 `package.json` 增加 `dev` script 指向 `example/` 静态服务，或文档化推荐的本地预览命令。
