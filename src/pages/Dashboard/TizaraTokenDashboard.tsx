import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import UserIcon from '../../assets/icon/UserIcon';
import { Link } from 'react-router-dom';
import { FaUserCheck } from 'react-icons/fa6';
import { PiPackage } from 'react-icons/pi';
import axios from 'axios';
import { getTizaraUserToken } from '../../hooks/getTokenFromstorage';
import WelcomeSection from './WelcomeSection';

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: UserProfile;
}

interface Wallet {
  id: string;
  depositWallet: number;
  icotWallet: number;
  nativeWallet: string;
  createdAt: string;
  updatedAt: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  referralCode: string;
  myReferralCode: string;
  role: string;
  profileImage: string | null;
  referralCount: number;
  nativeWallet: number;
  createdAt: string;
  updatedAt: string;
  wallet: Wallet;
}

const BizTokenDashboard: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const token = getTizaraUserToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          'https://tizara.vercel.app/api/v1/profile',
          {
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(response);

        if (response?.data?.success) {
          setProfile(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // fetchData();
  }, []);
  console.log(profile);

  return (
    <DefaultLayout>
      <WelcomeSection />
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-y-5 lg:gap-5">
        <div className="col-span-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
            <Link to={'/'}>
              <CardDataStats
                title="Deposit Wallet"
                total={`${
                  profile?.wallet?.depositWallet
                    ? profile?.wallet?.depositWallet
                    : '00'
                } TIZARA`}
                // rate="0.95%"
                // levelDown
              >
                <PiPackage className="text-2xl dark:text-white text-primary" />
              </CardDataStats>
            </Link>

            <Link to={'/'}>
              <CardDataStats
                title="Deposit Wallet"
                total={`${
                  profile?.wallet?.depositWallet
                    ? profile?.wallet?.depositWallet
                    : '00'
                } TIZARA`}
                // rate="0.95%"
                // levelDown
              >
                <PiPackage className="text-2xl dark:text-white text-primary" />
              </CardDataStats>
            </Link>

            <Link to={'/'}>
              <CardDataStats
                title="Native Wallet"
                total={`${
                  profile?.wallet?.nativeWallet
                    ? profile?.wallet?.nativeWallet
                    : '00'
                } TIZARA`}
                // rate="0.95%"
                // levelDown
              >
                <UserIcon />
              </CardDataStats>
            </Link>

            <Link to={'/'}>
              <CardDataStats
                title="Deposit Wallet"
                total={`${
                  profile?.wallet?.depositWallet
                    ? profile?.wallet?.depositWallet
                    : '00'
                } TIZARA`}
                // rate="0.95%"
                // levelDown
              >
                <PiPackage className="text-2xl dark:text-white text-primary" />
              </CardDataStats>
            </Link>
          </div>
        </div>

        <div className="col-span-2  rounded-sm cursor-pointer border border-stroke bg-white py-5 px-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className=" flex justify-between flex-col ">
            <div className="flex flex-col gap-3">
              <h4 className="text-title-sm font-bold text-black dark:text-white">
                Token Name: Tizara
              </h4>
              <h4 className="text-title-sm font-bold text-black dark:text-white">
                Blockchain: Binance
              </h4>
              <h4 className="text-title-sm font-bold text-black dark:text-white">
                Total Supply: 2343423
              </h4>
              <h4 className="text-title-sm font-bold text-black dark:text-white">
                Current Price: 300$
              </h4>
            </div>
            <button className="ms-auto justify-end mt-10 w-fit px-10  rounded-md bg-secondary py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
              DEPOSIT
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Link to={'/'}>
          <CardDataStats
            title="Deposit Wallet"
            total={`${
              profile?.wallet?.depositWallet
                ? profile?.wallet?.depositWallet
                : '00'
            } TIZARA`}
            // rate="0.95%"
            // levelDown
          >
            <PiPackage className="text-2xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>

        <Link to={'/'}>
          <CardDataStats
            title="Native Wallet"
            total={`${
              profile?.wallet?.nativeWallet
                ? profile?.wallet?.nativeWallet
                : '00'
            } TIZARA`}
            // rate="0.95%"
            // levelDown
          >
            <UserIcon />
          </CardDataStats>
        </Link>

        <Link to={'/'}>
          <CardDataStats
            title="ICO Wallet"
            total="00"
            // rate="0.95%"
            // levelDown
          >
            <FaUserCheck className="text-xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>

        <Link to={'/'}>
          <CardDataStats
            title="My Team"
            total={`${profile?.referralCount ? profile?.referralCount : '00'}`}

            // rate="0.95%"
            // levelDown
          >
            <PiPackage className="text-2xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>
      </div>

      <div className="mt-5">
        {/* <LastestDeposits /> */}
        <div className="mt-5">{/* <LatestPurchaseHistory /> */}</div>
      </div>
    </DefaultLayout>
  );
};

export default BizTokenDashboard;
