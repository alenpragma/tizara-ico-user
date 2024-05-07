import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Settings from './pages/Settings';
import AllUsers from './pages/Users/AllUsers';
import ActiveUser from './pages/Users/ActiveUser';
import InacticeUser from './pages/Users/InacticeUser';
import PackageList from './pages/Package/PackageList';
import PendingDeposits from './pages/Deposits/PendingDeposits';
import SuccessDeposits from './pages/Deposits/SuccessDeposits';
import AllWithdraws from './pages/Withdrawls/AllWithdraws';
import PendingWithdraws from './pages/Withdrawls/PendingWithdraws';
import SuccessWithdraws from './pages/Withdrawls/SuccessWithdraws';
import BonusSettings from './pages/BonusSettings';
import DepositSettings from './pages/Deposits/DepositSettings';
import WihtdrawMethods from './pages/PaymentSettings/WihtdrawMethods';
import BizTokenDashboard from './pages/Dashboard/BizTokenDashboard';
import PurchaseHistory from './pages/Purchase/PurchaseHistory';
import ProtectedRoute from './hooks/ProtectedRoute';

const Profile = lazy(() => import('./pages/Profile'));
const GeneralSettings = lazy(() => import('./pages/GeneralSettings'));

const AllDeposits = lazy(() => import('./pages/Deposits/AllDeposits'));
const PackageSettings = lazy(() => import('./pages/Package/PackageSettings'));
const DepositMethods = lazy(
  () => import('./pages/PaymentSettings/DepositMethods'),
);

import MyContext from './hooks/MyContext';
import { SkeletonTheme } from 'react-loading-skeleton';
import useColorMode from './hooks/useColorMode';
import Lazyloding from './components/Lazyloding';
import DepositWallet from './pages/WalletHistory/DepositWallet';
import NativeWallet from './pages/WalletHistory/NativeWallet';
import IcoWallet from './pages/WalletHistory/IcoWallet';

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
            {/* 
            <Route
              index
              element={
                <>
                  <PageTitle title="SignIn" />
                  <SignIn />
                </>
              }
            /> */}

            <Route
              // path="/dashboard"
              index
              element={
                <>
                  <PageTitle title="Tizara Dashboard" />
                  <BizTokenDashboard />
                </>
              }
            />
            <Route
              path="/dashboard"
              element={
                <>
                  <PageTitle title="Tizara Dashboard" />
                  <BizTokenDashboard />
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
              path="/users/all-user"
              element={
                <>
                  <PageTitle title="All Users" />
                  <AllUsers />
                </>
              }
            />

            <Route
              path="/users/active-user"
              element={
                <>
                  <PageTitle title="All Users" />
                  <ActiveUser />
                </>
              }
            />
            <Route
              path="/users/inactive-user"
              element={
                <>
                  <PageTitle title="inactive Users" />
                  <InacticeUser />
                </>
              }
            />

            {/* user end */}

            {/* Packages */}
            <Route
              path="/package/package-list"
              element={
                <>
                  <PageTitle title="package-list" />
                  <ProtectedRoute>
                    <PackageList />
                  </ProtectedRoute>
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

            <Route
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
            />

            <Route
              path="/deposits/pending-deposit"
              element={
                <>
                  <PageTitle title="Pending Deposit" />
                  <ProtectedRoute>
                    <PendingDeposits />
                  </ProtectedRoute>
                </>
              }
            />

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
            />
            <Route
              path="/deposits/deposit-settings"
              element={
                <>
                  <PageTitle title="Deposit Settings" />
                  <ProtectedRoute>
                    <DepositSettings />
                  </ProtectedRoute>
                </>
              }
            />

            {/* Deposits  end*/}

            <Route
              path="/withdraw/all-withdraws"
              element={
                <>
                  <PageTitle title="All withdraws" />
                  <ProtectedRoute>
                    <AllWithdraws />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/withdraw/pending-withdraws"
              element={
                <>
                  <PageTitle title="Pending Withdraws" />
                  <ProtectedRoute>
                    <PendingWithdraws />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/withdraw/success-withdraws"
              element={
                <>
                  <PageTitle title="Success Withdraws" />
                  <ProtectedRoute>
                    <SuccessWithdraws />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
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
            />
            <Route
              path="/payment-settings/withdraw-methods"
              element={
                <>
                  <PageTitle title="deposit Methods" />
                  <ProtectedRoute>
                    <WihtdrawMethods />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Profile" />
                  <Suspense fallback={<Lazyloding />}>
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  </Suspense>
                </>
              }
            />
            <Route
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
            />
            <Route
              path="/bonus-settings"
              element={
                <>
                  <PageTitle title="Bonus Settings" />
                  <ProtectedRoute>
                    <BonusSettings />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <PageTitle title="Settings" />
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/auth/signin"
              element={
                <>
                  <PageTitle title="Signin" />
                  <ProtectedRoute>
                    <SignIn />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/auth/signup"
              element={
                <>
                  <PageTitle title="Signup" />
                  <ProtectedRoute>
                    <SignUp />
                  </ProtectedRoute>
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
