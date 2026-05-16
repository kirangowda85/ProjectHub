'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, FolderOpen, MessageSquare,
  Code2, LogOut, Menu, X, ChevronRight, User, Eye
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/projects', icon: FolderOpen, label: 'Manage Projects' },
  { href: '/admin/inquiries', icon: MessageSquare, label: 'Student Inquiries' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('ph_admin');
    if (stored === 'true') setAuthed(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      sessionStorage.setItem('ph_admin', 'true');
      setAuthed(true);
      setError('');
    } else {
      setError('Incorrect password. Try admin123');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ph_admin');
    setAuthed(false);
    router.push('/');
  };

  // Close sidebar on route change for mobile
  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6" style={{ background: 'var(--bg-primary)' }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #8b5cf6 0%, transparent 50%)' }} />
        <div className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden w-full max-w-md border border-white/10 relative z-10 shadow-2xl">
          <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" />
          <div className="p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-8 sm:mb-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center shadow-lg">
                <Code2 size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg sm:text-xl tracking-tight">ProjectHub Admin</h1>
                <p className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-widest font-bold">Secure Gateway</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
              {error && (
                <div className="text-red-400 text-xs sm:text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 animate-shake">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-[10px] sm:text-xs text-slate-400 mb-1.5 font-bold uppercase tracking-wider ml-1">Admin Password</label>
                <div className="relative">
                  <input
                    type="password" required value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-all"
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold shadow-xl">
                Login to Dashboard
              </button>
            </form>

            <div className="mt-6 sm:mt-8 p-3.5 rounded-xl sm:rounded-2xl bg-cyan-500/5 border border-cyan-500/10 text-center">
              <p className="text-[10px] sm:text-xs text-cyan-400/70 font-medium">Demo Access: <span className="font-bold text-cyan-400 font-mono tracking-wider ml-1">admin123</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: 'var(--bg-primary)' }}>
      {/* ── SIDEBAR ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-80 lg:w-72 glass-card border-r border-white/8 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo Section */}
        <div className="p-6 sm:p-8 border-b border-white/8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center shadow-lg">
              <Code2 size={18} className="text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight">
                <span className="gradient-text">Project</span>
                <span className="text-white">Hub</span>
              </span>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold leading-none mt-0.5">Control Center</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 sm:p-6 space-y-2 overflow-y-auto">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-4 mb-4">Main Navigation</p>
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-bold transition-all group ${
                  active
                    ? 'bg-gradient-to-r from-cyan-500/10 to-violet-500/10 text-white border border-white/10 shadow-lg'
                    : 'text-slate-500 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className={`transition-colors ${active ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'}`}>
                  <Icon size={18} />
                </div>
                {label}
                {active && <ChevronRight size={14} className="ml-auto text-cyan-400" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-white/8 space-y-2">
          <Link href="/" className="flex items-center gap-4 px-5 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-white hover:bg-white/5 transition-all">
            <Eye size={18} className="text-slate-600" /> View Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} className="text-red-400/70" /> Logout Session
          </button>
        </div>
      </aside>

      {/* ── MOBILE OVERLAY ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="glass-card border-b border-white/8 px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between sticky top-0 z-30 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-95"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden sm:block">
              <p className="text-xs text-slate-500 font-medium mb-0.5 uppercase tracking-widest">Management Panel</p>
              <h2 className="text-white font-bold text-sm sm:text-base">Logged in as <span className="text-cyan-400">Administrator</span></h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden xs:flex flex-col items-end mr-1">
              <span className="text-white font-bold text-xs">Admin User</span>
              <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-green-500 animate-ping" /> Online
              </span>
            </div>
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-sm sm:text-base font-black text-white shadow-xl border-2 border-white/10">
              <User size={18} />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
