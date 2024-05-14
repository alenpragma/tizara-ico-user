import { useState } from 'react';
import BuyToken from './BuyToken';

const TizaraCoin = () => {
  // edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState();
  // edit

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  return (
    <>
      <div>
        <h2 className="font-semibold text-center pb-4 text-black dark:text-white">
          TIZARA COIN
        </h2>
        <div className=" flex justify-between flex-col ">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-medium text-black dark:text-white">
              <h4 className="">Token Name:</h4>
              <h4 className="">Tizara</h4>
            </div>
            <div className="flex justify-between font-medium text-black dark:text-white">
              <h4 className=" ">Blockchain:</h4>
              <h4 className=" ">Binance</h4>
            </div>

            <div className="flex justify-between font-medium text-black dark:text-white">
              <h4 className=" ">Total Supply:</h4>
              <h4 className=" ">15 Billion</h4>
            </div>

            <div className="flex justify-between font-medium text-black dark:text-white">
              <h4 className=" ">Current Price:</h4>
              <h4 className=" ">$0.001</h4>
            </div>
          </div>
          <button
            onClick={() => openEditModal()}
            className="mt-4 px-10 rounded-full bg-meta-8 py-2.5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Buy
          </button>
        </div>
      </div>

      <div>{isEditModalOpen && <BuyToken closeModal={closeEditModal} />}</div>
    </>
  );
};

export default TizaraCoin;
