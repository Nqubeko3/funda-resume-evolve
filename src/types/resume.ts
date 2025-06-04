
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  location: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
}

export interface Skill {
  category: string;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  references: Reference[];
  jobTitle: string;
  industry: string;
  targetJobDescription?: string;
}

export type Template = 
  | 'professional1' | 'professional2' | 'professional3' | 'professional4' | 'professional5'
  | 'modern1' | 'modern2' | 'modern3'
  | 'creative1';

export interface TemplateInfo {
  id: Template;
  name: string;
  category: 'Professional' | 'Modern' | 'Creative';
  description: string;
  preview: string;
  features: string[];
}

export interface ATSScore {
  overall: number;
  keywordMatch: number;
  formatting: number;
  readability: number;
  suggestions: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
}

export interface ExportOptions {
  format: 'pdf' | 'docx' | 'html';
  quality: 'standard' | 'high';
  includeReferences: boolean;
}
