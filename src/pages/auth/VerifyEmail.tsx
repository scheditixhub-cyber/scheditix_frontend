import React, { useState, useRef, useEffect } from "react";
import type { ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";
import logo from "../../assets/logo2.svg";
import successgif from "../../assets/verify-success.svg";
import { authApi } from "../../api";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "../../library/toast";
import { setToken, setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";

const VerifyEmail: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState<number>(120);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get verification type from location state
  const verificationType = location.state?.type || "signup";

  // Get email from localStorage using a single key
  const email = localStorage.getItem("authEmail") || "";

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (): string => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleChange = (value: string, index: number) => {
    const char = value.replace(/[^0-9]/g, "");
    if (!char) return;

    const newOtp = [...otp];
    newOtp[index] = char.substring(char.length - 1);
    setOtp(newOtp);

    if (index < 5 && char) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = "";
      } else {
        newOtp[index] = "";
      }
      setOtp(newOtp);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const data = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(data)) return;

    const newOtp = [...otp];
    data.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    const lastIndex = Math.min(data.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  // Redirect if no email found - do this before any API calls
  useEffect(() => {
    if (!email) {
      toast.error("No email found. Please try again.");
      navigate(verificationType === "signup" ? "/signup" : "/forgot-password");
    }
  }, [email, navigate, verificationType]);

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length !== 6) return;

    setIsLoading(true);
    try {
      let response;

      if (verificationType === "signup") {
        response = await authApi.emailVerify({
          email: email, // Now TypeScript knows email is string
          otp: otpCode,
        });
        toast.success(
          response?.data?.message || "Email verified successfully!"
        );
        setIsVerified(true);
        dispatch(setUser(response?.data?.data));
        dispatch(setToken(response?.data?.token));
        localStorage.removeItem("authEmail");
      } else {
        response = await authApi.verifyResetCode({
          email: email, // Now TypeScript knows email is string
          otp: otpCode,
        });
        toast.success(response?.data?.message || "Code verified successfully!");
        setIsVerified(true);
      }

      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Verification failed. Please try again.";
      toast.error(errorMessage);
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (timer > 0) return;

    setIsResending(true);
    try {
      let response;

      if (verificationType === "signup") {
        response = await authApi.resendVerificationCode({
          email: email, // Now TypeScript knows email is string
        });
      } else {
        response = await authApi.resendResetCode({
          email: email, // Now TypeScript knows email is string
        });
      }

      toast.success(
        response?.data?.message || "Verification code resent successfully!"
      );
      setTimer(120);
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();

      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to resend code. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const handleContinue = () => {
    if (verificationType === "signup") {
      navigate("/dashboard");
    } else {
      navigate("/reset-password", { state: { email } });
    }
  };

  const getTitleAndDescription = () => {
    if (verificationType === "signup") {
      return {
        title: "Verify Your Email",
        description: "Please input the code sent to your email",
        successTitle: "Email Verification Complete",
        successDescription:
          "You can now proceed to your dashboard to plan your event",
        buttonText: "Go to Dashboard",
      };
    } else {
      return {
        title: "Reset Your Password",
        description: "Please input the verification code sent to your email",
        successTitle: "Code Verified",
        successDescription: "You can now reset your password",
        buttonText: "Continue to Reset Password",
      };
    }
  };

  const texts = getTitleAndDescription();

  return (
    <div className="w-full h-max bg-[#E9E7F4]">
      <div className="w-full min-h-screen h-max bg-[#E9E7F4] sm:bg-[url(/src/assets/authvector.svg)] bg-center object-center object-contain bg-size-[auto_120%] bg-no-repeat flex justify-center">
        <div className="w-full md:max-w-7xl min-h-full px-6 sm:px-20 flex flex-col items-center">
          <a href="/" className="w-full h-20 flex items-end gap-4">
            <img src={logo} alt="Wave Pass Logo" />
            <p className="text-2xl font-medium bg-linear-to-r from-[#27187E] to-[#6F18AA] bg-clip-text text-transparent">
              Wave Pass
            </p>
          </a>
          <main className="w-full h-[calc(100%-5rem)] flex pt-12 sm:pt-0 sm:items-center justify-center">
            {!isVerified ? (
              <div className="w-100 rounded-lg sm:shadow-md h-max bg-none sm:bg-white flex flex-col items-start sm:items-center sm:px-10 sm:py-10 gap-4">
                <div className="flex flex-col items-start sm:items-center text-center">
                  <h3 className="sm:text-lg text-2xl font-bold text-[#323232]">
                    {texts.title}
                  </h3>
                  <p className="text-xs">{texts.description}</p>
                </div>

                <form
                  onSubmit={handleVerify}
                  noValidate
                  className="w-full h-max flex flex-col gap-3 pt-4 sm:pt-0"
                >
                  <div className="w-full h-max flex justify-between gap-2">
                    {otp.map((data, index) => (
                      <input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={1}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        value={data}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(e.target.value, index)
                        }
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                          handleKeyDown(e, index)
                        }
                        onPaste={handlePaste}
                        disabled={isLoading || isResending}
                        className="w-10 h-10 rounded flex items-center justify-center border border-gray-300 text-center outline-none focus:border-[#27187E] transition-all bg-white sm:bg-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    ))}
                  </div>

                  <div className="w-full h-max flex flex-col items-center gap-2 mt-2">
                    <button
                      type="submit"
                      disabled={
                        otp.join("").length < 6 || isLoading || isResending
                      }
                      className={`w-full sm:h-9 h-12 bg-[#27187E] disabled:bg-gray-400 text-white font-medium sm:text-xs text-sm rounded cursor-pointer transition-colors flex items-center justify-center gap-2 ${
                        isLoading ? "opacity-70" : ""
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Verifying...
                        </>
                      ) : (
                        "Verify"
                      )}
                    </button>

                    <p className="text-center sm:font-medium sm:text-[10px] text-sm font-bold mt-2">
                      Didn't receive any code?
                    </p>

                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={timer > 0 || isLoading || isResending}
                      className={`flex items-center gap-2 sm:text-[10px] text-sm font-bold transition-opacity ${
                        timer > 0 || isLoading || isResending
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-[#27187E] cursor-pointer hover:underline"
                      }`}
                    >
                      {isResending ? (
                        <>
                          <span className="w-3 h-3 border-2 border-[#27187E] border-t-transparent rounded-full animate-spin"></span>
                          Resending...
                        </>
                      ) : (
                        <>
                          Resend Code
                          {timer > 0 && <span>({formatTime()})</span>}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="w-100 rounded-lg sm:shadow-md h-max bg-none sm:bg-white flex flex-col items-start sm:items-center sm:px-10 sm:py-10 gap-4">
                <div className="flex flex-col sm:items-center text-center">
                  <h3 className="sm:text-lg text-2xl font-bold text-[#323232]">
                    {texts.successTitle}
                  </h3>
                  <p className="text-xs">{texts.successDescription}</p>
                </div>

                <div className="w-full flex flex-col items-center">
                  <img src={successgif} alt="Success" className="w-40 h-auto" />
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="w-full sm:h-9 h-12 bg-[#27187E] text-white font-medium sm:text-xs text-sm rounded cursor-pointer mt-6 hover:bg-[#3a2a9e] transition-colors"
                  >
                    {texts.buttonText}
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
