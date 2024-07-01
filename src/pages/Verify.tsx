import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseUrl } from '../utils/api';
import { setTizaraUserToken } from '../hooks/getTokenFromstorage';
import logo from '../assets/tizara.png';

interface IInput {
  newPassword: string;
  confirmPassword: string;
}

const Verify: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<IInput>();

  const navigate = useNavigate();
  // Extract token from URL
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  const onSubmit: SubmitHandler<IInput> = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${baseUrl}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      const responseData = await response.json();
      setLoading(false);

      if (responseData?.success) {
        setTizaraUserToken(responseData?.data?.token);

        Swal.fire({
          title: 'success',
          text: 'Register successfull',
          icon: 'success',
        }).then(() => {
          navigate('/dashboard');
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Your verification link has been expired, please submit again',
          icon: 'error',
        }).then(() => {
          navigate('/auth/signup');
        });
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred. Please try again.',
        icon: 'error',
      });
    }
  };

  return (
    <div className=" mt-8 flex justify-center items-center  ">
      <div className="w-[60%] md:w-[60%] lg:w-[500px]">
        <div className=" rounded-sm border border-stroke bg-white shadow-default  ">
          <div className="mt-7  items-center">
            <img className="h-15 mb-2 mx-auto " src={logo} alt="" />

            <div className="mb-5 mx-auto justify-center">
              <h2 className="text-2xl  font-bold text-black text-center">
                TIZARA TOKEN
              </h2>
            </div>
            <form className="flex mb-5" onSubmit={handleSubmit(onSubmit)}>
              <button
                type="submit"
                disabled={loading}
                className="mt-4 mb-5 mx-auto px-10 rounded-lg bg-success py-2.5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
