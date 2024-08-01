import { useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import Swal from 'sweetalert2';
import { PuffLoader } from 'react-spinners';

export const BuyModal = ({ fetchData, closeModal, data }: any) => {
  const [lodaing, setLoading] = useState(false);

  const purchaseNFT = async () => {
    setLoading(true);

    const nftdata = {
      name: data.name,
      title: data.title,
      walletName: data.walletName,
      quantity: 1,
      price: data.price,
      dailyRoi: data.dailyRoi,
      duration: data.duration,
      id: data.id,
    };

    try {
      const responseData = await axiosInstance.post('/nft-purchese', nftdata);

      if (responseData?.data?.success) {
        fetchData();
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
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
      });
    }
  };

  return (
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto  max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[370px] lg:w-[800px] border-b border-stroke py-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Purhese NFT
              </h2>

              <strong
                className="text-4xl align-center cursor-pointer  hover:text-black dark:hover:text-white"
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <hr />
            <div className="flex flex-col lg:flex-row  gap-3 lg:gap-5 p-5 lg:items-center justify-evenly">
              <img className="w-90 h-70 rounded-md" src={data.img} alt="" />
              <div className="mt-4 flex flex-col gap-1 ">
                <p className="mb-0.5 block text-2xl font-semibold text-black dark:text-white">
                  Name: {data.name}
                </p>
                <p className="mb-0.5 block text-2xl font-semibold text-black dark:text-white">
                  Title: {data.title}
                </p>
                <p className="mb-0.5 block text-xl font-medium text-black dark:text-white">
                  Title: {data.quantity}
                </p>
                <p className="mb-0.5 block text-xl font-medium text-black dark:text-white">
                  Duration: {data.duration}
                </p>
                <p className="mb-0.5 block text-xl font-medium text-black dark:text-white">
                  DailyROI: {data.dailyRoi}
                </p>
                <p className="mb-0.5 block text-xl font-medium text-black dark:text-white">
                  Price: {data.price}
                </p>
              </div>
            </div>

            <div className="flex  flex-col w-full gap-5.5 p-6.5">
              <div className="flex justify-center gap-4">
                <div>
                  {lodaing ? (
                    <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
                  ) : (
                    <button
                      onClick={() => purchaseNFT()}
                      className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    >
                      Purchase
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
