import axios from './axios';

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export const authAPI = {
  signup: async (credentials: AuthCredentials): Promise<string> => {
    const response = await axios.post<string>('/auth/signup', credentials);
    return response.data;
  },

  signin: async (credentials: AuthCredentials): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(
      '/auth/signin',
      credentials
    );
    return response.data;
  },
};
