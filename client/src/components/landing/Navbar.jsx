import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Sun } from 'lucide-react';
import Button from './ui/Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Product', href: '#product' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Company', href: '#company' },
    { name: 'Resources', href: '#resources' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer">
          <Sun className="w-8 h-8 text-slate-900 fill-current" />
          <span>Salesflow</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1"
            >
              {link.name}
              {['Product', 'Company', 'Resources'].includes(link.name) && (
                <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-bold text-slate-900 hover:text-slate-700 cursor-pointer"
          >
            Log In
          </button>
          <Button variant="black" size="sm" className="px-6" onClick={() => navigate('/login')}>
            Try for Free
          </Button>
        </div>

        <button className="md:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-lg p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-slate-900 py-2 border-b border-slate-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <button
              className="w-full py-3 font-semibold text-slate-900 border border-slate-200 rounded-full cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Log In
            </button>
            <Button variant="black" fullWidth onClick={() => navigate('/login')}>
              Try for Free
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
