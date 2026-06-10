import { useState, useMemo } from "react";
import {
  Download,
  Search,
  Filter,
  Cloud,
  FileCheck,
  Users,
  ArrowDown,
  Eye,
} from "lucide-react";
import { FileIcon, getFileColor, getFileBg } from "./FileIcon";
import type { FileEntry } from "../types";

interface PublicViewProps {
  files: FileEntry[];
  onDownload: (file: FileEntry) => void;
}

const categories = ["Semua", "Dokumen", "Gambar", "Video", "Audio", "Lainnya"];

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
    month: "long",
    year: "numeric",
  });
}

export function PublicView({ files, onDownload }: PublicViewProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered = useMemo(() => {
    return files.filter((f) => {
      const matchSearch =
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "Semua" || f.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [files, search, activeCategory]);

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
            <Cloud className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm">File Sharing Platform</span>
          </div>
          <h1 className="text-5xl md:text-6xl text-white mb-4" style={{ fontWeight: 700 }}>
            Unduh File
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              dengan Mudah
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Temukan dan unduh file yang Anda butuhkan. Semua file tersedia gratis
            dan aman untuk diunduh.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              { icon: FileCheck, label: "Total File", value: files.length },
              {
                icon: ArrowDown,
                label: "Total Ukuran",
                value: formatSize(totalSize),
              },
              { icon: Users, label: "Pengunjung", value: "∞" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-white" style={{ fontWeight: 600 }}>
                    {value}
                  </p>
                  <p className="text-slate-400 text-sm">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari file..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Category Filter */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm transition-all ${
                activeCategory === cat
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Files Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-slate-400">Tidak ada file ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onDownload={onDownload}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FileCard({
  file,
  onDownload,
}: {
  file: FileEntry;
  onDownload: (f: FileEntry) => void;
}) {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
    >
      {/* Category badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl ${getFileBg(file.type)} flex items-center justify-center`}
        >
          <FileIcon
            mimeType={file.type}
            className={`w-6 h-6 ${getFileColor(file.type)}`}
          />
        </div>
        <span className="text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full px-2 py-0.5">
          {file.category}
        </span>
      </div>

      {/* File info */}
      <h3
        className="text-white mb-1 truncate"
        style={{ fontWeight: 500 }}
        title={file.name}
      >
        {file.name}
      </h3>
      {file.description && (
        <p className="text-slate-400 text-sm mb-3 line-clamp-2">
          {file.description}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
        <span>{formatSize(file.size)}</span>
        <span>{formatDate(file.uploadDate)}</span>
      </div>

      {/* Download button */}
      <button
        onClick={() => onDownload(file)}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl py-2.5 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
      >
        <Download className="w-4 h-4" />
        Unduh File
      </button>
    </div>
  );
}
