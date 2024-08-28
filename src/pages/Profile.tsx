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
import MyContext from '../hooks/MyContext';
import InputField from '../components/Forms/InputField';

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

    // console.log(obj);
    // for (const key in obj) {
    //   if (obj[key] === '') {
    //     delete obj[key];
    //   }
    // }
    // console.log(obj);

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

    // data.email = '';

    // if (obj.phone.length < 9) {
    //   Swal.fire({
    //     title: 'Error',
    //     text: 'Phone is too short',
    //     icon: 'error',
    //   });
    //   return;
    // }
    // Object.keys(data).forEach((key) => {
    //   const value = data[key as keyof UpdateUserProfile]; // Access the value using the key and type assertion

    //   // If the value is not an empty string, convert it to a number
    //   if (value === '') {
    //     delete data[key as keyof UpdateUserProfile];
    //   }
    // });

    // if (Object.keys(data).length === 0) {
    //   console.log('empty');
    //   return;
    // }
    // console.log(data);

    try {
      const response = await fetch(`${baseUrl}/profile/${profile?.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });
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
                className="h-20 w-20 md:w-40 md:h-40 rounded-full"
                src={profile?.profileImage ?? userImage}
                alt="profile"
              />

              {/* <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill=""
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  ></path>
                </svg>
                <input
                  type="file"
                  name="file"
                  id="profile"
                  className="sr-only"
                  onChange={fileSelectedHandler}
                />
              </label> */}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              <span className="text-meta-3"> My Reffer Code:</span>{' '}
              {profile?.myReferralCode}
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
                  // fileSelectedHandler={fileSelectedHandler}
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
