import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Lovely Professional University",
    location: "Punjab, India",
    period: "2023 - 2027",
    description: "Currently pursuing Bachelor's degree in Computer Science and Engineering, focusing on software development, algorithms, and modern technologies.",
    achievements: [
      "Maintaining strong academic performance",
      "Learning full-stack development and system design",
      "Participating in coding competitions and hackathons",
    ],
    status: "Ongoing",
  },
  {
    degree: "12th Grade (Intermediate)",
    institution: "Sacred Heart Convent School",
    location: "Chandausi, India",
    period: "2022 - 2023",
    description: "Completed higher secondary education with focus on science and mathematics, building foundation for engineering studies.",
    achievements: [
      "Achieved excellent academic results",
      "Developed strong analytical and problem-solving skills",
      "Participated in science exhibitions and competitions",
    ],
    status: "Completed",
  },
  {
    degree: "10th Grade (Matriculation)",
    institution: "Sacred Heart Convent School",
    location: "Chandausi, India",
    period: "2020 - 2021",
    description: "Completed secondary education with comprehensive curriculum covering core subjects and extracurricular activities.",
    achievements: [
      "Excelled in core subjects including Mathematics and Science",
      "Active participation in school events and activities",
      "Developed foundation in logical thinking and communication",
    ],
    status: "Completed",
  },
];

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding relative bg-background">
      <div className="container-width">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Academic Background
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Building knowledge and skills through academic excellence and continuous learning
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className={`relative flex items-start gap-8 mb-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1.5 md:-translate-x-2 z-10" />

                {/* Content Card */}
                <div
                  className={`ml-8 md:ml-0 md:w-1/2 ${
                    i % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="glass-card rounded-2xl p-6 hover-lift">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                          edu.status === "Ongoing"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-primary/10 text-primary"
                        }`}>
                          {edu.status}
                        </span>
                        <h3 className="font-display text-xl font-bold">
                          {edu.degree}
                        </h3>
                        <p className="text-primary font-medium">{edu.institution}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <GraduationCap size={20} />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        {edu.location}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {edu.description}
                    </p>

                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;