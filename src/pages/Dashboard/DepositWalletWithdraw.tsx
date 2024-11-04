import { useState } from 'react';
import InputField from '../../components/Forms/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';
import axiosInstance from '../../utils/axiosConfig';
import Swal from 'sweetalert2';

const DepositWalletWithdraw = ({
  setGetWallet,
  wallet,
  openAndCloseSwapModal,
}: any) => {
  const [lodaing, setLodaing] = useState<boolean>(false);

  const [userAmount, setUserAmount] = useState(0);

  const { register, handleSubmit } = useForm<any>();

  const fee = userAmount * 0.05;
  const receivedAmount = userAmount - fee;

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    if (data.amount > wallet.depositWallet) {
      Swal.fire({
        title: 'Failed',
        text: 'Insufficient Deposit Wallet',
        icon: 'warning',
      });
      // openAndCloseSwapModal(false);
      return;
    }
    const payload = {
      amount: Number(data.amount),
      address: data.address,
    };
    try {
      setLodaing(true);
      const response = await axiosInstance.post(
        '/deposit-wallet/transfer-deposit-wallet',
        payload,
      );
      if (response.data.statusCode == 200) {
        Swal.fire({
          title: 'success',
          text: response.data.message,
          icon: 'success',
        });
        setLodaing(true);
        await setGetWallet(true);
        await openAndCloseSwapModal(false);
      }
    } catch (error: any) {
      // openAndCloseSwapModal(false);
      setLodaing(false);

      Swal.fire({
        title: 'Failed',
        text: error.message,
        icon: 'error',
      });
    }
  };

  return (
    <div className="modal-container fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto  max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container')
            openAndCloseSwapModal(false);
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[370px] lg:w-[600px] border-b border-stroke py-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Withdraw Deposit Wallet
                <br />
              </h2>

              <strong
                className="text-4xl align-center cursor-pointer  hover:text-black dark:hover:text-white"
                onClick={() => openAndCloseSwapModal(false)}
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
                label="Abailable"
                name="depositWallet"
                register={register}
                required
                defaultValue={`$ ${wallet.depositWallet}`}
                readonly
              />

              <InputField
                label="Amount (Min $10)"
                name="amount"
                register={register}
                required
                min={1}
                type="number"
                onChange={(e: { target: { value: number } }) => {
                  setUserAmount(e.target.value);
                }}
              />

              <InputField
                label="Recived Amount"
                name="RecivedAmount"
                register={register}
                required
                value={receivedAmount}
                readonly
              />

              <InputField
                label="Wallet Address"
                name="address"
                register={register}
                required
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
                <button
                  type="button"
                  onClick={() => openAndCloseSwapModal(false)}
                  className="btn flex justify-center rounded bg-danger py-2 px-6 font-medium text-gray hover:shadow-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositWalletWithdraw;
