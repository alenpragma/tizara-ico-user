import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import PurchaseHistory from './pages/Purchase/PurchaseHistory';
import ProtectedRoute from './hooks/ProtectedRoute';

const Profile = lazy(() => import('./pages/Profile'));

const PackageSettings = lazy(() => import('./pages/Package/PackageSettings'));

import MyContext from './hooks/MyContext';
import { SkeletonTheme } from 'react-loading-skeleton';
import useColorMode from './hooks/useColorMode';
import Lazyloding from './components/Lazyloding';
import DepositWallet from './pages/WalletHistory/DepositWallet';
import NativeWallet from './pages/WalletHistory/NativeWallet';
import IcoWallet from './pages/WalletHistory/IcoWallet';
import BizTokenDashboard from './pages/Dashboard/TizaraTokenDashboard';
import Transaction from './pages/Transaction/Transaction';
import MyTeam from './pages/MyTeam/MyTeam';
import DepositWalletHistory from './pages/Deposits/DepositWalletHistory';
import BuyTokenHistory from './pages/BuyTokenHistory/BuyTokenHistory';
import Stake from './pages/Stake/Stake';
import AllStake from './pages/Stake/AllStake';
import StakeBonusHistory from './pages/StakeBonusHistory/StakeBonusHistory';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 100);
  // }, []);

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
              path="/dashboard"
              element={
                <>
                  <PageTitle title="Tizara  Dashboard" />
                  <ProtectedRoute>
                    <BizTokenDashboard />
                  </ProtectedRoute>
                </>
              }
            />

            <Route
              path="/stack-coin"
              element={
                <>
                  <PageTitle title="stake coin" />
                  <Stake />
                </>
              }
            />

            <Route
              path="/my-stack-coin"
              element={
                <>
                  <PageTitle title="stake coin" />
                  <AllStake />
                </>
              }
            />

            <Route
              path="/history/stake-bonus-history"
              element={
                <>
                  <PageTitle title=" Stake Bonus History" />
                  <StakeBonusHistory />
                </>
              }
            />

            <Route
              path="/history/transaction-history"
              element={
                <>
                  <PageTitle title="Transaction" />
                  <Transaction />
                </>
              }
            />

            <Route
              path="/my-team"
              element={
                <>
                  <PageTitle title="My Team" />
                  <MyTeam />
                </>
              }
            />

            <Route
              path="/deposit-wallet-history"
              element={
                <>
                  <PageTitle title="Deposit History" />
                  <DepositWalletHistory />
                </>
              }
            />

            <Route
              path="/buy-token-history"
              element={
                <>
                  <PageTitle title="Deposit History" />
                  <BuyTokenHistory />
                </>
              }
            />

            <Route
              path="/history/deposit-wallet"
              element={
                <>
                  <PageTitle title="Deposit Wallet" />
                  <DepositWallet />
                </>
              }
            />

            <Route
              path="/history/native-wallet"
              element={
                <>
                  <PageTitle title="Native Wallet" />
                  <NativeWallet />
                </>
              }
            />

            <Route
              path="/history/Ico-wallet"
              element={
                <>
                  <PageTitle title="Ico Wallet" />
                  <IcoWallet />
                </>
              }
            />

            <Route
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
            />

            <Route
              path="/purchase/purchase-history"
              element={
                <>
                  <PageTitle title="Purchase History" />
                  <ProtectedRoute>
                    <PurchaseHistory />
                  </ProtectedRoute>
                </>
              }
            />

            {/* Packages */}

            {/* Deposits start */}

            {/* <Route
              path="/deposits/all-deposit"
              element={
                <>
                  <PageTitle title="All Deposit" />
                  <Suspense fallback={<Lazyloding />}>
                    <ProtectedRoute>
                      <AllDeposits />
                    </ProtectedRoute>
                  </Suspense>
                </>
              }
            /> */}

            {/* <Route
              path="/deposits/pending-deposit"
              element={
                <>
                  <PageTitle title="Pending Deposit" />
                  <ProtectedRoute>
                    <PendingDeposits />
                  </ProtectedRoute>
                </>
              }
            /> */}
            {/* 
            <Route
              path="/deposits/success-deposit"
              element={
                <>
                  <PageTitle title="Success Deposit" />
                  <ProtectedRoute>
                    <SuccessDeposits />
                  </ProtectedRoute>
                </>
              }
            /> */}
            {/* <Route
              path="/deposits/deposit-settings"
              element={
                <>
                  <PageTitle title="Deposit Settings" />
                  <ProtectedRoute>
                    <DepositSettings />
                  </ProtectedRoute>
                </>
              }
            /> */}

            {/* Deposits  end*/}

            {/* <Route
              path="/withdraw/all-withdraws"
              element={
                <>
                  <PageTitle title="All withdraws" />
                  <ProtectedRoute>
                    <AllWithdraws />
                  </ProtectedRoute>
                </>
              }
            /> */}
            {/* <Route
              path="/withdraw/pending-withdraws"
              element={
                <>
                  <PageTitle title="Pending Withdraws" />
                  <ProtectedRoute>
                    <PendingWithdraws />
                  </ProtectedRoute>
                </>
              }
            /> */}
            {/* <Route
              path="/withdraw/success-withdraws"
              element={
                <>
                  <PageTitle title="Success Withdraws" />
                  <ProtectedRoute>
                    <SuccessWithdraws />
                  </ProtectedRoute>
                </>
              }
            /> */}
            {/* <Route
              path="/payment-settings/deposit-methods"
              element={
                <>
                  <PageTitle title="deposit Methods" />
                  <Suspense fallback={<Lazyloding />}>
                    <ProtectedRoute>
                      <DepositMethods />
                    </ProtectedRoute>
                  </Suspense>
                </>
              }
            /> */}
            {/* <Route
              path="/payment-settings/withdraw-methods"
              element={
                <>
                  <PageTitle title="deposit Methods" />
                  <ProtectedRoute>
                    <WihtdrawMethods />
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
            {/* <Route
              path="/general-settings"
              element={
                <>
                  <PageTitle title="General Settings" />
                  <Suspense fallback={<Lazyloding />}>
                    <ProtectedRoute>
                      <GeneralSettings />
                    </ProtectedRoute>
                  </Suspense>
                </>
              }
            /> */}
            {/* <Route
              path="/bonus-settings"
              element={
                <>
                  <PageTitle title="Bonus Settings" />
                  <ProtectedRoute>
                    <BonusSettings />
                  </ProtectedRoute>
                </>
              }
            /> */}
            {/* <Route
              path="/settings"
              element={
                <>
                  <PageTitle title="Settings" />
                  <Settings />
                </>
              }
            /> */}
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
          </Routes>
        </SkeletonTheme>
      </MyContext.Provider>
    </>
  );
}

export default App;
