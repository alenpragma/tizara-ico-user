import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axiosInstance from '../../utils/axiosConfig';
import { IMeta } from '../../types/common';

const SpecialRcm = () => {
  const [data, setData] = useState<any>();
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
      const response = await axiosInstance.get(`/pay/get-team-deposit`);
      setLoading(false);
      console.log(response);

      if (response?.data?.success) {
        setData(response?.data?.data);
        // setMeta(response?.data?.data?.meta);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  console.log(data);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Special Rcm" />
      <div className="mt-4 flex gap-3">
        <div className="border border-cyan-600 w-fit  p-3 rounded-md bg-meta-4 font-semibold">
          <p> Last Month Team Depoist</p>
          <p>{data?.teamDeposit?.lastMonthPaymentSumTotal}</p>
        </div>

        <div className="border border-cyan-600 w-fit  p-3 rounded-md bg-meta-4 font-semibold">
          <p> Curent Month Team Depoist</p>
          <p>{data?.teamDeposit?.currentMonthPaymentSumTotal}</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SpecialRcm;
