import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  async function submit(e){
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/api/auth/register",{ username, email, password });
      alert("Registration successful — you can login now");
    }catch(err){
      alert(err.response?.data?.error || "Registration failed");
    }
  }

  return (
    <form onSubmit={submit} style={{padding:20,maxWidth:420}}>
      <h2>Register</h2>
      <input className="small-input" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
      <input className="small-input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input className="small-input" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <button className="btn primary" type="submit">Register</button>
      </div>
    </form>
  );
}
