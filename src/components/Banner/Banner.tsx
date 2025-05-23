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
        {/* <div
          className="bg-primary categori rounded d-flex align-items-center justify-content-center"
          style={{ height: "100px" }}
        > */}
          {/* Contoh menampilkan image (pakai tag img), kalau hanya text pakai tag lain */}
          <img
            src={item.banner_image}
            alt={item.banner_name}
            className="categori rounded d-flex align-items-center justify-content-center mx-auto"
           
          />
        {/* </div> */}
        {/* <h5 className="mt-2">{item.banner_name}</h5>
        <small>{item.description}</small> */}
      </div>
    ))}
  </div>
</section>
     {/* <section className='container my-4'>
        <span className='fw-bold'>Temukan Promo Menarik</span>
         {banners.map((item: IApiBanner, index: number) => (
        <div className='row'key={index}  >
            <div className='col-lg-3 col-md-4 col-sm-6 bg-primary categori mx-3 my-3 rounded 'style={{ height: '100px' }}>
                <h1>{item.banner_image}</h1>
            </div>
            {/* <div className='col-lg-3 col-md-4 col-sm-6 bg-primary categori mx-3 my-3 rounded' style={{ height: '100px' }}>
            <h1>ww</h1>
            </div> */}
            {/* <div className='col-lg-3 col-md-4 col-sm-6 bg-primary categori mx-3 my-3 rounded' style={{ height: '100px' }}>
            <h1>ww</h1>
            </div>
            <div className='col-lg-3 col-md-4 col-sm-6 bg-primary categori mx-3 my-3 rounded ' style={{ height: '100px' }}>
            <h1>ww</h1>
            </div>
            <div className='col-lg-3 col-md-4 col-sm-6 bg-primary categori mx-3 my-3 rounded' style={{ height: '100px' }}>
            <h1>ww</h1> */}
               {/* ))}
            </div>
            
        </div>
      </section>
       */} 
    </>
  )
}

export default Banner
