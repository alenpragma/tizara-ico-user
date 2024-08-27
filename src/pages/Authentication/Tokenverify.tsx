import React, { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import { baseUrl } from '../../utils/api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SvgImage from './SvgImage';
import { getTizaraUserToken } from '../../hooks/getTokenFromstorage';

const Tokenverify = () => {
  const [loding, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<any>();
  const navigate = useNavigate();

  const [isCooldown, setIsCooldown] = useState(true);
  const [countdown, setCountdown] = useState(40);
  const COOLDOWN_PERIOD = 90; // Cooldown period in seconds

  const onSubmit: SubmitHandler<any> = async (data) => {
    const token = getTizaraUserToken();

    try {
      setLoading(true);

      const response = await fetch(`${baseUrl}/auth/verify-token`, {
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
        localStorage.setItem('tizaraUserToken', responseData?.data?.token);
        Swal.fire({
          title: 'Success',
          text: 'User Verified',
          icon: 'success',
        }).then(() => {
          navigate('/dashboard');
        });
      } else if (responseData.success == false) {
        Swal.fire({
          title: 'Error',
          text: `${responseData?.message}`,
          icon: 'error',
        });
      }
    } catch (error: any) {
      setLoading(false);
      if (error.statusCode == 429) {
        Swal.fire({
          title: 'Error',
          text: 'Too many requests, please try again later',
          icon: 'error',
        });
        setLoading(false);
      }
      console.log(error);
    }
  };

  const resendOpt = async () => {
    const token = getTizaraUserToken();
    // Disable the button and start the cooldown

    const expiryTime = Date.now() + COOLDOWN_PERIOD * 1000;
    localStorage.setItem('otpCooldownExpiry', expiryTime.toString());

    try {
      setLoading(true);

      const response = await fetch(`${baseUrl}/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      setLoading(false);

      const responseData = await response.json();
      if (responseData.success) {
        Swal.fire({
          title: 'Success',
          text: 'Otp Send',
          icon: 'success',
        });
        setIsCooldown(true);
        setCountdown(COOLDOWN_PERIOD);
        return;
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const savedExpiryTime = localStorage.getItem('otpCooldownExpiry');
    if (savedExpiryTime) {
      const remainingTime = (parseInt(savedExpiryTime) - Date.now()) / 1000;
      if (remainingTime > 0) {
        setIsCooldown(true);
        setCountdown(Math.floor(remainingTime)); // Round down to nearest integer
      } else {
        localStorage.removeItem('otpCooldownExpiry');
      }
    }
  }, []);

  useEffect(() => {
    if (isCooldown) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCooldown(false);
            localStorage.removeItem('otpCooldownExpiry');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isCooldown]);
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
                  Check Mail & Enter Your OTP.
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="my-4">
                    <div className="mb-6">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Verification OTP
                      </label>

                      <div className="relative">
                        <input
                          {...register('token', { required: true })}
                          type="string"
                          placeholder="Enter OTP"
                          minLength={6}
                          className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                      <div className="mt-3">
                        {!isCooldown && (
                          <span
                            onClick={() => resendOpt()}
                            className="text-primary cursor-pointer"
                          >
                            Resend OTP
                          </span>
                        )}
                      </div>
                      {isCooldown && (
                        <p>You can request a new OTP in {countdown} seconds</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-5">
                    {!loding ? (
                      <input
                        type="submit"
                        value="Submit"
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

export default Tokenverify;
