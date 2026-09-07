export interface PortfolioData {
  basics: Basics;
  featuredProjects: FeaturedProject[];
  pastProjects: PastProject[];
  skills: Skills;
  personal: Personal;
}

export interface Basics {
  name: string;
  nickname: string;
  role: string;
  tagline: string;
  avatar: string;
}

export interface FeaturedProject {
  name: string;
  description: string;
  role: string;
  highlights: string[];
  technologies: string[];
}

export interface PastProject {
  name: string;
  description: string;
}

export interface Skills {
  core: string[];
  learning: LearningTopic[];
}

export interface LearningTopic {
  topic: string;
  description: string;
}

export interface Personal {
  hobbies: Hobby[];
  pets: Pets;
}

export interface Hobby {
  title: string;
  description: string;
}

export interface Pets {
  title: string;
  description: string;
}
