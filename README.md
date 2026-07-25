# Express Multi-App Monorepo Template (Vercel CDN 模式)

一个基于 Express 作为路由代理的 Monorepo 仓库模板，通过 Vercel CDN 加速静态资源，实现一个域名访问多个前端子项目。

## 🚀 项目演示

演示地址：<https://vercel-internal-rewrite-monorepo-template.vercel.app/>

---

## ⚠️ 重要限制声明

> **请在使用前仔细阅读以下限制条件！**

| 限制类型           | 说明                                                           |
| ------------------ | -------------------------------------------------------------- |
| **不支持 SSR**     | 构建产物必须是静态资源，不支持服务端渲染（SSR）                |
| **配置复杂度高**   | 需要针对每个子项目配置 `vercel.json`，上手难度较大，试错成本高 |
| **仅适合轻量项目** | 个人演示项目、作品集、技术博客、项目原型、学习 Demo            |

### ❌ 不适用场景

- 企业级应用
- 需要频繁添加新项目的场景
- 对配置复杂度敏感的团队
- 需要 SSR 的项目（如 Next.js、Nuxt 默认 SSR 模式）

### ✅ 适用场景

- 个人作品集展示
- 技术博客（Hexo、VuePress 等静态博客）
- 文档站点
- 项目原型演示
- 微前端架构学习与演示
- 需要 CDN 加速的静态网站托管

---

## ✨ 功能特点

### 核心优势

- **CDN 加速**：静态资源直接走 Vercel CDN，全球边缘节点缓存，毫秒级响应
- **高性能**：缓存命中时无 Serverless 函数开销，大幅降低冷启动延迟
- **高吞吐量**：CDN 承载静态资源请求，减轻 Function 压力，支持更高并发
- **路由统一管理**：通过 `/:appName` 路径访问各个子项目，入口清晰便于维护

### 技术特性

- 基于 Express 实现 API 路由，静态资源直接由 Vercel CDN 处理
- 通过 `vercel.json` 自定义构建和重写规则
- 静态资源缓存优化，提升访问性能
- 完善的错误处理和 404 页面

## 📁 项目结构

```
vercel-internal-rewrite-monorepo-template/
├── apps/                    # 前端子项目目录
│   ├── express-api/         # Express API 服务器
│   ├── vanilla-spa/         # 原生 JS 单页应用示例
│   ├── vue3-spa/            # Vue 3 单页应用示例
│   ├── react-spa/           # React 单页应用示例
│   ├── webpack-ejs-mpa/     # Webpack + EJS 多页应用示例
│   ├── vuepress-ssg/        # VuePress 文档站点示例
│   ├── vitepress-ssg/       # VitePress 文档站点示例
│   ├── hexo-ssg/            # Hexo 静态博客示例
│   ├── astro-ssg/           # Astro 静态站点示例
│   ├── nuxt4-ssg/           # Nuxt 4 静态站点示例
│   └── next-ssg/            # Next.js 静态站点示例
├── vercel.json              # Vercel 构建与路由配置（关键文件）
├── package.json             # 项目依赖配置
└── README.md                # 项目说明文档
```

## 🏗️ 架构对比

### 与 Express 代理模式（[express-multi-app-monorepo-template](https://github.com/iuuKai/express-multi-app-monorepo-template.git)）的对比

| 维度             | Express 代理模式          | Vercel CDN 模式（本模板） |
| ---------------- | ------------------------- | ------------------------- |
| **静态资源处理** | 全部经过 Express Function | 直接由 Vercel CDN 处理    |
| **请求链路**     | 客户端 → Function → 资源  | 客户端 → CDN（边缘节点）  |
| **缓存机制**     | 依赖 Express 缓存头       | Vercel CDN 全球边缘缓存   |
| **冷启动延迟**   | 每次请求可能触发冷启动    | 缓存命中时无冷启动        |
| **函数压力**     | 高（所有请求都经过）      | 低（仅 API 请求经过）     |
| **并发能力**     | 受限（Function 并发限制） | 强（CDN 高吞吐量）        |
| **响应速度**     | 较慢（多一层中转）        | 快（毫秒级返回）          |
| **配置复杂度**   | 低（统一代理）            | 高（需逐项目配置）        |
| **维护成本**     | 低                        | 高（试错成本高）          |
| **上手难度**     | 简单                      | 复杂                      |

### 性能差异详解

#### Express 代理模式的性能瓶颈

1. **请求链路过长**：所有请求（包括 CSS、JS、图片）都需要经过 Express Serverless Function
2. **冷启动延迟**：每次请求可能唤醒 Serverless 函数，首次请求耗时可达数百毫秒
3. **额外开销**：Function 处理静态资源需要 CPU 和内存开销，浪费资源
4. **并发限制**：高并发场景下容易触发函数限流、CPU 超限，导致加载卡顿

#### Vercel CDN 模式的性能优势

1. **CDN 缓存命中**：静态资源缓存在全球边缘节点，命中缓存时响应头 `x-vercel-cache: HIT`，毫秒级返回
2. **无函数开销**：缓存命中时完全绕过 Serverless Function，零 CPU、内存开销
3. **高吞吐量**：CDN 专为静态资源优化，吞吐量远高于 Serverless Function
4. **边缘计算**：资源从离用户最近的节点返回，降低网络延迟

## 🛠️ 快速开始

### 环境要求

- Node.js >= 20.x
- pnpm >= 11.x

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/iuuKai/vercel-internal-rewrite-monorepo-template.git
cd vercel-internal-rewrite-monorepo-template
```

> ⚠️ **本地开发限制**：由于子项目的路由依赖于 Vercel 的 rewrites 配置，**本地开发时各 apps 是相互独立的**。例如 `express-api` 运行在 3000 端口，其他子项目想要请求 API 数据，需要在各自项目中配置 proxy 代理将 `/api/*` 请求转发到 `http://localhost:3000`。只有部署到 Vercel 后，所有子项目才能通过统一的路由规则正常访问。

本地开发只需同时开启需要的服务项目即可：

```bash
# 方式一：分别进入各项目目录启动（传统方式）
cd apps/express-api && pnpm dev   # 启动 API 服务（端口 3000）
cd apps/vue3-spa && pnpm dev      # 启动 Vue3 子项目（端口另行配置）
cd apps/react-spa && pnpm dev      # 启动 React 子项目（端口另行配置）

# 方式二：使用 pnpm --filter 在根目录操作（推荐）
pnpm --filter express-api dev      # 启动 API 服务（端口 3000）
pnpm --filter vue3-spa dev         # 启动 Vue3 子项目
pnpm --filter react-spa dev        # 启动 React 子项目
pnpm --filter vue3-spa install     # 给 Vue3 项目安装依赖
pnpm --filter vue3-spa add axios   # 给 Vue3 项目添加依赖
pnpm --filter vue3-spa add -D sass # 添加开发依赖

# 方式三：在各子项目中配置 proxy 后单独开发
cd apps/vue3-spa && pnpm dev      # 需在 vite.config.js 中配置 proxy
```

> 💡 **pnpm --filter 说明**：pnpm v11+ 会自动扫描 `apps/` 目录下的子项目，无需配置 `pnpm-workspace.yaml`。使用 `--filter` 可以在根目录直接操作任意子项目，无需 cd 进入目录。

### 部署到 Vercel

1. 登录 Vercel 控制台
2. 新建项目，关联你的 GitHub 仓库
3. 无需额外配置，Vercel 会自动读取 `vercel.json`
4. 部署完成后访问 `https://<your-domain>.vercel.app`

## ⚙️ 配置说明

### 子项目 baseURL 配置

与 [express-multi-app-monorepo-template](https://github.com/iuuKai/express-multi-app-monorepo-template.git)（统一 `/p/:appName` 前缀）不同，本模板中子项目的 `base` 或 `baseURL` 配置相对灵活：

- **无需统一前缀**：子项目可以使用任意 base 路径（如 `/vue3-spa/`、`/blog/`、`/` 等）
- **只需与 vercel.json 对应**：base 路径只需与 vercel.json 中的 `source` 路径匹配即可
- **Vercel 路由原理**：Vercel 根据 `source` 前缀匹配请求，然后转发到 `destination` 对应的资源

**示例**：如果 vercel.json 中配置了：

```json
{
	"source": "/vue3-spa/:path*",
	"destination": "/apps/vue3-spa/:path*"
}
```

则 `apps/vue3-spa` 项目的 base 需配置为 `/vue3-spa/`。

> 📖 **Vercel 配置详解**：[vercel-config.md](./vercel-config.md)

## 📖 路由规则

| 路径           | 说明                                  |
| -------------- | ------------------------------------- |
| `/<appName>`   | 子项目入口（直接由 CDN 处理）         |
| `/<appName>/*` | 子项目资源（直接由 CDN 处理）         |
| `/api/*`       | API 接口路由（经过 Express Function） |
| `/js/*`        | Express 公共 JS 资源（CDN 处理）      |
| `/css/*`       | Express 公共 CSS 资源（CDN 处理）     |
| `/images/*`    | Express 公共图片资源（CDN 处理）      |
| `/`            | Express 首页（可自定义或移除）        |

### ⚠️ rewrites 顺序注意事项

Vercel 的 rewrites 是**按配置顺序从上到下匹配**的，一旦匹配成功就会立即处理，不会继续往下匹配。因此**匹配越精准的规则应该放在越上面**，匹配范围越模糊的规则则放在下面兜底，否则会导致路由错误或 404。

正确的配置顺序遵循以下优先级：

1. **子项目路由**（如 `/vue3-spa`、`/react-spa`）— 路径精确，放在最前面
2. **Express 静态资源**（`/js`、`/css`、`/images`）— 精确匹配特定目录
3. **API 路由**（`/api/*`）— 匹配范围较小
4. **首页路由**（`/`）— 仅匹配根路径
5. **兜底路由**（`/:path*`）— 匹配所有未命中路径，必须放在最后

```json
{
	"rewrites": [
		{ "source": "/vue3-spa/:path*", "destination": "/apps/vue3-spa/:path*" },
		{ "source": "/js/:path*", "destination": "/apps/express-api/public/js/:path*" },
		{ "source": "/css/:path*", "destination": "/apps/express-api/public/css/:path*" },
		{ "source": "/api/:path*", "destination": "/apps/express-api/src/app.js" },
		{ "source": "/", "destination": "/apps/express-api/src/app.js" },
		{ "source": "/:path*", "destination": "/apps/express-api/src/app.js" }
	]
}
```

## 💡 优缺点分析

### 优点

- **CDN 加速**：静态资源全球边缘缓存，响应速度快
- **高性能**：缓存命中时无函数开销，支持高并发
- **低延迟**：资源从离用户最近的节点返回
- **独立维护**：每个子项目配置完成后独立运行，互不影响

### 缺点

- **配置复杂度高**：需要针对每个项目配置 builds 和 rewrites
- **维护成本高**：每次添加新项目都需要调试配置
- **试错成本高**：配置错误可能导致部署失败或路由异常
- **上手难度大**：需要理解 Vercel 构建和重写机制

### 替代方案

> 待补充

## ⚠️ 注意事项

- 所有子项目必须设置正确的 `baseURL`，否则会出现资源加载失败
- 构建产物必须是静态资源，不支持 SSR 服务端渲染
- `vercel.json` 配置错误会导致部署失败，建议先在本地测试
- 不同框架的 `distDir` 配置不同，需根据实际情况调整

## 📄 License

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
