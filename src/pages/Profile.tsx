import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import BasicDetails from './Profile/BasicDetails';
import { useEffect, useState } from 'react';
import axios from 'axios';
import userImage from '../images/user.jpg';

import { getTizaraUserToken } from '../hooks/getTokenFromstorage';
import { baseUrl } from '../utils/api';
import axiosInstance from '../utils/axiosConfig';

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: UserProfile;
}

export interface UserProfile {
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

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse>(`/profile`);

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
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65"></div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-20 w-20 md:w-40 md:h-40 rounded-full bg-white/20 p-1 backdrop-blur   sm:p-3">
            <div className="relative drop-shadow-2">
              <img
                className="w-full rounded-full"
                src={userImage}
                alt="profile"
              />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              <span className="text-meta-3"> My Rank Status:</span> Rare Club
              Member (RCM)
            </h3>

            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              <span className="text-meta-3"> My Reffer Code:</span>{' '}
              {profile?.myReferralCode}
            </h3>
            <div className="mt-2 mx-auto ">
              {/* <!-- Contact Form --> */}
              <div className="lg:flex w-full gap-5 text-start justify-center">
                <BasicDetails profile={profile} />

                {/*  */}
                {/* <AuthDetails /> */}
              </div>
            </div>

            {/* <SocialIcons /> */}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
