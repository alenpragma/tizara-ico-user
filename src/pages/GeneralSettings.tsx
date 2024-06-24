import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import Button from '../Ui/Button';

import Transaction from '../components/GeneralSettings/Transaction';
import { useContext } from 'react';
import MyContext from '../hooks/MyContext';

const GeneralSettings = () => {
  // const data = useContext(MyContext);
  // console.log(data);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="General Settings" />
      <div className="">
        <div>
          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              App Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              App Logo
            </label>
            <input
              type="file"
              placeholder="Enter your last name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <Button cs="px-10 my-5 bg-primary" btnName="Update"></Button>
        </div>
      </div>
      <Transaction />
    </DefaultLayout>
  );
};

export default GeneralSettings;
