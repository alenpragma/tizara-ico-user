import { useEffect, useState } from 'react';
import BuyToken from './BuyToken';
import { getTizaraUserToken } from '../../hooks/getTokenFromstorage';
import axios from 'axios';
import { ApiResponse } from '../../types/global';
import { ICoinPrice } from '../../types/dashboard';
import axiosInstance from '../../utils/axiosConfig';

interface ComponentProps {
  setGetWallet: (value: boolean) => void;
}

const TizaraCoin = ({ setGetWallet }: ComponentProps) => {
  // edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // edit

  const [coinPrice, setCoinPrice] = useState<ICoinPrice[] | any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse<ICoinPrice | any>>(
          `/general-settings`,
        );
        if (response?.data?.success) {
          setCoinPrice(response?.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  // console.log(coinPrice);

  return (
    <>
      <div>
        <h2 className="font-semibold text-center pb-4 text-black dark:text-white">
          TIZARA COIN
        </h2>
        <div className=" flex justify-between flex-col ">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-medium text-black dark:text-white">
              <h4 className="">Token Name:</h4>
              <h4 className="uppercase">Tizara</h4>
            </div>
            <div className="flex justify-between font-medium text-black dark:text-white">
              <h4 className=" ">Blockchain:</h4>
              <h4 className=" ">BSC (Bep-20)</h4>
            </div>

            <div className="flex justify-between font-medium text-black dark:text-white">
              <h4 className=" ">Total Supply:</h4>
              <h4 className=" ">15 B</h4>
            </div>

            <div className="flex justify-between font-medium text-black dark:text-white">
              <h4 className=" ">Current Price:</h4>
              <h4 className=" "> $ {coinPrice && coinPrice?.coinPrice}</h4>
            </div>
          </div>
          <button
            onClick={() => openEditModal()}
            className="mt-4 px-10 rounded-lg bg-success py-2.5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Buy Now
          </button>
        </div>
      </div>

      <div>
        {isEditModalOpen && (
          <BuyToken
            setGetWallet={setGetWallet}
            coinPrice={coinPrice}
            closeModal={closeEditModal}
          />
        )}
      </div>
    </>
  );
};

export default TizaraCoin;
