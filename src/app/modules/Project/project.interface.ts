export interface IProject {
  title: string;
  description: string;
  images: string[];
  category: string;
  duration: string;
  completionDate: string;
  technologies: string[];
  github: string;
  live: string;
  features: {
    title: string;
    description: string;
  }[];
  challenges: {
    title: string;
    description: string;
    solution: string;
  }[];
}
