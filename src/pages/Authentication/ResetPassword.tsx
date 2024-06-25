import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import { SubmitHandler, useForm } from 'react-hook-form';
import SvgImage from './SvgImage';
import { IoLockOpenOutline } from 'react-icons/io5';
import { baseUrl } from '../../utils/api';

type IInput = {
  confirmPassword: string;
  newPassword: string;
};

const ResetPassword = () => {
  const [loding, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<IInput>();

  const navigator = useNavigate();
  // Extract token from URL
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  const onSubmit: SubmitHandler<IInput> = async (data) => {
    console.log(data);
    if (data.newPassword != data.confirmPassword) {
      return alert('password did not match');
    }
    try {
      console.log(token);

      setLoading(true);

      const response = await fetch(`${baseUrl}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);

      setLoading(false);

      if (responseData?.success) {
        Swal.fire({
          title: 'Success',
          text: 'Account recovered',
          icon: 'success',
        }).then(() => {
          navigator('/auth/signin');
        });
      } else if (responseData.success == false) {
        Swal.fire({
          title: 'Error',
          text: `${responseData?.message}`,
          icon: 'error',
        });
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
                  Reset New Password
                </h2>
                <p className="text-white">
                  Enter your email address to receive a password reset link.
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="my-4">
                    <div className="mb-6">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        New Password
                      </label>

                      <div className="relative">
                        <input
                          {...register('newPassword', { required: true })}
                          type={passwordVisible ? 'text' : 'password'}
                          placeholder="New Password"
                          minLength={6}
                          className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />

                        <span
                          onClick={togglePasswordVisibility}
                          className="absolute text-white right-4 top-4"
                        >
                          {passwordVisible ? (
                            <IoLockOpenOutline className="text-2xl" />
                          ) : (
                            <svg
                              className="fill-current text-white"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="#fff"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.5">
                                <path
                                  d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                  fill="#fff"
                                />
                                <path
                                  d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                  fill="#fff"
                                />
                              </g>
                            </svg>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Confirm Password
                      </label>

                      <div className="relative">
                        <input
                          {...register('confirmPassword', { required: true })}
                          type={passwordVisible ? 'text' : 'password'}
                          placeholder="Confirm Password"
                          minLength={6}
                          className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />

                        <span
                          onClick={togglePasswordVisibility}
                          className="absolute text-white right-4 top-4"
                        >
                          {passwordVisible ? (
                            <IoLockOpenOutline className="text-2xl" />
                          ) : (
                            <svg
                              className="fill-current text-white"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="#fff"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.5">
                                <path
                                  d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                  fill="#fff"
                                />
                                <path
                                  d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                  fill="#fff"
                                />
                              </g>
                            </svg>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    {!loding ? (
                      <input
                        type="submit"
                        value="Update"
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
