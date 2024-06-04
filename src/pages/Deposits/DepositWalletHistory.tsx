import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import DepositRequest from './DepositRequest';
import axios from 'axios';
import { formatToLocalDate } from '../../hooks/formatDate';
import { getTizaraUserToken } from '../../hooks/getTokenFromstorage';
import Skeleton from 'react-loading-skeleton';
import NotFound from '../../components/NotFound/NotFound';

const DepositWalletHistory = () => {
  const [depositHistory, setDepositHistory] = useState<any>();
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const token = getTizaraUserToken();
  const [loading, setLoading] = useState(false);

  // edit modal
  const openEditModal = () => {
    setIsDepositModalOpen(true);
  };

  const closeEditModal = () => {
    setIsDepositModalOpen(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:5000/api/v1/deposit-request',
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setLoading(false);

      if (response?.data?.success) {
        setDepositHistory(response?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Deposit History" />

      <div className="py-3">
        <button
          onClick={() => openEditModal()}
          className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
        >
          Deposit
        </button>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <div>
              <Skeleton height={35} count={6} />
            </div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white ">
                    SL NO
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white  ">
                    Date
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    GateWay
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Network
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Wallet
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Trx ID
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Amount
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {depositHistory?.map((user: any, key: string) => {
                  return (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {Number(key) + 1}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {formatToLocalDate(user?.createdAt)}
                        </h5>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user?.depositMethod?.paymentMethod}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user?.depositMethod?.network}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user?.depositMethod?.walletNo}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user?.trxId}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user?.amount}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p
                          className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                            user?.status === 'APPROVED'
                              ? 'bg-success text-success'
                              : user?.status === 'REJECT'
                              ? 'bg-danger text-danger'
                              : 'bg-warning text-warning'
                          }`}
                        >
                          {user?.status}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <div>
                {!loading && depositHistory?.length == 0 && <NotFound />}
              </div>
            </table>
          )}
        </div>
      </div>

      <div>
        {isDepositModalOpen && (
          <DepositRequest closeModal={closeEditModal} fetchData={fetchData} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default DepositWalletHistory;
