import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import UserIcon from '../../assets/icon/UserIcon';
import { Link } from 'react-router-dom';
import { FaUserCheck } from 'react-icons/fa6';
import { PiPackage } from 'react-icons/pi';

const BizTokenDashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Link to={'/deposit-wallet-history'}>
          <CardDataStats
            title="Deposit Wallet"
            total={'99'}
            // rate="0.95%"
            // levelDown
          >
            <PiPackage className="text-2xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>

        <Link to={'/users/all-user'}>
          <CardDataStats
            title="Native Wallet"
            total={'500 BIZ'}
            // rate="0.95%"
            // levelDown
          >
            <UserIcon />
          </CardDataStats>
        </Link>

        <Link to={'/users/active-user'}>
          <CardDataStats
            title="ICO Wallet"
            total="0"
            // rate="0.95%"
            // levelDown
          >
            <FaUserCheck className="text-xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>

        <Link to={'/package/package-list'}>
          <CardDataStats
            title="My Team"
            total={'0'}
            // rate="0.95%"
            // levelDown
          >
            <PiPackage className="text-2xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>
      </div>

      <div className="mt-5">
        {/* <LastestDeposits /> */}
        <div className="mt-5">{/* <LatestPurchaseHistory /> */}</div>
      </div>
    </DefaultLayout>
  );
};

export default BizTokenDashboard;
