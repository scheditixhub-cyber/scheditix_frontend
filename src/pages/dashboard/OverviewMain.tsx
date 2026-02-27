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
import { createEvent } from "../../api";

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

const OverviewMain = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [is404, setIs404] = useState(false); // Track if it's a 404 (no events)
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Event[]>([]);

  const startDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Format date function
  const formatDate = (isoString: string) => {
    if (!isoString) return "TBD";

    const date = new Date(isoString);

    // Format: "Feb 19, 2026"
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time function - Updated to handle time string
  const formatTime = (timeString: string) => {
    if (!timeString) return "TBD";

    // If it's already a formatted time string like "10:00"
    if (timeString.includes(":")) {
      // Convert "10:00" to "10:00 AM WAT" format
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm} WAT`;
    }

    // If it's a full ISO date string, parse it
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
      // Show suggestions when at least 1 character is typed
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
    setEvents([suggestion]); // Show only the selected event
    setShowSuggestions(false);
  };

  // Handle search submission
  const handleSearchSubmit = async () => {
    setShowSuggestions(false);

    try {
      if (!search.trim()) {
        setEvents(allEvents);
        return;
      }

      const res = await createEvent.searchEvent(search);
      setEvents(res?.data?.data || []);
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
      if (!showSuggestions) return; // Don't search if suggestions are showing

      try {
        if (!search.trim()) {
          setEvents(allEvents);
          return;
        }

        const res = await createEvent.searchEvent(search);
        setEvents(res?.data?.data || []);
      } catch (error) {
        console.error(error);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [search, allEvents, showSuggestions]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setIs404(false); // Reset 404 state
      setError(null);

      const response = await createEvent.allEvent();

      // If we get here, it means the API call was successful
      const eventData = response?.data?.data || [];

      setAllEvents(eventData);
      setEvents(eventData); // display data

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error fetching events:", err);

      // Check if it's a 404 error (no events found)
      if (err.response?.status === 404) {
        setIs404(true);
        setError(null); // Clear error for 404 since it's not really an error
        setAllEvents([]);
        setEvents([]);
      } else {
        // For other errors (network issues, server errors, etc.)
        setError(
          err.response?.data?.message || err.message || "Failed to fetch events"
        );
        setIs404(false);
      }
    } finally {
      setLoading(false);
    }
  };

  // Skeleton Loader Component - Keeping original alignment
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

      {/* Mobile Skeleton - Keeping original alignment */}
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
                ₦15,345,240.18
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
              <p className="sm:text-2xl text-xl font-bold">28,000</p>
            </div>
          </div>
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
              <p className="sm:text-2xl text-xl font-bold">2</p>
            </div>
          </div>
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
              <p className="sm:text-2xl text-xl font-bold">4</p>
            </div>
          </div>
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
                    // Delay hiding suggestions to allow click events
                    setTimeout(() => setShowSuggestions(false), 200);
                  }}
                  onFocus={() => {
                    if (search.trim().length >= 1) {
                      filterSuggestions(search);
                      setShowSuggestions(true);
                    }
                  }}
                />

                {/* Search Suggestions Dropdown - Only show if there are events */}
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
                          onMouseDown={(e) => e.preventDefault()} // Prevent blur
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

                {/* No suggestions found - Only show if there are events to search from */}
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
                {/* Loading State */}
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

                {/* Error State (Network issues, server errors, etc.) */}
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

                {/* Empty State (No events from API but no error - should rarely happen) */}
                {!loading && !error && !is404 && events.length === 0 && (
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
                    {/* Desktop Cards - Keeping original structure */}
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
                              {event.title || "Global Tech Summit 2026"}
                            </p>
                            <p className="text-[9px] text-[#737373]">
                              {event.location || "Lagos, Nigeria"}
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
                          {event.ticketsSold || 400}/{event.totalTickets || 410}
                        </p>
                        <p className="w-[15%] h-max py-4 truncate font-bold hover:underline hover:cursor-pointer">
                          Manage
                        </p>
                      </NavLink>
                    ))}

                    {/* Mobile Cards - Keeping original structure */}
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
                              {event.title || "Global Tech Summit 2026"}
                            </p>
                            <p className="text-[9px] text-[#737373]">
                              {event.location || "Lagos, Nigeria"}
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
                              {event.ticketsSold || 20}/
                              {event.totalTickets || 400}
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
            {!loading && !error && !is404 && events.length > 0 && (
              <GlobalPagination />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewMain;
