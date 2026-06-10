import { useState, useRef, useCallback } from "react";
import {
  Upload,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  CloudUpload,
  LayoutGrid,
  LogOut,
  FileCheck,
  HardDrive,
  Plus,
  Edit3,
  Save,
} from "lucide-react";
import { FileIcon, getFileColor, getFileBg } from "./FileIcon";
import type { FileEntry } from "../types";

interface AdminPanelProps {
  files: FileEntry[];
  onUpload: (entry: FileEntry) => void;
  onDelete: (id: string) => void;
  onLogout: () => void;
}

const categories = ["Dokumen", "Gambar", "Video", "Audio", "Lainnya"];

function formatSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function fileToCategory(mimeType: string): string {
  if (mimeType.startsWith("image/")) return "Gambar";
  if (mimeType.startsWith("video/")) return "Video";
  if (mimeType.startsWith("audio/")) return "Audio";
  if (
    mimeType === "application/pdf" ||
    mimeType.includes("document") ||
    mimeType.includes("spreadsheet") ||
    mimeType.includes("presentation") ||
    mimeType.startsWith("text/")
  )
    return "Dokumen";
  return "Lainnya";
}

export function AdminPanel({
  files,
  onUpload,
  onDelete,
  onLogout,
}: AdminPanelProps) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [activeTab, setActiveTab] = useState<"upload" | "manage">("upload");
  const [pendingFiles, setPendingFiles] = useState<
    { file: File; description: string; category: string }[]
  >([]);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addToPending(droppedFiles);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addToPending(Array.from(e.target.files));
    }
  };

  const addToPending = (newFiles: File[]) => {
    const entries = newFiles.map((f) => ({
      file: f,
      description: "",
      category: fileToCategory(f.type),
    }));
    setPendingFiles((prev) => [...prev, ...entries]);
  };

  const removePending = (index: number) => {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePending = (
    index: number,
    key: "description" | "category",
    value: string
  ) => {
    setPendingFiles((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [key]: value } : p))
    );
  };

  const uploadAll = async () => {
    if (pendingFiles.length === 0) return;
    setUploading(true);
    setUploadError("");

    try {
      for (const { file, description, category } of pendingFiles) {
        const dataUrl = await readFileAsDataUrl(file);
        const entry: FileEntry = {
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
          uploadDate: new Date().toISOString(),
          category,
          description,
          dataUrl,
        };
        onUpload(entry);
      }
      setPendingFiles([]);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch {
      setUploadError("Gagal mengunggah file. Coba lagi.");
    } finally {
      setUploading(false);
    }
  };

  function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-white/5 flex flex-col z-10">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <CloudUpload className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white" style={{ fontWeight: 600 }}>
                FileShare
              </p>
              <p className="text-xs text-slate-500">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "upload", icon: Upload, label: "Upload File" },
            { id: "manage", icon: LayoutGrid, label: "Kelola File" },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as "upload" | "manage")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === id
                  ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </nav>

        {/* Stats */}
        <div className="p-4 border-t border-white/5 space-y-3">
          <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-xl">
            <FileCheck className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-white text-sm" style={{ fontWeight: 500 }}>
                {files.length} File
              </p>
              <p className="text-slate-500 text-xs">Total tersimpan</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-xl">
            <HardDrive className="w-4 h-4 text-cyan-400" />
            <div>
              <p className="text-white text-sm" style={{ fontWeight: 500 }}>
                {formatSize(totalSize)}
              </p>
              <p className="text-slate-500 text-xs">Ruang digunakan</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === "upload" ? (
          <div className="max-w-3xl">
            <div className="mb-8">
              <h1 className="text-white" style={{ fontWeight: 700 }}>
                Upload File
              </h1>
              <p className="text-slate-400 mt-1">
                Tambahkan file baru untuk dibagikan kepada pengunjung
              </p>
            </div>

            {/* Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                dragging
                  ? "border-blue-400 bg-blue-500/10"
                  : "border-white/15 bg-white/3 hover:border-blue-500/50 hover:bg-white/5"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileInput}
              />
              <div
                className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all ${
                  dragging ? "bg-blue-500/20" : "bg-white/5"
                }`}
              >
                <CloudUpload
                  className={`w-8 h-8 ${dragging ? "text-blue-400" : "text-slate-500"}`}
                />
              </div>
              <p className="text-white mb-1" style={{ fontWeight: 500 }}>
                {dragging ? "Lepaskan file di sini" : "Seret & lepas file"}
              </p>
              <p className="text-slate-500 text-sm">
                atau klik untuk memilih file
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {["PDF", "DOC", "JPG", "PNG", "MP4", "ZIP", "dan lainnya"].map(
                  (ext) => (
                    <span
                      key={ext}
                      className="text-xs bg-white/5 border border-white/10 text-slate-400 rounded-full px-3 py-1"
                    >
                      {ext}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Pending Files */}
            {pendingFiles.length > 0 && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-white" style={{ fontWeight: 500 }}>
                    File Siap Diupload ({pendingFiles.length})
                  </h2>
                  <button
                    onClick={() => setPendingFiles([])}
                    className="text-slate-400 hover:text-white text-sm"
                  >
                    Hapus semua
                  </button>
                </div>

                {pendingFiles.map(({ file, description, category }, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${getFileBg(file.type)} flex items-center justify-center shrink-0`}
                      >
                        <FileIcon
                          mimeType={file.type}
                          className={`w-5 h-5 ${getFileColor(file.type)}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-white text-sm truncate"
                          style={{ fontWeight: 500 }}
                        >
                          {file.name}
                        </p>
                        <p className="text-slate-500 text-xs">
                          {formatSize(file.size)}
                        </p>
                      </div>
                      <button
                        onClick={() => removePending(i)}
                        className="text-slate-500 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">
                          Kategori
                        </label>
                        <select
                          value={category}
                          onChange={(e) =>
                            updatePending(i, "category", e.target.value)
                          }
                          className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                        >
                          {categories.map((c) => (
                            <option key={c} value={c} className="bg-slate-800">
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">
                          Deskripsi (opsional)
                        </label>
                        <input
                          type="text"
                          value={description}
                          onChange={(e) =>
                            updatePending(i, "description", e.target.value)
                          }
                          placeholder="Deskripsi singkat..."
                          className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-sm placeholder-slate-600 focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={uploadAll}
                  disabled={uploading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 text-white rounded-xl py-3 transition-all shadow-lg shadow-blue-500/20"
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Mengunggah...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Upload {pendingFiles.length} File
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Notifications */}
            {uploadSuccess && (
              <div className="mt-4 flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-green-400">
                <CheckCircle className="w-5 h-5 shrink-0" />
                File berhasil diunggah!
              </div>
            )}
            {uploadError && (
              <div className="mt-4 flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {uploadError}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-white" style={{ fontWeight: 700 }}>
                  Kelola File
                </h1>
                <p className="text-slate-400 mt-1">
                  {files.length} file tersimpan
                </p>
              </div>
              <button
                onClick={() => setActiveTab("upload")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                Upload Baru
              </button>
            </div>

            {files.length === 0 ? (
              <div className="text-center py-24 bg-white/3 rounded-2xl border border-white/10">
                <CloudUpload className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">Belum ada file yang diunggah</p>
                <button
                  onClick={() => setActiveTab("upload")}
                  className="mt-4 text-blue-400 hover:text-blue-300 text-sm"
                >
                  Upload file pertama →
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-4 transition-all group"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg ${getFileBg(file.type)} flex items-center justify-center shrink-0`}
                    >
                      <FileIcon
                        mimeType={file.type}
                        className={`w-5 h-5 ${getFileColor(file.type)}`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="text-white text-sm truncate"
                        style={{ fontWeight: 500 }}
                      >
                        {file.name}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>{file.category}</span>
                        <span>•</span>
                        <span>{formatSize(file.size)}</span>
                        <span>•</span>
                        <span>{formatDate(file.uploadDate)}</span>
                      </div>
                    </div>

                    {deleteConfirm === file.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">Hapus?</span>
                        <button
                          onClick={() => {
                            onDelete(file.id);
                            setDeleteConfirm(null);
                          }}
                          className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm hover:bg-red-500/30 transition-all"
                        >
                          Ya
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1 bg-white/5 text-slate-400 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-all"
                        >
                          Batal
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(file.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
