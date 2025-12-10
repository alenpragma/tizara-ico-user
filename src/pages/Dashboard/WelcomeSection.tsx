import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import DepositRequest from '../Deposits/DepositRequest';
// import ConvartModal from './ConvartModal';
import DepositTizara from '../Deposits/DepositTizara';
import DepositWalletWithdraw from './DepositWalletWithdraw';
import SwapModal from './SwapModal';

const WelcomeSection = ({ setGetWallet, wallet, profile }: any) => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isConvatModalOpen, setIsConvatModalOpen] = useState(false);
  const [isOpenSwapModal, setIsOpenSwapModal] = useState(false);

  const toggleSwapModal = (status: boolean) => {
    setIsOpenSwapModal(status);
  };

  const openConvartModalModal = () => {
    setIsConvatModalOpen(true);
  };

  const closeConvartModalModal = () => {
    setIsConvatModalOpen(false);
  };

  // edit modal
  const openEditModal = () => {
    setIsDepositModalOpen(true);
  };

  const closeEditModal = () => {
    setIsDepositModalOpen(false);
  };
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = async (textToCopy: any) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      Swal.fire({
        title: 'Copyed',
        text: 'Copied success',
        icon: 'success',
        timer: 1200,
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopySuccess('Copy failed');
    }
  };

  const [isDepositWalletWithdraw, setIsDepositWalletWithdraw] = useState(false);
  const [isAutoPay, setIsAutoPay] = useState(false);

  const toggleDepositWalletWithdraw = (data: boolean) => {
    setIsDepositWalletWithdraw(data);
  };

  const toggleAutoPaymentModal = (data: boolean) => {
    setIsAutoPay(data);
  };
  const closeAutoPaymentModal = () => {
    setIsAutoPay(false);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row  gap-4 py-4 lg:place-items-center justify-between">
        <div className="flex  lg:place-items-center flex-col lg:flex-row gap-3 ">
          {/* <div className="flex gap-3">
            <img
              src={profile?.profileImage ?? userImage}
              alt=""
              className="w-30 border-4 h-30 rounded-full"
            />

            {profile?.isRcm && (
              <img
                src={rcmImage}
                alt=""
                className="w-30 border-4 h-30 rounded-full"
              />
            )}
          </div> */}
          <div>
            {/* <p>Address: {profile?.address}</p> */}
            <h2 className="text-title-md capitalize lg:text-2xl font-semibold">
              Welcome to Tizara
              {/* {profile?.name}! */}
            </h2>
            <div className="flex gap-2">
              <p>
                https://official.tizaracoin...reffer=
                {profile?.myReferralCode}
              </p>
              <div
                onClick={() =>
                  copyToClipboard(
                    `https://official.tizaracoin.com/auth/signup?referralCode=${profile?.myReferralCode}`,
                  )
                }
              >
                <FaRegCopy className="text-2xl cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => openEditModal()}
              className="items-center justify-center rounded-md bg-meta-8 py-2 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Deposit
            </button>

            <button
              onClick={() => toggleSwapModal(true)}
              className="items-center justify-center rounded-md bg-success py-2 px-7 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Bridge
            </button>

            {/* <button
              onClick={() => toggleDepositWalletWithdraw(true)}
              // className="items-center justify-center rounded-md bg-success py-2 px-7 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              className="flex items-center justify-center rounded-md bg-success py-2 px-8 text-center font-medium text-white hover:bg-opacity-90 hover:bg-meta-8 transition-all duration-300 ease-in-out"
            >
              Withdraw
            </button> */}

            {/* <div
              onClick={() => toggleAutoPaymentModal(true)}
              className="cursor-pointer px-5 py-2.5 relative rounded group font-medium text-white  inline-block"
            >
              <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-[#10B981] to-[#eacf72]"></span>
              <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#10B981] to-[#eacf72]"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#10B981] to-[#eacf72]"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#10B981] from-[#eacf72]"></span>
              <span className="relative">Payment</span>
            </div> */}

            <div
              onClick={() => toggleDepositWalletWithdraw(true)}
              className="cursor-pointer px-5 py-2.5 relative rounded group font-medium text-white  inline-block"
            >
              <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-[#10B981] to-[#eacf72]"></span>
              <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#10B981] to-[#eacf72]"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#10B981] to-[#eacf72]"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#10B981] from-[#eacf72]"></span>
              <span className="relative">Withdraw</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        {isDepositModalOpen && <DepositRequest closeModal={closeEditModal} />}

        {/* {isConvatModalOpen && (
          <ConvartModal wallet={wallet} closeModal={closeConvartModalModal} />
        )} */}
        {isOpenSwapModal && (
          <SwapModal
            setGetWallet={setGetWallet}
            wallet={wallet}
            toggleSwapModal={toggleSwapModal}
          />
        )}

        {isDepositWalletWithdraw && (
          <DepositWalletWithdraw
            wallet={wallet}
            setGetWallet={setGetWallet}
            openAndCloseSwapModal={toggleDepositWalletWithdraw}
          />
        )}

        {isAutoPay && <DepositTizara closeModal={closeAutoPaymentModal} />}
      </div>
    </>
  );
};

export default WelcomeSection;
