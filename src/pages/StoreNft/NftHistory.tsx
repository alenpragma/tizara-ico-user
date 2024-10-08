import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { formatToLocalDate } from '../../hooks/formatDate';
import NotFound from '../../components/NotFound/NotFound';
import Skeleton from 'react-loading-skeleton';
import TableRow from '../../components/Tables/TableRow';

const NftHistory = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [historys, setHistorys] = useState([]);

  // pagination calculate
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setparePage] = useState(25);

  //  pagination end

  const fetchData = async () => {
    // setLoading(true);
    try {
      const response = await axiosInstance.get('nft-purchese/history');
      setLoading(false);
      console.log(response);

      setHistorys(response?.data?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="NFT History" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {/* <div className="max-w-full w-100 mb-4">
          <SearchInput placeholder="Search..." setSearch={setSearch} />
        </div> */}
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <div>
              <Skeleton height={30} count={6} />
            </div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white  ">
                    SL NO
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white  ">
                    Date
                  </th>

                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white  ">
                    Last Bonus
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white  ">
                    Name
                  </th>

                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white  ">
                    NFT Title
                  </th>

                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white  ">
                    NFT Price
                  </th>

                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white  ">
                    Duration
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white  ">
                    APY
                  </th>

                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white  ">
                    Total Reward
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white  ">
                    Monthly Reward
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white  ">
                    NFT Quantity
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {historys?.map((stake: any, key: any) => (
                  <tr key={key}>
                    <TableRow data={key + 1} />
                    <TableRow data={formatToLocalDate(stake?.createdAt)} />
                    <TableRow
                      data={formatToLocalDate(stake?.lastDistributionDate)}
                    />
                    <TableRow data={stake?.name} />
                    <TableRow data={stake?.title} />
                    <TableRow data={stake?.price} />
                    <TableRow data={`${stake?.duration} Month`} />
                    <TableRow data={stake?.dailyRoi + ' %'} />
                    <TableRow data={stake?.totalRoi} />
                    <TableRow data={stake?.monthlyRoi} />
                    <TableRow data={stake?.quantity} />

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          stake.status == 'ACTIVE'
                            ? 'bg-success text-success'
                            : 'bg-danger text-danger'
                        }`}
                      >
                        {stake.status == 'ACTIVE' ? 'Runing' : 'Closed'}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div>{!loading && historys?.length == 0 && <NotFound />}</div>
      </div>
    </DefaultLayout>
  );
};

export default NftHistory;
