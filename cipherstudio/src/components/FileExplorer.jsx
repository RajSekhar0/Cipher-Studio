import React, { useState } from "react";

export default function FileExplorer({ filesList, activePath, onSelect, onCreate, onDelete, onRename }) {
  const [newName, setNewName] = useState("");

  function handleCreate() {
    const name = newName.trim();
    if (!name || !name.includes(".")) return alert("Enter valid file name like App.jsx");
    onCreate(name);
    setNewName("");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, minHeight:0 }}>
      <div style={{ marginBottom:8 }}>
        <div style={{ fontWeight:700, marginBottom:6 }}>Explorer</div>
        <div style={{ display:"flex", gap:8 }}>
          <input className="small-input" placeholder="New file (e.g. App.jsx)" value={newName} onChange={(e)=>setNewName(e.target.value)} onKeyDown={(e)=>e.key==='Enter' && handleCreate()} />
          <button className="btn primary" onClick={handleCreate}>Create</button>
        </div>
      </div>

      <div style={{ overflowY:"auto", flexGrow:1 }}>
        {filesList.map(p=>{
          if(p==="/package.json" || p==="/src/index.js") return null;
          const name = p.replace(/^\/src\//,"");
          const active = p===activePath;
          return (
            <div key={p} className={`file-item ${active? 'active':''}`} onClick={()=>onSelect(p)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ fontWeight: active?600:400 }}>{name}</div>
              <div style={{ display:"flex", gap:6 }}>
                <button className="btn small" onClick={(e)=>{ e.stopPropagation(); const newN = prompt("Rename file to", name); if(newN && newN!==name){ const from = p; const to = newN.startsWith("/src/")? newN : `/src/${newN}`; onRename && onRename(from,to); } }}>✏️</button>
                <button className="btn small" onClick={(e)=>{ e.stopPropagation(); if(confirm("Delete "+name+"?")) onDelete(p); }}>✕</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="footer">Tip: create files inside <code>/src/</code> for runnable app.</div>
    </div>
  );
}
