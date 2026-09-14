import { Project, Skill, Experience } from '../types';

export const DEFAULT_PROJECTS: Project[] = [
    {
        id: '1',
        title: 'Petfull - Food Donation Matcher',
        shortDescription: 'Full-stack platform connecting food donors with those in need using intelligent matching algorithms.',
        description: 'A robust microservices platform connecting food donors with NGOs and shelters. Features automated real-time matching algorithms, geofencing, and asynchronous push notifications, reducing food wastage by 40%.',
        imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
        githubUrl: 'https://github.com/aviralgoel26/petfull',
        liveUrl: 'https://github.com/aviralgoel26/petfull',
        technologies: ['Java', 'Spring Boot', 'React', 'MySQL', 'Kafka', 'Docker'],
        tags: ['Microservices', 'Spring Boot', 'Full Stack'],
        featured: true,
        displayOrder: 1,
    },
    {
        id: '2',
        title: 'CPU Scheduler Simulator',
        shortDescription: 'Interactive simulation and visualization of operating system CPU scheduling algorithms.',
        description: 'High-performance interactive simulation platform implementing FCFS, SJF, Priority, and Round Robin scheduling algorithms with real-time Gantt charts and waiting/turnaround time performance analytics.',
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        githubUrl: 'https://github.com/aviralgoel26/cpu-scheduler',
        liveUrl: 'https://github.com/aviralgoel26/cpu-scheduler',
        technologies: ['Java', 'Algorithms', 'Operating Systems', 'Data Structures'],
        tags: ['Algorithms', 'Systems', 'Java'],
        featured: true,
        displayOrder: 2,
    },
    {
        id: '3',
        title: 'Distributed Portfolio Microservices',
        shortDescription: 'Resilient event-driven microservices architecture with Eureka discovery, Gateway, and JWT auth.',
        description: 'Production-ready distributed architecture featuring Spring Cloud Gateway, Eureka service discovery, Config Server, distributed tracing, resilient Kafka messaging, and a sleek React/TypeScript administrative suite.',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        githubUrl: 'https://github.com/aviralgoel26/Portfolio_microservices',
        liveUrl: 'https://github.com/aviralgoel26/Portfolio_microservices',
        technologies: ['Spring Cloud', 'Eureka', 'Docker', 'Redis', 'PostgreSQL', 'React'],
        tags: ['Microservices', 'Cloud', 'Distributed Systems'],
        featured: true,
        displayOrder: 3,
    }
];

export const DEFAULT_SKILLS: Skill[] = [
    // Languages
    { id: '1', name: 'Java', category: 'Languages', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', proficiencyLevel: 90, displayOrder: 1, featured: true },
    { id: '2', name: 'TypeScript / JavaScript', category: 'Languages', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', proficiencyLevel: 85, displayOrder: 2, featured: true },
    { id: '3', name: 'Python', category: 'Languages', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', proficiencyLevel: 80, displayOrder: 3, featured: false },
    { id: '4', name: 'C / C++', category: 'Languages', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', proficiencyLevel: 75, displayOrder: 4, featured: false },

    // Frameworks & Backend
    { id: '5', name: 'Spring Boot & Cloud', category: 'Frameworks & Backend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', proficiencyLevel: 92, displayOrder: 5, featured: true },
    { id: '6', name: 'Microservices Architecture', category: 'Frameworks & Backend', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg', proficiencyLevel: 88, displayOrder: 6, featured: true },
    { id: '7', name: 'REST APIs & WebSockets', category: 'Frameworks & Backend', iconUrl: '', proficiencyLevel: 90, displayOrder: 7, featured: false },

    // Web Technologies
    { id: '8', name: 'React.js', category: 'Web Technologies', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', proficiencyLevel: 88, displayOrder: 8, featured: true },
    { id: '9', name: 'Tailwind CSS', category: 'Web Technologies', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', proficiencyLevel: 90, displayOrder: 9, featured: false },
    { id: '10', name: 'HTML5 & CSS3', category: 'Web Technologies', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', proficiencyLevel: 95, displayOrder: 10, featured: false },

    // Databases & Caching
    { id: '11', name: 'PostgreSQL & MySQL', category: 'Databases & Caching', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', proficiencyLevel: 85, displayOrder: 11, featured: true },
    { id: '12', name: 'Redis Caching', category: 'Databases & Caching', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', proficiencyLevel: 80, displayOrder: 12, featured: false },

    // DevOps & Cloud
    { id: '13', name: 'Docker & Containers', category: 'DevOps & Cloud', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', proficiencyLevel: 85, displayOrder: 13, featured: true },
    { id: '14', name: 'Kubernetes', category: 'DevOps & Cloud', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', proficiencyLevel: 75, displayOrder: 14, featured: false },
    { id: '15', name: 'Git & GitHub Actions CI/CD', category: 'DevOps & Cloud', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', proficiencyLevel: 88, displayOrder: 15, featured: false },

    // Core CS & Tools
    { id: '16', name: 'Data Structures & Algorithms', category: 'Core CS & Tools', iconUrl: '', proficiencyLevel: 88, displayOrder: 16, featured: true },
    { id: '17', name: 'Distributed Systems', category: 'Core CS & Tools', iconUrl: '', proficiencyLevel: 82, displayOrder: 17, featured: true },
    { id: '18', name: 'System Design & OOP', category: 'Core CS & Tools', iconUrl: '', proficiencyLevel: 85, displayOrder: 18, featured: false }
];

export const DEFAULT_EXPERIENCES: Experience[] = [
    {
        id: '1',
        company: 'STEPS Management Services',
        role: 'Operations Manager',
        location: 'India',
        startDate: '2022',
        endDate: '2025',
        current: false,
        description: 'Led operational initiatives and drove process optimization. Applied systematic thinking and data-driven decision making to streamline operations and build scalable organizational workflows.',
        highlights: [
            'Streamlined operational workflows, increasing overall team productivity by 25%',
            'Led cross-functional teams of 10+ members across diverse technical and operational initiatives',
            'Implemented automated tracking solutions improving project turnaround times',
            'Awarded STEPS Certificate of Operational Excellence'
        ],
        companyLogoUrl: '',
        displayOrder: 1
    },
    {
        id: '2',
        company: 'CodSoft',
        role: 'Software Development Intern',
        location: 'Remote',
        startDate: 'Summer 2023',
        endDate: '2023',
        current: false,
        description: 'Developed Java enterprise applications, RESTful microservices, and strengthened core problem-solving competencies through hands-on software development.',
        highlights: [
            'Architected and implemented 3 full-featured Java-based applications',
            'Adopted clean code patterns, unit testing, and robust object-oriented software engineering practices',
            'Participated in agile sprints, peer code reviews, and continuous integration flows'
        ],
        companyLogoUrl: '',
        displayOrder: 2
    }
];
