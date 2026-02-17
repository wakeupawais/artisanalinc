import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Filter, X, ChevronDown } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { projects } from '../data/projects';

const Projects: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>(ProjectCategory.ALL);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const [filterOpen, setFilterOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const categories = [
        { id: ProjectCategory.ALL, label: 'All Projects' },
        { id: ProjectCategory.WEB_APP, label: 'Web Apps' },
        { id: ProjectCategory.AI_ML, label: 'AI/ML' },
        { id: ProjectCategory.BLOCKCHAIN, label: 'Blockchain' },
        { id: ProjectCategory.MOBILE, label: 'Mobile' },
        { id: ProjectCategory.CREATIVE, label: 'Creative' },
        { id: ProjectCategory.INFRASTRUCTURE, label: 'Infrastructure' }
    ];

    const filteredProjects = activeCategory === ProjectCategory.ALL
        ? projects
        : projects.filter(p => p.category === activeCategory);

    const getStatusColor = (status: Project['status']) => {
        switch (status) {
            case 'completed': return 'bg-emerald-500';
            case 'in-progress': return 'bg-indigo-500';
            case 'archived': return 'bg-zinc-600';
            default: return 'bg-zinc-500';
        }
    };

    const getStatusLabel = (status: Project['status']) => {
        switch (status) {
            case 'completed': return 'Completed';
            case 'in-progress': return 'In Progress';
            case 'archived': return 'Archived';
            default: return status;
        }
    };

    const scrollToProject = (index: number) => {
        const container = containerRef.current;
        if (container) {
            const projectElement = container.children[index] as HTMLElement;
            projectElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const scrollToNext = () => {
        if (currentProjectIndex < filteredProjects.length - 1) {
            scrollToProject(currentProjectIndex + 1);
        }
    };

    const scrollToPrev = () => {
        if (currentProjectIndex > 0) {
            scrollToProject(currentProjectIndex - 1);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                scrollToNext();
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                scrollToPrev();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentProjectIndex, filteredProjects.length]);

    // Intersection Observer to track current project
    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0');
                        setCurrentProjectIndex(index);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const container = containerRef.current;
        if (container) {
            Array.from(container.children).forEach((child) => {
                observerRef.current?.observe(child);
            });
        }

        return () => {
            observerRef.current?.disconnect();
        };
    }, [filteredProjects]);

    return (
        <div className="relative">
            {/* Filter Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-black/95 backdrop-blur-xl border-r border-white/10 z-40 transition-transform duration-500 ${filterOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold mono uppercase tracking-wider">Filter</h3>
                        <button onClick={() => setFilterOpen(false)} className="text-zinc-400 hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setActiveCategory(cat.id);
                                    setFilterOpen(false);
                                    setCurrentProjectIndex(0);
                                }}
                                className={`w-full text-left px-4 py-3 rounded-lg mono text-sm uppercase tracking-wider transition-all ${activeCategory === cat.id
                                    ? 'bg-white text-black font-bold'
                                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filter Toggle Button */}
            <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="fixed top-32 left-8 z-30 flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/10 rounded-full hover:bg-white/20 transition-all group"
            >
                <Filter className="w-4 h-4" />
                <span className="mono text-xs uppercase tracking-wider">Filter</span>
            </button>

            {/* Navigation Dots */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
                {filteredProjects.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToProject(index)}
                        className={`w-2 h-2 rounded-full transition-all ${currentProjectIndex === index
                            ? 'bg-white h-8'
                            : 'bg-white/30 hover:bg-white/60'
                            }`}
                        aria-label={`Go to project ${index + 1}`}
                    />
                ))}
            </div>

            {/* Project Counter */}
            <div className="fixed bottom-8 right-8 z-30 mono text-sm text-zinc-500">
                <span className="text-white text-2xl font-bold">{String(currentProjectIndex + 1).padStart(2, '0')}</span>
                <span className="mx-2">/</span>
                <span>{String(filteredProjects.length).padStart(2, '0')}</span>
            </div>

            {/* Scroll Hint */}
            {currentProjectIndex === 0 && (
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce">
                    <span className="mono text-xs uppercase tracking-wider text-zinc-500">Scroll to explore</span>
                    <ChevronDown className="w-5 h-5 text-zinc-500" />
                </div>
            )}

            {/* Projects Container */}
            <div
                ref={containerRef}
                className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <style>{`
                    .projects-container::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>

                {filteredProjects.map((project, index) => (
                    <section
                        key={project.id}
                        data-index={index}
                        className="h-screen snap-start snap-always flex items-center relative overflow-hidden"
                    >
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-zinc-950 to-purple-950/30" />

                        {/* Content Grid */}
                        <div className="relative z-10 w-full h-full grid md:grid-cols-2 gap-0">
                            {/* Left Side - Visual */}
                            <div className="relative flex items-center justify-center p-12 bg-gradient-to-br from-indigo-950/50 to-transparent">
                                {/* Large Letter Background */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                                    <span className="text-[40rem] font-black leading-none">
                                        {project.title.charAt(0)}
                                    </span>
                                </div>

                                {/* Project Number */}
                                <div className="absolute top-12 left-12">
                                    <span className="text-8xl font-black text-white/10 mono">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Featured Badge */}
                                {project.featured && (
                                    <div className="absolute top-12 right-12 px-4 py-2 bg-indigo-500 text-white text-xs mono uppercase tracking-wider rounded-full">
                                        Featured
                                    </div>
                                )}

                                {/* Decorative Elements */}
                                <div className="relative">
                                    <div className="w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />
                                </div>
                            </div>

                            {/* Right Side - Content */}
                            <div className="flex flex-col justify-center p-12 md:p-16 lg:p-24">
                                {/* Status Badge */}
                                <div className="flex items-center gap-2 mb-6">
                                    <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                                    <span className="text-xs mono uppercase tracking-wider text-zinc-500">
                                        {getStatusLabel(project.status)}
                                    </span>
                                    {project.completedDate && (
                                        <span className="text-xs mono text-zinc-600">
                                            • {project.completedDate}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-none">
                                    {project.title}
                                </h2>

                                {/* Description */}
                                <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-6">
                                    {project.description}
                                </p>

                                {/* Long Description */}
                                {project.longDescription && (
                                    <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                                        {project.longDescription}
                                    </p>
                                )}

                                {/* Technologies */}
                                <div className="mb-8">
                                    <span className="text-xs mono uppercase tracking-wider text-zinc-600 block mb-3">
                                        Tech Stack
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map(tech => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs mono text-zinc-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Links */}
                                <div className="flex gap-4">
                                    {project.demoUrl && (
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-indigo-500 hover:text-white transition-all"
                                        >
                                            <span className="mono text-xs uppercase tracking-wider">View Demo</span>
                                            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-all"
                                        >
                                            <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            <span className="mono text-xs uppercase tracking-wider">Source Code</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Gradient Fade */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    </section>
                ))}

                {/* No Results State */}
                {filteredProjects.length === 0 && (
                    <section className="h-screen snap-start flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-zinc-600 text-xl mono uppercase tracking-wider">
                                No projects found in this category
                            </p>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Projects;
