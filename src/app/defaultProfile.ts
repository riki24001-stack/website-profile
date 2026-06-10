import type { Profile } from "./types";

export const defaultProfile: Profile = {
  name: "Nama Dosen",
  initials: "ND",
  badge: "Dosen & Peneliti",
  department: "Program Studi",
  university: "Nama Universitas",
  bio: "Deskripsi singkat tentang profil, bidang keahlian, dan pengalaman akademik. Dapat diubah melalui panel Admin.",
  photo: null,
  skills: [],
  stats: [
    { id: "s1", value: "0", label: "Publikasi" },
    { id: "s2", value: "0", label: "Sitasi" },
    { id: "s3", value: "0", label: "Proyek Aktif" },
    { id: "s4", value: "0", label: "Tahun Mengajar" },
  ],
  education: [],
  researchAreas: [],
  publications: [],
  courses: [],
  projects: [],
  contact: {
    email: "",
    phone: "",
    address: "",
    scholar: "https://scholar.google.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    officeHours: "",
  },
  theme: {
    pageBg: "#F0F4F8",
    h1: "#071E3D", h2: "#0D3352", h3: "#0A5C64",
    p1: "#1A6B72", p2: "#2A9D8F", p3: "#14B8A6",
    p4: "#6EE7DF", pb: "#E6F6F5",
  },
};
