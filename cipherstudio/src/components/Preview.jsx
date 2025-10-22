import React, { useMemo, useEffect, useState } from "react";
import { SandpackProvider, SandpackLayout, SandpackPreview } from "@codesandbox/sandpack-react";

export default function Preview({ files, currentTheme }) {
  const projectFiles = useMemo(()=>files,[files]);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(()=>{
    const handleResize=()=>setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return ()=>window.removeEventListener("resize", handleResize);
  },[]);

  return (
    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column"}}>
      <SandpackProvider
        key={width + Object.keys(files).length}
        template="react"
        files={projectFiles}
        customSetup={{ dependencies: { react:"latest", "react-dom":"latest" } }}
      >
        <SandpackLayout style={{flex:1,height:"100%",minHeight:300,overflow:"hidden"}}>
          <SandpackPreview showOpenInCodeSandbox={false} showRefreshButton={true} style={{height:"100%"}} />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
