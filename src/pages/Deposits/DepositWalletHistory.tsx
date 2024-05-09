import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const DepositWalletHistory = () => {
  const packageData: any[] = [
    {
      name: 'user name',
      email: 'example@gmail.com',
      price: 0.0,
      invoiceDate: `0156666666`,
      refarence: '34522323',
      status: 'Active',
    },
    {
      name: 'user name',
      email: 'example@gmail.com',
      price: 59.0,
      invoiceDate: `0156666666`,
      refarence: '34522323',
      status: 'Active',
    },
    {
      name: 'user name',
      email: 'example@gmail.com',
      price: 99.0,
      invoiceDate: `0156666666`,
      refarence: '34522323',
      status: 'Inactive',
    },
    {
      name: 'user name',
      email: 'example@gmail.com',
      price: 59.0,
      invoiceDate: `0156666666`,
      refarence: '34522323',
      status: 'Active',
    },
  ];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Deposit History" />

      <div className="py-3">
        <button
          // onClick={() => openModalAddNew()}
          className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
          type="submit"
        >
          Deposit
        </button>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {/* <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  SL NO
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Date
                </th>

                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  GateWay
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
          </table> */}
        </div>
        <h2 className="text-center pb-4 text-title-md2 font-semibold text-success dark:text-white">
          In Development
        </h2>
      </div>
    </DefaultLayout>
  );
};

export default DepositWalletHistory;
