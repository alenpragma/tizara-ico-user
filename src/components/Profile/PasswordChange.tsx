import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '../Forms/InputField';
import { useState } from 'react';
import { PuffLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import axiosInstance from '../../utils/axiosConfig';
import { logout } from '../../utils/auth';
import { IoEyeOffOutline } from 'react-icons/io5';
import { FiEye } from 'react-icons/fi';

type IChangePass = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const PasswordChange = () => {
  const [loding, setLoading] = useState(false);

  const [passwordVisibleA, setPasswordVisibleA] = useState(false);
  const [passwordVisibleB, setPasswordVisibleB] = useState(false);
  const [passwordVisibleC, setPasswordVisibleC] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IChangePass>();

  const onSubmit: SubmitHandler<IChangePass> = async (data: IChangePass) => {
    if (data?.newPassword != data.confirmPassword) {
      return Swal.fire({
        title: 'Failed',
        text: "New password and confirm pass does't match",
        icon: 'warning',
        timer: 1500,
      });
    }
    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/change-password', data);

      if (response.data.statusCode) {
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'warning',
        });
        logout();
      }
    } catch (error: any) {
      if (error.statusCode) {
        Swal.fire({
          title: 'Failed',
          text: error.message,
          icon: 'warning',
        });
      }
    }

    // reset();
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 px-4 lg:w-[500px]"
      >
        <div className="relative">
          <InputField
            label="Old Password"
            name="oldPassword"
            register={register}
            defaultValue={''}
            required
            error={errors}
            type={passwordVisibleA ? 'text' : 'password'}
          />

          <span
            onClick={() => {
              setPasswordVisibleA(!passwordVisibleA);
            }}
            className="absolute bottom-3 right-3 text-xl"
          >
            {!passwordVisibleA ? <IoEyeOffOutline /> : <FiEye />}
          </span>
        </div>
        <div className="relative">
          <InputField
            label="New Password"
            name="newPassword"
            register={register}
            defaultValue={''}
            required
            error={errors}
            type={passwordVisibleB ? 'text' : 'password'}
          />
          <span
            onClick={() => {
              setPasswordVisibleB(!passwordVisibleB);
            }}
            className="absolute bottom-3 right-3 text-xl"
          >
            {!passwordVisibleB ? <IoEyeOffOutline /> : <FiEye />}
          </span>
        </div>

        <div className="relative">
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            register={register}
            defaultValue={''}
            required
            type={passwordVisibleC ? 'text' : 'password'}
            error={errors}
          />
          <span
            onClick={() => {
              setPasswordVisibleC(!passwordVisibleC);
            }}
            className="absolute bottom-3 right-3 text-xl"
          >
            {!passwordVisibleC ? <IoEyeOffOutline /> : <FiEye />}
          </span>
        </div>

        <div className="mb-5">
          {!loding ? (
            <input
              type="submit"
              value="Update"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
            />
          ) : (
            <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
          )}
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;
