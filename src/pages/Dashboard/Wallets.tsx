import { Link } from 'react-router-dom';
import CardDataStats from '../../components/CardDataStats';
import { PiPackage } from 'react-icons/pi';
import UserIcon from '../../assets/icon/UserIcon';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getTizaraUserToken } from '../../hooks/getTokenFromstorage';
import { IWallet } from '../../types/wallet';
import { ApiResponse } from '../../types/global';

const Wallets = ({ getWallet }: any) => {
  const [wallet, setWallet] = useState<IWallet | null>(null);

  const fetchData = async () => {
    const token = getTizaraUserToken();
    try {
      const response = await axios.get<ApiResponse<IWallet>>(
        'http://localhost:5000/api/v1/user-wallet',
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(response);

      if (response?.data?.success) {
        // console.log(response.data.data);
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
      <Link to={'/'}>
        <CardDataStats
          title="Deposit Wallet"
          total={`${wallet?.depositWallet ? wallet?.depositWallet : '00'} USD`}
          // rate="0.95%"
          // levelDown
        >
          <PiPackage className="lg:text-2xl dark:text-white text-primary" />
        </CardDataStats>
      </Link>

      <Link to={'/'}>
        <CardDataStats
          title="Native Wallet"
          total={`${wallet?.nativeWallet ? wallet?.nativeWallet : '00'} TIZARA`}
          // rate="0.95%"
          // levelDown
        >
          <PiPackage className="lg:text-2xl dark:text-white text-primary" />
        </CardDataStats>
      </Link>

      <Link to={'/'}>
        <CardDataStats
          title="ICO Wallet"
          total={`${wallet?.icoWallet ? wallet?.icoWallet : '00'} TIZARA`}
          // rate="0.95%"
          // levelDown
        >
          <UserIcon />
        </CardDataStats>
      </Link>

      <Link to={'/'}>
        <CardDataStats
          title="Stake Wallet"
          total={`${wallet?.stakeWallet ? wallet?.stakeWallet : '00'} TIZARA`}
          // rate="0.95%"
          // levelDown
        >
          <PiPackage className="lg:text-2xl dark:text-white text-primary" />
        </CardDataStats>
      </Link>
    </div>
  );
};

export default Wallets;
