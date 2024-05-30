import { SubmitHandler, useForm } from 'react-hook-form';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { getTizaraUserToken } from '../../hooks/getTokenFromstorage';
import { useEffect, useState } from 'react';
import { StakeNowModal } from './StakeNowModal';
import { ApiResponse } from '../../types/global';
import { IWallet } from '../../types/wallet';

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

  const token = getTizaraUserToken();

  const getWllet = async () => {
    const token = getTizaraUserToken();
    try {
      const response = await axios.get<ApiResponse<IWallet>>(
        'https://tizara-backend.vercel.app/api/v1/user-wallet',
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (response?.data?.success) {
        setWallet(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    getWllet();
  }, []);

  const getPaymentMethod = async () => {
    try {
      const response = await axios.get(
        'https://tizara-backend.vercel.app/api/v1/stack-coin-settings?status=ACTIVE',
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setDepositMethod(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getPaymentMethod();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    console.log(data);
  };

  // Function to set wallet name based on selected method
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
      <div className="lg:max-w-[50%] mx-auto">
        <div className="border p-3 rounded-md">
          <h3 className="dark:text-white font-semibold text-md">
            Available Tizara: {wallet?.nativeWallet}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
          {depositMethod?.map((item: any) => {
            return (
              <div
                key={item._id}
                className=" w-50 mx-auto border p-3 rounded-md dark:bg-black"
              >
                <p className=" font-medium">Name: {item.planName}</p>
                <p className=" font-medium">Duration: {item.duration} day</p>
                <p className=" font-medium">Minimum: {item.minimum} Tizara</p>
                <p className=" font-medium">APY: {item.apy} %</p>
                <button
                  onClick={() => openEditModal(item)}
                  className={`px-6 bg-primary btn flex justify-center rounded  py-1  mt-2  font-normal text-gray hover:shadow-1`}
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
        />
      )}
    </DefaultLayout>
  );
};

export default Stake;
