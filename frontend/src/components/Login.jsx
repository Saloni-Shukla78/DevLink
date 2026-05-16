import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate,Link } from "react-router-dom";
import { Base_url } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        Base_url + "/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
    finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(
        Base_url + "/signup",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }finally {
      setLoading(false);
    }
  };

  return (
     <div className="flex justify-center items-start pt-16 px-4 bg-base-200 min-h-[calc(100vh-60px)]">
 
      {/* Card — max-w-sm keeps it narrow and form-like */}
      <div className="bg-base-100 rounded-2xl border border-base-200 shadow-lg w-full max-w-sm p-7">
 
        {/* Logo + branding at top of card */}
        <div className="flex flex-col items-center gap-2 mb-5">
          <Link to="/login" className="flex flex-col items-center gap-2 group">
            {/* <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 18l2-2-6-6-6 6 2 2" />
                <path d="M8 6l4-4 4 4" />
              </svg>
            </div> */}
            <span className="text-xl font-bold tracking-tight text-base-content group-hover:text-primary transition-colors">
              Dev<span className="text-primary">Link</span>
            </span>
          </Link>
          <p className="text-sm text-base-content/50 text-center">
            {isLogin ? "Welcome back! Login to continue." : "Join thousands of developers."}
          </p>
        </div>
 
        {/* Login / Sign Up tab switcher */}
        {/* p-1 bg-base-200 rounded-xl → pill container */}
        <div className="flex bg-base-200 rounded-xl p-1 mb-4 gap-1">
          <button
            onClick={() => { setIsLogin(true); setError(""); }}
            className={`flex-1 py-1 text-sm font-medium rounded-lg transition-all duration-200 ${
              isLogin
                ? "bg-base-100 text-primary shadow-sm border border-base-200"
                : "text-base-content/50 hover:text-base-content"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(""); }}
            className={`flex-1 py-1 text-sm font-medium rounded-lg transition-all duration-200 ${
              !isLogin
                ? "bg-base-100 text-primary shadow-sm border border-base-200"
                : "text-base-content/50 hover:text-base-content"
            }`}
          >
            Sign Up
          </button>
        </div>
 
        {/* Form fields */}
        <div className="flex flex-col gap-4">
 
          {/* Sign up only fields */}
          {!isLogin && (
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-base-content/60 mb-1.5 uppercase tracking-wide">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  placeholder="Rahul"
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-base-content/60 mb-1.5 uppercase tracking-wide">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Kumar"
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
            </div>
          )}
 
          <div>
            <label className="block text-xs font-semibold text-base-content/60 mb-1.5 uppercase tracking-wide">
              Email address
            </label>
            <input
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
 
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-base-content/60 uppercase tracking-wide">
                Password
              </label>
              {/* {isLogin && (
                <span className="text-xs text-primary cursor-pointer hover:underline">
                  Forgot password?
                </span>
              )} */}
            </div>
            <input
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
 
          {/* Error message */}
          {error && (
            <div className="alert alert-error py-2 text-sm">
              <span>{error}</span>
            </div>
          )}
 
          {/* Submit button */}
          <button
            onClick={isLogin ? handleLogin : handleSignup}
            disabled={loading}
            className="btn btn-primary w-full rounded-xl text-sm font-semibold mt-1 disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="loading loading-spinner loading-sm" />
                {isLogin ? "Logging in..." : "Creating account..."}
              </span>
            ) : (
              isLogin ? "Login to DevLink" : "Create Account"
            )}
          </button>
        </div>
 
        {/* Bottom toggle text */}
        <p className="text-center text-sm text-base-content/50 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => { setIsLogin((v) => !v); setError(""); }}
            className="text-primary font-semibold cursor-pointer hover:underline"
          >
            {isLogin ? "Sign up here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
