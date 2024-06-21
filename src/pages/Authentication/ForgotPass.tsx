import { Link } from 'react-router-dom';
import SvgImage from './SvgImage';
import { PuffLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import Swal from 'sweetalert2';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '../../components/Forms/InputField';

type IInput = {
  email: string;
};

const ForgotPass = () => {
  const [loding, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<IInput>();

  const onSubmit: SubmitHandler<IInput> = async (data) => {
    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/forgot-password', data);
      console.log(response, 'this is response');

      if (response) {
        Swal.fire({
          title: 'Success',
          text: 'Password reset email sent successfully',
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
      } else if (error.request) {
        Swal.fire({
          title: 'Error',
          text: 'No response from the server. Please try again later.',
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
      setLoading(false); // Ensure loading is set to false regardless of success or error
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center place-items-center ">
      <div className="w-[90%] md:w-[80%] lg:w-[70%]">
        <div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center">
            <div className="hidden w-full lg:block xl:w-1/2">
              <div className="py-17.5 px-4 text-center">
                <Link
                  className="mb-5.5 flex gap-2 justify-center place-items-center "
                  to="/"
                >
                  <img className="w-10  hidden dark:block" src={''} alt="" />
                  <img className="w-10 dark:hidden" src={''} alt="" />
                  <h2 className="text-2xl font-bold text-black dark:text-white">
                    TIZARA TOKEN
                  </h2>
                </Link>
                <p className="lg:px-5 leading-5">
                  Welcome back to Tizara! Log in to access your personalized
                  dashboard, track your progress, and stay updated with the
                  latest resources. Let's continue your journey towards success!
                  🚀
                </p>

                <SvgImage />
              </div>
            </div>

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-9 text-lg font-bold text-black dark:text-white sm:text-title-md">
                  Reset Password
                </h2>
                <p className="text-white">
                  Enter your email address to receive a password reset link.
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="my-4">
                    {/* <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Email
                    </label> */}
                    <div className="relative">
                      {/* <input
                        {...register('email', { required: true })}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      /> */}
                      <InputField
                        label="Email"
                        name="email"
                        register={register}
                        placeholder="Enter your email"
                      />

                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-5">
                    {!loding ? (
                      <input
                        type="submit"
                        value="Send Password Reset Link"
                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
                      />
                    ) : (
                      <PuffLoader
                        className="mx-auto"
                        color="#36d7b7"
                        size={40}
                      />
                    )}
                  </div>
                  <div className="mt-6 text-center">
                    <p className="font-medium">
                      Don’t have any account?
                      <Link to="/auth/signin" className="text-primary ms-1">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
