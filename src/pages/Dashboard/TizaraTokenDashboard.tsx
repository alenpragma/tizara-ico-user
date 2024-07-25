import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link, useNavigate } from 'react-router-dom';
import { PiPackage } from 'react-icons/pi';
import WelcomeSection from './WelcomeSection';
import Wallets from './Wallets';
import TizaraCoin from './TizaraCoin';
import { IROYHistory } from '../RoyHistory/RoyHistory';
import axiosInstance from '../../utils/axiosConfig';
import { logout } from '../../utils/auth';

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
  isVerified: boolean;
  status: boolean;
  isRcm: boolean;
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

// type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

const TizaraTokenDashboard: React.FC = () => {
  const [getWallet, setGetWallet] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [royHistorys, setRoyHistorys] = useState<IROYHistory[]>([]);
  const [history, setHistory] = useState<any>([]);
  const [depositHistory, setDepositHistory] = useState<any>();
  const navigate = useNavigate();

  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get('/profile');

      if (response?.data?.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    if (profile?.status === false) {
      console.log(profile?.status);

      logout();
    }
  }, [profile?.status]);

  useEffect(() => {
    if (profile?.isVerified === false) {
      navigate('/');
    }
  }, [profile?.isVerified]);

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/profile/my-team');
        setLoading(false);

        if (response?.data?.success) {
          setTeams(response?.data?.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const fetchRoyHistoryData = async () => {
    try {
      const response = await axiosInstance.get('/roy-bonus-historys');
      if (response?.data?.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error('Error fetching roy-bonus-historys data:', error);
    }
  };

  const fetchStakeLevelBonus = async () => {
    try {
      const response = await axiosInstance.get('/stack-bonus-history');
      if (response?.data?.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error('Error fetching stack-bonus-history data:', error);
    }
  };

  const fetchDepositData = async () => {
    try {
      const response = await axiosInstance.get('/deposit-request');
      if (response?.data?.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error('Error fetching deposit-request data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await fetchProfileData();
      setProfile(profileData);

      const royHistoryData = await fetchRoyHistoryData();
      setRoyHistorys(royHistoryData);

      const stakeLevelBonusData = await fetchStakeLevelBonus();
      setHistory(stakeLevelBonusData);

      const depositData = await fetchDepositData();
      setDepositHistory(depositData);
    };

    fetchData();
  }, []);

  // sum the dailyRoy values
  let totalRoy = 0;
  for (let i = 0; i < royHistorys?.length; i++) {
    totalRoy += royHistorys[i]?.dailyRoy;
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

      <hr className="my-5 border-success border-[1px]" />

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6  lg:grid-cols-3  xl:grid-cols-4 2xl:gap-7.5">
        <Link to="/my-team">
          <CardDataStats
            title="My Team"
            total={`${profile?.referralCount ? profile?.referralCount : '00'}`}
          >
            <PiPackage className="text-2xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>

        <Link to="/my-team">
          <CardDataStats
            title="Direct Refer"
            total={`${teams?.length ? teams?.length : '00'}`}
          >
            <PiPackage className="text-2xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>

        <Link to={'/roi-history'}>
          <CardDataStats
            title="Total Reward"
            total={`${totalRoy ? totalRoy.toFixed(2) : '00'}`}
          >
            <PiPackage className="text-2xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>

        <Link to={'/deposit-wallet-history'}>
          <CardDataStats
            title="Total Deposit"
            total={`${totalDeposit ? totalDeposit : '00'}`}
          >
            <PiPackage className="text-2xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>

        <Link to={'/stake-reward'}>
          <CardDataStats
            title="Level Reward"
            total={`${stakeLevelBonus ? stakeLevelBonus : '00'}`}
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

export default TizaraTokenDashboard;
