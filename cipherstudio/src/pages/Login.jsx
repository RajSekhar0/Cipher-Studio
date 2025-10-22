import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  async function submit(e){
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5000/api/auth/login",{ email, password });
      const { token, user } = res.data;
      localStorage.setItem("cipherstudio-token", token);
      localStorage.setItem("cipherstudio-user", JSON.stringify(user));
      onLogin && onLogin(user);
      alert("Login successful");
    }catch(err){
      alert(err.response?.data?.error || "Login failed");
    }
  }

  return (
    <form onSubmit={submit} style={{padding:20,maxWidth:420}}>
      <h2>Login</h2>
      <input className="small-input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input className="small-input" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <button className="btn primary" type="submit">Login</button>
      </div>
    </form>
  );
}
