import { useEffect, useMemo, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import axiosInstance from '../../utils/axiosConfig';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useGeneralSettings } from '../../store/useCoinPrice';
import SelectOptions from '../../Ui/SelectOptions';
import dome from '../../videos/dome.mp4';
import hotelAndResort from '../../videos/hotelAndResort.mp4';
import land from '../../videos/land.mp4';
import wagon from '../../videos/wagon.mp4';

type Inputs = {
  wallet: { value: string; label: string } | null;
};

export const BuyModal = ({
  wallet,
  getWllet,
  fetchData,
  closeModal,
  data,
}: any) => {
  const [lodaing, setLoading] = useState(false);
  const { fetchGeneralSettings, generalSettings } = useGeneralSettings();

  useEffect(() => {
    if (!generalSettings) {
      fetchGeneralSettings();
    }
  }, [fetchGeneralSettings, generalSettings]);

  const wallets = useMemo(() => {
    return [
      {
        balance: wallet?.nativeWallet || 0,
        value: 'nativewallet',
        label: `Native wallet (${wallet?.nativeWallet.toFixed(2) || 0})`,
      },
      {
        balance: wallet?.icoWallet || 0,
        value: 'mywallet',
        label: `MY wallet (${wallet?.icoWallet.toFixed(2) || 0})`,
      },
    ];
  }, [wallet]);

  const totalRoy = (data.price / 100) * data.dailyRoi;

  const monthlyRoi = Number((totalRoy / data.duration).toFixed(2));

  const purchaseNFT = async (walletValue: string) => {
    setLoading(true);

    const nftdata = {
      payby: walletValue,
      walletName: data.walletName,
      nftId: data.id,
    };

    try {
      const responseData = await axiosInstance.post('/nft-purchese', nftdata);

      if (responseData?.data?.success) {
        fetchData();
        getWllet();
        Swal.fire({
          title: 'Success',
          text: 'Successfully purchased',
          icon: 'success',
        }).then(() => {
          closeModal();
        });
      }

      if (!responseData?.data?.success) {
        Swal.fire({
          title: 'Error',
          text: `${responseData?.data?.message}`,
          icon: 'error',
        });
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Swal.fire({
        title: 'Error',
        text: `${error?.message}`,
        icon: 'error',
      });
    }
  };

  console.log(wallets);

  const { register, handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      wallet: null,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const selectedWallet = formData.wallet?.value;

    if (!selectedWallet) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Wallet',
        text: 'Please select a wallet to purchase from',
      });
      return;
    }

    await purchaseNFT(selectedWallet); // 👈 Pass wallet value here
  };

  return (
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto  max-h-[80%] w-full max-w-fit rounded-lg bg-white     bg-gradient-to-r from-blue-500 to-purple-500"
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          {/* <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div> */}

          <div className="min-w-full w-[370px] lg:w-[800px] border-b border-stroke py-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Purchase NFT
              </h2>

              <strong
                className="text-4xl align-center cursor-pointer  hover:text-black dark:hover:text-white"
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <hr />
            <div className="flex flex-col lg:flex-row  gap-3 lg:gap-4 p-5 lg:items-center justify-evenly">
              <div
                onContextMenu={(e) => e.preventDefault()}
                className="p-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-500"
              >
                {data.walletName === 'dome' && (
                  <video
                    className="w-full h-full object-cover rounded-md"
                    src={dome}
                    autoPlay
                    muted
                    loop
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                  />
                )}

                {data.walletName == 'hotelAndResort' && (
                  <video
                    className="w-full h-full object-cover rounded-md"
                    src={hotelAndResort}
                    autoPlay
                    muted
                    loop
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                  />
                )}

                {data.walletName == 'wagon' && (
                  <video
                    className="w-full h-full object-cover rounded-md"
                    src={wagon}
                    autoPlay
                    muted
                    loop
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                  />
                )}

                {data.walletName == 'land' && (
                  <video
                    className="w-full h-full object-cover rounded-md"
                    src={land}
                    autoPlay
                    muted
                    loop
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                  />
                )}
              </div>

              <div className="mt-4 flex flex-col gap-1 ">
                <div className="flex justify-between  mb-0.5 gap-1 text-xl lg:text-2xl font-bold text-black dark:text-white">
                  <p>Name:</p>
                  <p className="">
                    {data.name}{' '}
                    <span className="text-base"> ({data.title})</span>
                  </p>
                </div>

                <div className="flex justify-between  gap-1 mb-0.5 text-xl font-medium text-black dark:text-white">
                  <p className="">Quantity:</p>
                  <p>{data.quantity} NFT</p>
                </div>

                <div className="flex justify-between  gap-1 mb-0.5 text-xl font-medium text-black dark:text-white">
                  <p className="">Duration:</p>
                  <p>{data.duration} Month</p>
                </div>

                <div className="flex justify-between  gap-1 mb-0.5 text-xl font-medium text-black dark:text-white">
                  <p className="">Total Reward:</p>
                  <p>{data.dailyRoi}%</p>
                </div>
                <div className="flex justify-between  gap-2 mb-0.5 text-xl font-medium text-black dark:text-white">
                  <p className="">Monthly Reward:</p>
                  <p>$ {monthlyRoi}</p>
                </div>

                <div className="flex justify-between  gap-1 mb-0.5 text-xl font-medium text-black dark:text-white">
                  <p className="">Price:</p>
                  <p>
                    {Number(data.price / generalSettings!?.coinPrice).toFixed(
                      2,
                    )}{' '}
                    Tizara
                  </p>
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full  p-2 lg:p-6.5"
            >
              <div>
                <SelectOptions
                  control={control}
                  options={wallets}
                  label="Select Wallet"
                  name="wallet"
                  placeholder={'Select Wallet...'}
                />
              </div>

              <div className="flex  flex-col w-full gap-5.5 p-6.5">
                <div className="flex justify-center gap-4">
                  <div>
                    {lodaing ? (
                      <PuffLoader
                        className="mx-auto"
                        color="#36d7b7"
                        size={40}
                      />
                    ) : (
                      <button
                        type="submit" // ✅ Let form submission trigger
                        className="btn flex justify-center rounded bg-gradient-to-r from-blue-500 to-purple-500 py-2 px-6 font-medium text-gray hover:shadow-1"
                      >
                        Purchase
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
