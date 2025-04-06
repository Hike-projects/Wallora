import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // adjust path if needed

function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Not logged in");

  const handleEmailLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Login failed. If you're new, click 'Register'.");
  };

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert("Registration error.");
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setStatus(session ? "Logged in" : "Not logged in");
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setStatus(session ? "Logged in" : "Not logged in");
    });

    getSession();
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Login Page</h2>
      <p>Status: <strong>{status}</strong></p>

      {user ? (
        <>
          <p><strong>ID:</strong> {user.id}</p>
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
