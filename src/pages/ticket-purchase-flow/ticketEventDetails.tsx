import {
  MapPin,
  Calendar,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

interface EventDetailsProps {
  eventImage: string;
  eventTitle: string;
  location: string;
  date: string;
  time: string;
  description: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  onProceedToBuyTicket: () => void;
}

const EventDetails = ({
  eventImage,
  eventTitle,
  location,
  date,
  time,
  description,
  socialLinks = {},
  onProceedToBuyTicket,
}: EventDetailsProps) => {
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

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Main Content */}
      <div className="px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto">
        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Event Image and Actions */}
          <div className="flex flex-col gap-6">
            {/* Colorful Accent Bar and Image Container */}
            <div className="flex flex-col gap-0">
              {/* Colorful Accent Bar */}
              <div className="h-2 bg-linear-to-r from-purple-600 via-pink-500 to-purple-600 rounded-t-2xl"></div>

              {/* Event Image */}
              <div className="w-full h-64 md:h-80 lg:h-96 rounded-b-2xl overflow-hidden">
                <img
                  src={eventImage}
                  alt={eventTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="h-2 bg-linear-to-r from-purple-600 via-pink-500 to-purple-600 rounded-t-2xl"></div>
            </div>

            {/* Get Ticket Button */}
            <button
              onClick={onProceedToBuyTicket}
              className="w-full h-12 md:h-14 bg-[#27187E] hover:bg-[#1f0f5a] text-white font-semibold text-lg rounded-xl transition-colors"
            >
              Get a Ticket
            </button>

            {/* Social Links Section */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-[#323232]">
                  Follow us on our socials
                </p>
                <button className="flex items-center gap-2 text-[#999999] hover:text-[#27187E] transition-colors text-sm">
                  <span>Share</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.06c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.44 9.31 6.77 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.77 0 1.44-.3 1.96-.77l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-4">
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#999999] hover:text-[#27187E] transition-colors"
                  >
                    <Linkedin size={24} />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#999999] hover:text-[#27187E] transition-colors"
                  >
                    <Instagram size={24} />
                  </a>
                )}
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#999999] hover:text-[#27187E] transition-colors"
                  >
                    <Facebook size={24} />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#999999] hover:text-[#27187E] transition-colors"
                  >
                    <Twitter size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Event Information */}
          <div className="flex flex-col gap-8">
            {/* Event Title and Subtitle */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#27187E] mb-3">
                {eventTitle}
              </h1>
            </div>

            {/* Event Details - Vertical Stack */}
            <div className="flex flex-col gap-6">
              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin size={24} className="text-[#27187E] shrink-0 mt-0.5" />
                <p className="text-base md:text-lg text-[#323232] font-medium">
                  {location}
                </p>
              </div>

              {/* Date */}
              <div className="flex items-start gap-3">
                <Calendar
                  size={24}
                  className="text-[#27187E] shrink-0 mt-0.5"
                />
                <p className="text-base md:text-lg text-[#323232] font-medium">
                  {formatDate(date)}
                </p>
              </div>

              {/* Time */}
              <div className="flex items-start gap-3">
                <Clock size={24} className="text-[#27187E] shrink-0 mt-0.5" />
                <p className="text-base md:text-lg text-[#323232] font-medium">
                  {formatTime(time)}
                </p>
              </div>
            </div>

            {/* About Event Section */}
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#323232] mb-4">
                About this event
              </h2>
              <p className="text-base md:text-lg text-[#666666] leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
