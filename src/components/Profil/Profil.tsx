import { ImageAlt } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
// import Img from "../../assets/Profile Photo.png"
import "../../styles/Profil.css"
import { logout } from "../../features/loginSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hook"; 
import { useEffect, useState, type ChangeEvent } from "react";
import { fetchProfile, updateName , uploadProfileImage} from "../../features/profilSlice";
import { useForm } from "react-hook-form";
import { profilShema } from "./profilSchema";
import { yupResolver } from '@hookform/resolvers/yup';

interface FormValues {
  first_name: string;
  last_name: string;
 
}


function Profil() {
  const { data:profile ,loading:loadingProfile , error:errorProfile } = useAppSelector((state) => state.profile);
 const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors} } = useForm<FormValues>({
  resolver: yupResolver(profilShema),
  mode: "onTouched" 
});
 const [isEditMode, setIsEditMode] = useState(false);

  

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); 
  };

 useEffect(() => {
    dispatch(fetchProfile());
  
  }, [dispatch]);

   useEffect(() => {
    if (profile) {
      reset({
        first_name: profile.first_name,
        last_name: profile.last_name,
      });
      
    }
  }, [profile, reset]);

    const onSubmit = (data: FormValues) => {
    dispatch(updateName(data)).then(() => {
      setIsEditMode(false); 
    });
  };

 

  const handleEditToggle = () => {
    setIsEditMode((prev) => !prev);
    if (profile && !isEditMode) {
      reset({
        first_name: profile.first_name,
        last_name: profile.last_name,
      });
    }
  };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(uploadProfileImage(file));
    }
  };

   

  

  

   if (errorProfile) return <p style={{ color: "red" }}>{errorProfile}</p>;
 

    console.log("poto semua ",profile)
  return (
    <>
     {loadingProfile && <p>Memuat...</p>}

      
      {!loadingProfile && profile && (
      <>
        <div className="header-border mt-5">
        
        <div className="berder border" >
          <img 
          src={profile.profile_image}
          alt="Profile" className="img-berder " />
        </div>
        
        
        <label htmlFor="upload-input" className="btn-img"  >
        
          <ImageAlt className="icon-img"  />  
      
        </label>
       
        <input
          type="file"
          id="upload-input"
          className="visually-hidden"
          accept="image/*"
      
           onChange={handleImageUpload}
            
        />
        
      </div>
      


      <div className="input-profile">
        <form className="mt-2 " onSubmit={handleSubmit(onSubmit)} >
          <label className="text-label">Email</label>
          <input type="email" 
           className="form-control fw-bold"
           placeholder="John Doe@gmail.com" 
           value={profile?.email}
           disabled
           readOnly
            />
        

        
          <label className="text-label">Nama Depan</label>
          <input
          
            type="text"
            className="form-control fw-bold "
            placeholder="nama depan"
           
            {...register("first_name")}
            disabled={!isEditMode}
          />
         <p className='text-danger '>{errors.first_name?.message}</p>
        
          <label className="text-label">Nama Belakang</label>
          <input
      
            type="text"
            className="form-control fw-bold "
            placeholder="nama belakang"
         
            {...register("last_name")}
            disabled={!isEditMode}
          />
  <p className='text-danger '>{errors.last_name?.message}</p>
       
       
        
          {!isEditMode ? (
            <button
              type="button"
              className="btn-Profile mt-4"
              onClick={handleEditToggle}
            >
              Edit
            </button>
            
          ) : (
           
            <div className="d-flex flex-column">
              <button type="submit" className="btn-Logout mt-4 ">
                Simpan
              </button>
            
              <button
                type="button"
                className="btn-Profile mt-4 "
                onClick={handleEditToggle}
              >
                Batal
              </button>
           </div>
            
          )}
           </form>
          <button onClick={handleLogout} className="btn-Logout mt-4">Logout</button>
      </div>
      </>
        )}
    </>
  )
}

export default Profil
