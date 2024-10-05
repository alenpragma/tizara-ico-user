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

const ProfitBounty = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [profitHistorys, setProfitHistorys] = useState([]);

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
        `/profit-bounty/my-bounty-historys?page=${
          currentPage + 1
        }&limit=${perPage}`,
      );
      setLoading(false);
      setProfitHistorys(response?.data?.data?.data);
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
      <Breadcrumb pageName="Profit Bounty History" />

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
                  <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white">
                    SL NO
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Date
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Profit Amount
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    MY Level
                  </th>

                  <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">
                    User
                  </th>

                  <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">
                    Staked Plan
                  </th>

                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Staked Bonus
                  </th>
                </tr>
              </thead>
              <tbody>
                {profitHistorys?.map((profitHistory: any, key: any) => (
                  <tr key={key}>
                    <TableRow data={key + 1} />
                    <TableRow
                      data={formatToLocalDate(profitHistory?.createdAt)}
                    />
                    <TableRow data={profitHistory?.profit} />
                    <TableRow data={`Level ${profitHistory?.level}`} />
                    <TableRow
                      data={profitHistory?.dailyBonus?.userStake?.user?.email}
                    >
                      <span>
                        {profitHistory?.dailyBonus?.userStake?.user?.name}
                      </span>
                    </TableRow>

                    <TableRow
                      data={profitHistory?.dailyBonus?.userStake?.planName}
                    >
                      <span>{`Duration: ${profitHistory?.dailyBonus?.userStake?.duration}`}</span>
                    </TableRow>
                    <TableRow data={profitHistory?.dailyBonus?.dailyRoy} />
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div>{!loading && profitHistorys?.length == 0 && <NotFound />}</div>

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

export default ProfitBounty;
