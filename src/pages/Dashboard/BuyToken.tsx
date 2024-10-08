import React, { useEffect, useState } from 'react';
import Button from '../../Ui/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { ICoinPrice } from '../../types/dashboard';
import axiosInstance from '../../utils/axiosConfig';

type Inputs = {
  coinPrice: number;
  coinAmount: number;
};
interface ComponentProps {
  // fetchData: () => void;
  closeModal: () => void;
  setGetWallet: (value: boolean) => void;
  coinPrice: ICoinPrice;
}

interface ApiResponse<T> {
  success?: boolean;
  data?: T | any;
  message?: string;
  statusCode?: number;
}

const BuyToken: React.FC<ComponentProps> = ({
  closeModal,
  coinPrice,
  setGetWallet,
}) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  let totalPrice: any = 0;
  if (coinPrice) {
    totalPrice = Number(coinPrice?.coinPrice) * amount;
  }

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const buyDetail = { ...data, totalPrice };

    const buyDetails = {
      coinPrice: Number(buyDetail.coinPrice),
      coinAmount: Number(buyDetail.coinAmount),
      totalPrice: parseFloat(buyDetail.totalPrice.toFixed(2)),
    };

    try {
      setLoading(true);
      const res = await axiosInstance.post<ApiResponse<any>>(
        '/buy-token',
        buyDetails,
      );

      if (res?.data.success) {
        setLoading(false);
        await setGetWallet(true);
        closeModal();
        Swal.fire({
          title: 'Success!',
          text: `${res?.data?.message}`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    } catch (error: any) {
      setLoading(false);
      closeModal();
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div>
      <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center  bg-black/90 py-5">
        <div
          className="overflow-auto max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
          onClick={(e) => {
            const target = e.target as HTMLDivElement;
            if (target.className === 'modal-container') closeModal();
          }}
        >
          <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
            <div className="min-w-full w-[350px] md-w-[420px]  border-b border-stroke   pb-4 px-1 dark:border-strokedark">
              <div className="w-full flex justify-between px-3 place-items-center py-3">
                <h2 className="text-lg text-black-2 font-bold dark:text-white">
                  BUY TOKEN: 15 B
                </h2>
                <strong
                  className="text-3xl align-center dark:text-white  cursor-pointer hover:text-black-2 dark:hover:text-white"
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
                <div className="flex justify-between place-items-center gap-3">
                  <label
                    className="mb-2 block text-sm font-medium text-black-2 dark:text-white"
                    htmlFor="type"
                  >
                    Coin Price:
                  </label>
                  <input
                    className="w-36 rounded text-end border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black-2 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    {...register('coinPrice')}
                    type="number"
                    value={coinPrice && coinPrice.coinPrice} // Null check added
                  />
                </div>
                <div>
                  <div className="flex justify-between place-items-center gap-3">
                    <label
                      className="mb-2 block text-sm font-medium text-black-2 dark:text-white"
                      htmlFor="type"
                    >
                      Coin Amount:
                    </label>
                    <input
                      type="number"
                      min={1}
                      placeholder="Coin"
                      className="text-end w-36 rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black-2 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      {...register('coinAmount', { required: true })}
                      onChange={(e) => setAmount(parseFloat(e.target.value))}
                    />
                  </div>
                  <p className="text-end text-sm">
                    Min:{coinPrice?.minCoin} - Max:{coinPrice?.maxCoin}
                  </p>
                  {/* <p className="text-end text-sm">Max: {coinPrice?.maxCoin}</p> */}
                </div>
                <hr />

                <h3 className="flex justify-between text-black-2 font-medium dark:text-white text-lg">
                  <span>Total Price:</span>
                  <span>
                    $ {totalPrice ? parseFloat(totalPrice.toFixed(2)) : '00'}
                  </span>
                </h3>
                <Button btnName="Buy" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyToken;
