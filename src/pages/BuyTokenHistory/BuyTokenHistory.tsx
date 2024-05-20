import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { formatToLocalDate } from '../../hooks/formatDate';
import Skeleton from 'react-loading-skeleton';

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
  const [history, sethistory] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('tizaraUserToken');
        console.log(token);

        const response = await axios.get<ApiResponse>(
          'http://localhost:5000/api/v1/buy-token',
          {
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        if (response?.data?.success) {
          sethistory(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between">
          <div className="max-w-full w-100 mb-4">
            {/* <SearchInput placeholder="Search..." setSearch={setSearch} /> */}
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
          {loading == true ? (
            <div>
              <Skeleton height={40} count={3} />
            </div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    SL NO
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
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
                {history?.map(
                  (user: IHistory, key: string | null | undefined) => {
                    return (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {Number(key) + 1}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {user.coinAmount}
                          </h5>
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {user.coinPrice}
                          </p>
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {user.totalPrice}
                          </p>
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {formatToLocalDate(user?.createdAt)}
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
      </div>
    </DefaultLayout>
  );
};

export default BuyTokenHistory;
