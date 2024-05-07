import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SelectOptions from "../../Ui/SelectOptions";
import { options } from "../options";


type Inputs = {
  payment_method: string;
  min_withdraw: string;
  max_withdraw: string;
  network: string;
  withdrwal_charge: string;
  status: string;
};

const EditWihtdrawMethod = ({ fetchData, closeModal, updateItem }: any) => {
  console.log(updateItem);

  const [formState, setFormState] = useState({ ...updateItem });




  const {
    register,
    handleSubmit,
    control
  } = useForm<Inputs>();


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };




  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const newData = { ...data };
    console.log(newData);

    return;
    try {


      const token = localStorage.getItem('biztoken');
      const response = await fetch(' ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
        Swal.fire({
          title: "success",
          text: "Successfully updated package",
          icon: "success"
        }).then(() => { closeModal(); });
      }
    } catch (error) {
      Swal.fire({
        title: "error",
        text: "Something wrong",
        icon: "error"
      });
    }
  };


  return (
    <div className="flex justify-center">
      <div
        className="modal-container  fixed z-50 flex  mx-auto top-25 bottom-5"
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === "modal-container") closeModal();
        }}
      >

        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[400px] lg:w-[600px] border-b border-stroke   pb-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-white">Update</h2>
              <strong className="text-xl align-center cursor-pointer "
                onClick={closeModal}
              >&times;</strong>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex  flex-col w-full gap-5.5 p-6.5">
              <div>
                <p>Payment Method</p>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register("payment_method", { required: true })}
                  value={formState.payment_method}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Network</p>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register("network", { required: true })} />
              </div>
              <div>
                <p>Withdrwal charge</p>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register("withdrwal_charge", { required: true })}
                  value={formState.withdrwal_charge}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Min withdraw</p>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register("min_withdraw", { required: true })}
                  value={formState.max_withdraw}
                  onChange={handleChange}
                />
              </div>

              <div>
                <p>max_withdraw</p>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register("max_withdraw", { required: true })}
                  value={formState.max_withdraw}
                  onChange={handleChange}
                />
              </div>


              <SelectOptions
                name="status"
                control={control}
                defaultValue={Number(formState.status)}
                label="status"
                options={options}
                placeholder="status" />

              <button className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default EditWihtdrawMethod;