import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { SubmitHandler, useForm } from 'react-hook-form';
import SvgImage from './SvgImage';
import { PuffLoader } from 'react-spinners';

import {
  getTizaraUserToken,
  setTizaraUserToken,
} from '../../hooks/getTokenFromstorage';
import { baseUrl } from '../../utils/api';
import { IoLockOpenOutline } from 'react-icons/io5';
import { Captcha } from './Captcha';
import { PiPhone } from 'react-icons/pi';

import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';

type Inputs = {
  email: string;
  password: string;
  phone: string;
  name: string;
  referralCode?: string;
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const SignUp: React.FC = () => {
  const [loding, setLoading] = useState(false);
  const query = useQuery();
  const referralCode = query.get('referralCode');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [enteredVal, setEnteredVal] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [value, setValue] = useState<any>('');
  console.log(value);

  const handleValidate = (valid: boolean) => {
    setIsValid(valid);
  };
  const handleError = (message: string) => {
    setError(message);
  };

  const allowedDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'hotmail.co.uk',
    'hotmail.fr',
    'outlook.com',
  ];

  const isAllowedDomain = (email: string): boolean => {
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
  };
  console.log(errors);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // Swal.fire({
    //   title: 'Website Maintenance Notice',
    //   text: 'Sign Up are temporarily suspended for feature upgrades. Thank you for your patience!',
    //   icon: 'warning',
    // });
    // return;

    if (value && isValidPhoneNumber(value)) {
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Invalid Phone',
        icon: 'error',
      });
      return;
    }

    const isValid = enteredVal.toUpperCase() === captcha.toUpperCase();
    if (!isValid) {
      setError('Captcha verification failed. Please try again.');
    } else {
      setError('');
    }

    if (!isValid) {
      return;
    }

    if (!isAllowedDomain(data.email)) {
      Swal.fire({
        title: 'Error',
        text: 'Invalid Email',
        icon: 'error',
      });
      return;
    }

    if (data.referralCode === '') {
      delete data.referralCode;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/limit/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (responseData.success) {
        setTizaraUserToken(responseData?.data?.token);
        Swal.fire({
          title: 'Thank you',
          html: '<p style="font-size: 14px;">Please Check Your Mail & Confirm Your Registration</p>',
          icon: 'success',
        }).then(() => {
          navigate('/verify-token');
        });
      } else if (!responseData.success) {
        Swal.fire({
          title: 'Error',
          text: `${responseData?.message}`,
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Something wrong',
          icon: 'error',
        });
      }
    } catch (error: any) {
      console.log(error);

      if (error.statusCode == 429) {
        Swal.fire({
          title: 'Error',
          text: 'Too many requests, please try again later',
          icon: 'error',
        });
        setLoading(false);
      }
    }
    setLoading(false);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center place-items-center ">
        <div className="w-[90%] md:w-[80%] lg:w-[70%]">
          <div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center">
              <div className="hidden w-full lg:block lg:w-1/2">
                <div className="py-17.5 px-26 text-center">
                  <Link
                    className="mb-5.5 flex gap-2 justify-center place-items-center "
                    to="/"
                  >
                    <h2 className="text-2xl font-bold text-black dark:text-white">
                      TIZARA TOKEN
                    </h2>
                  </Link>
                  <p className="2xl:px-20 leading-5">
                    Join Tizara today! Start your journey to success with us! 🚀
                  </p>

                  <SvgImage />
                </div>
              </div>

              <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                  <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                    Sign Up to Tizara
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          {...register('name', { required: true })}
                          placeholder="Enter your full name"
                          // className="w-full rounded-lg border-2 border-primary bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                                d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                                fill=""
                              />
                              <path
                                d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Email
                      </label>
                      <div className="relative">
                        <input
                          {...register('email', {
                            required: true,
                            pattern: {
                              value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message:
                                'Entered value does not match email format',
                            },
                          })}
                          type="email"
                          placeholder="Enter your email"
                          className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.email && (
                          <span className="text-red-500" role="alert">
                            {errors.email.message}
                          </span>
                        )}

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
                    <div>
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Phone
                      </label>
                      <div className="phoneInput relative">
                        <PhoneInput
                          className="w-full rounded-lg border bg-inherit border-stroke dark:text-white  pl-2 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                          international
                          // countryCallingCodeEditable={false}
                          defaultCountry="US"
                          value={value}
                          {...register('phone', { required: true })}
                          onChange={setValue}
                        />

                        <span className="absolute right-3 top-3">
                          <PiPhone className="text-2xl" />
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          {...register('password', { required: true })}
                          type={passwordVisible ? 'text' : 'password'}
                          placeholder="Password"
                          minLength={6}
                          className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />

                        <span
                          onClick={togglePasswordVisibility}
                          className="absolute right-4 top-4"
                        >
                          {passwordVisible ? (
                            <IoLockOpenOutline className="text-2xl" />
                          ) : (
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
                                  d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                  fill=""
                                />
                                <path
                                  d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Referral Code (optional)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          {...register('referralCode')}
                          placeholder="Referral"
                          minLength={6}
                          defaultValue={referralCode as string}
                          className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                                d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                                fill=""
                              />
                              <path
                                d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="my-3">
                      <Captcha
                        validate={handleValidate}
                        setError={handleError}
                        setCaptcha={setCaptcha}
                        enteredVal={enteredVal}
                        captcha={captcha}
                        setEnteredVal={setEnteredVal}
                      />
                      {isValid ? (
                        <div style={{ color: 'green' }}>
                          Captcha verified successfully!
                        </div>
                      ) : (
                        <div className="text-red-500">{error}</div>
                      )}
                    </div>

                    <div className="mb-5">
                      {!loding ? (
                        <input
                          type="submit"
                          value="Create account"
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
                      <p>
                        Already have an account?{' '}
                        <Link to="/auth/signin" className="text-primary">
                          Sign in
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
    </>
  );
};

export default SignUp;
