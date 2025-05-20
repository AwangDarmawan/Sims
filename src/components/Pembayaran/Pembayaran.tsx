
import  game from "../../assets/Game.png";
function Pembayaran() {
  return (
    <>
      <div className='container'>
        <h5>Pembayaran</h5>
       dd
        <div className='d-flex'>
          <img src={game} alt="" style={{ height: "50px", width: "50px" }} />
          <h4 className='fw-bold py-2 ms-3'>cc</h4>
        </div>
        <div className="my-5">
          <input
            className='border-2 border-secondary-subtle'
            type="text"
            placeholder="Masukan nominal TopUp"
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
