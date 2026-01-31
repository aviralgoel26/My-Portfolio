import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code,
  Database,
  Layout,
  Cloud,
  Cpu,
  Wrench,
} from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    skills: ["Java", "Python", "C/C++", "JavaScript", "TypeScript"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend & Databases",
    icon: Database,
    skills: ["Spring Boot", "JDBC", "MySQL", "REST APIs", "Hibernate"],
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion"],
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS (EC2, S3, Lambda)", "Docker", "Kubernetes", "IAM", "VPC"],
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Core CS",
    icon: Cpu,
    skills: ["DSA", "OOP", "Operating Systems", "Multithreading", "System Design"],
    color: "from-rose-500 to-pink-500",
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git/GitHub", "Postman", "VS Code", "IntelliJ IDEA", "Linux"],
    color: "from-indigo-500 to-blue-500",
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative bg-secondary/30">
      <div className="container-width">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Technical Skills
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building scalable, performant applications
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group glass-card rounded-2xl p-6 hover-lift"
            >
              <div className="flex items-center gap-4 mb-5">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white`}
                >
                  <category.icon size={24} />
                </div>
                <h3 className="font-display text-xl font-semibold">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-secondary/80 text-sm font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
