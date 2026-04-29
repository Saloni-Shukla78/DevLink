import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_url } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div className="flex justify-center my-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6">
        <legend className="fieldset-legend text-lg">Login</legend>

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

        <button className="btn btn-secondary mt-4" onClick={handleLogin}>Login</button>
      </fieldset>
      {/* <div className="card bg-base-400 w-96 shadow-md">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id</legend>
            <input
              type="text"
              value={email}
              name="email"
              className="input"
              placeholder="Type email id here"
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              value={password}
              name="password"
              className="input"
              placeholder="Type password here"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Login;
