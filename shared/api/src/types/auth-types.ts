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
  forgotPassword(email: string): Promise<string>;
  resetPassword(credentials: {
    password: string;
    confirmPassword: string;
    token: string;
  }): Promise<string>;
  register(data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profilePicture: File | undefined;
  }): Promise<User>;
}
