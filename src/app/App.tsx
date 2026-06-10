import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { Navbar, type Tab } from "./components/Navbar";
import { TentangSection } from "./components/TentangSection";
import { PublikasiSection } from "./components/PublikasiSection";
import { DokumenSection } from "./components/DokumenSection";
import { PengajaranSection } from "./components/PengajaranSection";
import { ProyekSection } from "./components/ProyekSection";
import { KontakSection } from "./components/KontakSection";
import { LoginModal } from "./components/LoginModal";
import { ProfileEditor } from "./components/ProfileEditor";
import { defaultProfile } from "./defaultProfile";
import type { FileEntry, Profile } from "./types";

const ADMIN_PASSWORD = "admin123";
const FILES_KEY = "fileshare_files";
const PROFILE_KEY = "fileshare_profile";

function getDefaultFiles(): FileEntry[] {
  return [
    { id: "f1", name: "Slide Kuliah KA - Pertemuan 1-5.pdf", size: 4200000, type: "application/pdf", uploadDate: new Date(Date.now() - 86400000 * 2).toISOString(), category: "Materi Kuliah", description: "Materi slide kuliah Kecerdasan Buatan pertemuan 1 hingga 5", dataUrl: "" },
    { id: "f2", name: "Dataset NLP Bahasa Jawa.zip", size: 18500000, type: "application/zip", uploadDate: new Date(Date.now() - 86400000 * 7).toISOString(), category: "Lainnya", description: "Dataset teks bahasa Jawa untuk penelitian NLP low-resource", dataUrl: "" },
    { id: "f3", name: "Template Skripsi Fasilkom UI.docx", size: 820000, type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", uploadDate: new Date(Date.now() - 86400000 * 14).toISOString(), category: "Panduan", description: "Template resmi penulisan skripsi Fasilkom Universitas Indonesia", dataUrl: "" },
    { id: "f4", name: "Silabus Deep Learning 2024-2025.pdf", size: 95000, type: "application/pdf", uploadDate: new Date(Date.now() - 86400000 * 3).toISOString(), category: "Silabus", description: "Silabus mata kuliah Deep Learning semester ganjil 2024/2025", dataUrl: "" },
    { id: "f5", name: "Paper IndoBERT-Regional ACL 2024.pdf", size: 1240000, type: "application/pdf", uploadDate: new Date(Date.now() - 86400000 * 30).toISOString(), category: "Publikasi", description: "Preprint paper ACL 2024 - IndoBERT-Regional", dataUrl: "" },
  ];
}

function loadFiles(): FileEntry[] {
  try { const r = localStorage.getItem(FILES_KEY); return r ? JSON.parse(r) : getDefaultFiles(); }
  catch { return getDefaultFiles(); }
}

function loadProfile(): Profile {
  try {
    const r = localStorage.getItem(PROFILE_KEY);
    if (r) {
      const saved = JSON.parse(r);
      return { ...defaultProfile, ...saved, theme: { ...defaultProfile.theme, ...(saved.theme ?? {}) } };
    }
  } catch {}
  return { ...defaultProfile };
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("tentang");
  const [files, setFiles] = useState<FileEntry[]>(loadFiles);
  const [profile, setProfile] = useState<Profile>(loadProfile);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => { try { localStorage.setItem(FILES_KEY, JSON.stringify(files)); } catch {} }, [files]);
  useEffect(() => { try { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); } catch {} }, [profile]);

  const handleAdminClick = () => {
    if (isAdmin) { setIsAdmin(false); setShowEditor(false); toast("Berhasil logout."); }
    else setShowLogin(true);
  };

  const handleLogin = (pw: string): boolean => {
    if (pw === ADMIN_PASSWORD) { setIsAdmin(true); setShowLogin(false); toast.success("Login berhasil! Selamat datang, Admin."); return true; }
    return false;
  };

  const handleSaveProfile = (updated: Profile) => { setProfile(updated); toast.success("Profil berhasil disimpan!"); };
  const handleUpload = (entry: FileEntry) => { setFiles(p => [entry, ...p]); toast.success(`"${entry.name}" berhasil diunggah!`); };
  const handleDelete = (id: string) => { const f = files.find(x => x.id === id); setFiles(p => p.filter(x => x.id !== id)); if (f) toast.success(`"${f.name}" dihapus.`); };
  const handleDownload = (file: FileEntry) => {
    if (!file.dataUrl) { toast.error("File contoh tidak bisa diunduh. Upload file asli terlebih dahulu."); return; }
    const a = document.createElement("a"); a.href = file.dataUrl; a.download = file.name; a.click();
    toast.success(`Mengunduh "${file.name}"...`);
  };

  const changeTab = (tab: Tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: "smooth" }); };

  // Build CSS custom properties from theme
  const t = profile.theme;
  function r(hex: string, a: number) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;
  }
  const cssVars = {
    "--th-pg": t.pageBg, "--th-h1": t.h1, "--th-h2": t.h2, "--th-h3": t.h3,
    "--th-p1": t.p1, "--th-p2": t.p2, "--th-p3": t.p3, "--th-p4": t.p4, "--th-pb": t.pb,
    "--th-p1a": r(t.p1, 0.12), "--th-p1b": r(t.p1, 0.25), "--th-p1c": r(t.p1, 0.35),
    "--th-p2a": r(t.p2, 0.08), "--th-p2b": r(t.p2, 0.15), "--th-p2c": r(t.p2, 0.22),
    "--th-p2d": r(t.p2, 0.35), "--th-p2e": r(t.p2, 0.50),
  } as React.CSSProperties;

  return (
    <div style={{ minHeight: "100vh", background: "var(--th-pg)", fontFamily: "'Inter', sans-serif", ...cssVars }}>
      <Toaster position="top-right" toastOptions={{ style: { fontFamily: "'Inter', sans-serif", borderRadius: 10, fontSize: 13 } }} />

      <Navbar name={profile.name} activeTab={activeTab} onTabChange={changeTab} onAdminClick={handleAdminClick} onEditProfile={() => setShowEditor(true)} isAdmin={isAdmin} />

      {showLogin && <LoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
      {showEditor && isAdmin && <ProfileEditor profile={profile} onSave={handleSaveProfile} onClose={() => setShowEditor(false)} />}

      <main>
        {activeTab === "tentang" && <TentangSection profile={profile} />}
        {activeTab === "publikasi" && <PublikasiSection profile={profile} />}
        {activeTab === "dokumen" && <DokumenSection files={files} isAdmin={isAdmin} onUpload={handleUpload} onDelete={handleDelete} onDownload={handleDownload} />}
        {activeTab === "pengajaran" && <PengajaranSection profile={profile} />}
        {activeTab === "proyek" && <ProyekSection profile={profile} />}
        {activeTab === "kontak" && <KontakSection profile={profile} />}
      </main>

      <footer style={{ background: `linear-gradient(135deg, var(--th-h1), var(--th-h2))`, color: "rgba(255,255,255,0.4)", textAlign: "center", padding: "24px 24px", fontSize: 12, fontFamily: "'Inter', sans-serif", borderTop: "1px solid var(--th-p2b)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:4 }}>
          <div style={{ width:20, height:1, background:"var(--th-p2d)" }} />
          <span style={{ color:"var(--th-p2)", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" }}>Akademik</span>
          <div style={{ width:20, height:1, background:"var(--th-p2d)" }} />
        </div>
        © {new Date().getFullYear()} <span style={{ color:"rgba(255,255,255,0.6)" }}>{profile.name}</span> · {profile.department} · {profile.university}
      </footer>
    </div>
  );
}
