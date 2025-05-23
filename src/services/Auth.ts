
import api from "./Axios"

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

export interface ILoginForm {
  email: string;
  password: string | number;
}

export interface IAuthResponse {
  status: number;
  message: string;
  data: {
    token: string;
  };
}

export const ApiRegister = (formData: Omit <IRegisterForm, 'confirmPassword'>) => {
  return api.post<IRegisterResponse>('/registration', formData);
};

export const ApiLogin = async (formData: ILoginForm): Promise<IAuthResponse> => {
  const response = await api.post<IAuthResponse>("/login", formData);
  return response.data; 
};

