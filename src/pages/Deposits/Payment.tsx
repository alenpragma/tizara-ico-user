import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import DepositRequest from './DepositRequest';
import { formatToLocalDate } from '../../hooks/formatDate';
import Skeleton from 'react-loading-skeleton';
import NotFound from '../../components/NotFound/NotFound';
import axiosInstance from '../../utils/axiosConfig';
import TableRow from '../../components/Tables/TableRow';
import MyContext from '../../hooks/MyContext';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import { IMeta } from '../../types/common';

const Payment = () => {
  const { profile } = useContext(MyContext);

  const [depositHistorys, setDepositHistorys] = useState<any>();
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // pagination calculate
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(25);

  const [meta, setMeta] = useState<IMeta>({
    total: 1,
    page: 1,
    limit: 1,
  });

  // edit modal
  const openEditModal = () => {
    setIsDepositModalOpen(true);
  };

  const closeEditModal = () => {
    setIsDepositModalOpen(false);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `pay/get-my-depsit?page=1&limit=${perPage}&userId=${profile.id}`,
      );

      if (response?.data?.success) {
        setDepositHistorys(response?.data?.data);
        setMeta(response?.data?.data?.meta);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Payment History" />

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
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white  ">
                    Name
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Order ID
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
                {depositHistorys?.data?.map(
                  (depositHistory: any, key: string) => {
                    return (
                      <tr key={key}>
                        <TableRow data={Number(key) + 1}></TableRow>

                        <TableRow
                          data={formatToLocalDate(depositHistory?.createdAt)}
                        ></TableRow>

                        <TableRow data={depositHistory?.user?.name}></TableRow>
                        <TableRow data={depositHistory?.orderId}></TableRow>

                        <TableRow
                          data={depositHistory?.payAmountNum}
                        ></TableRow>

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
                  },
                )}
              </tbody>
            </table>
          )}
        </div>
        <div>
          {!loading && depositHistorys?.data?.length == 0 && <NotFound />}
        </div>
      </div>

      <div>
        {isDepositModalOpen && <DepositRequest closeModal={closeEditModal} />}
      </div>
      <PaginationButtons
        totalPages={Math?.ceil(meta?.total / perPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </DefaultLayout>
  );
};

export default Payment;
