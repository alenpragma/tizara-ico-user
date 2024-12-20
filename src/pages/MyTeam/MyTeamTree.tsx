import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axiosInstance from '../../utils/axiosConfig';
import { IMeta } from '../../types/common';
import TreeView from '../../components/TreeView';

const MyTeamTree = () => {
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
      const response = await axiosInstance.get(`/test`);
      setLoading(false);
      console.log(response?.data?.data);

      if (response?.data?.success) {
        setTeams(response?.data?.data);
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

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">User Tree View</h1>
        <TreeView data={teams} />
      </div>
    </DefaultLayout>
  );
};

export default MyTeamTree;
