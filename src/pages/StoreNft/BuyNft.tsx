import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

import image from '../../assets/Rectangle 130.png';

const BuyNft = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Buy NFT" />
      <>
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-3 justify-items-center">
          <div className="border cursor-pointer dark:hover:bg-opacity-50 dark:border-strokedark dark:bg-boxdark bg-[#ffff]  p-5 border-strokedark rounded-2xl max-w-full w-[380px]">
            <img className="hover:scale-105 duration-500" src={image} alt="" />
            <div className=" mt-5">
              <div className="flex justify-between">
                <h2 className="font-bold text-black dark:text-white text-4xl">
                  DOME
                </h2>
                <p className="text-[#555555] dark:text-whiten font-semibold text-xl">
                  Legendary
                </p>
              </div>
              <div className="mt-5 mb-8  ">
                <div className="font-semibold text-lg flex">
                  <p className="px-4 py-1.5  rounded-sm bg-[#F3F3F3] group:hover:bg-bodydark1 duration-500">
                    <span className="text-[#b0adad] dark:text-black">Qty:</span>{' '}
                    <span className="dark:text-black">10000 NFT</span>
                  </p>

                  <p className="px-4 py-1.5 ">
                    <span className="text-[#D3D3D3]"> Price:</span>
                    <span>10000 $</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-2 flex justify-center">
              {/* <button className="inline-flex dark:bg-white dark:text-black items-center justify-center rounded-lg bg-black py-3 px-12 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                Buy Now
              </button> */}
              <p className="cursor-pointer px-7 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-black inline-block">
                <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-600 ease-in-out transform translate-y-0 bg-cyan-600 group-hover:h-full opacity-90"></span>
                <span className="relative group-hover:text-white">Buy Now</span>
              </p>
            </div>
          </div>
          <div className="border cursor-pointer dark:hover:bg-opacity-50 dark:border-strokedark dark:bg-boxdark bg-[#ffff]  p-5 border-strokedark rounded-2xl max-w-full w-[380px]">
            <img className="hover:scale-105 duration-500" src={image} alt="" />
            <div className=" mt-5">
              <div className="flex justify-between">
                <h2 className="font-bold text-black dark:text-white text-4xl">
                  DOME
                </h2>
                <p className="text-[#555555] dark:text-whiten font-semibold text-xl">
                  Legendary
                </p>
              </div>
              <div className="mt-5 mb-8  ">
                <div className="font-semibold text-lg flex">
                  <p className="px-4 py-1.5  rounded-sm bg-[#F3F3F3]">
                    <span className="text-[#b0adad] dark:text-black">Qty:</span>{' '}
                    <span className="dark:text-black">10000 NFT</span>
                  </p>

                  <p className="px-4 py-1.5 ">
                    <span className="text-[#D3D3D3]"> Price:</span>
                    <span>10000 $</span>
                  </p>
                </div>
              </div>
              <div className="mb-2 flex justify-center">
                {/* <button className="inline-flex dark:bg-white dark:text-black items-center justify-center rounded-lg bg-black py-3 px-12 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                Buy Now
              </button> */}
                <p className="cursor-pointer px-7 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-black inline-block">
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-cyan-600 group-hover:h-full opacity-90"></span>
                  <span className="relative group-hover:text-white">
                    Buy Now
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="border cursor-pointer dark:hover:bg-opacity-50 dark:border-strokedark dark:bg-boxdark bg-[#ffff]  p-5 border-strokedark rounded-2xl max-w-full w-[380px]">
            <img className="hover:scale-105 duration-500" src={image} alt="" />
            <div className=" mt-5">
              <div className="flex justify-between">
                <h2 className="font-bold text-black dark:text-white text-4xl">
                  DOME
                </h2>
                <p className="text-[#555555] dark:text-whiten font-semibold text-xl">
                  Legendary
                </p>
              </div>
              <div className="mt-5 mb-8  ">
                <div className="font-semibold text-lg flex">
                  <p className="px-4 py-1.5  rounded-sm bg-[#F3F3F3]">
                    <span className="text-[#b0adad] dark:text-black">Qty:</span>{' '}
                    <span className="dark:text-black">10000 NFT</span>
                  </p>

                  <p className="px-4 py-1.5 ">
                    <span className="text-[#D3D3D3]"> Price:</span>
                    <span>10000 $</span>
                  </p>
                </div>
              </div>
              <div className="mb-2 flex justify-center">
                {/* <button className="inline-flex dark:bg-white dark:text-black items-center justify-center rounded-lg bg-black py-3 px-12 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                Buy Now
              </button> */}
                <p className="cursor-pointer px-7 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-black inline-block">
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-cyan-600 group-hover:h-full opacity-90"></span>
                  <span className="relative group-hover:text-white">
                    Buy Now
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    </DefaultLayout>
  );
};

export default BuyNft;
