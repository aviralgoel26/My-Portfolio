import { useState, useEffect } from "react";
import api from "../../api/axiosInstance";
import { Experience } from "../../types";
import { Loader2, Plus, Edit2, Trash2, XCircle, Briefcase, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const ExperienceManager = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExp, setEditingExp] = useState<Experience | null>(null);

    const [formData, setFormData] = useState<Experience>({
        company: "",
        role: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        highlights: [],
        companyLogoUrl: "",
        displayOrder: 0
    });
    
    const [highlightInput, setHighlightInput] = useState("");

    const fetchExperience = async () => {
        try {
            const res = await api.get("/content/experiences");
            setExperiences(res.data);
        } catch (error) {
            toast.error("Failed to fetch experience");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperience();
    }, []);

    const handleOpenModal = (exp?: Experience) => {
        if (exp) {
            setEditingExp(exp);
            setFormData(exp);
        } else {
            setEditingExp(null);
            setFormData({
                company: "",
                role: "",
                location: "",
                startDate: "",
                endDate: "",
                current: false,
                description: "",
                highlights: [],
                companyLogoUrl: "",
                displayOrder: experiences.length
            });
        }
        setHighlightInput("");
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingExp(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingExp?.id) {
                await api.put(`/content/experiences/${editingExp.id}`, formData);
                toast.success("Experience updated");
            } else {
                await api.post("/content/experiences", formData);
                toast.success("Experience added");
            }
            fetchExperience();
            handleCloseModal();
        } catch (error) {
            toast.error("Failed to save experience");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this experience?")) return;
        try {
            await api.delete(`/content/experiences/${id}`);
            toast.success("Experience deleted");
            fetchExperience();
        } catch (error) {
            toast.error("Failed to delete experience");
        }
    };

    const handleAddHighlight = () => {
        if (highlightInput.trim() && !formData.highlights.includes(highlightInput.trim())) {
            setFormData({ ...formData, highlights: [...formData.highlights, highlightInput.trim()] });
            setHighlightInput("");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Experience</h1>
                    <p className="text-gray-400">Manage your work history and timeline.</p>
                </div>
                <Button onClick={() => handleOpenModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Role
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
            ) : (
                <div className="space-y-4">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="bg-[#111111] border border-gray-800 rounded-xl p-5 flex flex-col md:flex-row md:items-start justify-between group">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center shrink-0 border border-gray-700 overflow-hidden">
                                    {exp.companyLogoUrl ? (
                                        <img src={exp.companyLogoUrl} alt={exp.company} className="w-full h-full object-cover" />
                                    ) : (
                                        <Briefcase className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                                    <div className="flex items-center text-indigo-400 text-sm mt-1 font-medium">
                                        <span>{exp.company}</span>
                                        <span className="mx-2 text-gray-600">•</span>
                                        <span className="text-gray-400">{exp.location}</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500 mt-2">
                                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                    </div>
                                    <p className="text-gray-400 text-sm mt-3 line-clamp-2">{exp.description}</p>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 flex space-x-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="outline" size="sm" onClick={() => handleOpenModal(exp)} className="bg-transparent border-gray-700 text-gray-300 hover:text-indigo-400 hover:bg-gray-800">
                                    <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => exp.id && handleDelete(exp.id)} className="bg-transparent border-gray-700 text-gray-300 hover:text-red-400 hover:bg-gray-800">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {experiences.length === 0 && (
                        <div className="text-center py-12 bg-[#111111] border border-gray-800 rounded-xl text-gray-500">
                            No experience entries found.
                        </div>
                    )}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-[#111111] border border-gray-800 rounded-xl w-full max-w-2xl my-8">
                        <div className="flex justify-between items-center p-5 border-b border-gray-800">
                            <h2 className="text-xl font-bold text-white">{editingExp ? 'Edit Experience' : 'New Experience'}</h2>
                            <button onClick={handleCloseModal} className="text-gray-400 hover:text-white"><XCircle className="w-6 h-6" /></button>
                        </div>
                        
                        <form onSubmit={handleSave} className="p-5 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                                    <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Role / Job Title</label>
                                    <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                                    <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Company Logo URL</label>
                                    <input type="url" value={formData.companyLogoUrl} onChange={e => setFormData({...formData, companyLogoUrl: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 items-end">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                                    <input required type="text" placeholder="e.g. Jan 2023" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                                    <input type="text" placeholder="e.g. Present" value={formData.endDate} disabled={formData.current} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none disabled:opacity-50" />
                                </div>
                                <div className="pb-2">
                                    <label className="flex items-center text-gray-300 cursor-pointer">
                                        <input type="checkbox" checked={formData.current} onChange={e => setFormData({...formData, current: e.target.checked, endDate: e.target.checked ? "" : formData.endDate})} className="w-4 h-4 rounded border-gray-800 text-indigo-600 focus:ring-indigo-500 bg-black mr-2" />
                                        Current Position
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none"></textarea>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Key Achievements / Highlights</label>
                                <div className="flex">
                                    <input type="text" value={highlightInput} onChange={e => setHighlightInput(e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleAddHighlight(); } }} className="flex-1 bg-black border border-gray-800 rounded-l-lg px-3 py-2 text-white focus:border-indigo-500 outline-none" placeholder="e.g. Led migration to microservices..." />
                                    <button type="button" onClick={handleAddHighlight} className="bg-gray-800 hover:bg-gray-700 text-white px-4 rounded-r-lg">Add</button>
                                </div>
                                <ul className="mt-3 space-y-2">
                                    {formData.highlights.map((h, i) => (
                                        <li key={i} className="flex items-start justify-between bg-black/50 border border-gray-800 rounded p-2 text-sm text-gray-300">
                                            <span className="flex-1 mr-2">• {h}</span>
                                            <button type="button" onClick={() => {
                                                const newH = [...formData.highlights];
                                                newH.splice(i, 1);
                                                setFormData({...formData, highlights: newH});
                                            }} className="text-gray-500 hover:text-red-400">&times;</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Display Order</label>
                                <input required type="number" value={formData.displayOrder} onChange={e => setFormData({...formData, displayOrder: parseInt(e.target.value) || 0})} className="w-1/3 bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none" />
                            </div>

                            <div className="pt-4 flex justify-end space-x-3 border-t border-gray-800">
                                <Button type="button" variant="outline" onClick={handleCloseModal} className="bg-transparent border-gray-700 text-white hover:bg-gray-800">Cancel</Button>
                                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Experience</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExperienceManager;
