import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Cloud, Lightbulb, Rocket } from "lucide-react";

const highlights = [
  { icon: Code2, label: "Java & Backend Expert" },
  { icon: Cloud, label: "Cloud & DevOps" },
  { icon: Lightbulb, label: "Problem Solver" },
  { icon: Rocket, label: "System Builder" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image / Visual */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl rotate-6 opacity-20" />
              <div className="absolute inset-0 glass-card rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="font-display text-5xl font-bold text-primary-foreground">AG</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2">Aviral Goel</h3>
                    <p className="text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              About Me
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Passionate about building{" "}
              <span className="gradient-text">impactful software</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                I'm a dedicated software developer with a strong foundation in Java 
                and backend development. I thrive on solving complex problems and 
                building systems that scale.
              </p>
              <p>
                With hands-on experience in cloud technologies (AWS), DevOps practices, 
                and modern frontend frameworks, I bring a full-stack perspective to 
                every project. My approach combines clean code principles with 
                practical problem-solving.
              </p>
              <p>
                When I'm not coding, I'm deepening my understanding of data structures, 
                algorithms, and system design to build better, more efficient solutions.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl glass-card hover-lift"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <item.icon size={20} />
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
