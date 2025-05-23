import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ProfileDetails from '../../components/Profile/ProfileDetails';
import PasswordChange from '../../components/Profile/PasswordChange';
import Kyc from '../../components/Profile/Kyc';

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
  isVerified: boolean;
  role: string;
  profileImage: string | null;
  isRcm: boolean;
  isKycVerifyed: boolean;
  kycStatus: any;
  isFronNidPassVerifyed: boolean;
  referralCount: number;
  nativeWallet: number;
  createdAt: string;
  updatedAt: string;
}
export type UpdateUserProfile = {
  id: string;
  name: string;
  phone: string;
  profile: any;
  profileImage?: any;
  nidPassFront?: any;
  nidPassback?: any;
};
interface ProfileData {
  name?: string;
  phone?: string;
  email?: string;
  [key: string]: any; // Allows for additional properties
}
const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get<ApiResponse>('/profile');

      if (response?.data?.success) {
        setProfile(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [activeTab, setActiveTab] = useState('profileDetails');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profileDetails':
        return (
          <div>
            <ProfileDetails fetchData={fetchData} profile={profile} />
          </div>
        );
      case 'passwordUpdate':
        return <PasswordChange></PasswordChange>;
      case 'kyc':
        return (
          <>
            <Kyc fetchData={fetchData} profile={profile}></Kyc>
          </>
        );
      default:
        return <div>Profile Details Content</div>;
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="w-full max-w-3xl mx-auto mt-8">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-2 w-1/3 text-center ${
                activeTab === 'profileDetails'
                  ? 'border-b-2 border-meta-3 text-meta-3'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('profileDetails')}
            >
              Profile Details
            </button>
            <button
              className={`px-4 py-2 w-1/3 text-center ${
                activeTab === 'kyc'
                  ? 'border-b-2 border-meta-3 text-meta-3'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('kyc')}
            >
              KYC
            </button>
            <button
              className={`px-4 py-2 w-1/3 text-center ${
                activeTab === 'passwordUpdate'
                  ? 'border-b-2 border-meta-3 text-meta-3'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('passwordUpdate')}
            >
              Password Update
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4 p-4 border border-gray-200 rounded-md shadow-md">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
