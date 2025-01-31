import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";

export default function Login() {
  console.log("Rendering Login Page");

  // Creating refs for email and password inputs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Accessing values from the refs
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center text-gray-700">
          Login
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="text"
          placeholder="Email"
          ref={emailRef}
          className="w-full p-2 mt-4 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className="w-full p-2 mt-2 border rounded-md"
        />
        <button
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
