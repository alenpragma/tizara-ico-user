import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { getTizaraUserToken } from '../../hooks/getTokenFromstorage';
import { useEffect, useState } from 'react';
import { StakeNowModal } from './StakeNowModal';
import { ApiResponse } from '../../types/global';
import { IWallet } from '../../types/wallet';
import axiosInstance from '../../utils/axiosConfig';
import Button from '../../Ui/Button';

type Inputs = {
  paymentMethod: string;
};
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

  // useEffect(() => {
  //   getWllet();
  // }, []);

  useEffect(() => {
    const initializeData = async () => {
      console.log(new Date());

      await getWllet();
      await getPaymentMethod();
      console.log(new Date());
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
        <div className="border p-3 rounded-md">
          <h3 className="dark:text-white font-semibold text-md">
            Available Tizara: {wallet?.nativeWallet}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-4 mt-5">
          {depositMethod?.map((item: any) => {
            return (
              <div
                key={item.id}
                className="w-[300px]   md:w-59 mx-auto flex flex-col justify-between border border-secondary py-5 rounded-xl hover:bg-slate-200  dark:bg-black"
              >
                <div>
                  <div className="flex justify-between font-bold  px-3 py-1">
                    <span>Name: </span>
                    <span>{item.planName}</span>
                  </div>
                  <hr className="py-1 mt-1" />

                  <div className="flex justify-between ">
                    <p className=" font-medium px-3 py-1">Duration:</p>
                    <p className=" font-medium px-3 py-1">
                      {item.duration} Day
                    </p>
                  </div>
                  <hr className="py-1 mt-1" />
                  <div className="flex justify-between ">
                    <p className=" font-medium px-3 py-1">Minimum:</p>
                    <p className=" font-medium px-3 py-1">
                      {item.minimum} Tizara
                    </p>
                  </div>
                  <hr className="py-1 mt-1" />
                  <div className="flex justify-between ">
                    <p className=" font-medium px-3 py-1">APY:</p>
                    <p className=" font-medium px-3 py-1">{item.apy} %</p>
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
      </div>
      {isEditModalOpen && (
        <StakeNowModal
          getWllet={getWllet}
          closeModal={closeEditModal}
          selectedPlan={updateItem}
          wallet={wallet}
        />
      )}
    </DefaultLayout>
  );
};

export default Stake;
