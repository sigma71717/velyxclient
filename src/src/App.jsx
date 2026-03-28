import React, { useState, useEffect, createContext, useContext, useCallback, useRef, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sword, Eye, Move, Settings, Zap, Shield, ChevronRight, Activity, 
  ExternalLink, Download, LayoutDashboard, Database, User, Lock, 
  Mail, Home, BarChart3, Terminal as ConsoleIcon, LogOut, Bell, Search, Settings2,
  Users, CheckCircle, XCircle, Clock, Trash2, Edit3, ShieldAlert, MessageSquare, Star, 
  Layers, HardDrive, Cpu, Globe, Rocket, Send, Plus, Info, X, Heart, 
  Code2, Cloud, ZapOff, Sparkles, MousePointer2, FileText
} from 'lucide-react';

// ─── Particle Background System ───────────────────────────────────────────────
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);

    // Create particles
    const PARTICLE_COUNT = Math.min(120, Math.floor((width * height) / 12000));
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        hue: Math.random() > 0.7 ? 280 : 260, // purple hues
      });
    }
    particlesRef.current = particles;

    // Floating orbs (larger glowing elements)
    const orbs = [];
    for (let i = 0; i < 5; i++) {
      orbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 80 + 40,
        opacity: Math.random() * 0.04 + 0.02,
        hue: 270 + Math.random() * 30,
      });
    }

    // Stars (tiny twinkling dots)
    const stars = [];
    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
      });
    }

    const CONNECTION_DIST = 140;
    const MOUSE_DIST = 200;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw orbs
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, `hsla(${orb.hue}, 60%, 50%, ${orb.opacity})`);
        gradient.addColorStop(1, `hsla(${orb.hue}, 60%, 50%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw stars
      for (const star of stars) {
        star.twinkle += star.twinkleSpeed;
        const alpha = 0.2 + Math.sin(star.twinkle) * 0.2;
        ctx.fillStyle = `rgba(200, 180, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      const mouse = mouseRef.current;

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulse += p.pulseSpeed;
        const pulseAlpha = p.opacity + Math.sin(p.pulse) * 0.15;

        // Mouse interaction – gentle repulsion
        const dxM = p.x - mouse.x;
        const dyM = p.y - mouse.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < MOUSE_DIST && distM > 0) {
          const force = (1 - distM / MOUSE_DIST) * 0.8;
          p.vx += (dxM / distM) * force;
          p.vy += (dyM / distM) * force;
        }

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Limit speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5;
          p.vy = (p.vy / speed) * 1.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw particle glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grd.addColorStop(0, `hsla(${p.hue}, 70%, 65%, ${pulseAlpha * 0.6})`);
        grd.addColorStop(1, `hsla(${p.hue}, 70%, 65%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle core
        ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${pulseAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
            ctx.strokeStyle = `hsla(270, 60%, 60%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        // Mouse connections
        if (distM < MOUSE_DIST && distM > 0) {
          const alpha = (1 - distM / MOUSE_DIST) * 0.25;
          ctx.strokeStyle = `hsla(280, 80%, 70%, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Mouse glow
      if (mouse.x > 0 && mouse.y > 0) {
        const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        mouseGlow.addColorStop(0, 'hsla(280, 80%, 60%, 0.05)');
        mouseGlow.addColorStop(1, 'hsla(280, 80%, 60%, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

// ─── Floating Geometric Shapes (CSS-based) ────────────────────────────────────
const FloatingShapes = () => {
  const shapes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20,
      type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)],
      opacity: Math.random() * 0.04 + 0.01,
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {shapes.map(s => (
        <motion.div
          key={s.id}
          animate={{
            x: [0, Math.random() * 100 - 50, Math.random() * 80 - 40, 0],
            y: [0, Math.random() * 80 - 40, Math.random() * 100 - 50, 0],
            rotate: [s.rotation, s.rotation + 180, s.rotation + 360],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: s.delay,
          }}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: s.type === 'circle' ? '50%' : s.type === 'square' ? '8px' : '0',
            border: `1px solid rgba(155, 89, 182, ${s.opacity * 3})`,
            background: s.type === 'triangle'
              ? 'none'
              : `rgba(155, 89, 182, ${s.opacity})`,
            clipPath: s.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
          }}
        />
      ))}
    </div>
  );
};

// ─── Data Helpers ──────────────────────────────────────────────────────────────

const LICENSES_KEY = 'velyx_licenses_v1';
const LAUNCHER_URL_KEY = 'velyx_launcher_url_v1';
const CHANGELOG_KEY = 'velyx_changelog_v1';

const safeJsonParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const loadLicenses = () => safeJsonParse(localStorage.getItem(LICENSES_KEY), []);
const saveLicenses = (licenses) => localStorage.setItem(LICENSES_KEY, JSON.stringify(licenses));

const normalizeName = (name) => (name || '').trim().toLowerCase();

const hasActiveLicense = (username) => {
  const key = normalizeName(username);
  if (!key) return false;
  const licenses = loadLicenses();
  return licenses.some(l => l.username === key && l.active);
};

const grantLicense = (username, grantedBy = 'admin') => {
  const key = normalizeName(username);
  if (!key) throw new Error('Brak nazwy użytkownika');
  const licenses = loadLicenses();
  const now = Date.now();
  const existing = licenses.find(l => l.username === key);
  if (existing) {
    existing.active = true;
    existing.updatedAt = now;
    existing.grantedBy = grantedBy;
  } else {
    licenses.unshift({
      id: crypto?.randomUUID?.() || String(now),
      username: key,
      active: true,
      grantedBy,
      createdAt: now,
      updatedAt: now,
    });
  }
  saveLicenses(licenses);
};

const revokeLicense = (username) => {
  const key = normalizeName(username);
  if (!key) return;
  const licenses = loadLicenses();
  const existing = licenses.find(l => l.username === key);
  if (existing) {
    existing.active = false;
    existing.updatedAt = Date.now();
    saveLicenses(licenses);
  }
};

const loadLauncherUrl = () => (localStorage.getItem(LAUNCHER_URL_KEY) || '').trim();
const saveLauncherUrl = (url) => localStorage.setItem(LAUNCHER_URL_KEY, (url || '').trim());

const loadChangelog = () => safeJsonParse(localStorage.getItem(CHANGELOG_KEY), []);
const saveChangelog = (entries) => localStorage.setItem(CHANGELOG_KEY, JSON.stringify(entries));

const formatShortDate = (ts) => {
  const d = new Date(ts);
  const day = String(d.getDate()).padStart(2, '0');
  const month = d.toLocaleString('pl-PL', { month: 'short' }).toUpperCase();
  return `${day} ${month}`;
};

const addChangelogEntry = ({ title, description }) => {
  const t = (title || '').trim();
  const desc = (description || '').trim();
  if (!t) throw new Error('Brak tytułu wpisu');
  if (!desc) throw new Error('Brak opisu wpisu');
  const entries = loadChangelog();
  const now = Date.now();
  entries.unshift({
    id: crypto?.randomUUID?.() || String(now),
    title: t,
    description: desc,
    createdAt: now,
    dateLabel: formatShortDate(now),
  });
  saveChangelog(entries.slice(0, 20));
};

// ─── Auth Context ──────────────────────────────────────────────────────────────

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('velyx_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [licenseActive, setLicenseActive] = useState(() => hasActiveLicense(user?.name));
  const [launcherUrl, setLauncherUrlState] = useState(() => loadLauncherUrl());
  const [changelog, setChangelog] = useState(() => loadChangelog());

  const refreshEntitlements = useCallback((u = user) => {
    setLicenseActive(hasActiveLicense(u?.name));
    setLauncherUrlState(loadLauncherUrl());
    setChangelog(loadChangelog());
  }, [user]);

  const login = (userData) => {
    const adminUser = { id: 1, name: 'Admin', role: 'admin', premium: true, avatar: 'A' };
    const regularUser = { id: 2, name: userData.name || 'User', role: 'user', premium: true, avatar: 'U' };
    const session = userData.name.toLowerCase() === 'admin' ? adminUser : regularUser;
    setUser(session);
    localStorage.setItem('velyx_user', JSON.stringify(session));
    refreshEntitlements(session);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('velyx_user');
    setLicenseActive(false);
  };

  const adminSetLauncherUrl = (url) => { saveLauncherUrl(url); refreshEntitlements(); };
  const adminGrantLicense = (username) => { grantLicense(username, user?.name || 'admin'); refreshEntitlements(); };
  const adminRevokeLicense = (username) => { revokeLicense(username); refreshEntitlements(); };
  const adminListLicenses = () => loadLicenses();
  const adminAddChangelogEntry = (entry) => { addChangelogEntry(entry); refreshEntitlements(); };
  const adminListChangelog = () => loadChangelog();

  useEffect(() => { refreshEntitlements(); }, [user?.name, refreshEntitlements]);

  return (
    <AuthContext.Provider value={{ user, login, logout, licenseActive, launcherUrl, changelog, refreshEntitlements, adminSetLauncherUrl, adminGrantLicense, adminRevokeLicense, adminListLicenses, adminAddChangelogEntry, adminListChangelog }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// ─── Page Animation Wrapper ───────────────────────────────────────────────────

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

// ─── Protected Route ──────────────────────────────────────────────────────────

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" />;
  return children;
};

// ─── Toast System ─────────────────────────────────────────────────────────────

const Toast = ({ message, type, onClose }) => (
  <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }} className={`toast ${type}`}>
    {type === 'success' ? <CheckCircle size={20} color="#00ff88" /> : <Info size={20} color="var(--primary)" />}
    <span>{message}</span>
    <X size={16} className="close-toast" onClick={onClose} />
  </motion.div>
);

// ─── Shared Components ────────────────────────────────────────────────────────

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDashboard) return null;

  return (
    <motion.nav
      className={`glass ${scrolled ? 'nav-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container nav-inner">
        <Link to="/" className="logo">VELYX<span>CLIENT</span></Link>
        <ul className="nav-links">
          <li><a href="#about">O nas</a></li>
          <li><a href="#features">Funkcje</a></li>
          <li><a href="#pricing">Cennik</a></li>
          <li><a href="#reviews">Opinie</a></li>
        </ul>
        <div className="nav-actions">
          {user ? (
            <div className="nav-user">
              <Link to="/dashboard" className="nav-cta">Panel sterowania</Link>
              <button onClick={logout} className="secondary-btn" style={{ padding: '10px' }} title="Wyloguj sesję"><LogOut size={18} /></button>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-login">Logowanie</Link>
              <Link to="/register" className="glow-btn" style={{ padding: '12px 28px' }}>Rozpocznij</Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

const SectionTitle = ({ title, subtitle, align = 'center' }) => (
  <div style={{ textAlign: align, marginBottom: '6rem' }}>
    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-title" style={{ fontSize: '3.5rem', fontWeight: 900 }}>{title}</motion.h2>
    {subtitle && <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: 'var(--text-dim)', borderLeft: '3px solid var(--primary)', paddingLeft: '1.5rem', display: 'inline-block', maxWidth: '650px', fontSize: '1.25rem', marginTop: '1rem', lineHeight: 1.8 }}>{subtitle}</motion.p>}
  </div>
);

// ─── Animated Counter ─────────────────────────────────────────────────────────

const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ─── Pages ────────────────────────────────────────────────────────────────────

const LandingPage = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('velyx_reviews');
    return saved ? JSON.parse(saved) : [];
  });
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const addReview = (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    const review = { id: Date.now(), name: user?.name || 'Anonim', text: newReview, rating, date: new Date().toLocaleDateString() };
    const updated = [review, ...reviews];
    setReviews(updated);
    localStorage.setItem('velyx_reviews', JSON.stringify(updated));
    setNewReview('');
    showToast('Opinia wysłana pomyślnie! 🚀');
  };

  const removeReview = (id) => {
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    localStorage.setItem('velyx_reviews', JSON.stringify(updated));
    showToast('Usunięto opinię z bazy.', 'info');
  };

  return (
    <PageTransition>
      <section className="hero container">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            style={{ display: 'inline-flex', padding: '10px 24px', borderRadius: '40px', background: 'rgba(155, 89, 182, 0.08)', border: '1px solid rgba(155, 89, 182, 0.15)', color: 'var(--primary)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '2.5rem', letterSpacing: '1px' }}
          >
            <Sparkles size={14} style={{ marginRight: '8px' }} /> WERSJA BETA v1.0 STABLE
          </motion.div>
          <h1 className="hero-title" style={{ fontSize: '6rem' }}>
            Nowa Era <br />
            <span className="text-gradient">Przewagi Technologicznej</span>
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '1.5rem', maxWidth: '750px' }}>
            Odkryj potęgę Velyx Client. Jedyny silnik dedykowany dla graczy, którzy nie akceptują drugiego miejsca.
          </p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '3rem', marginBottom: '2rem' }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)' }}><AnimatedCounter target={100} suffix="+" /></div>
              <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Użytkowników</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)' }}><AnimatedCounter target={99} suffix="%" /></div>
              <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Uptime</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)' }}><AnimatedCounter target={50} suffix="+" /></div>
              <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Modułów</div>
            </div>
          </motion.div>

          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
            <Link to="/register" className="glow-btn" style={{ padding: '20px 50px', fontSize: '1.2rem' }}>Zacznij Dominować <ChevronRight size={24} /></Link>
            <a href="#about" className="secondary-btn" style={{ padding: '20px 50px', fontSize: '1.2rem' }}>Odkryj Projekt</a>
          </div>
        </motion.div>
      </section>

      <section id="about" className="container" style={{ padding: '120px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <div>
            <SectionTitle title="Standard Elite" subtitle="Velyx Client to nie tylko oprogramowanie. To ekosystem stworzony przez pasjonatów dla najbardziej wymagających użytkowników." align="left" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} className="glass-card" style={{ padding: '2rem' }}>
                <Cloud size={32} color="var(--primary)" />
                <h4 style={{ margin: '1rem 0' }}>Cloud Sync</h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Twoje ustawienia zawsze z Tobą, na każdym urządzeniu.</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} className="glass-card" style={{ padding: '2rem' }}>
                <ZapOff size={32} color="var(--primary)" />
                <h4 style={{ margin: '1rem 0' }}>Zero Latency</h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Nasze drivery działają w trybie Kernel dla najniższych pingów.</p>
              </motion.div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-panel" style={{ padding: '4rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Dlaczego Velyx?</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'Niewykrywalny silnik Bypass Engine 2.0',
                'Aktualizacje w czasie rzeczywistym (No Downtime)',
                'Wsparcie dla Skryptów Lua & JS',
                'Dedykowany support 24/7',
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ marginBottom: '1.5rem', display: 'flex', gap: '15px' }}
                >
                  <CheckCircle color="#00ff88" /> <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            <button className="glow-btn" style={{ marginTop: '2rem' }}>Dowiedz się więcej</button>
          </motion.div>
        </div>
      </section>

      <section id="pricing" className="container" style={{ paddingBottom: '140px' }}>
        <SectionTitle title="Cennik" subtitle="Wybierz plan idealny dla Ciebie. Bez zobowiązań, anuluj w dowolnym momencie." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', maxWidth: '1100px', margin: '0 auto' }}>
          <PriceCard title="30d" price="20 PLN" delay={0} features={['Fajne moduły', 'kontakt z developerem', "dostep do kanału na dc"]} />
          <PriceCard title="180d" price="30 PLN" delay={0.1} highlighted={true} features={['Fajne moduły', 'kontakt z developerem', 'Dostep do wersji Beta', "dostep do kanału na dc"]} />
          <PriceCard title="LifeTime" price="40 PLN" delay={0.2} features={['Wszystko w Pakiecie 180d', 'Dostęp Wieczysty (Lifetime)', 'Dostęp do kanału na dc']} />
        </div>
      </section>

      <section id="features" className="container" style={{ paddingBottom: '120px' }}>
        <SectionTitle title="Technologia Jutra" subtitle="Zoptymalizowane moduły pisane w C++ dla absolutnej płynności i braku spadków FPS." />
        <div className="features-grid">
          <FeatureCard icon={Sword} title="Combat Suite" desc="Aimbot, Killaura i Triggerbot z symulacją ludzkich ruchów myszki." delay={0} />
          <FeatureCard icon={Eye} title="Visual Engine" desc="Rendering X-Ray i ESP bez obciążania procesora graficznego." delay={0.1} />
          <FeatureCard icon={MousePointer2} title="Clicker Elite" desc="Najszybszy Autoclicker na rynku z randomizacją interwałów." delay={0.2} />
          <FeatureCard icon={Settings2} title="Master Config" desc="Wymieniaj się ustawieniami z tysiącami graczy w naszej chmurze." delay={0.3} />
        </div>
      </section>

      <section id="reviews" className="container" style={{ paddingBottom: '120px' }}>
        <SectionTitle title="Echo Społeczności" subtitle="Zobacz co o Velyx Client mówią gracze z całego świata." />
        <div className="features-grid" style={{ justifyContent: 'center' }}>
          {reviews.length > 0 ? (
            reviews.map((r, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                key={r.id}
                className="glass-card review-card"
              >
                {user?.role === 'admin' && (
                  <button onClick={() => removeReview(r.id)} className="delete-btn" title="Usuń z bazy"><Trash2 size={16} /></button>
                )}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '1.2rem', justifyContent: 'center' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < r.rating ? 'var(--primary)' : 'none'} color={i < r.rating ? 'var(--primary)' : 'var(--text-dim)'} />)}
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '2rem', color: '#f0f0f0', fontSize: '1.15rem', lineHeight: 1.6, textAlign: 'center' }}>"{r.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center' }}>
                  <div className="review-avatar">{r.name[0]}</div>
                  <div>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', display: 'block', textAlign: 'center' }}>{r.name}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textAlign: 'center', display: 'block' }}>{r.date}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem', background: 'rgba(255,255,255,0.01)', borderRadius: '30px', border: '1px dashed var(--glass-border)' }}>
              <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>Brak opinii. Bądź pierwszą osobą, która oceni Velyx!</p>
            </div>
          )}
        </div>

        <div id="add-review" className="review-form glass-panel" style={{ marginTop: '6rem', maxWidth: '800px' }}>
          {user ? (
            <form onSubmit={addReview}>
              <h3 style={{ marginBottom: '2rem', fontSize: '2.2rem', fontWeight: 900 }}>Zostaw swoją ocenę</h3>
              <div style={{ marginBottom: '2.5rem', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Ocena:</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <motion.button type="button" whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }} key={i} onClick={() => setRating(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      <Star size={36} fill={i <= rating ? 'var(--primary)' : 'none'} color={i <= rating ? 'var(--primary)' : 'var(--text-dim)'} />
                    </motion.button>
                  ))}
                </div>
              </div>
              <textarea placeholder="Co sądzisz o naszym projekcie?" value={newReview} onChange={e => setNewReview(e.target.value)} required style={{ resize: 'vertical', minHeight: '120px', width: '100%', padding: '16px', border: '1px solid var(--glass-border)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', color: 'white', fontSize: '1rem' }} />
              <button type="submit" className="glow-btn" style={{ width: '100%', justifyContent: 'center', padding: '20px' }}>Opublikuj Opinię <Send size={20} /></button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <ShieldAlert size={64} color="var(--primary)" style={{ marginBottom: '1.5rem', opacity: 0.8 }} />
              <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Weryfikacja Konta</h3>
              <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem', maxWidth: '450px', marginInline: 'auto' }}>Tylko zarejestrowani użytkownicy mogą dodawać opinie.</p>
              <Link to="/login" className="glow-btn" style={{ padding: '16px 48px' }}>Przejdź do logowania</Link>
            </div>
          )}
        </div>
      </section>

      <footer className="glass" style={{ padding: '100px 0 50px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '5rem', textAlign: 'left' }}>
            <div>
              <div className="logo" style={{ marginBottom: '1.5rem' }}>VELYX<span>CLIENT</span></div>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.8 }}>Najlepszy wybór dla graczy Minecraft szukających niezawodnych rozwiązań od 2024 roku.</p>
              <div style={{ display: 'flex', gap: '15px', marginTop: '1.5rem' }}>
                <a href="#" className="footer-link"><Globe size={20} /></a>
                <a href="#" className="footer-link"><ExternalLink size={20} /></a>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '1.5rem' }}>Nawigacja</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><a href="#about" className="footer-link">O projekcie</a></li>
                <li><a href="#features" className="footer-link">Funkcjonalności</a></li>
                <li><a href="#pricing" className="footer-link">Cennik</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '1.5rem' }}>Wsparcie</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><a href="#" className="footer-link">Discord Support</a></li>
                <li><a href="#" className="footer-link">Dokumentacja API</a></li>
                <li><a href="#" className="footer-link">Status Serwerów</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '1.5rem' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><a href="#" className="footer-link">Regulamin</a></li>
                <li><a href="#" className="footer-link">Polityka prywatności</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>&copy; 2026 Velyx Project. Crafted with <Heart size={14} color="#ff4d4d" fill="#ff4d4d" /> for elite gaming.</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <span className="glass-pill" style={{ padding: '6px 15px', fontSize: '0.75rem' }}>SYSTEM: ONLINE</span>
              <span className="glass-pill" style={{ padding: '6px 15px', fontSize: '0.75rem' }}>VERSION: 1.0</span>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {toasts.map(t => (
          <Toast key={t.id} message={t.message} type={t.type} onClose={() => setToasts(prev => prev.filter(toast => toast.id !== t.id))} />
        ))}
      </AnimatePresence>
    </PageTransition>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut", delay }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="glass-card"
    style={{ padding: '3rem', textAlign: 'center', borderRadius: '20px', cursor: 'pointer' }}
  >
    <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }} style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(155, 89, 182, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={40} color="var(--primary)" />
      </motion.div>
    </div>
    <h4 style={{ fontSize: '1.6rem', marginBottom: '1.2rem', fontWeight: 800 }}>{title}</h4>
    <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: '1.05rem' }}>{desc}</p>
  </motion.div>
);

const PriceCard = ({ title, price, features, highlighted, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.03, y: -5 }}
    className={`glass-card pricing-item ${highlighted ? 'highlighted' : ''}`}
  >
    {highlighted && (
      <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '4px 20px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px' }}>
        POPULARNE
      </div>
    )}
    <h4 style={{ color: highlighted ? 'var(--primary)' : 'var(--text-dim)', letterSpacing: '3px', fontWeight: 900, fontSize: '0.9rem' }}>{title}</h4>
    <div style={{ fontSize: '4.5rem', fontWeight: 900, margin: '1.5rem 0', fontFamily: 'Outfit' }}>{price}</div>
    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '3rem', textAlign: 'left' }}>
      {features.map((f, i) => <li key={i} style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '14px', fontSize: '1.05rem' }}><CheckCircle size={22} color={highlighted ? 'var(--primary)' : '#00ff88'} /> {f}</li>)}
    </ul>
    <Link to="/register" className={highlighted ? 'glow-btn' : 'secondary-btn'} style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '1.1rem' }}>Wybierz Ten Plan</Link>
  </motion.div>
);

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  return (
    <PageTransition>
      <div className="auth-page">
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }} className="auth-card glass-panel" style={{ maxWidth: '520px', padding: '4.5rem' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(155, 89, 182, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <Lock size={36} color="var(--primary)" />
          </motion.div>
          <h1 style={{ marginBottom: '1rem', fontSize: '2.8rem', fontWeight: 900, textAlign: 'center' }}>Weryfikacja</h1>
          <p style={{ color: 'var(--text-dim)', marginBottom: '3rem', fontSize: '1.1rem', textAlign: 'center' }}>Zaloguj się do swojego centrum dowodzenia Velyx.</p>
          <form onSubmit={(e) => { e.preventDefault(); login({ name }); navigate('/dashboard'); }}>
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <User style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} size={22} />
              <input type="text" placeholder="Nazwa użytkownika" className="input-field-auth" style={{ paddingLeft: '55px', marginBottom: 0 }} value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <Lock style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} size={22} />
              <input type="password" placeholder="Hasło" className="input-field-auth" style={{ paddingLeft: '55px', marginBottom: 0 }} required />
            </div>
            <button type="submit" className="glow-btn" style={{ width: '100%', padding: '18px', fontSize: '1.15rem' }}>Inicjalizuj System</button>
          </form>
          <p style={{ marginTop: '2.5rem', color: 'var(--text-dim)', textAlign: 'center' }}>
            Nie jesteś częścią elity? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 800 }}>Stwórz nową licencję</Link>
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
};

const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <PageTransition>
      <div className="auth-page">
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }} className="auth-card glass-panel" style={{ maxWidth: '520px', padding: '4.5rem' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(155, 89, 182, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <Rocket size={36} color="var(--primary)" />
          </motion.div>
          <h1 style={{ marginBottom: '1rem', fontSize: '2.8rem', fontWeight: 900, textAlign: 'center' }}>Nowa Sesja</h1>
          <p style={{ color: 'var(--text-dim)', marginBottom: '3rem', fontSize: '1.1rem', textAlign: 'center' }}>Zarejestruj nową licencję w systemie Velyx.</p>
          <form onSubmit={(e) => { e.preventDefault(); navigate('/login'); }}>
            <input type="text" placeholder="Unikalny pseudonim" className="input-field-auth" required />
            <input type="email" placeholder="Adres E-mail" className="input-field-auth" required />
            <input type="password" placeholder="Bezpieczne hasło" className="input-field-auth" required />
            <button type="submit" className="glow-btn" style={{ width: '100%', padding: '18px' }}>Rozpocznij Rejestrację</button>
          </form>
          <p style={{ marginTop: '2.5rem', color: 'var(--text-dim)', textAlign: 'center' }}>
            Masz już konto? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 800 }}>Zaloguj się</Link>
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
};

const Dashboard = () => {
  const { user, logout, licenseActive, launcherUrl, changelog } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const canDownload = Boolean(licenseActive && launcherUrl);

  if (user?.role !== 'admin') {
    return (
      <PageTransition>
        <div className="dashboard-layout">
          <aside className="sidebar-modern">
            <div className="logo-section" style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '5rem', textAlign: 'center' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>VELYX<span>PANEL</span></Link>
            </div>
            <div className="sidebar-content">
              <div className="nav-group">
                <span className="group-label">MENU</span>
                <Link to="/dashboard" className="nav-link active"><LayoutDashboard size={22} /> <span>Panel Główny</span></Link>
              </div>
            </div>
            <button onClick={logout} className="logout-button" style={{ padding: '16px' }}><LogOut size={22} /> Zamknij Sesję</button>
          </aside>
          <main className="dashboard-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel" style={{ padding: '6rem', textAlign: 'center', maxWidth: '600px' }}>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ width: '120px', height: '120px', borderRadius: '30px', background: 'rgba(155, 89, 182, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                <Rocket size={60} color="var(--primary)" />
              </motion.div>
              <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem' }}>Coming Soon</h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>Panel użytkownika jest w budowie. Wróć wkrótce!</p>
            </motion.div>
          </main>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="dashboard-layout">
        <aside className="sidebar-modern">
          <div className="logo-section" style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '5rem', textAlign: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>VELYX<span>PANEL</span></Link>
          </div>
          <div className="sidebar-content">
            <div className="nav-group">
              <span className="group-label">OPERACJE</span>
              <Link to="/dashboard" className="nav-link active"><Settings size={22} /> <span>Ustawienia</span></Link>
            </div>
            <div className="nav-group" style={{ marginTop: '3rem' }}>
              <span className="group-label">SYSTEM ROOT</span>
              <Link to="/admin" className="nav-link admin-link" style={{ color: 'var(--primary)', fontWeight: 800 }}><ShieldAlert size={22} /> <span>Administrator</span></Link>
            </div>
          </div>
          <button onClick={logout} className="logout-button" style={{ padding: '16px' }}><LogOut size={22} /> Zamknij Sesję</button>
        </aside>

        <main className="dashboard-main">
          <header className="dashboard-header" style={{ marginBottom: '5rem' }}>
            <div className="welcome-box">
              <h2 style={{ fontSize: '3.2rem', fontWeight: 900 }}>Witaj, {user?.name}! 👑</h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)' }}>Witaj z powrotem w swoim centrum dowodzenia.</p>
            </div>
            <div className="header-actions">
              <div className="glass-pill time-pill" style={{ fontSize: '1rem', padding: '12px 28px' }}>{currentTime}</div>
              <div className="user-profile" style={{ gap: '20px' }}>
                <div className="avatar" style={{ width: '56px', height: '56px', borderRadius: '14px', fontSize: '1.6rem' }}>{user?.avatar}</div>
                <div className="user-info">
                  <span className="name" style={{ fontSize: '1.2rem' }}>{user?.name}</span>
                  <span className="role" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="status-circle pulse"></div>
                    Root Administrator
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div className="dashboard-grid">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="main-stat-card glass-panel" style={{ padding: '4rem' }}>
              <div className="card-header" style={{ marginBottom: '3rem' }}>
                {licenseActive ? (
                  <CheckCircle size={64} color="#00ff88" style={{ filter: 'drop-shadow(0 0 10px rgba(0,255,136,0.5))' }} />
                ) : (
                  <XCircle size={64} color="#ff4d4d" style={{ filter: 'drop-shadow(0 0 10px rgba(255,77,77,0.25))' }} />
                )}
                <div>
                  <h3 style={{ fontSize: '2.5rem' }}>{licenseActive ? 'Licencja Aktywna' : 'Brak licencji'}</h3>
                  <p style={{ fontSize: '1.1rem' }}>{licenseActive ? 'Możesz pobrać launcher z panelu.' : 'Skontaktuj się z administratorem.'}</p>
                </div>
              </div>
              <div className="card-footer">
                {canDownload ? (
                  <a className="glow-btn" href={launcherUrl} target="_blank" rel="noreferrer" style={{ width: '100%', padding: '24px', fontSize: '1.3rem' }}><Download size={24} /> Pobierz Launcher</a>
                ) : (
                  <button className="secondary-btn" disabled style={{ width: '100%', padding: '24px', fontSize: '1.3rem', opacity: 0.55, cursor: 'not-allowed' }}><Download size={24} /> Pobierz Launcher</button>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="news-card glass-panel" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Dziennik Zmian</h3>
              <div className="news-list" style={{ gap: '1rem' }}>
                <AnimatePresence initial={false}>
                  {(changelog?.length ? changelog : [
                    { id: 'default-1', dateLabel: '28 MAR', title: 'Patch 4.1.2 hotfix', description: 'Zoptymalizowano zużycie CPU.' },
                    { id: 'default-2', dateLabel: '25 MAR', title: 'Global Sync Engine', description: 'Nowy system synchronizacji.' },
                  ]).slice(0, 6).map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: idx * 0.03 }}
                      className="news-item"
                    >
                      <div className="date" style={{ minWidth: '90px', height: '40px', fontSize: '0.85rem' }}>{item.dateLabel}</div>
                      <div className="content">
                        <strong style={{ fontSize: '1.1rem' }}>{item.title}</strong>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-dim)' }}>{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <div className="quick-actions-grid">
            {[
              { icon: Layers, title: 'Moje Konfiguracje', desc: 'Szybka edycja ustawień Twoich modułów.' },
              { icon: MessageSquare, title: 'Live Chat Support', desc: 'Rozmowa z ekspertem Velyx.' },
              { icon: Code2, title: 'Velyx SDK', desc: 'Twórz własne moduły.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="action-card glass-panel"
                style={{ cursor: 'pointer' }}
              >
                <item.icon size={32} color="var(--primary)" />
                <h4 style={{ fontSize: '1.4rem', margin: '1.5rem 0 0.8rem' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-dim)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

const AdminPanel = () => {
  const { user, logout, launcherUrl, adminSetLauncherUrl, adminGrantLicense, adminRevokeLicense, adminListLicenses, adminAddChangelogEntry, adminListChangelog } = useAuth();
  const [urlInput, setUrlInput] = useState(launcherUrl || '');
  const [usernameInput, setUsernameInput] = useState('');
  const [adminMessage, setAdminMessage] = useState('');
  const [licenses, setLicenses] = useState(() => adminListLicenses());
  const [changelogTitle, setChangelogTitle] = useState('');
  const [changelogDesc, setChangelogDesc] = useState('');
  const [changelogEntries, setChangelogEntries] = useState(() => adminListChangelog());
  const [activeTab, setActiveTab] = useState('overview');
  const [search, setSearch] = useState('');

  const reload = () => {
    setLicenses(adminListLicenses());
    setChangelogEntries(adminListChangelog());
  };

  const showMsg = (msg) => {
    setAdminMessage(msg);
    setTimeout(() => setAdminMessage(''), 4000);
  };

  const clearAllLicenses = () => {
    if (confirm('Czy na pewno chcesz usunąć WSZYSTKIE licencje?')) {
      localStorage.removeItem(LICENSES_KEY);
      showMsg('Usunięto wszystkie licencje.');
      reload();
    }
  };

  const clearAllChangelog = () => {
    if (confirm('Czy na pewno chcesz wyczyścić cały dziennik zmian?')) {
      localStorage.removeItem(CHANGELOG_KEY);
      showMsg('Wyczyszczono dziennik zmian.');
      reload();
    }
  };

  const exportData = () => {
    const data = {
      licenses: adminListLicenses(),
      changelog: adminListChangelog(),
      launcherUrl: localStorage.getItem(LAUNCHER_URL_KEY) || '',
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `velyx-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showMsg('Wyeksportowano dane.');
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (data.licenses) localStorage.setItem(LICENSES_KEY, JSON.stringify(data.licenses));
        if (data.changelog) localStorage.setItem(CHANGELOG_KEY, JSON.stringify(data.changelog));
        if (data.launcherUrl) localStorage.setItem(LAUNCHER_URL_KEY, data.launcherUrl);
        showMsg('Zaimportowano dane. Odświeżam...');
        reload();
        setTimeout(() => window.location.reload(), 1200);
      } catch {
        showMsg('Błąd importu: nieprawidłowy plik JSON.');
      }
    };
    reader.readAsText(file);
  };

  useEffect(() => { setUrlInput(launcherUrl || ''); }, [launcherUrl]);

  const onSaveUrl = (e) => { e.preventDefault(); adminSetLauncherUrl(urlInput); showMsg('Zapisano link do launchera.'); };
  const onGrant = (e) => {
    e.preventDefault();
    try { adminGrantLicense(usernameInput); showMsg('Nadano licencję.'); setUsernameInput(''); reload(); }
    catch (err) { showMsg(err?.message || 'Błąd.'); }
  };
  const onRevoke = (name) => { adminRevokeLicense(name); showMsg('Odebrano licencję.'); reload(); };
  const onAddChangelog = (e) => {
    e.preventDefault();
    try { adminAddChangelogEntry({ title: changelogTitle, description: changelogDesc }); showMsg('Dodano wpis.'); setChangelogTitle(''); setChangelogDesc(''); reload(); }
    catch (err) { showMsg(err?.message || 'Błąd.'); }
  };

  const filteredLicenses = licenses.filter(l => l.username.toLowerCase().includes(search.toLowerCase()));

  if (user?.role !== 'admin') return <Navigate to="/dashboard" />;

  return (
    <PageTransition>
      <div className="dashboard-layout">
        <aside className="sidebar-modern">
          <div className="logo-section">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>VELYX<span>ROOT</span></Link>
          </div>
          <div className="sidebar-content">
            <Link to="/dashboard" className="nav-link"><LayoutDashboard size={22} /> Dashboard</Link>
            <a href="#" className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('overview'); }}><ShieldAlert size={22} /> Przegląd</a>
            <a href="#" className={`nav-link ${activeTab === 'licenses' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('licenses'); }}><Users size={22} /> Licencje</a>
            <a href="#" className={`nav-link ${activeTab === 'changelog' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('changelog'); }}><FileText size={22} /> Dziennik Zmian</a>
            <a href="#" className={`nav-link ${activeTab === 'database' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('database'); }}><Database size={22} /> Baza Danych</a>
          </div>
          <button onClick={logout} className="logout-button"><LogOut size={22} /> Wyloguj</button>
        </aside>

        <main className="dashboard-main">
          <div className="dashboard-header" style={{ marginBottom: '3rem' }}>
            <div className="welcome-box">
              <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>Panel Administratora</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-dim)' }}>Zarządzaj globalną siecią Velyx Client.</p>
            </div>
            <div className="header-actions">
              <div className="glass-pill" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldAlert size={20} color="var(--primary)" />
                <span>Root Access</span>
              </div>
            </div>
          </div>

          <div className="stat-grid-landing" style={{ marginBottom: '3rem' }}>
            {[
              { val: licenses.length, label: 'Licencji' },
              { val: licenses.filter(l => l.active).length, label: 'Aktywnych' },
              { val: changelogEntries.length, label: 'Wpisów changelog' },
              { val: '99.9%', label: 'Uptime' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card stat-item"
              >
                <h3>{s.val}</h3><p>{s.label}</p>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {adminMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="admin-message"
                style={{ marginBottom: '2rem', padding: '1.2rem 1.5rem', background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: '12px', color: '#00ff88' }}
              >
                <CheckCircle size={18} style={{ marginRight: '10px' }} />
                {adminMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {activeTab === 'overview' && (
            <div className="admin-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel admin-card" style={{ padding: '3rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Konfiguracja Launchera</h3>
                <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem' }}>Ustaw link do pobrania.</p>
                <form onSubmit={onSaveUrl} className="admin-form">
                  <input className="input-field-auth" style={{ marginBottom: '1rem' }} value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="https://.../launcher.exe" />
                  <button type="submit" className="glow-btn" style={{ width: '100%', padding: '18px' }}>Zapisz link</button>
                </form>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel admin-card" style={{ padding: '3rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Zarządzanie Licencjami</h3>
                <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem' }}>Nadaj licencję po nazwie użytkownika.</p>
                <form onSubmit={onGrant} className="admin-form">
                  <input className="input-field-auth" style={{ marginBottom: '1rem' }} value={usernameInput} onChange={e => setUsernameInput(e.target.value)} placeholder="np. kacper111" />
                  <button type="submit" className="glow-btn" style={{ width: '100%', padding: '18px' }}>Nadaj licencję</button>
                </form>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel admin-card" style={{ padding: '3rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Dziennik Zmian</h3>
                <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem' }}>Dodaj nowy wpis changeloga.</p>
                <form onSubmit={onAddChangelog} className="admin-form">
                  <input className="input-field-auth" style={{ marginBottom: '1rem' }} value={changelogTitle} onChange={e => setChangelogTitle(e.target.value)} placeholder="Tytuł (np. Patch 4.1.3)" />
                  <textarea className="input-field-auth" style={{ marginBottom: '1rem', minHeight: '120px' }} value={changelogDesc} onChange={e => setChangelogDesc(e.target.value)} placeholder="Opis zmian..." />
                  <button type="submit" className="glow-btn" style={{ width: '100%', padding: '18px' }}>Dodaj wpis</button>
                </form>
              </motion.div>
            </div>
          )}

          {activeTab === 'licenses' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel admin-card" style={{ padding: '3rem' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Zarządzanie Licencjami</h3>
              <form onSubmit={onGrant} className="admin-form" style={{ marginBottom: '2rem' }}>
                <input className="input-field-auth" style={{ marginBottom: '1rem' }} value={usernameInput} onChange={e => setUsernameInput(e.target.value)} placeholder="np. kacper111" />
                <button type="submit" className="glow-btn" style={{ width: '100%', padding: '18px' }}>Nadaj licencję</button>
              </form>
              <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} size={18} />
                <input className="input-field-auth" style={{ paddingLeft: '45px', marginBottom: 0 }} value={search} onChange={e => setSearch(e.target.value)} placeholder="Szukaj użytkownika..." />
              </div>
              <div className="admin-license-list">
                {filteredLicenses.length === 0 ? (
                  <div style={{ color: 'var(--text-dim)', padding: '1rem 0' }}>Brak wpisów w bazie.</div>
                ) : (
                  filteredLicenses.map((l, i) => (
                    <motion.div
                      key={l.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="admin-license-row"
                    >
                      <div className="admin-license-meta">
                        <strong>{l.username}</strong>
                        <span className={l.active ? 'pill pill-ok' : 'pill pill-off'}>{l.active ? 'AKTYWNA' : 'NIEAKTYWNA'}</span>
                      </div>
                      <button className="secondary-btn" style={{ padding: '10px 14px' }} onClick={() => onRevoke(l.username)} disabled={!l.active}>Odbierz</button>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'changelog' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel admin-card" style={{ padding: '3rem' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Dziennik Zmian</h3>
              <form onSubmit={onAddChangelog} className="admin-form" style={{ marginBottom: '2rem' }}>
                <input className="input-field-auth" style={{ marginBottom: '1rem' }} value={changelogTitle} onChange={e => setChangelogTitle(e.target.value)} placeholder="Tytuł (np. Patch 4.1.3)" />
                <textarea className="input-field-auth" style={{ marginBottom: '1rem', minHeight: '120px' }} value={changelogDesc} onChange={e => setChangelogDesc(e.target.value)} placeholder="Opis zmian..." />
                <button type="submit" className="glow-btn" style={{ width: '100%', padding: '18px' }}>Dodaj wpis</button>
              </form>
              <div className="admin-license-list">
                {changelogEntries.length === 0 ? (
                  <div style={{ color: 'var(--text-dim)', padding: '1rem 0' }}>Brak wpisów.</div>
                ) : (
                  changelogEntries.map((entry, i) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="admin-license-row"
                    >
                      <div className="admin-license-meta">
                        <strong>{entry.title}</strong>
                        <span className="pill">{entry.dateLabel}</span>
                      </div>
                      <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{entry.description}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'database' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel admin-card" style={{ padding: '3rem' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Zarządzanie Bazą Danych</h3>
              <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Eksportuj/importuj dane oraz zarządzaj całą bazą.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <h4 style={{ marginBottom: '1rem' }}>Eksport danych</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '1rem' }}>Pobierz kopię zapasową całej bazy.</p>
                  <button onClick={exportData} className="glow-btn" style={{ width: '100%', padding: '16px' }}><Download size={18} /> Eksportuj bazę</button>
                </div>
                <div>
                  <h4 style={{ marginBottom: '1rem' }}>Import danych</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '1rem' }}>Wczytaj bazę z pliku JSON.</p>
                  <input type="file" accept=".json" onChange={importData} style={{ marginBottom: '1rem', width: '100%' }} />
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', color: '#ff4d4d' }}>Niebezpieczne operacje</h4>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={clearAllLicenses} className="secondary-btn" style={{ background: 'rgba(255,77,77,0.1)', color: '#ff4d4d', border: '1px solid rgba(255,77,77,0.2)' }}><Trash2 size={16} /> Wyczyść licencje</button>
                  <button onClick={clearAllChangelog} className="secondary-btn" style={{ background: 'rgba(255,77,77,0.1)', color: '#ff4d4d', border: '1px solid rgba(255,77,77,0.2)' }}><Trash2 size={16} /> Wyczyść changelog</button>
                  <button onClick={() => { localStorage.clear(); showMsg('Wyczyszczono cały localStorage.'); setTimeout(() => window.location.reload(), 1500); }} className="secondary-btn" style={{ background: 'rgba(255,77,77,0.1)', color: '#ff4d4d', border: '1px solid rgba(255,77,77,0.2)' }}><Trash2 size={16} /> Wyczyść WSZYSTKO</button>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel" style={{ padding: '3rem', marginTop: '3rem' }}>
            <h3 style={{ marginBottom: '2rem' }}>Ostatnie Akcje Systemowe</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { text: 'Zarejestrowano nową licencję Premium', time: 'Przed chwilą', icon: CheckCircle, color: '#00ff88' },
                { text: 'Aktualizacja konfiguracji launchera', time: '2 minuty temu', icon: Settings, color: 'var(--primary)' },
                { text: 'Nowy wpis w dzienniku zmian', time: '5 minut temu', icon: FileText, color: 'var(--primary)' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <item.icon size={18} color={item.color} />
                    <span>{item.text}</span>
                  </div>
                  <span style={{ color: 'var(--text-dim)' }}>{item.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </PageTransition>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AuthProvider>
      <div className="app">
        <ParticleBackground />
        <FloatingShapes />
        <div className="gradient-mesh"></div>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminPanel /></ProtectedRoute>} />
          </Routes>
        </AnimatePresence>
      </div>
    </AuthProvider>
  );
}

const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;