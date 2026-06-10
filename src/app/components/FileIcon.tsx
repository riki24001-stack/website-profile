import {
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  File,
  FileSpreadsheet,
  Presentation,
} from "lucide-react";

interface FileIconProps {
  mimeType: string;
  className?: string;
}

export function FileIcon({ mimeType, className = "w-8 h-8" }: FileIconProps) {
  if (mimeType.startsWith("image/")) return <FileImage className={className} />;
  if (mimeType.startsWith("video/")) return <FileVideo className={className} />;
  if (mimeType.startsWith("audio/")) return <FileAudio className={className} />;
  if (mimeType === "application/pdf") return <FileText className={className} />;
  if (
    mimeType === "application/zip" ||
    mimeType === "application/x-rar-compressed" ||
    mimeType === "application/x-7z-compressed"
  )
    return <FileArchive className={className} />;
  if (
    mimeType.includes("spreadsheet") ||
    mimeType.includes("excel") ||
    mimeType === "text/csv"
  )
    return <FileSpreadsheet className={className} />;
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint"))
    return <Presentation className={className} />;
  if (
    mimeType.startsWith("text/") ||
    mimeType.includes("javascript") ||
    mimeType.includes("json") ||
    mimeType.includes("xml")
  )
    return <FileCode className={className} />;
  return <File className={className} />;
}

export function getFileColor(mimeType: string): string {
  if (mimeType.startsWith("image/")) return "text-purple-500";
  if (mimeType.startsWith("video/")) return "text-red-500";
  if (mimeType.startsWith("audio/")) return "text-yellow-500";
  if (mimeType === "application/pdf") return "text-red-600";
  if (
    mimeType === "application/zip" ||
    mimeType === "application/x-rar-compressed"
  )
    return "text-orange-500";
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel"))
    return "text-green-600";
  if (mimeType.includes("presentation"))
    return "text-orange-600";
  if (mimeType.startsWith("text/")) return "text-blue-500";
  return "text-gray-500";
}

export function getFileBg(mimeType: string): string {
  if (mimeType.startsWith("image/")) return "bg-purple-50";
  if (mimeType.startsWith("video/")) return "bg-red-50";
  if (mimeType.startsWith("audio/")) return "bg-yellow-50";
  if (mimeType === "application/pdf") return "bg-red-50";
  if (
    mimeType === "application/zip" ||
    mimeType === "application/x-rar-compressed"
  )
    return "bg-orange-50";
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel"))
    return "bg-green-50";
  if (mimeType.includes("presentation")) return "bg-orange-50";
  if (mimeType.startsWith("text/")) return "bg-blue-50";
  return "bg-gray-50";
}
