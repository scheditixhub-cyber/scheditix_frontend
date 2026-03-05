import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import TicketConfirmation from "./ticket-confirmation";
import EventDetails from "./ticketEventDetails";
import TicketPurchase, { type PurchaseData } from "./ticket-purchace";
import { createEvent } from "../../api"; // Adjust import path
import logo from "../../assets/logo.png";
import { toPng } from "html-to-image";

interface EventData {
  id: string;
  image: string;
  title: string;
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
}

interface TicketData {
  type: string;
  price: number;
  purchaseLimit: number;
}

interface TicketFlowProps {
  onComplete?: (purchaseDetails: PurchaseData & { ticketId: string }) => void;
  onClose?: () => void;
}

interface TicketPurchaseResponse {
  name: string;
  email: string;
  phone: string;
  code: string;
  eventId: string;
  purchasedDate: string;
}

type FlowStep = "event-details" | "ticket-purchase" | "confirmation";

// Skeleton loader for ticket purchase step
const TicketPurchaseSkeleton = () => (
  <div className="w-full min-h-screen bg-gray-50">
    <div className="px-4 md:px-8 py-8 md:py-10 max-w-7xl mx-auto">
      {/* Back Button Skeleton */}
      <div className="mb-8 w-16 h-6 bg-gray-200 rounded animate-pulse"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side - Ticket Form Skeleton */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200 shadow-sm">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-6">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            ))}

            <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Right Side - Order Summary Skeleton */}
        <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200 shadow-sm">
          <div className="w-full h-64 md:h-72 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="space-y-4 mb-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mb-8">
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TicketFlow = ({ onClose }: TicketFlowProps) => {
  const { id } = useParams(); // Get event ID from URL params
  const [currentStep, setCurrentStep] = useState<FlowStep>("event-details");
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null);
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketResponse, setTicketResponse] =
    useState<TicketPurchaseResponse | null>(null);

  // Fetch event data when component mounts or ID changes
  useEffect(() => {
    const fetchEventData = async () => {
      if (!id) {
        setError("No event provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await createEvent.getEventById(id);
        const event = response?.data?.data;

        console.log(event);

        if (!event) {
          throw new Error("Event not found");
        }

        // Transform API response to match EventData interface
        setEventData({
          id: event._id,
          image: event.coverImage,
          title: event.title,
          location: event.location,
          date: event.date,
          time: event.time,
          description: event.description,
          socialLinks: event.socialLinks || {},
        });

        // Transform to match TicketData interface
        setTicketData({
          type: event.ticketType === "free" ? "Free Ticket" : "Paid Ticket",
          price: event.price || 0,
          purchaseLimit: event.ticketQty || 0,
        });

        setError(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  const handleProceedToBuyTicket = () => {
    setCurrentStep("ticket-purchase");
  };

  const handleCheckout = async (data: PurchaseData) => {
    if (!id) return;

    setPurchaseLoading(true);

    try {
      // Call the purchase ticket API
      const response = await createEvent.purchaceTicket(id, {
        name: data.fullName,
        email: data.email,
        phone: data.phoneNumber,
      });

      // Store the ticket response data
      setTicketResponse(response.data.data);
      setPurchaseData(data);
      setCurrentStep("confirmation");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to purchase ticket");
    } finally {
      setPurchaseLoading(false);
    }
  };

  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!ticketRef.current) return;

    const dataUrl = await toPng(ticketRef.current, {
      cacheBust: true,
    });

    const link = document.createElement("a");
    link.download = "ticket.png";
    link.href = dataUrl;
    link.click();
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleBackToEventDetails = () => {
    setCurrentStep("event-details");
  };

  // Loading state
  if (loading) {
    return (
      <div>
        <div className="w-full border-b border-gray-200 px-4 md:px-8 lg:px-12 py-4 md:py-6 flex gap-3 items-center">
          <img
            src={logo}
            alt="Wave Pass logo"
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <span className="text-sm md:text-base font-medium text-gray-900">
            Wave Pass
          </span>
        </div>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-gray-500">
            Loading event details...
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !eventData || !ticketData) {
    return (
      <div>
        <div className="w-full border-b border-gray-200 px-4 md:px-8 lg:px-12 py-4 md:py-6 flex gap-3 items-center">
          <img
            src={logo}
            alt="Wave Pass logo"
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <span className="text-sm md:text-base font-medium text-gray-900">
            Wave Pass
          </span>
        </div>
        <div className="flex items-center justify-center min-h-[50vh] text-red-500">
          {error || "Event not found"}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with logo - Only show on steps 1 and 2 */}
      {currentStep !== "confirmation" && (
        <div className="w-full border-b border-gray-200 px-4 md:px-8 lg:px-12 py-4 md:py-6 flex gap-3 items-center mb-6">
          <img
            src={logo}
            alt="Wave Pass logo"
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <p className="text-sm md:text-base font-medium text-gray-900">
            Wave Pass
          </p>
        </div>
      )}

      {currentStep === "event-details" && (
        <EventDetails
          eventImage={eventData.image}
          eventTitle={eventData.title}
          location={eventData.location}
          date={eventData.date}
          time={eventData.time}
          description={eventData.description}
          socialLinks={eventData.socialLinks}
          onProceedToBuyTicket={handleProceedToBuyTicket}
        />
      )}

      {currentStep === "ticket-purchase" &&
        (purchaseLoading ? (
          <TicketPurchaseSkeleton />
        ) : (
          <TicketPurchase
            eventImage={eventData.image}
            ticketType={ticketData.type}
            ticketPrice={ticketData.price}
            purchaseLimit={ticketData.purchaseLimit}
            onCheckout={handleCheckout}
            onBack={handleBackToEventDetails}
          />
        ))}

      {currentStep === "confirmation" && purchaseData && ticketResponse && (
        <TicketConfirmation
          ref={ticketRef}
          eventImage={eventData.image}
          eventTitle={eventData.title}
          location={eventData.location}
          date={eventData.date}
          time={eventData.time}
          attendeeName={purchaseData.fullName}
          attendeeEmail={purchaseData.email}
          ticketId={ticketResponse.code}
          ticketType={ticketData.type}
          onDownload={handleDownload}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default TicketFlow;
