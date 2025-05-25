
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { postTopUp } from "../../features/transaksiSlice";

import { topupSchema } from "./topupSchema";
import { formatRupiah, parseRupiah } from "../../utils/rupiah";

type FormData = {
  amount: string;
};

function Topup() {
  const dispatch = useAppDispatch();
  const { loading} = useAppSelector((state) => state.transaksi);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(topupSchema),
    defaultValues: {
      amount: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const nominal = parseRupiah(data.amount);
    dispatch(postTopUp({ top_up_amount: nominal }));
    setValue("amount", ""); 
  };

  const presetValues = [10000, 20000, 50000, 100000, 250000, 500000];

  return (
    <div className="container">
      <span>Silakan masukan</span>
      <h4 className="fw-bold">Nominal Top Up</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row my-3">
          <div className="col-lg-5 col-md-5 col-10 d-flex flex-column ">
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Masukan nominal TopUp"
                  className="border-2 my-2"
                  style={{ height: "40px", width: "100%" }}
                  value={formatRupiah(field.value)}
                  onChange={(e) => {
                    
                    const rawValue = e.target.value.replace(/\D/g, "");
                    field.onChange(rawValue);
                  }}
                />
              )}
            />
            {errors.amount && (
              <small className="text-danger">{errors.amount.message}</small>
            )}

            <button
              type="submit"
              className="border-0 fw-bold text-white mb-3"
              style={{ background: "#f75539", height: "40px", width: "100%" }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Top Up"}
            </button>
            {/* {error && <small className="text-danger">{error}</small>} */}
          </div>

          <div className="col-lg-5 col-md-4 col-10">
            {presetValues.map((val) => (
              <button
                key={val}
                type="button"
                className="border-2 text-center fw-bold mx-2 my-2"
                style={{ height: "50px", width: "30%" }}
                onClick={() => setValue("amount", val.toString())}
              >
                {formatRupiah(val)}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Topup;

