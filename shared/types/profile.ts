export interface Profile {
  basics: {
    name: string;
    nickname: string;
    position: string;
    hobby: string;
    avatarUrl?: string;
  };
  skills: {
    current: string[];
    learning: string[];
  };
  projects: Project[];
  workHistory: WorkHistory[];
}

export interface Project {
  name: string;
  description: string;
  url?: string;
}

export interface WorkHistory {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface DetailedProject {
  name: string;
  description: string;
  role: string;
  highlights: string[];
  technologies: string[];
  github?: string;
  demo?: string;
}
