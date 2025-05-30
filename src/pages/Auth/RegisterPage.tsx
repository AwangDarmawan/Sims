
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
import { ApiRegister, type IRegisterForm } from "../../services/Auth";
import { registerSchema } from "./validation-form"
import { yupResolver } from '@hookform/resolvers/yup';

import { handleAxiosError } from '../../utils/errorhandle';


function RegisterPage() {
 
     const [showPassword, setShowPassword] = useState(false);
      const [ConfshowPassword, setShowConfPassword] = useState(false);
      const navigate = useNavigate();

     const {
       register, 
       handleSubmit, 
       formState: { errors, isSubmitting} } = 
     
      useForm<IRegisterForm>({ 
        mode: 'onBlur',
         resolver: yupResolver( registerSchema ),
        });

    

  const onSubmit = async (data: IRegisterForm) => {
    try {
      const response = await ApiRegister(data);
      console.log(response.data.message)
      toast.success( response.data.message ||'Register berhasil!');
      navigate('/'); 
    } catch (error) {
      handleAxiosError(error);
    }
      };
 



  return (
    <>
      <div className="auth-section">
        <div className="row auth-wrapper">
          <div className=" col-md-7 d-flex justify-content-center align-items-center">
            <div className="auth-form-wrapper">
            <div className="d-flex justify-content-center align-items-center my-1 gap-2">
                    <img src={logo} alt="logo" />
                    <h3 className="txt-sims">SIMSS PPBO</h3>
                 </div>
              <h3 className="txtmasuk font-bold text-center ">Lengkapi Data Untuk<br/>
                 Membuat Akun </h3>
                 
              <form onSubmit={handleSubmit(onSubmit)} className="fm my-2 ">
                 
                  <div className="input-form-user border  ps-3">
                    <FontAwesomeIcon icon={faUser} />
                    <input
                      type="email"
                      
                      className="form-control-login py-2"
                      placeholder="masukan email anda"
                     
                      {...register('email')}
                    />
                  </div>
                      <p className='text-danger'>{errors.email?.message}</p>


                  <div className="input-form-user border ps-3 ">
                    <FontAwesomeIcon icon={faUser} />
                    <input
                      type="text"
                     
                      className="form-control-login py-2"
                      placeholder="Nama Depan"
                     
                      {...register('first_name')} 
                    />
                  </div>
                   <p className='text-danger '>{errors.first_name?.message}</p>


                  <div className="input-form-user border ps-3 ">
                    <FontAwesomeIcon icon={faUser} />
                    <input
                      type="text"
                      className="form-control-login py-2"
                      placeholder="nama belakang"
                     
                      {...register('last_name')} 
                    />
                     
                  </div>
                   <p className='text-danger '>{errors.last_name?.message}</p>


                  <div className="input-form-user  border ps-3 ">
                  <img  src={key} alt="key" className ="key" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control-login py-2"
                      placeholder="buat password"
                
                   autoComplete="off" 
                  {...register('password')}
                     
                    />
                    <i className="icon-show" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeSlashFill/> : <EyeFill/>}</i>
                  </div>
                       <p className='text-danger '>{errors.password?.message}</p>


                  <div className="input-form-user  border  ps-3">
                  <img  src={key} alt="key" className ="key" />
                    <input
                      type={ConfshowPassword ? "text" : "password"}
                      placeholder="Konfirmasi password"
                      className="form-control-login py-2"
                  autoComplete="off" 
                  {...register('confirmPassword')}
                    />
                    <i className="icon-show" onClick={() => setShowConfPassword(!ConfshowPassword)}>{ConfshowPassword ? <EyeSlashFill/> : <EyeFill/>}</i>
                  </div>
                  <p className='text-danger fs-7'>{errors.confirmPassword?.message}</p>



                <div className="d-grid  mt-2">
                  <button
                   type="submit"  disabled={isSubmitting}
                   className={`btn btn-masuk rounded ${isSubmitting ? 'btn-danger disabled' : 'btn-danger'}`}
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
