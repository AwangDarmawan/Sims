import { useState } from "react";

import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import "../../styles/Auth.css";
import { Link} from 'react-router-dom';
import logo from '../../assets/Logo.png';
import Ilus from '../../assets/Illustrasi Login.png'
import key from '../../assets/key.png'
function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
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
                 
              <form  className="fm my-5 ">
                  <div className="input-form-user border my-4 gap-2">
                  <i className="bi bi-at ps-3"></i>
                    <input
                      type="email"
                      className="form-control-login py-2"
                      placeholder="masukan email anda"
                    />
                  </div>
                  <div className="input-form-user  border d-flex gap-3  ps-3 ">
                  <img  src={key} alt="key" className ="key " />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control-login py-2"
                      placeholder="masukan password anda"
                    />
                    <i className="icon-show" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeSlashFill/> : <EyeFill/>}</i>
                  </div>
                  
                <div className="d-grid mb-5 mt-4"> 
                  
                  <Link to={"/home"} className="btn btn-masuk " type="submit">
                  Masuk
                  </Link>
                  
                </div>
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
