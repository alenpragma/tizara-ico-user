import React, { useState } from 'react';
import InputField from '../../components/Forms/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';
import SelectOptions from '../../Ui/SelectOptions';

// depositWallet;
// icoWallet;
// stakeWallet;

// nativeWallet;
// newIcoWallet;
// nftWallet;

const ConvartModal = ({ wallet, closeModal }: any) => {
  // console.log(data);
  const [lodaing, setLodaing] = useState<boolean>(false);
  const [otpModalOpen, setOtpModalOpen] = useState<boolean>(false);

  const walletOptions = [
    {
      balance: `${wallet?.nativeWallet}`,
      value: 'nativeWallet',
      label: `Native wallet ${wallet?.nativeWallet}`,
    },
    {
      balance: `${wallet?.newIcoWallet}`,
      value: 'newIcoWallet',
      label: `ICO wallet ${wallet?.newIcoWallet}`,
    },
    {
      balance: `${wallet?.nftWallet}`,
      value: 'nftWallet',
      label: `NFT wallet  $${wallet?.nftWallet}`,
    },
  ];

  const { register, handleSubmit, control } = useForm<any>();
  const [selectedWallet, setSelectedWallet] = useState();

  const handleSelectChange = (selectedOption: any) => {
    setSelectedWallet(selectedOption.value);
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log(data);

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
                Convart to My wallet
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
              <SelectOptions
                name="wallet"
                control={control}
                defaultValue={'Select Wallet'}
                label="Wallet"
                options={walletOptions}
                placeholder="Wallet"
                onChange={handleSelectChange}
              />

              {selectedWallet == 'nftWallet' && (
                <InputField
                  label="Usd"
                  name="usd"
                  register={register}
                  required
                />
              )}

              <InputField
                label="Amount"
                name="amount"
                register={register}
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
    </div>
  );
};

export default ConvartModal;
