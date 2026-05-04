import { useState } from "react";
import API from "../api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const login = async () => {
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    alert("Login Success");
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        placeholder="Email" 
        onChange={(e) => setForm({ ...form, email: e.target.value })} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setForm({ ...form, password: e.target.value })} 
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;