import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
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
  const { id } = useParams();
  console.log(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // const [selectedFiles, setSelectedFiles] = useState({
  //   image: null,
  // });

  // const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, files } = e.target;

  //   if (files && files[0]) {
  //     if (files[0].size > 1024 * 1024) {
  //       alert('File size should be less than 1 MB');
  //       e.target.value = '';
  //       return;
  //     }

  //     setSelectedFiles((prevFiles) => ({
  //       ...prevFiles,
  //       [name]: files[0],
  //     }));
  //   }
  // };

  const onSubmit: SubmitHandler<any> = async (data) => {
    const image = data['image'];
    console.log(image.length);

    const formData = new FormData();
    if (image.length) {
      console.log('file found');

      formData.append('image', image[0] as Blob);
    }
    formData.append('message', data.message);
    formData.append('ticketId', id!);

    try {
      const response = await axiosInstance.post(
        `/ticket/create-replay`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response?.data?.success) {
        setDatas(response.data.data);
      }
      reset();
      alert('dsfsdf');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Details" />

      <div className="border bg-slate-500 rounded-md bg-opacity-95 p-1 flex justify-between place-items-center">
        <div>
          <h2 className="text-md font-semibold">{datas?.title}</h2>
        </div>

        <Button btnName="Mark it close" />
      </div>
      <div>
        <h2 className="text-title-xl font-medium">Responses</h2>
      </div>
      <div className="my-5  flex flex-col gap-2">
        {datas?.updates?.map((data: any) => {
          return (
            <div
              key={data.id}
              className={`bg-graydark p-2 w-fit rounded-md ${
                data.role != 'USER' ? 'ms-auto' : ''
              }`}
            >
              {data.image && (
                <img className="w-40 h-50" src={data.image} alt="" />
              )}
              <h2>{data.message}</h2>
            </div>
          );
        })}
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <TextAreaField
            label="message"
            name="message"
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
            // fileSelectedHandler={fileSelectedHandler}
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
