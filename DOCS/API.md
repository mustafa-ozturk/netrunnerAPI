# API Documentation

<!-- ########################################### -->
<!-- ########################################### -->
<!-- ################## USER ################### -->
<!-- ########################################### -->
<!-- ########################################### -->

## User

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

<!-- ########################################### -->
<!-- ########################################### -->
<!-- ################## SCANNING ############### -->
<!-- ########################################### -->
<!-- ########################################### -->

## Scanning

<details>
<summary>Initiate Background Network Scan</summary>

Initiate a background network scan to probe for vulnerabilities. This scan runs asynchronously, mapping potential nodes for hacking.

**Endpoint:** `POST /api/scan/initiate`

**Authorization:** Bearer token required

**Headers:**

```
Authorization: Bearer <your-access-token>
```

**Request Body:**  
_None_

**Success Response (202):**

```json
{
  "message": "Network scan initiated."
}
```

**Error Responses:**

**401 Unauthorized** – Missing or invalid token:

```json
{
  "error": "Invalid Token."
}
```

</details>

<details>
<summary>Terminate Background Network Scan</summary>

Terminate the active background network scan for the authenticated user.

**Endpoint:** `POST /api/scan/terminate`

**Authorization:** Bearer token required

**Headers:**

```
Authorization: Bearer <your-access-token>
```

**Request Body:**  
_None_

**Success Response (202):**

```json
{
  "message": "Network scan terminated."
}
```

**Error Responses:**

**401 Unauthorized** – Missing or invalid token:

```json
{
  "error": "Invalid Token."
}
```

</details>

<details>
<summary>Get Discovered Nodes</summary>

Retrieve a list of nodes discovered network scans.

**Endpoint:** `GET /api/scan/nodes`

**Authorization:** Bearer token required

**Headers:**

```
Authorization: Bearer <your-access-token>
```

**Request Body:**  
_None_

**Success Response (200):**

```json
{
  "nodes": [
    {
      "id": "426df7fd-e5ce-455c-99bb-48e60279825e",
      "userId": "e5dfc6c7-e257-4563-bf1a-e069be274db4",
      "createdAt": "2025-08-11T17:23:00.040Z",
      "updatedAt": "2025-08-11T17:23:00.040Z",
      "name": "security_contractor"
    },
    {
      "id": "ab028223-ad58-4ac4-bfc7-e01c7197c8b6",
      "userId": "e5dfc6c7-e257-4563-bf1a-e069be274db4",
      "createdAt": "2025-08-11T17:23:30.034Z",
      "updatedAt": "2025-08-11T17:23:30.034Z",
      "name": "private_research_lab"
    }
    // ...more nodes
  ]
}
```

**Error Responses:**

**401 Unauthorized** – Missing or invalid token:

```json
{
  "error": "Invalid Token."
}
```

</details>

<!-- ########################################### -->
<!-- ########################################### -->
<!-- ################## HACKING ################ -->
<!-- ########################################### -->
<!-- ########################################### -->

## Hacking

<details>
<summary>Initiate Hack on Node</summary>

Deploy hacking protocols to breach a vulnerable node you've previously scanned.

**Endpoint:** `POST /api/hack/:nodeName`

**Authorization:** Bearer token required

**Headers:**

```
Authorization: Bearer <your-access-token>
```

**Path Parameters:**

- `nodeName` (string, required) – The name of the node you want to hack (must be discovered via scanning).

**Request Body:**  
_None_

**Success Response (202):**

```json
{
  "id": "0e72e884-5896-4cd9-b0ec-d83fe7a14d9b",
  "userId": "e5dfc6c7-e257-4563-bf1a-e069be274db4",
  "createdAt": "2025-08-11T19:04:31.976Z",
  "updatedAt": "2025-08-11T19:04:31.976Z",
  "completesAt": "2025-08-11T23:04:41.975Z",
  "status": "In Progress",
  "target": "security_contractor"
}
```

**Error Responses:**

**401 Unauthorized** – Missing or invalid token:

```json
{
  "error": "Invalid Token."
}
```

**404 Not Found** – Node not discovered by user:

```json
{
  "error": "Node must be scanned first."
}
```

</details>

<details>
<summary>Check Hack Status</summary>

Check the status of a hack operation by its ID.

**Endpoint:** `GET /api/hack/:hackId`

**Authorization:** Bearer token required

**Headers:**

```
Authorization: Bearer <your-access-token>
```

**Path Parameters:**

- `hackId` (string, required) – The unique identifier of the hack operation.

**Request Body:**  
_None_

**Success Response (200):**

```json
{
  "id": "0e72e884-5896-4cd9-b0ec-d83fe7a14d9b",
  "userId": "e5dfc6c7-e257-4563-bf1a-e069be274db4",
  "createdAt": "2025-08-11T19:04:31.976Z",
  "updatedAt": "2025-08-11T19:04:31.976Z",
  "completesAt": "2025-08-11T23:04:41.975Z",
  "status": "In Progress",
  "target": "security_contractor"
}
```

**Error Responses:**

**401 Unauthorized** – Missing or invalid token:

```json
{
  "error": "Invalid Token."
}
```

**404 Not Found** – Hack operation not found:

```json
{
  "error": "Hack operation not found."
}
```

</details>

<details>
<summary>Attempt Hack Extraction</summary>

Attempt to extract valuable data, currency and items from hacked node.

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

<!-- ########################################### -->
<!-- ########################################### -->
<!-- ################## MARKET ################# -->
<!-- ########################################### -->
<!-- ########################################### -->

## Market

<details>
<summary>List Items on the Black Market</summary>

List Items on the Black Market.

**Endpoint:** `POST /api/market/listings`

**Authorization:** Bearer token required

**Headers:**

```
Authorization: Bearer <your-access-token>
```

**Request Body:**

```json
{
  "itemIds": ["02488de8-0c54-4f64-97f6-07ea729d4ab8"]
}
```

**Parameters:**

- `itemIds` (string[], required) – Array of item IDs from your inventory to list on the market

**Success Response (201):**

```json
{
  "marketItems": [
    {
      "id": "e1361621-acf5-41b9-b4c1-12a1eba97345",
      "userId": "e5dfc6c7-e257-4563-bf1a-e069be274db4",
      "createdAt": "2025-08-12T14:35:10.976Z",
      "updatedAt": "2025-08-12T14:35:10.976Z",
      "itemId": "02488de8-0c54-4f64-97f6-07ea729d4ab8",
      "status": "Auctioned"
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
