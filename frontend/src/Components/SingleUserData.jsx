import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SingleUserData() {
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };
  const [user, setUser] = useState(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, image] = await Promise.all([
          axios.get("http://localhost:8000/api/user"),
          axios.get("https://dog.ceo/api/breeds/image/random"),
        ]);
        setUser(userRes.data);
        setImage(image.data.message);
      } catch (err) {
        alert("Error loading data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  if (!user)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg font-medium">No user data found.</p>
    );

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/90 py-10 px-8 shadow-2xl rounded-2xl border border-gray-100 backdrop-blur-md flex flex-col items-center animate-fade-in-up">
          <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg border-4 border-blue-200 mb-4">
            <img
              src={image}
              alt="Dog"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1 tracking-tight">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-500 text-base mb-1">DOB: {user.dob}</p>
          <p className="text-gray-500 text-base mb-4">Age: {calculateAge(user.dob)}</p>
          <Link
            to="/"
            className="w-full px-4 py-2 mt-2 text-center bg-gradient-to-r from-blue-500 to-green-500 rounded-lg border border-transparent shadow-md text-white font-semibold text-lg hover:from-blue-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
