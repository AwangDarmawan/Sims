
import api from "./Axios";


export interface IApiPpobResponse<T> {
  status: number;
  message: string;
  data: T;
}
export interface IApiPpob {
  service_code: string,
  service_name: string,
   service_icon: string,
   service_tariff: string
}


export const ApiGetPpob = async (): Promise<IApiPpobResponse<IApiPpob[]>> => {
  const response = await api.get<IApiPpobResponse<IApiPpob[]>>("/services");
  return response.data;
};