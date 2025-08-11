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
