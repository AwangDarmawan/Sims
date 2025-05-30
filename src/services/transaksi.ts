import api from "./Axios";

export interface SaldoUser {
  balance:number
}

export interface TopUpRequest {
  top_up_amount: number;
}


// =========================
// PEMBAYARAN
// =========================
export interface PembayaranRequest {
  service_code: string;
}

export interface PembayaranResponse {
  invoice_number: string;
  service_code: string;
  service_name: string;
  transaction_type: string;
  total_amount: number;
  created_on: string;
}



export interface TransaksiResponse <T>{
  status: number;
  message: string;
    data: T;
}

export interface TransactionData {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}

export interface HistoryList {
  offset: number;
  limit: number;
  records: TransactionData[];
}


export const ApiGetSaldo = async (): Promise<TransaksiResponse<SaldoUser>> => {
  const response = await api.get<TransaksiResponse<SaldoUser>>("/balance");
  return response.data;
};
export const ApiPostTopup = async (data: TopUpRequest): Promise<TransaksiResponse<SaldoUser>> => {
  const response = await api.post("/topup", data);
  return response.data;
};

export const ApiPostPembayaran = async (
  data: PembayaranRequest
): Promise<TransaksiResponse<PembayaranResponse>> => {
  const response = await api.post<TransaksiResponse<PembayaranResponse>>("/transaction", data);
  return response.data;
};

export const ApiGetHistory = async (
  offset: number,
  limit: number
): Promise<TransaksiResponse<HistoryList>> => {
  const response = await api.get<TransaksiResponse<HistoryList>>(
    `/transaction/history?offset=${offset}&limit=${limit}`
  );
  return response.data;
};
