import React from 'react';

type StatusBadgeProps = {
  status: 'PENDING' | 'APPROVE' | 'REJECT' | string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles = {
    PENDING: 'bg-warning text-warning',
    APPROVE: 'bg-success text-success',
    REJECT: 'bg-danger text-danger',
  };

  const defaultStyle = 'bg-gray-200 text-gray-600';

  return (
    <p
      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
        statusStyles[status as keyof typeof statusStyles] || defaultStyle
      }`}
    >
      {status}
    </p>
  );
};

export default StatusBadge;
