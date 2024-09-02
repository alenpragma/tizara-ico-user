import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { BuyModal } from './BuyModal';

export type INft = {
  id: string;
  name: string;
  img: string;
  title: string;
  quantity: number;
  price: number;
  status: any;
  createdAt: Date;
  updatedAt: Date;
};

const BuyNft = () => {
  const [loading, setLoading] = useState(false);

  const [isBuy, setIsBuy] = useState(false);
  const [data, setData] = useState<INft>();
  const [nfts, setNfts] = useState<INft[]>();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/nft/active-nft`);
      setLoading(false);

      if (response) {
        setNfts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (nft: INft) => {
    setData(nft);
    setIsBuy(true);
  };
  const closeModal = () => {
    setIsBuy(false);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Buy NFT" />
      <>
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-3 justify-items-center">
          {nfts
            ?.slice()
            ?.reverse()
            ?.map((nft: INft, i: any) => {
              return (
                <div
                  key={i}
                  className="border cursor-pointer dark:hover:bg-opacity-50 dark:border-strokedark dark:bg-boxdark bg-[#ffff]  p-5 border-strokedark rounded-2xl max-w-full w-[320px] xl:w-[390px]"
                >
                  <img
                    className="transition-transform w-full h-55 duration-500 hover:scale-[1.1] rounded-md"
                    src={nft.img}
                    alt=""
                  />
                  <div className=" mt-5">
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-black dark:text-white text-title-lg">
                        {nft?.name}
                      </h2>
                      <p className="text-[#555555] dark:text-whiten font-semibold text-xl">
                        {nft?.title}
                      </p>
                    </div>
                    <div className="mt-5 mb-8  ">
                      <div className="font-medium lg:font-semibold lg:text-lg flex  justify-between">
                        <p className="px-3 lg:px-4 py-1.5  rounded-sm bg-[#F3F3F3] group:hover:bg-bodydark1 duration-500">
                          <span className="  dark:text-black">Qty:</span>{' '}
                          <span className="dark:text-black">
                            {nft.quantity} NFT
                          </span>
                        </p>

                        <p className="px-3 lg:px-4 py-1.5 ">
                          <span className=" "> Price:</span>
                          <span>{nft.price} $</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => openModal(nft)}
                    className="mb-2 flex justify-center"
                  >
                    <p className="cursor-pointer px-7 py-2 relative rounded group overflow-hidden font-medium bg-success text-white inline-block">
                      <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-600 ease-in-out transform translate-y-0 bg-white group-hover:h-full opacity-90"></span>
                      <span className="relative group-hover:text-success">
                        Buy Now
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </>
      {isBuy && (
        <BuyModal
          fetchData={fetchData}
          closeModal={closeModal}
          data={data}
        ></BuyModal>
      )}
    </DefaultLayout>
  );
};

export default BuyNft;
