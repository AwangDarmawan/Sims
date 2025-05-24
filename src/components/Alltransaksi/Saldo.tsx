import { useEffect, useState } from "react";
// import profilIMG from "../../assets/Profile Photo.png";
import "../../styles/Home.css"
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../utils/hook"; 
import { fetchProfile } from "../../features/profilSlice";
import { fetchSaldo } from "../../features/transaksiSlice";



function Saldo() {
    const [showSaldo, setShowSaldo] = useState(false);

    const dispatch = useAppDispatch();
  const { data:profile ,loading:loadingProfile , error:errorProfile } = useAppSelector((state) => state.profile);

  const { data: saldo, error: errorSaldo } = useAppSelector(
    (state) => state.transaksi
  );



  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchSaldo());
  }, [dispatch]);

    // if (loading) return <p>Loading...</p>;

      if (loadingProfile) return <p>Loading...</p>;
  if (errorProfile) return <p style={{ color: "red" }}>{errorProfile}</p>;
   if (errorSaldo) return <p style={{ color: "red" }}>{errorSaldo}</p>;

  console.log("photo bray",profile?.profile_image)
  return (
    <>
    <section className='container'>
    <div className='container'>
      <div className='row '>
         {profile && (
        <div className='col-lg-6 col-md-6  col-sm-12  my-5'>
          <img 
          src={profile.profile_image } 
          alt="Avatar" className="img-berder" />
          <h4 className=' txt-selamat mt-3'>Selamat Datang,</h4>
          <h1 className='txt-nama fw-bold'> {profile.first_name} {profile.last_name}</h1>
        </div>
  )}
        <div className='col-lg-6 col-md-6  col-sm-12 '>
          <div className='btn-saldo  my-5 rounded-4 ps-4 py-4'>
            <p className='txt-saldo fw-bold'>Saldo anda</p>
            <div className='d-flex'>
            <h4 className='fw-bold text-white'>RP</h4>
            <h4 className='text-white ms-2 my-0'>
                 
                   {showSaldo
                    ? saldo?.balance?.toLocaleString("id-ID")
                    : "••••••••"}
                </h4>
            </div>
            <div className='d-flex mb-5'>
            <span className='text-lihat text-white '>Lihat Saldo</span>
            <i className="icon-show ms-2" onClick={() => setShowSaldo(!showSaldo)}>
                  {showSaldo ? <EyeSlashFill /> : <EyeFill />}
                </i>
                </div>
          </div>
        </div>
      </div>
      </div>
       </section>
    </>
  )
}

export default Saldo
