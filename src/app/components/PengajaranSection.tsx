import { Users, Clock, Star } from "lucide-react";
import type { Profile } from "../types";

export function PengajaranSection({ profile }: { profile: Profile }) {
  return (
    <div>
      <div style={{ background:"linear-gradient(135deg, var(--th-h1) 0%, var(--th-h2) 100%)", padding:"48px 0 52px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, left:-60, width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, var(--th-p2b), transparent 65%)", filter:"blur(40px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize:"24px 24px", pointerEvents:"none" }} />
        <div className="max-w-4xl mx-auto px-6" style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
            <div style={{ width:32, height:3, background:"linear-gradient(90deg, var(--th-p2), var(--th-p3))", borderRadius:2 }} />
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:"var(--th-p2)" }}>Akademik</span>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:700, color:"white" }}>Mata Kuliah</h2>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6" style={{ padding:"48px 24px 72px" }}>
        {profile.courses.length === 0 ? (
          <EmptyState icon="📖" text="Belum ada mata kuliah" />
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:16 }}>
            {profile.courses.map(c => (
              <div
                key={c.id}
                style={{ background:"white", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.06)", border:"1px solid #EDF2F7", transition:"all 0.25s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px var(--th-p1a),0 4px 8px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.06)"; }}
              >
                <div style={{ height:4, background:"linear-gradient(90deg, var(--th-p1), var(--th-p2), var(--th-p3))" }} />
                <div style={{ padding:"20px 22px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                    <span style={{ fontSize:12, fontWeight:700, color:"var(--th-p1)", background:"var(--th-pb)", padding:"4px 12px", borderRadius:6 }}>{c.code}</span>
                    <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                      <Star size={13} fill="#F59E0B" color="#F59E0B" />
                      <span style={{ fontSize:13, fontWeight:700, color:"#B45309" }}>{c.rating}</span>
                    </div>
                  </div>
                  <h3 style={{ fontSize:16, fontWeight:700, color:"#071E3D", marginBottom:4, fontFamily:"'Playfair Display',serif" }}>{c.name}</h3>
                  <p style={{ fontSize:13, color:"#6B7A8F", lineHeight:1.6, marginBottom:16 }}>{c.desc}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                    <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, color:"#94A3B8" }}>
                      <Users size={12} />{c.students} mhs
                    </span>
                    <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, color:"#94A3B8" }}>
                      <Clock size={12} />{c.hours} SKS
                    </span>
                    <span style={{ fontSize:11, fontWeight:700, marginLeft:"auto", padding:"3px 10px", borderRadius:20,
                      background: c.level === "S2" ? "var(--th-h1)" : c.level === "S1" ? "var(--th-pb)" : "#FEF3C7",
                      color: c.level === "S2" ? "white" : c.level === "S1" ? "var(--th-p1)" : "#92400E",
                    }}>
                      {c.level}
                    </span>
                  </div>
                  <div style={{ marginTop:10, fontSize:11, color:"#94A3B8", borderTop:"1px solid #F1F5F9", paddingTop:10 }}>
                    Semester {c.semester}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {profile.contact.officeHours && (
          <div style={{ marginTop:24, background:"linear-gradient(135deg, var(--th-pb), var(--th-pb))", borderRadius:14, padding:"18px 22px", border:"1px solid var(--th-p1a)", display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ fontSize:28, flexShrink:0 }}>🕐</div>
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:"var(--th-p1)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:2 }}>Office Hours</div>
              <div style={{ fontSize:14, color:"#0A5C64" }}>{profile.contact.officeHours}</div>
            </div>
          </div>
        )}
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
