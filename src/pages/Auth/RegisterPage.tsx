
import { toast } from 'react-toastify'
import { EyeFill, EyeSlashFill} from "react-bootstrap-icons";
import "../../styles/Auth.css";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import Ilus from '../../assets/Illustrasi Login.png'
import key from '../../assets/key.png';
import { useState } from "react";
import { faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { registerUser, type IRegisterForm } from "../../services/Auth";
import { validationSchema } from "./Validationform"
import { yupResolver } from '@hookform/resolvers/yup';




function RegisterPage() {
 
     const [showPassword, setShowPassword] = useState(false);
      const navigate = useNavigate();

     const {
       register, 
       handleSubmit, 
      //  watch,
       formState: { errors, isSubmitting} } = 
     
      useForm<IRegisterForm>({ 
        mode: 'onBlur',
         resolver: yupResolver( validationSchema ),
        });

      // const passwordValue = watch('password', '');

  const onSubmit = async (data: IRegisterForm) => {
    try {
      
      //  const { confirmPassword, ...payload } = data;
      //  console.log('Data siap dikirim kontolpasswrodss:', payload);
      const response = await registerUser(data);
      console.log(response.data.message)
      toast.success( response.data.message ||'Register berhasil!');
      navigate('/'); 
    } 
    catch (error: any) {
      
       toast.error(error.response?.data?.message|| 'An error occurred');
      //  throw error;
    }
    
   

  };



  return (
    <>
      <div className="auth-section">
        <div className="row auth-wrapper">
          <div className=" col-md-7 d-flex justify-content-center align-items-center">
            <div className="auth-form-wrapper">
            <div className="d-flex justify-content-center align-items-center my-3 gap-2">
                    <img src={logo} alt="logo" />
                    <h3 className="txt-sims">SIMSS PPBO</h3>
                 </div>
              <h3 className="txtmasuk font-bold text-center ">Lengkapi Data Untuk<br/>
                 Membuat Akun </h3>
                 
              <form   onSubmit={handleSubmit(onSubmit)} className="fm my-5 ">
                  <div className="input-form-user border my-4 gap-2 ps-3">
                  <FontAwesomeIcon icon={faUser} />
                    <input
                      type="email"
                      
                      className="form-control-login py-2"
                      placeholder="masukan email anda"
                      // {...register('email', {
                      //   required: 'Email Required',
                      //   pattern: {
                      //     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      //     message: 'Invalid Email',
                      //   },
                      // })}
                      {...register('email')}
                    />
                    
                  </div>
                   {/* {errors.email && <p className="text-danger fs-7">{errors.email.message}</p>} */}
                      <p className='text-danger fs-7'>{errors.email?.message}</p>
                  <div className="input-form-user border my-4 gap-2 ps-3">
                    <FontAwesomeIcon icon={faUser} />
                    <input
                      type="text"
                     
                      className="form-control-login py-2"
                      placeholder="Nama Depan"
                      // {...register('first_name', { required: 'Nama depan wajib diisi' })}
                      {...register('first_name')} 
                    />
                    
                  </div>
                  {/* {errors.first_name && <p className="text-danger fs-7">{errors.first_name.message}</p>} */}
                   <p className='text-danger fs-7'>{errors.first_name?.message}</p>

                  <div className="input-form-user border my-4 gap-2 ps-3">
                 <FontAwesomeIcon icon={faUser} />
                    <input
                      type="text"
                      className="form-control-login py-2"
                      placeholder="nama belakang"
                      // {...register('last_name', { required: 'Nama belakang wajib diisi' })}
                      {...register('last_name')} 
                    />
                     
                  </div>
                  {/* {errors.last_name && <p className="text-danger fs-7">{errors.last_name.message}</p>} */}
                   <p className='text-danger fs-7'>{errors.last_name?.message}</p>


                  <div className="input-form-user  border gap-2 ps-3">
                  <img  src={key} alt="key" className ="key" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control-login py-2"
                      placeholder="buat password"
                  //     {...register('password', {
                  //   required: 'Password wajib diisi',
                  //   minLength: {
                  //     value: 8,
                  //     message: 'Password minimal 8 karakter',
                  //   },
                  // })}
                   autoComplete="off" 
                  {...register('password')}
                     
                    />
                    <i className="icon-show" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeSlashFill/> : <EyeFill/>}</i>
                  </div>
                      {/* {errors.password && <p className="text-danger fs-7">{errors.password.message}</p>} */}
                       <p className='text-danger fs-7'>{errors.password?.message}</p>

                  <div className="input-form-user  border gap-2 my-4 ps-3">
                  <img  src={key} alt="key" className ="key" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Konfirmasi password"
                      className="form-control-login py-2"
                  //    {...register('confirmPassword', {
                  //   required: 'Konfirmasi password wajib diisi',
                  //   validate: value =>
                  //     value === passwordValue || 'Password konfirmasi tidak sama',
                  // })}
                  autoComplete="off" 
                  {...register('confirmPassword')}
                    />
                    <i className="icon-show" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeSlashFill/> : <EyeFill/>}</i>
                  </div>
                 {/* {errors.confirmPassword && <p className="text-danger fs-7">{errors.confirmPassword.message}</p>} */}
                  <p className='text-danger fs-7'>{errors.confirmPassword?.message}</p>

                <div className="d-grid mb-5 mt-4">
                  <button
                   type="submit"  disabled={isSubmitting}
                   className={`btn w-100 rounded ${isSubmitting ? 'btn-primary disabled' : 'btn-primary'}`}
                   >
                    {isSubmitting ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                        Loading...
                      </>
                    ) : (
                      'Register'
                    )}
                  </button>
                </div>
                
              </form>
              <span className="txt-belum d-flex justify-content-center">Sudah punya akun? Login <Link to="/" className="link">disini</Link></span>
            </div>
          </div>
          <div className="col-md-5 account-block">
            <img src={Ilus} alt="" className="Ilus" />
            
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage;
