import { ReactNode } from 'react';

type IRow = {
  data: string | number | null;
  children?: ReactNode;
};

const TableRowCopy = ({ data, children }: IRow) => {
  return (
    <td className="   gap-2 border-b border-[#eee] py-5 px-4 dark:border-strokedark">
      <div className="flex gap-2">
        <span className="font-medium text-black dark:text-white">{data}</span>
        {children}
      </div>
    </td>
  );
};

export default TableRowCopy;
