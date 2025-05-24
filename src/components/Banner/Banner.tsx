import { useAppDispatch, useAppSelector } from "../../utils/hook"; 
import { useEffect } from "react";
import { fetchBanner } from "../../features/bannerSlice";
import { type IApiBanner} from "../../services/Banner"



function Banner() {
  const dispatch = useAppDispatch();

  const { data:banners ,loading:loadingBanner , error:errorBanner } = useAppSelector((state) => state.banner);

   useEffect(() => {
      dispatch(fetchBanner());
    
    }, [dispatch]);

    if (errorBanner) return <p style={{ color: "red" }}>{errorBanner}</p>;
if (loadingBanner) return <p>Loading banner...</p>;
  
  return (
    <>
    <section className="container my-4">
  <span className="fw-bold ">Temukan Promo Menarik</span>
  <div className="row "> {/* g-3 = gutter spacing */}
    {banners.map((item: IApiBanner, index: number) => (
      <div
        className="col-lg-3 col-md-4 col-sm-6 g-2 mt-3"
        key={index}
      >
       
          <img
            src={item.banner_image}
            alt={item.banner_name}
            className="categori rounded d-flex align-items-center justify-content-center mx-auto"
           
          />
        
      </div>
    ))}
  </div>
</section>
    
    </>
  )
}

export default Banner
