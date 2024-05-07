import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SelectOptions from "../../Ui/SelectOptions";

type status = {
  label: string;
  value: string;
};

type Inputs = {
  id: number;
  package_name: string;
  package_price: string;
  duration: string;
  daily_token: string;
  hashpower: string;
  status: status;
};

export const BizApprovedRejectModal = ({ fetchData, closeModal, updateItem }: any) => {
  console.log(updateItem);

  const options = [
    { value: "0", label: 'rejected' },
    { value: "1", label: 'approved' },
    { value: "2", label: 'pending' },
  ];

  const [formState, setFormState] = useState({ ...updateItem });

  const {
    handleSubmit, control
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const newData = { id: updateItem.id, status: data.status.value }; // Make a copy of the data object

    console.log(newData);

    try {
      const token = localStorage.getItem('biztoken');
      const response = await fetch('https://biztoken.fecotrade.com/api/biztoken-withdraw-request/approve', {
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
        console.log('success');

        fetchData();
        Swal.fire({
          title: "Success",
          text: "Successfully updated withdrow request",
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
          <div className="min-w-full w-[400px] lg:w-[600px] border-b border-stroke py-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-end">

              <strong className="text-xl align-center cursor-pointer "
                onClick={closeModal}
              >&times;</strong>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-5.5 p-6.5">
              <div>
                <SelectOptions
                  control={control}
                  options={options}
                  label='status'
                  name="status"
                  defaultValue={formState.status === "rejected" ? "0" : formState.status === "approved" ? "1" : '2'}
                  // value={'1'}
                  placeholder={'Select...'}
                />
              </div>
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

