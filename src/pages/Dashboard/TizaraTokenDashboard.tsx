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
import { IROYHistory } from '../RoyHistory/RoyHistory';

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
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  // Add other user profile fields as needed
}

interface RoyHistory {
  // Define fields as per the API response
}

interface StakeLevelBonus {
  // Define fields as per the API response
}

interface DepositHistory {
  status: string;
  amount: number;
  // Add other fields as needed
}

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
const BizTokenDashboard: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const token = getTizaraUserToken();
  const [getWallet, setGetWallet] = useState(false);
  const [royHistorys, setRoyHistorys] = useState<IROYHistory[]>([]);
  const [history, sethistory] = useState<any>([]);
  const [depositHistory, setDepositHistory] = useState<any>();

  const axiosInstance = axios.create({
    baseURL: 'https://tizara-backend.vercel.app/api/v1',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const fetchProfileData = async (token: string) => {
    try {
      const response = await axiosInstance.get('/profile', {
        headers: { Authorization: `${token}` },
      });
      if (response?.data?.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const fetchData = async (token: string) => {
    try {
      const response = await axiosInstance.get('/roy-bonus-historys', {
        headers: { Authorization: `${token}` },
      });
      return response?.data?.data;
    } catch (error) {
      console.error('Error fetching roy-bonus-historys data:', error);
    }
  };

  const fetchStakeLevelBonus = async (token: string) => {
    try {
      const response = await axiosInstance.get('/stack-bonus-history', {
        headers: { Authorization: `${token}` },
      });
      if (response?.data?.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error('Error fetching stack-bonus-history data:', error);
    }
  };

  const fetchDepositData = async (token: string) => {
    try {
      const response = await axiosInstance.get('/deposit-request', {
        headers: { Authorization: `${token}` },
      });
      if (response?.data?.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error('Error fetching deposit-request data:', error);
    }
  };

  const fetchAllData = async (
    token: string | any,
    setProfile: SetState<UserProfile | any>,
    setRoyHistorys: SetState<RoyHistory[] | any>,
    sethistory: SetState<StakeLevelBonus[] | any>,
    setDepositHistory: SetState<DepositHistory[] | any>,
  ) => {
    try {
      const [profileData, royData, stakeBonusData, depositData] =
        await Promise.all([
          fetchProfileData(token),
          fetchData(token),
          fetchStakeLevelBonus(token),
          fetchDepositData(token),
        ]);

      if (profileData) setProfile(profileData);
      if (royData) setRoyHistorys(royData);
      if (stakeBonusData) sethistory(stakeBonusData);
      if (depositData) setDepositHistory(depositData);
    } catch (error) {
      console.error('Error fetching all data:', error);
    }
  };

  useEffect(() => {
    fetchAllData(
      token,
      setProfile,
      setRoyHistorys,
      sethistory,
      setDepositHistory,
    );
  }, []);

  // sum the dailyRoy values
  let totalRoy = 0;
  for (let i = 0; i < royHistorys.length; i++) {
    totalRoy += royHistorys[i].dailyRoy;
  }

  // sum the level bonusAmount values
  let stakeLevelBonus = 0;
  for (let i = 0; i < history?.length; i++) {
    stakeLevelBonus += history[i].bonusAmount;
  }

  let totalDeposit = 0;

  for (let i = 0; i < depositHistory?.length; i++) {
    if (depositHistory[i].status == 'APPROVE') {
      totalDeposit += Number(depositHistory[i].amount);
    }
  }

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
            title="Total ROI"
            total={`${totalRoy ? totalRoy : '00'}`}

            // rate="0.95%"
            // levelDown
          >
            <PiPackage className="text-2xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>
        <Link to={'/'}>
          <CardDataStats
            title="Total Deposit"
            total={`${totalDeposit ? totalDeposit : '00'}`}

            // rate="0.95%"
            // levelDown
          >
            <PiPackage className="text-2xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>

        <Link to={'/'}>
          <CardDataStats
            title="Level Bonus"
            total={`${stakeLevelBonus ? stakeLevelBonus : '00'}`}

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
