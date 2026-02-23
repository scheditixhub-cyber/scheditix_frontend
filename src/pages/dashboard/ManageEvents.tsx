import { CiSearch } from "react-icons/ci";
import { GoChevronRight, GoPlus } from "react-icons/go";
import GlobalPagination from "../../components/GlobalPagination";

import empty from "../../assets/emptyfile.svg";
import { BiCopyAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import eventPfp from "../../assets/eventpfp1.jpg";
import { useState } from "react";

const ManageEvents = () => {
  const testData = [1];
  const [showUI, setShowUI] = useState(0);

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

        <div className="w-full h-max shadow-xl sm:shadow-none p-4 sm:p-0 rounded-t-2xl sm:rounded-none border border-gray-300 sm:border-none border-b-0">
          <p className="text-[#323232] font-semibold text-lg">My Events</p>
          <p className="text-xs text-[#737373] my-2">
            Manage and track your hosted events and performance.
          </p>
          <div className="w-max h-max flex items-center gap-4 text-xs my-3">
            <div
              className="w-max border-b-2 border-b-[#27187E] font-bold cursor-pointer transition-all duration-500 text-[#27187E]"
              onClick={() => setShowUI(0)}
            >
              Active Events (4)
            </div>
            <div
              className="w-max border-b-2 border-b-[#737373] font-bold cursor-pointer transition-all duration-500 text-[#737373]"
              onClick={() => setShowUI(1)}
            >
              Past Events (6)
            </div>
            <div
              className="w-max border-b-2 border-b-[#737373] font-bold cursor-pointer transition-all duration-500 text-[#737373]"
              onClick={() => setShowUI(2)}
            >
              Drafts (8)
            </div>
          </div>
          <div className="w-full h-max flex flex-col gap-4 mt-3">
            <div className="w-full h-max rounded-md border border-gray-300 flex flex-col sm:flex-row sm:gap-0 gap-3 items-center justify-between p-2">
              <div className="sm:w-[60%] w-full  h-10 border border-gray-300 rounded flex items-center pl-2 ">
                <CiSearch />
                <input
                  type="search"
                  className="w-full h-max outline-none border-none pl-2 text-xs"
                  placeholder="search events by name, date or status"
                />
              </div>
            </div>
          </div>
          <div className="w-full h-max flex flex-col gap-3 mt-3">
            <div className="w-full h-max bg-[#f8f8f8] px-2 sm:flex hidden items-center text-[#737373] font-semibold text-xs">
              <p className="w-[40%] h-max py-2">Event Details </p>
              <p className="w-[15%] h-max py-2">Date & Time</p>
              <p className="w-[15%] h-max py-2">Status</p>
              <p className="w-[15%] h-max py-2">Tickets Sold</p>
              <p className="w-[15%] h-max py-2">Actions</p>
            </div>
            <div className="w-full h-max bg-white flex sm:block flex-col gap-2 sm:gap-0">
              <>
                {showUI === 0 ? (
                  <>
                    {" "}
                    {/* Empty Card  */}
                    {testData.length === 0 ? (
                      <>
                        <div className="w-full h-max py-4 flex items-center flex-col gap-4 justify-center">
                          <img src={empty} alt="" />
                          <p className="text-sm font-medium">
                            You are yet to create an event
                          </p>
                          <button className="w-max h-max px-8 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium mt-5 flex gap-2 items-center justify-center ">
                            <BiCopyAlt size={20} />
                            Create Event
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Desktop Card  */}
                        {Array.from({ length: 6 }).map((_, index) => (
                          <NavLink
                            className="w-full h-max  border-b border-b-gray-300 px-2 sm:flex hidden items-center text-[#737373] font-medium text-[10px]"
                            key={index}
                            to={`/dashboard/manage/event/${index}`}
                          >
                            <div className="w-[40%] h-max py-4 flex gap-2 items-center">
                              <img
                                src={eventPfp}
                                alt=""
                                className="w-10 h-10 bg-sky-200 rounded-md"
                              />
                              <div className="">
                                <p className="text-xs font-bold text-[#0F172A]">
                                  Global Tech Summit 2026
                                </p>
                                <p className="text-[9px] text-[#737373]">
                                  Lagos, Nigeria (Showing Active)
                                </p>
                              </div>
                            </div>
                            <p className="w-[15%] h-max py-4 flex flex-col  justify-center truncate">
                              <span className="text-xs font-medium text-[#334155]">
                                July 02, 2026
                              </span>
                              <span>09:00 AM WAT</span>
                            </p>

                            <p className="w-[15%] h-max py-4 truncate">
                              <span className="w-max h-max px-3 py-1.5 text-[9px] font-bold rounded-full bg-[#FFD00014] text-[#C18700] border border-[#EAD67B]">
                                Pending
                              </span>
                            </p>
                            <p className="w-[15%] h-max py-4 truncate font-bold ">
                              400/410
                            </p>
                            <p className="w-[15%] h-max py-4 truncate font-bold hover:underline hover:cursor-pointer">
                              Manage
                            </p>
                          </NavLink>
                        ))}
                        {/* Mobile Card  */}
                        {Array.from({ length: 6 }).map((_, index) => (
                          <NavLink
                            className="w-full h-max rounded shadow border border-gray-300 px-2 py-2 flex flex-col gap-1 sm:hidden  text-[#737373] font-medium relative"
                            key={index}
                            to={`/dashboard/manage/event/${index}`}
                          >
                            <span className="absolute top-2 right-4">
                              <GoChevronRight />
                            </span>
                            <div className="w-full h-max flex items-center gap-2">
                              <img
                                src={eventPfp}
                                alt=""
                                className="w-10 h-10 bg-sky-200 rounded-md"
                              />
                              <div className="">
                                <p className="text-xs font-bold text-[#0F172A]">
                                  Global Tech Summit 2026
                                </p>
                                <p className="text-[9px] text-[#737373]">
                                  Lagos, Nigeria
                                </p>
                              </div>
                            </div>
                            <div className="w-full h-max flex justify-between">
                              <p className="w-1/2 h-max flex flex-col font-bold text-[#4A5565] truncate text-[10px]">
                                Date & Time
                                <p className=" h-max flex flex-col  justify-center truncate">
                                  <span className="text-xs font-medium text-[#334155]">
                                    July 02, 2026
                                  </span>
                                  <span className="font-medium text-[#334155] text-[9px]">
                                    09:00 AM WAT
                                  </span>
                                </p>
                              </p>
                              <p className="w-1/2 h-max flex flex-col font-bold text-[#4A5565] truncate text-[10px]">
                                Tickets Sold
                                <span className="text-[#101828] font-medium">
                                  20/400
                                </span>
                              </p>
                            </div>
                            <p className=" h-max pb-1 truncate">
                              <span className="w-max h-max px-3 py-1.5 text-[9px] font-bold rounded-full bg-[#FFD00014] text-[#C18700] border border-[#EAD67B]">
                                Pending
                              </span>
                            </p>
                          </NavLink>
                        ))}
                      </>
                    )}
                  </>
                ) : showUI === 1 ? (
                  <>
                    {" "}
                    {/* Empty Card  */}
                    {testData.length === 0 ? (
                      <>
                        <div className="w-full h-max py-4 flex items-center flex-col gap-4 justify-center">
                          <img src={empty} alt="" />
                          <p className="text-sm font-medium">
                            You are yet to create an event
                          </p>
                          <button className="w-max h-max px-8 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium mt-5 flex gap-2 items-center justify-center ">
                            <BiCopyAlt size={20} />
                            Create Event
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Desktop Card  */}
                        {Array.from({ length: 6 }).map((_, index) => (
                          <NavLink
                            className="w-full h-max  border-b border-b-gray-300 px-2 sm:flex hidden items-center text-[#737373] font-medium text-[10px]"
                            key={index}
                            to={`/dashboard/manage/event/${index}`}
                          >
                            <div className="w-[40%] h-max py-4 flex gap-2 items-center">
                              <img
                                src={eventPfp}
                                alt=""
                                className="w-10 h-10 bg-sky-200 rounded-md"
                              />
                              <div className="">
                                <p className="text-xs font-bold text-[#0F172A]">
                                  Global Tech Summit 2026
                                </p>
                                <p className="text-[9px] text-[#737373]">
                                  Lagos, Nigeria (showing past)
                                </p>
                              </div>
                            </div>
                            <p className="w-[15%] h-max py-4 flex flex-col  justify-center truncate">
                              <span className="text-xs font-medium text-[#334155]">
                                July 02, 2026
                              </span>
                              <span>09:00 AM WAT</span>
                            </p>

                            <p className="w-[15%] h-max py-4 truncate">
                              <span className="w-max h-max px-3 py-1.5 text-[9px] font-bold rounded-full bg-[#FFD00014] text-[#C18700] border border-[#EAD67B]">
                                Pending
                              </span>
                            </p>
                            <p className="w-[15%] h-max py-4 truncate font-bold ">
                              400/410
                            </p>
                            <p className="w-[15%] h-max py-4 truncate font-bold hover:underline hover:cursor-pointer">
                              Manage
                            </p>
                          </NavLink>
                        ))}
                        {/* Mobile Card  */}
                        {Array.from({ length: 6 }).map((_, index) => (
                          <NavLink
                            className="w-full h-max rounded shadow border border-gray-300 px-2 py-2 flex flex-col gap-1 sm:hidden  text-[#737373] font-medium relative"
                            key={index}
                            to={`/dashboard/manage/event/${index}`}
                          >
                            <span className="absolute top-2 right-4">
                              <GoChevronRight />
                            </span>
                            <div className="w-full h-max flex items-center gap-2">
                              <img
                                src={eventPfp}
                                alt=""
                                className="w-10 h-10 bg-sky-200 rounded-md"
                              />
                              <div className="">
                                <p className="text-xs font-bold text-[#0F172A]">
                                  Global Tech Summit 2026
                                </p>
                                <p className="text-[9px] text-[#737373]">
                                  Lagos, Nigeria
                                </p>
                              </div>
                            </div>
                            <div className="w-full h-max flex justify-between">
                              <p className="w-1/2 h-max flex flex-col font-bold text-[#4A5565] truncate text-[10px]">
                                Date & Time
                                <p className=" h-max flex flex-col  justify-center truncate">
                                  <span className="text-xs font-medium text-[#334155]">
                                    July 02, 2026
                                  </span>
                                  <span className="font-medium text-[#334155] text-[9px]">
                                    09:00 AM WAT
                                  </span>
                                </p>
                              </p>
                              <p className="w-1/2 h-max flex flex-col font-bold text-[#4A5565] truncate text-[10px]">
                                Tickets Sold
                                <span className="text-[#101828] font-medium">
                                  20/400
                                </span>
                              </p>
                            </div>
                            <p className=" h-max pb-1 truncate">
                              <span className="w-max h-max px-3 py-1.5 text-[9px] font-bold rounded-full bg-[#FFD00014] text-[#C18700] border border-[#EAD67B]">
                                Pending
                              </span>
                            </p>
                          </NavLink>
                        ))}
                      </>
                    )}
                  </>
                ) : showUI === 2 ? (
                  <>
                    {/* Empty Card  */}
                    {testData.length === 0 ? (
                      <>
                        <div className="w-full h-max py-4 flex items-center flex-col gap-4 justify-center">
                          <img src={empty} alt="" />
                          <p className="text-sm font-medium">
                            You are yet to create an event
                          </p>
                          <button className="w-max h-max px-8 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium mt-5 flex gap-2 items-center justify-center ">
                            <BiCopyAlt size={20} />
                            Create Event
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Desktop Card  */}
                        {Array.from({ length: 6 }).map((_, index) => (
                          <NavLink
                            className="w-full h-max  border-b border-b-gray-300 px-2 sm:flex hidden items-center text-[#737373] font-medium text-[10px]"
                            key={index}
                            to={`/dashboard/manage/event/${index}`}
                          >
                            <div className="w-[40%] h-max py-4 flex gap-2 items-center">
                              <img
                                src={eventPfp}
                                alt=""
                                className="w-10 h-10 bg-sky-200 rounded-md"
                              />
                              <div className="">
                                <p className="text-xs font-bold text-[#0F172A]">
                                  Global Tech Summit 2026
                                </p>
                                <p className="text-[9px] text-[#737373]">
                                  Lagos, Nigeria (showing drafts)
                                </p>
                              </div>
                            </div>
                            <p className="w-[15%] h-max py-4 flex flex-col  justify-center truncate">
                              <span className="text-xs font-medium text-[#334155]">
                                July 02, 2026
                              </span>
                              <span>09:00 AM WAT</span>
                            </p>

                            <p className="w-[15%] h-max py-4 truncate">
                              <span className="w-max h-max px-3 py-1.5 text-[9px] font-bold rounded-full bg-[#FFD00014] text-[#C18700] border border-[#EAD67B]">
                                Pending
                              </span>
                            </p>
                            <p className="w-[15%] h-max py-4 truncate font-bold ">
                              400/410
                            </p>
                            <p className="w-[15%] h-max py-4 truncate font-bold hover:underline hover:cursor-pointer">
                              Manage
                            </p>
                          </NavLink>
                        ))}
                        {/* Mobile Card  */}
                        {Array.from({ length: 6 }).map((_, index) => (
                          <NavLink
                            className="w-full h-max rounded shadow border border-gray-300 px-2 py-2 flex flex-col gap-1 sm:hidden  text-[#737373] font-medium relative"
                            key={index}
                            to={`/dashboard/manage/event/${index}`}
                          >
                            <span className="absolute top-2 right-4">
                              <GoChevronRight />
                            </span>
                            <div className="w-full h-max flex items-center gap-2">
                              <img
                                src={eventPfp}
                                alt=""
                                className="w-10 h-10 bg-sky-200 rounded-md"
                              />
                              <div className="">
                                <p className="text-xs font-bold text-[#0F172A]">
                                  Global Tech Summit 2026
                                </p>
                                <p className="text-[9px] text-[#737373]">
                                  Lagos, Nigeria
                                </p>
                              </div>
                            </div>
                            <div className="w-full h-max flex justify-between">
                              <p className="w-1/2 h-max flex flex-col font-bold text-[#4A5565] truncate text-[10px]">
                                Date & Time
                                <p className=" h-max flex flex-col  justify-center truncate">
                                  <span className="text-xs font-medium text-[#334155]">
                                    July 02, 2026
                                  </span>
                                  <span className="font-medium text-[#334155] text-[9px]">
                                    09:00 AM WAT
                                  </span>
                                </p>
                              </p>
                              <p className="w-1/2 h-max flex flex-col font-bold text-[#4A5565] truncate text-[10px]">
                                Tickets Sold
                                <span className="text-[#101828] font-medium">
                                  20/400
                                </span>
                              </p>
                            </div>
                            <p className=" h-max pb-1 truncate">
                              <span className="w-max h-max px-3 py-1.5 text-[9px] font-bold rounded-full bg-[#FFD00014] text-[#C18700] border border-[#EAD67B]">
                                Pending
                              </span>
                            </p>
                          </NavLink>
                        ))}
                      </>
                    )}
                  </>
                ) : null}
              </>
            </div>
            <GlobalPagination />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageEvents;
