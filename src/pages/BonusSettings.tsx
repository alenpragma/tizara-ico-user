import { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { PuffLoader } from 'react-spinners';
import { userToken } from '../hooks/getTokenFromstorage';

interface IInput {
  free_mining_rewards: string;
  refer_comission: string;
  level_comission_1: string;
  level_comission_2: string;
  level_comission_3: string;
  free_level_1: string;
  free_level_2: string;
  free_level_3: string;
}

const BonusSettings = () => {
  const [lodaing, setLoading] = useState(false);
  const [updateLodaing, setUpdateLodaing] = useState(false);

  const [bonusData, setBonusData] = useState<any>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://biztoken.fecotrade.com/api/comission-setting',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setLoading(false);
      setBonusData(response?.data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IInput>();

  // update bonus settings data

  const onSubmit: SubmitHandler<IInput> = async (data: IInput) => {
    setUpdateLodaing(true);

    for (const key in data) {
      if (data[key as keyof IInput] === '') {
        data[key as keyof IInput] = bonusData[0][key];
      }
    }

    const newData = { ...data, id: bonusData[0]?.id };

    try {
      const response = await fetch(
        'https://biztoken.fecotrade.com/api/comission-setting/update',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(newData),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();

      if (responseData.success) {
        reset();
        fetchData();
        setUpdateLodaing(false);
        Swal.fire({
          title: 'success',
          text: 'Successfully Update Bonus Settings',
          icon: 'success',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Faield',
        text: 'Failed to update settings',
        icon: 'error',
      });
    }
  };
  console.log(bonusData);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bonus Settings" />
      <div>
        {lodaing ? (
          <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
        ) : (
          ''
        )}

        {
          // lodaing ?
          //   <PuffLoader className='mx-auto' color="#36d7b7" size={40} />
          //   :
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5.5 p-6.5"
          >
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Free Mining Rewards
              </label>
              {/* {console.log(bonusData[0]?.free_mining_rewards)} */}
              <input
                type="text"
                {...register('free_mining_rewards')}
                placeholder="Free Mining Rewards"
                defaultValue={bonusData[0]?.free_mining_rewards as string}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Refer Commission (%)
              </label>
              <input
                type="text"
                {...register('refer_comission')}
                placeholder="Refer Commission"
                defaultValue={bonusData[0]?.refer_comission}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold pb-3 text-black dark:text-white">
                Level Commission (Based on package purchase)
              </h2>

              <div>
                <div>
                  <label className="mt-3 block text-black dark:text-white">
                    Level one (%)
                  </label>
                  <input
                    type="text"
                    {...register('level_comission_1')}
                    placeholder="Level-1"
                    defaultValue={bonusData[0]?.level_comission_1}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mt-3 block text-black dark:text-white">
                    Level two (%)
                  </label>
                  <input
                    type="text"
                    {...register('level_comission_2')}
                    placeholder="Level-2"
                    defaultValue={bonusData[0]?.level_comission_2}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mt-3 block text-black dark:text-white">
                    Level three (%)
                  </label>
                  <input
                    type="text"
                    {...register('level_comission_3')}
                    placeholder="Level-3"
                    defaultValue={bonusData[0]?.level_comission_3}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold pb-3 text-black dark:text-white">
                Free Level Commission (Based on free Signup)
              </h2>

              <div>
                <div>
                  <label className="mt-3 block text-black dark:text-white">
                    Level one (Biz)
                  </label>
                  <input
                    type="text"
                    {...register('free_level_1')}
                    placeholder="Level-1"
                    defaultValue={bonusData[0]?.free_level_1}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mt-3 block text-black dark:text-white">
                    Level two (Biz)
                  </label>
                  <input
                    type="text"
                    {...register('free_level_2')}
                    placeholder="Level-2"
                    defaultValue={bonusData[0]?.free_level_2}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mt-3 block text-black dark:text-white">
                    Level three (Biz)
                  </label>
                  <input
                    type="text"
                    {...register('free_level_3')}
                    placeholder="Level-3"
                    defaultValue={bonusData[0]?.free_level_3}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {updateLodaing ? (
              <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
            ) : (
              <button className="w-fit mx-auto items-center justify-center  bg-meta-3 py-3 px-10  mb-2 rounded-md text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                Update
              </button>
            )}
          </form>
        }
      </div>
    </DefaultLayout>
  );
};

export default BonusSettings;
