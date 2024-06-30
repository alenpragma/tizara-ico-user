import { Key, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { formatToLocalDate } from '../../hooks/formatDate';
import Skeleton from 'react-loading-skeleton';
import axiosInstance from '../../utils/axiosConfig';
import TableRow from '../../components/Tables/TableRow';

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
  data: IStackBonusHistory[];
}

const StakeBonusHistory = () => {
  const [historys, sethistorys] = useState<IStackBonusHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<ApiResponse>(
          '/stack-bonus-history',
        );
        setLoading(false);

        if (response?.data?.success) {
          sethistorys(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Level Reward History" />

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
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default StakeBonusHistory;
