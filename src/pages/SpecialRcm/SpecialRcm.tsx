import { useCallback, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axiosInstance from '../../utils/axiosConfig';
import TableRow from '../../components/Tables/TableRow';
import { formatToLocalDate } from '../../hooks/formatDate';
import Skeleton from 'react-loading-skeleton';
import NotFound from '../../components/NotFound/NotFound';

const SpecialRcm = () => {
  const [refferals, setRefferals] = useState<any>(null);
  const [teamTotalStake, setTeamTotalStake] = useState<any>(null);

  const [loadingRefferals, setLoadingRefferals] = useState<boolean>(false);
  const [loadingTeamDeposit, setLoadingTeamDeposit] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  // Fetch referrals data
  const fetchRefferals = useCallback(async () => {
    setLoadingRefferals(true);
    try {
      const response = await axiosInstance.get(`/special-rcm/last-refferer`);
      if (response?.data?.success) {
        setRefferals(response?.data?.data?.data);
      }
    } catch (err) {
      console.error('Error fetching referrals:', err);
      setError('Failed to fetch referrals.');
    } finally {
      setLoadingRefferals(false);
    }
  }, []);

  // Fetch team deposit data
  const fetchTeamDeposit = useCallback(async () => {
    setLoadingTeamDeposit(true);
    try {
      const response = await axiosInstance.get(
        `/special-rcm/get-total-team-stake`,
      );
      if (response?.data?.success) {
        setTeamTotalStake(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching team deposit:', err);
      setError('Failed to fetch team deposit.');
    } finally {
      setLoadingTeamDeposit(false);
    }
  }, []);

  // Fetch data when the component mounts
  useEffect(() => {
    fetchRefferals();
    fetchTeamDeposit();
  }, [fetchRefferals, fetchTeamDeposit]);

  // Debugging logs
  console.log(refferals);

  const isCurrentMonth = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  };

  const isPreviousMonth = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const previousMonth = new Date();
    previousMonth.setMonth(now.getMonth() - 1);

    return (
      date.getMonth() === previousMonth.getMonth() &&
      date.getFullYear() === previousMonth.getFullYear()
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Special Rcm" />
      <div className="mt-4 flex gap-3">
        <div className="border border-cyan-600 w-fit  p-3 rounded-md bg-meta-4 font-semibold">
          <p> Last Month Team stake</p>
          <p>{teamTotalStake?.lastMonthStakeSumTotal}</p>
        </div>

        <div className="border border-cyan-600 w-fit  p-3 rounded-md bg-meta-4 font-semibold">
          <p> Curent Month Team stake</p>
          <p>{teamTotalStake?.currentMonthStakeSumTotal}</p>
        </div>

        <div className="border border-cyan-600 w-fit  p-3 rounded-md bg-meta-4 font-semibold">
          <p> Last Month total NFT purches</p>
          <p>{teamTotalStake?.lastMonthNFTSum}</p>
        </div>

        <div className="border border-cyan-600 w-fit  p-3 rounded-md bg-meta-4 font-semibold">
          <p> Curent Month NFT purchese</p>
          <p>{teamTotalStake?.currentMonthNFTSum}</p>
        </div>
      </div>

      <>
        <h2 className="text-title-md2 mt-5 font-semibold text-black dark:text-white">
          {'last Refferal'}
        </h2>
        <div className="mt-3 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            {loadingRefferals ? (
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

                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Join date
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Deposit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {refferals?.map((team: any, key: any) => (
                    <tr key={key}>
                      <TableRow data={key + 1}></TableRow>
                      <TableRow data={team.name}></TableRow>
                      <TableRow data={team.email}></TableRow>
                      <TableRow
                        data={formatToLocalDate(team.createdAt)}
                      ></TableRow>

                      <TableRow data={''}>
                        {team?.payment.map((p: any, index: number) => {
                          const isCurrent = isCurrentMonth(p.createdAt);
                          const isPrevious = isPreviousMonth(p.createdAt);

                          return (
                            <span
                              key={p.id || index} // Ensure unique keys
                              className={`${
                                isCurrent ? 'text-green-500 font-bold' : ''
                              } 
                      ${isPrevious ? 'text-red-500 font-bold' : ''}`}
                            >
                              {p.payAmountNum}
                              {index < team.payment.length - 1 && ', '}
                            </span>
                          );
                        })}
                      </TableRow>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div>
              {!loadingRefferals && refferals?.length == 0 && <NotFound />}
            </div>
          </div>
        </div>
      </>
    </DefaultLayout>
  );
};

export default SpecialRcm;
