
// import  game from "../../assets/Game.png"

import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { postPembayaran } from "../../features/transaksiSlice";
import { formatRupiah } from "../../utils/rupiah";

function Pembayaran() {
  const dispatch = useAppDispatch();
  const { service_code } = useParams<{ service_code: string }>();
  const location = useLocation();
  const state = location.state as { icon?: string; name?: string; tarif?:number };
  const { loading} = useAppSelector((state) => state.transaksi);
  

   const handlePembayaran = () => {
    if (service_code) {
      dispatch(postPembayaran({ service_code }));
      
    }
  };

  

console.log("State di Pembayaran:d", state);
  return (
    <>
      <div className='container'>
        <h5>Pembayaran</h5>
        <div className='d-flex'>
          <img src={state?.icon} alt="" style={{ height: "50px", width: "50px" }} />
          <h4 className='fw-bold py-2 ms-3'>{service_code}</h4>
           
        </div>
        {/* <h4 className='fw-bold '>{state?.tarif}</h4> */}
        <div className="my-5 fs-4 ">
          <input
            className='border-2 fw-bold py-2 px-3'
            type="text"
            style={{ height: "50px", width: "100%" }}
            
            value={formatRupiah(state?.tarif ?? 0)}
            readOnly
          />
          <button
           
            className='my-4 border-0 fw-bold text-white'
            style={{ background: "#f75539", height: "50px", width: "100%" }}
           onClick={handlePembayaran}
          disabled={loading}
        >
            {loading ? "Loading" : "Bayar"}
          </button>
          {/* {error && <div className="alert alert-danger">{error}</div>} */}
        </div>
      </div>
    </>
  )
}

export default Pembayaran
