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
        {/* Desktop Sidebar */}
        <div className="w-0 hidden sm:flex sm:w-64 h-full bg-white border-r border-r-[#DFDCEC]">
          <div className="w-full h-full p-4">
            {/* Logo */}
            <div className="w-full h-16 flex gap-2 items-center mb-6">
              <img src={logo} alt="" className="w-10" />
              <p className="text-base font-medium">Wave Pass</p>
            </div>

            {/* Create Event Button - Desktop only */}
            <NavLink
              to={"/dashboard/create-event"}
              className="w-full h-12 px-3 mb-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium hidden sm:flex items-center gap-2"
            >
              <GoPlus size={20} />
              <span>Create Event</span>
            </NavLink>

            {/* Navigation Links */}
            <div className="w-full h-[calc(100%-10rem)] flex flex-col justify-between">
              <div className="w-full flex flex-col gap-1">
                <NavLink
                  className={({ isActive }) =>
                    `w-full h-12 flex items-center gap-3 px-3 text-sm font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded ${
                      isActive ? "bg-[#F7F6FA] border border-[#DFDCEC]" : ""
                    }`
                  }
                  to={`/dashboard/overview`}
                >
                  <RxDashboard size={18} />
                  <span>Overview</span>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `w-full h-12 flex items-center gap-3 px-3 text-sm font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded ${
                      isActive ? "bg-[#F7F6FA] border border-[#DFDCEC]" : ""
                    }`
                  }
                  to={`/dashboard/manage/events`}
                >
                  <CiCircleList size={18} />
                  <span>Manage Events</span>
                </NavLink>
              </div>
              <div className="w-full flex flex-col gap-1">
                <NavLink
                  className={({ isActive }) =>
                    `w-full h-12 flex items-center gap-3 px-3 text-sm font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded ${
                      isActive ? "bg-[#F7F6FA] border border-[#DFDCEC]" : ""
                    }`
                  }
                  to={`/dashboard/settings`}
                >
                  <CiSettings size={18} />
                  <span>Settings</span>
                </NavLink>

                <div className="w-full h-12 flex items-center gap-3 px-3 text-sm font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded">
                  <CiLogout size={18} />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full sm:w-[calc(100%-16rem)] h-full">
          {/* Header */}
          <div className="w-full h-20 border-b border-b-[#DFDCEC] flex items-center justify-between px-4 sm:px-6">
            {/* Left section - Mobile Menu Button */}
            <div className="flex items-center">
              <button
                className="sm:hidden flex w-10 h-10 p-2 rounded bg-[#F3F2F8] items-center justify-center"
                onClick={() => setOpenSideBar(true)}
              >
                <CiMenuBurger size={20} />
              </button>
            </div>

            {/* Center section - Mobile Logo */}
            <div className="sm:hidden">
              <div className="flex gap-2 items-center">
                <img src={logo} alt="" className="w-8" />
                <p className="text-base font-medium">Wave Pass</p>
              </div>
            </div>

            {/* Right section - Profile */}
            <div className="flex items-center">
              {/* Desktop Profile */}
              <div className="hidden sm:flex items-center gap-3">
                <p className="text-sm">Rapheal Ukachukwu</p>
                <div className="w-9 h-9 rounded-full bg-[#27187E] uppercase text-lg text-white flex items-center justify-center font-medium">
                  R
                </div>
              </div>

              {/* Mobile Profile Dropdown */}
              <div
                className="flex sm:hidden gap-1 items-center cursor-pointer"
                onClick={() => setOpenProfile(!openProfile)}
              >
                <div className="w-9 h-9 rounded-lg bg-[#27187E] uppercase text-lg text-white flex items-center justify-center font-medium">
                  R
                </div>
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  open={openProfile}
                  onOpenChange={setOpenProfile}
                >
                  <a
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center"
                  >
                    <IoChevronDownOutline size={18} />
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="w-full h-[calc(100%-5rem)] overflow-y-auto">
            <div className="w-full h-max min-h-full p-4 sm:p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer - No Create Event Button */}
      <Drawer
        open={openSideBar}
        closeIcon={false}
        onClose={() => setOpenSideBar(false)}
        placement="left"
        width={280}
        className="sm:hidden"
      >
        <div className="w-full h-full p-4">
          {/* Drawer Header */}
          <div className="w-full h-16 flex items-center justify-between mb-6">
            <div className="flex gap-2 items-center">
              <img src={logo} alt="" className="w-8" />
              <p className="text-base font-medium">Wave Pass</p>
            </div>
            <button
              className="flex w-8 h-8 p-1.5 rounded bg-[#F3F2F8] items-center justify-center"
              onClick={() => setOpenSideBar(false)}
            >
              <IoCloseOutline size={20} />
            </button>
          </div>

          {/* Drawer Navigation - No Create Event Button */}
          <div className="w-full h-[calc(100%-5rem)] flex flex-col justify-between">
            <div className="w-full flex flex-col gap-1">
              <NavLink
                onClick={() => setOpenSideBar(false)}
                className={({ isActive }) =>
                  `w-full h-14 flex items-center gap-3 px-3 text-base font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded-lg ${
                    isActive ? "bg-[#F7F6FA] border border-[#DFDCEC]" : ""
                  }`
                }
                to={`/dashboard/overview`}
              >
                <RxDashboard size={22} />
                <span>Overview</span>
              </NavLink>
              <NavLink
                onClick={() => setOpenSideBar(false)}
                className={({ isActive }) =>
                  `w-full h-14 flex items-center gap-3 px-3 text-base font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded-lg ${
                    isActive ? "bg-[#F7F6FA] border border-[#DFDCEC]" : ""
                  }`
                }
                to={`/dashboard/manage/events`}
              >
                <CiCircleList size={22} />
                <span>Manage Events</span>
              </NavLink>
            </div>

            <div className="w-full flex flex-col gap-1">
              <NavLink
                onClick={() => setOpenSideBar(false)}
                className={({ isActive }) =>
                  `w-full h-14 flex items-center gap-3 px-3 text-base font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded-lg ${
                    isActive ? "bg-[#F7F6FA] border border-[#DFDCEC]" : ""
                  }`
                }
                to={`/dashboard/settings`}
              >
                <CiSettings size={22} />
                <span>Settings</span>
              </NavLink>

              <div className="w-full h-14 flex items-center gap-3 px-3 text-base font-medium text-[#737373] cursor-pointer hover:bg-[#F7F6FA] transition-all duration-500 rounded-lg">
                <CiLogout size={22} />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default DashboardLayout;
