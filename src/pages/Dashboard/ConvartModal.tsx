import React, { useState } from 'react';
import InputField from '../../components/Forms/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';
import SelectOptions from '../../Ui/SelectOptions';
import axiosInstance from '../../utils/axiosConfig';
import Swal from 'sweetalert2';

// depositWallet;
// icoWallet;
// stakeWallet;

// nativeWallet;
// newIcoWallet;
// nftWallet;

const ConvartModal = ({
  setGetWallet,
  wallet,
  openAndCloseConvartModal,
}: any) => {
  const [lodaing, setLodaing] = useState<boolean>(false);
  const [otpModalOpen, setOtpModalOpen] = useState<boolean>(false);

  const { register, handleSubmit, control } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    if (data.usd == 0) {
      Swal.fire({
        title: 'failed',
        text: 'Balance is low',
        icon: 'warning',
      });
      openAndCloseConvartModal(false);
      return;
    }

    const convartData = {
      usd: Number(data.usd),
    };

    try {
      const response = await axiosInstance.post(
        '/tizara-exchagne-and-convart/convart-to-my-wallet',
        convartData,
      );
      if (response.data.statusCode == 200) {
        Swal.fire({
          title: 'success',
          text: response.data.message,
          icon: 'success',
        });
        setGetWallet(true);
        openAndCloseConvartModal(false);
      }
    } catch (error: any) {
      console.log(error);

      openAndCloseConvartModal(false);
      Swal.fire({
        title: 'Failed',
        text: error.message,
        icon: 'error',
      });
    }
  };

  // const eligibleAmount = (wallet.nftWallet / 100) * 20;
  // const formattedAmount = eligibleAmount.toFixed(2);
  const totalCoin = wallet.nftWallet / 0.008;
  console.log(totalCoin);

  return (
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto  max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container')
            openAndCloseConvartModal(false);
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[370px] lg:w-[600px] border-b border-stroke py-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Convart to My Wallet
              </h2>

              <strong
                className="text-4xl align-center cursor-pointer  hover:text-black dark:hover:text-white"
                onClick={() => openAndCloseConvartModal(false)}
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
                label="NFT Wallet"
                name="nftWallet"
                register={register}
                required
                defaultValue={`${wallet.nftWallet}`}
                readonly
              />

              <InputField
                label="Eligible For Exchange"
                name="usd"
                register={register}
                defaultValue={wallet?.nftWallet ?? '00'}
                required
                readonly
              />

              <InputField
                label="Recived"
                name="amount"
                register={register}
                defaultValue={totalCoin ?? '00'}
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
                      Submit
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => openAndCloseConvartModal(false)}
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

export default ConvartModal;
