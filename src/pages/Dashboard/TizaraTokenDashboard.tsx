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
import Wallets from './Wallets';

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
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <WelcomeSection />

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-y-5 lg:gap-5">
        {/* users wallets  */}
        <div className="col-span-4">
          <Wallets profile={profile} />
        </div>

        <div className="col-span-2  rounded-sm cursor-pointer border border-stroke bg-white py-5 px-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h2 className="font-semibold text-center pb-4 text-black dark:text-white">
            TIZARA COIN
          </h2>

          <div className=" flex justify-between flex-col ">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between font-medium text-black dark:text-white">
                <h4 className="">Token Name:</h4>
                <h4 className="">Tizara</h4>
              </div>

              <div className="flex justify-between font-medium text-black dark:text-white">
                <h4 className=" ">Blockchain:</h4>
                <h4 className=" ">Binance</h4>
              </div>

              <div className="flex justify-between font-medium text-black dark:text-white">
                <h4 className=" ">Total Supply:</h4>
                <h4 className=" ">15 Billion</h4>
              </div>

              <div className="flex justify-between font-medium text-black dark:text-white">
                <h4 className=" ">Current Price:</h4>
                <h4 className=" ">$0.001</h4>
              </div>
            </div>
            <button className="mt-4 px-10 rounded-full bg-meta-8 py-2.5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
              Buy
            </button>
          </div>
        </div>
      </div>

      <hr className="my-5 border-danger border-[1px]" />

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6  lg:grid-cols-3  xl:grid-cols-4 2xl:gap-7.5">
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
            <PiPackage className="text-xl dark:text-white text-primary" />
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
