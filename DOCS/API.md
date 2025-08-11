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
