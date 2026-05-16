'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft, ExternalLink, ShoppingCart, Check, ChevronRight,
  Code2, FileText, Zap, PlayCircle
} from 'lucide-react';
import { projectApi, type Project } from '@/lib/api';
import InquiryModal from '@/components/InquiryModal';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    projectApi.getById(Number(id))
      .then(r => { setProject(r.data); setActiveImage(r.data.thumbnail || null); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-4">
      <div className="glass-card rounded-2xl p-8 flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Loading project...</p>
      </div>
    </div>
  );

  if (notFound || !project) return (
    <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="text-6xl">😕</div>
      <h1 className="text-xl sm:text-2xl font-bold text-white">Project Not Found</h1>
      <p className="text-slate-400 text-sm sm:text-base">This project may have been removed or doesn't exist.</p>
      <Link href="/projects" className="btn-primary px-6 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-2">
        <ArrowLeft size={14} /> Back to Projects
      </Link>
    </div>
  );

  const techList = project.technology?.split(',').map(t => t.trim()) || [];
  const featureList = project.features?.split(',').map(f => f.trim()) || [];
  const filesList = project.includedFiles?.split(',').map(f => f.trim()) || [];
  const screenshots = project.screenshots?.split(',').map(s => s.trim()).filter(Boolean) || [];
  const allImages = [project.thumbnail, ...screenshots].filter(Boolean) as string[];

  return (
    <>
      <div className="min-h-screen pt-20 sm:pt-24 pb-16 px-4 sm:px-6" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
            <ChevronRight size={12} />
            <span className="text-slate-300 truncate max-w-[160px] sm:max-w-xs">{project.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            {/* LEFT: Images & Details */}
            <div className="lg:col-span-2 space-y-5 sm:space-y-8">
              {/* Main Image */}
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="relative aspect-video bg-slate-800/50">
                  {activeImage ? (
                    <Image src={activeImage} alt={project.title} fill className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw" priority />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Code2 size={60} className="text-slate-600" />
                    </div>
                  )}
                </div>
                {allImages.length > 1 && (
                  <div className="flex gap-2 sm:gap-3 p-3 sm:p-4 overflow-x-auto">
                    {allImages.map((img, i) => (
                      <button key={i} onClick={() => setActiveImage(img)}
                        className={`relative w-16 sm:w-20 h-12 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                          activeImage === img ? 'border-cyan-400' : 'border-white/10 hover:border-white/30'
                        }`}>
                        <Image src={img} alt={`Screenshot ${i}`} fill className="object-cover" sizes="80px" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Price + Buy (visible only on mobile — before description) */}
              <div className="lg:hidden glass-card rounded-2xl p-4 sm:p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-slate-400 text-xs mb-0.5">Price</p>
                    <p className="text-3xl font-black gradient-text">₹{project.price.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="tech-badge">{project.category}</span>
                    {project.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">⭐</span>}
                  </div>
                </div>
                <button onClick={() => setShowModal(true)}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold mb-2">
                  <ShoppingCart size={15} /> Buy Now – Inquire
                </button>
                {project.demoLink && (
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                    className="btn-outline w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold">
                    <PlayCircle size={14} /> Watch Demo <ExternalLink size={11} />
                  </a>
                )}
              </div>

              {/* Description */}
              <div className="glass-card rounded-2xl p-5 sm:p-8">
                <h2 className="text-white font-bold text-lg sm:text-xl mb-3 sm:mb-4 flex items-center gap-2">
                  <FileText size={17} className="text-cyan-400" /> Project Description
                </h2>
                <p className="text-slate-400 leading-relaxed text-sm">{project.description}</p>
              </div>

              {/* Features */}
              {featureList.length > 0 && (
                <div className="glass-card rounded-2xl p-5 sm:p-8">
                  <h2 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-5 flex items-center gap-2">
                    <Zap size={17} className="text-violet-400" /> Key Features
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {featureList.map((feature) => (
                      <div key={feature} className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                          <Check size={10} className="text-green-400" />
                        </div>
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Included Files */}
              {filesList.length > 0 && (
                <div className="glass-card rounded-2xl p-5 sm:p-8">
                  <h2 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-5 flex items-center gap-2">
                    <Code2 size={17} className="text-cyan-400" /> What's Included
                  </h2>
                  <div className="space-y-2 sm:space-y-3">
                    {filesList.map((file) => (
                      <div key={file} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                        <span className="text-base sm:text-lg">📁</span>
                        <span className="text-slate-300 text-sm">{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Sidebar — desktop only */}
            <div className="hidden lg:block">
              <div className="glass-card rounded-2xl p-6 sticky top-24 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="tech-badge">{project.category}</span>
                  {project.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">⭐ Featured</span>}
                </div>

                <h1 className="text-white font-bold text-xl leading-tight mb-2">{project.title}</h1>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {techList.map(tech => <span key={tech} className="tech-badge">{tech}</span>)}
                </div>

                <div className="glass-card rounded-xl p-4 mb-5 text-center">
                  <p className="text-slate-400 text-xs mb-1">Project Price</p>
                  <p className="text-4xl font-black gradient-text">₹{project.price.toLocaleString()}</p>
                  <p className="text-slate-500 text-xs mt-1">One-time payment</p>
                </div>

                <button onClick={() => setShowModal(true)}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold mb-3">
                  <ShoppingCart size={16} /> Buy Now – Inquire
                </button>

                {project.demoLink && (
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                    className="btn-outline w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold">
                    <PlayCircle size={16} /> Watch Demo <ExternalLink size={12} />
                  </a>
                )}

                <div className="mt-5 space-y-2.5 pt-5 border-t border-white/8">
                  {['✅ Full source code included', '📄 Documentation & setup guide', '💬 WhatsApp support after purchase', '🔒 Secure manual delivery'].map(item => (
                    <p key={item} className="text-xs text-slate-400">{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && <InquiryModal projectId={project.id} projectTitle={project.title} onClose={() => setShowModal(false)} />}
    </>
  );
}
