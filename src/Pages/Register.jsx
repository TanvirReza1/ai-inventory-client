import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const Register = () => {
  const { signInGoogle, createUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // ------------------ Handle Manual Registration ------------------
  const handleCreateUser = (e) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError("");

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photoURL = form.photoURL.value.trim();
    const password = form.password.value;

    // 🔍 Password validation
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      toast.error("Password must contain at least one uppercase letter.");
      setLoading(false);
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      toast.error("Password must contain at least one lowercase letter.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      toast.error("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    // ✅ Create user
    createUser(email, password)
      .then((result) => {
        console.log(result);
        // 🔄 Update display name & photo
        updateProfile(auth.currentUser, {
          displayName: name || "Anonymous User",
          photoURL:
            photoURL || "https://img.icons8.com/?size=100&id=14736&format=png",
        })
          .then(() => {
            // 👇 update context manually
            setUser({
              ...auth.currentUser,
              displayName: name || "Anonymous User",
              photoURL:
                photoURL ||
                "https://img.icons8.com/?size=100&id=14736&format=png",
            });

            toast.success("Registration successful!");
            navigate("/");
          })

          .catch((error) => {
            console.error("Profile update error:", error.message);
            toast.error("Could not update profile info.");
          });
      })

      .catch((error) => {
        console.error("Registration error:", error.message);
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email already in use.");
        } else {
          toast.error(error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ------------------ Google Sign-In ------------------
  const handleGoogleSignIn = () => {
    setLoading(true);
    signInGoogle()
      .then((result) => {
        console.log(result.user);
        toast.success("Registered with Google!");
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("Google Sign-in failed");
      })
      .finally(() => setLoading(false));
  };

  // ------------------ UI ------------------
  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-base-200">
      <div className="card bg-base-100 w-full max-w-md md:max-w-lg shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Register for AI Model Inventory Manager
        </h1>

        <form onSubmit={handleCreateUser} className="space-y-4">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Enter your full name"
              required
            />

            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
            />

            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              className="input input-bordered w-full"
              placeholder="Enter your photo URL"
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              required
            />

            {/* 💡 Show hint only if user tried & failed password validation */}
            {passwordError && (
              <small className="text-xs text-red-500 mt-1 block">
                {passwordError}
              </small>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-neutral mt-4 w-full text-lg"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </fieldset>
        </form>

        <div className="divider">OR</div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
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
          Already have an account?{" "}
          <Link to="/login" className="link link-hover text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
