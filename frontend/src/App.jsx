import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "./Components/UserForm";
import SingleUserData from "./Components/SingleUserData";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/userData" element={<SingleUserData />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
