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
      <Breadcrumb pageName="Deposit Wallet History" />

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
          <table className="w-full table-auto">
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
            <tbody>
              {packageData.map((packageItem, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {key + 1}
                    </h5>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {packageItem.name}
                    </h5>
                    <p className="text-sm">{packageItem.invoiceDate}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.email}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      32asdfsdaf323isdiofui9sdy
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.email}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">01/03/24</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        packageItem.status === 'Active'
                          ? 'bg-success text-success'
                          : packageItem.status === 'Inactive'
                          ? 'bg-danger text-danger'
                          : 'bg-warning text-warning'
                      }`}
                    >
                      {packageItem.status}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DepositWalletHistory;
