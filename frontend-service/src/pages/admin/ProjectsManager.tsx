import { useState, useEffect } from "react";
import api from "../../api/axiosInstance";
import { Project } from "../../types";
import { Loader2, Plus, Edit2, Trash2, CheckCircle2, XCircle, ExternalLink, Github } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const ProjectsManager = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    // Form state
    const [formData, setFormData] = useState<Project>({
        title: "",
        description: "",
        shortDescription: "",
        imageUrl: "",
        githubUrl: "",
        liveUrl: "",
        technologies: [],
        tags: [],
        featured: false,
        displayOrder: 0
    });

    const [techInput, setTechInput] = useState("");
    const [tagInput, setTagInput] = useState("");

    const fetchProjects = async () => {
        try {
            const res = await api.get("/content/projects");
            setProjects(res.data);
        } catch (error) {
            toast.error("Failed to fetch projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleOpenModal = (project?: Project) => {
        if (project) {
            setEditingProject(project);
            setFormData(project);
        } else {
            setEditingProject(null);
            setFormData({
                title: "",
                description: "",
                shortDescription: "",
                imageUrl: "",
                githubUrl: "",
                liveUrl: "",
                technologies: [],
                tags: [],
                featured: false,
                displayOrder: projects.length
            });
        }
        setTechInput("");
        setTagInput("");
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingProject?.id) {
                await api.put(`/content/projects/${editingProject.id}`, formData);
                toast.success("Project updated successfully");
            } else {
                await api.post("/content/projects", formData);
                toast.success("Project created successfully");
            }
            fetchProjects();
            handleCloseModal();
        } catch (error) {
            toast.error("Failed to save project");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            await api.delete(`/content/projects/${id}`);
            toast.success("Project deleted");
            fetchProjects();
        } catch (error) {
            toast.error("Failed to delete project");
        }
    };

    const toggleFeatured = async (project: Project) => {
        try {
            await api.put(`/content/projects/${project.id}`, { ...project, featured: !project.featured });
            fetchProjects();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleAddArrayItem = (field: 'technologies' | 'tags', value: string, setter: (val: string) => void) => {
        if (value.trim() && !formData[field].includes(value.trim())) {
            setFormData({ ...formData, [field]: [...formData[field], value.trim()] });
            setter("");
        }
    };

    const handleRemoveArrayItem = (field: 'technologies' | 'tags', index: number) => {
        const newArr = [...formData[field]];
        newArr.splice(index, 1);
        setFormData({ ...formData, [field]: newArr });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Projects</h1>
                    <p className="text-gray-400">Manage your portfolio projects and case studies.</p>
                </div>
                <Button onClick={() => handleOpenModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Project
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
            ) : (
                <div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-300">
                            <thead className="bg-[#1a1a1a] border-b border-gray-800 text-gray-400 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Links</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project.id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{project.title}</div>
                                            <div className="text-xs text-gray-500 mt-1 line-clamp-1">{project.shortDescription}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button 
                                                onClick={() => toggleFeatured(project)}
                                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                                                    project.featured 
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20' 
                                                    : 'bg-gray-500/10 text-gray-400 border-gray-500/20 hover:bg-gray-500/20'
                                                }`}
                                            >
                                                {project.featured ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                                                {project.featured ? 'Featured' : 'Standard'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-3 text-gray-400">
                                                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white"><Github className="w-4 h-4" /></a>}
                                                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-white"><ExternalLink className="w-4 h-4" /></a>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => handleOpenModal(project)} className="text-gray-400 hover:text-indigo-400 mr-3 transition-colors"><Edit2 className="w-4 h-4" /></button>
                                            <button onClick={() => project.id && handleDelete(project.id)} className="text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                        </td>
                                    </tr>
                                ))}
                                {projects.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No projects found. Create one!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-[#111111] border border-gray-800 rounded-xl w-full max-w-2xl my-8">
                        <div className="flex justify-between items-center p-6 border-b border-gray-800">
                            <h2 className="text-xl font-bold text-white">{editingProject ? 'Edit Project' : 'New Project'}</h2>
                            <button onClick={handleCloseModal} className="text-gray-400 hover:text-white"><XCircle className="w-6 h-6" /></button>
                        </div>
                        
                        <form onSubmit={handleSave} className="p-6 space-y-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Display Order</label>
                                    <input required type="number" value={formData.displayOrder} onChange={e => setFormData({...formData, displayOrder: parseInt(e.target.value) || 0})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Short Description</label>
                                <input required type="text" value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Full Description (Markdown supported)</label>
                                <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">GitHub URL</label>
                                    <input type="url" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Live URL</label>
                                    <input type="url" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Image/CDN URL</label>
                                <input required type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                {/* Technologies */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Technologies</label>
                                    <div className="flex">
                                        <input type="text" value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleAddArrayItem('technologies', techInput, setTechInput); } }} className="flex-1 bg-black border border-gray-800 rounded-l-lg px-3 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="e.g. React" />
                                        <button type="button" onClick={() => handleAddArrayItem('technologies', techInput, setTechInput)} className="bg-gray-800 hover:bg-gray-700 text-white px-3 rounded-r-lg">Add</button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.technologies.map((t, i) => (
                                            <span key={i} className="inline-flex items-center px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 text-xs border border-indigo-500/20">
                                                {t} <button type="button" onClick={() => handleRemoveArrayItem('technologies', i)} className="ml-1 text-indigo-400 hover:text-indigo-300">&times;</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {/* Tags */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Tags</label>
                                    <div className="flex">
                                        <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleAddArrayItem('tags', tagInput, setTagInput); } }} className="flex-1 bg-black border border-gray-800 rounded-l-lg px-3 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="e.g. Microservices" />
                                        <button type="button" onClick={() => handleAddArrayItem('tags', tagInput, setTagInput)} className="bg-gray-800 hover:bg-gray-700 text-white px-3 rounded-r-lg">Add</button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.tags.map((t, i) => (
                                            <span key={i} className="inline-flex items-center px-2 py-1 rounded bg-gray-800 text-gray-300 text-xs border border-gray-700">
                                                {t} <button type="button" onClick={() => handleRemoveArrayItem('tags', i)} className="ml-1 text-gray-400 hover:text-white">&times;</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end space-x-3 border-t border-gray-800">
                                <Button type="button" variant="outline" onClick={handleCloseModal} className="bg-transparent border-gray-700 text-white hover:bg-gray-800">Cancel</Button>
                                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Project</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsManager;
