import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Button from '../../Ui/Button';
import { useContext, useEffect, useState } from 'react';
import { getTizaraUserToken } from '../../hooks/getTokenFromstorage';
import { baseUrl } from '../../utils/api';
import axiosInstance from '../../utils/axiosConfig';
import { PuffLoader } from 'react-spinners';
import axios from 'axios';
import MyContext from '../../hooks/MyContext';

type Inputs = {
  paymentMethod: string;
  walletNo: string;
  network: string;
  trxId: string;
  amount: string;
  depositMethodId: string;
};
interface ComponentProps {
  fetchData: () => void;
  closeModal: () => void;
}

const DepositRequest: React.FC<ComponentProps> = ({
  fetchData,
  closeModal,
}) => {
  const { profile } = useContext(MyContext);

  const { register, handleSubmit } = useForm<Inputs>();
  const [loading, setLoading] = useState<boolean>(false);

  const [deposits, setDeposits] = useState<any>(null);
  const [trnx, setTrnx] = useState<any>(null);

  const getMyAllDeposit = async () => {
    try {
      const response = await axiosInstance.get('/deposit-request');
      setDeposits(response?.data?.data);
      console.log(response?.data?.data, 'my deposit');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getMyTransactions = async () => {
    setLoading(true);
    try {
      const transactionsResponse = await axios.get(
        `https://web3.blockmaster.info/api/get-transactions?address=${profile?.address}`,
      );

      setTrnx(transactionsResponse?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error creating address:', error);
    }
  };

  useEffect(() => {
    getMyAllDeposit();
  }, []);

  useEffect(() => {
    getMyTransactions();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async () => {
    if (!deposits || !trnx) {
      Swal.fire({
        // title: '',
        text: 'Please await',
        icon: 'warning',
      });
      return;
    }

    const uniquData = trnx?.filter(
      (t: any) => !deposits?.some((d: any) => d.trxId === t.hash),
    );

    if (uniquData.length == 0) {
      Swal.fire({
        title: 'success',
        text: 'New Transaction Not Found',
        icon: 'success',
      });
      closeModal();
      return;
    }
    const reqData = {
      depositMethodId: '2ee97fc0-2998-43b5-a38e-49992db77509',
      trxId: uniquData[0]?.hash,
      amount: uniquData[0]?.value,
      address: uniquData[0]?.to,
    };

    try {
      const response = await axiosInstance.post('/deposit-request', reqData);
      setDeposits(response?.data?.data);
      console.log(response, 'success deposit');
      fetchData();
      closeModal();
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

              {loading ? (
                <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
              ) : (
                <Button btnName="CONFIRM" />
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
