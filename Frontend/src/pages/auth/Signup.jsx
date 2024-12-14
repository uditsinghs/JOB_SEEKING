import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER_ENDPOINT } from "@/constant/endpoint";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    file: "",
    role: "",
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const { data } = await axios.post(`${USER_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (data?.success) {
        toast.success(data?.message || "Signup successful");
        setInput({
          fullname: "",
          email: "",
          password: "",
          phoneNumber: "",
          file: "",
          role: "",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <div className="flex justify-center flex-col items-center bg-white shadow-lg rounded-lg p-6 md:p-10">
        <h1 className="font-bold text-3xl text-gray-800 mb-4">Sign Up</h1>
        <form
          onSubmit={handleSignup}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          {/* Full Name */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeHandler}
              placeholder="Enter your full name"
              className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Email */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeHandler}
              placeholder="Enter your email"
              className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Phone Number */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </Label>
            <Input
              type="number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeHandler}
              placeholder="Phone number"
              className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Password */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeHandler}
              placeholder="Password"
              className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Role Selection */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Select Role
            </Label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeHandler}
                  id="r1"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1" className="text-gray-600 cursor-pointer">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="r2"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2" className="text-gray-600 cursor-pointer">
                  Recruiter
                </Label>
              </div>
            </div>
          </div>
          {/* Profile Upload */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Profile
            </Label>
            <Input
              type="file"
              name="file"
              onChange={changeFileHandler}
              accept="image/*"
              className="w-full rounded-lg cursor-pointer border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              Have an account?{" "}
              <span className="text-indigo-500 underline">
                <Link to="/login">Login</Link>
              </span>
            </p>
            <Button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
