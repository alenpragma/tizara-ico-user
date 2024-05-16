import React from 'react';
import Button from '../../Ui/Button';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  coinPrice: number;
  coinAmount: number;
};
interface ComponentProps {
  // fetchData: () => void;
  closeModal: () => void;
}

const BuyToken: React.FC<ComponentProps> = ({ closeModal }) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    console.log(data);
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
                    className="w-30 rounded text-end border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black-2 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    {...register('coinPrice', { required: true })}
                    value={'0.002'}
                  />
                </div>
                <div className="flex justify-between place-items-center gap-3">
                  <label
                    className="mb-2 block text-sm font-medium text-black-2 dark:text-white"
                    htmlFor="type"
                  >
                    Coin Amount:
                  </label>
                  <input
                    type="number"
                    className="text-end w-30 rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black-2 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    {...register('coinAmount', { required: true })}
                  />
                </div>
                <hr />

                <h3 className="flex justify-between text-black-2 font-medium dark:text-white text-lg">
                  <span>Total Price:</span>
                  <span>9000000</span>
                </h3>
                <Button btnName="Buy" />
                {/* <button className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
              type="submit">
              Update
            </button> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyToken;
