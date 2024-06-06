import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import { getTizaraUserToken } from '../../hooks/getTokenFromstorage';
import axios from 'axios';
import SearchInput from '../../components/SearchInput';
import Skeleton from 'react-loading-skeleton';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import { formatToLocalDate } from '../../hooks/formatDate';
import NotFound from '../../components/NotFound/NotFound';

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

const RoyHistory = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [royHistorys, setRoyHistorys] = useState<IROYHistory[]>([]);
  console.log(royHistorys);

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setparePage] = useState(25);
  const token = getTizaraUserToken();
  const from = currentPage * perPage;
  const to = from + perPage;
  //  pagination end

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://tizara-backend.vercel.app/api/v1/roy-bonus-historys',
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setLoading(false);
      setRoyHistorys(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const filteredRoyHistorys = royHistorys?.filter(
  //   (royHistorys) => royHistorys?.dailyRoy == search,
  // );

  console.log(royHistorys);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="ROI History" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full w-100 mb-4">
          <SearchInput placeholder="Search..." setSearch={setSearch} />
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
                  <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    SL NO
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Date
                  </th>
                  {/* <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Email
                  </th> */}
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
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
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {key + 1}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {formatToLocalDate(purchaseHistory?.createdAt)}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {purchaseHistory?.userStake?.planName}
                      </h5>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {purchaseHistory?.userStake?.stakeAmount}
                      </h5>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {purchaseHistory?.userStake?.apy}
                      </h5>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {purchaseHistory?.userStake?.dailyRoy}
                      </h5>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div>{!loading && royHistorys?.length == 0 && <NotFound />}</div>

        <div className="my-4">
          <PaginationButtons
            totalPages={Math.ceil(royHistorys.length / perPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RoyHistory;
