import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import { formatToLocalDate } from '../../hooks/formatDate';
import { getTizaraUserToken } from '../../hooks/getTokenFromstorage';
import NotFound from '../../components/NotFound/NotFound';
import Skeleton from 'react-loading-skeleton';

const MyTeam = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = getTizaraUserToken();
      try {
        const response = await axios.get(
          'https://tizara-backend.vercel.app/api/v1/profile/my-team',
          {
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        setLoading(false);

        if (response?.data?.success) {
          setTeams(response?.data?.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Team" />

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
                  <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    SL NO
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Name
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Email
                  </th>

                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Reffer
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Join date
                  </th>
                </tr>
              </thead>
              <tbody>
                {teams?.map((team: any, key: any) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {key + 1}
                      </h5>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {team?.name}
                      </h5>
                      <p className="text-sm">{team?.invoiceDate}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {team?.email}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {team?.myReferralCode}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {formatToLocalDate(team.updatedAt)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div>{!loading && teams?.length == 0 && <NotFound />}</div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MyTeam;
