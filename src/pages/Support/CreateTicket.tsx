import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axiosInstance from '../../utils/axiosConfig';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '../../components/Forms/InputField';
import { PuffLoader } from 'react-spinners';
import TextAreaField from '../../components/Forms/TextAreaField';
import Swal from 'sweetalert2';
import FileUploder from '../FileUploder';

const CreateTicket = () => {
  const [loading, setLoading] = useState<boolean>(false);

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
    const image = data['image'];
    const obj = {
      title: data.title,
      description: data.description,
    };

    const formData = new FormData();
    if (image) {
      formData.append('image', image[0] as Blob);
    }

    formData.append('title', obj.title);
    formData.append('description', obj.description);

    try {
      setLoading(true);
      const response = await axiosInstance.post(`/ticket/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response) {
        setLoading(false);
        Swal.fire({
          title: 'Success',
          text: 'Successfully updated',
          icon: 'success',
        });
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        Swal.fire({
          title: 'Error',
          text: error?.response?.data?.message || 'An error occurred',
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: error?.message || 'An error occurred',
          icon: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Ticket" />

      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 px-4  "
        >
          <InputField
            label="Ticket Title"
            name="title"
            register={register}
            required
            error={errors}
          />
          <TextAreaField
            label="description"
            name="description"
            register={register}
            required
            error={errors}
          />
          {/* <InputField
            label="Image"
            name="image"
            register={register}
            required
            type="file"
            placeholder="Select an image file"
            error={errors}
          /> */}

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

export default CreateTicket;
