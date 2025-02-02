import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../services/AuthService";
import COVER_PHOTO from "../../public/image/book-login-page-cover.jpg";

export default function Login() {
  console.log("Rendering Login Page");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const registerEmailRef = useRef<HTMLInputElement>(null);
  const registerPasswordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const username = usernameRef.current?.value;
    const email = registerEmailRef.current?.value;
    const password = registerPasswordRef.current?.value;

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      await register(username, email, password);
      alert("Registration successful! Please log in.");
      setIsRegisterOpen(false);
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <>
      <div className="w-full h-screen flex item-start">
        {/* First Half */}
        <div className="relative w-1/2 h-full flex flex-col">
          <div className="absolute top-[5%] left-[10%] flex flex-col">
            <h1 className="text-6xl text-white font-extrabold my-4">
              Public Library Colombo
            </h1>
          </div>
          <img src={COVER_PHOTO} className="w-full h-screen flex flex-col" />
        </div>

        {/* Second Half */}
        <div className="w-1/2 h-full flex flex-col p-20 bg-gray-10 justify-center">
          <div className="w-full flex flex-col">
            <h1 className="text-3xl font-semibold mb-4 mt-4">Login</h1>
            <p className="text-base mb-2">
              Welcome back! Please enter your details.
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
              className="text-white btn btn-primary focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-6"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              type="button"
              className="text-white btn btn-secondary focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-6"
              onClick={() => setIsRegisterOpen(true)}
            >
              Register
            </button>
          </div>

        </div>
      </div>

      {isRegisterOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-10 backdrop-blur-xs flex justify-start transition-opacity"
          onClick={() => setIsRegisterOpen(false)}
        >
          <div
            className="w-1/3 h-full bg-white shadow-lg p-6 transition-transform transform translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <form onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                ref={usernameRef}
                className="w-full border rounded border-gray-400 p-2 mb-4"
              />
              <input
                type="email"
                placeholder="Email"
                ref={registerEmailRef}
                className="w-full border rounded border-gray-400 p-2 mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                ref={registerPasswordRef}
                className="w-full border rounded border-gray-400 p-2 mb-4"
              />
              <button type="submit" className="w-full btn btn-primary text-white py-2 rounded-md">
                Submit
              </button>
              <button
                type="button"
                className="w-full mt-2 text-gray-500"
                onClick={() => setIsRegisterOpen(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
