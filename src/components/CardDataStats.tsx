import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: number | string;
  children: ReactNode;
  rate?: string;
  levelUp?: boolean;
  levelDown?: boolean;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="rounded-md cursor-pointer border border-stroke bg-white py-2 px-3 lg:py-6 lg:px-4.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* icon */}

      <div className="mt-0 flex items-center justify-between">
        <div className="flex h-10 w-10 lg:h-11.5 lg:w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-3">
          {children}
        </div>

        <div className="text-end">
          <h4 className="text-[14px] md:text-[20px] font-semibold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm md:text-[18px] font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
