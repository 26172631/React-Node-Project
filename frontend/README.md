# Frontend – React App

This is the frontend for the React + Node.js User Form App. It allows users to submit their details and view their information along with a random dog image.

---

## Features
- User form with validation (First Name, Last Name, Date of Birth)
- Displays saved user details, calculated age, and a random dog image
- Modern UI with Tailwind CSS
- React Router for navigation
- Toast notifications for feedback

---

## Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Install dependencies
```bash
npm install
```

### Start the development server
```bash
npm run dev
```
The app will run at [http://localhost:5173](http://localhost:5173).

---

## Usage
1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Fill out the form and submit your details.
3. View your saved data, calculated age, and a random dog image.

---

## Project Structure
```
frontend/
  src/
    Components/
      UserForm.jsx
      SingleUserData.jsx
    App.jsx
    main.jsx
    index.css
    App.css
  public/
  index.html
  package.json
```

---

## Dependencies
- react
- react-dom
- react-router-dom
- axios
- tailwindcss
- react-hot-toast
- vite

---

## Linting
- ESLint is configured for React and modern JS. Run `npm run lint` to check code quality.

---

## Notes
- The frontend expects the backend API to be running at `http://localhost:8000`.
- The dog image is fetched from [dog.ceo](https://dog.ceo/dog-api/).

---

## License
MIT
