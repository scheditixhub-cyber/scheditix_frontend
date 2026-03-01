import { Download, X } from "lucide-react";
import { forwardRef } from "react";

interface TicketConfirmationProps {
  eventImage: string;
  eventTitle: string;
  eventSubtitle?: string;
  location: string;
  date: string;
  time: string;
  attendeeName: string;
  attendeeEmail: string;
  ticketId: string;
  ticketType: string;
  onDownload: () => void;
  onClose: () => void;
}

const TicketConfirmation = forwardRef<HTMLDivElement, TicketConfirmationProps>(
  (
    {
      eventImage,
      eventTitle,
      eventSubtitle,
      location,
      date,
      time,
      attendeeName,
      attendeeEmail,
      ticketId,
      ticketType,
      onDownload,
      onClose,
    },
    ref
  ) => {
    const formatDate = (isoString: string) => {
      if (!isoString) return "TBD";
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    const formatTime = (timeString: string) => {
      if (!timeString) return "TBD";

      if (timeString.includes(":")) {
        const [hours, minutes] = timeString.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm} WAT`;
      }

      return "TBD";
    };

    return (
      <div className="w-full min-h-screen bg-linear-to-br from-[#2a1f4a] via-[#3d2463] to-[#1a0f3a] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
        {/* Background pattern effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-purple-500 opacity-10 rounded-full blur-3xl" />
        </div>

        {/* Header with Logo and Close Button */}
        <div className="w-full flex items-center justify-between mb-12 relative z-10 px-4 md:px-0 max-w-6xl">
          {/* Wave Pass Logo - White Pill */}
          <div className="flex items-center gap-3 bg-white rounded-full px-5 py-3 shadow-lg">
            <div className="w-8 h-8 bg-linear-to-br from-[#27187E] to-[#4a2ba8] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">WP</span>
            </div>
            <span className="text-[#27187E] font-bold text-base md:text-lg">
              Wave Pass
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
            aria-label="Close"
          >
            <X size={24} className="text-gray-900" />
          </button>
        </div>

        {/* Ticket Card Wrapper */}
        <div
          ref={ref}
          className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl relative z-10"
        >
          {/* Rainbow gradient bar */}
          <div className="h-2 bg-linear-to-r from-yellow-400 via-purple-600 to-green-500" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left Side - Event Image with Attendee Info */}
            <div className="relative h-64 md:h-auto md:min-h-96">
              {/* Event Image */}
              <img
                src={eventImage}
                crossOrigin="anonymous"
                alt={eventTitle}
                className="w-full h-full object-cover"
              />

              {/* Attendee Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black via-black/60 to-transparent p-4 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-white text-xs font-semibold tracking-wide uppercase">
                    ATTENDEE
                  </span>
                </div>
                <p className="text-white text-base md:text-lg font-bold mb-1">
                  {attendeeName}
                </p>
                <p className="text-gray-200 text-xs md:text-sm">
                  {attendeeEmail}
                </p>
              </div>
            </div>

            {/* Right Side - Event Details and Download */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Event Title */}
                <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  {eventTitle}
                </h2>

                {/* Event Subtitle */}
                {eventSubtitle && (
                  <p className="text-base text-gray-700 font-medium">
                    {eventSubtitle}
                  </p>
                )}

                {/* Location */}
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-600 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 text-sm md:text-base">
                    {location}
                  </span>
                </div>

                {/* Date and Time */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-[#27187E] shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 110-2V4z" />
                    </svg>
                    <span className="text-gray-700 text-sm md:text-base font-medium">
                      {formatDate(date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-[#27187E] shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00-.293.707l-2.829 2.829a1 1 0 101.415 1.415L9 10.414V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 text-sm md:text-base font-medium">
                      {formatTime(time)}
                    </span>
                  </div>
                </div>

                {/* Ticket Type and ID Section */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  {/* Ticket Type */}
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1 tracking-wide uppercase">
                      Ticket Type
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {ticketType}
                    </p>
                  </div>

                  {/* Ticket ID */}
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-2 tracking-wide uppercase">
                      Ticket ID
                    </p>
                    <p className="text-3xl lg:text-4xl font-bold text-[#27187E]">
                      {ticketId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={onDownload}
                className="w-full h-12 bg-[#27187E] hover:bg-[#1f0f5a] active:bg-[#160854] text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 mt-8"
              >
                <Download size={18} />
                Download Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TicketConfirmation.displayName = "TicketConfirmation";
export default TicketConfirmation;
