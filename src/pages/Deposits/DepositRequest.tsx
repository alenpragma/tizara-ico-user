import Swal from 'sweetalert2';
import MyContext from '../../hooks/MyContext';
import { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import InputField from '../../components/Forms/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import Loader from '../../common/Loader';
import { PuffLoader } from 'react-spinners';

interface ComponentProps {
  closeModal: () => void;
}

type IDeposit = {
  amount: number;
};
const DepositRequest: React.FC<ComponentProps> = ({ closeModal }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IDeposit>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IDeposit> = async (data: IDeposit) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/pay/create-payment', data);

      // Check the API response for success and show success message
      if (response.data.success) {
        const invoiceUrl = response.data.data.invoice_url;

        setTimeout(() => {
          window.location.href = invoiceUrl;
          setLoading(false);
        }, 2000);
      } else {
        throw new Error('Deposit failed');
      }
    } catch (error: any) {
      setLoading(false);

      Swal.fire({
        icon: 'error',
        title: 'Deposit Failed',
        text: error?.response?.data?.message || 'Something went wrong!',
      });
    } finally {
    }
  };

  return (
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[350px] md-w-[420px] lg:w-[600px] border-b border-stroke  pb-4 px-4 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <div className=" flex justify-end">
                <h2 className="text-xl font-bold dark:text-white text-black ">
                  {/* My Own Wallet Details */}
                </h2>
              </div>
              <strong
                className="text-3xl align-center dark:text-white  cursor-pointer hover:text-black dark:hover:text-white"
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <hr />

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 px-4 lg:w-[500px]"
            >
              <div className=" mx-auto  w-full lg:px-5 mt-4">
                {/* <p className="font-bold my-10 text-orange-500">
                  Deposits are temporarily colsed. We will be back soon.
                </p> */}

                <InputField
                  label="Amount"
                  name="amount"
                  register={register}
                  type="number"
                  required
                  error={errors}
                  onKeyDown={(e: any) => {
                    if (
                      e.key === 'e' ||
                      e.key === 'E' ||
                      e.key === '+' ||
                      e.key === '-'
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className="flex justify-center mt-4 ">
                {loading ? (
                  <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
                ) : (
                  <button
                    type="submit"
                    className="mt-2 rounded-md bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    Submit
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

export default DepositRequest;
