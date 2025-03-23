import { usernameatom } from "../atoms/usernameatom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const SignInCard: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [name, setName] = useRecoilState(usernameatom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://writely-backend-2fw2.onrender.com/signin",
        { username, password },
        { withCredentials: true }
      );
      console.log("Signin successful:", response.data);
      
      setName(username); // Fix: Removed unnecessary object wrapping
      navigate(`/${username}/allblogs`);
    } catch (error: any) {
      console.error("Signin error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 p-4">
      <div className="w-[400px] max-w-md bg-yellow-50 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-amber-800 font-semibold hover:underline"
          >
            Signup
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInCard;
