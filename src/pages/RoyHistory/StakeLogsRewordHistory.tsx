import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import { formatToLocalDate } from '../../hooks/formatDate';
import NotFound from '../../components/NotFound/NotFound';
import axiosInstance from '../../utils/axiosConfig';
import TableRow from '../../components/Tables/TableRow';
import { IMeta } from '../../types/common';

export type IROYHistory = {
  id: string;
  planName: string;
  duration: string;
  apy: number;
  stakeAmount: number;
  dailyRoy: number;
  status: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

const StakeLogsRewordHistory = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [royHistorys, setRoyHistorys] = useState<IROYHistory[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setparePage] = useState(25);
  //  pagination end
  const [meta, setMeta] = useState<IMeta>({
    total: 1,
    page: 1,
    limit: 1,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/stake-logs/reward-history?page=${currentPage + 1}&limit=${perPage}`,
      );
      setLoading(false);
      setRoyHistorys(response?.data?.data?.data);
      setMeta(response?.data?.data?.meta);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Stake log Rewards" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full w-100 mb-4">
          {/* <SearchInput placeholder="Search..." setSearch={setSearch} /> */}
        </div>
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <div>
              <Skeleton height={35} count={6} />
            </div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white">
                    SL NO
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Date
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Plan Name
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Stake Amount
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    APY
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Daily Token
                  </th>
                </tr>
              </thead>
              <tbody>
                {royHistorys?.map((purchaseHistory: any, key: any) => (
                  <tr key={key}>
                    <TableRow data={key + 1} />

                    <TableRow
                      data={formatToLocalDate(purchaseHistory?.createdAt)}
                    />

                    <TableRow data={purchaseHistory?.userStake?.planName} />

                    <TableRow data={purchaseHistory?.userStake?.stakeAmount} />

                    <TableRow data={`${purchaseHistory?.userStake?.apy} %`} />

                    <TableRow data={purchaseHistory?.userStake?.dailyRoy} />
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div>{!loading && royHistorys?.length == 0 && <NotFound />}</div>

        <div className="my-4">
          <PaginationButtons
            totalPages={Math?.ceil(meta?.total / perPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default StakeLogsRewordHistory;
