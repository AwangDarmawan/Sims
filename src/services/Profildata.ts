// src/services/api.ts
import api from "./Axios";


export interface IApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
export interface IUserProfile {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}


export interface IUpdateProfileName {
  first_name?: string;
  last_name?: string;
}

export const ApiGetProfile = async (): Promise<IApiResponse<IUserProfile>> => {
  const response = await api.get<IApiResponse<IUserProfile>>("/profile");
  return response.data;
};
export const ApiUpdateProfileName = async (data: IUpdateProfileName): Promise<IApiResponse<IUserProfile>> => {
 const response = await api.put<IApiResponse<IUserProfile>>("/profile/update", data); 
  return response.data;
};


export const ApiUploadProfileImage = async (image: File): Promise<IApiResponse<IUserProfile>> => {
  const formData = new FormData();
  formData.append("file", image); 

  const response = await api.put<IApiResponse<IUserProfile>>(
    "/profile/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};




