import { NavLink, Outlet } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import {
  CiCircleList,
  CiLogout,
  CiMenuBurger,
  CiSettings,
} from "react-icons/ci";
import logo from "../../assets/logo2.svg";
import { GoPlus } from "react-icons/go";
import { Drawer, Dropdown, type MenuProps } from "antd";
import { useState } from "react";
import { IoChevronDownOutline, IoCloseOutline } from "react-icons/io5";

const DashboardLayout = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const items: MenuProps["items"] = [
    {
      label: <p>Profile</p>,
      key: "0",
    },
    {
      label: <p>Settings</p>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "Logout",
      key: "3",
    },
  ];

  return (
    <>
      <div className="w-full h-screen flex">
        <div className="w-0 hidden sm:flex sm:w-50  h-full bg-white border-r border-r-[#DFDCEC]">
          <div className="w-full h-full p-3">
            <div className="w-full h-16 flex gap-2 items-center ">
              <img src={logo} alt="" className="w-10" />
              <p className="text-base font-medium">Wave Pass</p>
            </div>
            <div className="w-full h-[calc(100%-4rem)] flex flex-col justify-between ">
              <div className="w-full h-[calc(100%-6rem)] overflow-y-auto flex flex-col gap-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "w-full h-12 flex items-center gap-2 text-sm justify-center font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded bg-[#F7F6FA] border border-[#DFDCEC]"
                      : "w-full h-12 flex items-center gap-2 text-sm justify-center font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded "
                  }
                  to={`/dashboard/overview`}
                >
                  <RxDashboard /> <p className="text-[#737373]">Overview</p>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "w-full h-12 flex items-center gap-2 text-sm justify-center font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded bg-[#F7F6FA] border border-[#DFDCEC]"
                      : "w-full h-12 flex items-center gap-2 text-sm justify-center font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded "
                  }
                  to={`/dashboard/manage/events`}
                >
                  {" "}
                  <CiCircleList />{" "}
                  <p className="text-[#737373]">Manage Events</p>
                </NavLink>
              </div>
              <div className="w-full h-max flex flex-col gap-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "w-full h-12 flex items-center gap-2 text-sm justify-center font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded bg-[#F7F6FA] border border-[#DFDCEC]"
                      : "w-full h-12 flex items-center gap-2 text-sm justify-center font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded "
                  }
                  to={`/dashboard/settings`}
                >
                  <CiSettings /> <p className="text-[#737373]">Settings</p>
                </NavLink>

                <div className="w-full h-12 flex items-center gap-2 text-sm justify-center font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded">
                  <CiLogout /> <p>Logout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[calc(100%-12.5rem)]  h-full ">
          <div className="w-full h-20  border-b border-b-[#DFDCEC] flex items-center justify-between px-6">
            <span
              className="sm:hidden flex w-max h-max p-2 rounded bg-[#F3F2F8]"
              onClick={() => setOpenSideBar(true)}
            >
              <CiMenuBurger size={20} className="" />
            </span>
            <NavLink
              to={"/dashboard/create-event"}
              className="w-max h-max px-8 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium hidden sm:flex gap-2 items-center justify-center"
            >
              <GoPlus size={20} />
              Create Event
            </NavLink>

            <div className="w-max h-16 sm:hidden flex gap-2 items-center justify-between ">
              <div className="flex gap-2 items-center">
                <img src={logo} alt="" className="w-10" />
                <p className="text-base font-medium">Wave Pass</p>
              </div>
            </div>

            <div className="w-max h-max hidden items-center gap-2 sm:flex">
              <p className="text-sm">Rapheal Ukachukwu</p>
              <div className="w-8 h-8 rounded-full bg-[#27187E] uppercase text-xl text-white flex items-center justify-center font-medium">
                c
              </div>
            </div>
            <div
              className="w-max h-max flex sm:hidden gap-2 items-center cursor-pointer "
              onClick={() => setOpenProfile(!openProfile)}
            >
              <div className="w-8 h-8 rounded-lg bg-[#27187E] uppercase text-xl text-white flex items-center justify-center font-medium">
                c
              </div>
              <span className="pt-2">
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  open={openProfile}
                  destroyOnHidden={true}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <IoChevronDownOutline size={20} />
                  </a>
                </Dropdown>
              </span>
            </div>
          </div>
          <div className="w-full h-[calc(100%-5rem)]  overflow-y-auto">
            <div className="w-full h-max min-h-full p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <Drawer
        className=""
        open={openSideBar}
        closeIcon={false}
        onClose={() => setOpenSideBar(false)}
        placement="left"
        size={280}
      >
        <div className="w-full h-full p-3">
          <div className="w-full h-16 flex gap-2 items-center justify-between ">
            <div className="flex gap-2 items-center">
              <img src={logo} alt="" className="w-10" />
              <p className="text-base font-medium">Wave Pass</p>
            </div>
            <span className="sm:hidden flex w-max h-max p-2 rounded bg-[#F3F2F8]">
              <IoCloseOutline size={25} onClick={() => setOpenSideBar(false)} />
            </span>
          </div>
          <div className="w-full h-[calc(100%-4rem)] flex flex-col justify-between ">
            <div className="w-full h-[calc(100%-6rem)] overflow-y-auto flex flex-col gap-2">
              <NavLink
                onClick={() => setOpenSideBar(false)}
                className={({ isActive }) =>
                  isActive
                    ? "w-full h-16 flex items-center gap-2 text-sm  font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded-lg pl-3 bg-[#F7F6FA] border border-[#DFDCEC]"
                    : "w-full h-16 flex items-center gap-2 text-sm  font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded-lg pl-3 "
                }
                to={`/dashboard/overview`}
              >
                <RxDashboard color="#737373" size={25} />{" "}
                <p className="text-[#737373] text-lg">Overview</p>
              </NavLink>
              <NavLink
                onClick={() => setOpenSideBar(false)}
                className={({ isActive }) =>
                  isActive
                    ? "w-full h-16 flex items-center gap-2 text-sm  font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded-lg pl-3 bg-[#F7F6FA] border border-[#DFDCEC]"
                    : "w-full h-16 flex items-center gap-2 text-sm  font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded-lg pl-3 "
                }
                to={`/dashboard/manage/events`}
              >
                {" "}
                <CiCircleList color="#737373" size={25} />{" "}
                <p className="text-[#737373] text-lg">Manage Events</p>
              </NavLink>
            </div>
            <div className="w-full h-max flex flex-col gap-2">
              <NavLink
                onClick={() => setOpenSideBar(false)}
                className={({ isActive }) =>
                  isActive
                    ? "w-full h-16 flex items-center gap-2 text-sm  font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded-lg pl-3 bg-[#F7F6FA] border border-[#DFDCEC]"
                    : "w-full h-16 flex items-center gap-2 text-sm  font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded-lg pl-3 "
                }
                to={`/dashboard/settings`}
              >
                <CiSettings color="#737373" size={25} />{" "}
                <p className="text-[#737373] text-lg">Settings</p>
              </NavLink>

              <div className="w-full h-12 flex items-center gap-2 text-sm pl-3 font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded">
                <CiLogout color="#737373" size={25} />{" "}
                <p className="text-[#737373] text-lg">Logout</p>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default DashboardLayout;
