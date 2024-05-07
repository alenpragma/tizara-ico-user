const ViewDepositDetailsModal = ({ closeModal, details }: any) => {
  return (
    <div className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto  max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal h-fit rounded-sm border border-stroke bg-white shadow-8 dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[320px]  lg:w-[600px] border-b border-stroke px-1 pb-5 dark:border-strokedark">
            <div className="w-full flex justify-between px-3 place-items-center py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Deposit Details
              </h2>
              <hr />
              <strong
                className="text-4xl px-2 align-center cursor-pointer  hover:text-black dark:hover:text-white"
                onClick={closeModal}
              >
                &times;
              </strong>
            </div>
            <hr />
            <div className="text-black dark:text-white flex flex-col w-full gap-2 px-6.5 py-5">
              {/* <img src={details.image} alt="" /> */}
              <p>Name: {details.name}</p>
              <p>Email: {details.email}</p>
              <p>User id: {details.user_id}</p>

              <p>Method: {details.method}</p>
              <p>Network: {details.network}</p>
              <p>Txn id: {details.txn_id}</p>
              <p>Type: {details.type}</p>
              <p>Wallet name: {details.wallet_name}</p>
              <p>Wallet no: {details.wallet_no}</p>
              <p>Status: {details.status}</p>
              <button
                onClick={() => closeModal()}
                className="btn w-fit ms-auto flex justify-end rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDepositDetailsModal;
