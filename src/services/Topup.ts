import api from "./Axios";



export const topUpBalance = async (amount: number) => {
    console.log("Mengirim topup:", { amount });
  const response = await api.post("/topup", { top_up_amount: amount });
  return response.data;
};