

import { useAppDispatch, useAppSelector } from "../../utils/hook"; 
import { useEffect, } from "react";

import { type IApiPpob } from "../../services/Ppob"
import { fetchPpob } from "../../features/ppobSlice";
import { Link } from "react-router-dom";

function Ppob() {
  const dispatch = useAppDispatch();
  
    const { data:Ppobs ,loading:loadingPpob , error:errorPpob } = useAppSelector((state) => state.ppob);
  
     useEffect(() => {
        dispatch(fetchPpob());
      
      }, [dispatch]);
  
      if (errorPpob) return <p style={{ color: "red" }}>{errorPpob}</p>;
  if (loadingPpob) return <p>Loading banner...</p>;
  return (
    <>
       <section className='container'>
        <div className='row item-center'>
          {Ppobs.map((item: IApiPpob , index: number) => (
        <div className='col-lg-1 col-md-2 col-sm-4  text-center' key={index}>
          <Link  to={`/pembayaran/${item.service_name}`} 
             state={{ icon: item.service_icon, name: item.service_name , 
            //  tarif: item.service_tariff 
             tarif: item.service_tariff
             }}>
            <img src={item.service_icon} alt="" />
            
            </Link>
            {/* <p>{item.service_code}</p> */}
            <p className="font-bold" style={{ fontSize: "0.6rem", fontWeight:"semi-bold" }}>{item.service_code}</p>
            {/* <p>{item.service_tariff}</p> */}
            
            </div>
            

             ))}
        </div>
        
    </section>
    </>
  )
}

export default Ppob
