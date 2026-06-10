export interface FileEntry {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  category: string;
  description: string;
  dataUrl: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface ResearchArea {
  id: string;
  title: string;
  desc: string;
  icon: "BookOpen" | "Globe" | "Award" | "Cpu" | "BarChart" | "Layers";
  color: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: number;
  authors: string;
  tags: string[];
  cited: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  semester: string;
  students: number;
  hours: number;
  desc: string;
  rating: number;
  level: string;
}

export interface Project {
  id: string;
  title: string;
  funder: string;
  year: string;
  desc: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  scholar: string;
  linkedin: string;
  github: string;
  officeHours: string;
}

export interface Theme {
  pageBg: string;
  h1: string; // hero gradient start
  h2: string; // hero gradient mid
  h3: string; // hero gradient end
  p1: string; // primary dark
  p2: string; // primary mid
  p3: string; // primary bright
  p4: string; // text on dark backgrounds
  pb: string; // primary background tint
}

export interface Profile {
  name: string;
  initials: string;
  badge: string;
  department: string;
  university: string;
  bio: string;
  photo: string | null;
  skills: string[];
  stats: Stat[];
  education: Education[];
  researchAreas: ResearchArea[];
  publications: Publication[];
  courses: Course[];
  projects: Project[];
  contact: ContactInfo;
  theme: Theme;
}
