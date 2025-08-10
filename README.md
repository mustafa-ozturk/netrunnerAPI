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
    <a href="#documentation">Documentation</a>
    ·
    <a href="#developing">Developing</a>
  </p>
</p>

> **🚧 Work in Progress:** Expect potential breaking changes as new game features are added.

## About

"Wake the f\*\*\* up samurai, we've got HTTP requests to make."

This is a cyberpunk-themed hacking game REST API. You can play it by building your own interface and making HTTP requests.

**How it works:**

- Create your netrunner and authenticate
- Start hack operations and wait for completion
- Attempt to extract a payload from completed operations
- Build up your stats

**Features:**

TODO

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

<!-- -------------------------------------------- -->

<details>
<summary>Scan for Targets</summary>

Scan the network for available hack targets.

**Endpoint:** `GET /api/scan`

**Authorization:** Bearer token required

**Headers:**

```
Authorization: Bearer <your-access-token>
```

**Success Response (200):**

```json
{
  "targets": [
    {
      "id": "megacorp_financials",
      "name": "Mega-corp Financial Division",
      "description": "Mega-corp's primary financial servers containing transaction records and budget allocations.",
      "difficulty": "medium",
      "possibleLoot": [
        "financial_records",
        "corporate_blackmail",
        "encrypted_data_shard"
      ]
    },
    {
      "id": "private_research_lab",
      "name": "Private Research Laboratory",
      "description": "Cutting-edge medical research facility with experimental data and prototype neural interfaces.",
      "difficulty": "hard",
      "possibleLoot": ["research_data", "neural_interface", "memory_chip"]
    }
  ]
}
```

**Target Properties:**

- `id` (string) - Unique target identifier
- `name` (string) - Display name of the target
- `description` (string) - Detailed target information
- `difficulty` (string) - Target difficulty level ("easy", "medium", "hard", "legendary")
- `possibleLoot` (string[]) - Array of potential items that can be extracted

**Error Responses:**

**401 Unauthorized** - Missing or invalid token:

```json
{
  "error": "Invalid Token."
}
```

**Usage Example:**

</details>

<!-- -------------------------------------------- -->

<details>
<summary>Start Hacking</summary>
Initiate a new hacking operation.

**Endpoint:** `POST /api/hacks`

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

<!-- -------------------------------------------- -->

<details>
<summary>Get Hack by ID</summary>

Retrieve details of a specific hack operation.

**Endpoint:** `GET /api/hacks/:hackId`

**Authorization:** Bearer token required

**Path Parameters:**

- `hackId` (string, required) - The unique id of the hack

**Headers:**

```
Authorization: Bearer <your-access-token>
```

**Success Response (200):**

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

<!-- --------------------------------------------- -->

<details>
<summary>Extract Payload From Completed Hack</summary>

Extract the payload from a completed hack operation.

**Endpoint:** `GET /api/hacks/:hackId/extract`

**Authorization:** Bearer token required

**Path Parameters:**

- `hackId` (string, required) - The unique id of the hack

**Headers:**

```
Authorization: Bearer <your-access-token>
```

**Success Response (200):**

```json
{
  "message": "Payload extracted successfully.",
  "exp": 500,
  "items": ["research_data"],
  "eurodollars": 1500
}
```

**Response Fields:**

- `message` (string) - Status message of the extraction attempt
- `exp` (number) - Experience points gained from the extraction
- `items` (string[]) - Array of item IDs acquired from the hack
- `eurodollars` (number) - Currency earned from the extraction

**Error Responses:**

**401 Unauthorized** - Missing or invalid token:

```json
{
  "error": "Invalid Token."
}
```

**403 Forbidden** - Hack doesn't belong to user:

```json
{
  "error": "Access denied."
}
```

**404 Not Found** - Hack not found:

```json
{
  "error": "Hack operation not found."
}
```

**409 Conflict** - Hack not ready for extraction:

```json
{
  "error": "Hack operation not ready for extraction."
}
```

**409 Conflict** - Payload already extracted:

```json
{
  "error": "Payload already extracted from this hack."
}
```

</details>

<!-- -------------------------------------------- -->

<details>
<summary>Get Inventory</summary>

Retrieve all items in your inventory.

**Endpoint:** `GET /api/inventory`

**Authorization:** Bearer token required

**Headers:**

```
Authorization: Bearer <your-access-token>
```

**Success Response (200):**

```json
{
  "items": []
}
```

**Item Type**

```ts
id: string;
name: string;
type: string;
description: string;
quantity: number;
```

**Error Responses:**

**401 Unauthorized** - Missing or invalid token:

```json
{
  "error": "Invalid Token."
}
```

</details>

<details>
<summary>Get User Stats</summary>

Retrieve your current statistics and progression.

**Endpoint:** `GET /api/stats`

**Authorization:** Bearer token required

**Headers:**

```
Authorization: Bearer <your-access-token>
```

**Success Response (200):**

```json
{
  "id": "2803a17a-7ba1-45d8-afa6-5772a0b92af7",
  "userId": "2803a17a-7ba1-45d8-afa6-5772a0b92af7",
  "experience": 5000,
  "eurodollars": 15000,
  "reputation": 250,
  "level": 5,
  "createdAt": "2025-08-04T14:30:00.000Z",
  "updatedAt": "2025-08-04T14:30:00.000Z"
}
```

**Response Fields:**

- `experience` (number) - Total experience points earned
- `eurodollars` (number) - Current currency balance
- `reputation` (number) - Character reputation in the netrunner community
- `level` (number) - Character level based on experience (calculated)

**Error Responses:**

**401 Unauthorized** - Missing or invalid token:

```json
{
  "error": "Invalid Token."
}
```

</details>

<!-- -------------------------------------------- -->

<details>
<summary>List Item on Market</summary>

List one or more items from your inventory on the black market.

**Endpoint:** `POST /api/market`

**Authorization:** Bearer token required

**Headers:**

```
Authorization: Bearer <your-access-token>
```

**Request Body:**

```json
{
  "itemIds": ["zero_day_exploit", "encrypted_data_shard"]
}
```

**Parameters:**

- `itemIds` (string[], required) – Array of item IDs from your inventory to list on the market

**Success Response (201):**

```json
{
  "marketItems": [
    {
      "itemId": "zero_day_exploit",
      "userId": "2803a17a-7ba1-45d8-afa6-5772a0b92af7"
    },
    {
      "itemId": "encrypted_data_shard",
      "userId": "2803a17a-7ba1-45d8-afa6-5772a0b92af7"
    }
  ]
}
```

**Response Fields:**

- `marketItems` (array) – List of items now available on the market

**Error Responses:**

**400 Bad Request** – Missing parameters:

```json
{
  "error": "itemIds required"
}
```

**401 Unauthorized** – Missing or invalid token:

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
npm run test

# Run tests in watch mode
npm run test:watch
```
