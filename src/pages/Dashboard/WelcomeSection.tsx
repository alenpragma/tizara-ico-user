import { useState } from 'react';
import DepositRequest from '../Deposits/DepositRequest';
import Swal from 'sweetalert2';
import { FaRegCopy } from 'react-icons/fa6';
import userImage from '../../images/user.jpg';

const WelcomeSection = ({ profile }: any) => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

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
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopySuccess('Copy failed');
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row  gap-4 py-4 lg:place-items-center justify-between">
        <div className="flex  lg:place-items-center flex-col lg:flex-row gap-3 ">
          <img src={userImage} alt="" className="w-30 h-30 rounded-full" />
          <div>
            <h2 className="text-title-md capitalize lg:text-2xl font-semibold">
              Welcome to Tizara, {profile?.name}!
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
          <div className="flex gap-2">
            <button
              onClick={() => openEditModal()}
              className="items-center justify-center rounded-md bg-meta-6 py-2 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Deposit
            </button>

            <button className="items-center justify-center rounded-md bg-success py-2 px-7 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
              Swap
            </button>
          </div>
        </div>
      </div>
      <div>
        {isDepositModalOpen && <DepositRequest closeModal={closeEditModal} />}
      </div>
    </>
  );
};

export default WelcomeSection;
