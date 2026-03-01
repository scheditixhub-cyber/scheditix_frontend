import { Pagination } from "antd";

interface Props {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

const GlobalPagination = ({ current, total, pageSize, onChange }: Props) => {
  return (
    <div className="w-full h-12 border rounded-md border-gray-300 shadow flex items-center justify-between px-3">
      <p className="text-[10px] hidden sm:flex font-medium md:text-sm">
        Showing Page {current} of {Math.ceil(total / pageSize)}
      </p>

      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default GlobalPagination;
