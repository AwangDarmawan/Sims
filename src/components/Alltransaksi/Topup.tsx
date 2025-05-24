import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { postTopUp } from "../../features/transaksiSlice";

function Topup() {

  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState("");
  const { loading,error } = useAppSelector((state) => state.transaksi);

    const handlePresetClick = (value: number) => {
    setAmount(value.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value); 
  };

  const handleTopUp = () => {
    const topUpAmount = Number(amount);
    if (!topUpAmount || topUpAmount <= 0) {
      alert("Masukkan nominal top up yang valid!");
      return;
    }

    // dispatch async thunk postTopup dengan payload
    dispatch(postTopUp({ top_up_amount: topUpAmount }));
  };
  return (
    <>
       <div className='container'>
    <span >Silakan masukan</span>
    <h4 className='fw-bold'>Nominal Top Up</h4>
      <div className="row my-3 ">
        <div className='col-lg-5 col-md-5 col-10 d-flex flex-column '>
             
            <input className='border-2 my-2 ' 
            type="text"
            placeholder="Masukan nominal TopUp"
            style={{ height: "40px", width: "100%"}}
              value={amount}
            onChange={handleInputChange}
            />

            <button 
             className='border-0 fw-bold text-white mb-3 '
             style={{ background: "#f75539",
             height: "40px", width: "100%"}}
             onClick={handleTopUp}
             disabled={loading}
            > {loading ? "Memproses..." : "Top Up"}</button>
 {error && <small className="text-danger">{error}</small>}
        </div>

        <div className="col-lg-5 col-md-4 col-10">
          {[10000, 20000, 30000, 100000, 250000, 500000].map((val) => (
            <button
              key={val}
              className="border-2 text-center fw-bold mx-2 my-2"
              style={{ height: "50px", width: "30%" }}
              onClick={() => handlePresetClick(val)}
            >
              Rp.{val.toLocaleString()}
            </button>
          ))}
        </div>
      </div>
    </div>
        {/* </div>

        <div className='col-lg-5 col-md-4 col-10  ' >
        <button
            className='border-2    text-center fw-2  mx-3 my-2' 
            style={{ height: "50px", width:"20%" , }}  
            >Rp.10.000 </button>
             
            <button 
            className='border-2   text-center fw-2   mx-3 my-2' 
            style={{ height: "50px", width:"20%"  }}  
            >Rp.20.000</button>

             <button
            className='border-2  text-center fw-2  mx-3 my-2' 
            style={{ height: "50px", width:"20%"  }}  
            >Rp.30.000</button>

            <button 
            className='border-2  text-center fw-2  mx-3 my-2' 
            style={{ height: "50px", width:"20%"  }}  
            >Rp.100.000</button>


             <button
            className='border-2  text-center fw-2   mx-3 my-2' 
            style={{ height: "50px", width:"20%"  }}  
          
            > Rp.250.000 </button>

            <button
            className='border-2  text-center fw-2 mx-3 my-2' 
            style={{ height: "50px", width:"20%"  }}  
            >Rp.500.000</button>

        </div>
      </div>
      </div> */}
    </>
  )
}

export default Topup