import { ReactNode } from 'react';

type IRow = {
  data: string | number | null;
  children?: ReactNode;
  cx?: string;
};

const TableRow = ({ data, children, cx }: IRow) => {
  return (
    <td className={` ${cx} border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
      <h5 className="font-medium text-black dark:text-white">{data}</h5>
      {children}
    </td>
  );
};

export default TableRow;
