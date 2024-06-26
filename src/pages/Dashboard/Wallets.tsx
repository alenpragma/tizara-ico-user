import CardDataStats from '../../components/CardDataStats';
import { PiPackage } from 'react-icons/pi';
import UserIcon from '../../assets/icon/UserIcon';
import { useEffect, useState } from 'react';
import { IWallet } from '../../types/wallet';
import { ApiResponse } from '../../types/global';
import axiosInstance from '../../utils/axiosConfig';

const Wallets = ({ getWallet }: { getWallet: boolean }) => {
  const [wallet, setWallet] = useState<IWallet | null>(null);

  const fetchData = async () => {
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

  useEffect(() => {
    fetchData();
  }, [getWallet]);

  return (
    <div className="grid grid-cols-2 gap-2 lg:gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
      <div>
        <CardDataStats
          title="Deposit Wallet"
          total={`${wallet?.depositWallet ? wallet?.depositWallet : '00'} USD`}
        >
          <PiPackage className="lg:text-2xl dark:text-white text-primary" />
        </CardDataStats>
      </div>

      <div>
        <CardDataStats
          title="Native Wallet"
          total={`${wallet?.nativeWallet ? wallet?.nativeWallet : '00'} TIZARA`}
        >
          <PiPackage className="lg:text-2xl dark:text-white text-primary" />
        </CardDataStats>
      </div>

      <div>
        <CardDataStats
          title="ICO Wallet"
          total={`${wallet?.icoWallet ? wallet?.icoWallet : '00'} TIZARA`}
        >
          <UserIcon />
        </CardDataStats>
      </div>

      <div>
        <CardDataStats
          title="Stake Wallet"
          total={`${wallet?.stakeWallet ? wallet?.stakeWallet : '00'} TIZARA`}
        >
          <PiPackage className="lg:text-2xl dark:text-white text-primary" />
        </CardDataStats>
      </div>
    </div>
  );
};

export default Wallets;
