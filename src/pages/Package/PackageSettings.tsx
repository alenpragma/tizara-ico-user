import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';
import SelectOptions from '../../Ui/SelectOptions';
import { options } from '../options';
import { IPackage } from '../../types/packages';
import RequiredInput from '../../components/RequiredInput';

type Inputs = {
  package_name: string;
  package_price: string;
  daily_token: string;
  a2i_token: string;
  duration: string;
  hashpower: string;
  status: string;
  image: string;
  is_deleted: string;
};

const PackageSettings = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<IPackage> = async (data: IPackage) => {
    console.log(data);

    const { status, ...rest } = data;
    const newPackage = { ...rest, status: data?.status?.value };

    return;

    try {
      const token = localStorage.getItem('biztoken');
      const response = await fetch(
        'https://biztoken.fecotrade.com/api/package/store',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newPackage),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      Swal.fire({
        title: 'success',
        text: 'Successfully added new package',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error occurred while making POST request:', error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Package" />
      <div className="lg:w-[60%] mx-auto">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5.5 p-6.5"
          >
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Package Name <RequiredInput />
              </label>
              <input
                type="text"
                {...register('package_name', { required: true })}
                placeholder="Package Name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Package Price <RequiredInput />
              </label>
              <input
                type="text"
                {...register('package_price', { required: true })}
                placeholder="Package Price"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Daily Token <RequiredInput />
              </label>
              <input
                type="text"
                {...register('daily_token', { required: true })}
                placeholder="Daily Token"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                A2i Token <RequiredInput />
              </label>
              <input
                type="text"
                {...register('a2i_token', { required: true })}
                placeholder="A2i Token"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Duration <RequiredInput />
              </label>
              <input
                type="text"
                {...register('duration', { required: true })}
                placeholder="Duration "
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Hash Power <RequiredInput />
              </label>
              <input
                type="text"
                {...register('hashpower', { required: true })}
                placeholder="Hash Power"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              {/* <Controller
                name="status"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field}
                    styles={customStyles}
                    options={options}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        neutral80: "#fff",
                      },
                    })}
                  />
                )}
              />
            */}
              <SelectOptions
                label="Status"
                name="status"
                defaultValue={'1'}
                control={control}
                options={options}
                placeholder={'Select...'}
              />
            </div>

            <button className="w-fit mx-auto items-center justify-center  bg-meta-3 py-3 px-10  mb-2 rounded-md text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
              Submit
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PackageSettings;
