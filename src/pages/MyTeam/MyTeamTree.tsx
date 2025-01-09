import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axiosInstance from '../../utils/axiosConfig';
import TreeView from '../../components/TreeView';
import { PuffLoader } from 'react-spinners';
import Skeleton from 'react-loading-skeleton';

type IStakeCount = {
  totalStake: number;
};

const MyTeamTree = () => {
  const [teams, setTeams] = useState([]);
  const [totalStake, setTotalStake] = useState<IStakeCount>();
  const [loading, setLoading] = useState<boolean>(false);
  const [countLoading, setCountLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/test`);
      setLoading(false);

      if (response?.data?.success) {
        setTeams(response?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchTeamDepositData = async () => {
    setCountLoading(true);
    try {
      const response = await axiosInstance.get(
        `/stake-logs/count-my-downline-stake`,
      );
      setCountLoading(false);

      if (response?.data?.success) {
        setTotalStake(response?.data?.data);
      }
    } catch (error) {
      setCountLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchTeamDepositData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Team" />

      {countLoading && (
        <div className="w-20">
          <Skeleton height={20} count={1} />
          <Skeleton height={20} count={1} />
        </div>
      )}

      {totalStake && (
        <div className="p-2 ">
          <h1 className="text-2xl font-bold mb-4">Total Stake</h1>
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-bold">{totalStake?.totalStake}</h2>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div>
          <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
        </div>
      )}
      <div className="p-2">
        {/* <h1 className="text-2xl font-bold mb-4">User</h1> */}
        <TreeView data={teams} />
      </div>
    </DefaultLayout>
  );
};

export default MyTeamTree;
