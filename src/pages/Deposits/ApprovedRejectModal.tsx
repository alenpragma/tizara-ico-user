import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SelectOptions from '../../Ui/SelectOptions';
import { userToken } from '../../hooks/getTokenFromstorage';
import { PuffLoader } from 'react-spinners';

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

export const ApprovedRejectModal = ({
  fetchData,
  closeModal,
  updateItem,
}: any) => {
  const [lodaing, setLoading] = useState(false);

  const options = [
    { value: '0', label: 'Rejected' },
    { value: '1', label: 'Approved' },
    { value: '2', label: 'Pending' },
  ];

  const [formState, setFormState] = useState({ ...updateItem });

  const { register, handleSubmit, control } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    if (data.status.value == '2') {
      return Swal.fire({
        title: 'Message',
        text: 'This deposit request already pending',
        icon: 'info',
      });
    }

    const newData = { id: updateItem.id, status: data.status.value };
    try {
      setLoading(true);

      const response = await fetch(
        'https://biztoken.fecotrade.com/api/usdt-add-request/approve',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(newData),
        },
      );
      setLoading(false);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
        Swal.fire({
          title: 'success',
          text: `Successfully ${data?.status?.label} deposit`,
          icon: 'success',
        }).then(() => {
          closeModal();
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'error',
        text: 'Something wrong',
        icon: 'error',
      });
    }
  };

  return (
    <div className="fixed  left-0  top-0 z-999 flex min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto  max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal  min-h-[400px] rounded-sm border border-stroke bg-white shadow-8 dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full max-w-full w-[400px] lg:w-[600px] pb-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                UPDATE ( {formState.email} )
              </h2>
              <strong
                className="text-4xl align-center cursor-pointer  hover:text-black dark:hover:text-white"
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <hr />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-5.5 p-6.5"
            >
              <p className="dark:text-white text-black text-lg font-semibold">
                Amount: {formState.amount}
              </p>

              <div>
                <SelectOptions
                  control={control}
                  options={options}
                  label="Status"
                  name="status"
                  defaultValue={
                    formState.status === 'rejected'
                      ? '0'
                      : formState.status === 'approved'
                      ? '1'
                      : '2'
                  }
                  placeholder={'Select...'}
                />
              </div>

              <div>
                {lodaing ? (
                  <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
                ) : (
                  <button
                    className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    type="submit"
                  >
                    Update
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
