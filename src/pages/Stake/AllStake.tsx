import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { formatToLocalDate } from '../../hooks/formatDate';
import { IStake } from '../../types/stake';
import NotFound from '../../components/NotFound/NotFound';
import axiosInstance from '../../utils/axiosConfig';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import { IMeta } from '../../types/common';

const AllStake = () => {
  const [loading, setLoading] = useState(false);
  const [stakes, setStakes] = useState<IStake[]>([]);

  // pagination calculate
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setparePage] = useState(25);

  const [meta, setMeta] = useState<IMeta>({
    total: 1,
    page: 1,
    limit: 1,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/stack-now?page=${currentPage + 1}&limit=${perPage}`,
      );
      setLoading(false);
      setStakes(response?.data?.data?.data);
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
      <Breadcrumb pageName="My Staked Tizara" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <div>
              <Skeleton height={30} count={6} />
            </div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white ">
                    SL NO
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white ">
                    Date
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white ">
                    Plan Name
                  </th>

                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white ">
                    Wallet
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white ">
                    Amount
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white ">
                    Duration
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    APY
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Daily Reward
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Start date
                  </th>

                  {/* <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    End Data
                  </th> */}

                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {stakes?.map((stake: IStake, key: any) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark ">
                      <h5 className="font-medium text-black dark:text-white">
                        {key + 1}
                      </h5>
                    </td>
                    {/* <TableRow/> */}
                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark ">
                      <h5 className="font-medium text-black dark:text-white">
                        {formatToLocalDate(stake?.createdAt)}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark ">
                      <h5 className="font-medium text-black dark:text-white">
                        {stake?.planName}
                      </h5>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark ">
                      <h5 className="font-medium text-black dark:text-white">
                        {stake?.wallet}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark ">
                      <h5 className="font-medium text-black dark:text-white">
                        {stake?.stakeAmount}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark ">
                      <h5 className="font-medium text-black dark:text-white">
                        {stake.duration} D
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {stake.apy} %
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {stake.dailyRoy}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {formatToLocalDate(stake.createdAt)}
                      </p>
                    </td>

                    {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {stake.status}
                      </p>
                    </td> */}

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          stake.status == 'ACTIVE'
                            ? 'bg-success text-success'
                            : 'bg-danger text-danger'
                        }`}
                      >
                        {stake.status}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div>{!loading && stakes.length == 0 && <NotFound />}</div>
      </div>
      <div className="my-4">
        <PaginationButtons
          totalPages={Math?.ceil(meta?.total / perPage)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </DefaultLayout>
  );
};

export default AllStake;
