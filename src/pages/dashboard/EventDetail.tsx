import { ChevronLeft } from "lucide-react";
import type React from "react";
import { PropagateLoader } from "react-spinners";

interface EventData {
  title: string;
  location: string;
  date: string;
  time: string;
  description: string;
  coverImage: string;
  ticketType: string;
  ticketQuantity: number;
  ticketPurchaseLimit: number;
  socialLinks: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

interface EventPreviewProps {
  eventData: EventData;
  userName?: string;
  userInitial?: string;
  onBack?: () => void;
  onPublish?: () => void;
  isLoading?: boolean;
}

const EventPreview: React.FC<EventPreviewProps> = ({
  eventData,
  onBack,
  onPublish,
  isLoading = false,
}) => {
  return (
    <div className="w-full h-max bg-white">
      {/* Main Content */}
      <div className="px-4 md:px-8 py-6 md:py-10 max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          disabled={isLoading}
          className="flex items-center gap-2 text-sm md:text-base font-medium text-[#323232] hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity mb-8"
        >
          <ChevronLeft size={20} />
          Back
        </button>

        {/* Cover Image */}
        <div className="w-full h-48 md:h-64 lg:h-80 rounded-2xl overflow-hidden mb-8 flex items-center justify-center bg-gray-200">
          {eventData.coverImage ? (
            <img
              src={eventData.coverImage}
              alt={eventData.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400">No cover image</div>
          )}
        </div>

        {/* Event Details Card */}
        <div className="border border-gray-300 rounded-xl overflow-hidden">
          {/* Title & Location Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-300">
            <div className="p-6 border-b md:border-b-0 md:border-r border-gray-300">
              <p className="text-xs md:text-sm text-[#666666] font-medium mb-2">
                Event Title
              </p>
              <p className="text-sm md:text-base font-semibold text-[#323232]">
                {eventData.title}
              </p>
            </div>
            <div className="p-6">
              <p className="text-xs md:text-sm text-[#666666] font-medium mb-2">
                Event Location
              </p>
              <p className="text-sm md:text-base font-semibold text-[#323232]">
                {eventData.location}
              </p>
            </div>
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-300">
            <div className="p-6 border-b md:border-b-0 md:border-r border-gray-300">
              <p className="text-xs md:text-sm text-[#666666] font-medium mb-2">
                Event Date
              </p>
              <p className="text-sm md:text-base font-semibold text-[#323232]">
                {eventData.date}
              </p>
            </div>
            <div className="p-6">
              <p className="text-xs md:text-sm text-[#666666] font-medium mb-2">
                Event Time
              </p>
              <p className="text-sm md:text-base font-semibold text-[#323232]">
                {eventData.time}
              </p>
            </div>
          </div>

          {/* Description Row */}
          <div className="p-6 border-b border-gray-300">
            <p className="text-xs md:text-sm text-[#666666] font-medium mb-3">
              Event Description
            </p>
            <p className="text-sm md:text-base text-[#323232] leading-relaxed">
              {eventData.description}
            </p>
          </div>

          {/* Ticket Details Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-300">
            <div className="p-6 border-b md:border-b-0 md:border-r border-gray-300">
              <p className="text-xs md:text-sm text-[#666666] font-medium mb-2">
                Ticket Type
              </p>
              <p className="text-sm md:text-base font-semibold text-[#323232]">
                {eventData.ticketType}
              </p>
            </div>
            <div className="p-6 border-b md:border-b-0 md:border-r border-gray-300">
              <p className="text-xs md:text-sm text-[#666666] font-medium mb-2">
                Ticket Quantity
              </p>
              <p className="text-sm md:text-base font-semibold text-[#323232]">
                {eventData.ticketQuantity}
              </p>
            </div>
            <div className="p-6">
              <p className="text-xs md:text-sm text-[#666666] font-medium mb-2">
                Ticket Purchase Limit
              </p>
              <p className="text-sm md:text-base font-semibold text-[#323232]">
                {eventData.ticketPurchaseLimit}
              </p>
            </div>
          </div>

          {/* Social Links Row */}
          {Object.values(eventData.socialLinks).some((link) => link) && (
            <div className="p-6">
              <p className="text-xs md:text-sm text-[#666666] font-medium mb-4">
                Social Links
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {eventData.socialLinks.facebook && (
                  <a
                    href={eventData.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#27187E] hover:underline truncate"
                  >
                    Facebook
                  </a>
                )}
                {eventData.socialLinks.linkedin && (
                  <a
                    href={eventData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#27187E] hover:underline truncate"
                  >
                    LinkedIn
                  </a>
                )}
                {eventData.socialLinks.twitter && (
                  <a
                    href={eventData.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#27187E] hover:underline truncate"
                  >
                    X (Twitter)
                  </a>
                )}
                {eventData.socialLinks.instagram && (
                  <a
                    href={eventData.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#27187E] hover:underline truncate"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Publish Button */}
        <button
          onClick={onPublish}
          disabled={isLoading}
          className="w-full mt-8 px-6 py-4 md:py-5 bg-[#27187E] hover:bg-[#1f0f5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white text-sm md:text-base font-semibold rounded-xl flex items-center justify-center"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <PropagateLoader color="#ffffff" size={8} />
              <span>Publishing...</span>
            </span>
          ) : (
            "Publish Event"
          )}
        </button>
      </div>
    </div>
  );
};

export default EventPreview;
