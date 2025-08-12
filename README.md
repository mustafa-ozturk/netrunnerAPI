<!-- LOGO -->
<h1>
<p align="center">
  <img src="https://github.com/user-attachments/assets/3f6d49eb-60a0-4144-8992-eccb675bca66" alt="Logo" width="128">
  <br>NetrunnerAPI
</h1>
  <p align="center">
A Cyberpunk-themed hacking game.<br>Build your own custom client to play.
    <br />
    <a href="#about">About</a>
    ·
    <a href="#Quick Start">Quick Start</a>
    ·
    <a href="#API Documentation">API Documentation</a>
    ·
    <a href="./DOCS/CONTRIBUTING.md">Contributing</a>
    ·
    <a href="#developing">Developing</a>
  </p>
</p>

> **🚧 Work in Progress:** Expect potential breaking changes as features are changed or added.

## About

"Wake the f\*\*\* up samurai, we've got HTTP requests to make."

This is a cyberpunk-themed hacking game REST API. Build any type of client to interact with the game.

**How it works:**

1. Create your netrunner and authenticate.
2. Initiate a background network scan to discover vulnerable nodes.
3. Launch a hacking operation on a discovered node and wait for it to complete.
4. Extract valuable data, currency, and items from the compromised node.
5. Sell items on the black market for profit.

## API Documentation

See the complete API documentation: [DOCS/API.md](/DOCS/API.md)

## Developing

See the complete Developing documentation: [DOCS/DEVELOPING.md](/DOCS/DEVELOPING.md)

## Quick Start

### Prerequisites

- Postgres v15 or later
- Node.js 21+ and npm
- Git

> **Note:** Instructions tested only on macOS.

**1. Create the database:**

```bash
psql postgres -c "CREATE DATABASE netrunnerapi;"
```

**2. Set up environment variables:**

Create a copy of `example.env` and rename it to `.env`:

```bash
cp example.env .env
```

Edit `.env` and replace `<INSERT-USERNAME>` with your system username:

```bash
DB_URL="postgres://<INSERT-USERNAME>:@localhost:5432/netrunnerapi?sslmode=disable"
```

**3. Install dependencies and start:**

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
