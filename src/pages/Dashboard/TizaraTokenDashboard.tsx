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
import { IWallet } from '../../types/wallet';
import PopUpModal from './PopUpModal';

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

  const [popup, setPopup] = useState<any | null>(null);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [royHistorys, setRoyHistorys] = useState<IROYHistory[]>([]);
  const [history, setHistory] = useState<any>([]);
  const [depositHistory, setDepositHistory] = useState<any>();
  const [nFTWallet, setNFTWallet] = useState<any>();
  const navigate = useNavigate();

  const fetchPopup = async () => {
    try {
      const response = await axiosInstance.get('/popup');
      // console.log(response);

      if (response?.data?.success) {
        return response?.data?.data;
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

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

  const getNftWalletsData = async () => {
    try {
      const response = await axiosInstance.get('/nft-wallets/my-nft-wallet');

      if (response?.data?.success) {
        setNFTWallet(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    getNftWalletsData();
  }, []);

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
      const popup = await fetchPopup();
      setPopup(popup);

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

  const [isActivePopup, setIsActivePopup] = useState(false);

  useEffect(() => {
    const hasPopupBeenShown = localStorage.getItem('popupShown');

    if (hasPopupBeenShown) {
      const timer = setTimeout(() => {
        setIsActivePopup(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const openAndClosePopupModal = () => {
    setIsActivePopup(false);
    localStorage.removeItem('popupShown');
  };

  return (
    <DefaultLayout>
      {/* <WelcomeSection
        setGetWallet={setGetWallet}
        wallet={wallet}
        profile={profile}
      /> */}

      {/**
       *
       * TIZARA COIN
       *
       *
       */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-y-5 lg:gap-5">
        {/**
         *
         * Wallets
         *
         *
         */}
        <div className="col-span-4">
          <Wallets wallet={wallet} setGetWallet={setGetWallet} />
        </div>
        <div className="col-span-2 rounded-sm border border-stroke bg-white py-5 px-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* <TizaraCoin setGetWallet={setGetWallet} /> */}
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

      <hr className="my-5 border-success border-[1px]" />

      <div className="  mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6  lg:grid-cols-3  xl:grid-cols-4 2xl:gap-7.5">
        <div className="rounded-md cursor-pointer border border-stroke bg-white py-2 px-3 lg:py-6 lg:px-4.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mt-0 flex items-center justify-between">
            <div className="flex h-10 w-10 lg:h-11.5 lg:w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-3">
              <PiPackage className="text-2xl dark:text-white text-primary" />
            </div>
            <div className="text-end">
              <h4 className="text-[14px] md:text-[20px] font-semibold  text-success">
                {'DOME'}
              </h4>
              <span className="text-sm md:text-[18px] font-medium">
                {`Qty: ${nFTWallet?.dome ?? '0'} ` +
                  `Price: ${nFTWallet?.domePrice ?? '0'}`}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-md cursor-pointer border border-stroke bg-white py-2 px-3 lg:py-6 lg:px-4.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mt-0 flex items-center justify-between">
            <div className="flex h-10 w-10 lg:h-11.5 lg:w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-3">
              <PiPackage className="text-2xl dark:text-white text-primary" />
            </div>

            <div className="text-end">
              <h4 className="text-[14px] md:text-[20px] font-semibold  text-success">
                {'WAGON'}
              </h4>
              <span className="text-sm md:text-[18px] font-medium">
                {`Qty: ${nFTWallet?.wagon ?? '0'} ` +
                  `Price: ${nFTWallet?.wagonPrice ?? '0'}`}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-md cursor-pointer border border-stroke bg-white py-2 px-3 lg:py-6 lg:px-4.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mt-0 flex items-center justify-between">
            <div className="flex h-10 w-10 lg:h-11.5 lg:w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-3">
              <PiPackage className="text-2xl dark:text-white text-primary" />
            </div>

            <div className="text-end">
              <h4 className="text-[14px] md:text-[20px] font-semibold  text-success">
                {'Hotel And Resort'}
              </h4>
              <span className="text-sm md:text-[18px] font-medium">
                {`Qty: ${nFTWallet?.hotelAndResort ?? '0'} ` +
                  `Price: ${nFTWallet?.hotelAndResortPrice ?? '0'}`}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-md cursor-pointer border border-stroke bg-white py-2 px-3 lg:py-6 lg:px-4.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mt-0 flex items-center justify-between">
            <div className="flex h-10 w-10 lg:h-11.5 lg:w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-3">
              <PiPackage className="text-2xl dark:text-white text-primary" />
            </div>

            <div className="text-end">
              <h4 className="text-[14px] md:text-[20px] font-semibold  text-success">
                {'Land'}
              </h4>
              <span className="text-sm md:text-[18px] font-medium">
                {`Qty: ${nFTWallet?.land ?? '0'} ` +
                  `Price: ${nFTWallet?.landPrice ?? '0'}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        {/* <LastestDeposits /> */}
        <div className="mt-5">{/* <LatestPurchaseHistory /> */}</div>
      </div>

      {popup && isActivePopup && popup?.isActive && (
        <PopUpModal
          data={popup}
          isActivePopup={isActivePopup}
          openAndClosePopupModal={openAndClosePopupModal}
        />
      )}
    </DefaultLayout>
  );
};

export default TizaraTokenDashboard;
