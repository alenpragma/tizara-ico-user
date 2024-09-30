import { Key, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { formatToLocalDate } from '../../hooks/formatDate';
import Skeleton from 'react-loading-skeleton';
import NotFound from '../../components/NotFound/NotFound';
import axiosInstance from '../../utils/axiosConfig';
import TableRow from '../../components/Tables/TableRow';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import { IMeta } from '../../types/common';

interface IHistory {
  id: string;
  name: string;
  amount: number;
  bonusFrom: string;
  charge: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    data: any;
    meta: IMeta;
  };
}

const Transaction = () => {
  const [history, sethistory] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [meta, setMeta] = useState<IMeta>({
    total: 1,
    page: 1,
    limit: 1,
  });

  // pagination calculate
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setparePage] = useState(25);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<ApiResponse>(
        `/transaction-history?page=${currentPage + 1}&limit=${perPage}`,
      );
      setLoading(false);

      if (response?.data?.success) {
        sethistory(response?.data?.data?.data);
        setMeta(response?.data?.data?.meta);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Transaction History" />

        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex justify-between">
            <div className="max-w-full w-100 mb-4">
              {/* <SearchInput placeholder="Search..." setSearch={setSearch} /> */}
            </div>
          </div>
          <div className="max-w-full overflow-x-auto">
            {loading == true ? (
              <div>
                <Skeleton height={35} count={4} />
              </div>
            ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white">
                      SL NO
                    </th>
                    <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                      Amount
                    </th>

                    <th className="min-w-[290px] py-4 px-4 font-medium text-black dark:text-white">
                      Details
                    </th>

                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history?.map(
                    (user: IHistory, key: Key | null | undefined) => {
                      return (
                        <tr key={key}>
                          <TableRow data={Number(key) + 1}></TableRow>

                          <TableRow data={user.amount}></TableRow>

                          <TableRow data={'Reward from ' + user.bonusFrom} />

                          <TableRow data={formatToLocalDate(user?.createdAt)} />
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            )}
          </div>
          <div>{!loading && history?.length == 0 && <NotFound />}</div>
        </div>
        <div className="my-4">
          <PaginationButtons
            totalPages={Math?.ceil(meta?.total / perPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Transaction;
