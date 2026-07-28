import { useState, useEffect } from "react";
import api from "../../api/axiosInstance";
import { Skill } from "../../types";
import { Loader2, Plus, Edit2, Trash2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const SkillsManager = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

    const [formData, setFormData] = useState<Skill>({
        name: "",
        category: "Frontend",
        iconUrl: "",
        proficiencyLevel: 50,
        displayOrder: 0,
        featured: false
    });

    const formCategories = ["Languages", "Web Technologies", "Frameworks & Backend", "Databases & Caching", "DevOps & Cloud", "Core CS & Tools", "Other"];

    const fetchSkills = async () => {
        try {
            const res = await api.get("/content/skills");
            setSkills(res.data);
        } catch (error) {
            toast.error("Failed to fetch skills");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleOpenModal = (skill?: Skill) => {
        if (skill) {
            setEditingSkill(skill);
            setFormData(skill);
        } else {
            setEditingSkill(null);
            setFormData({
                name: "",
                category: formCategories[0],
                iconUrl: "",
                proficiencyLevel: 50,
                displayOrder: skills.length,
                featured: false
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSkill(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingSkill?.id) {
                await api.put(`/content/skills/${editingSkill.id}`, formData);
                toast.success("Skill updated");
            } else {
                await api.post("/content/skills", formData);
                toast.success("Skill created");
            }
            fetchSkills();
            handleCloseModal();
        } catch (error) {
            toast.error("Failed to save skill");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this skill?")) return;
        try {
            await api.delete(`/content/skills/${id}`);
            toast.success("Skill deleted");
            fetchSkills();
        } catch (error) {
            toast.error("Failed to delete skill");
        }
    };

    // Group skills by category for display — derived dynamically from actual data
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    // Get category order from actual data (preserving first-seen order)
    const dynamicCategories = Array.from(new Set(skills.map(s => s.category)));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Skills Matrix</h1>
                    <p className="text-gray-400">Manage your technical skills and proficiencies.</p>
                </div>
                <Button onClick={() => handleOpenModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Skill
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {dynamicCategories.map((cat) => {
                        const catSkills = groupedSkills[cat] || [];
                        if (catSkills.length === 0) return null;
                        
                        return (
                            <div key={cat} className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden">
                                <div className="bg-[#1a1a1a] border-b border-gray-800 px-5 py-3">
                                    <h3 className="font-semibold text-white">{cat}</h3>
                                </div>
                                <div className="p-2">
                                    {catSkills.map(skill => (
                                        <div key={skill.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors group">
                                            <div className="flex items-center space-x-3">
                                                {skill.iconUrl ? (
                                                    <img src={skill.iconUrl} alt={skill.name} className="w-8 h-8 rounded object-cover bg-black/50" />
                                                ) : (
                                                    <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-xs text-gray-500">{skill.name.substring(0, 2)}</div>
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium text-white">{skill.name}</p>
                                                    <div className="w-32 h-1.5 bg-gray-800 rounded-full mt-1.5 overflow-hidden">
                                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${skill.proficiencyLevel}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                                                <button onClick={() => handleOpenModal(skill)} className="text-gray-400 hover:text-indigo-400 p-1"><Edit2 className="w-3.5 h-3.5" /></button>
                                                <button onClick={() => skill.id && handleDelete(skill.id)} className="text-gray-400 hover:text-red-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#111111] border border-gray-800 rounded-xl w-full max-w-md">
                        <div className="flex justify-between items-center p-5 border-b border-gray-800">
                            <h2 className="text-lg font-bold text-white">{editingSkill ? 'Edit Skill' : 'New Skill'}</h2>
                            <button onClick={handleCloseModal} className="text-gray-400 hover:text-white"><XCircle className="w-5 h-5" /></button>
                        </div>
                        
                        <form onSubmit={handleSave} className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                                    <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none">
                                        {formCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Proficiency ({formData.proficiencyLevel}%)</label>
                                    <input type="range" min="1" max="100" value={formData.proficiencyLevel} onChange={e => setFormData({...formData, proficiencyLevel: parseInt(e.target.value)})} className="w-full mt-2 accent-indigo-500" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Icon/Logo URL (SVG/PNG)</label>
                                <input type="url" value={formData.iconUrl} onChange={e => setFormData({...formData, iconUrl: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Order</label>
                                    <input required type="number" value={formData.displayOrder} onChange={e => setFormData({...formData, displayOrder: parseInt(e.target.value) || 0})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none" />
                                </div>
                                <div className="flex items-center mt-6">
                                    <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 rounded border-gray-800 text-indigo-600 focus:ring-indigo-500 bg-black" />
                                    <label htmlFor="featured" className="ml-2 text-sm text-gray-300">Highlight Skill</label>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end space-x-3 border-t border-gray-800">
                                <Button type="button" variant="outline" onClick={handleCloseModal} className="bg-transparent border-gray-700 text-white hover:bg-gray-800">Cancel</Button>
                                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Skill</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillsManager;
