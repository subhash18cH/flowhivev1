import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../Api';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmitHandler = async (data) => {
    const { name, email, password } = data;
    const sendData = {
      name,
      email,
      password,
    };

    try {
      setLoading(true);
      const response = await api.post("/auth/register", sendData);

      if (response.status === 200) {
        reset();
        toast.success("Registration Successful");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-500">
            Sign Up
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-red-500">
            Welcome! Since we're using a free server, the first response might take a few seconds. Thank you for waiting!
          </p>
        </div>

        <form className="space-y-4 sm:space-y-5 md:space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="userName" className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700">
                Username
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                {...register("name")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 
                text-xs sm:text-sm md:text-base"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name.message || "*Name is required"}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                {...register("email")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 
                text-xs sm:text-sm md:text-base"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message || "*Email is required"}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 
                text-xs sm:text-sm md:text-base"
                placeholder="********"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message || "*Password is required"}</p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              disabled={loading}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm
              text-sm md:text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 
              transition-colors duration-200 ease-in-out"
            >
              {loading ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          <div className="text-center text-xs sm:text-sm mt-4">
            <span className="text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="underline font-medium text-yellow-500 hover:text-yellow-600">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;