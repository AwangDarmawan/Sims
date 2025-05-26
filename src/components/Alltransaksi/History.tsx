import { useEffect, useState } from "react";
import { ApiGetHistory, type TransactionData } from "../../services/transaksi";
import { formatDate } from "../../utils/formatDate";

// import "../Style/CardHistori.css"

function History() {
   const [data, setData] = useState<TransactionData[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  const loadData = async (offsetValue: number) => {
    try {
      setLoading(true);
      const result = await ApiGetHistory(offsetValue, limit);
      
      // Jika offset 0, reset data (ini untuk back ke awal)
      if (offsetValue === 0) {
        setData(result.data.records);
      } else {
        // Gabungkan data baru (pastikan tidak duplikat)
        setData((prev) => [...prev, ...result.data.records]);
      }

      // Jika jumlah data diterima kurang dari limit berarti tidak ada data lagi
      setHasMore(result.data.records.length === limit);
    } catch (error) {
      console.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    loadData(offset);
  }, [offset]);

 
  const handleShowMore = () => {
    if (loading || !hasMore) return;
    setOffset((prev) => prev + limit);
  };

  
  const handleShowBack = () => {
    if (loading || offset === 0) return;
    setOffset((prev) => Math.max(prev - limit, 0));
   
  };

   

  return (
    <>
       <div className='container'>
        <h5 className='fw-bold'>Semua Transaksi</h5>
       
        <div>
          {data.map((item, index) => (
        <div className=" my-2 txt-Rp border px-5  d-flex justify-content-between  rounded-1" key={index}>
          
        <div className='  d-flex flex-column' >
           <h3 className={`my-0 ${item.transaction_type === 'TOPUP' ? 'text-success' : 'text-danger'}`}>
                  {item.transaction_type === 'TOPUP' ? `+Rp.${item.total_amount} ` : `-Rp.${item.total_amount} `}
                </h3>
          <span className='text-secondary fw-semibold small'>{formatDate(item.created_on)}</span>
                
          </div>
          <span className='text-black font-bold  txt-tgl'
          
             >{item.transaction_type}</span>
        </div>
        ))}
        </div>

       <div className="d-flex justify-content-center mt-3  gap-2">

       <button className="bg-transaparant text-danger fw-bold"
         onClick={handleShowBack} disabled={loading || offset === 0}>
          {loading && offset !== 0 ? "Loading..." : "Back"}
        </button>

            <button className="border text-danger fw-bold" onClick={handleShowMore} disabled={loading || !hasMore}>
          {loading && hasMore ? "Loading..." : "Show More"}
        </button>
       </div>
      </div>
    </>
  )
}

export default History
