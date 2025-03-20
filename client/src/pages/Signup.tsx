import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/signup", { username, email, password });
      navigate("/signin");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 p-4">
      <div className="w-[400px] max-w-md bg-yellow-50 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-amber-800 text-white rounded-md hover:bg-amber-900 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-amber-800 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
