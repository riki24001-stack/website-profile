import { useState } from "react";
import { Send, Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import type { Profile } from "../types";

export function KontakSection({ profile }: { profile: Profile }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name:"", email:"", subject:"", message:"" });
    setTimeout(() => setSent(false), 4000);
  };

  const { contact } = profile;

  const contactItems = [
    { icon: Mail, label:"Email Kampus", value: contact.email, href:`mailto:${contact.email}`, color:"var(--th-p1)", bg:"var(--th-pb)" },
    { icon: Phone, label:"Telepon", value: contact.phone, href:"#", color:"#3730A3", bg:"#EEF2FF" },
    { icon: MapPin, label:"Alamat", value: contact.address, href:"#", color:"#B45309", bg:"#FEF3C7" },
    { icon: Globe, label:"Scholar", value:"Profil Publikasi →", href: contact.scholar, color:"#065F46", bg:"#D1FAE5" },
  ];

  return (
    <div>
      <div style={{ background:"linear-gradient(135deg, var(--th-h1) 0%, var(--th-h2) 100%)", padding:"48px 0 52px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, var(--th-p2b), transparent 65%)", filter:"blur(40px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize:"24px 24px", pointerEvents:"none" }} />
        <div className="max-w-4xl mx-auto px-6" style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
            <div style={{ width:32, height:3, background:"linear-gradient(90deg, var(--th-p2), var(--th-p3))", borderRadius:2 }} />
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:"var(--th-p2)" }}>Hubungi</span>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:700, color:"white" }}>Kontak</h2>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6" style={{ padding:"48px 24px 72px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:12, marginBottom:20 }}>
          {contactItems.map(({ icon: Icon, label, value, href, color, bg }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{ background:"white", borderRadius:14, padding:"20px 18px", textDecoration:"none", display:"block", boxShadow:"0 2px 8px rgba(0,0,0,0.04),0 6px 20px rgba(0,0,0,0.06)", border:"1px solid #EDF2F7", transition:"all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.06)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04),0 6px 20px rgba(0,0,0,0.06)"; }}
            >
              <div style={{ width:44, height:44, borderRadius:12, background:bg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
                <Icon size={20} color={color} />
              </div>
              <div style={{ fontSize:11, fontWeight:700, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>{label}</div>
              <div style={{ fontSize:13, color, fontWeight:600, wordBreak:"break-all" }}>{value}</div>
            </a>
          ))}
        </div>

        <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
          <SocialBtn href={contact.linkedin} icon={<Linkedin size={15} />} label="LinkedIn" />
          <SocialBtn href={contact.github} icon={<Github size={15} />} label="GitHub" />
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:16 }}>
          <div style={{ background:"linear-gradient(135deg, var(--th-h1), var(--th-h2))", borderRadius:16, padding:"28px 24px", color:"white", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"radial-gradient(circle, var(--th-p2c), transparent)", filter:"blur(30px)", pointerEvents:"none" }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ width:48, height:48, borderRadius:14, background:"var(--th-p2b)", border:"1px solid var(--th-p2d)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                <Send size={22} color="var(--th-p2)" />
              </div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"white", marginBottom:10 }}>
                Ingin berkolaborasi?
              </h3>
              <p style={{ fontSize:13.5, color:"rgba(255,255,255,0.6)", lineHeight:1.7, margin:0 }}>
                Terbuka untuk kolaborasi penelitian, bimbingan skripsi/tesis, dan diskusi akademik. Respon email 1–2 hari kerja.
              </p>
              {contact.officeHours && (
                <div style={{ marginTop:18, padding:"10px 14px", background:"var(--th-p2b)", borderRadius:10, border:"1px solid var(--th-p2d)" }}>
                  <div style={{ fontSize:10, fontWeight:700, color:"var(--th-p2)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:3 }}>Office Hours</div>
                  <div style={{ fontSize:12.5, color:"rgba(255,255,255,0.7)" }}>{contact.officeHours}</div>
                </div>
              )}
            </div>
          </div>

          <div style={{ background:"white", borderRadius:16, padding:"28px 24px", boxShadow:"0 2px 8px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.06)", border:"1px solid #EDF2F7" }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"#071E3D", marginBottom:20 }}>Kirim Pesan</h3>
            {sent ? (
              <div style={{ textAlign:"center", padding:"28px 0" }}>
                <div style={{ width:64, height:64, borderRadius:"50%", background:"linear-gradient(135deg, var(--th-p1), var(--th-p2))", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
                  <Send size={28} color="white" />
                </div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700, color:"#071E3D", marginBottom:6 }}>Pesan terkirim!</div>
                <div style={{ fontSize:13, color:"#6B7A8F" }}>Kami akan merespons dalam 1–2 hari kerja.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <FormField label="Nama" value={form.name} onChange={v => setForm(p => ({ ...p, name:v }))} placeholder="Nama lengkap" />
                  <FormField label="Email" type="email" value={form.email} onChange={v => setForm(p => ({ ...p, email:v }))} placeholder="email@example.com" />
                </div>
                <FormField label="Subjek" value={form.subject} onChange={v => setForm(p => ({ ...p, subject:v }))} placeholder="Topik pesan" />
                <div>
                  <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>Pesan</label>
                  <textarea required rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message:e.target.value }))} placeholder="Tulis pesan Anda..." style={{ ...inp, resize:"vertical", minHeight:90 }} onFocus={e => e.target.style.borderColor = "var(--th-p1)"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
                </div>
                <button type="submit"
                  style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"linear-gradient(135deg, var(--th-p1), var(--th-p2))", color:"white", border:"none", borderRadius:10, padding:"12px 20px", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"'Inter',sans-serif", boxShadow:"0 4px 14px var(--th-p1c)", transition:"all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 20px var(--th-p1b)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 14px var(--th-p1c)"; }}
                >
                  <Send size={16} />Kirim Pesan
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return (
    <div>
      <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>{label}</label>
      <input required type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inp}
        onFocus={e => e.target.style.borderColor = "var(--th-p1)"}
        onBlur={e => e.target.style.borderColor = "#E2E8F0"}
      />
    </div>
  );
}

function SocialBtn({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"8px 16px", background:"white", border:"1.5px solid #E2E8F0", borderRadius:10, textDecoration:"none", fontSize:13, fontWeight:600, color:"#4A5568", boxShadow:"0 2px 6px rgba(0,0,0,0.04)", transition:"all 0.15s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--th-p1)"; (e.currentTarget as HTMLElement).style.color = "var(--th-p1)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E2E8F0"; (e.currentTarget as HTMLElement).style.color = "#4A5568"; }}
    >
      {icon}{label}
    </a>
  );
}

const inp: React.CSSProperties = {
  fontFamily:"'Inter',sans-serif", fontSize:13, border:"1.5px solid #E2E8F0", borderRadius:8,
  padding:"9px 12px", width:"100%", background:"#FAFAFA", color:"#071E3D",
  outline:"none", boxSizing:"border-box", transition:"border 0.15s",
};
