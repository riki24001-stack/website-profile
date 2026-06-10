import { useState } from "react";
import { X, Plus, Trash2, Save, CheckCircle } from "lucide-react";
import type { Profile, Education, ResearchArea, Stat, Publication, Course, Project, Theme } from "../types";

const PRESETS: { name: string; emoji: string; theme: Theme }[] = [
  { name:"Samudera", emoji:"🌊", theme:{ pageBg:"#F0F4F8", h1:"#071E3D", h2:"#0D3352", h3:"#0A5C64", p1:"#1A6B72", p2:"#2A9D8F", p3:"#14B8A6", p4:"#6EE7DF", pb:"#E6F6F5" } },
  { name:"Hutan",    emoji:"🌿", theme:{ pageBg:"#F0F7F2", h1:"#0B2015", h2:"#0F3020", h3:"#0D4A1A", p1:"#166534", p2:"#16A34A", p3:"#22C55E", p4:"#86EFAC", pb:"#DCFCE7" } },
  { name:"Kerajaan", emoji:"💜", theme:{ pageBg:"#F4F4FD", h1:"#1E1B4B", h2:"#2D2870", h3:"#3730A3", p1:"#4338CA", p2:"#6366F1", p3:"#818CF8", p4:"#C7D2FE", pb:"#EEF2FF" } },
  { name:"Senja",    emoji:"🌅", theme:{ pageBg:"#FFF8F0", h1:"#1C0A00", h2:"#3D1A00", h3:"#5C2800", p1:"#C2410C", p2:"#EA580C", p3:"#F97316", p4:"#FED7AA", pb:"#FFF7ED" } },
  { name:"Biru",     emoji:"🔷", theme:{ pageBg:"#F0F4FF", h1:"#0A0F2C", h2:"#0D1F4A", h3:"#0F2E6B", p1:"#1D4ED8", p2:"#3B82F6", p3:"#60A5FA", p4:"#BFDBFE", pb:"#EFF6FF" } },
  { name:"Merah",    emoji:"❤️", theme:{ pageBg:"#FFF5F5", h1:"#1A0000", h2:"#3D0A0A", h3:"#7F1D1D", p1:"#B91C1C", p2:"#DC2626", p3:"#EF4444", p4:"#FCA5A5", pb:"#FEF2F2" } },
];

const BG_OPTIONS = [
  { label:"Abu-abu Biru", value:"#F0F4F8" },
  { label:"Putih Bersih", value:"#FFFFFF" },
  { label:"Krim Hangat",  value:"#FBF9F6" },
  { label:"Mint Lembut",  value:"#F0F9F7" },
  { label:"Biru Muda",    value:"#EFF6FF" },
  { label:"Abu-abu",      value:"#F8FAFC" },
  { label:"Ungu Muda",    value:"#F5F4FF" },
  { label:"Cream Muda",   value:"#FFFDF7" },
];

interface ProfileEditorProps {
  profile: Profile;
  onSave: (profile: Profile) => void;
  onClose: () => void;
}

type Section = "identitas" | "foto" | "statistik" | "pendidikan" | "publikasi" | "pengajaran" | "proyek" | "kontak" | "tema";

const sectionList: { id: Section; label: string; icon: string }[] = [
  { id: "identitas", label: "Identitas", icon: "👤" },
  { id: "foto", label: "Foto & Minat", icon: "🖼️" },
  { id: "statistik", label: "Statistik", icon: "📊" },
  { id: "pendidikan", label: "Pendidikan", icon: "🎓" },
  { id: "publikasi", label: "Publikasi", icon: "📚" },
  { id: "pengajaran", label: "Mata Kuliah", icon: "📖" },
  { id: "proyek", label: "Proyek", icon: "🔬" },
  { id: "kontak", label: "Kontak", icon: "✉️" },
  { id: "tema", label: "Tema", icon: "🎨" },
];

const inputStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif", fontSize: 13, border: "1.5px solid #E8E4DC", borderRadius: 8,
  padding: "9px 12px", width: "100%", background: "#FAFAF8", color: "#0D1B2A",
  outline: "none", boxSizing: "border-box" as const, transition: "border 0.15s",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>{children}</div>;
}

export function ProfileEditor({ profile, onSave, onClose }: ProfileEditorProps) {
  const [draft, setDraft] = useState<Profile>(JSON.parse(JSON.stringify(profile)));
  const [section, setSection] = useState<Section>("identitas");
  const [saved, setSaved] = useState(false);

  const up = <K extends keyof Profile>(k: K, v: Profile[K]) => setDraft(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    onSave(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(13,27,42,0.72)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex" }} onClick={onClose}>
      <div style={{ marginLeft: "auto", width: "100%", maxWidth: 860, background: "white", display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderBottom: "1.5px solid #F0EDE7" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#1A6B72", marginBottom: 3 }}>Mode Admin</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#0D1B2A" }}>Edit Profil</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleSave}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif", transition: "all 0.15s", background: saved ? "#E4F0F1" : "#1A6B72", color: saved ? "#1A6B72" : "white" }}
            >
              {saved ? <><CheckCircle size={15} /> Tersimpan!</> : <><Save size={15} /> Simpan Profil</>}
            </button>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 10px", borderRadius: 8, fontSize: 18, color: "#9CA3AF", lineHeight: 1, transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#F5F3EE"; e.currentTarget.style.color = "#0D1B2A"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#9CA3AF"; }}
            >✕</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", padding: "0 28px", borderBottom: "1.5px solid #F0EDE7", overflowX: "auto" }}>
          {sectionList.map(s => (
            <button key={s.id} onClick={() => setSection(s.id)}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: section === s.id ? "#1A6B72" : "#9CA3AF", padding: "12px 14px", borderBottom: `2.5px solid ${section === s.id ? "#1A6B72" : "transparent"}`, marginBottom: -1.5, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 5, transition: "all 0.15s" }}
            >{s.icon} {s.label}</button>
          ))}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {section === "identitas" && <IdentitasTab draft={draft} up={up} />}
          {section === "foto" && <FotoTab draft={draft} up={up} />}
          {section === "statistik" && <StatistikTab draft={draft} up={up} />}
          {section === "pendidikan" && <PendidikanTab draft={draft} up={up} />}
          {section === "publikasi" && <PublikasiTab draft={draft} up={up} />}
          {section === "pengajaran" && <PengajaranTab draft={draft} up={up} />}
          {section === "proyek" && <ProyekTab draft={draft} up={up} />}
          {section === "kontak" && <KontakTab draft={draft} up={up} />}
          {section === "tema" && <TemaTab draft={draft} up={up} />}
        </div>
      </div>
    </div>
  );
}

function IdentitasTab({ draft, up }: { draft: Profile; up: any }) {
  return (
    <div>
      <Row>
        <Field label="Nama Lengkap"><input style={inputStyle} value={draft.name} onChange={e => up("name", e.target.value)} /></Field>
        <Field label="Gelar / Jabatan"><input style={inputStyle} value={draft.badge} onChange={e => up("badge", e.target.value)} placeholder="Dosen & Peneliti" /></Field>
      </Row>
      <Row>
        <Field label="Departemen"><input style={inputStyle} value={draft.department} onChange={e => up("department", e.target.value)} /></Field>
        <Field label="Universitas"><input style={inputStyle} value={draft.university} onChange={e => up("university", e.target.value)} /></Field>
      </Row>
      <Field label="Inisial Avatar (maks 3 huruf)">
        <input style={{ ...inputStyle, maxWidth: 100 }} value={draft.initials} maxLength={3} onChange={e => up("initials", e.target.value.toUpperCase())} />
      </Field>
      <Field label="Bio">
        <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 110 }} value={draft.bio} onChange={e => up("bio", e.target.value)} />
        <div style={{ fontSize: 11, color: "#9CA3AF", textAlign: "right", marginTop: 3 }}>{draft.bio.length} karakter</div>
      </Field>
    </div>
  );
}

function FotoTab({ draft, up }: { draft: Profile; up: any }) {
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !draft.skills.includes(s)) { up("skills", [...draft.skills, s]); setSkillInput(""); }
  };

  const handlePhoto = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = e => up("photo", e.target!.result as string);
    r.readAsDataURL(file);
  };

  return (
    <div>
      <Field label="Foto Profil">
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ width: 88, height: 88, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "3px solid #E8E4DC", background: "linear-gradient(135deg,#1A6B72,#2A9D8F)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {draft.photo
              ? <img src={draft.photo} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "white" }}>{draft.initials}</span>}
          </div>
          <div>
            <div
              onClick={() => document.getElementById("photoInput")?.click()}
              onDragOver={e => { e.preventDefault(); (e.currentTarget as HTMLElement).style.borderColor = "#1A6B72"; }}
              onDragLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#D1D5DB"; }}
              onDrop={e => { e.preventDefault(); (e.currentTarget as HTMLElement).style.borderColor = "#D1D5DB"; if (e.dataTransfer.files[0]) handlePhoto(e.dataTransfer.files[0]); }}
              style={{ border: "2px dashed #D1D5DB", borderRadius: 12, padding: "16px 24px", textAlign: "center", cursor: "pointer", background: "#FAFAF8", transition: "all 0.15s" }}
            >
              <div style={{ fontSize: 22, marginBottom: 4 }}>🖼️</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Klik atau seret foto</div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>JPG, PNG · Maks 4 MB</div>
            </div>
            <input id="photoInput" type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handlePhoto(e.target.files[0])} />
            {draft.photo && (
              <button onClick={() => up("photo", null)} style={{ marginTop: 8, background: "#FEE2E2", color: "#DC2626", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Hapus Foto</button>
            )}
          </div>
        </div>
      </Field>

      <div style={{ height: 1, background: "#F0EDE7", margin: "20px 0" }} />

      <Field label="Bidang Minat / Keahlian">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12, minHeight: 36 }}>
          {draft.skills.map(skill => (
            <span key={skill} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, padding: "5px 12px 5px 14px", borderRadius: 20, background: "#E4F0F1", color: "#1A6B72", border: "1.5px solid #B8D8DA" }}>
              {skill}
              <button onClick={() => up("skills", draft.skills.filter(s => s !== skill))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "#1A6B72", opacity: 0.5, padding: 0, lineHeight: 1, display: "flex" }}>×</button>
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input style={{ ...inputStyle, flex: 1 }} value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addSkill()} placeholder="Tambah keahlian baru… lalu Enter" />
          <button onClick={addSkill} style={{ background: "#1A6B72", color: "white", border: "none", borderRadius: 8, padding: "9px 14px", cursor: "pointer" }}><Plus size={15} /></button>
        </div>
      </Field>
    </div>
  );
}

function StatistikTab({ draft, up }: { draft: Profile; up: any }) {
  const updateStat = (id: string, key: keyof Stat, val: string) => up("stats", draft.stats.map(s => s.id === id ? { ...s, [key]: val } : s));
  return (
    <div>
      <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 16 }}>Angka yang ditampilkan di stats bar bawah hero.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px,1fr))", gap: 12 }}>
        {draft.stats.map((s, i) => (
          <div key={s.id} style={{ position: "relative", background: "#F5F3EE", borderRadius: 12, padding: "16px 14px 14px", border: "1.5px solid #E8E4DC" }}>
            <input value={s.value} onChange={e => updateStat(s.id, "value", e.target.value)} placeholder="42" style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#1A6B72", border: "none", background: "transparent", padding: 0, width: "100%", textAlign: "center", outline: "none", borderBottom: "1.5px solid transparent" }} onFocus={e => e.target.style.borderBottomColor = "#1A6B72"} onBlur={e => e.target.style.borderBottomColor = "transparent"} />
            <input value={s.label} onChange={e => updateStat(s.id, "label", e.target.value)} placeholder="Label" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B7280", border: "none", background: "transparent", padding: 0, width: "100%", textAlign: "center", outline: "none", borderBottom: "1.5px solid transparent", marginTop: 6 }} onFocus={e => e.target.style.borderBottomColor = "#D1D5DB"} onBlur={e => e.target.style.borderBottomColor = "transparent"} />
            <button onClick={() => up("stats", draft.stats.filter((_, j) => j !== i))} style={{ position: "absolute", top: 5, right: 5, background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#D1D5DB", padding: 2, borderRadius: 4, lineHeight: 1 }} onMouseEnter={e => { e.currentTarget.style.background = "#FEE2E2"; e.currentTarget.style.color = "#DC2626"; }} onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#D1D5DB"; }}>✕</button>
          </div>
        ))}
        <button onClick={() => up("stats", [...draft.stats, { id: crypto.randomUUID(), value: "0", label: "Label Baru" }])} style={{ background: "none", border: "2px dashed #D1D5DB", borderRadius: 12, padding: 16, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, color: "#9CA3AF", fontSize: 12, fontWeight: 600, fontFamily: "'Inter', sans-serif", minHeight: 90, transition: "all 0.15s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#1A6B72"; e.currentTarget.style.color = "#1A6B72"; e.currentTarget.style.background = "#E4F0F1"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.color = "#9CA3AF"; e.currentTarget.style.background = "none"; }}>
          <span style={{ fontSize: 22 }}>＋</span><span>Tambah</span>
        </button>
      </div>
    </div>
  );
}

function PendidikanTab({ draft, up }: { draft: Profile; up: any }) {
  const updateEdu = (id: string, key: keyof Education, val: string) => up("education", draft.education.map(e => e.id === id ? { ...e, [key]: val } : e));
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <AddBtn onClick={() => up("education", [...draft.education, { id: crypto.randomUUID(), degree: "", school: "", year: "" }])} />
      </div>
      {draft.education.map(edu => (
        <Card key={edu.id} onRemove={() => up("education", draft.education.filter(e => e.id !== edu.id))}>
          <Row>
            <Field label="Gelar / Program Studi"><input style={inputStyle} value={edu.degree} onChange={e => updateEdu(edu.id, "degree", e.target.value)} placeholder="Ph.D. Ilmu Komputer" /></Field>
            <Field label="Tahun Lulus"><input style={inputStyle} value={edu.year} onChange={e => updateEdu(edu.id, "year", e.target.value)} placeholder="2010" /></Field>
          </Row>
          <Field label="Universitas / Institusi"><input style={inputStyle} value={edu.school} onChange={e => updateEdu(edu.id, "school", e.target.value)} placeholder="Universitas Indonesia" /></Field>
        </Card>
      ))}
    </div>
  );
}

function PublikasiTab({ draft, up }: { draft: Profile; up: any }) {
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({});
  const updatePub = (id: string, key: keyof Publication, val: any) => up("publications", draft.publications.map(p => p.id === id ? { ...p, [key]: val } : p));
  const addTag = (pubId: string) => {
    const tag = (tagInputs[pubId] ?? "").trim();
    const pub = draft.publications.find(p => p.id === pubId);
    if (tag && pub && !pub.tags.includes(tag)) { updatePub(pubId, "tags", [...pub.tags, tag]); setTagInputs(prev => ({ ...prev, [pubId]: "" })); }
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <AddBtn onClick={() => up("publications", [{ id: crypto.randomUUID(), title: "", journal: "", year: new Date().getFullYear(), authors: "", tags: [], cited: 0 }, ...draft.publications])} />
      </div>
      {draft.publications.map(pub => (
        <Card key={pub.id} onRemove={() => up("publications", draft.publications.filter(p => p.id !== pub.id))}>
          <Field label="Judul Paper"><input style={inputStyle} value={pub.title} onChange={e => updatePub(pub.id, "title", e.target.value)} /></Field>
          <Field label="Jurnal / Konferensi"><input style={inputStyle} value={pub.journal} onChange={e => updatePub(pub.id, "journal", e.target.value)} /></Field>
          <Row>
            <Field label="Penulis"><input style={inputStyle} value={pub.authors} onChange={e => updatePub(pub.id, "authors", e.target.value)} /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Field label="Tahun"><input style={inputStyle} type="number" value={pub.year} onChange={e => updatePub(pub.id, "year", parseInt(e.target.value))} /></Field>
              <Field label="Sitasi"><input style={inputStyle} type="number" value={pub.cited} onChange={e => updatePub(pub.id, "cited", parseInt(e.target.value))} /></Field>
            </div>
          </Row>
          <Field label="Tag">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {pub.tags.map(tag => (
                <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, padding: "3px 10px 3px 12px", borderRadius: 20, background: "#E4F0F1", color: "#1A6B72" }}>
                  {tag}<button onClick={() => updatePub(pub.id, "tags", pub.tags.filter(t => t !== tag))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#1A6B72", opacity: 0.5, padding: 0, lineHeight: 1 }}>×</button>
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <input style={{ ...inputStyle, flex: 1 }} value={tagInputs[pub.id] ?? ""} onChange={e => setTagInputs(prev => ({ ...prev, [pub.id]: e.target.value }))} onKeyDown={e => e.key === "Enter" && addTag(pub.id)} placeholder="Tambah tag… Enter" />
              <button onClick={() => addTag(pub.id)} style={{ background: "#E4F0F1", color: "#1A6B72", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer" }}><Plus size={14} /></button>
            </div>
          </Field>
        </Card>
      ))}
    </div>
  );
}

function PengajaranTab({ draft, up }: { draft: Profile; up: any }) {
  const updateCourse = (id: string, key: keyof Course, val: any) => up("courses", draft.courses.map(c => c.id === id ? { ...c, [key]: val } : c));
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <AddBtn onClick={() => up("courses", [...draft.courses, { id: crypto.randomUUID(), code: "", name: "", semester: "", students: 0, hours: 3, desc: "", rating: 4.5, level: "S1" }])} />
      </div>
      {draft.courses.map(c => (
        <Card key={c.id} onRemove={() => up("courses", draft.courses.filter(x => x.id !== c.id))}>
          <Row>
            <Field label="Kode MK"><input style={inputStyle} value={c.code} onChange={e => updateCourse(c.id, "code", e.target.value)} placeholder="IK4201" /></Field>
            <Field label="Nama Mata Kuliah"><input style={inputStyle} value={c.name} onChange={e => updateCourse(c.id, "name", e.target.value)} /></Field>
          </Row>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
            <Field label="Semester"><input style={inputStyle} value={c.semester} onChange={e => updateCourse(c.id, "semester", e.target.value)} placeholder="Ganjil" /></Field>
            <Field label="Level"><select style={inputStyle} value={c.level} onChange={e => updateCourse(c.id, "level", e.target.value)}><option>S1</option><option>S2</option><option>S1/S2</option></select></Field>
            <Field label="Mahasiswa"><input style={inputStyle} type="number" value={c.students} onChange={e => updateCourse(c.id, "students", parseInt(e.target.value))} /></Field>
            <Field label="SKS"><input style={inputStyle} type="number" min={1} max={6} value={c.hours} onChange={e => updateCourse(c.id, "hours", parseInt(e.target.value))} /></Field>
          </div>
          <Field label="Deskripsi"><textarea style={{ ...inputStyle, resize: "vertical", minHeight: 70 }} value={c.desc} onChange={e => updateCourse(c.id, "desc", e.target.value)} /></Field>
        </Card>
      ))}
    </div>
  );
}

function ProyekTab({ draft, up }: { draft: Profile; up: any }) {
  const updateProj = (id: string, key: keyof Project, val: string) => up("projects", draft.projects.map(p => p.id === id ? { ...p, [key]: val } : p));
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <AddBtn onClick={() => up("projects", [...draft.projects, { id: crypto.randomUUID(), title: "", funder: "", year: "", desc: "" }])} />
      </div>
      {draft.projects.map(p => (
        <Card key={p.id} onRemove={() => up("projects", draft.projects.filter(x => x.id !== p.id))}>
          <Field label="Judul Proyek"><input style={inputStyle} value={p.title} onChange={e => updateProj(p.id, "title", e.target.value)} /></Field>
          <Row>
            <Field label="Pemberi Dana"><input style={inputStyle} value={p.funder} onChange={e => updateProj(p.id, "funder", e.target.value)} placeholder="Kemdikbudristek" /></Field>
            <Field label="Tahun"><input style={inputStyle} value={p.year} onChange={e => updateProj(p.id, "year", e.target.value)} placeholder="2023–2025" /></Field>
          </Row>
          <Field label="Deskripsi"><textarea style={{ ...inputStyle, resize: "vertical", minHeight: 70 }} value={p.desc} onChange={e => updateProj(p.id, "desc", e.target.value)} /></Field>
        </Card>
      ))}
    </div>
  );
}

function KontakTab({ draft, up }: { draft: Profile; up: any }) {
  const uc = (key: keyof typeof draft.contact, val: string) => up("contact", { ...draft.contact, [key]: val });
  return (
    <div>
      <Row>
        <Field label="✉️ Email Kampus"><input style={inputStyle} type="email" value={draft.contact.email} onChange={e => uc("email", e.target.value)} /></Field>
        <Field label="📚 Google Scholar URL"><input style={inputStyle} value={draft.contact.scholar} onChange={e => uc("scholar", e.target.value)} /></Field>
      </Row>
      <Row>
        <Field label="💼 LinkedIn URL"><input style={inputStyle} value={draft.contact.linkedin} onChange={e => uc("linkedin", e.target.value)} /></Field>
        <Field label="🔗 GitHub URL"><input style={inputStyle} value={draft.contact.github} onChange={e => uc("github", e.target.value)} /></Field>
      </Row>
      <Field label="📞 Telepon"><input style={inputStyle} value={draft.contact.phone} onChange={e => uc("phone", e.target.value)} /></Field>
      <Field label="📍 Alamat Kantor"><textarea style={{ ...inputStyle, resize: "vertical" }} rows={2} value={draft.contact.address} onChange={e => uc("address", e.target.value)} /></Field>
      <Field label="🕐 Office Hours"><input style={inputStyle} value={draft.contact.officeHours} onChange={e => uc("officeHours", e.target.value)} placeholder="Senin & Rabu, 13.00–15.00 · Ruang 302" /></Field>
    </div>
  );
}

function Card({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <div style={{ background: "#F5F3EE", borderRadius: 12, padding: "16px 18px 12px", border: "1.5px solid #E8E4DC", marginBottom: 12, position: "relative" }}>
      <button onClick={onRemove} style={{ position: "absolute", top: 10, right: 10, background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 6, color: "#D1D5DB", display: "flex", transition: "all 0.15s" }} onMouseEnter={e => { e.currentTarget.style.background = "#FEE2E2"; (e.currentTarget.querySelector("svg") as SVGElement).style.color = "#DC2626"; }} onMouseLeave={e => { e.currentTarget.style.background = "none"; }}>
        <Trash2 size={14} color="#D1D5DB" />
      </button>
      {children}
    </div>
  );
}

function AddBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 5, background: "#E4F0F1", color: "#1A6B72", border: "1.5px solid #B8D8DA", borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.15s" }} onMouseEnter={e => { e.currentTarget.style.background = "#1A6B72"; e.currentTarget.style.color = "white"; }} onMouseLeave={e => { e.currentTarget.style.background = "#E4F0F1"; e.currentTarget.style.color = "#1A6B72"; }}>
      <Plus size={14} /> Tambah
    </button>
  );
}

function TemaTab({ draft, up }: { draft: Profile; up: any }) {
  const isActive = (p: typeof PRESETS[0]) => draft.theme.h1 === p.theme.h1 && draft.theme.p1 === p.theme.p1;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Pilih Tema Warna</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10 }}>
          {PRESETS.map(p => (
            <button
              key={p.name}
              onClick={() => up("theme", { ...p.theme })}
              style={{ border: isActive(p) ? `2.5px solid ${p.theme.p1}` : "1.5px solid #E8E4DC", borderRadius: 14, padding: "14px 12px", cursor: "pointer", background: isActive(p) ? p.theme.pb : "white", transition: "all 0.2s", position: "relative", boxShadow: isActive(p) ? `0 4px 16px ${p.theme.p1}40` : "0 1px 4px rgba(0,0,0,0.06)" }}
            >
              {isActive(p) && (
                <div style={{ position: "absolute", top: 6, right: 6, width: 16, height: 16, borderRadius: "50%", background: p.theme.p1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckCircle size={10} color="white" />
                </div>
              )}
              {/* Color swatches */}
              <div style={{ display: "flex", gap: 4, marginBottom: 10, justifyContent: "center" }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: p.theme.h1 }} />
                <div style={{ width: 24, height: 24, borderRadius: 6, background: p.theme.p1 }} />
                <div style={{ width: 24, height: 24, borderRadius: 6, background: p.theme.p2 }} />
                <div style={{ width: 24, height: 24, borderRadius: 6, background: p.theme.p3 }} />
              </div>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{p.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: isActive(p) ? p.theme.p1 : "#374151" }}>{p.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: "#F0EDE7", margin: "24px 0" }} />

      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Warna Latar Halaman</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {BG_OPTIONS.map(bg => (
            <button
              key={bg.value}
              onClick={() => up("theme", { ...draft.theme, pageBg: bg.value })}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "10px 14px", borderRadius: 12, border: draft.theme.pageBg === bg.value ? "2px solid #1A6B72" : "1.5px solid #E8E4DC", background: "white", cursor: "pointer", transition: "all 0.15s", boxShadow: draft.theme.pageBg === bg.value ? "0 4px 12px rgba(26,107,114,0.2)" : "none" }}
            >
              <div style={{ width: 36, height: 28, borderRadius: 8, background: bg.value, border: "1px solid #E2E8F0" }} />
              <div style={{ fontSize: 11, fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>{bg.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: "#F0EDE7", margin: "24px 0" }} />

      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Kustom Warna Aksen</div>
        <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 12 }}>Pilih warna aksen utama. Akan mengubah tombol, lencana, dan elemen highlight.</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input type="color" value={draft.theme.p1}
            onChange={e => {
              const hex = e.target.value;
              up("theme", { ...draft.theme, p1: hex });
            }}
            style={{ width: 48, height: 40, border: "1.5px solid #E8E4DC", borderRadius: 8, cursor: "pointer", padding: 2 }}
          />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Warna Primer</div>
            <div style={{ fontSize: 11, color: "#9CA3AF" }}>{draft.theme.p1}</div>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${draft.theme.p1}, ${draft.theme.p2})` }} />
        </div>
      </div>
    </div>
  );
}
