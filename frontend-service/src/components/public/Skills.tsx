import { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import { Skill } from '../../types';

const Skills = () => {
    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await api.get('/content/skills');
                setSkills(res.data);
            } catch (error) {
                console.error("Error fetching skills", error);
            }
        };
        fetchSkills();
    }, []);

    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    return (
        <section id="skills" className="py-32 relative bg-[#050505]">
            <div className="container-width max-w-6xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Core Competencies</h2>
                    <p className="text-gray-400 max-w-2xl text-lg">Technologies and tools I use to build robust enterprise applications.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.keys(groupedSkills).map((category) => (
                        <div key={category} className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors">
                            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                                <span className="w-8 h-px bg-indigo-500/50 mr-4"></span>
                                {category}
                            </h3>
                            <div className="space-y-5">
                                {groupedSkills[category].map((skill) => (
                                    <div key={skill.id} className="group">
                                        <div className="flex justify-between items-end mb-2">
                                            <div className="flex items-center space-x-3">
                                                {skill.iconUrl && (
                                                    <img src={skill.iconUrl} alt={skill.name} className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                                                )}
                                                <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{skill.name}</span>
                                            </div>
                                            <span className="text-xs text-gray-600 font-mono">{skill.proficiencyLevel}%</span>
                                        </div>
                                        <div className="w-full bg-black rounded-full h-1">
                                            <div 
                                                className="bg-indigo-500/80 h-1 rounded-full group-hover:bg-indigo-400 transition-colors"
                                                style={{ width: `${skill.proficiencyLevel}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
