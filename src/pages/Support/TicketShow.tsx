import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import InputField from '../../components/Forms/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextAreaField from '../../components/Forms/TextAreaField';
import FileUploder from '../FileUploder';
import { PuffLoader } from 'react-spinners';
import axiosInstance from '../../utils/axiosConfig';
import { useParams } from 'react-router-dom';
import Button from '../../Ui/Button';

const TicketShow = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [datas, setDatas] = useState<any>();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedFiles, setSelectedFiles] = useState({
    image: null,
  });

  const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      if (files[0].size > 1024 * 1024) {
        alert('File size should be less than 1 MB');
        e.target.value = '';
        return;
      }

      setSelectedFiles((prevFiles) => ({
        ...prevFiles,
        [name]: files[0],
      }));
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/ticket/${id}`);

      if (response?.data?.success) {
        setDatas(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(datas);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Details" />

      <div className="border rounded-md bg-opacity-95 p-3 flex justify-between place-items-center">
        <div>
          <h2 className="text-md font-semibold">{datas?.title}</h2>
        </div>

        <Button btnName="Mark it close" />
      </div>
      <div>
        {datas?.updates?.map((data: any) => {
          return (
            <div key={data.id} className="bg-red-600">
              <h2> asd{data.message}</h2>
            </div>
          );
        })}
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <TextAreaField
            label="description"
            name="description"
            register={register}
            required
            error={errors}
          />
          <FileUploder
            type="file"
            label="image"
            name="image"
            placeholder="image"
            register={register}
            error={errors.image}
            required
            fileSelectedHandler={fileSelectedHandler}
          />
          <div className="mb-5">
            {!loading ? (
              <input
                type="submit"
                value="Update"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
              />
            ) : (
              <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
            )}
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default TicketShow;