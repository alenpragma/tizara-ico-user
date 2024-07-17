import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { StakeNowModal } from './StakeNowModal';
import { ApiResponse } from '../../types/global';
import { IWallet } from '../../types/wallet';
import axiosInstance from '../../utils/axiosConfig';
import Skeleton from 'react-loading-skeleton';
import { PuffLoader } from 'react-spinners';
import image from '../../assets/Rectangle 130.png';

const Stake = () => {
  const [depositMethod, setDepositMethod] = useState<any>();
  const [selected, setSelected] = useState<any>();
  const [plan, setPlan] = useState<any>();
  const [wallet, setWallet] = useState<IWallet>();

  // edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState<any>();
  // edit

  const openEditModal = (data: any) => {
    setUpdateItem(data);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const getWllet = async () => {
    try {
      const response = await axiosInstance.get<ApiResponse<IWallet>>(
        '/user-wallet',
      );

      if (response?.data?.success) {
        setWallet(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getPaymentMethod = async () => {
    try {
      const response = await axiosInstance.get(
        '/stack-coin-settings?status=ACTIVE',
      );
      setDepositMethod(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await getWllet();
      await getPaymentMethod();
    };

    initializeData();
  }, []);

  useEffect(() => {
    const selectedMethodObject = depositMethod?.data?.find(
      (method: any) => method.id === selected,
    );
    if (selectedMethodObject) {
      setPlan(selectedMethodObject);
    } else {
      setPlan(undefined);
    }
  }, [selected, depositMethod]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Stake Now" />
      <div className="lg:max-w-[70%] mx-auto">
        {wallet ? (
          <div className="flex justify-between border p-3 rounded-md  text-sm md:text-md">
            <h3 className="dark:text-white font-semibold">
              Tizara Wallet: {wallet?.nativeWallet}
            </h3>
            <div className="lg:hidden w-[2px] h-[20px] border  "></div>
            <h3 className="dark:text-white font-semibold ">
              MY Wallet: {wallet?.icoWallet}
            </h3>
          </div>
        ) : (
          <Skeleton height={40} count={1} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-4 mt-5">
          {depositMethod?.map((item: any) => {
            return (
              <div
                key={item?.id}
                className="w-full   md:w-59 mx-auto flex flex-col justify-between border border-secondary py-5 rounded-xl hover:bg-slate-200  dark:bg-black"
              >
                <div>
                  <div className="flex justify-between font-bold  px-3 py-1">
                    <span>Name: </span>
                    <span>{item?.planName}</span>
                  </div>

                  <hr className="py-1 mt-1" />

                  <div className="flex justify-between ">
                    <p className=" font-medium px-3 py-1">Duration:</p>
                    <p className=" font-medium px-3 py-1">
                      {item?.duration} Day
                    </p>
                  </div>
                  <hr className="py-1 mt-1" />
                  <div className="flex justify-between ">
                    <p className=" font-medium px-3 py-1">Minimum:</p>
                    <p className=" font-medium px-3 py-1">
                      {item?.minimum} Tizara
                    </p>
                  </div>
                  <hr className="py-1 mt-1" />
                  <div className="flex justify-between ">
                    <p className=" font-medium px-3 py-1">APY:</p>
                    <p className=" font-medium px-3 py-1">{item?.apy} %</p>
                  </div>
                  <hr className="py-1 mt-1" />
                </div>

                <button
                  onClick={() => openEditModal(item)}
                  className={`px-6  w-fit mx-auto bg-emerald-500 btn flex justify-center rounded  py-2   font-normal text-gray hover:shadow-1`}
                >
                  Stake Now
                </button>
              </div>
            );
          })}
        </div>

        {!depositMethod && (
          <PuffLoader
            className="mx-auto justify-center"
            color="#36d7b7"
            size={40}
          />
        )}
      </div>
      {isEditModalOpen && (
        <StakeNowModal
          getWllet={getWllet}
          closeModal={closeEditModal}
          selectedPlan={updateItem}
          wallet={wallet}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-3">
        <div className="border-2 dark:border-strokedark dark:bg-boxdark bg-[#ffff]  p-5 border-strokedark rounded-2xl max-w-full w-[380px]">
          <img src={image} alt="" />
          <div className=" mt-5">
            <div className="flex gap-5">
              <h2 className="font-bold text-black dark:text-white text-4xl">
                DOME
              </h2>
              <p className="text-[#555555] dark:text-whiten font-semibold text-title-lg">
                Legendary
              </p>
            </div>
            <div className="mt-5 mb-8  ">
              <div className="font-semibold text-lg flex">
                <p className="px-4 py-1.5  rounded-sm bg-[#F3F3F3]">
                  <span className="text-[#b0adad] dark:text-black">Qty:</span>{' '}
                  <span className="dark:text-black">10000 nft</span>
                </p>

                <p className="px-4 py-1.5 ">
                  <span className="text-[#D3D3D3]"> Price:</span>{' '}
                  <span>10000 $</span>
                </p>
              </div>
            </div>
            <div className="mb-2 flex justify-center">
              {/* <button className="inline-flex dark:bg-white dark:text-black items-center justify-center rounded-lg bg-black py-3 px-12 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                Buy Now
              </button> */}
              <p className="cursor-pointer px-7 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-black inline-block">
                <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-black group-hover:h-full opacity-90"></span>
                <span className="relative group-hover:text-white">Buy Now</span>
              </p>
            </div>
          </div>
        </div>
        <div className="border-2 dark:border-strokedark dark:bg-boxdark bg-[#ffff]  p-5 border-strokedark rounded-2xl max-w-full w-[380px]">
          <img src={image} alt="" />
          <div className=" mt-5">
            <div className="flex gap-5">
              <h2 className="font-bold text-black dark:text-white text-4xl">
                DOME
              </h2>
              <p className="text-[#555555] dark:text-whiten font-semibold text-title-lg">
                Legendary
              </p>
            </div>
            <div className="mt-5 mb-8  ">
              <div className="font-semibold text-lg flex">
                <p className="px-4 py-1.5  rounded-sm bg-[#F3F3F3]">
                  <span className="text-[#b0adad] dark:text-black">Qty:</span>{' '}
                  <span>10000 nft</span>
                </p>

                <p className="px-4 py-1.5 ">
                  <span className="text-[#D3D3D3]"> Price:</span>{' '}
                  <span>10000 $</span>
                </p>
              </div>
            </div>
            <div className="mb-2 flex justify-center">
              {/* <button className="inline-flex dark:bg-white dark:text-black items-center justify-center rounded-lg bg-black py-3 px-12 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                Buy Now
              </button> */}
              <p className="cursor-pointer px-7 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-black inline-block">
                <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-black group-hover:h-full opacity-90"></span>
                <span className="relative group-hover:text-white">Buy Now</span>
              </p>
            </div>
          </div>
        </div>
        <div className="border-2 dark:border-strokedark dark:bg-boxdark bg-[#ffff]  p-5 border-strokedark rounded-2xl max-w-full w-[380px]">
          <img src={image} alt="" />
          <div className=" mt-5">
            <div className="flex gap-5">
              <h2 className="font-bold text-black dark:text-white text-4xl">
                DOME
              </h2>
              <p className="text-[#555555] dark:text-whiten font-semibold text-title-lg">
                Legendary
              </p>
            </div>
            <div className="mt-5 mb-8  ">
              <div className="font-semibold text-lg flex">
                <p className="px-4 py-1.5  rounded-sm bg-[#F3F3F3]">
                  <span className="text-[#b0adad] dark:text-black">Qty:</span>{' '}
                  <span>10000 nft</span>
                </p>

                <p className="px-4 py-1.5 ">
                  <span className="text-[#D3D3D3]"> Price:</span>{' '}
                  <span>10000 $</span>
                </p>
              </div>
            </div>
            <div className="mb-2 flex justify-center">
              {/* <button className="inline-flex dark:bg-white dark:text-black items-center justify-center rounded-lg bg-black py-3 px-12 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                Buy Now
              </button> */}
              <p className="cursor-pointer px-7 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-black inline-block">
                <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-black group-hover:h-full opacity-90"></span>
                <span className="relative group-hover:text-white">Buy Now</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Stake;
