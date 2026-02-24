import { Pagination, type PaginationProps } from "antd";

const GlobalPagination = () => {
  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };
  return (
    <div className="w-full h-12 border rounded-md border-gray-300 shadow flex items-center justify-between px-3">
      <p className="text-[10px] hidden sm:flex font-medium md:text-sm">
        Showing Page 1 of 50
      </p>
      <Pagination
        defaultCurrent={2}
        total={500}
        onChange={onChange}
        size="medium"
        showSizeChanger={false}
      />
    </div>
  );
};

export default GlobalPagination;
