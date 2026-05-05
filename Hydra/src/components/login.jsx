import { Component } from "react";
import "./login.css";
import { Link } from "react-router-dom";

class Login extends Component {
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
      <div className="auth-page login-page">
        <div className="form-container">

          <h2 className="form-title">Log In</h2>
          <p className="form-subtitle">
            Welcome back! Please enter your details to log in.  
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
                Remember Me
              </label>

              <a href="#" className="forgot-password-link">
                Forgot Password?
              </a>
            </div>

            {/* log In Button */}
            <button type="submit" className="log-in-button">
              Log In
            </button>
          </form>


          {/* Footer */}
          <p className="footer-text">
            Don't have an account?{" "}
            <Link to="/signup" className="login-link">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    );
  }
}

export default Login;