import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import "./Login.css";

// Firebase config for Google Login
const firebaseConfig = {
  apiKey: "AIzaSyCrkUHKs8jTfDr2P-AnIoSD_tMaTZIYRZY",
  authDomain: "wallora-a1faa.firebaseapp.com",
  projectId: "wallora-a1faa",
  storageBucket: "wallora-a1faa.firebasestorage.app",
  messagingSenderId: "923715134",
  appId: "1:923715134:web:fa3f5c21ffea4550ccb36f",
  measurementId: "G-4CG5WV9CX9"
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert("Login failed. If you're new, click 'Register'.");
    if (remember) localStorage.setItem("savedEmail", email);
  };

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return alert("Registration failed.");
    alert("Check your email to confirm.");
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(firebaseAuth, googleProvider);
      alert("Google login successful (via Firebase)");
    } catch (err) {
      console.error(err);
      alert("Google login failed.");
    }
  };

  const handleForgotPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) return alert("Error sending reset email.");
    alert("Reset link sent to email.");
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) setEmail(savedEmail);

    getSession();
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <div className="background">
      <div className="login-box animated">
        <div className="brand">
          <img src="/logo.png" alt="Wallora Logo" className="logo" />
          <h1 className="brand-name">Wallora</h1>
        </div>
        <h3 className="form-title">{mode === "login" ? "Login" : "Register"}</h3>
        {user ? (
          <>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={logout}>🚪 Logout</button>
          </>
        ) : (
          <>
            <div className="input-group">
              <label>Email</label>
              <i className="ph ph-envelope-simple"></i>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <i className="ph ph-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`ph ${showPassword ? "ph-eye-slash" : "ph-eye"}`}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#ccc"
                }}
              ></i>
            </div>
            <div className="options spaced">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />{" "}
                Remember Me
              </label>
              <span className="forgot" onClick={handleForgotPassword}>
                Forgot Password?
              </span>
            </div>
            {mode === "login" ? (
              <>
                <button onClick={handleEmailLogin}>🔑 Log in</button>
                <p className="register">Don't have an account? <span onClick={() => setMode("register")}>Register</span></p>
              </>
            ) : (
              <>
                <button onClick={handleRegister}>📝 Register</button>
                <p className="register">Already have an account? <span onClick={() => setMode("login")}>Login</span></p>
              </>
            )}
            <hr />
            <button onClick={handleGoogleLogin}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 18, marginRight: 8, verticalAlign: "middle" }} />
              Continue with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;