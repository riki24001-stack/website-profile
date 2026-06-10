import { useState } from "react";

interface LoginModalProps {
  onLogin: (password: string) => boolean;
  onClose: () => void;
}

export function LoginModal({ onLogin, onClose }: LoginModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 400));
    const ok = onLogin(password);
    if (!ok) { setError("Password salah. Coba lagi."); setPassword(""); }
    setLoading(false);
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(13,27,42,0.72)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: "white", borderRadius: 16, width: "100%", maxWidth: 340, padding: 32, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
      >
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, marginBottom: 6, color: "#0D1B2A" }}>
          Login Admin
        </h2>
        <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 20 }}>
          Masukkan password untuk mengelola konten.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleSubmit(e as any)}
            placeholder="Password"
            autoFocus
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, border: "1.5px solid #E8E4DC", borderRadius: 8, padding: "9px 12px", width: "100%", background: "#FAFAF8", color: "#0D1B2A", outline: "none", marginBottom: 6, boxSizing: "border-box" }}
            onFocus={e => e.target.style.borderColor = "#1A6B72"}
            onBlur={e => e.target.style.borderColor = "#E8E4DC"}
          />
          {error && <p style={{ fontSize: 12, color: "#DC2626", marginBottom: 12 }}>{error}</p>}

          <div style={{ display: "flex", gap: 10, marginTop: 10, marginBottom: 16 }}>
            <button
              type="submit"
              disabled={loading || !password}
              style={{ flex: 1, background: "#1A6B72", color: "white", border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 600, cursor: "pointer", opacity: loading || !password ? 0.6 : 1, transition: "background 0.15s" }}
              onMouseEnter={e => { if (!loading && password) e.currentTarget.style.background = "#155a60"; }}
              onMouseLeave={e => e.currentTarget.style.background = "#1A6B72"}
            >
              {loading ? "Memeriksa..." : "Masuk"}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{ flex: 1, background: "none", border: "1.5px solid #1A6B72", color: "#1A6B72", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#E4F0F1"}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              Batal
            </button>
          </div>
        </form>

        <p style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center" }}>
          Password default:{" "}
          <code style={{ background: "#F5F3EE", padding: "1px 5px", borderRadius: 4, fontSize: 11 }}>admin123</code>
        </p>
      </div>
    </div>
  );
}
