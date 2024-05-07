import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import 'react-datepicker/dist/react-datepicker.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import SelectOptions from '../../Ui/SelectOptions';


const WithdrawsSettings = () => {
  const options = [
    { value: "0", label: 'coin 1' },
    { value: "1", label: 'coin 2' },
    { value: "2", label: 'coin 3' },
    { value: "3", label: 'coin 4' },
  ];
  const neworkOptions = [
    { value: "0", label: 'Nework 1' },
    { value: "1", label: 'Nework 2' },
    { value: "2", label: 'Nework 3' },
    { value: "3", label: 'Nework 4' },
  ];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();


  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log(data);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Withdraws Settings" />



      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5 p-6.5">

          <div>
            <SelectOptions
              label='Select coin'
              name="status"
              control={control}
              // value={'1'}
              options={options}
              placeholder={'Select...'} defaultValue={1}
            />
          </div>

          <div>
            <SelectOptions
              label='Select Nework'
              name="nework"
              control={control}
              options={neworkOptions}
              placeholder={'Select Nework...'}
              defaultValue={1}
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Withdrow fee
            </label>
            <input
              type="text"
              {...register("Withdrow fee", { required: true })}
              placeholder="Withdrow fee"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Minimum
            </label>
            <input
              type="text"
              {...register("Minimum", { required: true })}
              placeholder="Minimum"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-3 block text-black dark:text-white">
              Maximum
            </label>
            <input
              type="text"
              {...register("Maximum", { required: true })}
              placeholder="Maximum"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <button
            className="w-fit mx-auto items-center justify-center  bg-meta-3 py-3 px-10  mb-2 rounded-md text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Submit
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default WithdrawsSettings;