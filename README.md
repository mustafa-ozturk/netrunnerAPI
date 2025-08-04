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

> **🚧 Work in Progress:** Expect potential breaking changes as new game features are added.

## About

## Documentation

<details>
<summary>Create a User</summary>
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
  "id": "2803a17a-7ba1-45d8-afa6-5772a0b92af7",
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

<details>
<summary>Login</summary>
Authenticate a user and receive access tokens.

**Endpoint:** `POST /api/login`

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

**Success Response (200):**

```json
{
  "id": "2803a17a-7ba1-45d8-afa6-5772a0b92af7",
  "username": "v",
  "createdAt": "2025-08-03T19:59:55.130Z",
  "updatedAt": "2025-08-03T19:59:55.130Z",
  "token": "eyJhbGciO.example.token",
  "refreshToken": "a1b2c3d4e5f6.example.refresh.token"
}
```

**Response Fields:**

- `token` - JWT access token (expires in 1 hour)
- `refreshToken` - Long-lived token for getting new access tokens (expires in 60 days)

**Error Responses:**

**400 Bad Request** - Missing parameters:

```json
{
  "error": "Missing required params: username, password."
}
```

**401 Unauthorized** - Invalid credentials:

```json
{
  "error": "Incorrect username or password."
}
```

</details>

<details>
<summary>Start Hacking</summary>
Initiate a new hacking operation.

**Endpoint:** `POST /api/hack`

**Authorization:** Bearer token required

**Headers:**

```
Authorization: Bearer <your-access-token>
```

**Success Response (201):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "2803a17a-7ba1-45d8-afa6-5772a0b92af7",
  "createdAt": "2025-08-04T14:30:00.000Z",
  "updatedAt": "2025-08-04T14:30:00.000Z",
  "completesAt": "2025-08-04T14:35:00.000Z",
  "status": "In Progress"
}
```

**Response Fields:**

- `completesAt` - When the hack will automatically complete
- `status` - Current hack status ("In Progress" → "Completed")

**Error Responses:**

**401 Unauthorized** - Missing or invalid token:

```json
{
  "error": "Invalid Token."
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

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```
