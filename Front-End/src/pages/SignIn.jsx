import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchProfile, clearError } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    if (error) dispatch(clearError());
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    if (error) dispatch(clearError());
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      await dispatch(fetchProfile()).unwrap();
      navigate("/profile");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const canSubmit = email.trim() !== "" && password.trim() !== "" && !loading;

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" aria-hidden="true"></i>
        <h1>Sign In</h1>
        <form onSubmit={onSubmit} noValidate>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              value={email}
              onChange={handleEmail}
              required
              autoComplete="username"
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePassword}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {error && (
            <p style={{ color: "crimson", marginTop: 8 }} role="alert">
              {typeof error === "string" ? error : JSON.stringify(error)}
            </p>
          )}

          <button
            type="submit"
            className="sign-in-button"
            disabled={!canSubmit}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}
