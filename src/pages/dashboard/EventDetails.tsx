import { CiFilter, CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { HiOutlineTicket } from "react-icons/hi";
import { LuChevronsUpDown } from "react-icons/lu";
import GlobalPagination from "../../components/GlobalPagination";
import { Dropdown, type MenuProps, message } from "antd";
import { useState, useEffect } from "react";
import empty from "../../assets/emptyfile.svg";
import { BiCopyAlt } from "react-icons/bi";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { createEvent } from "../../api";
import { ChevronLeft } from "lucide-react";

interface EventData {
  _id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  description: string;
  coverImage: string;
  capacity: number;
  ticketType: string;
  ticketQty: number;
  price: number;
  registeredCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Updated Attendee interface to match your API response
interface Attendee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  code: string;
  checkedInStatus: "pending" | "checked-in" | "cancelled";
  purchasedDate: string;
  eventId: string;
  isVerified?: boolean;
  ipAddress?: string;
  deviceId?: string;
}

const EventDetails = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [attendeesLoading, setAttendeesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchEventDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAttendees();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentPage]);

  const fetchEventDetails = async () => {
    if (!id) return;
    setLoading(true);

    try {
      const response = await createEvent.getEventById(id);
      setEventData(response?.data?.data);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch event details");
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendees = async () => {
    if (!id) return;
    setAttendeesLoading(true);

    try {
      const res = await createEvent.getAttendeeForEvent(
        id,
        currentPage,
        pageSize
      );

      setAttendees(res.data.data);
      setTotal(res.data.pagination.totalCount);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error fetching attendees:", error);
      message.error(
        error.response?.data?.message || "Failed to fetch attendees"
      );
    } finally {
      setAttendeesLoading(false);
    }
  };

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    setCurrentPage(1);
    setOpenFilter(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const copyEventLink = () => {
    const link = `${window.location.origin}/ticket-purchase/${id}`;
    navigator.clipboard.writeText(link);
    message.success("Event link copied to clipboard!");
  };

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time function
  const formatTime = (timeString: string) => {
    if (!timeString) return "TBD";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Get status badge color - using checkedInStatus
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "checked-in":
        return "bg-[#2BCB0014] text-[#176F00] border border-[#A8DD9A]";
      case "cancelled":
        return "bg-red-100 text-red-600 border border-red-300";
      default:
        return "bg-[#FFD00014] text-[#C18700] border border-[#EAD67B]";
    }
  };

  // Filter attendees by status client-side - using checkedInStatus
  const filteredAttendees = filterStatus
    ? attendees.filter((a) => a.checkedInStatus === filterStatus)
    : attendees;

  const items: MenuProps["items"] = [
    {
      key: "all",
      label: <p onClick={() => handleFilterChange("")}>All</p>,
    },
    {
      key: "pending",
      label: <p onClick={() => handleFilterChange("pending")}>Pending</p>,
    },
    {
      key: "checked_in",
      label: <p onClick={() => handleFilterChange("checked_in")}>Checked In</p>,
    },
    {
      key: "cancelled",
      label: <p onClick={() => handleFilterChange("cancelled")}>Cancelled</p>,
    },
  ];

  // Skeleton Loader for desktop view
  const DesktopSkeleton = () => (
    <div className="w-full border-b border-b-gray-300 px-2 sm:flex hidden items-center text-[#737373] font-medium text-[10px] animate-pulse">
      <div className="w-1/6 h-max py-4 truncate">
        <div className="h-3 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="w-1/6 h-max py-4 truncate">
        <div className="h-3 bg-gray-200 rounded w-32"></div>
      </div>
      <div className="w-1/6 h-max py-4 truncate">
        <div className="h-3 bg-gray-200 rounded w-28"></div>
      </div>
      <div className="w-1/6 h-max py-4 truncate">
        <div className="h-3 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="w-1/6 h-max py-4 truncate">
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="w-1/6 h-max py-4 truncate">
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
      </div>
    </div>
  );

  // Skeleton Loader for mobile view
  const MobileSkeleton = () => (
    <div className="w-full rounded shadow border border-gray-300 px-2 py-2 flex flex-col gap-1 sm:hidden text-[#737373] font-medium animate-pulse">
      <div className="w-full h-max flex justify-between items-center gap-2">
        <div className="w-[70%]">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-40"></div>
        </div>
        <div className="w-[30%]">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        </div>
      </div>
      <div className="w-full h-max flex justify-between">
        <div className="w-[60%]">
          <div className="h-3 bg-gray-200 rounded w-12 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="w-[60%]">
          <div className="h-3 bg-gray-200 rounded w-8 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
      <div className="w-full h-max">
        <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">
          Loading event details...
        </div>
      </div>
    );
  }

  if (error || !eventData) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-red-500">{error || "Event not found"}</div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-max flex flex-col gap-4 ">
        <button
          onClick={handleBack}
          className="flex items-center mb-4 gap-2 text-sm font-medium text-[#323232] hover:opacity-70 transition-opacity w-max"
        >
          <ChevronLeft size={20} />
          Back
        </button>
        <NavLink
          to={"/dashboard/create-event"}
          className="w-full h-max px-8 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium sm:hidden flex gap-2 items-center justify-center "
        >
          <GoPlus size={20} />
          Create Event
        </NavLink>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="flex-1">
            <p className="text-lg font-medium">{eventData.title}</p>
            <p className="text-sm text-gray-500">
              {eventData.location} • {formatDate(eventData.date)} •{" "}
              {formatTime(eventData.time)}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <button
              onClick={copyEventLink}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <BiCopyAlt size={16} />
              <span className="hidden sm:inline">Copy Link</span>
            </button>
            <NavLink
              to={`/dashboard/manage/event/edit/${id}`}
              className="px-4 py-2 text-sm font-medium text-white bg-[#27187E] rounded-lg hover:bg-[#1f0f5a] transition-colors flex items-center gap-2"
            >
              <span>Edit</span>
            </NavLink>
          </div>
        </div>

        <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
          <div
            className="rounded-md bg-linear-to-tr from-[#FF00B71F] to-[#FFEAF31F] sm:h-40 h-30 flex flex-col justify-center sm:gap-6 gap-3 border border-gray-300 p-4 cursor-pointer transition-all hover:scale-101 shadow-lg"
            title="Total Sales"
          >
            <span className="w-max h-max p-1 bg-white border border-gray-200 rounded-md">
              <HiOutlineTicket size={25} />
            </span>
            <div className="flex flex-col gap-0">
              <p className="sm:text-sm text-xs font-medium truncate">
                Total Sales
              </p>
              <p className="sm:text-2xl text-xl font-bold">
                {eventData.ticketType === "free"
                  ? "₦0.00"
                  : formatCurrency(
                      eventData.price * (eventData.registeredCount || 0)
                    )}
              </p>
            </div>
          </div>
          <div
            className="rounded-md bg-linear-to-tr from-[#4237F71F] to-[#DEDBEE1F] sm:h-40 h-30 flex flex-col justify-center sm:gap-6 gap-3 border border-gray-300 p-4 cursor-pointer transition-all hover:scale-101 shadow-lg"
            title="Total Tickets Sold"
          >
            <span className="w-max h-max p-1 bg-white border border-gray-200 rounded-md">
              <HiOutlineTicket size={25} />
            </span>
            <div className="flex flex-col gap-0">
              <p className="sm:text-sm text-xs font-medium truncate">
                Total Tickets Sold
              </p>
              <p className="sm:text-2xl text-xl font-bold">
                {eventData.registeredCount || 0}/{eventData.ticketQty || 0}
              </p>
            </div>
          </div>
          <div
            className="rounded-md bg-linear-to-tr from-[#16EF061F] to-[#D9FCD70F] sm:h-40 h-30 flex flex-col justify-center sm:gap-6 gap-3 border border-gray-300 p-4 cursor-pointer transition-all hover:scale-101 shadow-lg"
            title="Checked In Attendees"
          >
            <span className="w-max h-max p-1 bg-white border border-gray-200 rounded-md">
              <HiOutlineTicket size={25} />
            </span>
            <div className="flex flex-col gap-0">
              <p className="sm:text-sm text-xs font-medium truncate">
                Checked In Attendees
              </p>
              <p className="sm:text-2xl text-xl font-bold">
                {filteredAttendees.filter(
                  (a) => a.checkedInStatus === "checked-in"
                ).length || 0}
              </p>
            </div>
          </div>
          <div
            className="rounded-md bg-linear-to-tr from-[#E8BB061F] to-[#FAF1CB1C] sm:h-40 h-30 flex flex-col justify-center sm:gap-6 gap-3 border border-gray-300 p-4 cursor-pointer transition-all hover:scale-101 shadow-lg"
            title="Unchecked"
          >
            <span className="w-max h-max p-1 bg-white border border-gray-200 rounded-md">
              <HiOutlineTicket size={25} />
            </span>
            <div className="flex flex-col gap-0">
              <p className="sm:text-sm text-xs font-medium truncate">
                Unchecked
              </p>
              <p className="sm:text-2xl text-xl font-bold">
                {filteredAttendees.length -
                  filteredAttendees.filter(
                    (a) => a.checkedInStatus === "checked-in"
                  ).length}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-max shadow-xl sm:shadow-none p-4 sm:p-0 rounded-t-2xl sm:rounded-none border border-gray-300 sm:border-none border-b-0">
          <div className="w-full h-max flex justify-between items-center">
            <p className="text-[#323232] font-semibold text-lg">
              Attendee List
            </p>
            <NavLink
              to={`/dashboard/manage/event/check-in/${id}`}
              className="w-max h-max px-8 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium flex sm:hidden gap-2 items-center justify-center "
            >
              <GoPlus size={20} />
              Check In
            </NavLink>
          </div>
          <div className="w-full h-max flex flex-col gap-4 mt-3">
            <div className="w-full h-max rounded-md border border-gray-300 flex flex-col sm:flex-row sm:gap-0 gap-3 items-center justify-between p-2">
              <div className="sm:w-[60%] w-full h-10 border border-gray-300 rounded flex items-center pl-2 ">
                <CiSearch />
                <input
                  type="search"
                  className="w-full h-max outline-none border-none pl-2 text-xs"
                  placeholder="Search by name, email or ticket code (client-side)"
                />
              </div>
              <div className="sm:w-max w-full px-2 cursor-pointer h-10 rounded border border-gray-300 flex items-center justify-center sm:justify-start gap-3 sm:gap-1 relative">
                <span className="pt-2">
                  <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                    open={openFilter}
                    onOpenChange={setOpenFilter}
                  >
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="flex items-center gap-1"
                    >
                      <CiFilter />
                      <p className="text-xs font-medium">Filter By</p>
                      <LuChevronsUpDown />
                    </a>
                  </Dropdown>
                </span>
                {filterStatus && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#27187E] rounded-full"></span>
                )}
              </div>
              <NavLink
                to={`/dashboard/manage/event/check-in/${id}`}
                className="w-max h-max px-8 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium sm:flex hidden gap-2 items-center justify-center "
              >
                <GoPlus size={20} />
                Check In Attendees
              </NavLink>
            </div>
            {filterStatus && (
              <div className="flex items-center gap-2 px-2">
                <span className="text-xs text-gray-500">Filtered by:</span>
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                  {filterStatus === "checked_in"
                    ? "Checked In"
                    : filterStatus === "cancelled"
                      ? "Cancelled"
                      : filterStatus === "pending"
                        ? "Pending"
                        : filterStatus}
                  <button
                    onClick={() => handleFilterChange("")}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              </div>
            )}
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
                {/* Loading State with Skeletons */}
                {attendeesLoading && (
                  <>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index}>
                        <DesktopSkeleton />
                        <MobileSkeleton />
                      </div>
                    ))}
                  </>
                )}

                {/* Empty State */}
                {!attendeesLoading && filteredAttendees.length === 0 && (
                  <div className="w-full h-max py-4 flex items-center flex-col gap-4 justify-center">
                    <img src={empty} alt="No attendees" />
                    <p className="text-sm font-medium">
                      {filterStatus
                        ? `No ${filterStatus === "checked_in" ? "checked in" : filterStatus} attendees found`
                        : "Your guest list is currently empty"}
                    </p>
                    {!filterStatus && (
                      <button
                        onClick={copyEventLink}
                        className="w-max h-max px-8 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium mt-5 flex gap-2 items-center justify-center "
                      >
                        <BiCopyAlt size={20} />
                        Copy Event Link
                      </button>
                    )}
                  </div>
                )}

                {/* Desktop Attendees */}
                {!attendeesLoading && filteredAttendees.length > 0 && (
                  <>
                    {filteredAttendees.map((attendee) => (
                      <div
                        key={attendee._id}
                        className="w-full h-max border-b border-b-gray-300 px-2 sm:flex hidden items-center text-[#737373] font-medium text-[10px]"
                      >
                        <p className="w-1/6 h-max py-4 truncate">
                          {attendee.name}
                        </p>
                        <p className="w-1/6 h-max py-4 truncate">
                          {attendee.email}
                        </p>
                        <p className="w-1/6 h-max py-4 truncate">
                          {attendee.phone}
                        </p>
                        <p className="w-1/6 h-max py-4 truncate">
                          {formatDate(attendee.purchasedDate)}
                        </p>
                        <p className="w-1/6 h-max py-4 truncate">
                          {attendee.code}
                        </p>
                        <p className="w-1/6 h-max py-4 truncate">
                          <span
                            className={`w-max h-max px-4 py-2 rounded-full ${getStatusBadge(attendee.checkedInStatus)}`}
                          >
                            {attendee.checkedInStatus === "checked-in"
                              ? "Checked In"
                              : attendee.checkedInStatus === "cancelled"
                                ? "Cancelled"
                                : "Pending"}
                          </span>
                        </p>
                      </div>
                    ))}

                    {/* Mobile Attendees */}
                    {filteredAttendees.map((attendee) => (
                      <div
                        key={attendee._id}
                        className="w-full h-max rounded shadow border border-gray-300 px-2 py-2 flex flex-col gap-1 sm:hidden text-[#737373] font-medium "
                      >
                        <div className="w-full h-max flex justify-between items-center gap-2">
                          <p className="w-[70%] h-max flex flex-col font-medium text-[#101828] truncate text-[12px]">
                            {attendee.name}
                            <span className="text-[#4A5565] text-[12px] truncate">
                              {attendee.email}
                            </span>
                          </p>
                          <p className="w-[30%] h-max py-4 truncate text-[9px]">
                            <span
                              className={`w-max h-max px-3.5 py-1.5 rounded-full ${getStatusBadge(attendee.checkedInStatus)}`}
                            >
                              {attendee.checkedInStatus === "checked-in"
                                ? "Checked In"
                                : attendee.checkedInStatus === "cancelled"
                                  ? "Cancelled"
                                  : "Pending"}
                            </span>
                          </p>
                        </div>
                        <div className="w-full h-max flex justify-between">
                          <p className="w-[60%] h-max flex flex-col font-medium text-[#4A5565] truncate text-[10px]">
                            Phone
                            <span className="text-[#101828]">
                              {attendee.phone}
                            </span>
                          </p>
                          <p className="w-[60%] h-max flex flex-col font-medium text-[#4A5565] truncate text-[10px]">
                            Code
                            <span className="text-[#101828]">
                              {attendee.code}
                            </span>
                          </p>
                        </div>
                        <div className="w-full h-max flex justify-between">
                          <p className="w-[60%] h-max flex flex-col font-medium text-[#4A5565] truncate text-[10px]">
                            Purchase Date
                            <span className="text-[#101828]">
                              {formatDate(attendee.purchasedDate)}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            </div>

            {/* Pagination - Only show when not loading and total > pageSize */}
            {!attendeesLoading && total > pageSize && (
              <GlobalPagination
                current={currentPage}
                total={total}
                pageSize={pageSize}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
