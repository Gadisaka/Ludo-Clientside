// https://ludo-serverside.onrender.com
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, signup, loading, error, user } = useAuthStore();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "PLAYER",
  });
  const [formError, setFormError] = useState(null);

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (isSignup) {
      if (
        !form.username ||
        !form.phone ||
        !form.password ||
        !form.confirmPassword
      ) {
        setFormError("Please fill in all fields.");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setFormError("Passwords do not match.");
        return;
      }
      await signup({
        username: form.username,
        phone: form.phone,
        password: form.password,
      });
      // Optionally, you can auto-login or redirect to login after signup
    } else {
      if (!form.phone || !form.password) {
        setFormError("Please fill in all fields.");
        return;
      }
      await login({
        phone: form.phone,
        password: form.password,
        role: "PLAYER",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isSignup ? "Create your account" : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isSignup ? "Join us and play Ludo!" : "Welcome back!"}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            {isSignup && (
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={form.username}
                  onChange={handleChange}
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-t-md appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
            )}
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                autoComplete="username"
                required
                value={form.phone}
                onChange={handleChange}
                className={`relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 ${
                  isSignup ? "" : "rounded-t-md"
                } appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                placeholder="Phone"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            {isSignup && (
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-b-md appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            )}
            {!isSignup && (
              <div>
                {/* Only round bottom if not signup */}
                <span className="block h-0 w-0 rounded-b-md" />
              </div>
            )}
          </div>

          {(formError || error) && (
            <div className="text-red-500 text-sm mt-2">
              {formError || error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label
                htmlFor="remember-me"
                className="block ml-2 text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={loading}
            >
              {loading
                ? isSignup
                  ? "Signing up..."
                  : "Signing in..."
                : isSignup
                ? "Sign up"
                : "Sign in"}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => setIsSignup((prev) => !prev)}
            className="text-sm text-green-600 hover:text-green-500"
          >
            {isSignup
              ? "Already have an account? Sign in"
              : "Don't have an account? Create one"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
