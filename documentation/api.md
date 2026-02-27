# Treasure Hunt API Module (`api.js`)

## Overview

This merge contains a JavaScript module (`api.js`) that provides a clean and simple interface for interacting with the **Code Cyprus Treasure Hunt API**.

The purpose of this module is to:
- isolate all API-related logic in one place
- simplify communication with the backend
- provide normalized and predictable data to the rest of the application
- handle API and network errors consistently

This file does **not** contain any UI logic and does **not** automatically call any API endpoints.

---

## File Structure Added

``` bash
/api.js
/api.md
```


The `api.js` file can be imported into any other JavaScript file that needs to communicate with the Treasure Hunt backend.

---

## How to Import `api.js`

The module uses **ES Modules**, so it must be imported using `import`.

Example:

```js
import {
  fetchTreasureHunts,
  startSession,
  fetchQuestion,
  submitAnswer,
  updateLocation,
  skipQuestion,
  fetchScore,
  fetchLeaderboard
} from "./api.js";
```

## How the API Module Works

## Internal Request Flow

This function:
- builds the correct API URL
- appends query parameters
- sends the request using `fetch`
- checks HTTP errors (client-side)
- checks API errors (`status === "ERROR"`)
- returns parsed JSON data
- throws descriptive `Error` objects when something goes wrong

---

## Error Handling Strategy

All exported functions:
- throw an `Error`
- must be called using `try / catch`

Errors are categorized as:
- **Client error** → network problems or HTTP errors
- **Server error** → API returned `status: "ERROR"`

---

## Available Functions

### fetchTreasureHunts(includeFinished = false)

Fetches available treasure hunts.

**Parameters**
- `includeFinished` (boolean, optional)

**Returns**
- Array of treasure hunt objects

---

### startSession(player, app, treasureHuntId)

Starts a new treasure hunt session.

**Parameters**
- `player` (string) – unique player name
- `app` (string) – application identifier
- `treasureHuntId` (string)

---

### fetchQuestion(sessionId)

Fetches the current question for a session.

**Parameters**
- `sessionId` (string)

**Returns**
- Question data object

---

### submitAnswer(sessionId, answer)

Submits an answer for the current question.

**Parameters**
- `sessionId` (string)
- `answer` (string)

**Returns**
- Answer result object

---

### updateLocation(sessionId, latitude, longitude)

Updates the player’s current location.

**Note:**  
The module does not obtain geolocation automatically.  
Latitude and longitude must be provided by the caller.  
This is intentional and may change based on professor instructions.

**Parameters**
- `sessionId` (string)
- `latitude` (number)
- `longitude` (number)

**Returns**
- Server message object

---

### skipQuestion(sessionId)

Skips the current question.

**Parameters**
- `sessionId` (string)

**Returns**
- Skip result object

---

### fetchScore(sessionId)

Fetches the current score for a session.

**Parameters**
- `sessionId` (string)

**Returns**
- Score information object

---

### fetchLeaderboard(options)

Fetches leaderboard data.

**Parameters**
- `sessionId` (string, optional)
- `treasureHuntId` (string, optional)
- `sorted` (boolean, optional)
- `limit` (number, optional)

Only **one** of `sessionId` or `treasureHuntId` should be provided.

**Returns**
- Leaderboard data object

---

## Typical Usage Flow (Example)

```js
try {
  const hunts = await fetchTreasureHunts();
  const session = await startSession("Player1", "web-app", hunts[0].id);
  const question = await fetchQuestion(session.sessionId);
} catch (error) {
  console.error(error.message);
}
```

## Notes

- This module does not store session data
- Session IDs must be passed explicitly
- No UI logic is included
- Designed to be reusable and testable
