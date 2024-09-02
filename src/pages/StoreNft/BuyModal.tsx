import { useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import Swal from 'sweetalert2';
import { PuffLoader } from 'react-spinners';

export const BuyModal = ({ fetchData, closeModal, data }: any) => {
  const [lodaing, setLoading] = useState(false);
  const totalRoy = (data.price / 100) * data.dailyRoi;

  const monthlyRoi = Number((totalRoy / data.duration).toFixed(2));

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
      nftId: data.id,
      lastDistributionDate: new Date(),
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
    } catch (error: any) {
      setLoading(false);
      Swal.fire({
        title: 'Error',
        text: `${error?.message}`,
        icon: 'error',
      });
    }
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
              <div className="p-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-500">
                <img className="w-90 h-70 rounded-md" src={data.img} alt="" />
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
                  <p>{data.quantity}</p>
                </div>

                <div className="flex justify-between  gap-1 mb-0.5 text-xl font-medium text-black dark:text-white">
                  <p className="">Duration:</p>
                  <p>{data.duration}</p>
                </div>

                <div className="flex justify-between  gap-1 mb-0.5 text-xl font-medium text-black dark:text-white">
                  <p className="">Total Reward:</p>
                  <p>{data.dailyRoi}</p>
                </div>
                <div className="flex justify-between  gap-2 mb-0.5 text-xl font-medium text-black dark:text-white">
                  <p className="">Monthly Reward:</p>
                  <p>{monthlyRoi}</p>
                </div>

                <div className="flex justify-between  gap-1 mb-0.5 text-xl font-medium text-black dark:text-white">
                  <p className="">Price:</p>
                  <p>{data.price}</p>
                </div>

                {/* <p className="mb-0.5 block text-xl font-medium text-black dark:text-white">
                  Duration: {data.duration} Month
                </p>
                <p className="mb-0.5 block text-xl font-medium text-black dark:text-white">
                  Total Reward: {data.dailyRoi} %
                </p>

                <p className="mb-0.5 block text-xl font-medium text-black dark:text-white">
                  Monthly Reward: ${monthlyRoi}
                </p>

                <p className="mb-0.5 block text-xl font-medium text-black dark:text-white">
                  Price: {data.price}
                </p> */}
              </div>
            </div>

            <div className="flex  flex-col w-full gap-5.5 p-6.5">
              <div className="flex justify-center gap-4">
                <div>
                  {lodaing ? (
                    <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
                  ) : (
                    // <button
                    //   onClick={() => purchaseNFT()}
                    //   className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    // >
                    //   Purchase
                    // </button>
                    <button
                      onClick={() => purchaseNFT()}
                      className="btn flex justify-center rounded bg-gradient-to-r from-blue-500 to-purple-500 py-2 px-6 font-medium text-gray hover:shadow-1"
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
