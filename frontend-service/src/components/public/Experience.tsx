import { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import { Experience as ExperienceType } from '../../types';
import { DEFAULT_EXPERIENCES } from '../../data/defaultData';
import { Briefcase } from 'lucide-react';

const Experience = () => {
    const [experiences, setExperiences] = useState<ExperienceType[]>(DEFAULT_EXPERIENCES);

    useEffect(() => {
        const fetchExp = async () => {
            try {
                const res = await api.get('/content/experiences');
                const data = Array.isArray(res.data) ? res.data : [];
                if (data.length > 0) setExperiences(data);
            } catch (error) {
                console.error("Error fetching experience — using default data", error);
                // fallback already set via useState default
            }
        };
        fetchExp();
    }, []);

    return (
        <section id="experience" className="py-32 relative">
            <div className="container-width max-w-4xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Experience</h2>
                    <p className="text-gray-400 max-w-2xl text-lg">My professional journey in software engineering.</p>
                </div>

                <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-8 space-y-12">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="relative pl-8 md:pl-0 group">
                            {/* Timeline Node */}
                            <div className="absolute -left-[41px] md:-left-[41px] top-1 w-5 h-5 rounded-full bg-[#0a0a0a] border-2 border-indigo-500/50 group-hover:border-indigo-400 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                            </div>
                            
                            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/10 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                                    <div className="flex items-center mb-4 md:mb-0">
                                        <div className="w-12 h-12 bg-black border border-white/10 rounded-xl flex items-center justify-center overflow-hidden mr-4 shrink-0">
                                            {exp.companyLogoUrl ? (
                                                <img src={exp.companyLogoUrl} alt={exp.company} className="w-full h-full object-cover" />
                                            ) : (
                                                <Briefcase className="w-5 h-5 text-gray-500" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                            <p className="text-indigo-400 font-medium">{exp.company} <span className="text-gray-600 px-2">•</span> {exp.location}</p>
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center px-3 py-1 bg-white/5 text-gray-400 rounded-full text-sm border border-white/5 whitespace-nowrap self-start">
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </div>
                                </div>
                                
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    {exp.description}
                                </p>
                                
                                {exp.highlights.length > 0 && (
                                    <ul className="space-y-2">
                                        {exp.highlights.map((highlight, idx) => (
                                            <li key={idx} className="flex items-start text-sm text-gray-300">
                                                <span className="text-indigo-500 mr-2 mt-1">▹</span>
                                                <span className="leading-relaxed">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
