import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../Api';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onLoginHandler = async (data) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/login", data);

      if (response.status === 200) {
        toast.success("Login Successful");
        reset();

        const jwtToken = response.data.token;
        localStorage.setItem("JWT", jwtToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

        await checkUserProfile();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const checkUserProfile = async () => {
    try {
      const profileResponse = await api.get("/user/profile");

      if (profileResponse.status === 200 && profileResponse.data) {
        navigate("/partner");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        navigate("/user-profile");
      } else {
        console.error("Profile check error:", error);
        toast.error("Failed to check profile. Please try again.");
      }
    }
  };

  return (
    <div className=" flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl space-y-6 sm:space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-md sm:shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500">
            Welcome back
          </h2>
          <p className="mt-2 text-sm md:text-base text-red-500">
            Free server is being used, it may take 2 minutes to restart. Please wait after clicking on Log In.
          </p>
        </div>

        <form onSubmit={handleSubmit(onLoginHandler)} className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              {...register("email")}
              className="mt-1 w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              {...register("password")}
              className="mt-1 w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md text-white font-bold text-sm sm:text-base transition-colors duration-200 ${
              loading
                ? 'bg-yellow-300 cursor-not-allowed'
                : 'bg-yellow-500 hover:bg-yellow-400'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
          >
            {loading ? "Loading..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm sm:text-base text-gray-700">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold underline text-yellow-500">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
