// import "../Style/CardHistori.css"
function History() {
  return (
    <>
       <div className='container'>
        <h5 className='fw-bold'>Semua Transaksi</h5>
       
        <div>
        <div className="my-1 txt-Rp border px-5 pt-3 d-flex justify-content-between  rounded-1" >
        <div className='flex-column'>
         
            <span className='text-secondary txt-tgl ms-2'>item.created_on</span>
                
          </div>
          <span className='text-black font-bold  txt-tgl '>item.transaction_type</span>
        </div>
       
        </div>
       
            
      </div>
    </>
  )
}

export default History
