import { useEffect, useState } from "react";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import "../../styles/Auth.css";
import { Link, useNavigate} from 'react-router-dom';
import logo from '../../assets/Logo.png';
import Ilus from '../../assets/Illustrasi Login.png';
import key from '../../assets/key.png';
import type { ILoginForm } from '../../services/Auth';
import { loginSchema } from "./validation-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch} from "../../features/store";
import type { SubmitHandler } from "react-hook-form";
import { loginUser } from "../../features/loginSlice";

const LoginPage: React.FC = () => {

 const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state: RootState) => state.auth);
const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
  });

  
  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
  dispatch(loginUser(data));
};

  useEffect(() => {
    if (token) {
      navigate("/beranda"); 
    }
  }, [token, navigate]);
    
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
              <h3 className="txtmasuk font-bold text-center ">Masuk atau buat akun <br/>
                 untuk memulai</h3>
                 
              <form onSubmit={handleSubmit(onSubmit)} className="fm my-5">
                  <div className="input-form-user border my-4 gap-2 ps-3">
                  {/* <i className="bi bi-at ps-3"></i> */}
                    <FontAwesomeIcon icon={faUser} />
                    <input
                      type="email"
                      className="form-control-login py-2"
                      placeholder="masukan email anda"
                      {...register('email')}
                    />
                  </div>
                  <p className='text-danger'>{errors.email?.message}</p>


                  <div className="input-form-user  border d-flex gap-3  ps-3 ">
                  <img  src={key} alt="key" className ="key " />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control-login py-2"
                      placeholder="masukan password anda"
                      autoComplete="off" 
                       {...register('password')} 
                    />
                    <i className="icon-show" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeSlashFill/> : <EyeFill/>}</i>
                  </div>
                  <p className='text-danger '>{errors.password?.message}</p>
                  
                <div className="d-grid mb-5 mt-4"> 
{/*                   
                  <Link to={"/home"} className="btn btn-masuk " type="submit">
                  Masuk
                  </Link> */}
                  <button type="submit" className="btn btn-masuk" disabled={loading}>
                    {loading ? <>
                        <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                        Loading...
                      </> 
                      : "Login"}
                  </button>
                  
                </div>
                 
                {error && <p style={{ color: "red" }}>{error}</p>}
              </form>
              <span className="txt-belum d-flex justify-content-center">belum punya akun? registrasi <Link className="link" to="/register">disini</Link></span>
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

export default LoginPage
