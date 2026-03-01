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
    return (
      <div className="w-full min-h-screen bg-linear-to-br from-[#27187E] via-[#4a2ba8] to-[#1a0d5c] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Header */}
        <div className="w-full max-w-5xl flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2">
            <div className="w-8 h-8 bg-linear-to-br from-[#27187E] to-[#4a2ba8] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">WP</span>
            </div>
            <span className="text-[#27187E] font-bold text-lg">Wave Pass</span>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
          >
            <X size={24} />
          </button>
        </div>

        {/* 👇 THIS is what we want to download */}
        <div
          ref={ref}
          className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl relative z-10"
        >
          <div className="h-1 bg-linear-to-r from-purple-500 via-pink-500 to-blue-500" />

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side */}
            <div className="relative h-64 md:h-auto min-h-96">
              <img
                src={eventImage}
                crossOrigin="anonymous"
                alt={eventTitle}
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black via-black/50 to-transparent p-6">
                <p className="text-white font-bold text-lg">{attendeeName}</p>
                <p className="text-gray-300 text-sm">{attendeeEmail}</p>
              </div>
            </div>

            {/* Right Side */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-4">{eventTitle}</h2>

                <p className="text-gray-600 mb-2">📍 {location}</p>
                <p className="text-gray-600 mb-2">{date}</p>
                <p className="text-gray-600 mb-6">{time}</p>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Ticket Type</p>
                  <p className="font-semibold mb-4">{ticketType}</p>

                  <p className="text-sm text-gray-500">Ticket ID</p>
                  <p className="text-3xl font-bold text-[#27187E]">
                    {ticketId}
                  </p>
                </div>
              </div>

              <button
                onClick={onDownload}
                className="w-full h-12 bg-[#27187E] text-white rounded-lg flex items-center justify-center gap-2 mt-6"
              >
                <Download size={20} />
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
