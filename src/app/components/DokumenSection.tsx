import { useState, useRef, useCallback, useMemo } from "react";
import { Download, Trash2, X, CheckCircle, AlertCircle, Upload, Search } from "lucide-react";
import type { FileEntry } from "../types";

const FILE_ICONS: Record<string, { icon: string; color: string; bg: string }> = {
  "application/pdf":            { icon:"📄", color:"#DC2626", bg:"#FEF2F2" },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { icon:"📝", color:"#2563EB", bg:"#EFF6FF" },
  "application/msword":         { icon:"📝", color:"#2563EB", bg:"#EFF6FF" },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": { icon:"📊", color:"#EA580C", bg:"#FFF7ED" },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { icon:"📈", color:"#16A34A", bg:"#F0FDF4" },
  "text/plain":                 { icon:"📃", color:"#6B7280", bg:"#F9FAFB" },
  "application/zip":            { icon:"🗜️", color:"#7C3AED", bg:"#F5F3FF" },
  "video/mp4":                  { icon:"🎬", color:"#DB2777", bg:"#FDF2F8" },
  "image/png":                  { icon:"🖼️", color:"#9333EA", bg:"#FAF5FF" },
  "image/jpeg":                 { icon:"🖼️", color:"#9333EA", bg:"#FAF5FF" },
};
const DEFAULT_FILE = { icon:"📎", color:"#6B7280", bg:"#F9FAFB" };
const CAT_OPTIONS = ["Materi Kuliah", "Silabus", "Publikasi", "CV & Portofolio", "Panduan", "Lainnya"];

function fmt(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes/1024).toFixed(1) + " KB";
  return (bytes/1048576).toFixed(1) + " MB";
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day:"numeric", month:"short", year:"numeric" });
}
function guessCategory(mime: string): string {
  if (mime.includes("pdf") || mime.includes("word") || mime.includes("text")) return "Materi Kuliah";
  if (mime.includes("presentation")) return "Materi Kuliah";
  return "Lainnya";
}

interface Props {
  files: FileEntry[];
  isAdmin: boolean;
  onUpload: (e: FileEntry) => void;
  onDelete: (id: string) => void;
  onDownload: (f: FileEntry) => void;
}

export function DokumenSection({ files, isAdmin, onUpload, onDelete, onDownload }: Props) {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("Semua");
  const [showUpload, setShowUpload] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pending, setPending] = useState<{file:File;title:string;category:string;desc:string}[]>([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const existingCats = useMemo(() => ["Semua",...CAT_OPTIONS.filter(c => files.some(f => f.category===c))],[files]);
  const filtered = useMemo(() => files.filter(f => {
    const q = search.toLowerCase();
    return (f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)) &&
           (filterCat==="Semua" || f.category===filterCat);
  }),[files,search,filterCat]);

  const addPending = (newFiles: File[]) => setPending(p => [...p,...newFiles.map(f=>({file:f,title:f.name.replace(/\.[^/.]+$/,""),category:guessCategory(f.type),desc:""}))]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false); addPending(Array.from(e.dataTransfer.files));
  },[]);

  function readUrl(file: File): Promise<string> {
    return new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result as string); r.onerror=rej; r.readAsDataURL(file); });
  }

  const uploadAll = async () => {
    if (!pending.length) return;
    setUploading(true); setError("");
    try {
      for (const {file,title,category,desc} of pending) {
        const dataUrl = await readUrl(file);
        onUpload({id:crypto.randomUUID(),name:title||file.name,size:file.size,type:file.type||"application/octet-stream",uploadDate:new Date().toISOString(),category,description:desc,dataUrl});
      }
      setPending([]); setShowUpload(false); setSuccess(true);
      setTimeout(()=>setSuccess(false),3000);
    } catch { setError("Gagal mengunggah file."); }
    setUploading(false);
  };

  return (
    <div>
      <div style={{background:"linear-gradient(135deg, var(--th-h1) 0%, var(--th-h2) 100%)",padding:"48px 0 52px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-60,right:-60,width:280,height:280,borderRadius:"50%",background:"radial-gradient(circle, var(--th-p2b), transparent 65%)",filter:"blur(40px)",pointerEvents:"none"}} />
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px)",backgroundSize:"24px 24px",pointerEvents:"none"}} />
        <div className="max-w-4xl mx-auto px-6" style={{position:"relative",zIndex:1,display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:16}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
              <div style={{width:32,height:3,background:"linear-gradient(90deg, var(--th-p2), var(--th-p3))",borderRadius:2}} />
              <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"var(--th-p2)"}}>Unduhan</span>
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:700,color:"white",margin:0}}>Dokumen & Materi</h2>
          </div>
          {isAdmin && (
            <button onClick={()=>setShowUpload(!showUpload)}
              style={{display:"flex",alignItems:"center",gap:8,padding:"10px 20px",borderRadius:10,border:"1.5px solid var(--th-p2e)",background:"var(--th-p2b)",color:"var(--th-p4)",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="var(--th-p2c)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="var(--th-p2b)";}}
            >
              <Upload size={15}/>{showUpload?"Tutup Panel":"Unggah Dokumen"}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6" style={{padding:"40px 24px 72px"}}>
        {isAdmin && showUpload && (
          <div style={{background:"white",borderRadius:16,border:"2px dashed var(--th-p1c)",padding:28,marginBottom:28,boxShadow:"0 4px 24px var(--th-p1a)"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:17,marginBottom:18,color:"#071E3D"}}>📤 Unggah Dokumen Baru</div>
            <div onDrop={handleDrop} onDragOver={e=>{e.preventDefault();setDragging(true);}} onDragLeave={()=>setDragging(false)} onClick={()=>inputRef.current?.click()}
              style={{border:`2px dashed ${dragging?"var(--th-p1)":"#CBD5E1"}`,borderRadius:12,padding:"28px 24px",textAlign:"center",cursor:"pointer",background:dragging?"var(--th-p1a)":"#FAFAFA",marginBottom:18,transition:"all 0.15s"}}
            >
              <input ref={inputRef} type="file" multiple className="hidden" onChange={e=>e.target.files&&addPending(Array.from(e.target.files))} />
              <div style={{width:56,height:56,borderRadius:16,background:"var(--th-pb)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontSize:28}}>🗂️</div>
              <div style={{fontSize:14,fontWeight:600,color:dragging?"var(--th-p1)":"#374151",marginBottom:4}}>{dragging?"Lepaskan file di sini":"Seret file ke sini atau klik untuk memilih"}</div>
              <div style={{fontSize:12,color:"#9CA3AF"}}>PDF, DOC, PPT, XLS, ZIP, gambar, video</div>
            </div>
            {pending.length>0 && (
              <div>
                {pending.map(({file,title,category,desc},i)=>(
                  <div key={i} style={{display:"grid",gridTemplateColumns:"48px 1fr 1fr 1fr 32px",gap:10,alignItems:"center",background:"#F8FAFC",borderRadius:10,padding:"10px 14px",marginBottom:8,border:"1px solid #EDF2F7"}}>
                    <div style={{width:40,height:40,borderRadius:10,background:(FILE_ICONS[file.type]??DEFAULT_FILE).bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{(FILE_ICONS[file.type]??DEFAULT_FILE).icon}</div>
                    <input value={title} onChange={e=>setPending(p=>p.map((x,j)=>j===i?{...x,title:e.target.value}:x))} placeholder="Judul..." style={inpSm} />
                    <select value={category} onChange={e=>setPending(p=>p.map((x,j)=>j===i?{...x,category:e.target.value}:x))} style={inpSm}>
                      {CAT_OPTIONS.map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                    <input value={desc} onChange={e=>setPending(p=>p.map((x,j)=>j===i?{...x,desc:e.target.value}:x))} placeholder="Deskripsi..." style={inpSm} />
                    <button onClick={()=>setPending(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:"#CBD5E1",padding:4,display:"flex"}}><X size={15}/></button>
                  </div>
                ))}
                <button onClick={uploadAll} disabled={uploading}
                  style={{marginTop:8,display:"flex",alignItems:"center",gap:8,background:"linear-gradient(135deg, var(--th-p1), var(--th-p2))",color:"white",border:"none",borderRadius:10,padding:"10px 22px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",boxShadow:"0 4px 14px var(--th-p1c)",opacity:uploading?0.7:1}}
                >
                  {uploading?<><Spin/>Mengunggah...</>:<><Upload size={15}/>Upload {pending.length} File</>}
                </button>
              </div>
            )}
            {success&&<div style={{marginTop:12,display:"flex",alignItems:"center",gap:8,color:"var(--th-p1)",fontSize:13,fontWeight:600}}><CheckCircle size={16}/>File berhasil diunggah!</div>}
            {error&&<div style={{marginTop:12,display:"flex",alignItems:"center",gap:8,color:"#DC2626",fontSize:13}}><AlertCircle size={16}/>{error}</div>}
          </div>
        )}

        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
          <div style={{position:"relative",flex:1,minWidth:200}}>
            <Search size={14} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#9CA3AF"}} />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari dokumen..." style={{...inpSm,paddingLeft:36,width:"100%",boxSizing:"border-box",borderRadius:10,padding:"10px 12px 10px 36px"}} />
          </div>
          {files.length>0 && (
            <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
              {existingCats.map(c=>(
                <button key={c} onClick={()=>setFilterCat(c)}
                  style={{border:"none",cursor:"pointer",fontSize:12,fontWeight:600,padding:"7px 16px",borderRadius:20,fontFamily:"'Inter',sans-serif",transition:"all 0.15s",
                    background:filterCat===c?"linear-gradient(135deg, var(--th-p1), var(--th-p2))":"white",
                    color:filterCat===c?"white":"#6B7A8F",
                    boxShadow:filterCat===c?"0 4px 14px var(--th-p1c)":"0 1px 4px rgba(0,0,0,0.06)",
                    outline:filterCat===c?"none":"1px solid #E2E8F0"}}
                >{c}</button>
              ))}
            </div>
          )}
        </div>

        {filtered.length===0 ? (
          <div style={{textAlign:"center",padding:"56px 24px",background:"white",borderRadius:16,border:"1.5px dashed #CBD5E1",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
            <div style={{fontSize:48,marginBottom:12}}>📂</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,marginBottom:6,color:"#071E3D"}}>{files.length===0?"Belum ada dokumen":"Tidak ada dokumen"}</div>
            <p style={{fontSize:13,color:"#9CA3AF"}}>{isAdmin?'Klik "Unggah Dokumen" untuk menambahkan.':'Dokumen akan tersedia segera.'}</p>
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {filtered.map(file=>{
              const fi = FILE_ICONS[file.type]??DEFAULT_FILE;
              return (
                <div key={file.id}
                  style={{background:"white",borderRadius:14,padding:"16px 20px",display:"flex",alignItems:"center",gap:16,boxShadow:"0 2px 8px rgba(0,0,0,0.04),0 6px 20px rgba(0,0,0,0.06)",border:"1px solid #EDF2F7",transition:"all 0.2s"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-1px)";(e.currentTarget as HTMLElement).style.boxShadow="0 8px 24px rgba(0,0,0,0.08),0 4px 8px rgba(0,0,0,0.04)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="none";(e.currentTarget as HTMLElement).style.boxShadow="0 2px 8px rgba(0,0,0,0.04),0 6px 20px rgba(0,0,0,0.06)";}}
                >
                  <div style={{width:48,height:48,borderRadius:12,background:fi.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{fi.icon}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:600,fontSize:14,color:"#071E3D",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{file.name}</div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginTop:5}}>
                      <span style={{background:"var(--th-pb)",color:"var(--th-p1)",fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:6}}>{file.category}</span>
                      <span style={{fontSize:11,color:"#94A3B8"}}>{fmt(file.size)}</span>
                      <span style={{fontSize:11,color:"#94A3B8"}}>{fmtDate(file.uploadDate)}</span>
                    </div>
                    {file.description&&<div style={{fontSize:12,color:"#6B7A8F",marginTop:4}}>{file.description}</div>}
                  </div>
                  <div style={{display:"flex",gap:8,flexShrink:0}}>
                    <button onClick={()=>onDownload(file)}
                      style={{background:"linear-gradient(135deg, var(--th-p1), var(--th-p2))",color:"white",border:"none",borderRadius:10,padding:"8px 16px",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6,boxShadow:"0 4px 12px var(--th-p1c)",transition:"all 0.15s",fontFamily:"'Inter',sans-serif"}}
                      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 6px 16px var(--th-p1b)";}}
                      onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 12px var(--th-p1c)";}}
                    >
                      <Download size={13}/>Download
                    </button>
                    {isAdmin&&(
                      deleteConfirm===file.id?(
                        <div style={{display:"flex",gap:4,alignItems:"center"}}>
                          <span style={{fontSize:12,color:"#6B7A8F",marginRight:2}}>Hapus?</span>
                          <button onClick={()=>{onDelete(file.id);setDeleteConfirm(null);}} style={{background:"#FEF2F2",color:"#DC2626",border:"1px solid #FECACA",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Ya</button>
                          <button onClick={()=>setDeleteConfirm(null)} style={{background:"#F8FAFC",color:"#6B7A8F",border:"1px solid #E2E8F0",borderRadius:8,padding:"6px 10px",fontSize:12,cursor:"pointer"}}>Batal</button>
                        </div>
                      ):(
                        <button onClick={()=>setDeleteConfirm(file.id)} style={{background:"#FEF2F2",color:"#DC2626",border:"1px solid #FECACA",borderRadius:10,padding:"8px 10px",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center"}}>
                          <Trash2 size={13}/>
                        </button>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function Spin() {
  return <div style={{width:14,height:14,border:"2px solid rgba(255,255,255,0.4)",borderTopColor:"white",borderRadius:"50%",animation:"spin 0.8s linear infinite"}} />;
}

const inpSm: React.CSSProperties = {
  fontFamily:"'Inter',sans-serif",fontSize:13,border:"1.5px solid #E2E8F0",borderRadius:8,
  padding:"8px 10px",background:"white",color:"#071E3D",outline:"none",
};
