import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ProtectedRoute from './hooks/ProtectedRoute';
import 'react-loading-skeleton/dist/skeleton.css';

const Profile = lazy(() => import('./pages/Profile'));

import MyContext from './hooks/MyContext';
import { SkeletonTheme } from 'react-loading-skeleton';
import useColorMode from './hooks/useColorMode';
import Lazyloding from './components/Lazyloding';
import DepositWallet from './pages/WalletHistory/DepositWallet';
import NativeWallet from './pages/WalletHistory/NativeWallet';
import IcoWallet from './pages/WalletHistory/IcoWallet';
import TizaraTokenDashboard from './pages/Dashboard/TizaraTokenDashboard';
import Transaction from './pages/Transaction/Transaction';
import MyTeam from './pages/MyTeam/MyTeam';
import DepositWalletHistory from './pages/Deposits/DepositWalletHistory';
import BuyTokenHistory from './pages/BuyTokenHistory/BuyTokenHistory';
import Stake from './pages/Stake/Stake';
import AllStake from './pages/Stake/AllStake';
import StakeBonusHistory from './pages/StakeBonusHistory/StakeBonusHistory';
import RoyHistory from './pages/RoyHistory/RoyHistory';
import ForgotPass from './pages/Authentication/ForgotPass';
import ResetPassword from './pages/Authentication/ResetPassword';
import NotFound from './components/NotFound/NotFound';
import Verify from './pages/Verify';
import Tokenverify from './pages/Authentication/Tokenverify';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [colorMode] = useColorMode();

  const [theme, setTheme] = useState<string | any>(colorMode);

  const contextValues = {
    theme,
    setTheme,
  };

  return (
    <>
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
              path="/my-team"
              element={
                <>
                  <PageTitle title="My Team" />
                  <ProtectedRoute>
                    <MyTeam />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/deposit-wallet-history"
              element={
                <>
                  <PageTitle title="Deposit History" />
                  <ProtectedRoute>
                    <DepositWalletHistory />
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
