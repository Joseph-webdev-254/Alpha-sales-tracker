import Create from "./components/admin/Create";
import User from "./components/User";
import { useState } from "react";
import "./components/index.css";
function App() {
  const [view, setView] = useState("create");

  return (
    <div>
      {view === "create" && <Create />}
      {view === "record" && <User />}

      {/* Floating Buttons */}
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#1e1f26",
          padding: "0.5rem 1rem",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          zIndex: 9999,
        }}
      >
        <button
          onClick={() => setView("create")}
          style={{
            backgroundColor: view === "create" ? "#00cec9" : "#3b3c47",
            color: "#fff",
            border: "none",
            padding: "0.6rem 1rem",
            borderRadius: "6px",
            marginRight: "0.5rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Admin View
        </button>
        <button
          onClick={() => setView("record")}
          style={{
            backgroundColor: view === "record" ? "#00cec9" : "#3b3c47",
            color: "#fff",
            border: "none",
            padding: "0.6rem 1rem",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          User View
        </button>
      </div>
    </div>
  );
}

export default App;
