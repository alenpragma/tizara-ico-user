import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../Ui/Button';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

type Inputs = {
  paymentMethod: string;
};
const Stake = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    console.log(data);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Stake Now" />
      <div className="lg:max-w-[50%] mx-auto">
        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="flex  flex-col w-full gap-5.5 p-6.5  dark:bg-meta-4"
        >
          <div className="border p-3 rounded-md">
            <h3 className="dark:text-white font-semibold text-md">
              Available Tizara: 99999
            </h3>
          </div>

          <div className="flex justify-between place-items-center gap-3">
            <label
              className=" block  text-sm font-medium text-black dark:text-white"
              htmlFor="type"
            >
              Duration
            </label>
            <select
              name=""
              id=""
              className="w-89 h-10 w-70 border-strokedark  border-[1.5px] bg-transparent  rounded-sm dark:bg-form-input"
            >
              <option value="180"> 180 day</option>
              <option value="180"> 365 day</option>
            </select>
          </div>
          <div className="flex justify-between place-items-center gap-3">
            <label
              className="mb-2 block text-sm font-medium text-black-2 dark:text-white"
              htmlFor="type"
            >
              Daily ROI
            </label>
            <input
              className="w-70 rounded border-[1.5px] text-end border-strokedark bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              {...register('coinPrice')}
              type="number"
            />
          </div>
          <div className="flex justify-between place-items-center gap-3">
            <label
              className="mb-2 block text-sm font-medium text-black-2 dark:text-white"
              htmlFor="type"
            >
              Token Amount:
            </label>
            <input
              className="w-70 rounded border-[1.5px] text-end border-strokedark bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary   dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              {...register('coinPrice')}
              type="number"
            />
          </div>

          <hr />
          <div className="mx-auto">
            <Button btnName="Submit" />
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Stake;
