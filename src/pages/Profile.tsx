import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import BasicDetails from './Profile/BasicDetails';
import { useEffect, useState } from 'react';
import userImage from '../images/user.jpg';

import axiosInstance from '../utils/axiosConfig';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { baseUrl } from '../utils/api';
import { getTizaraUserToken } from '../hooks/getTokenFromstorage';

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
  isRcm: boolean;
  referralCount: number;
  nativeWallet: number;
  createdAt: string;
  updatedAt: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

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

  const { register, handleSubmit } = useForm<UserProfile>();

  const [file, setFile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    // Add other form fields here
  });

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitf = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const token = getTizaraUserToken();

  const handleSubmitFrom = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', file);
    data.append('name', formData.name);

    try {
      const response = await axios.patch(
        `${baseUrl}/profile/${profile?.id}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${token}`,
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const onSubmit: SubmitHandler<any> = async (e: any) => {
    return;
    try {
      const response = await axiosInstance.patch(
        `/profile/${profile?.id}`,
        'formData',
      );
      console.log(response, 'this is response');

      if (response) {
        Swal.fire({
          title: 'Success',
          text: 'Successfully updated',
          icon: 'success',
        });
      }
    } catch (error: any) {
      if (error.response) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message || 'An error occurred',
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: error.message || 'An error occurred',
          icon: 'error',
        });
      }
    } finally {
      // setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />

      {/* <form onSubmit={handleSubmitFrom}>
         <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form> */}

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* <div className="relative z-20 h-35 md:h-65"></div> */}
        <div className="px-4 mt-4 pb-6 text-center  ">
          <div className=" z-30 mx-auto  h-20 w-20 md:w-40 md:h-40 rounded-full bg-white/20 p-1 backdrop-blur   sm:p-3">
            <div className="relative drop-shadow-2"></div>
            {/* {previewUrl && (
              <img
                id="preview"
                src={previewUrl}
                alt="Image Preview"
                style={{ display: 'block', width: '200px', height: 'auto' }}
              />
            )} */}
            <div className="relative flex drop-shadow-2">
              {profile?.profileImage && (
                <img
                  className=" h-20 w-20 md:w-40 md:h-[135px] rounded-full"
                  src={profile?.profileImage}
                  alt="profile"
                />
              )}

              {!profile?.profileImage && (
                <img
                  className="w-full rounded-full"
                  src={userImage}
                  alt="profile"
                />
              )}
            </div>
          </div>

          <div className="mt-4">
            {/* <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              <span className="text-meta-3"> My Rank Status:</span> Rare Club
              Member (RCM)
            </h3> */}

            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              <span className="text-meta-3"> My Reffer Code:</span>{' '}
              {profile?.myReferralCode}
            </h3>
            {/* <input onChange={(e) => setFile(e.target.files)} type="file" /> */}
            <div className="mt-2 mx-auto ">
              {/* <!-- Contact Form --> */}
              <div className="lg:flex w-full gap-5 text-start justify-center">
                <BasicDetails
                  onSubmit={onSubmit}
                  handleSubmit={handleSubmit}
                  fetchData={fetchData}
                  profile={profile}
                  register={register}
                />

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
