import type { Profile } from "./types";

export const defaultProfile: Profile = {
  name: "Dr. Andi Wirawan",
  initials: "AW",
  badge: "Dosen & Peneliti",
  department: "Teknik Informatika",
  university: "Universitas Indonesia",
  bio: "Peneliti di bidang Kecerdasan Buatan dan Pemrosesan Bahasa Alami. Fokus pada pengembangan model NLP untuk bahasa-bahasa daerah di Indonesia. Telah menerbitkan lebih dari 40 karya ilmiah di jurnal internasional.",
  photo: null,
  skills: ["Natural Language Processing", "Machine Learning", "Bahasa Daerah", "Deep Learning", "Computational Linguistics"],
  stats: [
    { id: "s1", value: "42", label: "Publikasi" },
    { id: "s2", value: "1.2K", label: "Sitasi" },
    { id: "s3", value: "6", label: "Proyek Aktif" },
    { id: "s4", value: "12", label: "Tahun Mengajar" },
  ],
  education: [
    { id: "e1", degree: "Ph.D. Ilmu Komputer", school: "Universitas Indonesia", year: "2010" },
    { id: "e2", degree: "M.Sc. Teknik Informatika", school: "Institut Teknologi Bandung", year: "2006" },
    { id: "e3", degree: "S.Kom. Teknik Informatika", school: "Universitas Indonesia", year: "2004" },
  ],
  researchAreas: [
    { id: "r1", title: "Pemrosesan Bahasa Alami", desc: "Pengembangan model NLP untuk bahasa Indonesia dan daerah Nusantara menggunakan pendekatan transformer modern.", icon: "BookOpen", color: "bg-blue-50 text-blue-600" },
    { id: "r2", title: "Bahasa Daerah Digital", desc: "Pelestarian dan digitalisasi bahasa-bahasa daerah Indonesia melalui teknologi AI dan corpus linguistics.", icon: "Globe", color: "bg-emerald-50 text-emerald-600" },
    { id: "r3", title: "Transfer Learning", desc: "Adaptasi model bahasa besar (LLM) untuk domain spesifik dan bahasa dengan sumber daya rendah.", icon: "Award", color: "bg-purple-50 text-purple-600" },
  ],
  publications: [
    { id: "p1", title: "Low-Resource NLP for Javanese Dialect Identification Using Transformer Models", journal: "Transactions on Asian and Low-Resource Language Processing", year: 2024, authors: "Wirawan, A., Santoso, B., Rahman, C.", tags: ["NLP", "Deep Learning"], cited: 12 },
    { id: "p2", title: "Cross-Lingual Transfer Learning for Indonesian Regional Languages", journal: "ACL Findings 2023", year: 2023, authors: "Wirawan, A., Kusuma, D.", tags: ["Transfer Learning", "Multilingual"], cited: 31 },
    { id: "p3", title: "Benchmark Dataset for Sentiment Analysis in Bahasa Sunda", journal: "Language Resources and Evaluation", year: 2023, authors: "Wirawan, A., Hidayat, F.", tags: ["Dataset", "Sentiment"], cited: 24 },
    { id: "p4", title: "Towards Inclusive AI: Endangered Language Preservation via NLP", journal: "AI & Society Journal", year: 2022, authors: "Wirawan, A., Amri, H.", tags: ["AI Ethics", "NLP"], cited: 47 },
  ],
  courses: [
    { id: "c1", code: "IK4201", name: "Kecerdasan Buatan", semester: "Ganjil", students: 72, hours: 3, desc: "Pengantar kecerdasan buatan: pencarian heuristik, representasi pengetahuan, machine learning.", rating: 4.8, level: "S1" },
    { id: "c2", code: "IK6031", name: "Deep Learning", semester: "Ganjil", students: 35, hours: 3, desc: "Neural network, CNN, RNN, Transformer, dan aplikasinya di computer vision dan NLP.", rating: 4.9, level: "S2" },
    { id: "c3", code: "IK5102", name: "Pemrosesan Bahasa Alami", semester: "Genap", students: 48, hours: 3, desc: "Text preprocessing, language models, sequence labeling, machine translation.", rating: 4.7, level: "S1/S2" },
  ],
  projects: [
    { id: "pr1", title: "NusaNLP: Corpus Bahasa Daerah Nusantara", funder: "Kemdikbudristek", year: "2023–2025", desc: "Membangun korpus terbesar untuk 20 bahasa daerah Indonesia guna melatih model NLP inklusif." },
    { id: "pr2", title: "IndoBERT Extension for Regional Dialects", funder: "Google Research", year: "2024–2025", desc: "Ekstensi model BERT untuk menangani variasi dialek bahasa Indonesia dan daerah." },
  ],
  contact: {
    email: "a.wirawan@ui.ac.id",
    phone: "+62 21 7867222 ext. 3421",
    address: "Fakultas Ilmu Komputer, Universitas Indonesia, Depok 16424",
    scholar: "https://scholar.google.com",
    linkedin: "https://linkedin.com/in/andiwirawan",
    github: "https://github.com/andiwirawan",
    officeHours: "Senin & Rabu, 13.00–15.00 · Ruang 302, Gedung Ilmu Komputer",
  },
  theme: {
    pageBg: "#F0F4F8",
    h1: "#071E3D", h2: "#0D3352", h3: "#0A5C64",
    p1: "#1A6B72", p2: "#2A9D8F", p3: "#14B8A6",
    p4: "#6EE7DF", pb: "#E6F6F5",
  },
};
