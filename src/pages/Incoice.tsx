'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsChevronDown, BsClock } from 'react-icons/bs';
import { FaCopy } from 'react-icons/fa6';
import { FiCopy } from 'react-icons/fi';
import QRCode from 'react-qr-code';
import { useNavigate, useSearchParams } from 'react-router-dom';

type InvoiceData = {
  wallet_address: string;
  amount: string;
  created_at: string;
  token_name: string;
};

type paymentStatus = {
  paymentStatus: 'pending' | 'processing' | 'success'; // 🆕
};

const Incoice = () => {
  const [email, setEmail] = useState('');
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false); // ✅ Move here

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const invoiceId = searchParams.get('id');
  const [data, setData] = useState<InvoiceData>();

  //  status  if true == Processing
  // payment_status == complete == success
  const [status, setStatus] = useState<paymentStatus>({
    paymentStatus: 'pending',
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchInvoiceStatus = async () => {
      try {
        const res = await axios.get(
          `https://evm.blockmaster.info/api/payments/${invoiceId}`,
        );
        console.log(res.data);

        // Example response:
        // res.data = { status: true, payment_status: "complete" }

        if (
          res.data.status === false &&
          res.data.payment_status === 'completed'
        ) {
          setStatus({ paymentStatus: 'success' });
          navigate('/pay/success');
        } else if (res.data.status === true) {
          setStatus({ paymentStatus: 'processing' });
        } else {
          setStatus({ paymentStatus: 'pending' });
        }
      } catch (err) {
        console.error('Failed to fetch invoice data:', err);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchInvoiceStatus();

    // Poll every 10 seconds
    interval = setInterval(fetchInvoiceStatus, 15000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [invoiceId]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleEmailConfirm = () => {
    if (!email) return alert('Please enter your email');
    alert(`Confirmation email set: ${email}`);
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(
          `https://evm.blockmaster.info/api/invoice/${invoiceId}`,
        ); // 🔁 Change endpoint if needed
        console.log(res.data);

        setData(res.data.invoice);
      } catch (err) {
        console.error('Failed to fetch invoice data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [invoiceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading invoice...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        Failed to load invoice data.
      </div>
    );
  }

  const { wallet_address, amount, token_name } = data;

  useEffect(() => {
    if (!data?.created_at) return; // 🛡 prevent invalid hook logic

    const createdAt = new Date(data.created_at);
    const expiryTime = new Date(createdAt.getTime() + 20 * 60 * 1000);

    const checkExpiry = () => {
      const now = new Date();
      setIsExpired(now > expiryTime);
    };

    checkExpiry();
    const interval = setInterval(checkExpiry, 1000);

    return () => clearInterval(interval);
  }, [data?.created_at]); // also safe dependency

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // e.g., "8/1/2025, 10:20:00 AM"
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-yellow-300 rounded-full opacity-20" />
                <div className="absolute top-1 left-1 w-2 h-6 bg-yellow-400 rounded-full transform -rotate-12" />
                <div className="absolute top-2 right-1 w-1 h-4 bg-yellow-400 rounded-full transform rotate-12" />
                <div className="absolute bottom-1 left-2 w-3 h-1 bg-yellow-400 rounded-full" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Tizara Ecosystem
              </h1>
            </div>

            <div>
              <div>{formatDateTime(data.created_at)}</div>

              {!isExpired ? (
                <div className="flex items-center space-x-2 text-blue-500">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 border-2 border-blue-500 rounded-full animate-spin border-t-transparent" />
                  </div>
                  <span className="text-sm font-medium">
                    Waiting for payment
                  </span>
                </div>
              ) : (
                <div className="text-red-500 text-sm font-medium">
                  Invoice expired
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-gray-900">
                  Send deposit
                </h2>
                <div className="flex items-center space-x-1 text-gray-500">
                  <BsClock className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 bg-white border border-gray-200 rounded-lg p-4">
                    <QRCode
                      size={256}
                      style={{
                        height: 'auto',
                        maxWidth: '100%',
                        width: '100%',
                      }}
                      value={data.wallet_address}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    {/* <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Amount</span>
                      <span className="text-sm text-gray-400">~${0.0}</span>
                    </div> */}
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-gray-900">
                        {amount} {token_name}
                      </span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded">
                        {'network (BEP20)'}
                      </span>
                      <button
                        onClick={() => handleCopy(amount)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <FiCopy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-2">Address</div>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 text-sm font-mono text-gray-900 break-all">
                        {wallet_address}
                      </code>
                      <button
                        onClick={() => handleCopy(wallet_address)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <FaCopy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* More Details */}
              <div className="mt-8">
                <button
                  onClick={() => setShowMoreDetails(!showMoreDetails)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <span className="font-medium">More details</span>
                  <BsChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showMoreDetails ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {showMoreDetails && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <strong>Network:</strong> {'network (BEP20)'}
                      </p>
                      <p>
                        <strong>Token:</strong> {token_name}
                      </p>
                      <p>
                        <strong>Confirmations:</strong> {'12'} blocks
                      </p>
                      {/* <p>
                        <strong>Processing time:</strong> {10}
                      </p> */}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Payment Status */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {['pending', 'processing', 'success'].map((step, index) => {
                  const isActive = status.paymentStatus === step;
                  const isCompleted =
                    (step === 'pending' &&
                      ['processing', 'success'].includes(
                        status.paymentStatus,
                      )) ||
                    (step === 'processing' &&
                      status.paymentStatus === 'success');

                  const stepMap: Record<string, string> = {
                    pending: 'Waiting for payment',
                    processing: 'Processing payment',
                    success: 'Success! 🎉',
                  };

                  const colorMap: Record<string, string> = {
                    pending: 'blue',
                    processing: 'yellow',
                    success: 'green',
                  };

                  const color = colorMap[step];

                  return (
                    <div key={step} className="relative pl-10">
                      {/* Vertical connector - KEEP only this */}
                      {index !== 0 && (
                        <div
                          className="absolute top-0 left-4 w-px h-full"
                          style={{
                            backgroundColor:
                              isCompleted || isActive
                                ? color === 'blue'
                                  ? '#3B82F6'
                                  : color === 'yellow'
                                  ? '#F59E0B'
                                  : '#10B981'
                                : '#E5E7EB', // gray-200
                          }}
                        />
                      )}

                      <div className="flex items-center space-x-3">
                        {/* Circle status */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isActive || isCompleted
                              ? `bg-${color}-100`
                              : 'bg-gray-100'
                          }`}
                        >
                          {/* Spinner for active step (waiting or processing) */}
                          {(step === 'pending' || step === 'processing') &&
                            isActive && (
                              <div
                                className={`w-4 h-4 border-2 ${
                                  step === 'processing'
                                    ? 'border-yellow-600'
                                    : 'border-blue-500'
                                } rounded-full animate-spin border-t-transparent`}
                              />
                            )}

                          {/* Success checkmark */}
                          {step === 'success' && isActive && (
                            <svg
                              className="w-4 h-4 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}

                          {/* Completed dot */}
                          {!isActive && isCompleted && (
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{
                                backgroundColor:
                                  color === 'blue'
                                    ? '#3B82F6'
                                    : color === 'yellow'
                                    ? '#F59E0B'
                                    : '#10B981',
                              }}
                            />
                          )}

                          {/* Inactive */}
                          {!isActive && !isCompleted && (
                            <div className="w-4 h-4 bg-gray-300 rounded-full" />
                          )}
                        </div>

                        {/* Label */}
                        <span
                          className={`font-medium ${
                            isActive
                              ? `text-${color}-600`
                              : isCompleted
                              ? `text-${color}-500`
                              : 'text-gray-400'
                          }`}
                        >
                          {stepMap[step]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Incoice;
