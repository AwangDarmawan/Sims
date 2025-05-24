import api from "./Axios";

export interface SaldoUser {
  balance:number
}

export interface TransaksiResponse {
  status: number;
  message: string;
  data: SaldoUser; 
}

export const ApiGetSaldo = async (): Promise<TransaksiResponse> => {
  const response = await api.get<TransaksiResponse>("/balance");
  return response.data;
};


