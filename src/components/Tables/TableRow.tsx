import { ReactNode } from 'react';

type IRow = {
  data: string | number | null;
  children?: ReactNode;
};

const TableRow = ({ data, children }: IRow) => {
  return (
    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
      <h5 className="font-medium text-black dark:text-white">{data}</h5>
      {children}
    </td>
  );
};

export default TableRow;
