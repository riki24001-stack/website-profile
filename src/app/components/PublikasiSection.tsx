import { ExternalLink } from "lucide-react";
import type { Profile, Publication } from "../types";

export function PublikasiSection({ profile }: { profile: Profile }) {
  const totalCited = profile.publications.reduce((s, p) => s + p.cited, 0);

  return (
    <div>
      <div style={{ background:"linear-gradient(135deg, var(--th-h1) 0%, var(--th-h2) 100%)", padding:"48px 0 52px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, var(--th-p2b), transparent 65%)", filter:"blur(40px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize:"24px 24px", pointerEvents:"none" }} />
        <div className="max-w-4xl mx-auto px-6" style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
            <div style={{ width:32, height:3, background:"linear-gradient(90deg, var(--th-p2), var(--th-p3))", borderRadius:2 }} />
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:"var(--th-p2)" }}>Karya Ilmiah</span>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:700, color:"white", marginBottom:8 }}>Publikasi Terbaru</h2>
          <div style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
            <Chip label={`${profile.publications.length} Publikasi`} />
            <Chip label={`${totalCited.toLocaleString()}+ Sitasi`} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6" style={{ padding:"40px 24px 72px" }}>
        {profile.publications.length === 0 ? (
          <EmptyState icon="📚" text="Belum ada publikasi" />
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {profile.publications.map(pub => <PubCard key={pub.id} pub={pub} />)}
          </div>
        )}
        <button
          style={{ marginTop:24, display:"inline-flex", alignItems:"center", gap:8, padding:"10px 20px", borderRadius:10, border:"1.5px solid var(--th-p1)", background:"transparent", color:"var(--th-p1)", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Inter',sans-serif", transition:"all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--th-pb)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
        >
          Lihat semua publikasi →
        </button>
      </div>
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return <span style={{ fontSize:12, padding:"4px 14px", borderRadius:20, background:"var(--th-p2b)", border:"1px solid var(--th-p2d)", color:"var(--th-p4)" }}>{label}</span>;
}

function PubCard({ pub }: { pub: Publication }) {
  return (
    <div
      style={{ display:"flex", borderRadius:14, overflow:"hidden", background:"white", boxShadow:"0 2px 8px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.06)", border:"1px solid #EDF2F7", transition:"all 0.25s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 20px rgba(0,0,0,0.08),0 20px 40px var(--th-p1a)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
    >
      <div style={{ width:4, flexShrink:0, background:"linear-gradient(to bottom, var(--th-p1), var(--th-p2), var(--th-p3))" }} />
      <div style={{ flex:1, padding:"20px 22px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16, flexWrap:"wrap" }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:10 }}>
              <span style={{ fontSize:11, fontWeight:700, color:"var(--th-p1)", background:"var(--th-pb)", padding:"2px 10px", borderRadius:20 }}>{pub.year}</span>
              {pub.tags.map(t => (
                <span key={t} style={{ fontSize:11, fontWeight:600, color:"var(--th-p1)", background:"var(--th-pb)", padding:"2px 10px", borderRadius:20, border:"1px solid var(--th-p1a)" }}>{t}</span>
              ))}
            </div>
            <div style={{ fontSize:15, fontWeight:600, lineHeight:1.55, color:"#071E3D", marginBottom:6 }}>{pub.title}</div>
            <div style={{ fontSize:13, color:"#6B7A8F", fontStyle:"italic", marginBottom:8 }}>{pub.journal}</div>
            <div style={{ display:"flex", gap:16, fontSize:12, color:"#94A3B8" }}>
              <span>👤 {pub.authors}</span>
              {pub.cited > 0 && <span>🔗 {pub.cited} sitasi</span>}
            </div>
          </div>
          <button style={{ padding:8, background:"none", border:"none", cursor:"pointer", color:"#CBD5E1", borderRadius:8, display:"flex", transition:"all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--th-p1)"; e.currentTarget.style.background = "var(--th-pb)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#CBD5E1"; e.currentTarget.style.background = "none"; }}
          >
            <ExternalLink size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ textAlign:"center", padding:"56px 24px", background:"white", borderRadius:16, border:"1.5px dashed #CBD5E1" }}>
      <div style={{ fontSize:44, marginBottom:12 }}>{icon}</div>
      <div style={{ fontWeight:600, fontSize:15, color:"#4A5568" }}>{text}</div>
    </div>
  );
}
