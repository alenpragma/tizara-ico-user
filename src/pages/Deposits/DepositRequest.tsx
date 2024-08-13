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
import QRCode from 'react-qr-code';
import { FaRegCopy } from 'react-icons/fa6';

type Inputs = {
  paymentMethod: string;
  walletNo: string;
  network: string;
  trxId: string;
  amount: string;
  depositMethodId: string;
};
interface ComponentProps {
  closeModal: () => void;
  address: string;
}

const DepositRequest: React.FC<ComponentProps> = ({ address, closeModal }) => {
  const { profile } = useContext(MyContext);
  console.log(profile.address);

  const { register, handleSubmit } = useForm<Inputs>();
  const [loading, setLoading] = useState<boolean>(false);

  const [deposits, setDeposits] = useState<any>(null);
  const [trnx, setTrnx] = useState<any>([]);

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

      if (transactionsResponse.status == 200) {
        setTrnx(transactionsResponse?.data);
      }
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
    // Check if there are any transactions to process
    if (trnx.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Transaction Not Found',
        icon: 'error',
      });
      return;
    }

    // Filter unique transactions that match the profile's address and are not already in deposits
    const uniquData = trnx?.filter((trx: any) => {
      return (
        trx.to === profile.address &&
        !deposits?.some((d: any) => d.trxId === trx.hash)
      );
    });

    console.log(uniquData);

    // Check if there are any unique transactions to process
    if (uniquData.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'New Transaction Not Found',
        icon: 'error',
      });
      closeModal();
      return;
    }

    const reqData = {
      trxId: uniquData[0]?.hash,
      amount: uniquData[0]?.value,
      address: uniquData[0]?.to,
    };

    try {
      // Post the entire array of transactions
      const response = await axiosInstance.post('/deposit-request', reqData);
      console.log(response);

      if (response.data.success) {
        Swal.fire({
          title: 'Success',
          text: 'Deposit processed successfully.',
          icon: 'success',
        });
      }
      closeModal();
    } catch (error) {
      setLoading(false);
      closeModal();
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong while processing your deposit.',
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
  const copyToClipboard = async (textToCopy: any) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      Swal.fire({
        title: 'Copyed',
        text: 'Copied success',
        icon: 'success',
        timer: 1200,
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
      // setCopySuccess('Copy failed');
    }
  };

  const splitAddress = (address: string) => {
    if (!address) return ['', ''];
    const midpoint = Math.ceil(address.length / 1.2);
    return [address.slice(0, midpoint), address.slice(midpoint)];
  };

  const addressParts = splitAddress(profile?.address);

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
          <div className="min-w-full w-[350px] md-w-[420px] lg:w-[600px] border-b border-stroke   pb-4 px-4 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <div className=" flex justify-end">
                <h2 className="text-xl font-bold dark:text-white text-black ">
                  My Own Wallet Details
                </h2>
              </div>
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
              className=" mx-auto  w-full lg:px-5 mt-4"
            >
              <QRCode
                className="w-30 h-30 lg:w-35 lg:h-35 mx-auto"
                // style={{ height: '256', maxWidth: '200', width: '200' }}
                value={profile?.address ?? ''}
                viewBox={`0 0 100 100`}
              />
              <div className="flex gap-2  mt-3">
                <p className="text-sm flex flex-col lg:flex-row lg:text-lg">
                  <span>{addressParts[0]}</span>
                  {addressParts[1]}
                </p>

                <FaRegCopy
                  onClick={() => copyToClipboard(`${profile?.address}`)}
                  className="text-2xl cursor-pointer"
                />
              </div>
              <div className="text-black dark:text-white mt-1">
                <div className="mb-2 flex justify-between text-black dark:text-white ">
                  <p>Deposit Network: </p>
                  <p>BNB Smart Chain(BEP20)</p>
                </div>
                <p className="text-sm ">
                  <span className="text-red-500 font-semibold">
                    Risk Warning:
                  </span>{' '}
                  Deposits are subject to investment risk, including potential
                  loss of principal. The minimum deposit amount is 10 USDT;
                  ensure all transaction details are accurate to avoid loss of
                  funds.
                </p>
              </div>
              {loading ? (
                <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
              ) : (
                <div className="lg:flex w-full justify-center mx-auto my-2">
                  <button
                    className={` px-6 w-full lg:w-fit bg-primary  btn flex justify-center rounded  py-2   font-medium text-gray hover:shadow-1`}
                    type="submit"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositRequest;
