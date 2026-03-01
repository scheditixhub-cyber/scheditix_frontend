import {
  Minus,
  Plus,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
} from "lucide-react";
import { useState } from "react";

interface TicketPurchaseProps {
  eventImage: string;
  ticketType: string;
  ticketPrice: number;
  purchaseLimit: number;
  onCheckout: (purchaseData: PurchaseData) => void;
  onBack: () => void;
}

export interface PurchaseData {
  fullName: string;
  email: string;
  phoneNumber: string;
  quantity: number;
  ticketType: string;
}

const TicketPurchase = ({
  eventImage,
  ticketType,
  ticketPrice,
  onCheckout,
  onBack,
}: TicketPurchaseProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showShareMenu, setShowShareMenu] = useState(false);
  const quantity = 1; // Fixed to 1 ticket per purchase

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Valid email is required";
    }
    if (!phoneNumber.trim() || phoneNumber.length < 11) {
      newErrors.phoneNumber = "Valid phone number is required (11 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (validateForm()) {
      onCheckout({
        fullName,
        email,
        phoneNumber,
        quantity,
        ticketType,
      });
    }
  };

  const handleShare = (platform: string) => {
    const shareUrl = window.location.href;
    const shareText = `Check out this amazing ticket: ${ticketType}`;

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      copy: shareUrl,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl);
    } else {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
    setShowShareMenu(false);
  };

  const totalPrice = ticketPrice * quantity;
  const serviceCharge = 0;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="px-4 md:px-8 py-8 md:py-10 max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>←</span>
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Ticket Form */}
          <div className="space-y-6">
            {/* Ticket Details Card */}
            <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Ticket Details
              </h2>

              {/* Ticket Type and Purchase Limit Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Ticket Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Ticket Type
                  </label>
                  <div className="flex items-center justify-between h-12 bg-gray-100 rounded-lg px-4 border border-gray-200">
                    <span className="font-semibold text-gray-900">
                      {ticketType}
                    </span>
                    <span className="text-gray-700 font-medium">
                      ₦{ticketPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Purchase Limit - Fixed to 1 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Purchase Limit
                  </label>
                  <div className="flex items-center gap-3 h-12 border border-gray-300 rounded-lg px-4 bg-white">
                    <span className="text-sm text-gray-600">1 slot</span>
                    <div className="ml-auto flex items-center gap-2">
                      <button
                        disabled
                        className="text-gray-400 opacity-30 cursor-not-allowed"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="text-gray-900 font-semibold w-8 text-center">
                        {quantity}
                      </span>
                      <button
                        disabled
                        className="text-gray-400 opacity-30 cursor-not-allowed"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: "" });
                  }}
                  placeholder="enter your full name"
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  placeholder="enter your email address"
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (errors.phoneNumber)
                      setErrors({ ...errors, phoneNumber: "" });
                  }}
                  placeholder="enter your 11 digit phone number"
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full h-12 md:h-14 bg-blue-900 hover:bg-blue-950 text-white font-semibold rounded-lg transition-colors mb-6"
              >
                Checkout
              </button>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="w-full h-12 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 size={18} />
                  <span>Share</span>
                </button>

                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 space-y-3 z-10">
                    <button
                      onClick={() => handleShare("facebook")}
                      className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors text-gray-700"
                    >
                      <Facebook size={18} className="text-blue-600" />
                      <span className="text-sm font-medium">Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare("twitter")}
                      className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors text-gray-700"
                    >
                      <Twitter size={18} className="text-blue-400" />
                      <span className="text-sm font-medium">Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors text-gray-700"
                    >
                      <Linkedin size={18} className="text-blue-700" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </button>
                    <div className="border-t border-gray-200 pt-3">
                      <button
                        onClick={() => handleShare("copy")}
                        className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors text-gray-700"
                      >
                        <Copy size={18} />
                        <span className="text-sm font-medium">Copy Link</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <Facebook size={20} className="text-white" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400 hover:bg-blue-500 transition-colors"
                >
                  <Twitter size={20} className="text-white" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors"
                >
                  <Linkedin size={20} className="text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="bg-white rounded-lg p-6 md:p-8 h-fit border border-gray-200 shadow-sm sticky top-8">
            {/* Event Image */}
            <div className="w-full h-64 md:h-72 rounded-lg overflow-hidden mb-8">
              <img
                src={eventImage}
                alt="event"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Ticket Type Display */}
            <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-200">
              <span className="text-gray-700 font-medium">Ticket Type</span>
              <span className="text-gray-900 font-bold">{ticketType}</span>
            </div>

            {/* Order Summary Header */}
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Order Summary
            </h3>

            {/* Line Items */}
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {quantity} x {ticketType}
                </span>
                <span className="text-sm text-gray-900 font-semibold">
                  ₦{totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Service charge</span>
                <span className="text-sm text-gray-900 font-semibold">
                  ₦{serviceCharge.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-3xl font-bold text-gray-900">
                ₦{(totalPrice + serviceCharge).toFixed(2)}
              </span>
            </div>

            {/* Security Message */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <svg
                className="w-4 h-4 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
              <span>Payments are secured and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPurchase;
