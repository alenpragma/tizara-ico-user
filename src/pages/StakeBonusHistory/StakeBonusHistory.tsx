import { Key, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { formatToLocalDate } from '../../hooks/formatDate';
import Skeleton from 'react-loading-skeleton';
import axiosInstance from '../../utils/axiosConfig';
import TableRow from '../../components/Tables/TableRow';
import { IMeta } from '../../types/common';
import PaginationButtons from '../../components/Pagination/PaginationButtons';

interface IStackBonusHistory {
  id: string;

  bonusAmount: string;
  email: string;
  level: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    data: IStackBonusHistory[];
    meta: IMeta;
  };
}

const StakeBonusHistory = () => {
  const [historys, sethistorys] = useState<IStackBonusHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [meta, setMeta] = useState<IMeta>({
    total: 1,
    page: 1,
    limit: 1,
  });

  // pagination calculate
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setparePage] = useState(25);
  // pagination calculate

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<ApiResponse>(
        `/stack-bonus-history?page=${currentPage + 1}&limit=${perPage}`,
      );

      if (response?.data?.success) {
        sethistorys(response.data.data.data);
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
  }, [currentPage]);
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Stake Level Reward" />

        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            {loading == true ? (
              <div>
                <Skeleton height={40} count={3} />
              </div>
            ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white">
                      SL NO
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Amount
                    </th>

                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Details
                    </th>

                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Details
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {historys?.map(
                    (
                      history: IStackBonusHistory,
                      key: Key | null | undefined,
                    ) => {
                      return (
                        <tr key={key}>
                          <TableRow data={Number(key) + 1}></TableRow>
                          <TableRow data={history?.bonusAmount}></TableRow>
                          <TableRow
                            data={'Reward from ' + history?.email}
                          ></TableRow>
                          <TableRow
                            data={'My level ' + history?.level}
                          ></TableRow>
                          <TableRow
                            data={formatToLocalDate(history?.createdAt)}
                          ></TableRow>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            )}
            {historys.length == 0 && !loading && (
              <p className="text-center p-2">Data Not Found</p>
            )}
          </div>
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

export default StakeBonusHistory;
