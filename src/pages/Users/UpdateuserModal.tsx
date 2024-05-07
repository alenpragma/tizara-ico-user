import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const UpdateuserModal = ({ fetchData, closeModal, packageItem }: any) => {

  const [formState, setFormState] = useState({ ...packageItem });

  const {
    register,
    handleSubmit,
  } = useForm<any>();


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };
  const onSubmit: SubmitHandler<any> = async (data: any) => {

  };



  return (
    <div className="flex justify-center">
      <div
        className="modal-container  fixed z-50 flex  mx-auto top-25 bottom-5"
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === "modal-container") closeModal();
        }}
      >

        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[400px] lg:w-[600px] border-b border-stroke py-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-end">
              <strong className="text-xl align-center cursor-pointer "
                onClick={closeModal}
              >&times;</strong>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex  flex-col w-full gap-5.5 p-6.5">
              <div>
                <p>package name</p>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register("package_name", { required: true })}
                  value={formState.package_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>package price</p>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

                  {...register("package_price", { required: true })}
                  value={formState.package_price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>daily token</p>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

                  {...register("daily_token", { required: true })}
                  value={parseFloat(formState.daily_token)}
                  onChange={handleChange}
                />
              </div>

              <div>
                <p>duration</p>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register("duration", { required: true })}
                  value={formState.duration}
                  onChange={handleChange}
                />
              </div>
              <div><p>hashpower</p>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

                  {...register("hashpower", { required: true })}
                  value={formState.hashpower}
                  onChange={handleChange}
                />
              </div>

              <div>
                <p>status</p>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register("status", { required: true })}
                  value={formState.status}
                  onChange={handleChange}
                />

              </div>


              <button className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateuserModal;