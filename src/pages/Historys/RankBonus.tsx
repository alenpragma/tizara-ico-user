import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { IMeta } from '../../types/common';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import NotFound from '../../components/NotFound/NotFound';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Skeleton from 'react-loading-skeleton';
import TableRow from '../../components/Tables/TableRow';
import { formatToLocalDate } from '../../hooks/formatDate';
import StatusBadge from '../../components/Tables/StatusBadge';

const RankBonus = () => {
  const [loading, setLoading] = useState(false);
  const [profitHistorys, setProfitHistorys] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage,] = useState(25);
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
        `/rank/my-ranked-bonus`,
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

  console.log(profitHistorys);


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Rank Bonus History" />

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
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white ">
                    Date
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white ">
                    Email
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white ">
                    Rank
                  </th>
                  <th className="min-w-[120px]  py-4 px-4 font-medium text-black dark:text-white ">
                    Amount
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white ">
                    Desription
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
                    <TableRow data={profitHistory?.user?.email} />
                    <TableRow data={profitHistory?.rank} cx={'uppercase'} />
                    <TableRow data={profitHistory?.bonus} />
                    <TableRow data={profitHistory.desc} />
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

export default RankBonus;
