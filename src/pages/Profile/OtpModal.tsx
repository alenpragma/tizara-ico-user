import React, { useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { IPhone } from './PhoneVerifyModal';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '../../components/Forms/InputField';

const OtpModal = ({ closeModal }: any) => {
  // console.log(data);

  const [lodaing, setLodaing] = useState<boolean>(false);

  const [otpModalOpen, setOtpModalOpen] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<IPhone>();

  const onSubmit: SubmitHandler<IPhone> = async (data: IPhone) => {
    console.log(data, 'data');

    setOtpModalOpen(true);
  };

  return (
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto  max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[370px] lg:w-[600px] border-b border-stroke py-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                OTP
              </h2>

              <strong
                className="text-4xl align-center cursor-pointer  hover:text-black dark:hover:text-white"
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <hr />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex  flex-col w-full gap-5.5 p-6.5"
            >
              <InputField
                label="Phone"
                name="phone"
                register={register}
                // defaultValue={data}
                required
              />

              <div className="flex justify-center gap-4">
                <div>
                  {lodaing ? (
                    <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
                  ) : (
                    <button
                      className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Submit
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => closeModal()}
                  className="btn flex justify-center rounded bg-danger py-2 px-6 font-medium text-gray hover:shadow-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {otpModalOpen && <OtpModal />}
    </div>
  );
};

export default OtpModal;
