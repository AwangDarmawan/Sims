import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL ;
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface  IRegisterForm {
  email: string;
  first_name: string;
  last_name: string;
  password: string | number;
  confirmPassword: string | number; 
}

export interface IRegisterResponse {
  status: number;
  message: string;
  data: null; 
}

export const registerUser = (formData: Omit <IRegisterForm, 'confirmPassword'>) => {
  return api.post<IRegisterResponse>('/registration', formData);
};

