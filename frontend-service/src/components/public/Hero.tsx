import { useEffect, useState } from 'react';
import { ChevronRight, Terminal, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Full Stack Engineer & Microservices Architect";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const triggerCmdK = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Abstract Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container-width relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-8 backdrop-blur-sm animate-fade-in cursor-pointer hover:bg-white/10 transition-colors" onClick={triggerCmdK}>
          <Command className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Press <kbd className="font-sans px-1.5 py-0.5 bg-white/10 rounded">⌘K</kbd> to explore</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
          Building Resilient <br className="hidden md:block" /> Enterprise Systems
        </h1>
        
        <div className="h-8 mb-8 flex items-center justify-center space-x-2 text-xl md:text-2xl text-gray-400 font-mono">
          <Terminal className="w-6 h-6 text-indigo-400" />
          <span>{text}<span className="animate-pulse">_</span></span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-white text-black hover:bg-gray-200 rounded-full px-8 h-12 w-full sm:w-auto" asChild>
            <a href="#projects">
              View Architecture <ChevronRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 rounded-full px-8 h-12 w-full sm:w-auto text-white bg-transparent" asChild>
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
