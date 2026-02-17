import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Twitter, Linkedin } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    React.useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Philosophy', href: '/#philosophy', isHash: true },
        { name: 'The Craft', href: '/#craft', isHash: true },
        { name: 'Projects', href: '/projects', isHash: false },
        { name: 'Feasibility', href: '/#gatekeeper', isHash: true },
    ];

    const handleNavClick = (href: string, isHash: boolean) => {
        if (isHash && location.pathname !== '/') {
            // If we're not on home page and clicking a hash link, navigate to home first
            window.location.href = href;
        }
        setMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen selection:bg-indigo-500 selection:text-white">
            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-black/80 backdrop-blur-lg' : 'py-8'
                }`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
                            <span className="text-black font-black text-xl italic">E</span>
                        </div>
                        <span className="mono font-bold tracking-tighter text-xl hidden sm:block">ECHELON</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-12">
                        {navLinks.map(link => (
                            link.isHash ? (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => handleNavClick(link.href, link.isHash)}
                                    className="mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </a>
                            ) : (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            )
                        ))}
                        <a href="/#gatekeeper" className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold mono uppercase hover:bg-indigo-500 hover:text-white transition-all">
                            Initiate
                        </a>
                    </div>

                    <button
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            {children}

            {/* Footer */}
            <footer className="py-24 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
                                <span className="text-black font-black text-xl italic">E</span>
                            </div>
                            <span className="mono font-bold tracking-tighter text-xl">ECHELON</span>
                        </div>
                        <p className="text-zinc-500 text-lg max-w-sm mb-8 leading-relaxed">
                            Selective software development for those who value architectural purity and creative excellence.
                        </p>
                        <div className="flex gap-6">
                            <Github className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                            <Twitter className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                            <Linkedin className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                        </div>
                    </div>

                    <div>
                        <h4 className="mono text-[10px] uppercase tracking-widest text-zinc-600 mb-6">Directory</h4>
                        <ul className="space-y-4 text-zinc-400">
                            <li><a href="/#philosophy" className="hover:text-white transition-colors">Manifesto</a></li>
                            <li><Link to="/projects" className="hover:text-white transition-colors">Selected Work</Link></li>
                            <li><a href="/#gatekeeper" className="hover:text-white transition-colors">Apply</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Journal</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mono text-[10px] uppercase tracking-widest text-zinc-600 mb-6">Status</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-sm text-zinc-400">Systems Operational</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                <span className="text-sm text-zinc-400">Limited Capacity (1/3)</span>
                            </div>
                            <p className="text-xs text-zinc-600 mt-4 mono uppercase">
                                Est. 2024. San Francisco / London / Tokyo.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
                    <button
                        className="absolute top-8 right-6 text-white"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <div className="flex flex-col items-center gap-8 text-center">
                        {navLinks.map(link => (
                            link.isHash ? (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => handleNavClick(link.href, link.isHash)}
                                    className="text-4xl font-bold tracking-tighter hover:text-indigo-500 transition-colors"
                                >
                                    {link.name}
                                </a>
                            ) : (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-4xl font-bold tracking-tighter hover:text-indigo-500 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            )
                        ))}
                        <a href="/#gatekeeper" className="mt-8 bg-white text-black px-12 py-4 rounded-full font-bold text-xl">
                            Initiate Project
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Layout;
