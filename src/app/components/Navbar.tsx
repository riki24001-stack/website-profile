import { Lock, LogOut, Pencil } from "lucide-react";

export type Tab = "tentang" | "publikasi" | "dokumen" | "pengajaran" | "proyek" | "kontak";

const tabs: { id: Tab; label: string }[] = [
  { id:"tentang", label:"Tentang" },
  { id:"publikasi", label:"Publikasi" },
  { id:"dokumen", label:"Dokumen" },
  { id:"pengajaran", label:"Pengajaran" },
  { id:"proyek", label:"Proyek" },
  { id:"kontak", label:"Kontak" },
];

interface NavbarProps {
  name: string;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onAdminClick: () => void;
  onEditProfile: () => void;
  isAdmin: boolean;
}

export function Navbar({ name, activeTab, onTabChange, onAdminClick, onEditProfile, isAdmin }: NavbarProps) {
  return (
    <header style={{ position:"sticky", top:0, zIndex:100, background:"rgba(255,255,255,0.97)", backdropFilter:"blur(12px)", borderBottom:"1px solid #E8EEF4", boxShadow:"0 1px 12px rgba(7,30,61,0.06)" }}>
      <div className="max-w-4xl mx-auto px-6" style={{ height:56, display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
        <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:16, color:"var(--th-h1)", whiteSpace:"nowrap", letterSpacing:"-0.01em" }}>
          {name}
        </span>

        {/* Desktop nav — hidden on mobile via Tailwind, no inline display override */}
        <nav className="hidden md:flex" style={{ alignItems:"center", gap:2 }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => onTabChange(tab.id)}
              style={{
                fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:500, padding:"6px 13px", borderRadius:8, border:"none", cursor:"pointer", transition:"all 0.15s",
                background: activeTab===tab.id ? "linear-gradient(135deg, var(--th-h1), var(--th-p1))" : "none",
                color: activeTab===tab.id ? "white" : "#6B7A8F",
                boxShadow: activeTab===tab.id ? "0 3px 10px var(--th-p1c)" : "none",
              }}
              onMouseEnter={e=>{ if(activeTab!==tab.id){ e.currentTarget.style.background="var(--th-pb)"; e.currentTarget.style.color="var(--th-p1)"; } }}
              onMouseLeave={e=>{ if(activeTab!==tab.id){ e.currentTarget.style.background="none"; e.currentTarget.style.color="#6B7A8F"; } }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
          {isAdmin && (
            <button onClick={onEditProfile}
              style={{ display:"flex", alignItems:"center", gap:6, fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:600, padding:"6px 14px", borderRadius:8, border:"1.5px solid var(--th-p1b)", background:"var(--th-pb)", color:"var(--th-p1)", cursor:"pointer", transition:"all 0.15s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="var(--th-p1)"; e.currentTarget.style.color="white"; e.currentTarget.style.boxShadow="0 4px 12px var(--th-p1c)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="var(--th-pb)"; e.currentTarget.style.color="var(--th-p1)"; e.currentTarget.style.boxShadow="none"; }}
            >
              <Pencil size={13} />Edit Profil
            </button>
          )}
          <button onClick={onAdminClick}
            style={{ display:"flex", alignItems:"center", gap:6, fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:600, padding:"6px 14px", borderRadius:8, cursor:"pointer", transition:"all 0.15s",
              background: isAdmin ? "#FEF2F2" : "linear-gradient(135deg, var(--th-h1), var(--th-p1))",
              color: isAdmin ? "#DC2626" : "white",
              border: isAdmin ? "1.5px solid #FECACA" : "none",
              boxShadow: isAdmin ? "none" : "0 3px 10px var(--th-p1c)",
            }}
          >
            {isAdmin ? <LogOut size={13} /> : <Lock size={13} />}
            {isAdmin ? "Logout" : "Admin"}
          </button>
        </div>
      </div>

      {/* Mobile nav — flex on mobile, hidden on md+ via Tailwind, no inline display override */}
      <div className="flex md:hidden" style={{ overflowX:"auto", padding:"0 16px 10px", gap:6 }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => onTabChange(tab.id)}
            style={{ fontFamily:"'Inter',sans-serif", fontSize:12, fontWeight:500, padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.15s",
              background: activeTab===tab.id ? "linear-gradient(135deg, var(--th-h1), var(--th-p1))" : "#F1F5F9",
              color: activeTab===tab.id ? "white" : "#6B7A8F",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
}
