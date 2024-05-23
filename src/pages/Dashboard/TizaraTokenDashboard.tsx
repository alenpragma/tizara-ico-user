import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import { PiPackage } from 'react-icons/pi';
import axios from 'axios';
import { getTizaraUserToken } from '../../hooks/getTokenFromstorage';
import WelcomeSection from './WelcomeSection';
import Wallets from './Wallets';
import TizaraCoin from './TizaraCoin';

interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
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
}

const BizTokenDashboard: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const token = getTizaraUserToken();
  const [getWallet, setGetWallet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse<UserProfile>>(
          'http://localhost:5000/api/v1/profile',
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
      <WelcomeSection profile={profile} />

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-y-5 lg:gap-5">
        {/* users wallets  */}
        <div className="col-span-4">
          <Wallets getWallet={getWallet} />
        </div>

        <div className="col-span-2 rounded-sm border border-stroke bg-white py-5 px-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <TizaraCoin setGetWallet={setGetWallet} />
        </div>
      </div>

      <hr className="my-5 border-danger border-[1px]" />

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6  lg:grid-cols-3  xl:grid-cols-4 2xl:gap-7.5">
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
