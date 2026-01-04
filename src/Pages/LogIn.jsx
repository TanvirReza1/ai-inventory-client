import React, { useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-hot-toast";

const LogIn = () => {
  const { signInUser, signInGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();
  const passwordRef = useRef();

  // Redirect after login (if user came from a private route)
  const from = location.state?.from?.pathname || "/";

  // ------------------ Email & Password Login ------------------
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        console.log("Logged in user:", result.user);
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("Invalid email or password");
      });
  };

  // ------------------ Google Sign-In ------------------
  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        console.log("Google user:", result.user);
        toast.success("Logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("Google Sign-in failed");
      });
  };

  // ------------------ UI ------------------
  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-base-200">
      <div className="card bg-base-100 w-full max-w-md md:max-w-lg shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login to AI Model Inventory Manager
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
            />

            <label className="label">Password</label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              required
            />

            <div className="mt-2 text-sm text-right">
              <a href="#" className="link link-hover">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-neutral mt-4 w-full text-lg"
            >
              Login
            </button>

            <div className="mt-4">
              <button
                type="button"
                className="btn btn-outline w-full"
                onClick={() => {
                  emailRef.current.value = "demo.user@gmail.com";
                  passwordRef.current.value = "DemoUser@123";
                }}
              >
                Demo User
              </button>
            </div>
          </fieldset>
        </form>

        <div className="divider">OR</div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5] w-full flex items-center justify-center gap-2"
        >
          <svg
            aria-label="Google logo"
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path fill="#fff" d="m0 0H512V512H0" />
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            />
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            />
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            />
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="link link-hover text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
