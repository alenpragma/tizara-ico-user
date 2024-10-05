import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import DepositRequest from './DepositRequest';
import { formatToLocalDate } from '../../hooks/formatDate';
import { getTizaraUserToken } from '../../hooks/getTokenFromstorage';
import Skeleton from 'react-loading-skeleton';
import NotFound from '../../components/NotFound/NotFound';
import axiosInstance from '../../utils/axiosConfig';
import TableRow from '../../components/Tables/TableRow';
import TableRowCopy from '../../components/Tables/TableRowCopy';
import { copyToClipboard, sliceHash } from '../../utils';
import { PiCopyDuotone } from 'react-icons/pi';

const DepositWalletHistory = () => {
  const [depositHistorys, setDepositHistorys] = useState<any>();
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
    try {
      const response = await axiosInstance.get('/deposit-request');

      if (response?.data?.success) {
        setDepositHistorys(response?.data?.data);
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
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white  ">
                    Date
                  </th>

                  {/* <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Wallet
                  </th> */}
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
                {depositHistorys?.map((depositHistory: any, key: string) => {
                  return (
                    <tr key={key}>
                      <TableRow data={Number(key) + 1}></TableRow>

                      <TableRow
                        data={formatToLocalDate(depositHistory?.createdAt)}
                      ></TableRow>

                      {/* <TableRow
                        data={depositHistory?.depositMethod?.paymentMethod}
                      ></TableRow>

                      <TableRow
                        data={depositHistory?.depositMethod?.network}
                      ></TableRow>
                      <TableRow
                        data={depositHistory?.depositMethod?.walletNo}
                      ></TableRow> */}
                      {/* <TableRow data={depositHistory?.trxId}></TableRow> */}

                      <TableRowCopy data={sliceHash(depositHistory?.trxId)}>
                        <PiCopyDuotone
                          className="text-xl cursor-pointer"
                          onClick={() => copyToClipboard(depositHistory?.trxId)}
                        />
                      </TableRowCopy>

                      <TableRow data={depositHistory?.amount}></TableRow>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p
                          className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                            depositHistory?.status === 'APPROVE'
                              ? 'bg-success text-success'
                              : depositHistory?.status === 'REJECT'
                              ? 'bg-danger text-danger'
                              : 'bg-warning text-warning'
                          }`}
                        >
                          {depositHistory?.status}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div>{!loading && depositHistorys?.length == 0 && <NotFound />}</div>
      </div>

      <div>
        {isDepositModalOpen && <DepositRequest closeModal={closeEditModal} />}
      </div>
    </DefaultLayout>
  );
};

export default DepositWalletHistory;
