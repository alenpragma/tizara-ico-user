import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextAreaField from '../../components/Forms/TextAreaField';
import FileUploder from '../FileUploder';
import { PuffLoader } from 'react-spinners';
import axiosInstance from '../../utils/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../Ui/Button';
import Swal from 'sweetalert2';

const TicketShow = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [datas, setDatas] = useState<any>();
  const { id } = useParams();

  const router = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handelUpdate = async () => {
    const newData = {
      status: 'CLOSED',
    };
    try {
      const response = await axiosInstance.patch(
        `/ticket/${datas.id}`,
        newData,
      );

      Swal.fire({
        title: 'Success',
        text: 'Successfully closed',
        icon: 'info',
      });
      router('/support');
    } catch (error) {
      Swal.fire({
        title: 'Failed',
        text: 'Somthing wrong',
        icon: 'error',
      });
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

  const onSubmit: SubmitHandler<any> = async (data) => {

    setLoading(true);


    const image = data['image'];

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
      fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
    setLoading(false);
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

        {datas?.status == 'CLOSED' ? (
          <Button btnName={`${datas?.status}`} />
        ) : (
          <div onClick={() => handelUpdate()}>
            <Button btnName="Mark it close" />
          </div>
        )}
      </div>

      <hr className="mt-4" />
      <div className="my-5  flex flex-col gap-2">
        {datas?.updates?.map((data: any) => {
          return (
            <div
              key={data.id}
              className={`bg-graydark p-2 w-fit rounded-md ${data.role != 'USER' ? 'ms-auto' : ''
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
                disabled={datas?.status == 'CLOSED'}
                type="submit"
                value="Send"
                className={`w-full cursor-pointer rounded-lg border p-3 text-white transition hover:bg-opacity-90 ${datas?.status == 'CLOSED' ? ' border-graydark bg-zinc-600 ' : 'border-primary bg-primary '}`}
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
