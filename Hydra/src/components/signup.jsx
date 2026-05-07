import React, { useState } from "react";
import "./sign.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms and Conditions");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      // After registration, redirect to login
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed. Email might already be in use.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="auth-page signup-page">
      <div className="form-container">
        <h2 className="form-title">Sign Up</h2>
        <p className="form-subtitle">
          Create your account to get started
        </p>

        {error && (
          <div className="error-message">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="input-field"
              required
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label className="input-label">Email ID</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input-field"
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="password-container">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-field"
                required
                minLength={8}
              />
            </div>
          </div>

          {/* Options */}
          <div className="options-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              I agree to the Terms and Conditions
            </label>
          </div>

          {/* Sign Up Button */}
          <button type="submit" className="sign-up-button" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="footer-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
           Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
