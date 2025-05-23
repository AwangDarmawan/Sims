
import api from "./Axios";


export interface IApiBannerResponse<T> {
  status: number;
  message: string;
  data: T;
}
export interface IApiBanner {
  banner_name: string;
  banner_image: string;
  description : string
}



export const ApiGetBanner = async (): Promise<IApiBannerResponse<IApiBanner[]>> => {
  const response = await api.get<IApiBannerResponse<IApiBanner[]>>("/banner");
  return response.data;
};