import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';
import { UserProfile } from '../../pages/Profile';
import axiosInstance from '../../utils/axiosConfig';
import Swal from 'sweetalert2';

import image from '../../assets/Default_pfp.jpg';

const ProfileDetails = ({ profile, fetchData }: any) => {
  const [selectedFiles, setSelectedFiles] = useState({
    profile: null,
  });
  const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      if (files[0].size > 1024 * 1024) {
        Swal.fire({
          title: 'Failed',
          text: 'File size should be less than 1 MB',
          icon: 'info',
        });
        e.target.value = '';
        return;
      }

      // Set the selected file in state
      setSelectedFiles((prevFiles) => ({
        ...prevFiles,
        [name]: files[0],
      }));
    }
  };

  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserProfile>();

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const obj = {
      name: data.name || profile!.name,
    };

    const profileimg = data['profileImage'];

    const wrappedObj = { data: obj };

    const jsondata = JSON.stringify(wrappedObj);

    const formData = new FormData();
    if (profileimg) {
      formData.append('profileImage', profileimg[0] as Blob);
    }

    formData.append('data', jsondata);

    try {
      setLoading(true);
      const response = await axiosInstance.patch(
        `/profile/${profile?.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response) {
        setLoading(false);
        fetchData();
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
    <div className="mt-4">
      <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
        <span className="text-meta-3"> My Reffer Code: </span>
        {profile?.myReferralCode}
      </h3>

      {/* <h3 className="mb-1.5 mt-5 text-2xl font-semibold text-black dark:text-white">
        <p className="text-meta-3 flex justify-center gap-2">
          {profile?.isKycVerifyed ? (
            <div className="flex">
              <p>Verified</p>
              <MdVerifiedUser className="mt-1" />
            </div>
          ) : (
            <p className="text-meta-8">
              {profile?.kycStatus == 'REJECT' ? 'REJECTED' : profile?.kycStatus}
            </p>
          )}
        </p>
      </h3> */}

      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 px-4  "
        >
          <div className="relative z-30 mx-auto  h-20 w-20 md:w-40 md:h-40 rounded-full bg-white/20 p-1 backdrop-blur sm:p-3">
            <div className="relative drop-shadow-2">
              <img
                className="min-w-full min-h-full  h-18 w-19 md:w-36 md:h-34  rounded-full "
                src={profile?.profileImage || image}
                alt=" "
              />

              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-6 w-6 lg:h-8.5 lg:w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
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
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  />
                </svg>
                <input
                  type="file"
                  id="profile"
                  className="sr-only"
                  {...register('profileImage')}
                  onChange={fileSelectedHandler}
                />
              </label>
            </div>
          </div>

          <div className="w-full">
            <label className="mb-2.5 block text-black dark:text-white">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              {...register('name')}
              defaultValue={profile?.name as string}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              disabled
              defaultValue={profile?.email as string}
              placeholder="Enter your email address"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Phone
            </label>
            <div className="relative">
              <input
                type="phone"
                {...register('phone')}
                defaultValue={profile?.phone as string}
                placeholder="Phone"
                disabled
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Sponsor
              </label>
              <input
                type="sponsor"
                defaultValue={profile?.referralCode as string}
                disabled
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div>
              <span>Message: </span>
              <span className="text-red-400">{profile?.message}</span>
            </div>

            {loading ? (
              <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
            ) : (
              <button className="flex px-7 mx-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;
