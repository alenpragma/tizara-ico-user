import { SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';
import InputField from '../../components/Forms/InputField';
// import PhoneInput from 'react-phone-number-input';
import PhoneInput, {
  getCountryCallingCode,
  parsePhoneNumber,
} from 'react-phone-number-input';
import OtpModal from './OtpModal';

export type IPhone = {
  phone: string;
};

const PhoneVerifyModal = ({ closeModal, data, setOpenOTPModal }: any) => {
  console.log(data);

  const [value, setValue] = useState<any>(data);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [lodaing, setLodaing] = useState<boolean>(false);

  // const [value, setValue] = useState('');
  const [country, setCountry] = useState('');

  const handlePhoneChange = (phoneValue: any) => {
    setValue(phoneValue);

    if (phoneValue) {
      const phoneNumber = parsePhoneNumber(phoneValue);
      console.log(phoneNumber);

      setCountry(phoneNumber?.country || '');
    }
  };

  const [otpModalOpen, setOtpModalOpen] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<IPhone>();

  const onSubmit: SubmitHandler<IPhone> = async (data: IPhone) => {
    console.log(value, 'data');

    setOpenOTPModal(true);
    closeModal();
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
                Verify Phone Number
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
              {/* <InputField
                label="Phone"
                name="phone"
                register={register}
                defaultValue={data}
                // onChange={handleChange}
                required
              /> */}

              <div className="phoneInput relative">
                <PhoneInput
                  className="w-full rounded-lg border border-stroke dark:text-white pl-2 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  international
                  defaultCountry="US"
                  name="phone"
                  value={data}
                  register={register}
                  // defaultValue={data}
                  onChange={handlePhoneChange}
                  disabled={isVerified}
                  requirerd
                />
                {country && <div>Selected Country: {country}</div>}
              </div>

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
    </div>
  );
};

export default PhoneVerifyModal;
