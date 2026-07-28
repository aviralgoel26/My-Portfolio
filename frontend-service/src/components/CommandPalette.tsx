import { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, GraduationCap, Code2, MessageSquare, LogOut, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CommandPalette = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    // Toggle the menu when ⌘K is pressed
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm">
            <Command
                className="w-full max-w-lg bg-[#111111] border border-gray-800 rounded-xl shadow-2xl overflow-hidden"
                shouldFilter={true}
            >
                <div className="flex items-center border-b border-gray-800 px-3 py-4 text-white">
                    <Search className="w-5 h-5 mr-3 text-gray-500" />
                    <Command.Input
                        autoFocus
                        placeholder="Type a command or search..."
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
                    />
                    <div className="text-xs text-gray-500 border border-gray-700 rounded px-1.5 py-0.5">ESC</div>
                </div>

                <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-800">
                    <Command.Empty className="py-6 text-center text-sm text-gray-500">
                        No results found.
                    </Command.Empty>

                    <Command.Group heading="Navigation" className="text-xs font-medium text-gray-500 px-2 py-1.5 mb-1">
                        <Command.Item
                            onSelect={() => runCommand(() => navigate('/admin'))}
                            className="flex items-center px-2 py-2.5 text-sm text-gray-300 rounded-md cursor-pointer hover:bg-white/10 hover:text-white aria-selected:bg-white/10 aria-selected:text-white"
                        >
                            <LayoutDashboard className="mr-3 h-4 w-4" /> Dashboard
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => navigate('/admin/projects'))}
                            className="flex items-center px-2 py-2.5 text-sm text-gray-300 rounded-md cursor-pointer hover:bg-white/10 hover:text-white aria-selected:bg-white/10 aria-selected:text-white"
                        >
                            <Briefcase className="mr-3 h-4 w-4" /> Projects
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => navigate('/admin/experience'))}
                            className="flex items-center px-2 py-2.5 text-sm text-gray-300 rounded-md cursor-pointer hover:bg-white/10 hover:text-white aria-selected:bg-white/10 aria-selected:text-white"
                        >
                            <GraduationCap className="mr-3 h-4 w-4" /> Experience
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => navigate('/admin/skills'))}
                            className="flex items-center px-2 py-2.5 text-sm text-gray-300 rounded-md cursor-pointer hover:bg-white/10 hover:text-white aria-selected:bg-white/10 aria-selected:text-white"
                        >
                            <Code2 className="mr-3 h-4 w-4" /> Skills
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => navigate('/admin/messages'))}
                            className="flex items-center px-2 py-2.5 text-sm text-gray-300 rounded-md cursor-pointer hover:bg-white/10 hover:text-white aria-selected:bg-white/10 aria-selected:text-white"
                        >
                            <MessageSquare className="mr-3 h-4 w-4" /> Messages
                        </Command.Item>
                    </Command.Group>

                    <Command.Separator className="h-px bg-gray-800 my-1" />

                    <Command.Group heading="Settings" className="text-xs font-medium text-gray-500 px-2 py-1.5 mt-1">
                        <Command.Item
                            onSelect={() => runCommand(() => logout())}
                            className="flex items-center px-2 py-2.5 text-sm text-red-400 rounded-md cursor-pointer hover:bg-red-500/10 aria-selected:bg-red-500/10"
                        >
                            <LogOut className="mr-3 h-4 w-4" /> Sign Out
                        </Command.Item>
                    </Command.Group>
                </Command.List>
            </Command>

            {/* Click outside to close */}
            <div className="absolute inset-0 z-[-1]" onClick={() => setOpen(false)} />
        </div>
    );
};

export default CommandPalette;
