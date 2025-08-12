# API Documentation

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
