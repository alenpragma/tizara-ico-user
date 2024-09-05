import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import BasicDetails from './Profile/BasicDetails';
import { useContext, useEffect, useState } from 'react';
import userImage from '../images/user.jpg';

import axiosInstance from '../utils/axiosConfig';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { baseUrl } from '../utils/api';
import { getTizaraUserToken } from '../hooks/getTokenFromstorage';
import { MdVerifiedUser } from 'react-icons/md';

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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserProfile>();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedAddressFile, setSelectedAddressFile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const token = getTizaraUserToken();
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

  const [selectedFiles, setSelectedFiles] = useState({
    profile: null,
    nidPassFront: null,
    nidPassback: null,
  });

  const fileSelectedHandler = (e: any) => {
    const { name, files } = e.target;
    if (files && files[0].size > 1024 * 1024) {
      // 1 MB limit
      alert('File size should be less than 1 MB');
      e.target.value = ''; // Clear the file input
      return;
    }

    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files[0],
    }));
  };

  const onSubmit: SubmitHandler<any> = async (data: UpdateUserProfile) => {
    const obj: ProfileData = {
      name: data.name || profile!.name,
      phone: data.phone || profile!.phone,
    };

    const profileimg = data['profileImage'];
    const nidPassFront = data['nidPassFront'];
    const nidPassback = data['nidPassback'];

    // delete obj['profileImage'];
    // delete obj['nidPassFront'];
    // delete obj['nidPassback'];

    const wrappedObj = { data: obj };

    const jsondata = JSON.stringify(wrappedObj);

    const formData = new FormData();
    formData.append('profileImage', profileimg[0] as Blob);
    formData.append('nidPassFront', nidPassFront[0] as Blob);
    formData.append('nidPassback', nidPassback[0] as Blob);
    formData.append('data', jsondata);

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/profile/${profile?.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      if (response) {
        setLoading(false);

        Swal.fire({
          title: 'Success',
          text: 'Successfully updated',
          icon: 'success',
        });
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        Swal.fire({
          title: 'Error',
          text: error?.response?.data?.message || 'An error occurred',
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: error?.message || 'An error occurred',
          icon: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* <div className="relative z-20 h-35 md:h-65"></div> */}
        <div className="px-4 mt-4 pb-6 text-center  ">
          <div className=" z-30 mx-auto  h-20 w-20 md:w-40 md:h-40 rounded-full   p-1 backdrop-blur   sm:p-3">
            <div className="relative h-20 w-20 md:w-40 md:h-40 flex mx-auto ">
              <img
                className="h-20 w-20 border border-green-300 md:w-40 md:h-40 rounded-full"
                src={profile?.profileImage ?? userImage}
                alt="profile image"
              />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              <span className="text-meta-3"> My Reffer Code:</span>
              {profile?.myReferralCode}
            </h3>

            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              <p className="text-meta-3 flex justify-center gap-2">
                {profile?.isKycVerifyed ? (
                  <div className="flex">
                    <p>Verified</p>
                    <MdVerifiedUser className="mt-1" />
                  </div>
                ) : (
                  <p>{profile?.kycStatus}</p>
                )}
              </p>
            </h3>
            <div className="mt-2 mx-auto ">
              <div className="lg:flex w-full gap-5 text-start justify-center">
                <BasicDetails
                  onSubmit={onSubmit}
                  control={control}
                  handleSubmit={handleSubmit}
                  fetchData={fetchData}
                  profile={profile}
                  register={register}
                  loading={loading}
                  errors={errors}
                  fileSelectedHandler={fileSelectedHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
