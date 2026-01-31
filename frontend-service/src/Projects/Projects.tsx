import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "./button";

const projects = [
  {
    title: "Petfull",
    subtitle: "Food Donation Matcher Platform",
    description:
      "A full-stack platform connecting food donors with those in need using intelligent matching algorithms. Reduced food wastage by 40% through efficient distribution.",
    tech: ["Java", "Spring Boot", "React", "MySQL", "REST API"],
    highlights: [
      "Matching algorithm for donor-recipient pairing",
      "Real-time notifications system",
      "40% reduction in food wastage",
    ],
    github: "https://github.com/aviralg/petfull",
    featured: true,
  },
  {
    title: "CPU Scheduler Simulator",
    subtitle: "Operating System Algorithms",
    description:
      "Interactive simulation of CPU scheduling algorithms including FCFS, SJF, Priority, and Round Robin. Visualizes process execution and performance metrics.",
    tech: ["Java", "Swing", "Algorithms", "OS Concepts"],
    highlights: [
      "4 scheduling algorithms implemented",
      "Visual process timeline",
      "Performance metrics comparison",
    ],
    github: "https://github.com/aviralg/cpu-scheduler",
    featured: true,
  },
  {
    title: "Portfolio Website",
    subtitle: "Personal Brand",
    description:
      "Modern, responsive portfolio built with React and Tailwind CSS featuring smooth animations and dark mode support.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    highlights: [
      "Fully responsive design",
      "Dark/Light mode toggle",
      "Optimized performance",
    ],
    github: "https://github.com/aviralg/portfolio",
    featured: false,
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-width">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Featured Work
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcasing solutions that solve real problems with clean, efficient code
          </p>
        </motion.div>

        <div className="grid gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`group relative glass-card rounded-3xl overflow-hidden hover-lift ${
                project.featured ? "p-8 md:p-10" : "p-6 md:p-8"
              }`}
            >
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    Featured
                  </span>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-primary/80 font-medium mb-4">
                    {project.subtitle}
                  </p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-primary/30 hover:bg-primary/10"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={16} />
                        View Code
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 hover:bg-secondary"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </Button>
                  </div>
                </div>

                {/* Highlights Card */}
                <div className="relative">
                  <div className="bg-secondary/50 rounded-2xl p-6 border border-border/50">
                    <h4 className="font-display font-semibold mb-4 flex items-center gap-2">
                      <ArrowUpRight size={18} className="text-primary" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-3">
                      {project.highlights.map((highlight, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
