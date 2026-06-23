# CLAUDE.md - Lottery App 开发指南

## 项目概述

抽奖活动应用，支持配置参与者和奖品、随机抽取、重置奖池。使用 React + TypeScript + Vite + Tailwind 构建，状态通过 localStorage 持久化。

## 构建命令

```bash
npm run dev        # 启动开发服务器
npm run build      # TypeScript 编译 + Vite 构建
npm run lint       # ESLint 代码检查
npm run preview    # 预览构建产物
```

## 架构说明

### 技术栈
- **前端框架**: React 19 + TypeScript 6
- **构建工具**: Vite 8
- **样式**: Tailwind CSS 4
- **状态管理**: localStorage + 自定义 hooks

### 目录结构
```
src/
├── components/          # React 组件
│   ├── LotteryApp.tsx   # 主应用组件
│   ├── DrawButton.tsx   # 抽奖按钮
│   ├── LoadingOverlay.tsx # 加载动画
│   ├── PrizeTable.tsx   # 奖品配置表格
│   ├── ResultPopup.tsx  # 结果弹窗
│   ├── SecretEasterEgg.tsx # 彩蛋切换
│   ├── SettingsPanel.tsx # 设置面板
│   └── StatusBar.tsx    # 状态栏
├── hooks/               # 自定义 Hooks
│   ├── useLocalStorage.ts # localStorage 持久化
│   └── useLottery.ts    # 抽奖逻辑
├── lib/                 # 工具库
│   └── random.ts        # 安全随机数
├── types.ts             # TypeScript 类型定义
├── App.tsx              # 根组件
├── main.tsx             # 入口文件
└── index.css            # 全局样式 + 动画
```

## 代码规范

### TypeScript
- 使用 `interface` 定义对象类型
- 组件 Props 必须显式定义接口
- 使用 `type` 定义联合类型和简单类型

### React
- 函数组件 + Hooks
- 使用 `useCallback` 优化回调函数
- 组件文件使用 `.tsx` 扩展名

### Tailwind CSS
- 使用工具类直接在 JSX 中编写样式
- 响应式设计使用 `sm:`、`md:`、`lg:` 前缀
- 自定义动画在 `index.css` 中定义

## 设计决策

### 状态管理
- 使用 `useLocalStorage` hook 实现状态持久化
- 抽奖配置和奖池状态存储在 localStorage
- 支持重置奖池到默认设置

### 抽奖逻辑
- 使用 `secureRandom` 生成加密安全随机数
- 奖池数组动态维护，抽取后移除对应项
- 支持自定义奖品和"未中奖"选项

### 彩蛋功能
- 连续点击 5 次左上角区域切换自定义功能
- 控制 Logo 显示和加载动画切换
- 使用 `useRef` 追踪点击计数

## 提交规范

每完成一个功能项或需求点后，必须进行 git commit。提交信息必须使用英文编写，格式：

```
<type>: <short description>
```

类型：
- `feat`: 新功能
- `fix`: 修复 bug
- `refactor`: 重构
- `docs`: 文档更新
- `style`: 代码格式调整
- `test`: 测试相关
- `chore`: 构建/工具变更

示例：
```bash
git add src/components/DrawButton.tsx
git commit -m "feat: add draw button component"
```

## 部署

### Docker
```bash
docker build -t lottery-app .
docker run -p 8080:80 lottery-app
```

### Vercel
直接连接 GitHub 仓库部署，配置在 `vercel.json`。
