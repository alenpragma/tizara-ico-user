import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axiosInstance from '../../utils/axiosConfig';
import { formatToLocalDate } from '../../hooks/formatDate';
import { FaReplyAll } from 'react-icons/fa6';
import { IoTicketOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Support = () => {
  const [datas, setDatas] = useState<any>();

  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/ticket');

      if (response?.data?.success) {
        setDatas(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
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
                <div className="border-2 p-1 rounded-full">
                  <IoTicketOutline className="text-4xl" />
                </div>
                <img
                  className="w-40 md:w-60 rounded-md"
                  src={data?.image}
                  alt=""
                />{' '}
                <div className=" gap-4">
                    <p className="dark:text-white font-semibold">
                      Title: {data.title}
                    </p>
                    <p className="dark:text-white font-semibold">
                    Description: {data.description}
                    </p>
                  <div>
                    <span className="text-sm ">
                      {formatToLocalDate(data.createdAt)}
                    </span>
                  </div>
                  <span className="text-sm  text-white font-semibold bg-success px-4 rounded-full">
                    {data.status}
                  </span>
                </div>
              </div>

              <div className="flex  gap-3 text-2xl">
                <div className="border-2 p-2 rounded-full">
                  <Link to={`/ticket/show/${data.id}`}>
                    <FaReplyAll />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DefaultLayout>
  );
};

export default Support;
