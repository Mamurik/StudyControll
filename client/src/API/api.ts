export interface IUserLabProgress {
  id: number;
  status: number;
  labId: number;
  userId: number;
  lab?: ILab; 
}

export interface ILab {
  id: number;
  lab_number: number;
  max_points: number;
  subjectId: number;
  subject?: ISubject; 
  userLabProgress?: IUserLabProgress[]; 
}

export interface ISubject {
  id: number;
  name: string;
  total_labs: number;
  labs?: ILab[]; 
}

export interface IUser {
  id: number;
  username: string;
  password: string;
  role: string;
  userLabProgress?: IUserLabProgress[]; 
}
