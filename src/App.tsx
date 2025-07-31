import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-phone-number-input/style.css';
import PageTitle from './components/PageTitle';
import ProtectedRoute from './hooks/ProtectedRoute';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';

const Profile = lazy(() => import('./pages/Profile/Profile'));

import { SkeletonTheme } from 'react-loading-skeleton';
import Lazyloding from './components/Lazyloding';
import MyContext from './hooks/MyContext';
import useColorMode from './hooks/useColorMode';
import TizaraTokenDashboard from './pages/Dashboard/TizaraTokenDashboard';
import MyTeam from './pages/MyTeam/MyTeam';
import Transaction from './pages/Transaction/Transaction';
import DepositWallet from './pages/WalletHistory/DepositWallet';
import IcoWallet from './pages/WalletHistory/IcoWallet';
import NativeWallet from './pages/WalletHistory/NativeWallet';
// import DepositWalletHistory from './pages/Deposits/DepositWalletHistory';
import Loader from './common/Loader';
import NotFound from './components/NotFound/NotFound';
import { getTizaraUserToken } from './hooks/getTokenFromstorage';
import ForgotPass from './pages/Authentication/ForgotPass';
import ResetPassword from './pages/Authentication/ResetPassword';
import Tokenverify from './pages/Authentication/Tokenverify';
import BuyTokenHistory from './pages/BuyTokenHistory/BuyTokenHistory';
import ProfitBounty from './pages/Historys/ProfitBounty';
import TransferHistory from './pages/Historys/TransferHistory';
import RoyHistory from './pages/RoyHistory/RoyHistory';
import AllStake from './pages/Stake/AllStake';
import Stake from './pages/Stake/Stake';
import StakeBonusHistory from './pages/StakeBonusHistory/StakeBonusHistory';
import BuyNft from './pages/StoreNft/BuyNft';
import DailyNftRoiHistory from './pages/StoreNft/DailyNftRoiHistory';
import NftHistory from './pages/StoreNft/NftHistory';
import NftlevelBonus from './pages/StoreNft/NftlevelBonus';
import NftProfitBounty from './pages/StoreNft/NftProfitBounty';
import Withdraw from './pages/Transaction/Withdraw';
import Verify from './pages/Verify';
import { logout } from './utils/auth';
import axiosInstance from './utils/axiosConfig';
// import Profile from './pages/Profile/Profile';
import Payment from './pages/Deposits/Payment';
import DepositUsdTransferHistory from './pages/Historys/DepositUsdTransferHistory';
import PaymentSuccess from './pages/PaymentSuccess';
// import SpecialRcm from './pages/SpecialRcm/SpecialRcm';
import { ToastContainer } from 'react-toastify';
import AdminLogin from './pages/Authentication/AdminLogin';
import LogsProfitBounty from './pages/Historys/LogsProfitBounty';
import RankBonus from './pages/Historys/RankBonus';
import Incoice from './pages/Incoice';
import MyTeamTree from './pages/MyTeam/MyTeamTree';
import StakeLogsRewordHistory from './pages/RoyHistory/StakeLogsRewordHistory';
import SpecialRcm from './pages/SpecialRcm/SpecialRcm';
import StakeLogs from './pages/Stake/StakeLogs';
import CreateTicket from './pages/Support/CreateTicket';
import Support from './pages/Support/Support';
import TicketShow from './pages/Support/TicketShow';

function App() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = getTizaraUserToken();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [profile, setProfile] = useState<any | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<any>('/profile');

      if (response?.data?.success) {
        setProfile(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem('userStatus', profile?.isVerified);
    if (
      profile?.isVerified === false &&
      pathname !== '/verify-token' &&
      pathname !== '/auth/signup'
    ) {
      navigate('/');
    }
  }, [profile?.isVerified, pathname]);

  useEffect(() => {
    if (profile?.status === false) {
      logout();
    }
  }, [profile?.status]);

  const [colorMode] = useColorMode();
  const [theme, setTheme] = useState<string | any>(colorMode);
  const contextValues = {
    theme,
    setTheme,
    profile,
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer />
      <MyContext.Provider value={contextValues}>
        <SkeletonTheme
          baseColor={`${colorMode === 'light' ? '#e5e6ea' : '#1d2a39'}`}
          highlightColor="#47566c"
        >
          <Routes>
            <Route
              index
              element={
                <>
                  <PageTitle title="SignIn" />
                  <SignIn />
                </>
              }
            />

            <Route
              path="/verify-token"
              element={
                <>
                  <PageTitle title="verify-token" />
                  <Tokenverify />
                </>
              }
            />
            <Route
              path="/dashboard"
              element={
                <>
                  <PageTitle title="Tizara  Dashboard" />
                  <ProtectedRoute>
                    <TizaraTokenDashboard />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/store-nft/buy-nft"
              element={
                <>
                  <PageTitle title="Buy-NFT" />
                  <ProtectedRoute>
                    <BuyNft />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/store-nft/nft-level-bonus"
              element={
                <>
                  <PageTitle title="NFT-level-bonus" />
                  <ProtectedRoute>
                    <NftlevelBonus />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/store-nft/nft-histor_y"
              element={
                <>
                  <PageTitle title="NFT-History" />
                  <ProtectedRoute>
                    <NftHistory />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/store-nft/nft-roi"
              element={
                <>
                  <PageTitle title="NFT-Roi" />
                  <ProtectedRoute>
                    <DailyNftRoiHistory />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/store-nft/nft-roi-profit-bounty"
              element={
                <>
                  <PageTitle title="NFT-Roi-profit-Bounty" />
                  <ProtectedRoute>
                    <NftProfitBounty />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/store-nft/buy-nft"
              element={
                <>
                  <PageTitle title="Buy-NFT" />
                  <ProtectedRoute>
                    <BuyNft />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/special-rcm/last-sponsors"
              element={
                <>
                  <PageTitle title="last-sponsors" />
                  <ProtectedRoute>
                    <BuyNft />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/stack-coin"
              element={
                <>
                  <PageTitle title="Stake coin" />
                  <ProtectedRoute>
                    <Stake />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/my-stack-coin"
              element={
                <>
                  <PageTitle title="My stake coin" />
                  <ProtectedRoute>
                    <AllStake />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/my-stack-logs"
              element={
                <>
                  <PageTitle title="My stake logs" />
                  <ProtectedRoute>
                    <StakeLogs />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/roi-history"
              element={
                <>
                  <PageTitle title="stake coin" />
                  <ProtectedRoute>
                    <RoyHistory />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/stake-logs-roi"
              element={
                <>
                  <PageTitle title="stake logs roi" />
                  <ProtectedRoute>
                    <StakeLogsRewordHistory />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/profit-bounty-history"
              element={
                <>
                  <PageTitle title="Profit Bounty" />
                  <ProtectedRoute>
                    <ProfitBounty />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/logs-profit-bounty-history"
              element={
                <>
                  <PageTitle title="Stake Logs Profit Bounty" />
                  <ProtectedRoute>
                    <LogsProfitBounty />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/stake-reward"
              element={
                <>
                  <PageTitle title=" Stake reward History" />
                  <ProtectedRoute>
                    <StakeBonusHistory />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/history/transaction-history"
              element={
                <>
                  <PageTitle title="Transaction" />
                  <ProtectedRoute>
                    <Transaction />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/history/withdraw-history"
              element={
                <>
                  <PageTitle title="Swap" />
                  <ProtectedRoute>
                    <Withdraw />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/history/transfer-history"
              element={
                <>
                  <PageTitle title="Transfer" />
                  <ProtectedRoute>
                    <TransferHistory />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/history/usd-transfer-history"
              element={
                <>
                  <PageTitle title="USD Transfer" />
                  <ProtectedRoute>
                    <DepositUsdTransferHistory />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/rank-bonus"
              element={
                <>
                  <PageTitle title="Rank Bonus" />
                  <ProtectedRoute>
                    <RankBonus />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/my-team"
              element={
                <>
                  <PageTitle title="My Team" />
                  <ProtectedRoute>
                    <MyTeamTree />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/my-referrals"
              element={
                <>
                  <PageTitle title="My Referrals" />
                  <ProtectedRoute>
                    <MyTeam />
                  </ProtectedRoute>
                </>
              }
            />

            {/* <Route
              path="/deposit-wallet-history"
              element={
                <>
                  <PageTitle title="Deposit History" />
                  <ProtectedRoute>
                    <DepositWalletHistory />
                  </ProtectedRoute>
                </>
              }
            /> */}

            <Route
              path="/deposit-wallet-history"
              element={
                <>
                  <PageTitle title="Deposit History" />
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/buy-token-history"
              element={
                <>
                  <PageTitle title="Deposit History" />
                  <ProtectedRoute>
                    <BuyTokenHistory />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/history/deposit-wallet"
              element={
                <>
                  <PageTitle title="Deposit Wallet" />
                  <ProtectedRoute>
                    <DepositWallet />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/history/native-wallet"
              element={
                <>
                  <PageTitle title="Native Wallet" />
                  <ProtectedRoute>
                    <NativeWallet />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/history/Ico-wallet"
              element={
                <>
                  <PageTitle title="Ico Wallet" />
                  <ProtectedRoute>
                    <IcoWallet />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/invoice"
              element={
                <>
                  <PageTitle title="invoice" />
                  <Incoice />
                </>
              }
            />

            <Route
              path="/pay/success"
              element={
                <>
                  <PageTitle title="Ico Wallet" />
                  <ProtectedRoute>
                    <PaymentSuccess />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/pay/cancel"
              element={
                <>
                  <PageTitle title="Ico Wallet" />
                  <ProtectedRoute>
                    <PaymentSuccess />
                  </ProtectedRoute>
                </>
              }
            />

            {/* <Route
              path="/package/package-settings"
              element={
                <>
                  <PageTitle title="Package Settings" />
                  <Suspense fallback={<Lazyloding />}>
                    <ProtectedRoute>
                      <PackageSettings />
                    </ProtectedRoute>
                  </Suspense>
                </>
              }
            /> */}

            {/* <Route
              path="/purchase/purchase-history"
              element={
                <>
                  <PageTitle title="Purchase History" />
                  <ProtectedRoute>
                    <PurchaseHistory />
                  </ProtectedRoute>
                </>
              }
            /> */}

            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Profile" />
                  <Suspense fallback={<Lazyloding />}>
                    <Profile />
                  </Suspense>
                </>
              }
            />
            <Route
              path="/special-rcm"
              element={
                <>
                  <PageTitle title="Special rcm" />
                  <SpecialRcm />
                </>
              }
            />

            <Route
              path="/support"
              element={
                <>
                  <PageTitle title="Support" />
                  <Support />
                </>
              }
            />

            <Route
              path="/ticket/show/:id"
              element={
                <>
                  <PageTitle title="Ticket Show" />
                  <TicketShow />
                </>
              }
            />

            <Route
              path="/create-ticket"
              element={
                <>
                  <PageTitle title="Create ticket" />
                  <CreateTicket />
                </>
              }
            />

            <Route
              path="/auth/signin"
              element={
                <>
                  <PageTitle title="Signin" />
                  <SignIn />
                </>
              }
            />
            <Route
              path="/auth/signup"
              element={
                <>
                  <PageTitle title="Signup" />
                  <SignUp />
                </>
              }
            />

            <Route
              path="/auth/forgot-password"
              element={
                <>
                  <PageTitle title="Forgot Password" />
                  <ForgotPass />
                </>
              }
            />

            <Route
              path="/auth/reset-password"
              element={
                <>
                  <PageTitle title="Reset-Password" />
                  <ResetPassword />
                </>
              }
            />

            <Route
              path="/auth/verify"
              element={
                <>
                  <PageTitle title="Reset-Password" />
                  <Verify />
                </>
              }
            />

            <Route
              path="/auth-admin"
              element={
                <>
                  <PageTitle title="" />
                  <AdminLogin />
                </>
              }
            />

            <Route
              path="*"
              element={
                <>
                  <PageTitle title="Not Found" />
                  <NotFound />
                </>
              }
            />
          </Routes>
        </SkeletonTheme>
      </MyContext.Provider>
    </>
  );
}

export default App;
