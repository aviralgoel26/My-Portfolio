import { useState, useEffect } from 'react';
import { Terminal, Command } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ];

    const triggerCmdK = () => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
    };

    return (
        <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-[#09090b]/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
            <div className="container-width flex items-center justify-between">
                <a href="#" className="flex items-center space-x-2 text-white hover:text-indigo-400 transition-colors">
                    <Terminal className="w-6 h-6" />
                    <span className="font-bold tracking-tight text-xl">Portfolio</span>
                </a>

                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <a key={link.name} href={link.href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="flex items-center space-x-4">
                    <button onClick={triggerCmdK} className="hidden md:flex items-center text-gray-400 hover:text-white bg-white/5 border border-white/10 rounded-md px-3 py-1.5 text-xs transition-colors">
                        <Command className="w-3 h-3 mr-1.5" /> <span>Cmd K</span>
                    </button>
                    <Link to="/login" className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-full transition-colors">
                        Admin Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
