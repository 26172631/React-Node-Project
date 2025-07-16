# React + Node.js User Form App (Monorepo)

A full-stack application combining a React frontend and a Node.js/Express backend. Users can submit their First Name, Last Name, and Date of Birth, and view their details along with a calculated age and a random dog image fetched from an external API.

---

## Project Structure
```
React Node Project/
  backend/   # Node.js + Express backend API
  frontend/  # React frontend (Vite + Tailwind CSS)
```

- **backend/**: Contains the Express server and API endpoints.
- **frontend/**: Contains the React app, UI components, and static assets.

---

## Features
- User form with validation
- User data display with calculated age
- Random dog image from [dog.ceo](https://dog.ceo/dog-api/)
- Modern UI with Tailwind CSS
- Simple in-memory backend (no database)

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### 1. Clone the repository
```bash
git clone <repo-url>
cd React Node Project
```

### 2. Install dependencies
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Run the application
#### Start the backend server
```bash
cd backend
node index.js
```
The backend runs on [http://localhost:8000](http://localhost:8000).

#### Start the frontend dev server
```bash
cd frontend
npm run dev
```
The frontend runs on [http://localhost:5173](http://localhost:5173).

---

## Usage
1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Fill out the form and submit your details.
3. View your saved data, calculated age, and a random dog image.

---

## API Overview
- **POST `/api/user`**: Save a new user (firstName, lastName, dob)
- **GET `/api/user`**: Retrieve the latest saved user

---

## Technology Stack
- **Frontend:** React, Vite, Tailwind CSS, React Router DOM, Axios
- **Backend:** Node.js, Express, CORS, Body-Parser

---

## Additional Info
- The backend stores only the latest user in memory (no database).
- For more details, see the individual READMEs in `frontend/` and `backend/` (if present).

---

## License
MIT 