import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Tag } from 'lucide-react';
import type { Project } from '@/lib/api';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const techList = project.technology?.split(',').map(t => t.trim()).slice(0, 3) || [];
  const extraTech = (project.technology?.split(',').length || 0) - 3;

  return (
    <Link href={`/project/${project.id}`} className="gradient-border group block h-full">
      <div className="glass-card rounded-2xl overflow-hidden transition-all duration-300 group-hover:bg-white/[0.07] h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-800/50 flex-shrink-0">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl">💻</div>
            </div>
          )}
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="tech-badge backdrop-blur-md bg-black/40 border-cyan-400/40">{project.category}</span>
          </div>
          {project.featured && (
            <div className="absolute top-3 right-3">
              <span className="text-xs px-2 py-1 rounded-full bg-violet-500/80 text-white font-semibold backdrop-blur-md">
                ⭐ Featured
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <h3 className="text-white font-semibold text-sm sm:text-base leading-tight mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
            {project.title}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
            {techList.map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
            {extraTech > 0 && (
              <span className="tech-badge opacity-60">+{extraTech}</span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/8">
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Starting at</p>
              <p className="text-lg sm:text-xl font-bold gradient-text">₹{project.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-cyan-400 transition-colors">
              <ExternalLink size={12} />
              <span className="hidden sm:inline">View Details</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
