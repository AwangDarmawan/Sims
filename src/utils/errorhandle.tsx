import { AxiosError } from "axios";
import { toast } from "react-toastify";

export function handleAxiosError(error: unknown): string {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || "Terjadi kesalahan dari server";
    toast.error(message);
    return message;
  }

  if (error instanceof Error) {
    toast.error(error.message);
    return error.message;
  }

  toast.error("Terjadi kesalahan tidak diketahui");
  return "Unknown error";
}
