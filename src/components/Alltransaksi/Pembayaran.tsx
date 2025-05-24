
// import  game from "../../assets/Game.png";
import { useLocation, useParams } from "react-router-dom";
function Pembayaran() {
  const { service_name } = useParams<{ service_name: string }>();
  const location = useLocation();
  const state = location.state as { icon?: string; name?: string; tarif?:number };
  return (
    <>
      <div className='container'>
        <h5>Pembayaran</h5>
        <div className='d-flex'>
          <img src={state?.icon} alt="" style={{ height: "50px", width: "50px" }} />
          <h4 className='fw-bold py-2 ms-3'>{service_name}</h4>
           
        </div>
        <h4 className='fw-bold '>{state?.tarif}</h4>
        <div className="my-5">
          <input
            className='border-2 border-secondary-subtle'
            type="text"
            placeholder="Masukan nominal Pembayaran"
            style={{ height: "50px", width: "100%" }}
            
          />
          <button
           
            className='my-4 border-0 fw-bold text-white'
            style={{ background: "#f75539", height: "50px", width: "100%" }}
          >
            Top Up
          </button>
        </div>
      </div>
    </>
  )
}

export default Pembayaran
