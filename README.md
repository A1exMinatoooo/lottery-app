# Lottery App | 抽奖应用

A simple lottery application that allows users to configure participants and prizes, draw winners, and reset the lottery pool.

一个简单的抽奖应用，支持配置参与者和奖品、随机抽取、重置奖池。

## Features | 功能特性

- Configure total participants and prize distribution
- Draw winners randomly using cryptographically secure random numbers
- Display remaining prizes dynamically
- Persist lottery state using localStorage
- Reset the lottery pool to default settings
- Custom logos for organizer and film
- Easter egg feature for toggling custom animations
- Deployable via Docker and Vercel

## Tech Stack | 技术栈

- **Frontend**: React 19 + TypeScript 6
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4
- **State Management**: localStorage + Custom Hooks

## Getting Started | 开发指南

### Prerequisites | 环境要求

- Node.js 18+
- npm 9+

### Installation | 安装

```bash
# Clone the repository | 克隆仓库
git clone https://github.com/A1exMinatoooo/lottery-app.git
cd lottery-app

# Install dependencies | 安装依赖
npm install

# Start development server | 启动开发服务器
npm run dev
```

### Available Scripts | 可用命令

```bash
npm run dev        # Start dev server | 启动开发服务器
npm run build      # Build for production | 构建生产版本
npm run lint       # Run ESLint | 运行代码检查
npm run preview    # Preview build | 预览构建产物
```

## Deployment | 部署

### Docker Deployment | Docker 部署

```bash
# Build image | 构建镜像
docker build -t lottery-app .

# Run container | 运行容器
docker run -p 8080:80 lottery-app
```

Access at `http://localhost:8080`

### Docker Compose | Docker Compose 部署

```bash
docker-compose up -d
```

Access at `http://localhost:8080`

### Vercel Deployment | Vercel 部署

Click the button below to deploy to Vercel:

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/A1exMinatoooo/lottery-app)

## Project Structure | 项目结构

```
lottery-app/
├── public/
│   └── assets/           # Static assets (GIFs, images)
├── src/
│   ├── components/       # React components
│   │   ├── LotteryApp.tsx    # Main app component
│   │   ├── DrawButton.tsx    # Draw button
│   │   ├── LoadingOverlay.tsx # Loading animation
│   │   ├── PrizeTable.tsx    # Prize configuration
│   │   ├── ResultPopup.tsx   # Result display
│   │   ├── SecretEasterEgg.tsx # Easter egg toggle
│   │   ├── SettingsPanel.tsx # Settings modal
│   │   └── StatusBar.tsx     # Status display
│   ├── hooks/            # Custom React hooks
│   │   ├── useLocalStorage.ts # localStorage persistence
│   │   └── useLottery.ts     # Lottery logic
│   ├── lib/              # Utility functions
│   │   └── random.ts     # Cryptographic random
│   ├── types.ts          # TypeScript definitions
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose config
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
└── vite.config.ts        # Vite config
```

## Contributing | 贡献指南

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style | 代码风格

- Use TypeScript for all new code
- Follow React hooks patterns
- Use Tailwind CSS for styling
- Run `npm run lint` before committing

## License | 许可证

This project is licensed under the MIT License.
