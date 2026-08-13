import { useState } from "react";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await api.post("/auth/login", { email, password });
      dispatch(login({ token: res.data.token, user: res.data.user }));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col border border-amber-600 p-5 w-1/4 gap-3 rounded-md"
      >
        <div>
          <h2 className="font-bold text-2xl">Login</h2>
        </div>

        <label className="font-semibold text-md">Your Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-amber-600 rounded-sm"
        />

        <label className="font-semibold text-md">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-amber-600 rounded-sm"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
