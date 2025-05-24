
export const formatRupiah = (angka: string | number): string => {
  if (angka === "" || angka === null || angka === undefined) return "";
  const number = typeof angka === "string" ? parseInt(angka) : angka;
  if (isNaN(number)) return "";
  return "Rp " + number.toLocaleString("id-ID");
};

export const parseRupiah = (value: string): number => {
  return parseInt(value.replace(/\D/g, ""), 10) || 0;
};

