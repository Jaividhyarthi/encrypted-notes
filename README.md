# 🔐 Privacy-Focused Notes App with Encryption

A secure, offline-first, client-side encrypted note-taking app built with **React**, **IndexedDB**, and **CryptoJS**. This app ensures that your notes are encrypted before saving and stored privately without any server involvement. Optional user login (local-only) is included for a personalized experience.

---

## ✨ Features

- 🔒 **Client-side AES encryption** using passphrase
- 💾 **Offline-first** using IndexedDB (no server required)
- 📝 Create, read, delete, and search notes
- 📌 Pin and archive notes
- 👤 Local authentication (sign-up/sign-in using username & passphrase)
- 🌓 Dark-themed UI for better focus and accessibility
- 💡 Modular, clean, and readable code structure

---

## 📦 Tech Stack

| Tool        | Purpose                          |
|-------------|----------------------------------|
| React       | UI Framework                     |
| Vite        | Fast dev server & build tool     |
| IndexedDB   | Persistent storage (via `idb`)   |
| CryptoJS    | AES encryption/decryption        |
| Custom Hooks & Context | Auth management        |
| HTML/CSS    | Styling                          |

---

## 🚀 Getting Started

### 🛠️ Prerequisites

- Node.js & npm
- Git (optional for version control)
- Internet (only for installing packages)

### 📥 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/encrypted-notes-app.git
cd encrypted-notes-app

# Install dependencies
npm install

# Run the app
npm run dev

src/
├── auth/
│   ├── AuthProvider.jsx
│   └── Login.jsx
├── components/
│   ├── NoteEditor.jsx
│   ├── NoteCard.jsx
│   └── SearchBar.jsx
├── utils/
│   ├── crypto.js         # AES encryption/decryption
│   ├── db.js             # IndexedDB interactions
│   └── authDB.js         # Local user auth storage
├── App.jsx
└── main.jsx

🛡️ Author
Jaividhyarthi Vivekanand
2nd Year B.Tech | AI & Data Science
SRM Valliammai Engineering College

🛡️ Disclaimer
This app is meant for educational/demo purposes only. While it provides strong client-side encryption, it does not handle server-side or multi-device secure synchronization. Use with caution for sensitive data.