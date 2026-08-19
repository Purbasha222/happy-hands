import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../utils/api";
import { login } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("customer");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      dispatch(login({ token: res.data.token, user: res.data.user }));
      navigate("/");
    } catch (e) {
      setError(e.response.data.message);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border border-amber-600 p-5 w-1/4 gap-3 rounded-md"
      >
        <div>
          <h2 className="font-bold text-2xl">Signup</h2>
        </div>
        <label className="font-semibold text-md">Your name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-amber-600 rounded-sm"
        />

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

        <label className="font-semibold text-md">Role</label>
        <select
          className="p-2 border border-amber-600 rounded-sm"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="caretaker">Caretaker</option>
        </select>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit">Submit</button>
      </form>
      <span>Already a user?</span>
    </div>
  );
};

export default Signup;
