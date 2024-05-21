import { Key, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { formatToLocalDate } from '../../hooks/formatDate';
import Skeleton from 'react-loading-skeleton';

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
  data: IHistory;
}

const Transaction = () => {
  const [history, sethistory] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('tizaraUserToken');
        console.log(token);

        const response = await axios.get<ApiResponse>(
          ' https://tizara-backend.vercel.app/api/v1/transaction-history',
          {
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(response?.data);

        if (response?.data?.success) {
          sethistory(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  console.log(history);

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
                      Amount
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
                  {history?.map(
                    (user: IHistory, key: Key | null | undefined) => {
                      return (
                        <tr key={key}>
                          <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            <h5 className="font-medium text-black dark:text-white">
                              {Number(key) + 1}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                            <h5 className="font-medium text-black dark:text-white">
                              {user.name}
                            </h5>
                            <p className="text-sm">{user.amount}</p>
                          </td>

                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">
                              Bonus from {user.bonusFrom}
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
    </>
  );
};

export default Transaction;
