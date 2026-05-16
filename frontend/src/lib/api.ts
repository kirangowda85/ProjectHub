import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  college?: string;
  githubUsername?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  technology: string;
  price: number;
  thumbnail?: string;
  screenshots?: string;
  demoLink?: string;
  features?: string;
  includedFiles?: string;
  featured: boolean;
  privateGithubLink?: string;
  createdAt: string;
}

export interface Inquiry {
  id: number;
  projectId: number;
  projectTitle: string;
  projectThumbnail?: string;
  userId?: number;
  name: string;
  email: string;
  phone: string;
  college: string;
  message?: string;
  githubUsername?: string;
  privateGithubLink?: string;
  status: 'PENDING' | 'CONTACTED' | 'PAID' | 'COMPLETED';
  createdAt: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalInquiries: number;
  pendingInquiries: number;
  contactedInquiries: number;
  paidInquiries: number;
  completedInquiries: number;
}

export interface InquiryRequest {
  projectId: number;
  userId?: number;
  name: string;
  email: string;
  phone: string;
  college: string;
  message?: string;
}

export interface ProjectRequest {
  title: string;
  description: string;
  category: string;
  technology: string;
  price: number;
  thumbnail?: string;
  screenshots?: string;
  demoLink?: string;
  features?: string;
  includedFiles?: string;
  featured?: boolean;
  privateGithubLink?: string;
}

// ─── Auth API ───────────────────────────────────────────────
export const authApi = {
  login: (data: any) => api.post<User>('/auth/login', data),
  register: (data: any) => api.post<User>('/auth/register', data),
};

// ─── Project API ────────────────────────────────────────────
export const projectApi = {
  getAll: (category?: string) =>
    api.get<Project[]>('/projects', { params: category ? { category } : {} }),
  getFeatured: () => api.get<Project[]>('/projects/featured'),
  getById: (id: number) => api.get<Project>(`/projects/${id}`),
  create: (data: ProjectRequest) => api.post<Project>('/projects', data),
  update: (id: number, data: ProjectRequest) => api.put<Project>(`/projects/${id}`, data),
  delete: (id: number) => api.delete(`/projects/${id}`),
};

// ─── Inquiry API ─────────────────────────────────────────────
export const inquiryApi = {
  create: (data: InquiryRequest) => api.post<Inquiry>('/inquiries', data),
  getAll: (status?: string) =>
    api.get<Inquiry[]>('/inquiries', { params: status ? { status } : {} }),
  updateStatus: (id: number, status: string) =>
    api.patch<Inquiry>(`/inquiries/${id}/status`, { status }),
  getStats: () => api.get<DashboardStats>('/inquiries/stats'),
  getByUser: (userId: number) => api.get<Inquiry[]>(`/inquiries/user/${userId}`),
  updateGithub: (id: number, githubUsername: string) => 
    api.patch<Inquiry>(`/inquiries/${id}/github`, { githubUsername }),
};

export default api;
