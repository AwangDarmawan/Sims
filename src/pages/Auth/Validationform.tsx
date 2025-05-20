// import * as yup from 'yup';

// export const Validastionform = yup.object().shape({
//   email: yup.string().email('Format email tidak valid').required('Email wajib diisi'),
//   first_name: yup.string().required('Nama depan wajib diisi'),
//   last_name: yup.string().required('Nama belakang wajib diisi'),
//   password: yup.string().min(8, 'Password minimal 8 karakter').required('Password wajib diisi'),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref('password')], 'Konfirmasi password tidak cocok')
//     .required('Konfirmasi password wajib diisi'),
// });
// src/validations/registerSchema.ts
import * as yup from 'yup';

export const validationSchema = yup.object({
  email: yup.string()
    .email('Email tidak valid')
    .required('Email wajib diisi'),

  first_name: yup.string()
    .required('Nama depan wajib diisi'),

  last_name: yup.string()
    .required('Nama belakang wajib diisi'),

  password: yup
    .mixed<string | number>()
    .required('Password wajib diisi')
    .test('is-string-or-number', 'Password harus berupa string atau angka', (value) => {
      return typeof value === 'string' || typeof value === 'number';
    })
    .test('min-8-chars', 'Password minimal 8 karakter', (value) => {
      if (typeof value === 'string' || typeof value === 'number') {
        return value.toString().length >= 8;
      }
      return false;
    }),

  confirmPassword: yup
    .mixed<string | number>()
    .required('Konfirmasi password wajib diisi')
    .oneOf([yup.ref('password')], 'Konfirmasi password tidak cocok'),
});
