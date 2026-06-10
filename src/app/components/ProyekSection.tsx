import type { Profile } from "../types";

const projectColors = [
  { from:"var(--th-p1)", to:"var(--th-p2)" },
  { from:"#3730A3", to:"#6366F1" },
  { from:"#B45309", to:"#D97706" },
  { from:"#065F46", to:"#059669" },
];

export function ProyekSection({ profile }: { profile: Profile }) {
  return (
    <div>
      <div style={{ background:"linear-gradient(135deg, var(--th-h1) 0%, var(--th-h2) 100%)", padding:"48px 0 52px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", bottom:-60, right:-60, width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, var(--th-p2b), transparent 65%)", filter:"blur(40px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize:"24px 24px", pointerEvents:"none" }} />
        <div className="max-w-4xl mx-auto px-6" style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
            <div style={{ width:32, height:3, background:"linear-gradient(90deg, var(--th-p2), var(--th-p3))", borderRadius:2 }} />
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:"var(--th-p2)" }}>Riset</span>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:700, color:"white" }}>Proyek Penelitian</h2>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6" style={{ padding:"48px 24px 72px" }}>
        {profile.projects.length === 0 ? (
          <div style={{ textAlign:"center", padding:"56px 24px", background:"white", borderRadius:16, border:"1.5px dashed #CBD5E1" }}>
            <div style={{ fontSize:44, marginBottom:12 }}>🔬</div>
            <div style={{ fontWeight:600, fontSize:15, color:"#4A5568" }}>Belum ada proyek penelitian</div>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {profile.projects.map((p, i) => {
              const c = projectColors[i % projectColors.length];
              return (
                <div
                  key={p.id}
                  style={{ background:"white", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.06)", border:"1px solid #EDF2F7", display:"flex", transition:"all 0.25s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.06)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.06)"; }}
                >
                  <div style={{ width:5, background:`linear-gradient(to bottom, ${c.from}, ${c.to})`, flexShrink:0 }} />
                  <div style={{ flex:1, padding:"22px 26px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10, marginBottom:10 }}>
                      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:"#071E3D", margin:0 }}>{p.title}</h3>
                      <span style={{ fontSize:12, fontWeight:600, color:"#6B7A8F", background:"#F1F5F9", padding:"4px 12px", borderRadius:8, whiteSpace:"nowrap" }}>{p.year}</span>
                    </div>
                    <div style={{ display:"inline-flex", alignItems:"center", gap:6, marginBottom:12 }}>
                      <div style={{ width:8, height:8, borderRadius:"50%", background:`linear-gradient(135deg, ${c.from}, ${c.to})` }} />
                      <span style={{ fontSize:12, fontWeight:700, color:"var(--th-p1)" }}>Dana: {p.funder}</span>
                    </div>
                    <p style={{ fontSize:14, color:"#4A5568", lineHeight:1.7, margin:0 }}>{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
