import { ImageAlt } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Img from "../../assets/Profile Photo.png"
import "../../styles/Profil.css"

function Profil() {
    
  return (
    <>
        <div className="header-border mt-5">
        <div className="berder" >
           <img src={Img} alt="Profile" className="img-berder " />
        </div>
        
        
        <label htmlFor="upload-input" className="btn-img">
          <ImageAlt className="icon-img" />
        </label>
       
        <input
          type="file"
          id="upload-input"
          className="visually-hidden"
       
        />
      </div>

      <div className="input-profile">
        <form className="mt-2 ">
          <label className="text-label">Email</label>
          <input type="email" 
           className="form-control fw-bold"
           placeholder="John Doe@gmail.com" 
         
           readOnly
            />
        

        
          <label className="text-label">Nama Depan</label>
          <input
          name="first_name"
            type="text"
            className="form-control "
            placeholder="nama depan"
            
          />
       
        
          <label className="text-label">Nama Belakang</label>
          <input
          name="last_name"
            type="text"
            className="form-control "
            placeholder="nama belakang"
           
          />
        </form>
        <Link to={"/"}><button className="btn-Logout mt-4">Logout</button></Link>
        <button className="btn-profile mt-4">Simpan</button>
      </div>
      
    </>
  )
}

export default Profil
