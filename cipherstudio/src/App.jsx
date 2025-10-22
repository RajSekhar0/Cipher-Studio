import React, { useState, useMemo, useEffect } from "react";
import Preview from "./components/Preview";
import CodeEditor from "./components/Editor";
import FileExplorer from "./components/FileExplorer";
import { saveProjectLocal, loadProjectLocal, listLocalProjects, deleteProjectLocal } from "./utils/storage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";

const getInitialTheme = () => localStorage.getItem("cipherstudio-theme") || "dark";
export default function App(){
  const [theme,setTheme] = useState(getInitialTheme);
  useEffect(()=>{ document.documentElement.setAttribute("data-theme", theme); localStorage.setItem("cipherstudio-theme", theme); },[theme]);

  const starter = {
    "/src/styles.css": `html,body,#root{height:100%;margin:0;padding:0}`,
    "/src/App.jsx": `export default function App(){ return (<div style={{padding:20}}><h1>Hello CipherStudio</h1><p>Edit and save</p></div>) }`,
    "/src/index.js": `import React from "react";import { createRoot } from "react-dom/client";import App from "./App";import "./styles.css";const root=createRoot(document.getElementById("root"));root.render(<App/>);`,
    "/package.json": JSON.stringify({ dependencies: { react:"latest", "react-dom":"latest" } })
  };

  const [files,setFiles] = useState(starter);
  const [projectName,setProjectName] = useState("My CipherStudio Project");
  const [savedList,setSavedList] = useState([]);
  const [activePath,setActivePath] = useState("/src/App.jsx");
  const [isExplorerOpen,setIsExplorerOpen] = useState(false);
  const [autoSave,setAutoSave] = useState(false);
  const [user,setUser] = useState(()=> JSON.parse(localStorage.getItem("cipherstudio-user")||"null"));
  const [token,setToken] = useState(()=> localStorage.getItem("cipherstudio-token")||null);

  // attach token to axios if present
  useEffect(()=>{
    if(token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete axios.defaults.headers.common["Authorization"];
  },[token]);

  useEffect(()=>{ (async ()=>{ const list = await listLocalProjects(); setSavedList(list); })() },[]);

  useEffect(()=>{
    if(!autoSave) return;
    const t = setInterval(()=>{ handleSave(); }, 10000);
    return ()=>clearInterval(t);
  },[autoSave, files, projectName]);

  function updateFileContent(path, newContent){ setFiles(prev=>({...prev,[path]:newContent})); }

  function createFile(name){
    const clean = name.startsWith("/src/")? name : `/src/${name}`;
    if(files[clean]) return alert("File exists");
    setFiles(prev=>({...prev,[clean]:"// new file\n"}));
    setActivePath(clean);
  }

  function deleteFile(path){
    if(!confirm("Delete file?")) return;
    setFiles(prev=>{ const c = {...prev}; delete c[path]; return c; });
    const remaining = Object.keys(files).filter(p=>p!==path && p.startsWith("/src/"));
    setActivePath(remaining[0] || "");
  }

  function renameFile(oldPath,newPath){
    setFiles(prev=>{
      if(prev[newPath]) return prev;
      const copy = {...prev};
      copy[newPath] = copy[oldPath];
      delete copy[oldPath];
      return copy;
    });
    if(activePath===oldPath) setActivePath(newPath);
  }

  function resetEditor(){ if(!confirm("Reset to default?")) return; setFiles(starter); setActivePath("/src/App.jsx"); }

  async function handleSave(){
    try{
      const project = { name:projectName, files };
      const id = await saveProjectLocal(project);
      const list = await listLocalProjects();
      setSavedList(list);
      if(id) console.log("Saved id:", id);
    }catch(e){
      console.error(e);
      alert("Save failed");
    }
  }

  async function handleLoad(id){
    const p = await loadProjectLocal(id);
    if(!p) return alert("Load failed");
    setFiles(p.files || {});
    setProjectName(p.name || "Loaded Project");
    setActivePath(Object.keys(p.files || {})[0] || "/src/App.jsx");
  }

  async function handleDelete(id){
    if(!confirm("Delete project permanently?")) return;
    await deleteProjectLocal(id);
    const list = await listLocalProjects();
    setSavedList(list);
  }

  const sandpackFiles = useMemo(()=>{
    const copy = {...files};
    if(!copy["/package.json"]) copy["/package.json"] = JSON.stringify({ dependencies:{react:"latest","react-dom":"latest"}});
    if(!copy["/src/index.js"]) copy["/src/index.js"] = starter["/src/index.js"];
    if(!copy["/src/styles.css"]) copy["/src/styles.css"] = starter["/src/styles.css"];
    return copy;
  },[files]);

  // If not logged-in show login/register quickly
  if(!user){
    return (
      <div style={{display:"flex",gap:20, padding:20}}>
        <div style={{flex:1}}><Login onLogin={(u)=>{ setUser(u); setToken(localStorage.getItem("cipherstudio-token")); }} /></div>
        <div style={{width:1, background:"var(--border)"}}/>
        <div style={{flex:1}}><Register /></div>
      </div>
    );
  }

  return (
    <>
      <button className="toggle-btn" onClick={()=>setIsExplorerOpen(v=>!v)}>{isExplorerOpen? "✕":"☰"}</button>
      <div className="app-shell" data-theme={theme}>
        <div className={`explorer ${isExplorerOpen? "show":""}`}>
          <div style={{flexGrow:1, display:"flex", flexDirection:"column"}}>
            <div className="brand">CipherStudio</div>
            <div style={{fontSize:12,color:"var(--text-secondary)", marginBottom:12}}>Full-Stack React IDE</div>

            <div style={{display:"flex", gap:8, marginBottom:12}}>
              <input className="small-input" value={projectName} onChange={(e)=>setProjectName(e.target.value)} />
              <button className="btn" onClick={()=>{ setToken(null); setUser(null); localStorage.removeItem("cipherstudio-token"); localStorage.removeItem("cipherstudio-user"); }}>Logout</button>
            </div>

            <div style={{display:"flex", gap:8, marginBottom:12}}>
              <button className="btn primary" onClick={handleSave}>💾 Save</button>
              <button className="btn" onClick={resetEditor}>♻ Reset</button>
              <button className="btn" onClick={()=>setAutoSave(s=>!s)}>{autoSave? "🟢 Autosave":"⚪ Autosave"}</button>
              <button className="btn" onClick={()=>setTheme(t=> t==="dark"?"light":"dark")}>{theme==="dark"?"☀️":"🌙"}</button>
            </div>

            <FileExplorer
              filesList={Object.keys(files).filter(p=>p.startsWith("/src/"))}
              activePath={activePath}
              onSelect={(p)=>{ setActivePath(p); if(window.innerWidth<1024) setIsExplorerOpen(false); }}
              onCreate={createFile}
              onDelete={deleteFile}
              onRename={renameFile}
            />
          </div>

          <div style={{marginTop:"auto"}}>
            <div style={{fontSize:13,color:"var(--text-secondary)", marginBottom:8}}>Saved Projects</div>
            {savedList.length===0 && <div style={{color:"var(--text-secondary)"}}>No saved projects</div>}
            {savedList.map(p=>(
              <div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center", padding:"6px 0"}}>
                <div>{p.name}</div>
                <div style={{display:"flex",gap:6}}>
                  <button className="btn" onClick={()=>handleLoad(p.id)}>Load</button>
                  <button className="btn" onClick={()=>handleDelete(p.id)}>Delete</button>
                </div>
              </div>
            ))}
            <div className="footer">© CipherStudio</div>
          </div>
        </div>

        <div className="editor-area">
          <div className="editor-header">
            <span>{activePath || "No file selected"}</span>
            <div>
              <button className="btn" onClick={resetEditor}>Reset</button>
            </div>
          </div>

          {activePath ? (
            <CodeEditor
              value={files[activePath] || ""}
              onChange={(v)=>updateFileContent(activePath, v)}
              language={activePath.endsWith(".css")? "css":"javascript"}
              currentTheme={theme}
            />
          ) : <div style={{padding:12,color:"var(--text-secondary)"}}>Select a file</div>}
        </div>

        <div className="preview-area">
          <div className="preview-area-header">Live Preview</div>
          <div className="preview-frame">
            <Preview files={sandpackFiles} currentTheme={theme} />
          </div>
        </div>
      </div>
    </>
  );
}
