import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';

const PaymentSuccess = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Payment " />
      <div>
        <div>
          <h1>Processing Payment</h1>
          <p>Please wait while we verify your transaction.</p>
        </div>
        <div className="mt-5">
          <Link
            to="/"
            className="mt-5 rounded-md bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            HOME
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PaymentSuccess;
