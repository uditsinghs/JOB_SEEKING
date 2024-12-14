import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER_ENDPOINT } from "@/constant/endpoint";
import { setIsLoading, setUser } from "@/features/authSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      dispatch(setIsLoading(true));
      const { data } = await axios.post(`${USER_ENDPOINT}/login`, input, {
        withCredentials: true,
      });
      if (data?.success) {
        dispatch(dispatch(setIsLoading(false)));
        dispatch(setUser(data?.user))
        toast.success(data?.message || "Login successful");
        setInput({
          email: "",
          password: "",
          role: "",
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
      console.log(error);
    } finally {
      dispatch(dispatch(setIsLoading(false)));
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <div className="flex justify-center flex-col items-center bg-white shadow-lg rounded-lg p-6 md:p-10">
        <h1 className="font-bold text-3xl text-gray-800 mb-4">Login</h1>
        <form
          onSubmit={handleSignup}
          className="w-full max-w-sm flex flex-col gap-4"
        >
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

          {/* Password */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </Label>
            <Input
              type="password"
              autoComplete="disable"
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

          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              Don&#39;t have account?{" "}
              <span className="text-indigo-500 underline">
                <Link to="/signup">Sign up</Link>
              </span>
            </p>
            <Button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              {isLoading ? (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
