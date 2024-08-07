import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Button from '../../Ui/Button';
import { useEffect, useState } from 'react';
import { getTizaraUserToken } from '../../hooks/getTokenFromstorage';
import { baseUrl } from '../../utils/api';
import axiosInstance from '../../utils/axiosConfig';
import { PuffLoader } from 'react-spinners';
import axios from 'axios';

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
  const [loading, setLoading] = useState<boolean>(false);
  const token = getTizaraUserToken();

  const [deposits, setDeposits] = useState<any>(null);
  const [trnx, setTrnx] = useState<any>(null);

  const getMyAllDeposit = async () => {
    try {
      const response = await axiosInstance.get<any>('/deposit-request');
      setDeposits(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getMyTransactions = async () => {
    try {
      const transactionsResponse = await axios.get(
        'https://web3.blockmaster.info/api/get-transactions-native?address=0xCdb866301076ceBB03019fC612a2891D5Da31716',
      );
      setTrnx(transactionsResponse?.data);
    } catch (error) {
      console.error('Error creating address:', error);
    }
  };

  useEffect(() => {
    getMyAllDeposit();
    getMyTransactions();
  }, []);

  useEffect(() => {
    const fetchUniqueData = async () => {
      if (deposits.length > 0 && trnx.length > 0) {
        const uniqueData = trnx?.filter(
          (t: any) => !deposits?.some((d: any) => d.trxId === t.hash),
        );
        if (uniqueData) {
          try {
            const response = await axiosInstance.get<any>('/deposit-request');
            setDeposits(response?.data?.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      }
    };

    // fetchUniqueData();
  }, [deposits, trnx]);

  // const array1 = [
  //   {
  //     id: 1,
  //     name: 'user 1',
  //     trxId:
  //       '0x7bce4d1bf5ed39d9055c3f998af97ca26b35e5a1714605e47bd66525efc6e2a5',
  //   },
  //   {
  //     id: 2,
  //     name: 'user 2',
  //     trxId:
  //       '1x7bce4d1bf5ed39d9055c3f998af97ca26b35e5a1714605e47bd66525efc6e2a5',
  //   },
  // ];

  // const array2 = [
  //   {
  //     id: 1,
  //     name: 'user 1',
  //     hash: '0x7bce4d1bf5ed39d9055c3f998af97ca26b35e5a1714605e47bd66525efc6e2a5',
  //   },
  //   {
  //     id: 2,
  //     name: 'user 2',
  //     hash: '1x7bce4d1bf5ed39d9055c3f998af97ca26b35e5a1714605e47bd66525efc6e2a5',
  //   },
  //   {
  //     id: 3,
  //     name: 'user 3',
  //     hash: '3x7bce4d1bf5ed39d9055c3f998af97ca26b35e5a1714605e47bd66525efc6e2a5',
  //   },
  //   {
  //     id: 4,
  //     name: 'user 3',
  //     hash: '4x7bce4d1bf5ed39d9055c3f998af97ca26b35e5a1714605e47bd66525efc6e2a5',
  //   },
  // ];

  // const uniqueData = array2.filter(
  //   (item2) => !array1.some((item1) => item1.trxId == item2.hash),
  // );

  // console.log(uniqueData);

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const { trxId, amount, ...rest } = data;

    // v1
    // if (data.amount < wallet?.minimum) {
    //   Swal.fire({
    //     title: 'Warning',
    //     text: `Minimum Amount ${wallet.minimum}`,
    //     icon: 'warning',
    //   });
    //   return;

    //   // alert(`min amount ${depositMethod?.data[0]?.minimum}`);
    // }

    const reqData = {
      depositMethodId: '2ee97fc0-2998-43b5-a38e-49992db77509',
      trxId,
      amount,
    };
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/deposit-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(reqData),
      });
      setLoading(false);

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
      if (!responseData?.success) {
        Swal.fire({
          title: 'error',
          text: `${responseData?.message}`,
          icon: 'error',
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: 'error',
        text: 'Something wrong',
        icon: 'error',
      });
    }
  };

  // Function to set wallet name based on selected method
  // payment method v1

  // useEffect(() => {
  //   const selectedMethodObject = depositMethod?.data?.find(
  //     (method: any) => method.id === selectedMethod,
  //   );
  //   if (selectedMethodObject) {
  //     setWallet(selectedMethodObject);
  //   } else {
  //     setWallet(undefined);
  //   }
  // }, [selectedMethod, depositMethod]);

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
              <h2 className="text-xl font-bold dark:text-white text-black ">
                Deposit Request
              </h2>
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
              {/* <div>
                <label
                  className="mb-2 block  dark:border-strokedark dark:focus:border-primary text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Payment Method
                </label>

                <select
                  id="paymentMethod"
                  onClick={(e: any) => setSelectedMethod(e?.target?.value)}
                  className=" py-3 w-full  rounded-md  dark:border-strokedark bg-inherit border-[1.5px] dark:text-white dark:focus:border-primary outline-none"
                >
                   {depositMethod?.data?.map((method: any) => (
                    <option
                      className=" text-body p-1 dark:text-black"
                      key={method.id}
                      value={method.id}
                    >
                      {method.paymentMethod}
                    </option>
                  ))}
                </select>
              </div> */}

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
                  // value={wallet?.network}
                  readOnly
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Wallet Address
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('walletNo')}
                  // value={wallet?.walletNo}
                  readOnly
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Amount $
                </label>
                <input
                  type="number"
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('amount', { required: true })}
                />
                <p className="text-end text-sm  text-bodydark opacity-80">
                  {/* {wallet && 'Minimum ' + '$' + wallet?.minimum} */}
                </p>
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

              {loading ? (
                <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
              ) : (
                <Button btnName="Submit" />
              )}

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
