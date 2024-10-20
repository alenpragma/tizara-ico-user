import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '../../components/Forms/InputField';
import { PuffLoader } from 'react-spinners';
import axiosInstance from '../../utils/axiosConfig';
import Swal from 'sweetalert2';

const ExchangeModal = ({
  openAndCloseExchangeModal,
  exchangeSetting,
  wallet,
  setGetWallet,
}: any) => {
  // console.log(data);
  const [lodaing, setLodaing] = useState<boolean>(false);
  const [otpModalOpen, setOtpModalOpen] = useState<boolean>(false);
  const { register, handleSubmit, setValue } = useForm<any>();
  const [selectedWallet, setSelectedWallet] = useState<any>(null);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const exchagneData = {
      amount: data.amount,
    };
    try {
      const response = await axiosInstance.post(
        '/tizara-exchagne-and-convart/exchange-to-my-wallet',
        exchagneData,
      );

      if (response.data.statusCode == 200) {
        Swal.fire({
          title: 'success',
          text: response.data.message,
          icon: 'success',
        });
      }
      setGetWallet(true);
      openAndCloseExchangeModal(false);
    } catch (error: any) {
      Swal.fire({
        title: 'success',
        text: error.message,
        icon: 'success',
      });
      openAndCloseExchangeModal(false);
    }
  };

  const eligibleAmount =
    (wallet.newIcoWallet / 100) * exchangeSetting?.exchangeLimit;
  const formattedAmount = eligibleAmount.toFixed(2);

  return (
    <div className="fixed modal-container left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto  max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container')
            openAndCloseExchangeModal(false);
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[370px] lg:w-[600px] border-b border-stroke py-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Transfer to My Wallet
              </h2>

              <strong
                className="text-4xl align-center cursor-pointer  hover:text-black dark:hover:text-white"
                onClick={() => openAndCloseExchangeModal(false)}
              >
                &times;
              </strong>
            </div>
            <hr />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-5.5 p-6.5"
            >
              <InputField
                label="ICO Wallet"
                name="icoWallet"
                register={register}
                required
                defaultValue={`${wallet.newIcoWallet}`}
                readonly
              />

              <InputField
                label={`Eligible For Exchange (${
                  exchangeSetting?.exchangeLimit || 0
                })`}
                name="amount"
                register={register}
                defaultValue={formattedAmount ?? '00'}
                required
                readonly
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
                      Transfer
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => openAndCloseExchangeModal(false)}
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

export default ExchangeModal;
