import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { PuffLoader } from 'react-spinners';
import { getTizaraUserToken } from '../../hooks/getTokenFromstorage';
import { baseUrl } from '../../utils/api';

type Inputs = {
  id: number;
  planName: string;
  apy: number;
  duration: string;
  minimum: string;
  stakeAmount: string;
  dailyRoy: number;
};

export const StakeNowModal = ({ closeModal, selectedPlan, getWllet }: any) => {
  const [lodaing, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<Inputs>();
  const [amount, setAmount] = useState<number>(0);
  const token = getTizaraUserToken();

  // dayly ROI
  const yearlyRoy = selectedPlan ? (amount / 100) * selectedPlan.apy : 0;

  const dailyRoy = selectedPlan ? yearlyRoy / selectedPlan.duration : 0;
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const planData = {
      dailyRoy: Number(dailyRoy.toFixed(5)),
      planName: data.planName,
      duration: data.duration,
      apy: Number(data.apy),
      stakeAmount: Number(data.stakeAmount),
      planId: selectedPlan.id,
    };
    try {
      setLoading(true);

      const response = await fetch(`${baseUrl}/stack-now`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(planData),
      });

      const responseData = await response.json();
      console.log(responseData);

      setLoading(false);
      getWllet();

      console.log(responseData?.message);

      if (responseData?.success) {
        Swal.fire({
          title: 'Success',
          text: 'Successfully staked amount',
          icon: 'success',
        }).then(() => {
          closeModal();
        });
      } else if (responseData.success == false) {
        Swal.fire({
          title: 'Error',
          text: `${responseData?.message}`,
          icon: 'error',
        });
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  return (
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal  min-h-[400px] rounded-sm border border-stroke bg-white shadow-8 dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full max-w-full w-[400px] lg:w-[600px] pb-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Stake Now
              </h2>
              <strong
                className="text-4xl align-center cursor-pointer  hover:text-black dark:hover:text-white"
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <hr />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-5.5 p-6.5"
            >
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Plan Name
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('planName', { required: true })}
                  value={selectedPlan.planName}
                  readOnly
                />
              </div>
              <div>
                <label
                  className="mb-1  block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Duration (Days)
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('duration', { required: true })}
                  value={selectedPlan.duration}
                  readOnly
                />
              </div>
              <div>
                <label
                  className="mb-1  block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Minimum
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('minimum', { required: true })}
                  value={selectedPlan.minimum}
                  readOnly
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  APY %
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('apy', { required: true })}
                  value={selectedPlan.apy}
                  readOnly
                />
              </div>
              <div>
                <label
                  className="mb-1  block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Amount (Tizara)
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('stakeAmount', { required: true })}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
              </div>

              <div>
                <label
                  className="mb-1  block text-sm font-medium text-black dark:text-white"
                  htmlFor="type"
                >
                  Daily ROI
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  value={dailyRoy ? dailyRoy.toFixed(5) : ''}
                />
              </div>

              <div>
                {lodaing ? (
                  <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
                ) : (
                  <button
                    className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    type="submit"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
