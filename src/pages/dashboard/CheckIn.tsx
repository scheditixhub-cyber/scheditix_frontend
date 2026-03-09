import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import toast from "../../library/toast";
import { useNavigate, useParams } from "react-router-dom";
import { createEvent } from "../../api";

interface AttendeeInfo {
  _id: string;
  name: string;
  email: string;
  phone: string;
  code: string;
  checkedInStatus: "pending" | "checked_in" | "cancelled";
}

export default function CheckIn() {
  const { id } = useParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [attendeeInfo, setAttendeeInfo] = useState<AttendeeInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  // Auto-search when OTP is complete (6 characters)
  useEffect(() => {
    const fullCode = otp.join("");
    if (fullCode.length === 6 && id) {
      searchAttendee(fullCode);
    } else {
      setAttendeeInfo(null);
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp, id]);

  const searchAttendee = async (code: string) => {
    setSearchLoading(true);
    setError(null);

    try {
      const response = await createEvent.getAttendeeByCode({ code }, id!);
      setAttendeeInfo(response.data.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Attendee not found");
      setError(err?.response?.data?.message || "Attendee not found");
      setAttendeeInfo(null);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleChange = (index: number, value: string) => {
    // Allow alphanumeric characters (letters and numbers)
    if (value && !/^[a-zA-Z0-9]*$/.test(value)) return;

    const newOtp = [...otp];

    // Handle paste of multiple characters
    if (value.length > 1) {
      const chars = value.slice(0, 6).split("");
      chars.forEach((char, i) => {
        if (i < 6) newOtp[i] = char.toUpperCase();
      });
      setOtp(newOtp);

      // Focus the next empty input or last input
      const nextEmptyIndex = newOtp.findIndex((val) => val === "");
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
      return;
    }

    // Handle single character - convert to uppercase for consistency
    newOtp[index] = value.toUpperCase();
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 6);
    const newOtp = [...otp];

    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char.toUpperCase();
    });

    setOtp(newOtp);

    // Focus the next empty input or last input
    const nextEmptyIndex = newOtp.findIndex((val) => val === "");
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleCheckIn = async () => {
    if (!attendeeInfo || !id) {
      setError("No valid attendee found");
      return;
    }

    setCheckInLoading(true);

    try {
      const response = await createEvent.checkInUser(
        { code: otp.join("") },
        id
      );

      setAttendeeInfo({
        ...attendeeInfo,
        checkedInStatus: "checked_in",
      });

      toast.success(
        response.data?.message || "Attendee checked in successfully!"
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to check in attendee"
      );
      setError("Failed to check in attendee");
    } finally {
      setCheckInLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const fullCode = otp.join("");

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Attendee Check-In
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Enter the 6-character ticket code to check in an attendee.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="flex flex-col gap-6 max-w-md">
        {/* Ticket Code Label */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Ticket Code
          </label>

          {/* OTP Input Boxes */}
          <div className="flex items-center gap-2 justify-between">
            {otp.map((digit, index) => (
              <div key={index} className="flex items-center">
                <input
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="text"
                  maxLength={6} // Allow paste of multiple characters
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={searchLoading || checkInLoading}
                  className="w-12 h-14 text-center text-xl font-semibold uppercase border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27187E] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  autoFocus={index === 0}
                />
                {/* Add hyphen after the third box */}
                {index === 2 && (
                  <span className="text-2xl font-bold text-gray-400 mx-2">
                    -
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Helper text */}
          <p className="text-xs text-gray-500 mt-2">
            {fullCode.length === 6
              ? "✓ Code entered"
              : `Enter ${6 - fullCode.length} more character${6 - fullCode.length !== 1 ? "s" : ""}`}
          </p>

          {/* Error Message */}
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

          {/* Loading Indicator */}
          {searchLoading && (
            <p className="text-blue-600 text-xs mt-2">
              Searching for attendee...
            </p>
          )}
        </div>

        {/* Attendee Info Section - Only shown when attendee found */}
        {attendeeInfo && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Name
                </p>
                <p className="text-gray-900 font-medium">{attendeeInfo.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Email
                </p>
                <p className="text-gray-700 text-sm">{attendeeInfo.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Phone
                </p>
                <p className="text-gray-700 text-sm">{attendeeInfo.phone}</p>
              </div>
              <div className="pt-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    attendeeInfo.checkedInStatus === "checked_in"
                      ? "bg-green-100 text-green-700"
                      : attendeeInfo.checkedInStatus === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {attendeeInfo.checkedInStatus === "checked_in"
                    ? "Checked In"
                    : attendeeInfo.checkedInStatus === "cancelled"
                      ? "Cancelled"
                      : "Pending"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Check In Button */}
        {attendeeInfo && attendeeInfo.checkedInStatus !== "checked_in" && (
          <button
            onClick={handleCheckIn}
            disabled={checkInLoading}
            className="w-full px-6 py-3 bg-[#27187E] text-white font-medium rounded-lg hover:bg-[#1f0f5a] active:bg-[#160854] disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
          >
            {checkInLoading ? "Checking In..." : "Check In"}
          </button>
        )}

        {/* Already Checked In Message */}
        {attendeeInfo && attendeeInfo.checkedInStatus === "checked_in" && (
          <div className="w-full px-6 py-3 bg-green-100 text-green-700 font-medium rounded-lg text-center">
            Already Checked In
          </div>
        )}
      </div>
    </div>
  );
}
