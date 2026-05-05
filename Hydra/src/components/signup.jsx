import { Component } from "react";
import "./sign.css";
import { Link } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      rememberMe: false,
      error: "",
    };
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value, error: "" });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value, error: "" });
  };

  handleCheckboxChange = (event) => {
    this.setState({ rememberMe: event.target.checked });
  };

  handleSignUp = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: "All fields are required" });
      return;
    }

    if (password.length < 8) {
      this.setState({ error: "Password must be at least 8 characters" });
      return;
    }

    console.log("Form submitted:", { email, password });
    this.setState({ error: "" });
  };

  render() {
    return (
      <div className="auth-page signup-page">
        <div className="form-container">

          <h2 className="form-title">Sign Up</h2>
          <p className="form-subtitle">
            Create your account to get started
          </p>

          {this.state.error && (
            <div className="error-message">{this.state.error}</div>
          )}

          <form onSubmit={this.handleSignUp}>
            {/* Email */}
            <div className="input-group">
              <label className="input-label">Email ID</label>
              <input
                type="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
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
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
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
                  checked={this.state.rememberMe}
                  onChange={this.handleCheckboxChange}
                />
                I agree to the Terms and Conditions
              </label>

            </div>

            {/* Sign Up Button */}
            <button type="submit" className="sign-up-button">
              Sign Up
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
  }
}

export default SignUp;