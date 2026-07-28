import { useState, useEffect } from "react";
import api from "../../api/axiosInstance";
import { ContactMessage } from "../../types";
import { Loader2, Trash2, Mail, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const MessagesViewer = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const res = await api.get("/notifications/messages");
            setMessages(res.data);
        } catch (error) {
            toast.error("Failed to fetch messages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;
        try {
            await api.delete(`/notifications/messages/${id}`);
            toast.success("Message deleted");
            setMessages(messages.filter(m => m.id !== id));
        } catch (error) {
            toast.error("Failed to delete message");
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "EMAIL_SENT":
                return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case "FAILED":
                return <AlertCircle className="w-4 h-4 text-red-500" />;
            default:
                return <Clock className="w-4 h-4 text-yellow-500" />;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Inbox</h1>
                <p className="text-gray-400">View messages submitted via the contact form.</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className="bg-[#111111] border border-gray-800 rounded-xl p-5 group relative">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">{msg.name}</h3>
                                        <a href={`mailto:${msg.email}`} className="text-sm text-indigo-400 hover:underline">{msg.email}</a>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-1.5 text-xs bg-black px-2 py-1 rounded border border-gray-800">
                                        {getStatusIcon(msg.status)}
                                        <span className="text-gray-400">{msg.status.replace("_", " ")}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {new Date(msg.receivedAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="bg-black/50 border border-gray-800 rounded-lg p-4 mb-2">
                                <h4 className="text-sm font-semibold text-gray-300 mb-2">Subject: {msg.subject}</h4>
                                <p className="text-gray-400 text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                            </div>

                            <button 
                                onClick={() => handleDelete(msg.id)}
                                className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 p-2 text-gray-500 hover:text-red-400 bg-[#111111] hover:bg-black rounded-lg transition-all border border-transparent hover:border-red-500/20"
                                title="Delete message"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    
                    {messages.length === 0 && (
                        <div className="text-center py-20 bg-[#111111] border border-gray-800 rounded-xl text-gray-500">
                            <Mail className="w-10 h-10 mx-auto mb-3 text-gray-700" />
                            No messages in your inbox.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MessagesViewer;
