import { CiSearch } from "react-icons/ci";
import { GoChevronRight, GoPlus } from "react-icons/go";
import GlobalPagination from "../../components/GlobalPagination";
import empty from "../../assets/emptyfile.svg";
import { BiCopyAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import eventPfp from "../../assets/eventpfp1.jpg";
import { useEffect, useState } from "react";
import { createEvent } from "../../api";

interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  status: string;
  ticketsSold: number;
  totalTickets: number;
  image?: string;
}

const ManageEvents = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [activeEvents, setActiveEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [draftEvents, setDraftEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [is404, setIs404] = useState(false);
  const [showUI, setShowUI] = useState(0);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const formatTime = (isoString: string) => {
    if (!isoString) return "TBD";
    const date = new Date(isoString);
    return (
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }) + " WAT"
    );
  };

  // Filter events by status
  const filterEventsByStatus = (events: Event[]) => {
    const active = events.filter(
      (event) =>
        event.status?.toLowerCase() === "active" ||
        event.status?.toLowerCase() === "published"
    );

    const past = events.filter(
      (event) =>
        event.status?.toLowerCase() === "past" ||
        event.status?.toLowerCase() === "completed" ||
        event.status?.toLowerCase() === "ended"
    );

    const drafts = events.filter(
      (event) =>
        event.status?.toLowerCase() === "draft" ||
        event.status?.toLowerCase() === "pending"
    );

    setActiveEvents(active);
    setPastEvents(past);
    setDraftEvents(drafts);
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearch(value);

    if (value.trim().length >= 1) {
      filterSuggestions(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Filter suggestions from allEvents based on search term
  const filterSuggestions = (term: string) => {
    const filtered = allEvents.filter(
      (event) =>
        event.title?.toLowerCase().includes(term.toLowerCase()) ||
        event.location?.toLowerCase().includes(term.toLowerCase()) ||
        event.status?.toLowerCase().includes(term.toLowerCase())
    );
    setSuggestions(filtered);
  };

  // Handle search submission
  const handleSearchSubmit = async () => {
    setShowSuggestions(false);

    try {
      if (!search.trim()) {
        filterEventsByStatus(allEvents);
        return;
      }

      const res = await createEvent.searchEvent(search);
      const searchResults = res?.data?.data || [];

      // Filter the search results by the current tab
      if (showUI === 0) {
        setActiveEvents(
          searchResults.filter(
            (event: { status: string }) =>
              event.status?.toLowerCase() === "active" ||
              event.status?.toLowerCase() === "published"
          )
        );
      } else if (showUI === 1) {
        setPastEvents(
          searchResults.filter(
            (event: { status: string }) =>
              event.status?.toLowerCase() === "past" ||
              event.status?.toLowerCase() === "completed" ||
              event.status?.toLowerCase() === "ended"
          )
        );
      } else if (showUI === 2) {
        setDraftEvents(
          searchResults.filter(
            (event: { status: string }) =>
              event.status?.toLowerCase() === "draft" ||
              event.status?.toLowerCase() === "pending"
          )
        );
      }
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
          filterEventsByStatus(allEvents);
          return;
        }

        const res = await createEvent.searchEvent(search);
        const searchResults = res?.data?.data || [];

        // Filter the search results by the current tab
        if (showUI === 0) {
          setActiveEvents(
            searchResults.filter(
              (event: { status: string }) =>
                event.status?.toLowerCase() === "active" ||
                event.status?.toLowerCase() === "published"
            )
          );
        } else if (showUI === 1) {
          setPastEvents(
            searchResults.filter(
              (event: { status: string }) =>
                event.status?.toLowerCase() === "past" ||
                event.status?.toLowerCase() === "completed" ||
                event.status?.toLowerCase() === "ended"
            )
          );
        } else if (showUI === 2) {
          setDraftEvents(
            searchResults.filter(
              (event: { status: string }) =>
                event.status?.toLowerCase() === "draft" ||
                event.status?.toLowerCase() === "pending"
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [search, allEvents, showSuggestions, showUI]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setIs404(false);
      setError(null);

      const response = await createEvent.allEvent();
      const eventData = response?.data?.data || [];

      setAllEvents(eventData);
      filterEventsByStatus(eventData);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 404) {
        setIs404(true);
        setError(null);
        setAllEvents([]);
        setActiveEvents([]);
        setPastEvents([]);
        setDraftEvents([]);
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

  // Handle tab change
  const handleTabChange = (tabIndex: number) => {
    setShowUI(tabIndex);
    setSearch(""); // Clear search when switching tabs
    setShowSuggestions(false);
  };

  // Get current events based on selected tab
  const getCurrentEvents = () => {
    if (showUI === 0) return activeEvents;
    if (showUI === 1) return pastEvents;
    if (showUI === 2) return draftEvents;
    return [];
  };

  const currentEvents = getCurrentEvents();

  // Skeleton Loader Component
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

        <div className="w-full h-max shadow-xl sm:shadow-none p-4 sm:p-0 rounded-t-2xl sm:rounded-none border border-gray-300 sm:border-none border-b-0">
          <p className="text-[#323232] font-semibold text-lg">My Events</p>
          <p className="text-xs text-[#737373] my-2">
            Manage and track your hosted events and performance.
          </p>
          <div className="w-max h-max flex items-center gap-4 text-xs my-3">
            <div
              className={`w-max font-bold cursor-pointer transition-all duration-500 ${
                showUI === 0
                  ? "border-b-[#27187E] border-b-2 text-[#27187E]"
                  : "text-[#737373]"
              }`}
              onClick={() => handleTabChange(0)}
            >
              Active Events ({activeEvents.length})
            </div>
            <div
              className={`w-max font-bold cursor-pointer transition-all duration-500 ${
                showUI === 1
                  ? "border-b-[#27187E] border-b-2 text-[#27187E]"
                  : "text-[#737373]"
              }`}
              onClick={() => handleTabChange(1)}
            >
              Past Events ({pastEvents.length})
            </div>
            <div
              className={`w-max font-bold cursor-pointer transition-all duration-500 ${
                showUI === 2
                  ? "border-b-[#27187E] border-b-2 text-[#27187E]"
                  : "text-[#737373]"
              }`}
              onClick={() => handleTabChange(2)}
            >
              Drafts ({draftEvents.length})
            </div>
          </div>
          <div className="w-full h-max flex flex-col gap-4 mt-3">
            <div className="w-full h-max rounded-md border border-gray-300 flex flex-col sm:flex-row sm:gap-0 gap-3 items-center justify-between p-2 relative">
              <div className="sm:w-[60%] w-full h-10 border border-gray-300 rounded flex items-center pl-2 relative">
                <CiSearch />
                <input
                  type="search"
                  className="w-full h-max outline-none border-none pl-2 text-xs"
                  placeholder="Search events by name, location or status"
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
                          key={suggestion.id}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                          onClick={() => {
                            setSearch(suggestion.title);
                            setShowSuggestions(false);
                            // Optionally filter to show just this event
                            if (showUI === 0) {
                              setActiveEvents([suggestion]);
                            } else if (showUI === 1) {
                              setPastEvents([suggestion]);
                            } else if (showUI === 2) {
                              setDraftEvents([suggestion]);
                            }
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <img
                            src={suggestion.image || eventPfp}
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

                {/* Empty State for current tab */}
                {!loading && !error && !is404 && currentEvents.length === 0 && (
                  <div className="w-full h-max py-4 flex items-center flex-col gap-4 justify-center">
                    <img src={empty} alt="" />
                    <p className="text-sm font-medium">
                      No{" "}
                      {showUI === 0
                        ? "active"
                        : showUI === 1
                          ? "past"
                          : "draft"}{" "}
                      events found
                    </p>
                    {showUI === 0 && (
                      <NavLink
                        to="/dashboard/create-event"
                        className="w-max h-max px-8 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium mt-5 flex gap-2 items-center justify-center"
                      >
                        <BiCopyAlt size={20} />
                        Create Event
                      </NavLink>
                    )}
                  </div>
                )}

                {/* Events List */}
                {!loading && !error && !is404 && currentEvents.length > 0 && (
                  <>
                    {/* Desktop Cards */}
                    {currentEvents.map((event, index) => (
                      <NavLink
                        className="w-full h-max border-b border-b-gray-300 px-2 sm:flex hidden items-center text-[#737373] font-medium text-[10px]"
                        key={event.id || index}
                        to={`/dashboard/manage/event/${event.id}`}
                      >
                        <div className="w-[40%] h-max py-4 flex gap-2 items-center">
                          <img
                            src={event.image || eventPfp}
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
                          <span
                            className={`w-max h-max px-3 py-1.5 text-[9px] font-bold rounded-full ${
                              event.status?.toLowerCase() === "active" ||
                              event.status?.toLowerCase() === "published"
                                ? "bg-[#16EF061F] text-green-600 border border-green-600"
                                : event.status?.toLowerCase() === "past" ||
                                    event.status?.toLowerCase() ===
                                      "completed" ||
                                    event.status?.toLowerCase() === "ended"
                                  ? "bg-gray-100 text-gray-600 border border-gray-400"
                                  : "bg-[#FFD00014] text-[#C18700] border border-[#EAD67B]"
                            }`}
                          >
                            {event.status || "Pending"}
                          </span>
                        </p>
                        <p className="w-[15%] h-max py-4 truncate font-bold ">
                          {event.ticketsSold || 0}/{event.totalTickets || 0}
                        </p>
                        <p className="w-[15%] h-max py-4 truncate font-bold hover:underline hover:cursor-pointer">
                          Manage
                        </p>
                      </NavLink>
                    ))}

                    {/* Mobile Cards */}
                    {currentEvents.map((event, index) => (
                      <NavLink
                        className="w-full h-max rounded shadow border border-gray-300 px-2 py-2 flex flex-col gap-1 sm:hidden text-[#737373] font-medium relative"
                        key={`mobile-${event.id || index}`}
                        to={`/dashboard/manage/event/${event.id}`}
                      >
                        <span className="absolute top-2 right-4">
                          <GoChevronRight />
                        </span>
                        <div className="w-full h-max flex items-center gap-2">
                          <img
                            src={event.image || eventPfp}
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
                                {formatTime(event.date)}
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
                          <span
                            className={`w-max h-max px-3 py-1.5 text-[9px] font-bold rounded-full ${
                              event.status?.toLowerCase() === "active" ||
                              event.status?.toLowerCase() === "published"
                                ? "bg-[#16EF061F] text-green-600 border border-green-600"
                                : event.status?.toLowerCase() === "past" ||
                                    event.status?.toLowerCase() ===
                                      "completed" ||
                                    event.status?.toLowerCase() === "ended"
                                  ? "bg-gray-100 text-gray-600 border border-gray-400"
                                  : "bg-[#FFD00014] text-[#C18700] border border-[#EAD67B]"
                            }`}
                          >
                            {event.status || "Pending"}
                          </span>
                        </p>
                      </NavLink>
                    ))}
                  </>
                )}
              </>
            </div>
            {!loading && !error && !is404 && currentEvents.length > 0 && (
              <GlobalPagination />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageEvents;
