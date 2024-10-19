export interface IUserLabProgress {
    id: number;
    status: number;
    labId: number; // Связь с лабораторной
    userId: number; // Связь с пользователем
  }
  
  export interface ILab {
    id: number;
    lab_number: number;
    max_points: number;
    subjectId: number; // Связь с предметом
    userLabProgress?: IUserLabProgress[]; // Связь с прогрессом пользователей по лабораторной
  }
  
  export interface ISubject {
    id: number;
    name: string;
    total_labs: number;
    labs?: ILab[]; // Связь с лабораторными работами
  }
  
  export interface IUser {
    id: number;
    username: string;
    password: string;
    role: string;
    userLabProgress?: IUserLabProgress[]; // Связь с прогрессом по лабораторным
  }
  