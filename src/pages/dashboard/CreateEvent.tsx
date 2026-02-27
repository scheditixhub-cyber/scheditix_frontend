import { ChevronLeft, X, MapPin } from "lucide-react";
import { useState, useRef, useContext } from "react";
import selectGif from "../../assets/selectGif.svg";
import EventPreview from "./EventDetail";
import { useNavigate } from "react-router-dom";
import toast from "../../library/toast";
import { createEvent } from "../../api";
import { AppContext } from "../../context/AppContext";

interface EventFormData {
  title: string;
  location: string;
  date: string;
  time: string;
  description: string;
  coverImage: File | null;
  coverImagePreview?: string;
  socialLinks: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

// New interface for location details
interface LocationDetails {
  country: string;
  state: string;
  lga: string;
  city: string;
  address: string;
}

interface TicketFormData {
  ticketType: string;
  ticketQuantity: number;
  ticketPurchaseLimit: number;
  ticketPrice?: number;
}

interface FormErrors {
  title?: string;
  location?: string;
  date?: string;
  time?: string;
  description?: string;
  coverImage?: string;
  ticketQuantity?: string;
  ticketPurchaseLimit?: string;
  ticketPrice?: string;
}

interface CreateEventProps {
  userName?: string;
  onBack?: () => void;
  onPublish?: (eventData: EventFormData & TicketFormData) => void;
}

// Nigerian states data
const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "FCT",
];

// Sample LGAs (you can expand this)
const sampleLgas: Record<string, string[]> = {
  Lagos: [
    "Agege",
    "Ajeromi-Ifelodun",
    "Alimosho",
    "Amuwo-Odofin",
    "Apapa",
    "Badagry",
    "Epe",
    "Eti-Osa",
    "Ibeju-Lekki",
    "Ifako-Ijaiye",
    "Ikeja",
    "Ikorodu",
    "Kosofe",
    "Lagos Island",
    "Lagos Mainland",
    "Mushin",
    "Ojo",
    "Oshodi-Isolo",
    "Shomolu",
    "Surulere",
  ],
  FCT: [
    "Abaji",
    "Bwari",
    "Gwagwalada",
    "Kuje",
    "Kwali",
    "Municipal Area Council",
  ],
  // Add more states as needed
};

const CreateEvent = ({
  userName = "Cynthia",
  onBack,
  onPublish,
}: CreateEventProps) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showLocationModal, setShowLocationModal] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Location details state
  const [locationDetails, setLocationDetails] = useState<LocationDetails>({
    country: "Nigeria",
    state: "",
    lga: "",
    city: "",
    address: "",
  });

  // Fix: Add proper null check for context
  const context = useContext(AppContext);
  const setSocialLinks = context?.setSocialLinks;

  const [eventData, setEventData] = useState<EventFormData>({
    title: "",
    location: "",
    date: "",
    time: "",
    description: "",
    coverImage: null,
    coverImagePreview: "",
    socialLinks: {
      facebook: "",
      linkedin: "",
      twitter: "",
      instagram: "",
    },
  });

  const [ticketData, setTicketData] = useState<TicketFormData>({
    ticketType: "Free Ticket",
    ticketQuantity: 0,
    ticketPurchaseLimit: 1,
    ticketPrice: 0,
  });

  // Get available LGAs based on selected state
  const availableLgas = locationDetails.state
    ? sampleLgas[locationDetails.state] || []
    : [];

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!eventData.title.trim()) {
      newErrors.title = "Event title is required";
    }
    if (!eventData.location.trim()) {
      newErrors.location = "Event location is required";
    }
    if (!eventData.date) {
      newErrors.date = "Event date is required";
    }
    if (!eventData.time) {
      newErrors.time = "Event time is required";
    }
    if (!eventData.description.trim()) {
      newErrors.description = "Event description is required";
    }
    if (!eventData.coverImage) {
      newErrors.coverImage = "Cover image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};

    if (ticketData.ticketQuantity <= 0) {
      newErrors.ticketQuantity = "Ticket quantity must be greater than 0";
    }
    if (ticketData.ticketPurchaseLimit <= 0) {
      newErrors.ticketPurchaseLimit = "Purchase limit must be greater than 0";
    }

    // Validate price for paid tickets
    if (ticketData.ticketType === "Paid Ticket") {
      if (!ticketData.ticketPrice || ticketData.ticketPrice <= 0) {
        newErrors.ticketPrice = "Ticket price must be greater than 0";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEventChange = (field: keyof EventFormData, value: string) => {
    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setEventData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialChange = (
    platform: keyof EventFormData["socialLinks"],
    value: string
  ) => {
    setEventData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleTicketChange = (
    field: keyof TicketFormData,
    value: string | number
  ) => {
    // Clear error for this field when user changes value
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setTicketData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setEventData((prev) => ({
        ...prev,
        coverImage: file,
        coverImagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleRemoveImage = () => {
    setEventData((prev) => ({
      ...prev,
      coverImage: null,
      coverImagePreview: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle location field click
  const handleLocationClick = () => {
    setShowLocationModal(true);
  };

  // Save location details and close modal
  const handleSaveLocation = () => {
    // Validate location details
    if (!locationDetails.state) {
      toast.error("Please select a state");
      return;
    }
    if (!locationDetails.lga) {
      toast.error("Please select an LGA");
      return;
    }
    if (!locationDetails.city) {
      toast.error("Please enter a city");
      return;
    }
    if (!locationDetails.address) {
      toast.error("Please enter an address");
      return;
    }

    // Format the full location string
    const fullLocation = `${locationDetails.address}, ${locationDetails.city}, ${locationDetails.lga} LGA, ${locationDetails.state} State, ${locationDetails.country}`;

    // Update event data with formatted location
    handleEventChange("location", fullLocation);

    // Close modal
    setShowLocationModal(false);
  };

  const handleNextStep = () => {
    // Validate current step before proceeding
    let isValid = false;

    if (step === 1) {
      isValid = validateStep1();
    } else if (step === 2) {
      isValid = validateStep2();
    }

    if (!isValid) return;

    // Show loading state when moving between steps
    setIsLoading(true);
    setTimeout(() => {
      setStep(step + 1);
      setIsLoading(false);
    }, 500); // Simulate loading for better UX
  };

  const handlePreviousStep = () => {
    // Clear errors when going back
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setStep(step - 1);
      setIsLoading(false);
    }, 300);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handlePublish = async () => {
    if (!eventData.coverImage) {
      toast.error("Cover image is required");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", eventData.title);
      formData.append("description", eventData.description);
      formData.append("date", eventData.date);
      formData.append("time", eventData.time);
      formData.append("location", eventData.location);
      formData.append("capacity", ticketData.ticketQuantity.toString());
      formData.append(
        "ticketType",
        ticketData.ticketType === "Free Ticket" ? "free" : "paid"
      );
      formData.append("ticketQty", ticketData.ticketQuantity.toString());

      // Add price if it's a paid ticket
      if (ticketData.ticketType === "Paid Ticket" && ticketData.ticketPrice) {
        formData.append("ticketPrice", ticketData.ticketPrice.toString());
      }

      // append image safely
      formData.append("coverImage", eventData.coverImage);

      const res = await createEvent.createEvent(formData);

      onPublish?.({
        ...eventData,
        ...ticketData,
      });

      setSocialLinks?.({
        facebook: eventData.socialLinks.facebook || "",
        linkedin: eventData.socialLinks.linkedin || "",
        twitter: eventData.socialLinks.twitter || "",
        instagram: eventData.socialLinks.instagram || "",
      });

      toast.success(res?.data?.message || "Event created successfully!");

      navigate("/dashboard/manage/events");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create event. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Loading skeleton for step transition
  const StepSkeleton = () => (
    <div className="w-full h-max p-6 md:p-8 rounded-lg border border-gray-300 bg-white animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-12 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full h-max flex flex-col gap-3 md:gap-6 px-4 md:px-8 py-4 md:py-8">
      {/* Header - Only show on steps 1 and 2 */}
      {step !== 3 && !isLoading && (
        <div>
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center mb-4 gap-2 text-sm font-medium text-[#323232] hover:opacity-70 transition-opacity w-max"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <p className="text-2xl md:text-3xl font-semibold text-[#323232]">
            Hello {userName},
          </p>
          <p className="text-sm md:text-base text-[#666666]">
            Start setting up your event
          </p>
        </div>
      )}

      {isLoading ? (
        <StepSkeleton />
      ) : step === 1 ? (
        <div className="w-full h-max p-6 md:p-8 rounded-lg flex flex-col gap-6 border border-gray-300 bg-white">
          <h2 className="text-lg md:text-xl font-semibold text-[#323232]">
            Event Details
          </h2>

          <div className="w-full h-max flex flex-col gap-6">
            {/* Event Title & Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#323232]">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={eventData.title}
                  onChange={(e) => handleEventChange("title", e.target.value)}
                  className={`text-sm placeholder:text-[#999999] w-full h-12 rounded-lg border ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } px-4 focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E] transition-all`}
                  placeholder="enter event title"
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#323232]">
                  Event Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={eventData.location}
                    onClick={handleLocationClick}
                    readOnly
                    className={`text-sm placeholder:text-[#999999] w-full h-12 rounded-lg border ${
                      errors.location ? "border-red-500" : "border-gray-300"
                    } px-4 pr-10 focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E] transition-all cursor-pointer bg-gray-50`}
                    placeholder="Click to set location"
                  />
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {errors.location && (
                  <p className="text-xs text-red-500 mt-1">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Event Date & Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#323232]">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={eventData.date}
                  onChange={(e) => handleEventChange("date", e.target.value)}
                  className={`text-sm placeholder:text-[#999999] w-full h-12 rounded-lg border ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  } px-4 focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E] transition-all`}
                />
                {errors.date && (
                  <p className="text-xs text-red-500 mt-1">{errors.date}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#323232]">
                  Event Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={eventData.time}
                  onChange={(e) => handleEventChange("time", e.target.value)}
                  className={`text-sm placeholder:text-[#999999] w-full h-12 rounded-lg border ${
                    errors.time ? "border-red-500" : "border-gray-300"
                  } px-4 focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E] transition-all`}
                />
                {errors.time && (
                  <p className="text-xs text-red-500 mt-1">{errors.time}</p>
                )}
              </div>
            </div>

            {/* Event Description */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#323232]">
                Event Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={eventData.description}
                onChange={(e) =>
                  handleEventChange("description", e.target.value)
                }
                className={`text-sm placeholder:text-[#999999] w-full h-40 md:h-48 rounded-lg border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } p-4 resize-none focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E] transition-all`}
                placeholder="clearly and briefly describe your event"
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Event Cover Image - File Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#323232]">
                Event Cover Image <span className="text-red-500">*</span>
              </label>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
              />

              {/* Upload area */}
              {!eventData.coverImagePreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full h-48 md:h-56 rounded-lg border-2 border-dashed ${
                    errors.coverImage ? "border-red-500" : "border-gray-300"
                  } cursor-pointer flex items-center justify-center flex-col bg-gray-50 hover:bg-gray-100 transition-colors gap-3`}
                >
                  <img src={selectGif} alt="upload" className="w-16 h-16" />
                  <div className="text-center">
                    <p className="text-sm text-[#666666]">
                      Drag & drop image here
                    </p>
                    <p className="text-xs text-[#999999] mb-2">OR</p>
                    <span className="text-sm font-semibold text-[#27187E] underline cursor-pointer hover:opacity-80">
                      Upload Image
                    </span>
                  </div>
                </div>
              ) : (
                /* Image Preview */
                <div className="relative w-full h-48 md:h-56 rounded-lg border border-gray-300 overflow-hidden">
                  <img
                    src={eventData.coverImagePreview}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {errors.coverImage && (
                <p className="text-xs text-red-500 mt-1">{errors.coverImage}</p>
              )}
              <p className="text-xs text-[#999999]">
                Image size should be less than 10mb. Accepted formats: PNG, JPG
              </p>
            </div>

            {/* Social Links Section */}
            <div className="flex flex-col gap-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-[#323232]">
                Add Social Links (Optional)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-[#323232]">
                    Facebook
                  </label>
                  <input
                    type="text"
                    value={eventData.socialLinks.facebook || ""}
                    onChange={(e) =>
                      handleSocialChange("facebook", e.target.value)
                    }
                    className="text-sm placeholder:text-[#999999] w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E] transition-all"
                    placeholder="enter facebook profile link"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-[#323232]">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    value={eventData.socialLinks.linkedin || ""}
                    onChange={(e) =>
                      handleSocialChange("linkedin", e.target.value)
                    }
                    className="text-sm placeholder:text-[#999999] w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E] transition-all"
                    placeholder="enter linkedin profile link"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-[#323232]">
                    X (Twitter)
                  </label>
                  <input
                    type="text"
                    value={eventData.socialLinks.twitter || ""}
                    onChange={(e) =>
                      handleSocialChange("twitter", e.target.value)
                    }
                    className="text-sm placeholder:text-[#999999] w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E] transition-all"
                    placeholder="enter X (twitter) profile link"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-[#323232]">
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={eventData.socialLinks.instagram || ""}
                    onChange={(e) =>
                      handleSocialChange("instagram", e.target.value)
                    }
                    className="text-sm placeholder:text-[#999999] w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E] transition-all"
                    placeholder="enter instagram profile link"
                  />
                </div>
              </div>
            </div>

            {/* Next Button with loading state */}
            <button
              onClick={handleNextStep}
              disabled={isLoading}
              className="w-full md:w-auto md:px-12 h-12 md:h-14 mt-4 rounded-lg cursor-pointer bg-[#27187E] hover:bg-[#1f0f5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white text-sm md:text-base font-semibold"
            >
              {isLoading ? "Loading..." : "Next"}
            </button>
          </div>
        </div>
      ) : step === 2 ? (
        <div className="w-full h-max p-6 md:p-8 rounded-lg flex flex-col gap-6 border border-gray-300 bg-white">
          <h2 className="text-lg md:text-xl font-semibold text-[#323232]">
            Ticket Details
          </h2>
          <div className="w-full h-max flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#323232]">
                  Ticket Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={ticketData.ticketType}
                  onChange={(e) =>
                    handleTicketChange("ticketType", e.target.value)
                  }
                  className="text-sm w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E] transition-all"
                >
                  <option value="Free Ticket">Free Ticket</option>
                  <option value="Paid Ticket">Paid Ticket</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#323232]">
                  Ticket Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={ticketData.ticketQuantity}
                  onChange={(e) =>
                    handleTicketChange(
                      "ticketQuantity",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className={`text-sm placeholder:text-[#999999] w-full h-12 rounded-lg border ${
                    errors.ticketQuantity ? "border-red-500" : "border-gray-300"
                  } px-4 focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E] transition-all`}
                />
                {errors.ticketQuantity && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.ticketQuantity}
                  </p>
                )}
              </div>
            </div>

            {/* Price Input - Only shows when Paid Ticket is selected */}
            {ticketData.ticketType === "Paid Ticket" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#323232]">
                    Ticket Price (₦) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={ticketData.ticketPrice || ""}
                    onChange={(e) =>
                      handleTicketChange(
                        "ticketPrice",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className={`text-sm placeholder:text-[#999999] w-full h-12 rounded-lg border ${
                      errors.ticketPrice ? "border-red-500" : "border-gray-300"
                    } px-4 focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E] transition-all`}
                    placeholder="Enter ticket price"
                  />
                  {errors.ticketPrice && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.ticketPrice}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#323232]">
                  Ticket Purchase Limit <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={ticketData.ticketPurchaseLimit}
                  onChange={(e) =>
                    handleTicketChange(
                      "ticketPurchaseLimit",
                      parseInt(e.target.value) || 1
                    )
                  }
                  className={`text-sm placeholder:text-[#999999] w-full h-12 rounded-lg border ${
                    errors.ticketPurchaseLimit
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-4 focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E] transition-all`}
                />
                {errors.ticketPurchaseLimit && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.ticketPurchaseLimit}
                  </p>
                )}
              </div>
            </div>

            {/* Continue Button with loading state */}
            <div className="flex justify-start">
              <button
                onClick={handleNextStep}
                disabled={isLoading}
                className="w-full md:w-auto md:px-12 h-12 md:h-14 mt-4 rounded-lg cursor-pointer bg-[#27187E] hover:bg-[#1f0f5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white text-sm md:text-base font-semibold"
              >
                {isLoading ? "Loading..." : "Continue"}
              </button>
            </div>
          </div>
        </div>
      ) : step === 3 ? (
        <EventPreview
          eventData={{
            title: eventData.title,
            location: eventData.location,
            date: eventData.date,
            time: eventData.time,
            description: eventData.description,
            coverImage: eventData.coverImagePreview || "",
            ticketType: ticketData.ticketType,
            ticketQuantity: ticketData.ticketQuantity,
            ticketPurchaseLimit: ticketData.ticketPurchaseLimit,
            socialLinks: eventData.socialLinks,
          }}
          userName={userName}
          onBack={handlePreviousStep}
          onPublish={handlePublish}
          isLoading={isLoading}
        />
      ) : null}

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-[#323232]">
                  Set Event Location
                </h3>
                <button
                  onClick={() => setShowLocationModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Country - Limited to Nigeria */}
                <div>
                  <label className="block text-sm font-medium text-[#323232] mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value="Nigeria"
                    disabled
                    className="w-full h-12 rounded-lg border border-gray-300 bg-gray-100 px-4 text-gray-600"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-[#323232] mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={locationDetails.state}
                    onChange={(e) =>
                      setLocationDetails({
                        ...locationDetails,
                        state: e.target.value,
                        lga: "",
                      })
                    }
                    className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E]"
                  >
                    <option value="">Select state</option>
                    {nigerianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* LGA */}
                <div>
                  <label className="block text-sm font-medium text-[#323232] mb-1">
                    Local Government Area{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={locationDetails.lga}
                    onChange={(e) =>
                      setLocationDetails({
                        ...locationDetails,
                        lga: e.target.value,
                      })
                    }
                    disabled={!locationDetails.state}
                    className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E] disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select LGA</option>
                    {availableLgas.map((lga) => (
                      <option key={lga} value={lga}>
                        {lga}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-[#323232] mb-1">
                    City/Town <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={locationDetails.city}
                    onChange={(e) =>
                      setLocationDetails({
                        ...locationDetails,
                        city: e.target.value,
                      })
                    }
                    placeholder="Enter city or town"
                    className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E]"
                  />
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-sm font-medium text-[#323232] mb-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={locationDetails.address}
                    onChange={(e) =>
                      setLocationDetails({
                        ...locationDetails,
                        address: e.target.value,
                      })
                    }
                    placeholder="Enter street address, building name, etc."
                    className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:border-[#27187E] focus:ring-1 focus:ring-[#27187E]"
                  />
                </div>

                {/* Preview */}
                {locationDetails.state &&
                  locationDetails.lga &&
                  locationDetails.city &&
                  locationDetails.address && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Preview:</p>
                      <p className="text-sm text-[#323232]">
                        {locationDetails.address}, {locationDetails.city},{" "}
                        {locationDetails.lga} LGA, {locationDetails.state}{" "}
                        State, Nigeria
                      </p>
                    </div>
                  )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowLocationModal(false)}
                    className="flex-1 h-12 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveLocation}
                    className="flex-1 h-12 rounded-lg bg-[#27187E] text-white font-medium hover:bg-[#1f0f5a] transition-colors"
                  >
                    Save Location
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEvent;
