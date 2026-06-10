import type { Profile } from "../types";

export function TentangSection({ profile }: { profile: Profile }) {
  return (
    <div>
      {/* ── HERO ── */}
      <div style={{ position:"relative", overflow:"hidden", background:"linear-gradient(135deg, var(--th-h1) 0%, var(--th-h2) 45%, var(--th-h3) 100%)", padding:"80px 0 64px" }}>
        <div style={{ position:"absolute", top:-100, right:-80, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, var(--th-p2c), transparent 65%)", filter:"blur(60px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-120, left:-60, width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle, var(--th-p2b), transparent 65%)", filter:"blur(50px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:30, right:"12%", width:180, height:180, borderRadius:"50%", border:"1px solid var(--th-p2c)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:55, right:"15%", width:100, height:100, borderRadius:"50%", border:"1px solid var(--th-p2b)", pointerEvents:"none" }} />

        <div className="max-w-4xl mx-auto px-6" style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"flex", gap:40, alignItems:"center", flexWrap:"wrap" }}>
            {/* Avatar */}
            <div style={{ position:"relative", flexShrink:0 }}>
              <div style={{ width:120, height:120, borderRadius:"50%", padding:3, background:"linear-gradient(135deg, var(--th-p2), var(--th-p3), var(--th-p2))", boxShadow:"0 0 0 6px var(--th-p2b), 0 20px 60px rgba(0,0,0,0.4)" }}>
                <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"linear-gradient(135deg, var(--th-p1), var(--th-p2))", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
                  {profile.photo
                    ? <img src={profile.photo} alt={profile.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    : <span style={{ fontFamily:"'Playfair Display',serif", fontSize:38, fontWeight:700, color:"white" }}>{profile.initials}</span>}
                </div>
              </div>
              <div style={{ position:"absolute", bottom:4, right:4, width:22, height:22, borderRadius:"50%", background:"var(--th-p3)", border:"3px solid var(--th-h1)", boxShadow:"0 2px 8px rgba(0,0,0,0.3)" }} />
            </div>

            {/* Info */}
            <div style={{ flex:1, minWidth:220 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"var(--th-p2b)", border:"1px solid var(--th-p2d)", borderRadius:20, padding:"4px 14px", marginBottom:14 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"var(--th-p3)" }} />
                <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--th-p2)" }}>{profile.badge}</span>
              </div>
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:40, fontWeight:700, color:"white", lineHeight:1.1, marginBottom:8 }}>
                {profile.name}
              </h1>
              <div style={{ fontSize:14, color:"rgba(255,255,255,0.5)", marginBottom:18, letterSpacing:"0.01em" }}>
                {profile.department} · {profile.university}
              </div>
              <p style={{ fontSize:14.5, lineHeight:1.8, color:"rgba(255,255,255,0.72)", maxWidth:520, marginBottom:22 }}>
                {profile.bio}
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {profile.skills.map(skill => (
                  <span key={skill} style={{ fontSize:12, padding:"5px 14px", borderRadius:20, border:"1px solid var(--th-p2d)", color:"var(--th-p4)", background:"var(--th-p2a)", letterSpacing:"0.01em" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ background:"white", borderBottom:"1px solid #E8EEF4" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div style={{ display:"grid", gridTemplateColumns:`repeat(${profile.stats.length},1fr)` }}>
            {profile.stats.map((stat, i) => (
              <div key={stat.id} style={{ padding:"28px 16px", textAlign:"center", borderRight:i < profile.stats.length-1 ? "1px solid #EDF2F7" : "none", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", height:3, width:40, background:"linear-gradient(90deg, var(--th-p1), var(--th-p2))", borderRadius:"0 0 4px 4px" }} />
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:700, background:"linear-gradient(135deg, var(--th-h3), var(--th-p2))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize:11.5, color:"#6B7A8F", marginTop:4, fontWeight:500, letterSpacing:"0.03em" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PENDIDIKAN ── */}
      <div className="max-w-4xl mx-auto px-6" style={{ padding:"72px 24px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
          <div style={{ width:32, height:3, background:"linear-gradient(90deg, var(--th-p1), var(--th-p2))", borderRadius:2 }} />
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:"var(--th-p1)" }}>Latar Belakang</span>
        </div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, background:"linear-gradient(135deg, var(--th-h1), var(--th-p1))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:32 }}>
          Riwayat Pendidikan
        </h2>

        <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {profile.education.map((edu, i) => {
              const isLast = i === profile.education.length - 1;
              return (
                <div key={edu.id} style={{ display:"flex", gap:20, alignItems:"flex-start", paddingBottom: isLast ? 0 : 28, position:"relative" }}>
                  {/* Connector line to next item — only between circles, not past the last one */}
                  {!isLast && (
                    <div style={{ position:"absolute", left:24, top:48, height:28, width:2, background:"linear-gradient(to bottom, var(--th-p2), var(--th-p1))", transform:"translateX(-50%)" }} />
                  )}
                  <div style={{ width:48, height:48, borderRadius:"50%", background:"linear-gradient(135deg, var(--th-p1), var(--th-p2))", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 4px 14px var(--th-p1c)", border:"3px solid white", position:"relative", zIndex:1 }}>
                    <span style={{ fontFamily:"'Playfair Display',serif", fontSize:13, fontWeight:700, color:"white" }}>{edu.year.slice(-2)}</span>
                  </div>
                  <div style={{ background:"white", borderRadius:14, padding:"16px 20px", flex:1, boxShadow:"0 2px 8px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.06)", border:"1px solid #EDF2F7" }}>
                    <div style={{ fontSize:15, fontWeight:600, color:"#071E3D" }}>{edu.degree}</div>
                    <div style={{ fontSize:13, color:"#6B7A8F", marginTop:4 }}>{edu.school}</div>
                    <div style={{ display:"inline-block", marginTop:8, fontSize:11, fontWeight:700, color:"var(--th-p1)", background:"var(--th-pb)", padding:"2px 10px", borderRadius:20 }}>{edu.year}</div>
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    </div>
  );
}
