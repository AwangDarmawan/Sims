import api from "./Axios";

export interface SaldoUser {
  balance:number
}

export interface SaldoResponse {
  status: number;
  message: string;
  data: SaldoUser; 
}

export const ApiGetSaldo = async (): Promise<SaldoResponse> => {
  const response = await api.get<SaldoResponse>("/balance");
  return response.data;
};
