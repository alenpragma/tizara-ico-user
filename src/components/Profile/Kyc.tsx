import { useState } from 'react';
import FileUploder from '../../pages/FileUploder';
import Swal from 'sweetalert2';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';
import axiosInstance from '../../utils/axiosConfig';

type UpdateUserProfile = {
  id: string;
  name: string;
  phone: string;
  identificationNo: string;
  profile: any;
  profileImage?: any;
  nidPassFront?: any;
  nidPassback?: any;
};

const Kyc = ({ profile }: any) => {
  console.log(profile);

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserProfile>();

  const [selectedFiles, setSelectedFiles] = useState({
    profile: null,
    nidPassFront: null,
    nidPassback: null,
  });

  const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      // Check if the file size exceeds 1MB (1MB = 1024 * 1024 bytes)
      if (files[0].size > 1024 * 1024) {
        // Display an alert or show a custom error message
        alert('File size should be less than 1 MB');

        // Clear the file input
        e.target.value = ''; // This will reset the file input so no file is selected
        return;
      }

      // Set the selected file in state
      setSelectedFiles((prevFiles) => ({
        ...prevFiles,
        [name]: files[0],
      }));
    }
  };

  const onSubmit: SubmitHandler<any> = async (data: UpdateUserProfile) => {
    const profileimg = data['profileImage'];
    const nidPassFront = data['nidPassFront'];
    const nidPassback = data['nidPassback'];

    const obj = {
      identificationNo: data.identificationNo,
    };

    const wrappedObj = { data: obj };
    const jsondata = JSON.stringify(wrappedObj);

    const formData = new FormData();
    if (profileimg) {
      formData.append('profileImage', profileimg[0] as Blob);
    }
    if (nidPassFront) {
      formData.append('nidPassFront', nidPassFront[0] as Blob);
    }
    if (nidPassback) {
      formData.append('nidPassback', nidPassback[0] as Blob);
    }
    formData.append('data', jsondata);

    const { data: res } = await axiosInstance.get(
      `/profile/identification-check/${data.identificationNo}`,
    );

    if (res?.data && res?.data?.id != profile?.id) {
      return Swal.fire({
        title: 'Error',
        text: res.message,
        icon: 'error',
      });
    }

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
    <>
      <div className="mt-4">
        <h3 className="mb-1.5 text-2xl font-semibold">
          KYC <span className="text-meta-6"> {profile?.kycStatus}</span>
        </h3>

        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 px-4 lg:w-[500px]"
          >
            <div className="mb-4.5">
              <FileUploder
                type="file"
                label="Nid/Passport Front Page image (png, jpg, or jpeg)"
                name="profileImage"
                placeholder="image"
                register={register}
                error={errors.profileImage}
                fileSelectedHandler={fileSelectedHandler}
              />
            </div>

            {/* // nid front end */}
            <div className="mb-4.5">
              <div>
                <div>
                  {/* <label className="mb-2.5 block text-black dark:text-white">
                    Nid/Passport Front Page image
                  </label> */}
                  <img
                    className="w-22 h-18 rounded-md"
                    src={profile?.nidPassFront}
                    alt=""
                  />
                </div>
              </div>

              {profile?.kycStatus == 'PENDING' ||
              profile?.kycStatus == 'APPROVE' ? (
                ' '
              ) : (
                <FileUploder
                  type="file"
                  label="Nid/Passport Front Page image (png, jpg, or jpeg)"
                  name="nidPassFront"
                  placeholder="image"
                  register={register}
                  error={errors.nidPassFront}
                  // disabled={
                  //   profile?.kycStatus == 'PENDING' ||
                  //   profile?.kycStatus == 'APPROVE'
                  // }
                  fileSelectedHandler={fileSelectedHandler}
                />
              )}
            </div>

            {/* ****** */}
            {/* nid back */}
            {/* ****** */}

            <div className="mb-4.5">
              <div>
                {/* {profile?.nidPassback && (
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nid/Passport back page image
                  </label>
                )} */}
                {profile?.nidPassback && (
                  <img
                    className="w-22 h-18 rounded-md"
                    src={profile?.nidPassback}
                    alt=""
                  />
                )}
              </div>

              {profile?.kycStatus == 'PENDING' ||
              profile?.kycStatus == 'APPROVE' ? (
                ''
              ) : (
                <FileUploder
                  type="file"
                  label="Nid/Passport back page image (png, jpg, or jpeg)"
                  name="nidPassback"
                  register={register}
                  error={errors?.nidPassback}
                  // disabled={
                  //   profile?.kycStatus == 'PENDING' ||
                  //   profile?.kycStatus == 'APPROVE'
                  // }
                  fileSelectedHandler={fileSelectedHandler}
                />
              )}
            </div>
            {/* {profile?.message && (
              <div>
                <span>Message: </span>
                <span className="text-red-400">{profile?.message}</span>
              </div>
            )} */}

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Identification No
              </label>
              <input
                type="identificationNo"
                required
                {...register('identificationNo')}
                disabled={
                  profile?.kycStatus == 'PENDING' ||
                  profile?.kycStatus == 'APPROVE'
                }
                defaultValue={profile?.identificationNo}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            {loading ? (
              <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
            ) : (
              <button
                disabled
                className="flex px-7 mx-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Kyc;
