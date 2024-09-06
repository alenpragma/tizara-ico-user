import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axiosInstance from '../../utils/axiosConfig';
import InputField from '../../components/Forms/InputField';
import { PuffLoader } from 'react-spinners';
import SelectOptions from '../../Ui/SelectOptions';

const SwapModal = ({ setGetWallet, wallet, toggleSwapModal }: any) => {
  const [lodaing, setLodaing] = useState<boolean>(false);

  const { register, handleSubmit, control } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    Swal.fire({
      title: 'Confirm',
      text: data?.to,
      html: `${data?.to} <br/> Please verify your wallet address. Transactions are final. Do you wish to proceed?`,

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then(async (result) => {
      if (wallet?.icoWallet < data?.amount) {
        Swal.fire({
          title: 'Failed',
          text: 'Your balance is low',
          icon: 'error',
        });
        return;
      }
      if (1000 > data.amount) {
        Swal.fire({
          title: 'Failed',
          text: 'Minimum withdraw amount 1000 Tizara',
          icon: 'error',
        });
        return;
      }

      if (result.isConfirmed) {
        setLodaing(true);
        const withdrowData = {
          to: data.to,
          amount: Number(data.amount),
        };
        try {
          const response = await axiosInstance.post(
            '/withdrow-request',
            withdrowData,
          );
          if (response?.data?.statusCode == 200) {
            setGetWallet(true);
            toggleSwapModal(false);
            Swal.fire({
              title: 'success',
              text: response?.data?.message,
              icon: 'success',
            });
            setLodaing(false);
          }
        } catch (error: any) {
          setLodaing(false);

          Swal.fire({
            title: 'Failed',
            text: error.message,
            icon: 'error',
          });
        }
      }
    });
  };

  const options = [
    { value: '0', label: 'BEP(20)' },
    { value: '1', label: 'ERC(20)' },
    { value: '2', label: 'TRC(20)' },
  ];

  return (
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto  max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className == 'modal-container') toggleSwapModal(false);
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[370px] lg:w-[600px] border-b border-stroke py-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                SWAP
              </h2>

              <strong
                className="text-4xl align-center cursor-pointer  hover:text-black dark:hover:text-white"
                onClick={() => toggleSwapModal(false)}
              >
                &times;
              </strong>
            </div>
            <hr />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex  flex-col w-full gap-5.5 p-6.5"
            >
              <InputField
                label="MY Wallet"
                name="icoWallet"
                register={register}
                defaultValue={wallet?.icoWallet}
                readonly
              />

              <SelectOptions
                control={control}
                defaultValue={''}
                label="Newtork"
                name="network"
                options={options}
                placeholder="Please Select network"
              />

              <InputField
                label="Wallet address"
                name="to"
                register={register}
                required
              />
              <InputField
                label="Amount"
                name="amount"
                register={register}
                required
                type="number"
              />

              <div className="flex justify-center gap-4">
                <div>
                  {lodaing ? (
                    <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
                  ) : (
                    <button
                      className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Submit
                    </button>
                  )}
                </div>
                {/* <button
                  type="button"
                  onClick={() => toggleSwapModal(false)}
                  className="btn flex justify-center rounded bg-danger py-2 px-6 font-medium text-gray hover:shadow-1"
                >
                  Cancel
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapModal;
