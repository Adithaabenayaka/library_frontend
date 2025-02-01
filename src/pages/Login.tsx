import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";
import COVER_PHOTO from "../assets/images/book-login-page-cover.jpg";

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
    <>
      <div className="w-full h-screen flex item-start">
        {/* First Half */}
        <div className="relative w-1/2 h-full flex flex-col">
          <div className="absolute top-[5%] left-[10%] flex flex-col">
            <h1 className="text-6xl text-white font-extrabold my-4 ">
              Public Library - Colombo
            </h1>
          </div>
          <img src={COVER_PHOTO} className="w-full h-screen flex flex-col" />
        </div>

        {/* Second Half */}
        <div className="w-1/2 h-full flex flex-col p-20 bg-gray-10 justify-center">
          <div className="w-full flex flex-col">
            <h1 className="text-3xl font-semibold mb-4 mt-4">Login</h1>
            <p className="text-base mb-2 ">
              Welcom back!. Please enter your details.
            </p>
          </div>

          <div className="w-full flex flex-col">
            <input
              type="email"
              placeholder="E-mail"
              ref={emailRef}
              className="w-full text-black border-b border-black outline-none focus:outline-none bg-none mt-5"
            />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              className="w-full text-black border-b border-black outline-none focus:outline-none bg-none mt-10 mb-20"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="w-full flex flex-col">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-6"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-6"
            >
              Register
            </button>
          </div>

          <div className="w-full flex items-center justify-center">
            Don't have a account?. Register.
          </div>
        </div>
      </div>
    </>
  );
}
