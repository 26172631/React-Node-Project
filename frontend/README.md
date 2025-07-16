# React + Node.js User Form App

A simple full-stack application where users can submit their First Name, Last Name, and Date of Birth. The app then displays the saved user details along with calculated age and a random dog image fetched from an external API.

---

## Features
- **User Form:** Submit First Name, Last Name, and Date of Birth with validation.
- **User Data Display:** View the saved user details, calculated age, and a random dog image.
- **API Integration:** Fetches a random dog image from [dog.ceo](https://dog.ceo/dog-api/).
- **Full-stack:** React frontend, Node.js/Express backend.
- **Styling:** Tailwind CSS for modern UI.

---

## Project Structure
```
React Node Project/
  backend/         # Node.js + Express backend API
    index.js
    package.json
    ...
  frontend/        # React frontend (Vite + Tailwind CSS)
    src/
      Components/
        UserForm.jsx
        SingleUserData.jsx
      App.jsx
      main.jsx
      ...
    package.json
    ...
```

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
The backend will run on [http://localhost:8000](http://localhost:8000).

#### Start the frontend dev server
```bash
cd frontend
npm run dev
```
The frontend will run on [http://localhost:5173](http://localhost:5173).

---

## Usage
1. Open the frontend in your browser: [http://localhost:5173](http://localhost:5173)
2. Fill out the form with your First Name, Last Name, and Date of Birth.
3. Submit the form. If successful, you will be redirected to a page displaying your details, calculated age, and a random dog image.

---

## API Endpoints
### POST `/api/user`
- **Description:** Save a new user.
- **Body:**
  - `firstName` (string, required)
  - `lastName` (string, required)
  - `dob` (string, required, format: YYYY-MM-DD)
- **Response:**
  - `{ success: boolean, message: string }`

### GET `/api/user`
- **Description:** Get the latest saved user.
- **Response:**
  - If user exists: `{ firstName, lastName, dob }`
  - If no user: `{ success: true, message: "No user found" }`

---

## Technology Stack
- **Frontend:**
  - React 19
  - Vite
  - Tailwind CSS
  - React Router DOM
  - Axios
  - React Hot Toast
- **Backend:**
  - Node.js
  - Express
  - CORS
  - Body-Parser

---

## Linting & Formatting
- ESLint is configured for React and modern JS. Run `npm run lint` in the frontend directory.

---

## Notes
- The backend stores only the latest submitted user in memory (no database).
- The dog image is fetched live from an external API each time the user data page is loaded.
- For production, consider adding persistent storage and environment variable support.

---

## License
MIT
