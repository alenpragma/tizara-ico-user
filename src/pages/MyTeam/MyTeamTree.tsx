import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axiosInstance from '../../utils/axiosConfig';
import { IMeta } from '../../types/common';
import TreeView from '../../components/TreeView';
import Loader from '../../common/Loader';
import Lazyloding from '../../components/Lazyloding';
import { PuffLoader } from 'react-spinners';

const MyTeamTree = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  // pagination calculate
  const [currentPage, setCurrentPage] = useState(0);

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
      <Breadcrumb pageName="My Team" />

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
