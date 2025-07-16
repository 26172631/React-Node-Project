import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UserForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    dob: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value[0] === " " ? "" : e.target.value,
    });
    switch (name) {
      case "firstName":
        setErrors({
          ...errors,
          firstName: value === "" ? "First Name is required" : "",
        });
        break;
      case "lastName":
        setErrors({
          ...errors,
          lastName: value === "" ? "Last Name is required" : "",
        });
        break;
      case "dob":
        setErrors({
          ...errors,
          dob: value === "" ? "Date Of Birth is required" : "",
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrorsState = { ...errors };
    let formIsValid = true;

    if (formData.firstName.length === 0) {
      formIsValid = false;
      newErrorsState.firstName = "First Name is required";
    } else newErrorsState.firstName = "";

    if (formData.lastName.length === 0) {
      formIsValid = false;
      newErrorsState.lastName = "Last Name is required";
    } else newErrorsState.lastName = "";

    if (!formData.dob) {
      formIsValid = false;
      newErrorsState.dob = "Date Of Birth is required";
    } else if (
      new Date(formData.dob).toISOString().split("T")[0] >
      new Date().toISOString().split("T")[0]
    ) {
      formIsValid = false;
      newErrorsState.dob = "Please select the correct Date of birth";
    } else {
      newErrorsState.dob = "";
    }

    setErrors(newErrorsState);
    if (!formIsValid) return;

    try {
      let res = await axios.post("http://localhost:8000/api/user", formData);
      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({ firstName: "", lastName: "", dob: "" });
        setErrors({ firstName: "", lastName: "", dob: "" });
        navigate("/userData");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-md w-full">
        <form
          className="bg-white/90 py-10 px-8 shadow-2xl rounded-2xl space-y-7 border border-gray-100 backdrop-blur-md animate-fade-in-up"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (!/^[A-Za-z ]+$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              placeholder="Enter First Name"
              className={`transition-all duration-200 appearance-none px-4 py-2 w-full placeholder-gray-400 text-gray-900 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:scale-[1.03] focus:shadow-lg ${errors.firstName ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.firstName && (
              <small className="text-red-500 font-medium mt-1 block animate-fade-in">{errors.firstName}</small>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onKeyPress={(event) => {
                if (!/^[A-Za-z ]+$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              placeholder="Enter Last Name"
              className={`transition-all duration-200 appearance-none px-4 py-2 w-full placeholder-gray-400 text-gray-900 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:scale-[1.03] focus:shadow-lg ${errors.lastName ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.lastName && (
              <small className="text-red-500 font-medium mt-1 block animate-fade-in">{errors.lastName}</small>
            )}
          </div>

          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Date Of Birth
            </label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              className={`transition-all duration-200 appearance-none px-4 py-2 w-full text-gray-900 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:scale-[1.03] focus:shadow-lg ${errors.dob ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.dob && (
              <small className="text-red-500 font-medium mt-1 block animate-fade-in">{errors.dob}</small>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 cursor-pointer mt-2 text-center bg-gradient-to-r from-blue-500 to-green-500 rounded-lg border border-transparent shadow-md text-white font-semibold text-lg hover:from-blue-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
