import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { BuyModal } from './BuyModal';

import Loader from '../../common/Loader';
import dome from '../../videos/dome.mp4';
import wagon from '../../videos/wagon.mp4';
import hotelAndResort from '../../videos/hotelAndResort.mp4';
import land from '../../videos/land.mp4';

export type INft = {
  id: string;
  name: string;
  img: string;
  title: string;
  quantity: number;
  price: number;
  status: any;
  walletName: any;
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
        {loading && <Loader />}

        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-3 justify-items-center">
          {nfts
            ?.slice()
            ?.reverse()
            ?.map((nft: INft, i: any) => {
              return (
                <div
                  key={i}
                  className="border border-bodydark1 cursor-pointer dark:hover:bg-opacity-50 dark:border-strokedark dark:bg-boxdark bg-[#ffff]  p-5   rounded-2xl max-w-full w-[320px] xl:w-[390px]"
                >
                  {/* <img
                    className="transition-transform w-full h-55 duration-500 hover:scale-[1.1] rounded-md"
                    src={nft.img}
                    alt=""
                  /> */}

                  <div
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-[220px] overflow-hidden rounded-md mb-4"
                  >
                    {nft.walletName === 'dome' && (
                      <video
                        className="w-full h-full object-cover rounded-md"
                        src={dome}
                        autoPlay
                        muted
                        loop
                        controlsList="nodownload nofullscreen noremoteplayback"
                        disablePictureInPicture
                      />
                    )}

                    {nft.walletName == 'hotelAndResort' && (
                      <video
                        className="w-full h-full object-cover rounded-md"
                        src={hotelAndResort}
                        autoPlay
                        muted
                        loop
                        controlsList="nodownload nofullscreen noremoteplayback"
                        disablePictureInPicture
                      />
                    )}

                    {nft.walletName == 'wagon' && (
                      <video
                        className="w-full h-full object-cover rounded-md"
                        src={wagon}
                        autoPlay
                        muted
                        loop
                        controlsList="nodownload nofullscreen noremoteplayback"
                        disablePictureInPicture
                      />
                    )}

                    {nft.walletName == 'land' && (
                      <video
                        className="w-full h-full object-cover rounded-md"
                        src={land}
                        autoPlay
                        muted
                        loop
                        controlsList="nodownload nofullscreen noremoteplayback"
                        disablePictureInPicture
                      />
                    )}
                  </div>

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
                      <div className="font-medium dark:text-white lg:font-semibold text-lg ">
                        <div className="flex justify-between lg:px-4 py-1.5  rounded-sm  group:hover:bg-bodydark1 duration-500">
                          <span className="">Qty:</span>
                          {nft.walletName == 'dome' && (
                            <span className="">
                              {10000 - nft.quantity}/10,000 NFT
                            </span>
                          )}

                          {nft.walletName == 'hotelAndResort' && (
                            <span className="">
                              {55000 - nft.quantity}/55,000 NFT
                            </span>
                          )}

                          {nft.walletName == 'wagon' && (
                            <span className="">
                              {25000 - nft.quantity}/25,000 NFT
                            </span>
                          )}

                          {nft.walletName == 'land' && (
                            <span className="">
                              {110000 - nft.quantity}/1,10,000 NFT
                            </span>
                          )}
                        </div>

                        <p className="flex justify-between lg:px-4 ">
                          <span className=" "> Price:</span>
                          <span>{nft.price}$</span>
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
