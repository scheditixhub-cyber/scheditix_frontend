import { CiFilter, CiSearch } from "react-icons/ci";
import { GoChevronRight, GoPlus } from "react-icons/go";
import { HiOutlineTicket } from "react-icons/hi";
import GlobalPagination from "../../components/GlobalPagination";
import empty from "../../assets/emptyfile.svg";
import { BiCopyAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import eventPfp from "../../assets/eventpfp1.jpg";
import { DatePicker, type DatePickerProps } from "antd";
import { useEffect, useState } from "react";
import { createEvent, userApi } from "../../api";

interface Event {
  _id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  status: string;
  ticketsSold: number;
  totalTickets: number;
  coverImage?: string;
}

interface AnalyticsData {
  totalRevenue: number;
  totalTicketsSold: number;
  activeEvents: number;
  pendingEvents: number;
}

const OverviewMain = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [is404, setIs404] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Event[]>([]);

  // Analytics state
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRevenue: 0,
    totalTicketsSold: 0,
    activeEvents: 0,
    pendingEvents: 0,
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const startDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (allEvents.length > 0) {
      fetchAnalytics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allEvents]);

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const eventIds = allEvents.map((event) => event._id);

      if (eventIds.length === 0) {
        setAnalytics({
          totalRevenue: 0,
          totalTicketsSold: 0,
          activeEvents: 0,
          pendingEvents: 0,
        });
        return;
      }

      const analyticsPromises = eventIds.map((id) => userApi.getAnalytics(id));
      const responses = await Promise.all(analyticsPromises);

      const aggregatedData = responses.reduce(
        (acc, response) => {
          // Check if response exists and has data
          if (!response || !response.data) {
            return acc;
          }

          // The response.data is an array of objects
          const analyticsArray = response.data || [];

          // If it's an array, loop through each item
          if (Array.isArray(analyticsArray)) {
            analyticsArray.forEach((item) => {
              acc.totalRevenue += item.totalRevenue || 0;
              acc.totalTicketsSold += item.totalTicketsSold || 0;
              acc.activeEvents += item.isActive ? 1 : 0;
              acc.pendingEvents += item.isPending ? 1 : 0;
            });
          } else {
            // If it's a single object (fallback)
            acc.totalRevenue += analyticsArray.totalRevenue || 0;
            acc.totalTicketsSold += analyticsArray.totalTicketsSold || 0;
            acc.activeEvents += analyticsArray.isActive ? 1 : 0;
            acc.pendingEvents += analyticsArray.isPending ? 1 : 0;
          }

          return acc;
        },
        {
          totalRevenue: 0,
          totalTicketsSold: 0,
          activeEvents: 0,
          pendingEvents: 0,
        }
      );

      setAnalytics(aggregatedData);
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setAnalytics({
        totalRevenue: 0,
        totalTicketsSold: 0,
        activeEvents: 0,
        pendingEvents: 0,
      });
    } finally {
      setAnalyticsLoading(false);
    }
  };
  // Format date function
  const formatDate = (isoString: string) => {
    if (!isoString) return "TBD";

    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time function
  const formatTime = (timeString: string) => {
    if (!timeString) return "TBD";

    if (timeString.includes(":")) {
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm} WAT`;
    }

    try {
      const date = new Date(timeString);
      if (isNaN(date.getTime())) return "TBD";

      return (
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }) + " WAT"
      );
    } catch {
      return "TBD";
    }
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearch(value);

    if (value.trim().length >= 1) {
      filterSuggestions(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setEvents(allEvents);
    }
  };

  // Filter suggestions from allEvents based on search term
  const filterSuggestions = (term: string) => {
    const filtered = allEvents.filter(
      (event) =>
        event.title?.toLowerCase().includes(term.toLowerCase()) ||
        event.location?.toLowerCase().includes(term.toLowerCase())
    );
    setSuggestions(filtered);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: Event) => {
    setSearch(suggestion.title);
    setEvents([suggestion]);
    setShowSuggestions(false);
  };

  // Handle search submission
  const handleSearchSubmit = async () => {
    setShowSuggestions(false);
    setCurrentPage(1);

    try {
      if (!search.trim()) {
        fetchEvents();
        return;
      }

      const res = await createEvent.searchEvent(search);
      setEvents(res?.data?.data || []);
      setTotal(res?.data?.pagination?.totalCount || 0);
      setTotalPages(res?.data?.pagination?.totalPages || 1);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle key press (Enter to submit)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  // Debounced search effect
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!showSuggestions) return;

      try {
        if (!search.trim()) {
          setEvents(allEvents);
          return;
        }

        const res = await createEvent.searchEvent(search);
        setEvents(res?.data?.data || []);
        setTotal(res?.data?.pagination?.totalCount || 0);
        setTotalPages(res?.data?.pagination?.totalPages || 1);
      } catch (error) {
        console.error(error);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [search, allEvents, showSuggestions]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setIs404(false);
      setError(null);

      const response = await createEvent.allEvent(currentPage, pageSize);

      const eventData = response?.data?.data || [];
      const pagination = response?.data?.pagination;

      setAllEvents(eventData);
      setEvents(eventData);

      if (pagination) {
        setTotal(pagination.totalCount);
        setTotalPages(pagination.totalPages);

        if (currentPage > pagination.totalPages && pagination.totalPages > 0) {
          setCurrentPage(1);
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 404) {
        setIs404(true);
        setError(null);
        setAllEvents([]);
        setEvents([]);
        setTotal(0);
        setTotalPages(1);
      } else {
        setError(
          err.response?.data?.message || err.message || "Failed to fetch events"
        );
        setIs404(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page > totalPages && totalPages > 0) {
      return;
    }
    setCurrentPage(page);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Analytics Card Skeleton
  const AnalyticsSkeleton = () => (
    <div className="rounded-md bg-gray-50 sm:h-40 h-30 flex flex-col justify-center sm:gap-6 gap-3 border border-gray-300 p-4 cursor-pointer transition-all hover:scale-101 shadow-lg animate-pulse">
      <span className="w-max h-max p-1 bg-gray-200 border border-gray-200 rounded-md">
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
      </span>
      <div className="flex flex-col gap-0">
        <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );

  // Event Skeleton Loader Component
  const EventSkeleton = () => (
    <>
      {/* Desktop Skeleton */}
      <div className="w-full border-b border-b-gray-300 px-2 sm:flex hidden items-center text-[#737373] font-medium text-[10px] animate-pulse">
        <div className="w-[40%] h-max py-4 flex gap-2 items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
          <div className="">
            <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-2 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        <div className="w-[15%] h-max py-4 flex flex-col justify-center">
          <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
          <div className="h-2 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="w-[15%] h-max py-4">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        </div>
        <div className="w-[15%] h-max py-4">
          <div className="h-3 bg-gray-200 rounded w-12"></div>
        </div>
        <div className="w-[15%] h-max py-4">
          <div className="h-3 bg-gray-200 rounded w-12"></div>
        </div>
      </div>

      {/* Mobile Skeleton */}
      <div className="w-full rounded shadow border border-gray-300 px-2 py-2 flex flex-col gap-1 sm:hidden text-[#737373] font-medium relative animate-pulse">
        <div className="w-full h-max flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
          <div className="">
            <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-2 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        <div className="w-full h-max flex justify-between">
          <div className="w-1/2 h-max flex flex-col">
            <div className="h-2 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
            <div className="h-2 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="w-1/2 h-max flex flex-col">
            <div className="h-2 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
      </div>
    </>
  );

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

        <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
          {/* Analytics Cards with Skeleton Loading */}
          {analyticsLoading ? (
            <>
              <AnalyticsSkeleton />
              <AnalyticsSkeleton />
              <AnalyticsSkeleton />
              <AnalyticsSkeleton />
            </>
          ) : (
            <>
              {/* Total Revenue Card */}
              <div
                className="rounded-md bg-linear-to-tr from-[#FF00B71F] to-[#FFEAF31F] sm:h-40 h-30 flex flex-col justify-center sm:gap-6 gap-3 border border-gray-300 p-4 cursor-pointer transition-all hover:scale-101 shadow-lg"
                title="Total Revenue"
              >
                <span className="w-max h-max p-1 bg-white border border-gray-200 rounded-md">
                  <HiOutlineTicket size={25} />
                </span>
                <div className="flex flex-col gap-0">
                  <p className="sm:text-sm text-xs font-medium truncate">
                    Total Revenue
                  </p>
                  <p className="sm:text-2xl text-lg truncate font-bold">
                    {formatCurrency(analytics.totalRevenue)}
                  </p>
                </div>
              </div>

              {/* Total Tickets Sold Card */}
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
                    {analytics.totalTicketsSold.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Active Events Card */}
              <div
                className="rounded-md bg-linear-to-tr from-[#16EF061F] to-[#D9FCD70F] sm:h-40 h-30 flex flex-col justify-center sm:gap-6 gap-3 border border-gray-300 p-4 cursor-pointer transition-all hover:scale-101 shadow-lg"
                title="Active Events"
              >
                <span className="w-max h-max p-1 bg-white border border-gray-200 rounded-md">
                  <HiOutlineTicket size={25} />
                </span>
                <div className="flex flex-col gap-0">
                  <p className="sm:text-sm text-xs font-medium truncate">
                    Active Events
                  </p>
                  <p className="sm:text-2xl text-xl font-bold">
                    {analytics.activeEvents}
                  </p>
                </div>
              </div>

              {/* Pending Events Card */}
              <div
                className="rounded-md bg-linear-to-tr from-[#E8BB061F] to-[#FAF1CB1C] sm:h-40 h-30 flex flex-col justify-center sm:gap-6 gap-3 border border-gray-300 p-4 cursor-pointer transition-all hover:scale-101 shadow-lg"
                title="Pending Events"
              >
                <span className="w-max h-max p-1 bg-white border border-gray-200 rounded-md">
                  <HiOutlineTicket size={25} />
                </span>
                <div className="flex flex-col gap-0">
                  <p className="sm:text-sm text-xs font-medium truncate">
                    PENDING EVENTS
                  </p>
                  <p className="sm:text-2xl text-xl font-bold">
                    {analytics.pendingEvents}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="w-full h-max shadow-xl sm:shadow-none p-4 sm:p-0 rounded-t-2xl sm:rounded-none border border-gray-300 sm:border-none border-b-0">
          <p className="text-[#323232] font-semibold text-lg">Events Lists</p>
          <div className="w-full h-max flex flex-col gap-4 mt-3">
            <div className="w-full h-max rounded-md border border-gray-300 flex flex-col sm:flex-row sm:gap-0 gap-3 items-center justify-between p-2 relative">
              <div className="sm:w-[60%] w-full h-10 border border-gray-300 rounded flex items-center pl-2 relative">
                <CiSearch />
                <input
                  type="search"
                  className="w-full h-max outline-none border-none pl-2 text-xs"
                  placeholder="Search email address, attendee name or code"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onBlur={() => {
                    setTimeout(() => setShowSuggestions(false), 200);
                  }}
                  onFocus={() => {
                    if (search.trim().length >= 1) {
                      filterSuggestions(search);
                      setShowSuggestions(true);
                    }
                  }}
                />

                {/* Search Suggestions Dropdown */}
                {showSuggestions &&
                  suggestions.length > 0 &&
                  !loading &&
                  !is404 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
                      {suggestions.map((suggestion) => (
                        <div
                          key={suggestion._id}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                          onClick={() => handleSuggestionClick(suggestion)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <img
                            src={suggestion.coverImage || eventPfp}
                            alt=""
                            className="w-8 h-8 rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <p className="text-xs font-medium text-[#0F172A]">
                              {suggestion.title}
                            </p>
                            <p className="text-[9px] text-[#737373]">
                              {suggestion.location}
                            </p>
                          </div>
                          <span className="text-[9px] px-2 py-1 rounded-full bg-[#FFD00014] text-[#C18700] border border-[#EAD67B]">
                            {suggestion.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                {/* No suggestions found */}
                {showSuggestions &&
                  search.trim().length >= 1 &&
                  suggestions.length === 0 &&
                  !loading &&
                  !is404 &&
                  allEvents.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3 text-center z-50">
                      <p className="text-xs text-gray-500">
                        No matching events found
                      </p>
                    </div>
                  )}
              </div>

              {/* Sort by date button */}
              <button className="sm:w-max w-full px-4 py-2 cursor-pointer h-10 rounded border border-gray-300 flex items-center justify-center sm:justify-start gap-2 bg-white hover:bg-gray-50 transition-colors">
                <CiFilter className="text-gray-600" />
                <DatePicker
                  size="small"
                  variant="borderless"
                  onChange={startDate}
                  placeholder="Sort By Date"
                />
              </button>
            </div>
          </div>
          <div className="w-full h-max flex flex-col gap-3 mt-3">
            <div className="w-full h-max bg-[#f8f8f8] px-2 sm:flex hidden items-center text-[#737373] font-semibold text-xs">
              <p className="w-[40%] h-max py-2">Event Details</p>
              <p className="w-[15%] h-max py-2">Date & Time</p>
              <p className="w-[15%] h-max py-2">Status</p>
              <p className="w-[15%] h-max py-2">Tickets Sold</p>
              <p className="w-[15%] h-max py-2">Actions</p>
            </div>
            <div className="w-full h-max bg-white flex sm:block flex-col gap-2 sm:gap-0">
              <>
                {/* Loading State for Events */}
                {loading && (
                  <>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <EventSkeleton key={index} />
                    ))}
                  </>
                )}

                {/* 404 State - No events created yet */}
                {!loading && is404 && (
                  <div className="w-full h-max py-4 flex items-center flex-col gap-4 justify-center">
                    <img src={empty} alt="" />
                    <p className="text-sm font-medium">
                      You are yet to create an event
                    </p>
                    <NavLink
                      to="/dashboard/create-event"
                      className="w-max h-max px-8 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium mt-5 flex gap-2 items-center justify-center"
                    >
                      <BiCopyAlt size={20} />
                      Create Event
                    </NavLink>
                  </div>
                )}

                {/* Error State */}
                {!loading && error && !is404 && (
                  <div className="w-full h-max py-8 flex items-center flex-col gap-4 justify-center">
                    <p className="text-sm font-medium text-red-500">
                      Error loading events: {error}
                    </p>
                    <button
                      onClick={fetchEvents}
                      className="w-max h-max px-6 py-2 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {/* Empty State for current page */}
                {!loading &&
                  !error &&
                  !is404 &&
                  events.length === 0 &&
                  total > 0 && (
                    <div className="w-full h-max py-4 flex items-center flex-col gap-4 justify-center">
                      <img src={empty} alt="" />
                      <p className="text-sm font-medium">
                        No events found on page {currentPage}
                      </p>
                      <button
                        onClick={() => setCurrentPage(1)}
                        className="w-max h-max px-6 py-2 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium"
                      >
                        Go to First Page
                      </button>
                    </div>
                  )}

                {/* No events at all */}
                {!loading &&
                  !error &&
                  !is404 &&
                  events.length === 0 &&
                  total === 0 && (
                    <div className="w-full h-max py-4 flex items-center flex-col gap-4 justify-center">
                      <img src={empty} alt="" />
                      <p className="text-sm font-medium">No events available</p>
                      <NavLink
                        to="/dashboard/create-event"
                        className="w-max h-max px-8 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium mt-5 flex gap-2 items-center justify-center"
                      >
                        <BiCopyAlt size={20} />
                        Create Event
                      </NavLink>
                    </div>
                  )}

                {/* Events List */}
                {!loading && !error && !is404 && events.length > 0 && (
                  <>
                    {/* Desktop Cards */}
                    {events.map((event, index) => (
                      <NavLink
                        className="w-full h-max border-b border-b-gray-300 px-2 sm:flex hidden items-center text-[#737373] font-medium text-[10px]"
                        key={event._id || index}
                        to={`/dashboard/manage/event/${event._id}`}
                      >
                        <div className="w-[40%] h-max py-4 flex gap-2 items-center">
                          <img
                            src={event.coverImage || eventPfp}
                            alt=""
                            className="w-10 h-10 bg-sky-200 rounded-md object-cover"
                          />
                          <div className="">
                            <p className="text-xs font-bold text-[#0F172A]">
                              {event.title}
                            </p>
                            <p className="text-[9px] text-[#737373]">
                              {event.location}
                            </p>
                          </div>
                        </div>
                        <p className="w-[15%] h-max py-4 flex flex-col justify-center truncate">
                          <span className="text-xs font-medium text-[#334155]">
                            {formatDate(event.date)}
                          </span>
                          <span>{formatTime(event.date)}</span>
                        </p>

                        <p className="w-[15%] h-max py-4 truncate">
                          <span className="w-max h-max px-3 py-1.5 text-[9px] font-bold rounded-full bg-[#FFD00014] text-[#C18700] border border-[#EAD67B]">
                            {event.status || "Pending"}
                          </span>
                        </p>
                        <p className="w-[15%] h-max py-4 truncate font-bold">
                          {event.ticketsSold || 0}/{event.totalTickets || 0}
                        </p>
                        <p className="w-[15%] h-max py-4 truncate font-bold hover:underline hover:cursor-pointer">
                          Manage
                        </p>
                      </NavLink>
                    ))}

                    {/* Mobile Cards */}
                    {events.map((event, index) => (
                      <NavLink
                        className="w-full h-max rounded shadow border border-gray-300 px-2 py-2 flex flex-col gap-1 sm:hidden text-[#737373] font-medium relative"
                        key={`mobile-${event._id || index}`}
                        to={`/dashboard/manage/event/${event._id}`}
                      >
                        <span className="absolute top-2 right-4">
                          <GoChevronRight />
                        </span>
                        <div className="w-full h-max flex items-center gap-2">
                          <img
                            src={event.coverImage || eventPfp}
                            alt=""
                            className="w-10 h-10 bg-sky-200 rounded-md object-cover"
                          />
                          <div className="">
                            <p className="text-xs font-bold text-[#0F172A]">
                              {event.title}
                            </p>
                            <p className="text-[9px] text-[#737373]">
                              {event.location}
                            </p>
                          </div>
                        </div>
                        <div className="w-full h-max flex justify-between">
                          <p className="w-1/2 h-max flex flex-col font-bold text-[#4A5565] truncate text-[10px]">
                            Date & Time
                            <span className="h-max flex flex-col justify-center truncate">
                              <span className="text-xs font-medium text-[#334155]">
                                {formatDate(event.date)}
                              </span>
                              <span className="font-medium text-[#334155] text-[9px]">
                                {formatTime(event.time)}
                              </span>
                            </span>
                          </p>
                          <p className="w-1/2 h-max flex flex-col font-bold text-[#4A5565] truncate text-[10px]">
                            Tickets Sold
                            <span className="text-[#101828] font-medium">
                              {event.ticketsSold || 0}/{event.totalTickets || 0}
                            </span>
                          </p>
                        </div>
                        <p className="h-max pb-1 truncate">
                          <span className="w-max h-max px-3 py-1.5 text-[9px] font-bold rounded-full bg-[#FFD00014] text-[#C18700] border border-[#EAD67B]">
                            {event.status || "Pending"}
                          </span>
                        </p>
                      </NavLink>
                    ))}
                  </>
                )}
              </>
            </div>

            {/* Pagination - Only show when not loading and total > pageSize */}
            {!loading && !error && !is404 && total > pageSize && (
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

export default OverviewMain;
