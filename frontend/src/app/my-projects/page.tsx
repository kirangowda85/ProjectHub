'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { inquiryApi, type Inquiry } from '@/lib/api';
import { 
  FolderOpen, Clock, CheckCircle2, Github, ExternalLink, 
  Loader2, AlertCircle, Send, ShieldCheck, CreditCard
} from 'lucide-react';
import Link from 'next/link';

export default function MyProjectsPage() {
  const { user, loading: authLoading } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingGithub, setUpdatingGithub] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchUserProjects();
    }
  }, [user]);

  const fetchUserProjects = async () => {
    try {
      setLoading(true);
      const res = await inquiryApi.getByUser(user!.id);
      setInquiries(res.data);
    } catch (err) {
      setError('Failed to fetch your projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGithub = async (inquiryId: number, username: string) => {
    if (!username.trim()) return;
    setUpdatingGithub(inquiryId);
    try {
      await inquiryApi.updateGithub(inquiryId, username);
      await fetchUserProjects();
    } catch (err) {
      alert('Failed to update GitHub username');
    } finally {
      setUpdatingGithub(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-3 ml-1">Student Dashboard</p>
            <h1 className="text-3xl sm:text-4xl font-black text-white">My <span className="gradient-text">Projects</span></h1>
          </div>
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 pr-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg">
              {user?.name?.[0]}
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none mb-1">{user?.name}</p>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">{user?.email}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-6 rounded-3xl bg-red-400/10 border border-red-400/20 text-red-400 flex items-center gap-3 mb-8">
            <AlertCircle size={20} /> {error}
          </div>
        )}

        {inquiries.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center border border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
              <FolderOpen size={32} className="text-slate-600" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">No projects yet</h2>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
              You haven't bought or inquired about any projects yet. 
              Browse our catalog to find your next engineering masterpiece.
            </p>
            <Link href="/projects" className="btn-primary px-8 py-3.5 rounded-2xl text-sm font-bold shadow-xl inline-flex items-center gap-2">
              Browse Projects <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {inquiries.map((inq) => (
              <ProjectStatusCard key={inq.id} inq={inq} onUpdateGithub={handleUpdateGithub} isUpdating={updatingGithub === inq.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectStatusCard({ inq, onUpdateGithub, isUpdating }: { inq: Inquiry, onUpdateGithub: (id: number, u: string) => void, isUpdating: boolean }) {
  const [githubInput, setGithubInput] = useState(inq.githubUsername || '');

  const statusConfig = {
    PENDING: { color: 'text-amber-400', bg: 'bg-amber-400/10', label: 'Awaiting Response', icon: Clock },
    CONTACTED: { color: 'text-cyan-400', bg: 'bg-cyan-400/10', label: 'Admin Contacted', icon: Send },
    PAID: { color: 'text-violet-400', bg: 'bg-violet-400/10', label: 'Payment Verified', icon: CreditCard },
    COMPLETED: { color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'Access Granted', icon: CheckCircle2 },
  };

  const currentStatus = statusConfig[inq.status];
  const StatusIcon = currentStatus.icon;

  return (
    <div className="glass-card rounded-3xl border border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-500">
      <div className="flex flex-col lg:flex-row">
        {/* Project Info Section */}
        <div className="p-6 sm:p-8 lg:w-2/5 border-b lg:border-b-0 lg:border-r border-white/5">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/5 overflow-hidden flex-shrink-0 border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-500">
              {inq.projectThumbnail ? (
                <img src={inq.projectThumbnail} alt={inq.projectTitle} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-700">
                  <FolderOpen size={32} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`${currentStatus.bg} ${currentStatus.color} text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 mb-3`}>
                <StatusIcon size={12} />
                {currentStatus.label}
              </div>
              <h3 className="text-white font-bold text-lg sm:text-xl truncate group-hover:text-cyan-400 transition-colors mb-1">{inq.projectTitle}</h3>
              <p className="text-slate-500 text-xs font-medium">Order ID: <span className="text-slate-400 font-mono">#PH-{inq.id.toString().padStart(5, '0')}</span></p>
            </div>
          </div>
        </div>

        {/* Action/Access Section */}
        <div className="p-6 sm:p-8 flex-1 bg-white/[0.02]">
          {inq.status === 'PENDING' || inq.status === 'CONTACTED' ? (
            <div className="h-full flex flex-col justify-center">
              <div className="flex items-center gap-4 text-slate-400">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={20} className="text-amber-400/70" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">Process Incomplete</p>
                  <p className="text-xs leading-relaxed max-w-md">Our admin will contact you on WhatsApp/Email for the next steps and payment details. Please wait for a few hours.</p>
                </div>
              </div>
            </div>
          ) : inq.status === 'PAID' ? (
            <div className="h-full flex flex-col justify-center space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-violet-400/10 flex items-center justify-center flex-shrink-0">
                  <Github size={20} className="text-violet-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white mb-1">Grant GitHub Access</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">Payment verified! Enter your GitHub username or email below. We will grant you access to the private repository within 1-2 hours.</p>
                  
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={githubInput}
                      onChange={(e) => setGithubInput(e.target.value)}
                      placeholder="GitHub username or email"
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-all"
                    />
                    <button 
                      onClick={() => onUpdateGithub(inq.id, githubInput)}
                      disabled={isUpdating || !githubInput.trim()}
                      className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                    >
                      {isUpdating ? <Loader2 size={14} className="animate-spin" /> : 'Submit'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-400/5">
                    <ShieldCheck size={24} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-1">Access Granted Successfully</p>
                    <p className="text-xs text-slate-400">Username: <span className="text-emerald-400 font-bold">{inq.githubUsername}</span></p>
                    <p className="text-xs text-slate-500 mt-1">You can now view the source code and documentation.</p>
                  </div>
                </div>
                <a 
                  href={inq.privateGithubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto btn-primary px-8 py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-xl shadow-cyan-400/10 group-hover:scale-105 transition-transform"
                >
                  <Github size={16} /> Open Repository <ExternalLink size={14} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
