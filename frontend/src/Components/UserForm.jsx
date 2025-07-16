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
    <div className="flex min-h-screen mx-auto justify-center items-center bg-[#fffbfbed] py-12 px-4">
      <div className=" max-w-md w-full space-y-8">
        <form className=" bg-[#cfe3deb5] py-8 px-6 shadow-2xl rounded-lg mb-0 space-y-5">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <div className="mt-1">
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
                className="appearance-none px-3 py-2 w-full placeholder-gray-700 text-gray-700 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
              <small className="text-[red]">{errors.firstName}</small>
            </div>
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <div className="mt-1">
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
                className="appearance-none px-3 py-2 w-full placeholder-gray-700 text-gray-700 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
              <small className="text-[red]">{errors.lastName}</small>
            </div>
          </div>

          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date Of Birth
            </label>
            <div className="mt-1">
              <input
                type="date"
                name="dob"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className="appearance-none px-3 py-2 w-full text-gray-700 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
              <small className="text-[red]">{errors.dob}</small>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 cursor-pointer py-2 text-center bg-green-500 rounded border border-transparent shadow-sm text-white font-medium hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-400"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
