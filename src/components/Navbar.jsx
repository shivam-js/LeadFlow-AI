import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        background: "#111",
        color: "white",
      }}
    >
      <h2>LeadFlow AI</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}