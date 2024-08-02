import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Skeleton from 'react-loading-skeleton';
import TableRow from '../../components/Tables/TableRow';
import { formatToLocalDate } from '../../hooks/formatDate';
import NotFound from '../../components/NotFound/NotFound';

const NftlevelBonus = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [purchese, setPurchese] = useState([]);

  // pagination calculate
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setparePage] = useState(25);

  //  pagination end

  const fetchData = async () => {
    // setLoading(true);
    try {
      const response = await axiosInstance.get('/nft-level-bonus');
      setLoading(false);

      setPurchese(response?.data?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="NFT Level Bonus History" />
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
                  <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    SL NO
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Date
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    User
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Amount
                  </th>

                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {purchese?.map((purchese: any, key: any) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {key + 1}
                      </h5>
                    </td>

                    <TableRow data={formatToLocalDate(purchese?.createdAt)} />
                    <TableRow data={`Bonus from ${purchese?.email}`} />
                    <TableRow data={purchese?.bonusAmount} />
                    <TableRow data={'level ' + purchese?.level} />

                    <TableRow data={purchese?.duration} />
                    <TableRow data={purchese?.dailyRoi} />
                    {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        purchese.status == 'ACTIVE'
                          ? 'bg-success text-success'
                          : 'bg-danger text-danger'
                      }`}
                    >
                      {purchese.status}
                    </p>
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div>{!loading && purchese.length == 0 && <NotFound />}</div>
      </div>
    </DefaultLayout>
  );
};

export default NftlevelBonus;
