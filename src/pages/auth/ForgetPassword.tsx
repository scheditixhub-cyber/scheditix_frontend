import logo from "../../assets/logo2.svg";
import { CiMail } from "react-icons/ci";
import { authApi } from "../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "../../library/toast";

interface User {
  email: string;
}

interface Errors {
  email?: string;
  general?: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<User>({
    email: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmail.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(userEmail.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserEmail((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await authApi.forgotPassword({
        email: userEmail.email,
      });

      toast.success(
        response?.data?.message || "Password reset code sent to your email!"
      );
      localStorage.setItem("authEmail", userEmail.email);
      navigate("/verify-email", { state: { type: "reset" } });

      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send reset code. Please try again.";
      setErrors((prev) => ({
        ...prev,
        general: errorMessage,
      }));
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

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
            <div className="w-100 rounded-lg sm:shadow-md h-max bg-none sm:bg-white flex flex-col items-start sm:items-center sm:px-10 sm:py-10 gap-4">
              <div className="flex flex-col sm:items-center">
                <h3 className="sm:text-lg text-2xl font-bold text-[#323232]">
                  Forgot your password?
                </h3>
                <p className="text-xs">
                  Enter your email address to reset your password
                </p>
              </div>

              {/* General Error Message */}
              {errors.general && (
                <div className="w-full bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                  <p className="text-xs text-red-600 text-center">
                    {errors.general}
                  </p>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="w-full h-max flex flex-col gap-3 pt-4 sm:pt-0"
              >
                <div className="w-full h-max flex flex-col gap-1">
                  <p className="sm:text-xs text-sm">
                    Email Address <span className="text-red-500">*</span>
                  </p>
                  <div
                    className={`w-full h-max flex border-[1.5px] sm:border-[1.3px] bg-white sm:bg-none rounded items-center px-2 transition-colors ${
                      errors.email
                        ? "border-red-500"
                        : "border-[#BABABA] focus-within:border-[#27187E]"
                    }`}
                  >
                    <span className="w-[10%] text-gray-500">
                      <CiMail />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={userEmail.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="outline-none border-none w-[90%] sm:h-9 h-12 sm:text-xs text-sm bg-transparent"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="w-full h-max flex flex-col items-center gap-2 mt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full sm:h-9 h-12 bg-[#27187E] text-white font-medium sm:text-xs text-sm rounded cursor-pointer transition-all ${
                      isLoading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-[#3a2a9e] active:scale-[0.98]"
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Sending...
                      </span>
                    ) : (
                      "Send verification code"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    disabled={isLoading}
                    className="w-full sm:h-9 h-12 text-[#27187E] font-medium sm:text-xs text-sm rounded cursor-pointer hover:bg-[#27187E]/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back to login
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
