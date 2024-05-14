import { Link } from 'react-router-dom';
import CardDataStats from '../../components/CardDataStats';
import { PiPackage } from 'react-icons/pi';
import UserIcon from '../../assets/icon/UserIcon';

const Wallets = ({ profile }: any) => {
  return (
    <div className="grid grid-cols-2 gap-2 lg:gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
      <Link to={'/'}>
        <CardDataStats
          title="Deposit Wallet"
          total={`${
            profile?.wallet?.depositWallet
              ? profile?.wallet?.depositWallet
              : '00'
          } TIZARA`}
          // rate="0.95%"
          // levelDown
        >
          <PiPackage className="lg:text-2xl dark:text-white text-primary" />
        </CardDataStats>
      </Link>

      <Link to={'/'}>
        <CardDataStats
          title="Native Wallet"
          total={`${
            profile?.wallet?.depositWallet
              ? profile?.wallet?.depositWallet
              : '00'
          } TIZARA`}
          // rate="0.95%"
          // levelDown
        >
          <PiPackage className="lg:text-2xl dark:text-white text-primary" />
        </CardDataStats>
      </Link>

      <Link to={'/'}>
        <CardDataStats
          title="ICO Wallet"
          total={`${
            profile?.wallet?.nativeWallet ? profile?.wallet?.nativeWallet : '00'
          } TIZARA`}
          // rate="0.95%"
          // levelDown
        >
          <UserIcon />
        </CardDataStats>
      </Link>

      <Link to={'/'}>
        <CardDataStats
          title="Stack Wallet"
          total={`${
            profile?.wallet?.depositWallet
              ? profile?.wallet?.depositWallet
              : '00'
          } TIZARA`}
          // rate="0.95%"
          // levelDown
        >
          <PiPackage className="lg:text-2xl dark:text-white text-primary" />
        </CardDataStats>
      </Link>
    </div>
  );
};

export default Wallets;
