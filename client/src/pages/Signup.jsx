import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../utils/api";
import { login } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

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
      navigate(role === "caretaker" ? "/caretaker-onboarding" : "/");
    } catch (e) {
      setError(e.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col justify-center items-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-[#EAE4D6] p-8 sm:p-10 rounded-3xl shadow-lg flex flex-col gap-4"
      >
        <div className="text-center pb-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#EAF2EC] text-[#2A5C43] text-2xl mb-2 shadow-xs">
            🤝
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2B22]">
            Join Happy Hands
          </h2>
          <p className="text-xs sm:text-sm text-[#415146] mt-1">
            Create an account for trusted, warm family care
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1E2B22] mb-1">
            Your Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#DCD6C8] bg-[#FAF7F0] text-[#1E2B22] placeholder-[#8B9B8F] text-sm focus:outline-none focus:ring-2 focus:ring-[#2A5C43] focus:bg-white transition"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1E2B22] mb-1">
            Your Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#DCD6C8] bg-[#FAF7F0] text-[#1E2B22] placeholder-[#8B9B8F] text-sm focus:outline-none focus:ring-2 focus:ring-[#2A5C43] focus:bg-white transition"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1E2B22] mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Create a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#DCD6C8] bg-[#FAF7F0] text-[#1E2B22] placeholder-[#8B9B8F] text-sm focus:outline-none focus:ring-2 focus:ring-[#2A5C43] focus:bg-white transition"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1E2B22] mb-1">
            I am registering as
          </label>
          <select
            className="w-full px-4 py-2.5 rounded-xl border border-[#DCD6C8] bg-[#FAF7F0] text-[#1E2B22] text-sm focus:outline-none focus:ring-2 focus:ring-[#2A5C43] focus:bg-white transition"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="customer">Family / Customer looking for care</option>
            <option value="caretaker">Caretaker looking to provide care</option>
          </select>
        </div>

        {error && (
          <p className="p-3 text-sm text-rose-800 bg-rose-50 border border-rose-200/70 rounded-xl">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-2 py-3 px-6 rounded-full bg-[#2A5C43] hover:bg-[#1F4532] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-100"
        >
          Create Account
        </button>

        <p className="text-center text-xs text-[#415146] mt-2">
          Already a user?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#2A5C43] hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
