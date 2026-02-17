# LocalStorage Protocol

This document describes how client-side data is stored and accessed via `localStorage`
in the Treasure Hunt web application.

The goal is to ensure **consistent key names**, **data formats**, and **usage rules**
across all frontend modules.

---

## General Rules

- All session-related data MUST be stored under a **single key**
- Data MUST be stored as a JSON string
- Access is done via `JSON.parse()` / `JSON.stringify()`
- If session data is missing, the app MUST redirect the user to the start page

---

## Main Storage Key

### `treasureHuntSession`

**Type:** `Object (JSON)`

**Description:**  
Contains all data related to the currently active treasure hunt session.

---

## Structure of `treasureHuntSession`

```json
{
  "player": "string",
  "app": "string",
  "treasureHuntId": "string",
  "sessionId": "string",
  "numOfQuestions": number
}
