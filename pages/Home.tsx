import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ArrowUpRight } from 'lucide-react';
import GridBackground from '../components/GridBackground';
import Philosophy from '../components/Philosophy';

const Gatekeeper = lazy(() => import('../components/Gatekeeper'));

const Home: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <GridBackground />

            {/* Hero Section */}
            <header className="relative min-h-screen flex flex-col justify-center px-6 pt-20">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mono text-[10px] uppercase tracking-widest text-indigo-400 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                        Active Capacity: 1 Slot Remaining
                    </div>

                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
                        WE ARCHITECT<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-white to-zinc-500">DIGITAL LEGACIES</span>
                    </h1>

                    <p className="text-zinc-500 text-xl md:text-2xl max-w-2xl leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                        A boutique software collective focusing on high-complexity systems and avant-garde digital experiences. We don't take projects for money; we take them for the challenge.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                        <a href="#gatekeeper" className="group flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-indigo-500 hover:text-white transition-all">
                            Apply for Partnership
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                        <a href="#philosophy" className="flex items-center justify-center gap-3 border border-white/10 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/5 transition-all">
                            Our Philosophy
                        </a>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="hidden md:flex fixed bottom-10 left-auto right-6 flex items-center gap-4 text-zinc-600 mono text-xs uppercase tracking-widest animate-bounce">
                    <div className="w-[1px] h-12 bg-zinc-800" />
                    Scroll to Explore
                </div>
            </header>

            <Philosophy />

            {/* Service/Craft Grid */}
            <section id="craft" className="py-24 px-6 border-y border-white/5 relative z-10 bg-zinc-950/20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
                        <div>
                            <span className="mono text-xs uppercase tracking-[0.3em] text-indigo-500 block mb-4">Capabilities</span>
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Obsessive Craftsmanship</h2>
                        </div>
                        <p className="text-zinc-500 max-w-md text-lg italic">
                            "Good enough" is a term we've removed from our vocabulary. We build for the next decade, not the next quarter.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
                        {[
                            { title: "Distributed Systems", code: "0x1A", desc: "Building fault-tolerant, high-concurrency backends for mission-critical operations." },
                            { title: "Generative AI Systems", code: "0x2B", desc: "Integrating frontier LLMs and custom RAG pipelines into production ecosystems." },
                            { title: "Spatial Computing", code: "0x3C", desc: "Architecting immersive AR/VR experiences that challenge human perception." },
                            { title: "FinTech Infrastructure", code: "0x4D", desc: "Securing financial movements with low-latency, hyper-resilient ledger systems." },
                            { title: "Creative Frontend", code: "0x5E", desc: "Merging WebGL, shaders, and React to build interfaces that feel alive." },
                            { title: "Smart Contracts", code: "0x6F", desc: "Writing audited, gas-optimized contracts for the decentralized economy." }
                        ].map((s, i) => (
                            <div key={i} className="group p-10 border border-white/5 hover:bg-white/[0.02] transition-colors relative overflow-hidden">
                                <div className="absolute top-6 right-6 mono text-[10px] text-zinc-700">{s.code}</div>
                                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                                <p className="text-zinc-500 leading-relaxed">{s.desc}</p>
                                <div className="mt-8 h-[1px] w-0 group-hover:w-full bg-indigo-500 transition-all duration-700" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Suspense fallback={<section id="gatekeeper" className="py-24 px-6 max-w-4xl mx-auto relative z-10"><div className="border border-white/10 bg-white/[0.02] p-8 md:p-12 rounded-2xl animate-pulse h-64" /></section>}>
                <Gatekeeper />
            </Suspense>
        </>
    );
};

export default Home;
