import React from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ value, onChange, language="javascript", currentTheme }) {
  const monacoTheme = currentTheme === "dark" ? "vs-dark" : "light";

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        onChange={(v)=>onChange(v||"")}
        theme={monacoTheme}
        options={{
          fontSize:14,
          minimap:{enabled:false},
          wordWrap:"on",
          tabSize:2,
          scrollBeyondLastLine:false
        }}
      />
    </div>
  );
}
