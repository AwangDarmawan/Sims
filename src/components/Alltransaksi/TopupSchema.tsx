import * as yup from "yup";

export const topupSchema = yup.object({
  amount: yup
    .string()
    .required("Nominal wajib diisi")
    .matches(/^\d+$/, "Nominal hanya boleh angka tanpa huruf atau simbol")
    .test("not-zero", "Nominal harus lebih dari 0", (value) => {
      const val = Number(value);
      return val > 0;
    })
    .test("min-value", "Minimal top up Rp 10.000", (value) => {
      const val = Number(value);
      return val >= 10000;
    }),
});

