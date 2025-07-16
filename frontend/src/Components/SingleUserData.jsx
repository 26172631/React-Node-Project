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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">No user data found.</p>;

  return (
    <div className="flex min-h-screen mx-auto justify-center items-center bg-[#fffbfbed] py-12 px-4">
      <div className=" max-w-md w-full space-y-8">
        <div className="bg-[white] py-8 px-6 shadow-2xl rounded-lg mb-0 space-y-5 text-center">
          <img
            src={image}
            alt="Dog"
            className="w-32 h-32 mx-auto rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold  text-gray-700 mb-0">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600 mb-0">DOB: {user.dob}</p>
          <p className="text-gray-600 mb-0">Age: {calculateAge(user.dob)}</p>
          <Link
            to="/"
            className="inline-block mt-[10px] px-4 cursor-pointer py-2 text-center bg-green-500 rounded border border-transparent shadow-sm text-white font-medium hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-400"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
