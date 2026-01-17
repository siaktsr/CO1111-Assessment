# questions.js

## Purpose

`questions.js` is responsible for **loading, rendering, and handling user interaction with questions** during a treasure hunt session. It connects the UI to the backend API, manages session state, submits answers, and allows skipping questions.

---

## Responsibilities

* Load the current game session from `localStorage`
* Fetch questions from the API
* Render questions based on their type
* Handle answer submission
* Handle question skipping
* Detect game completion

---

## Dependencies

### Imports

```js
import {
  fetchQuestion,
  submitAnswer,
  skipQuestion
} from "../js/api.js";
```

These API functions are expected to:

* `fetchQuestion(sessionId)` → return the next question or completion state
* `submitAnswer(sessionId, answer)` → submit an answer
* `skipQuestion(sessionId)` → skip the current question

---

## DOM Elements

The following elements must exist in the HTML:

| ID               | Description                         |
| ---------------- | ----------------------------------- |
| `question-text`  | Displays the question text          |
| `question-type`  | Displays the question type          |
| `answer-section` | Container for answer inputs/buttons |
| `message`        | Feedback messages from server       |
| `submit-btn`     | Submit answer button                |
| `skip-btn`       | Skip question button                |

---

## State

```js
let sessionId = null;
let currentQuestion = null;
```

* `sessionId` – retrieved from `localStorage`
* `currentQuestion` – currently active question from the API

---

## Initialization Flow

```text
init()
 ├─ Load session from localStorage
 ├─ Redirect if missing
 └─ loadQuestion()
```

### Session Storage Format

Expected key in `localStorage`:

```json
{
  "sessionId": "abc123"
}
```

Stored under:

```js
localStorage.getItem("treasureHuntSession")
```

---

## Main Functions

### `loadQuestion()`

* Clears UI
* Fetches next question from API
* Detects game completion
* Calls `renderQuestion()`

---

### `renderQuestion(question)`

Renders:

* Question text
* Question type
* Appropriate input controls

---

### `renderAnswerInput(type)`

Dynamically renders inputs based on question type:

| Type      | UI                    |
| --------- | --------------------- |
| `BOOLEAN` | Yes / No buttons      |
| `MCQ`     | A / B / C / D buttons |
| `NUMERIC` | Number input          |
| `INTEGER` | Number input          |
| `TEXT`    | Text input            |

---

### `submit(answer)`

* Sends answer to API
* Displays server message
* Loads next question

---

### Skip Question

```js
skipBtn.addEventListener("click", ...)
```

* Checks `currentQuestion.canBeSkipped`
* Calls `skipQuestion(sessionId)`
* Loads next question

---

## Game Completion

### `showGameCompleted()`

Temporary UI that:

* Displays "Game Completed!"
* Shows button to navigate to leaderboard

```js
window.location.href = "leaderboard.html";
```

⚠️ This function is marked as **temporary** and should be replaced later.

---

## Helper Functions

### `clearUI()`

Resets UI before loading a new question.

---

### `showMessage(message)`

Displays feedback messages from the server.

---

## Suggested Improvements

* Add loading spinner
* Disable submit while waiting for API
* Add answer validation per type
* Store answered questions history
* Improve accessibility (ARIA, keyboard navigation)

---

## File Location

```text
/js/questions.js
/js/questions.md
```
