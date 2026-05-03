import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_url } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
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
  };

  const handleSignup = async () => {
    try {
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
    }
  };

  return (
    <div className="flex justify-center my-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6">
        <legend className="fieldset-legend text-lg">
          {isLogin ? "Login" : "SignUp"}
        </legend>

        {!isLogin && (
          <>
            <label className="label text-sm">First Name</label>
            <input
              type="text"
              value={firstName}
              name="firstName"
              className="input focus:outline-none focus:ring-0"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label text-sm">Last Name</label>
            <input
              type="lastName"
              value={lastName}
              name="lastName"
              className="input focus:outline-none focus:ring-0"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="label text-sm">Email</label>
        <input
          type="email"
          value={email}
          name="email"
          className="input focus:outline-none focus:ring-0"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label text-sm">Password</label>
        <input
          type="password"
          value={password}
          name="password"
          className="input focus:outline-none focus:ring-0"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500">{error}</p>

        <button className="btn btn-secondary mt-4" onClick={isLogin?handleLogin:handleSignup}>
          {isLogin ? "Login" : "SignUp"}
        </button>
        <p
          className="text-center mt-2 cursor-pointer text-sm"
          onClick={() => setIsLogin((value) => !value)}
        >
          {isLogin ? "New User! SignUp Here" : "Existing User! Login Here"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
