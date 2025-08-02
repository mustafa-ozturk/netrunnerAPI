<!-- LOGO -->
<h1>
<p align="center">
  <img src="https://github.com/user-attachments/assets/3f6d49eb-60a0-4144-8992-eccb675bca66" alt="Logo" width="128">
  <br>NetrunnerAPI
</h1>
  <p align="center">
A Cyberpunk-themed hacking game API.<br>Hack, steal data, and sell it on a black market auction with your own custom client and tools.
    <br />
    <a href="#about">About</a>
    ·
    <a href="#documentation">Documentation</a>
    ·
    <a href="#developing">Developing</a>
  </p>
</p>

> **Status:** 🚧 Work in Progress

## About

## Documentation

<details>
<summary>Create User</summary>
Creates a new user.

**Endpoint:** `POST /api/users`

**Request Body:**

```json
{
  "username": "v",
  "password": "samurai"
}
```

**Parameters:**

- `username` (string, required)
- `password` (string, required)

**Success Response (201):**

```json
{
  "id": 42,
  "username": "v",
  "createdAt": "2025-08-02T14:30:00.000Z",
  "updatedAt": "2025-08-02T14:30:00.000Z"
}
```

**Error Responses:**

**400 Bad Request** - Missing parameters:

```json
{
  "error": "Missing required params: username, password."
}
```

**409 Conflict** - Username already exists:

```json
{
  "error": "Username already exists"
}
```

</details>

## Developing

### Prerequisites

- Node.js 21+ and npm
- Git

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Database Development

Database migrations run automatically when the server starts.

When modifying the database schema:

```bash
# Generate new migration after schema changes
npm run db:generate

# Restart server to apply new migrations
npm run dev
```
