export enum UserGrade {
  Normal = 'Normal',
  Premium = 'Premium',
}

export class UserDTO {
  id: number;

  username: string;

  email: string;

  grade: UserGrade;
}
