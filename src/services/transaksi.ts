import api from "./Axios";

export interface SaldoUser {
  balance:number
}

export interface TopUpRequest {
  top_up_amount: number;
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
export const ApiPostTopup = async (data: TopUpRequest): Promise<TransaksiResponse> => {
  const response = await api.post("/topup", data);
  return response.data;
};


