import { useState } from 'react';
import DepositRequest from '../Deposits/DepositRequest';

const WelcomeSection = ({ profile }: any) => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  // edit modal
  const openEditModal = () => {
    setIsDepositModalOpen(true);
  };

  const closeEditModal = () => {
    setIsDepositModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row  gap-4 py-4 lg:place-items-center justify-between">
        <div className="flex  lg:place-items-center flex-col lg:flex-row gap-3 ">
          <img
            className="w-30 h-30 rounded-full"
            src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
            alt=""
          />
          <div>
            <h2 className="text-title-md capitalize lg:text-2xl font-semibold">
              Welcome, {profile?.name}
            </h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
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
