import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCrkUHKs8jTfDr2P-AnIoSD_tMaTZIYRZY",
  authDomain: "wallora-a1faa.firebaseapp.com",
  projectId: "wallora-a1faa",
  storageBucket: "wallora-a1faa.firebasestorage.app",
  messagingSenderId: "923715134",
  appId: "1:923715134:web:fa3f5c21ffea4550ccb36f",
  measurementId: "G-4CG5WV9CX9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Not logged in");

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert("Login failed. If you're new, click 'Register'.");
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert("Registration error.");
    }
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setStatus(currentUser ? "Logged in" : "Not logged in");
    });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Login Page</h2>
      <p>Status: <strong>{status}</strong></p>

      {user ? (
        <>
          <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={logout}>🚪 Logout</button>
        </>
      ) : (
        <>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ margin: 5 }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ margin: 5 }}
            />
          </div>
          <button onClick={handleEmailLogin}>📧 Login with Email</button>
          <button onClick={handleRegister}>🆕 Register</button>
          <hr style={{ margin: 10 }} />
          <button onClick={handleGoogleLogin}>🔐 Login with Google</button>
        </>
      )}
    </div>
  );
}

export default Login;
