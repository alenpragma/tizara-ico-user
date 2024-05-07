export const ViewuserModal = ({ closeModal, userDetail }: any) => {
  return (
    <div className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5">
      <div
        className="overflow-auto  max-h-[80%] max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal h-fit rounded-sm border border-stroke bg-white shadow-8 dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className=" w-[320px] lg:w-[600px] border-b border-stroke pb-4 px-1 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                User Details
              </h2>
              <strong
                className="text-4xl align-center cursor-pointer  hover:text-black dark:hover:text-white"
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>

            <hr />
            <div className="text-black dark:text-white flex flex-col w-full gap-5.5 p-6.5">
              {/* <img src={userDetail.image} alt="" /> */}
              <p>
                {' '}
                <span className="font-semibold">Name:</span> {userDetail.name}
              </p>
              <p>
                {' '}
                <span className="font-semibold">Email:</span> {userDetail.email}
              </p>
              <p>
                {' '}
                <span className="font-semibold">Phone:</span> {userDetail.phone}
              </p>
              <p>
                {' '}
                <span className="font-semibold">Name:</span> {userDetail.name}
              </p>
              <p>
                {' '}
                <span className="font-semibold">Referral code:</span>
                {userDetail.referral_code}
              </p>
              <p>
                {' '}
                <span className="font-semibold">Sponsor:</span>{' '}
                {userDetail.sponsor}
              </p>
            </div>
            <button
              onClick={() => closeModal()}
              className="btn w-fit mx-3 ms-auto flex justify-end rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
