import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { logo } from "../utils/constant";
import { Link,useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const { user, loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setFormError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be atleast 6 characters");
      return;
    }

    setFormError("");

    dispatch(loginUser({ email, password }));
  };

  useEffect(()=>{
    if(user){
      navigate('/home')
    }
    
  },[user,navigate])

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-center mb-4">
        <img className="w-24 h-auto" src={logo} alt="swiggy logo" />
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/*Form validation Error Handling */}
        {formError && (
          <div className="text-red-500 text-sm mb-2">{formError}</div>
        )}

        {/*Backend Error Handling */}
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <button
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>

      </form>
      <p className="text-center text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
