import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useSignIn } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (error) {
    const errorDiv = document.getElementById("errorDiv");
    errorDiv?.classList.remove("hidden");
  } else {
    const errorDiv = document.getElementById("errorDiv");
    errorDiv?.classList.add("hidden");
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "/api/users/register",
        { email, password },
        config
      );

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email },
      });

      localStorage.setItem("TODO-email", email || "");

      navigate("/");
    } catch (error) {
      console.log("Error:", error);

      setError(true);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-black bg-opacity-60 absolute z-20">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center py-8 px-16 mb-24 w-72 bg-gray-200 bg-opacity-20 rounded-lg lg:w-1/4"
        >
          <label className="text-white text-opacity-70 text-lg">Email</label>
          <input
            className="mb-4 mt-1 py-1 px-2 bg-gray-200 bg-opacity-30 rounded-md"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <label className="text-white text-opacity-70 text-lg">Password</label>
          <input
            className="mb-4 mt-1 py-1 px-2 bg-gray-200 bg-opacity-30 rounded-md"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button
            type="submit"
            className="my-2 py-1 px-5 bg-black bg-opacity-30 rounded-lg text-white text-opacity-80 font-bold hover:bg-opacity-50 transition duration-100 ease-in-out"
          >
            Register
          </button>

          <div
            id="errorDiv"
            className="hidden text-red-800 text-center bg-white bg-opacity-30 py-2 px-4 mt-5 rounded-md"
          >
            User email already exists.
          </div>

          <div className="mt-5 mx-2 text-center">
            Already have an account? Sign in
            <Link to="/login" className="text-blue-500">
              {" "}
              here.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
