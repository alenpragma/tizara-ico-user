import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import DepositRequest from './DepositRequest';
import { userToken } from '../../hooks/getTokenFromstorage';
import axios from 'axios';

const DepositWalletHistory = () => {
  const [isModalOpenAddMethod, setIsModalOpenAddMethod] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // edit modal
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://biztoken.fecotrade.com/api/usdt-add-request',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Deposit History" />

      <div className="py-3">
        <button
          onClick={() => openEditModal()}
          className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
        >
          Deposit
        </button>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white ">
                  SL NO
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white  ">
                  Date
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  GateWay
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Network
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Wallet
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Trx ID
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Amount
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
          <h2 className="text-center pb-4 text-title-md2 font-semibold text-success dark:text-white">
            In Development
          </h2>
        </div>
      </div>

      <div>
        {isEditModalOpen && (
          <DepositRequest closeModal={closeEditModal} fetchData={fetchData} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default DepositWalletHistory;
