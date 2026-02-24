import { CiFilter, CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { HiOutlineTicket } from "react-icons/hi";
import { LuChevronsUpDown } from "react-icons/lu";
import GlobalPagination from "../../components/GlobalPagination";
import { Dropdown, type MenuProps } from "antd";
import { useState } from "react";
import empty from "../../assets/emptyfile.svg";
import { BiCopyAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const EventDetails = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const testData = [];

  const items: MenuProps["items"] = [
    {
      label: <p>Pending</p>,
      key: "0",
    },
    {
      label: <p>Checked In</p>,
      key: "1",
    },
  ];
  return (
    <>
      <div className="w-full h-max flex flex-col gap-4 ">
        <NavLink
          to={"/dashboard/create-event"}
          className="w-full h-max px-8 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium sm:hidden flex gap-2 items-center justify-center "
        >
          <GoPlus size={20} />
          Create Event
        </NavLink>
        <p className="text-lg font-medium">Global Tech Summit 2026</p>
        <div className="grid sm:grid-cols-4 grid-cols-2  gap-4">
          <div
            className="rounded-md bg-linear-to-tr from-[#FF00B71F] to-[#FFEAF31F] sm:h-40 h-30 flex flex-col justify-center sm:gap-6 gap-3  border border-gray-300 p-4 cursor-pointer transition-all hover:scale-101 shadow-lg"
            title="Total Sales"
          >
            <span className="w-max h-max p-1 bg-white border border-gray-200 rounded-md">
              <HiOutlineTicket size={25} />
            </span>
            <div className="flex flex-col gap-0 ">
              <p className="sm:text-sm text-xs font-medium truncate">
                Total Sales
              </p>
              <p className="sm:text-2xl text-xl font-bold">₦0.00</p>
            </div>
          </div>
          <div
            className="rounded-md bg-linear-to-tr from-[#4237F71F] to-[#DEDBEE1F] sm:h-40 h-30 flex flex-col justify-center sm:gap-6 gap-3  border border-gray-300 p-4 cursor-pointer transition-all hover:scale-101 shadow-lg"
            title="Total Tickets Sold"
          >
            <span className="w-max h-max p-1 bg-white border border-gray-200 rounded-md">
              <HiOutlineTicket size={25} />
            </span>
            <div className="flex flex-col gap-0 ">
              <p className="sm:text-sm text-xs font-medium truncate">
                Total Tickets Sold
              </p>
              <p className="sm:text-2xl text-xl font-bold">0</p>
            </div>
          </div>
          <div
            className="rounded-md bg-linear-to-tr from-[#16EF061F] to-[#D9FCD70F] sm:h-40 h-30 flex flex-col justify-center sm:gap-6 gap-3  border border-gray-300 p-4 cursor-pointer transition-all hover:scale-101 shadow-lg"
            title="Checked In Attendees"
          >
            <span className="w-max h-max p-1 bg-white border border-gray-200 rounded-md">
              <HiOutlineTicket size={25} />
            </span>
            <div className="flex flex-col gap-0 ">
              <p className="sm:text-sm text-xs font-medium truncate">
                Checked In Attendees{" "}
              </p>
              <p className="sm:text-2xl text-xl font-bold">0</p>
            </div>
          </div>
          <div
            className="rounded-md bg-linear-to-tr from-[#E8BB061F] to-[#FAF1CB1C] sm:h-40 h-30 flex flex-col justify-center sm:gap-6 gap-3  border border-gray-300 p-4 cursor-pointer transition-all hover:scale-101 shadow-lg"
            title="Unchecked"
          >
            <span className="w-max h-max p-1 bg-white border border-gray-200 rounded-md">
              <HiOutlineTicket size={25} />
            </span>
            <div className="flex flex-col gap-0 ">
              <p className="sm:text-sm text-xs font-medium truncate">
                Unchecked
              </p>
              <p className="sm:text-2xl text-xl font-bold">0</p>
            </div>
          </div>
        </div>

        <div className="w-full h-max shadow-xl sm:shadow-none p-4 sm:p-0 rounded-t-2xl sm:rounded-none border border-gray-300 sm:border-none border-b-0">
          <div className="w-full h-max flex justify-between items-center">
            <p className="text-[#323232] font-semibold text-lg">
              Attendee List
            </p>
            <NavLink
              to={`/dashboard/manage/event/check-in/${1}`}
              className="w-max h-max px-8 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium flex sm:hidden gap-2 items-center justify-center "
            >
              <GoPlus size={20} />
              Check In
            </NavLink>
          </div>
          <div className="w-full h-max flex flex-col gap-4 mt-3">
            <div className="w-full h-max rounded-md border border-gray-300 flex flex-col sm:flex-row sm:gap-0 gap-3 items-center justify-between p-2">
              <div className="sm:w-[60%] w-full  h-10 border border-gray-300 rounded flex items-center pl-2 ">
                <CiSearch />
                <input
                  type="search"
                  className="w-full h-max outline-none border-none pl-2 text-xs"
                  placeholder="Search email address, attendee name or code"
                />
              </div>
              <div
                className="sm:w-max w-full px-2 cursor-pointer h-10 rounded border border-gray-300 flex items-center justify-center sm:justify-start gap-3 sm:gap-1"
                onClick={() => setOpenFilter(!openFilter)}
              >
                <span className="pt-2">
                  <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                    open={openFilter}
                    destroyOnHidden={true}
                    classNames={"test"}
                  >
                    <a onClick={(e) => e.preventDefault()}></a>
                  </Dropdown>
                </span>
                <CiFilter />
                <p className="text-xs font-medium">Filter By</p>
                <LuChevronsUpDown />
              </div>
              <NavLink
                to={`/dashboard/manage/event/check-in/${1}`}
                className="w-max h-max px-8 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium sm:flex hidden gap-2 items-center justify-center "
              >
                <GoPlus size={20} />
                Check In Attendees
              </NavLink>
            </div>
          </div>
          <div className="w-full h-max flex flex-col gap-3 mt-3">
            <div className="w-full h-max bg-[#f8f8f8] px-2 sm:flex hidden items-center text-[#737373] font-semibold text-xs">
              <p className="w-1/6 h-max py-2">Attendee Name</p>
              <p className="w-1/6 h-max py-2">Email Address</p>
              <p className="w-1/6 h-max py-2">Phone No</p>
              <p className="w-1/6 h-max py-2">Purchase Date</p>
              <p className="w-1/6 h-max py-2">Code</p>
              <p className="w-1/6 h-max py-2">Check-in Status</p>
            </div>
            <div className="w-full h-max bg-white flex sm:block flex-col gap-2 sm:gap-0">
              <>
                {/* Empty Card  */}
                {testData.length === 0 ? (
                  <>
                    <div className="w-full h-max py-4 flex items-center flex-col gap-4 justify-center">
                      <img src={empty} alt="" />
                      <p className="text-sm font-medium">
                        Your guest list is currently empty
                      </p>
                      <button className="w-max h-max px-8 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium mt-5 flex gap-2 items-center justify-center ">
                        <BiCopyAlt size={20} />
                        Copy Event Link
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Desktop Card  */}
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        className="w-full h-max  border-b border-b-gray-300 px-2 sm:flex hidden items-center text-[#737373] font-medium text-[10px]"
                        key={index}
                      >
                        <p className="w-1/6 h-max py-4 truncate">
                          Attendee Name Name Name NameNameName
                        </p>
                        <p className="w-1/6 h-max py-4 truncate">
                          Email Address
                        </p>
                        <p className="w-1/6 h-max py-4 truncate">Phone No</p>
                        <p className="w-1/6 h-max py-4 truncate">
                          Purchase Date
                        </p>
                        <p className="w-1/6 h-max py-4 truncate">Code</p>
                        <p className="w-1/6 h-max py-4 truncate">
                          <span className="w-max h-max px-4 py-2 rounded-full bg-[#FFD00014] text-[#C18700] border border-[#EAD67B]">
                            Pending
                          </span>
                        </p>
                      </div>
                    ))}
                    {/* Mobile Card  */}
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        className="w-full h-max rounded shadow border border-gray-300 px-2 py-2 flex flex-col gap-1 sm:hidden  text-[#737373] font-medium "
                        key={index}
                      >
                        <div className="w-full h-max flex justify-between items-center gap-2">
                          <p className="w-[70%] h-max flex flex-col font-medium text-[#101828] truncate text-[12px]">
                            Rapheal Ukachukwu Rapheal Ukachukwu
                            <span className="text-[#4A5565] text-[12px] truncate">
                              cynthiacodesH@gmail.com
                            </span>
                          </p>
                          <p className="w-[30%] h-max py-4 truncate text-[9px]">
                            <span className="w-max h-max px-3.5 py-1.5 rounded-full bg-[#2BCB0014] text-[#176F00] border border-[#A8DD9A]">
                              Checked In
                            </span>
                          </p>
                        </div>
                        <div className="w-full h-max flex justify-between">
                          <p className="w-[60%] h-max flex flex-col font-medium text-[#4A5565] truncate text-[10px]">
                            Phone
                            <span className="text-[#101828]">08176545892</span>
                          </p>
                          <p className="w-[60%] h-max flex flex-col font-medium text-[#4A5565] truncate text-[10px]">
                            Phone
                            <span className="text-[#101828]">08176545892</span>
                          </p>
                        </div>
                        <div className="w-full h-max flex justify-between">
                          <p className="w-[60%] h-max flex flex-col font-medium text-[#4A5565] truncate text-[10px]">
                            Purchase Date
                            <span className="text-[#101828]">04/11/2025</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            </div>
            <GlobalPagination />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
