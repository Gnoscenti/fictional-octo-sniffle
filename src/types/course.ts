export interface Lesson {
  id: string;
  title: string;
  // Path to the markdown file in /src/course_content/lessons/
  contentPath: string;
  isFree: boolean;
  order: number;
  videoUrl?: string;
  // Potentially add estimated duration, difficulty, etc.
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  // Potentially add instructor, overall image, etc.
}

