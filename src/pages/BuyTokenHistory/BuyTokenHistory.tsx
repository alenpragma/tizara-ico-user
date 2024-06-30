import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { formatToLocalDate } from '../../hooks/formatDate';
import Skeleton from 'react-loading-skeleton';
import NotFound from '../../components/NotFound/NotFound';
import axiosInstance from '../../utils/axiosConfig';
import TableRow from '../../components/Tables/TableRow';

interface IHistory {
  id: string;
  coinAmount: string;
  coinPrice: number;
  userId: string;
  totalPrice: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IHistory;
}

const BuyTokenHistory = () => {
  const [historys, sethistorys] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<ApiResponse>('/buy-token');
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
    <DefaultLayout>
      <Breadcrumb pageName="Buy token history" />

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
                  <th className="min-w-[160px] py-4 px-4 font-medium text-black dark:text-white  ">
                    Coin Amount
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Coin Price
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Total Price
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {historys?.map(
                  (history: IHistory, key: string | null | undefined) => {
                    return (
                      <tr key={key}>
                        <TableRow data={Number(key) + 1}></TableRow>

                        <TableRow data={history.coinAmount}></TableRow>
                        <TableRow data={history.coinPrice}></TableRow>

                        <TableRow data={history.totalPrice}></TableRow>
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
        <div>{!loading && history?.length == 0 && <NotFound />}</div>
      </div>
    </DefaultLayout>
  );
};

export default BuyTokenHistory;
