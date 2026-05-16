'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Code2, Zap, User as UserIcon, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/categories', label: 'Categories' },
  { href: '/custom-request', label: 'Custom Request' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'glass-card border-b border-white/10 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
            <Code2 size={15} className="text-white" />
          </div>
          <span className="text-base sm:text-lg font-bold">
            <span className="gradient-text">Project</span>
            <span className="text-white">Hub</span>
          </span>
        </Link>

        {/* Desktop Nav — hidden below lg */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-200 relative group ${active ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/my-projects" className={`flex items-center gap-2 text-sm font-bold transition-all px-4 py-2 rounded-xl ${pathname === '/my-projects' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <LayoutDashboard size={15} className="text-cyan-400" /> My Projects
              </Link>
              <div className="h-6 w-px bg-white/10" />
              <button onClick={logout} className="text-slate-500 hover:text-red-400 transition-colors p-2" title="Logout">
                <LogOut size={16} />
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-cyan-400/10">
                {user.name[0]}
              </div>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-2 font-bold">
                Login
              </Link>
              <Link
                href="/projects"
                className="btn-primary flex items-center gap-1.5 text-sm font-bold px-5 py-2 rounded-full shadow-lg shadow-cyan-400/10"
              >
                <Zap size={13} /> Browse
              </Link>
            </>
          )}
        </div>

        {/* Tablet CTA (md only, no full nav) */}
        <div className="hidden md:flex lg:hidden items-center gap-3">
          <Link href="/projects" className="btn-primary flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full">
            <Zap size={13} /> Browse
          </Link>
          <button
            className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg glass-card"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile/Tablet Menu Drawer */}
      {menuOpen && (
        <div className="lg:hidden border-t border-white/8 px-4 sm:px-6 py-6 flex flex-col gap-1" style={{ background: 'var(--bg-secondary)' }}>
          {user && (
            <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-cyan-400/10">
                {user.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold truncate leading-none mb-1">{user.name}</p>
                <p className="text-slate-500 text-xs truncate">{user.email}</p>
              </div>
              <button onClick={logout} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          )}

          <div className="space-y-1 mb-6">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between py-3 px-3 text-sm rounded-xl transition-all ${active ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  {link.label}
                  <ChevronDown size={14} className="-rotate-90 text-slate-600" />
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/8">
            {user ? (
              <Link href="/my-projects" className="btn-primary w-full text-center py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2">
                <LayoutDashboard size={16} /> My Projects Dashboard
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/login" className="flex-1 text-center text-sm font-bold text-slate-400 border border-white/10 py-3.5 rounded-2xl hover:text-white hover:border-white/20 transition-all">
                  Login
                </Link>
                <Link href="/register" className="flex-1 text-center text-sm font-bold text-white bg-white/10 py-3.5 rounded-2xl hover:bg-white/20 transition-all">
                  Register
                </Link>
              </div>
            )}
            <Link href="/projects" className="btn-primary w-full text-center py-4 rounded-2xl text-sm font-bold">
              Browse All Projects
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
