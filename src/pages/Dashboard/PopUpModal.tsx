const PopUpModal = ({ data, isActivePopup, openAndClosePopupModal }: any) => {
  return (
    <div
      className={`fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5 
        transition-all duration-2000 ease-in-out ${
          isActivePopup ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
    >
      <div
        className={`modal-container overflow-auto max-h-[80%] w-full max-w-fit rounded-lg bg-white dark:bg-boxdark 
          transition-all duration-1000 ease-in-out transform ${
            isActivePopup ? 'scale-100 opacity-100' : 'scale-80 opacity-50'
          }`}
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className.includes('modal-container')) {
            openAndClosePopupModal(false);
          }
        }}
      >
        {/* Modal content */}
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[370px] lg:w-[600px] border-b border-stroke pb-2 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Announcement
              </h2>

              <strong
                className="text-4xl align-center cursor-pointer hover:text-black dark:hover:text-white"
                onClick={() => openAndClosePopupModal(false)}
              >
                &times;
              </strong>
            </div>
            <hr />
            <div className="pb-5 mt-3">
              <p className="text-lg font-bold text-[#1e6f30] dark:text-[#39c858] mx-auto px-2 mt-3">
                {data?.title}
              </p>
              <p className="p-2 text-[#1e6f30] dark:text-[#39c858] font-normal">
                {data?.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpModal;
