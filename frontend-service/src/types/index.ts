export interface Project {
    id?: string;
    title: string;
    description: string;
    shortDescription: string;
    imageUrl: string;
    githubUrl: string;
    liveUrl: string;
    technologies: string[];
    tags: string[];
    featured: boolean;
    displayOrder: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface Skill {
    id?: string;
    name: string;
    category: string;
    iconUrl: string;
    proficiencyLevel: number;
    displayOrder: number;
    featured: boolean;
}

export interface Experience {
    id?: string;
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    highlights: string[];
    companyLogoUrl: string;
    displayOrder: number;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    receivedAt: string;
    emailSentAt?: string;
    errorMessage?: string;
}

export interface VisitorEvent {
    id: string;
    eventType: string;
    page: string;
    ip: string;
    userAgent: string;
    timestamp: string;
}
