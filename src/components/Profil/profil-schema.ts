import * as yup from 'yup';

export const profilShema = yup.object({
  first_name: yup.string()
    .required('Nama depan wajib diisi'),

  last_name: yup.string()
    .required('Nama belakang wajib diisi'),

  
});

