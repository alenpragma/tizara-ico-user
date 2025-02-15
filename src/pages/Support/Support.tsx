import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axiosInstance from '../../utils/axiosConfig';
import { formatToLocalDate } from '../../hooks/formatDate';
import { FaBookOpen, FaLariSign, FaSupple } from 'react-icons/fa6';
import { MdOutlineSupport, MdSupport } from 'react-icons/md';
import { BsEyeFill } from 'react-icons/bs';
import { IoEyeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Support = () => {
  const [datas, setDatas] = useState<any>();

  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/ticket');

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
      <Breadcrumb pageName="Ticket" />

      <div className="py-5 flex justify-end">
        <Link
          to={'/create-ticket'}
          className="cursor-pointer px-5 py-2.5 relative rounded group font-medium text-white  inline-block"
        >
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-[#10B981] to-[#eacf72]"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#10B981] to-[#eacf72]"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#10B981] to-[#eacf72]"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#10B981] from-[#eacf72]"></span>
          <span className="relative">Create Ticket</span>
        </Link>
      </div>
      <div className="border border-meta-4 rounded-md">
        {datas?.data?.map((data: any) => {
          return (
            <div className="flex justify-between place-items-center border-t  border-meta-4 p-2">
              <div className="flex gap-3 place-items-center">
                <MdSupport className="text-4xl" />
                <div className="flex place-items-center gap-4">
                  <div>
                    <p className="dark:text-white font-semibold">
                      {data.title}
                    </p>
                    <span className="text-sm ">
                      {formatToLocalDate(data.createdAt)}
                    </span>
                  </div>
                  <span className="text-sm font-semibold bg-success px-4 rounded-full">
                    {data.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 text-2xl">
                <FaBookOpen />
                <Link to={`/ticket/show/${data.id}`}>
                  <IoEyeOutline />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </DefaultLayout>
  );
};

export default Support;
