import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { formatToLocalDate } from '../../hooks/formatDate';
import NotFound from '../../components/NotFound/NotFound';
import Skeleton from 'react-loading-skeleton';
import axiosInstance from '../../utils/axiosConfig';
import TableRow from '../../components/Tables/TableRow';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import { IMeta } from '../../types/common';

const MyTeam = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

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
        `/profile/my-team?page=${currentPage + 1}&limit=${perPage}`,
      );
      setLoading(false);

      if (response?.data?.success) {
        setTeams(response?.data?.data?.data);
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
    <DefaultLayout>
      <Breadcrumb pageName="My Referrals" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <div>
              <Skeleton height={30} count={10} />
            </div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white">
                    SL NO
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Name
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Email
                  </th>

                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Refer-Code
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                    Join date
                  </th>
                </tr>
              </thead>
              <tbody>
                {teams?.map((team: any, key: any) => (
                  <tr key={key}>
                    <TableRow data={key + 1}></TableRow>
                    <TableRow data={team.name}></TableRow>
                    <TableRow data={team.email}></TableRow>
                    <TableRow data={team.myReferralCode}></TableRow>
                    <TableRow
                      data={formatToLocalDate(team.updatedAt)}
                    ></TableRow>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div>{!loading && teams?.length == 0 && <NotFound />}</div>
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
  );
};

export default MyTeam;
