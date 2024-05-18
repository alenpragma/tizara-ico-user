import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Button from '../../Ui/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getTizaraUserToken } from '../../hooks/getTokenFromstorage';

type Inputs = {
  paymentMethod: string;
  walletNo: string;
  network: string;
  trxId: string;
  amount: string;
  depositMethodId: string;
};
interface ComponentProps {
  fetchData?: () => void;
  closeModal: () => void;
}

const DepositRequest: React.FC<ComponentProps> = ({
  fetchData,
  closeModal,
}) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const [depositMethod, setDepositMethod] = useState<any>();
  const [selectedMethod, setSelectedMethod] = useState<any>();
  const [wallet, setWallet] = useState<any>();
  const token = getTizaraUserToken();

  const getPaymentMethod = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/v1/deposit-method',
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setDepositMethod(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getPaymentMethod();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const { trxId, amount, ...rest } = data;

    const reqData = {
      depositMethodId: wallet.id,
      trxId,
      amount,
    };

    console.log(reqData, token, 'req data');

    try {
      const response = await fetch(
        'http://localhost:5000/api/v1/deposit-request',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(reqData),
        },
      );

      const responseData = await response.json();
      if (responseData.success) {
        if (fetchData) {
          fetchData();
        }
        Swal.fire({
          title: 'success',
          text: 'Deposit request success',
          icon: 'success',
        }).then(() => {
          closeModal();
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'error',
        text: 'Something wrong',
        icon: 'error',
      });
    }
  };

  // Function to set wallet name based on selected method
  useEffect(() => {
    const selectedMethodObject = depositMethod?.data?.find(
      (method: any) => method.id === selectedMethod,
    );
    if (selectedMethodObject) {
      setWallet(selectedMethodObject);
    } else {
      setWallet(undefined);
    }
  }, [selectedMethod, depositMethod]);

  return (
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[350px] md-w-[420px] lg:w-[600px] border-b border-stroke   pb-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-white">Deposit Request</h2>
              <strong
                className="text-3xl align-center dark:text-white  cursor-pointer hover:text-black dark:hover:text-white"
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <hr />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex  flex-col w-full gap-5.5 p-6.5"
            >
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Payment Method
                </label>

                <select
                  id="paymentMethod"
                  onClick={(e: any) => setSelectedMethod(e?.target?.value)}
                  className="py-3 w-full rounded-md dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                >
                  {/* Map through paymentMethods and render options */}
                  {depositMethod?.data?.map((method: any) => (
                    <option className=" " key={method.id} value={method.id}>
                      {method.paymentMethod}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Network
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('network')}
                  value={wallet?.network}
                  readOnly
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Wallet no
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('walletNo')}
                  value={wallet?.walletNo}
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Amount
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('amount', { required: true })}
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Transaction Id
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('trxId', { required: true })}
                />
              </div>

              <Button btnName="Submit" />

              {/* <button className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
              type="submit">
              Update
            </button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositRequest;
