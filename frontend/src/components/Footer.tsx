import Link from 'next/link';
import { Code2, Globe, MessageSquare, Mail, Phone } from 'lucide-react';

const categories = ['AI/ML', 'Full Stack', 'Java', 'Python', 'MERN'];
const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/categories', label: 'Categories' },
  { href: '/custom-request', label: 'Custom Request' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand — full width on mobile */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
                <Code2 size={17} className="text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-text">Project</span>
                <span className="text-white">Hub</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              The premier marketplace for engineering students to discover and acquire
              high-quality academic and software projects.
            </p>
            <div className="flex items-center gap-3">
              {[Globe, MessageSquare].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories + Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2 mb-6">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link href={`/projects?category=${cat}`}
                    className="text-sm text-slate-400 hover:text-violet-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-violet-400 transition-colors flex-shrink-0" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <a href="mailto:admin@projecthub.dev"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                <Mail size={13} className="flex-shrink-0" />
                <span className="truncate">admin@projecthub.dev</span>
              </a>
              <a href="tel:+919999999999"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                <Phone size={13} className="flex-shrink-0" />
                +91 99999 99999
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} ProjectHub. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">Built for engineering students 🚀</p>
        </div>
      </div>
    </footer>
  );
}