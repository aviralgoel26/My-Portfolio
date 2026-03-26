import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, GraduationCap, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "Social Networks",
    issuer: "IIT Madras",
    icon: "🎓",
    description: "Understanding network structures and social graph analysis",
    link: "https://drive.google.com/file/d/1s_j6xc2k8BP8XNJTRzL6m_PB36gc83m6/view",
  },
  {
    title: "Introduction to Hardware and Operating Systems",
    issuer: "IBM",
    icon: "💻",
    description: "Computer architecture and OS fundamentals",
    link: "https://drive.google.com/file/d/1k8gEVs025VHsfv2ZP1pipeh7e0RvZLE5/view"
  },
  {
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google",
    icon: "🌐",
    description: "Network protocols and infrastructure",
    link: "https://drive.google.com/file/d/1J0x7wmgnbYKxubBLYQZkpkV7zcMR9-sW/view"
  },
];

const leadership = [
  {
    title: "Chief Financial Officer",
    organization: "College Club",
    description:
      "Managed finances and budgeting for club activities, demonstrating fiscal responsibility and strategic planning.",
  },
  {
    title: "Tech Training Lead",
    organization: "Community Initiative",
    description:
      "Conducted programming workshops and mentored students in software development fundamentals.",
  },
];

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="section-padding relative">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Certifications */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Award size={24} />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                Certifications
              </h2>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, i) => (
  <motion.div
    key={cert.title}
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.4, delay: i * 0.1 }}
    className="group glass-card rounded-xl p-5 hover-lift"
  >
    <div className="flex items-start gap-4">
      <span className="text-3xl">{cert.icon}</span>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
              {cert.title}
            </h3>
            <p className="text-primary/80 text-sm font-medium">
              {cert.issuer}
            </p>
          </div>

          {/* ✅ CLICKABLE ICON ONLY */}
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1"
          >
            <ExternalLink
              size={16}
              className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            />
          </a>
        </div>

        <p className="text-muted-foreground text-sm mt-2">
          {cert.description}
        </p>
      </div>
    </div>
  </motion.div>
))}
            </div>
          </motion.div>

          {/* Leadership */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-accent/10 text-accent">
                <GraduationCap size={24} />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                Leadership
              </h2>
            </div>

            <div className="space-y-4">
              {leadership.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="glass-card rounded-xl p-5 hover-lift"
                >
                  <h3 className="font-display font-semibold text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-accent text-sm font-medium mb-3">
                    {item.organization}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
