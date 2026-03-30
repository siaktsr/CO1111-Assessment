# 🏆 Treasure Hunt Web App

**Treasure Hunt Web App** is a web-based game developed by **Team C** as part of the module:

**CO1111: The Computing Challenge (2025–2026, Semester 1 & 2)**
UCLan Cyprus

---

## 📌 Project Overview

This project is an interactive treasure hunt game where players register teams, participate in live events, solve questions, and compete on a leaderboard.

The application provides a full gameplay cycle:

* Game selection
* Team registration
* Question answering
* Score tracking
* Leaderboard ranking

---

## 🛠 Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript
* REST API (provided by instructors)
* LocalStorage
* Progressive Web App (PWA)

---

## 📁 Project Structure

```
root/
│
├── css/                # All CSS files
├── html/               # All HTML pages
├── js/                 # All JavaScript files
├── test/               # Testing files (test.html, test.css, test.js)
├── libraries/          # External libraries (QR code support)
├── media/photo/        # Images (logo, social icons, etc.)
├── manifest.json       # PWA configuration
├── notes.md            # Team meeting notes
├── README.md           # Project documentation
└── .gitignore
```

---

## 🚀 How to Run

Simply open:

```
index.html
```

in your browser.

No server setup is required.

---

## 🎮 Application Flow

### 🏠 index.html

* Introduction to the game
* Game rules
* Navigation to:

  * Team page
  * Game page
* Social media links in footer

---

### 👥 team.html

* List of team members
* Roles and short descriptions
* Quotes
* Social media links
* Navigation back to Home

---

### 🎯 app.html

* Game selection interface
* Team registration
* Game filtering and search functionality

#### Features:

* Game status indicators:

  * 🟢 LIVE
  * 🟡 SOON
  * 🔴 DONE
* Countdown for upcoming games
* Ability to:

  * View game details
  * Register for active games
* Error handling for failed registration

#### Additional Functionality:

* 🔍 Search (via header icon)
* 🔁 Resume previous session (via LocalStorage)

---

### ❓ questions.html

Main gameplay page.

#### Game Loop:

1. Fetch question
2. Player submits answer
3. Send to server
4. Receive feedback
5. Update score
6. Store answer history
7. Load next question (if correct)

#### Features:

* Duplicate answer warning
* QR code scanner integration
* Geolocation support (for specific questions)
* External link support inside questions

---

### 🏁 leaderboard.html

* Displays ranking of players
* Pagination support
* Highlights current player (even if not on page)
* Navigation to:

  * Home
  * Game (questions)

---

## 🧪 Testing

The project includes a dedicated testing section: [root/test/](./test/)

### Includes:

* ✅ Unit Testing (JavaScript functionality)
* ✅ User Acceptance Testing (UAT scenarios + results)
* ✅ Usability Evaluation based on Nielsen’s 10 Heuristics

---

## 📱 PWA Features

* Add to Home Screen support
* Resource caching for improved performance

---

## 🌐 API Integration

* External API provided by instructors
* All API interactions handled via:

```
api.js
```

---

## ⏳ Loading Experience

To improve user experience, the app includes **loading animations** during data fetching.

This can be observed on:

* app.html
* questions.html
* leaderboard.html

---

## 👥 Team Members

Team C consists of 4 members:

- Anastasia Katsouri — AKatsouri2@uclan.ac.uk  
- Vladislav Vasilev — VVasilev1@uclan.ac.uk  
- Athanasios Antoniou — AAntoniou16@uclan.ac.uk  
- Grigoris Iosif — GIosif@uclan.ac.uk  

---

## 🌍 Social Media

Follow us on:

- [X (Twitter)](https://x.com/teamc_co1111)
- [Instagram](https://www.instagram.com/teamc_44/?hl=en)
- [Facebook](https://www.facebook.com/profile.php?id=61586915335125)

---

## 📌 Notes

* Meeting notes are documented in: [notes.md](./notes.md)

---

## 📄 License

This project is developed for **educational purposes only**.