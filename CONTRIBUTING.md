# Contributing to AgroVest

Thank you for your interest in contributing to AgroVest! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node.js)
- A Web3 wallet (e.g., [MetaMask](https://metamask.io/))
- [Reown Project ID](https://cloud.reown.com) (for wallet connection)

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/AgroVest-Frontend.git
   cd AgroVest-Frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the environment variables template:
   ```bash
   cp .env.example .env.local
   ```
5. Fill in your values in `.env.local`:
   - `NEXT_PUBLIC_PROJECT_ID` - Get from [Reown Cloud](https://cloud.reown.com)
   - Contract addresses - Use the deployed addresses or your own
   - Pinata keys - Get from [Pinata](https://app.pinata.cloud/developers/api-keys)

6. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Contribute

### Reporting Bugs

- Check existing [issues](https://github.com/AgroVestOfficial/AgroVest-Frontend/issues) first
- Use the **Bug Report** issue template
- Include steps to reproduce, expected behavior, and screenshots if applicable

### Suggesting Features

- Use the **Feature Request** issue template
- Describe the problem and your proposed solution

### Submitting Changes

1. Create a branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Make your changes
3. Commit your changes (pre-commit hooks will run linting and formatting automatically):
   ```bash
   git commit -m "feat: add new feature"
   ```
4. Push to your fork:
   ```bash
   git push origin feat/your-feature-name
   ```
5. Open a Pull Request against `main`

### Branch Naming

Use descriptive prefixes:

- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `chore/` - Maintenance tasks
- `refactor/` - Code refactoring

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `chore:` - Maintenance
- `refactor:` - Code refactoring
- `style:` - Formatting (no code change)
- `test:` - Adding tests

## Code Style

- **Formatting**: Prettier runs automatically on commit via Husky + lint-staged
- **Linting**: ESLint runs automatically on commit
- **Tailwind CSS**: Classes are auto-sorted by the Prettier plugin
- Run manually if needed:
  ```bash
  npm run format    # Format all files
  npm run lint      # Run ESLint
  npm run type-check # Run TypeScript type checking
  ```

## Project Structure

```
app/              # Next.js App Router pages and layouts
  (guest)/        # Public pages (home, investment, marketplace)
  user/           # Authenticated pages (dashboard, portfolio, etc.)
components/       # React components
  dashboard/      # Dashboard-specific components
  guest/          # Public page components
  shared/         # Shared components
  ui/             # Base UI components (shadcn/ui)
config/           # Wallet and app configuration
constants/        # Contract addresses and chain config
context/          # React context providers
hooks/            # Custom hooks
  ReadHooks/      # Blockchain read operations
  WriteHooks/     # Blockchain write operations
abis/             # Smart contract ABIs
lib/              # Utility functions
utils/            # Helpers (IPFS, metadata, etc.)
public/           # Static assets
styles/           # Global CSS
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting without writing |

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Security

For security vulnerabilities, please see our [Security Policy](SECURITY.md). Do not open public issues for security vulnerabilities.
