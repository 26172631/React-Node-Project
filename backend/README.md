# Backend – Node.js + Express API

This is the backend API for the React + Node.js User Form App. It provides endpoints to save and retrieve user data.

---

## Features
- Simple REST API for user data
- Stores only the latest user in memory (no database)
- CORS enabled for frontend development

---

## Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Install dependencies
```bash
npm install
```

### Start the server
```bash
node index.js
```
The server will run at [http://localhost:8000](http://localhost:8000).

---

## API Endpoints

### POST `/api/user`
- **Description:** Save a new user
- **Body:**
  - `firstName` (string, required)
  - `lastName` (string, required)
  - `dob` (string, required, format: YYYY-MM-DD)
- **Response:**
  - `{ success: boolean, message: string }`

### GET `/api/user`
- **Description:** Get the latest saved user
- **Response:**
  - If user exists: `{ firstName, lastName, dob }`
  - If no user: `{ success: true, message: "No user found" }`

---

## Dependencies
- express
- cors
- body-parser

---

## Notes
- This backend is for demo/development purposes and does not persist data.
- CORS is configured for `http://localhost:5173` (the frontend dev server).

---

## License
MIT 