import { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col border border-amber-600 p-5 w-1/4 gap-3 rounded-md">
        <div>
          <h2 className="font-bold text-2xl">Signup</h2>
        </div>
        <label className="font-semibold text-md">Your name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <select className="p-2 border border-amber-600 rounded-sm">
          <option>Customer</option>
          <option>Caretaker</option>
        </select>
      </div>
      <span>Already a user?</span>
    </div>
  );
};

export default Signup;
