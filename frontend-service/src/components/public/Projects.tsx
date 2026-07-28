import { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import { Project } from '../../types';
import { ExternalLink, Github, Layers, ArrowRight } from 'lucide-react';

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/content/projects');
                setProjects(res.data);
            } catch (error) {
                console.error("Error fetching projects", error);
            }
        };
        fetchProjects();
    }, []);

    const tags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))];
    
    const filteredProjects = filter === 'All' 
        ? projects 
        : projects.filter(p => p.tags.includes(filter));

    return (
        <section id="projects" className="py-32 relative">
            <div className="container-width max-w-6xl mx-auto">
                <div className="mb-16 md:flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Architecture & Projects</h2>
                        <p className="text-gray-400 max-w-2xl text-lg">Case studies on scalable microservices, high-throughput systems, and distributed architecture.</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-8 md:mt-0">
                        {tags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setFilter(tag)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                    filter === tag 
                                    ? 'bg-white text-black' 
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredProjects.map((project, idx) => (
                        <div key={project.id} className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:shadow-2xl hover:shadow-white/5 flex flex-col">
                            {/* Project Image */}
                            <div className="aspect-video w-full overflow-hidden relative bg-black">
                                <img 
                                    src={project.imageUrl} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                            </div>
                            
                            {/* Project Content */}
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.slice(0,4).map(tech => (
                                        <span key={tech} className="text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                
                                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                                    {project.shortDescription}
                                </p>
                                
                                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                    <div className="flex space-x-4">
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white flex items-center text-sm font-medium transition-colors">
                                                <Github className="w-4 h-4 mr-2" /> Code
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white flex items-center text-sm font-medium transition-colors">
                                                <ExternalLink className="w-4 h-4 mr-2" /> Live
                                            </a>
                                        )}
                                    </div>
                                    
                                    <button className="text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors">
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
