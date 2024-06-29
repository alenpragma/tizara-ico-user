import { PuffLoader } from 'react-spinners';
import InputField from '../../components/Forms/InputField';

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
}: any) => {
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
          <input
            type="phone"
            {...register('phone')}
            defaultValue={profile?.phone as string}
            placeholder="Phone"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
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

        {loading ? (
          <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
        ) : (
          <button className="flex px-7 mx-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Submit
          </button>
        )}
      </form>
    </>
  );
};

export default BasicDetails;
