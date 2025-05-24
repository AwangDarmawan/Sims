
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { fetchTopUp } from "../../features/topupSlice";


function Topup() {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<number | "">("");
  const {  status, } = useAppSelector((state) => state.topup);

  const handleTopUp = () => {
    if (typeof amount === "number" && amount > 0) {
      dispatch(fetchTopUp(amount));
    }
  };

  return (
    <div className="container">
      <span>Silakan masukan</span>
      <h4 className="fw-bold">Nominal Top Up</h4>
      <div className="row my-5">
        <div className="col-lg-7 col-md-7 col-12 me-1">
          <input
            type="number"
            placeholder="Masukan nominal TopUp"
            className="border-2 border-secondary-subtle"
            style={{ height: "50px", width: "100%" }}
            value={amount}
            onChange={(e) => {
              const val = e.target.value;
              setAmount(val === "" ? "" : parseInt(val));
            }}
          />
          <button
            onClick={handleTopUp}
            disabled={status === "loading"}
            className="my-4 border-0 fw-bold text-white"
            style={{ background: "#f75539", height: "50px", width: "100%" }}
          >
            {status === "loading" ? "Loading..." : "Top Up"}
          </button>
        </div>

        {/* {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>} */}
        {/* <p>Saldo Saat Ini: Rp {balance.toLocaleString()}</p> */}

        <div className="col-lg-4 col-md-4 col-12">
          {["10000", "20000", "30000", "100000", "250000", "500000"].map((nominal) => (
            <input
              key={nominal}
              className="border-2 border-secondary-subtle text-center my-2 me-3"
              type="text"
              placeholder={`Rp.${parseInt(nominal).toLocaleString()}`}
              style={{ height: "50px", width: "150px" }}
              readOnly
              onClick={() => setAmount(Number(nominal))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Topup;
