import { PuffLoader } from 'react-spinners';
import { useState } from 'react';
import PhoneVerify from './PhoneVerifyModal';
import OtpModal from './OtpModal';
import FileUploder from '../FileUploder';
import PhoneInput from 'react-phone-number-input';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  password: string;
  referralCode: string;
  myReferralCode: string;
  role: string;
  profileImage: string | null;
  referralCount: number;
  nativeWallet: number;
}

const BasicDetails = ({
  onSubmit,
  handleSubmit,
  register,
  loading,
  profile,
  errors,
  fileSelectedHandler,
}: any) => {
  const [value, setValue] = useState<any>('');

  const [openPhone, setOpenPhone] = useState(false);
  const [openOTPModal, setOpenOTPModal] = useState(false);

  const handleVerifyClick = (e: any) => {
    e.preventDefault();
    setOpenPhone(true);
  };

  const closePhoneModal = () => {
    setOpenPhone(false);
  };
  const closeOtpModal = () => {
    setOpenOTPModal(false);
  };

  // const handleValidate = (valid: boolean) => {
  //   setIsValid(valid);
  // };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 px-4 lg:w-[500px]"
      >
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

            {/* <PhoneInput
              className="w-full rounded-lg border border-stroke dark:text-white  pl-2 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
              international
              // countryCallingCodeEditable={false}
              defaultCountry="US"
              value={value}
              {...register('phone', { required: true })}
              onChange={setValue}
            /> */}

            {!profile?.isPhoneVerifyed ? (
              <button
                className={`${
                  profile?.PhoneVerify
                    ? ' bg-green-500 dark:bg-green-500'
                    : ' bg-red-500 dark:bg-red-500'
                } hidden absolute top-1 right-0 px-4 ml-2 py-2 rounded-lg  text-white disabled:bg-gray-400`}
                onClick={handleVerifyClick}
                disabled={profile?.PhoneVerify}
              >
                Verify
              </button>
            ) : (
              <p
                className={` cursor-pointer bg-green-500 dark:bg-green-500' absolute top-1 right-0 px-3 ml-2 py-2 rounded-lg  text-white disabled:bg-gray-400`}
              >
                Verified
              </p>
            )}
          </div>
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
        <div className="mb-4.5">
          <FileUploder
            type="file"
            label="Profile Image (png, jpg, or jpeg)"
            name="profileImage"
            register={register}
            error={errors.profileImage}
            disabled={profile?.kyc}
            fileSelectedHandler={fileSelectedHandler}
          />
        </div>
        {/* // nid front end */}
        <div className="mb-4.5">
          <div>
            {profile?.isFronNidPassVerifyed && (
              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Nid/Passport Front Page image
                </label>
                <img
                  className="w-22 h-18 rounded-md"
                  src={profile?.nidPassFront}
                  alt=""
                />
              </div>
            )}
          </div>
          {(profile?.kycStatus == 'REJECT' || profile?.kycStatus === null) && (
            <FileUploder
              type="file"
              label="Nid/Passport Front Page image (png, jpg, or jpeg)"
              name="nidPassFront"
              placeholder="image"
              register={register}
              error={errors.nidPassFront}
              disabled={profile?.isKycVerifyed}
              fileSelectedHandler={fileSelectedHandler}
            />
          )}
        </div>
        {/* nid back */}

        <div className="mb-4.5">
          <div>
            {profile?.nidPassback && (
              <label className="mb-2.5 block text-black dark:text-white">
                Nid/Passport back page image
              </label>
            )}
            {profile?.nidPassback && (
              <img
                className="w-22 h-18 rounded-md"
                src={profile?.nidPassback}
                alt=""
              />
            )}
          </div>

          {(profile?.kycStatus == 'REJECT' || profile?.nidPassback == null) && (
            <FileUploder
              type="file"
              label="Nid/Passport back page image (png, jpg, or jpeg)"
              name="nidPassback"
              register={register}
              error={errors?.nidPassback}
              disabled={profile?.isKycVerifyed}
              fileSelectedHandler={fileSelectedHandler}
            />
          )}
        </div>
        {profile?.message && (
          <div>
            <span>Message: </span>
            <span className="text-red-400">{profile?.message}</span>
          </div>
        )}

        {loading ? (
          <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
        ) : (
          <button className="flex px-7 mx-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Submit
          </button>
        )}
      </form>

      {openPhone && (
        <PhoneVerify
          closeModal={closePhoneModal}
          data={profile?.phone}
          setOpenOTPModal={setOpenOTPModal}
        />
      )}
      {openOTPModal && <OtpModal closeModal={closeOtpModal} />}
    </>
  );
};

export default BasicDetails;
