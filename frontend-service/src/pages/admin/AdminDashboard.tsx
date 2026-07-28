import { useState, useEffect } from "react";
import api from "../../api/axiosInstance";
import { Loader2, Activity, Users, FileText, MousePointerClick } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AnalyticsSummary {
    totalVisits: number;
    uniqueVisitors: number;
    visitsByPage: Record<string, number>;
    visitsByEventType: Record<string, number>;
}

const AdminDashboard = () => {
    const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
    const [timeline, setTimeline] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const [summaryRes, timelineRes] = await Promise.all([
                    api.get('/analytics/summary'),
                    api.get('/analytics/timeline?days=30')
                ]);
                setSummary(summaryRes.data);
                setTimeline(timelineRes.data);
            } catch (error) {
                console.error("Failed to fetch analytics", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) {
        return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>;
    }

    const pageData = summary ? Object.entries(summary.visitsByPage).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value).slice(0, 5) : [];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Analytics Dashboard</h1>
                <p className="text-gray-400">Overview of your portfolio's telemetry and engagement.</p>
            </div>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-indigo-500"><Activity className="w-16 h-16" /></div>
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Total Events</h3>
                    <p className="text-4xl font-bold text-white">{summary?.totalVisits || 0}</p>
                </div>
                <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-indigo-500"><Users className="w-16 h-16" /></div>
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Unique Visitors</h3>
                    <p className="text-4xl font-bold text-white">{summary?.uniqueVisitors || 0}</p>
                </div>
                <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-indigo-500"><FileText className="w-16 h-16" /></div>
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Page Views</h3>
                    <p className="text-4xl font-bold text-white">{summary?.visitsByEventType['PAGE_VIEWED'] || 0}</p>
                </div>
                <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-indigo-500"><MousePointerClick className="w-16 h-16" /></div>
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Project Clicks</h3>
                    <p className="text-4xl font-bold text-white">{summary?.visitsByEventType['PROJECT_VIEWED'] || 0}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 30 Day Timeline Area Chart */}
                <div className="lg:col-span-2 bg-[#111111] border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Traffic (Last 30 Days)</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="date" stroke="#666" tick={{fill: '#666', fontSize: 12}} tickFormatter={(val) => val.split('-').slice(1).join('/')} />
                                <YAxis stroke="#666" tick={{fill: '#666', fontSize: 12}} />
                                <RechartsTooltip 
                                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff', borderRadius: '8px' }}
                                    itemStyle={{ color: '#818cf8' }}
                                />
                                <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Pages Bar Chart */}
                <div className="bg-[#111111] border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Top Pages</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={pageData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={true} vertical={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} width={80} />
                                <RechartsTooltip 
                                    cursor={{fill: '#222'}}
                                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff', borderRadius: '8px' }}
                                />
                                <Bar dataKey="value" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
