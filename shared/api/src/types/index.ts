export interface User {
  id: string;
  email: string;
  name: string;
  bio: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
  expiresIn: number;
}

export interface IAuthService {
  login(credentials: { email: string; password: string }): Promise<User>;
}
