import CardDataStats from '../../components/CardDataStats';
import { PiPackage } from 'react-icons/pi';
import UserIcon from '../../assets/icon/UserIcon';
import { useEffect, useState } from 'react';
import ExchangeModal from './ExchangeModal';
import ConvartModal from './ConvartModal';
import axiosInstance from '../../utils/axiosConfig';
import { ApiResponse } from '../../types/global';
import IconWallet from '../../assets/icon/IconWallet';
import SwapToDeposit from './SwapToDeposit';
import UserToUserDeposit from './UserToUserDeposit';

const Wallets = ({
  setGetWallet,
  wallet,
}: {
  setGetWallet: any;
  wallet: any;
}) => {
  const [isExchangeOpen, setIsExchangeOpen] = useState(false);
  const [isConvartOpen, setIsConvartOpen] = useState(false);
  const [exchangeSetting, setExchangeSetting] = useState();

  const [isSwap, setIsSwap] = useState(false);
  const [isUserToUser, setIsUserToUser] = useState(false);

  const openAndCloseExchangeModal = (data: boolean) => {
    setIsExchangeOpen(data);
  };

  const openAndCloseConvartModal = (data: boolean) => {
    setIsConvartOpen(data);
  };

  const openAndCloseSwapModal = (data: boolean) => {
    setIsSwap(data);
  };
  const openAndCloseUserToUserModal = (data: boolean) => {
    setIsUserToUser(data);
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/exchange-settings');

      if (response?.data?.success) {
        setExchangeSetting(response?.data?.data[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 lg:gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        <div>
          <div className="rounded-md cursor-pointer border border-stroke bg-white py-2 px-3 lg:py-6 lg:px-4.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mt-0 flex items-center justify-between">
              <div className="flex h-10 w-10 lg:h-11.5 lg:w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-3">
                <IconWallet />
              </div>
              <div className="text-end">
                <h4 className="text-[14px] md:text-[20px] font-semibold text-black dark:text-white">
                  {`${
                    wallet?.depositWallet
                      ? wallet?.depositWallet.toFixed(2)
                      : '00'
                  } USD`}
                </h4>
                <p className="text-sm md:text-[18px] font-medium">
                  Deposit Wallet
                </p>
                <button
                  onClick={() => openAndCloseUserToUserModal(true)}
                  className="items-center text-sm mt-2 justify-center rounded-md bg-success py-1.5 px-3 text-center lg:font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-10"
                >
                  Transfer
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-md cursor-pointer border border-stroke bg-white py-2 px-3 lg:py-6 lg:px-4.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mt-0 flex items-center justify-between">
              <div className="flex h-10 w-10 lg:h-11.5 lg:w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-3">
                <IconWallet />
              </div>
              <div className="text-end">
                <h4 className="text-[14px] md:text-[20px] font-semibold text-black dark:text-white">
                  {`${
                    wallet?.nativeWallet
                      ? wallet?.nativeWallet.toFixed(2)
                      : '00'
                  } TIZARA`}
                </h4>
                <p className="text-sm md:text-[18px] font-medium">
                  Native Wallet
                </p>
                <button className="items-center text-sm mt-2 justify-center rounded-md bg-success py-1.5 px-3 text-center lg:font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-10">
                  Stake Now
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <CardDataStats
            title="Native Wallet"
            total={`${
              wallet?.nativeWallet ? wallet?.nativeWallet.toFixed(2) : '00'
            } TIZARA`}
          >
            <PiPackage className="lg:text-2xl dark:text-white text-primary" />
          </CardDataStats>
        </div> */}

        <div>
          <CardDataStats
            title="MY Wallet"
            total={`${
              wallet?.icoWallet ? wallet?.icoWallet.toFixed(2) : '00'
            } TIZARA`}
          >
            <UserIcon />
          </CardDataStats>
        </div>

        <div>
          <CardDataStats
            title="Stake Wallet"
            total={`${
              wallet?.stakeWallet ? wallet?.stakeWallet.toFixed(2) : '00'
            } TIZARA`}
          >
            <PiPackage className="lg:text-2xl dark:text-white text-primary" />
          </CardDataStats>
        </div>

        <div>
          <div className="rounded-md cursor-pointer border border-stroke bg-white py-2 px-3 lg:py-6 lg:px-4.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mt-0 flex items-center justify-between">
              <div className="flex h-10 w-10 lg:h-11.5 lg:w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-3">
                <IconWallet />
              </div>
              <div className="text-end">
                <h4 className="text-[14px] md:text-[20px] font-semibold text-black dark:text-white">
                  {wallet?.newIcoWallet
                    ? wallet?.newIcoWallet.toFixed(2)
                    : '00'}
                </h4>
                <p className="text-sm md:text-[18px] font-medium">ICO Wallet</p>
                {/* <button
                onClick={() => openAndCloseExchangeModal(true)}
                className="items-center mt-2 justify-center rounded-md bg-success py-1.5 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Transfer
              </button> */}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-md cursor-pointer border border-stroke bg-white py-2 px-3 lg:py-6 lg:px-4.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mt-0 flex items-center justify-between">
              <div className="hidden md:block md:flex h-10 w-10 lg:h-11.5 lg:w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-3">
                <IconWallet />
              </div>

              <div className="text-end ms-auto">
                <h4 className="text-[14px] md:text-[20px] font-semibold text-black dark:text-white">
                  {wallet?.nftWallet ? wallet?.nftWallet.toFixed(2) : '00'} USD
                </h4>
                <p className="text-sm md:text-[18px] font-medium">
                  {'NFT Wallet'}
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => openAndCloseSwapModal(true)}
                    className="items-center text-sm mt-2 justify-center rounded-md bg-success py-1.5 px-4 text-center lg:font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-10"
                  >
                    Swap
                  </button>

                  <button
                    onClick={() => setIsConvartOpen(true)}
                    className="items-center text-sm mt-2 justify-center rounded-md bg-success py-1.5 px-4 text-center lg:font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-10"
                  >
                    Convart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div>
        <CardDataStats
          title="Nft Wallet"
          total={`${
            wallet?.nftWallet ? wallet?.nftWallet.toFixed(2) : '00'
          } USD`}
        >
          <PiPackage className="lg:text-2xl dark:text-white text-primary" />
        </CardDataStats>
      </div> */}

        {isExchangeOpen && (
          <ExchangeModal
            wallet={wallet}
            setGetWallet={setGetWallet}
            exchangeSetting={exchangeSetting}
            openAndCloseExchangeModal={openAndCloseExchangeModal}
          />
        )}

        {isConvartOpen && (
          <ConvartModal
            wallet={wallet}
            setGetWallet={setGetWallet}
            openAndCloseConvartModal={openAndCloseConvartModal}
          />
        )}

        {isSwap && (
          <SwapToDeposit
            wallet={wallet}
            setGetWallet={setGetWallet}
            openAndCloseSwapModal={openAndCloseSwapModal}
          />
        )}
        {isUserToUser && (
          <UserToUserDeposit
            wallet={wallet}
            setGetWallet={setGetWallet}
            openAndCloseUserToUserModal={openAndCloseUserToUserModal}
          />
        )}
      </div>
    </>
  );
};

export default Wallets;
