import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, Briefcase, GraduationCap, Code2, MessageSquare, LogOut } from "lucide-react";

const AdminLayout = () => {
    const { logout } = useAuth();

    const navItems = [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
        { name: "Projects", path: "/admin/projects", icon: Briefcase },
        { name: "Experience", path: "/admin/experience", icon: GraduationCap },
        { name: "Skills", path: "/admin/skills", icon: Code2 },
        { name: "Messages", path: "/admin/messages", icon: MessageSquare },
    ];

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-gray-100">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-800 bg-[#111111] flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-xl font-bold text-white tracking-tight">Portfolio Admin</h1>
                </div>
                
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={logout}
                        className="flex items-center space-x-3 px-3 py-2.5 w-full rounded-md text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-[#0a0a0a]">
                <div className="p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
