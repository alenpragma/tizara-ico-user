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

const Kyc = ({ profile, fetchData }: any) => {
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
      if (files[0].size > 1024 * 1024) {
        alert('File size should be less than 1 MB');

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
            {/* // nid front end */}
            <div className="mb-4.5">
              <div>
                <div>
                  {profile?.kycStatus == 'PENDING' ||
                  profile?.kycStatus == 'APPROVE' ? (
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nid/Passport Front Page image
                    </label>
                  ) : (
                    ' '
                  )}
                  <img
                    className="w-40 h-40 rounded-md"
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
                  required
                  fileSelectedHandler={fileSelectedHandler}
                />
              )}
            </div>

            {/* ****** */}
            {/* nid back */}
            {/* ****** */}

            <div className="mb-4.5">
              <div>
                {profile?.kycStatus == 'PENDING' ||
                profile?.kycStatus == 'APPROVE' ? (
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nid/Passport back page image
                  </label>
                ) : (
                  ' '
                )}

                {profile?.nidPassback && (
                  <img
                    className="w-40 h-40 rounded-md"
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
                  required
                  fileSelectedHandler={fileSelectedHandler}
                />
              )}
            </div>

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
                disabled={
                  profile?.kycStatus == 'PENDING' ||
                  profile?.kycStatus == 'APPROVE'
                }
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
