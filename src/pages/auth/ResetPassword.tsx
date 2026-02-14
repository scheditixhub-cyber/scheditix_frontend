import logo from "../../assets/logo2.svg";
import successgif from "../../assets/verify-success.svg";
import { CiLock, CiWarning } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { authApi } from "../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "../../library/toast";

interface Data {
  password: string;
  confirmPassword: string;
}

interface Errors {
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const ResetPassword: React.FC = () => {
  const [userInfo, setUserInfo] = useState<Data>({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const email = localStorage.getItem("authEmail") || "";

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    // Password validation
    if (!userInfo.password) {
      newErrors.password = "Password is required";
    } else if (userInfo.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(userInfo.password)) {
      newErrors.password =
        "Password must contain at least one letter and one number";
    }

    // Confirm password validation
    if (!userInfo.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (userInfo.password !== userInfo.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
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
      const response = await authApi.resetPassword({
        email: email,
        password: userInfo.password,
        confirmPassword: userInfo.confirmPassword,
      });

      toast.success(response?.data?.message || "Password reset successfully!");
      setIsSuccess(true);
      localStorage.removeItem("authEmail");

      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to reset password. Please try again.";
      setErrors((prev) => ({
        ...prev,
        general: errorMessage,
      }));
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToLogin = () => {
    navigate("/login");
  };

  const getPasswordStrength = () => {
    const password = userInfo.password;
    if (!password) return { text: "Enter password", color: "text-gray-500" };
    if (password.length < 8)
      return { text: "Too short", color: "text-red-500" };
    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password))
      return { text: "Medium", color: "text-yellow-500" };
    if (password.length >= 8 && /(?=.*[A-Za-z])(?=.*\d)/.test(password))
      return { text: "Strong", color: "text-green-500" };
    return { text: "Weak", color: "text-red-500" };
  };

  const strength = getPasswordStrength();

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
            {!isSuccess ? (
              <div className="w-100 rounded-lg sm:shadow-md h-max bg-none sm:bg-white flex flex-col items-start sm:items-center sm:px-10 sm:py-10 gap-4">
                <div className="flex flex-col items-start sm:items-center text-center">
                  <h3 className="sm:text-lg text-2xl font-bold text-[#323232]">
                    Reset Password
                  </h3>
                  <p className="text-xs">
                    Please enter a new password for {email}
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
                      New Password <span className="text-red-500">*</span>
                    </p>
                    <div
                      className={`w-full h-max flex border-[1.5px] sm:border-[1.3px] bg-white sm:bg-none rounded items-center justify-between pl-2 transition-colors ${
                        errors.password
                          ? "border-red-500"
                          : "border-[#BABABA] focus-within:border-[#27187E]"
                      }`}
                    >
                      <span className="w-[10%] text-gray-500">
                        <CiLock />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={userInfo.password}
                        onChange={handleInputChange}
                        placeholder="Enter new password"
                        className="outline-none border-none w-[80%] sm:h-9 h-12 sm:text-xs text-sm bg-transparent"
                        disabled={isLoading}
                      />
                      <span
                        className="w-[10%] cursor-pointer text-gray-500 hover:text-[#27187E] transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <IoEyeOffOutline className="text-xl" />
                        ) : (
                          <IoEyeOutline className="text-xl" />
                        )}
                      </span>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="w-full h-max flex flex-col gap-1">
                    <p className="sm:text-xs text-sm">
                      Re-enter new Password{" "}
                      <span className="text-red-500">*</span>
                    </p>
                    <div
                      className={`w-full h-max flex border-[1.5px] sm:border-[1.3px] bg-white sm:bg-none rounded items-center justify-between pl-2 transition-colors ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-[#BABABA] focus-within:border-[#27187E]"
                      }`}
                    >
                      <span className="w-[10%] text-gray-500">
                        <CiLock />
                      </span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={userInfo.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Re-enter new password"
                        className="outline-none border-none w-[80%] sm:h-9 h-12 sm:text-xs text-sm bg-transparent"
                        disabled={isLoading}
                      />
                      <span
                        className="w-[10%] cursor-pointer text-gray-500 hover:text-[#27187E] transition-colors"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <IoEyeOffOutline className="text-xl" />
                        ) : (
                          <IoEyeOutline className="text-xl" />
                        )}
                      </span>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 mt-2">
                    <p
                      className={`w-max h-max flex items-center gap-2 sm:font-medium sm:text-[10px] text-sm font-bold ${strength.color}`}
                    >
                      <CiWarning size={18} />
                      <span>Password Strength: {strength.text}</span>
                    </p>
                    <p
                      className={`w-max h-max flex items-center gap-2 sm:font-medium sm:text-[10px] text-sm font-bold ${
                        userInfo.password.length >= 8
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      <CiWarning size={18} />
                      <span>At least 8 characters</span>
                    </p>
                    <p
                      className={`w-max h-max flex items-center gap-2 sm:font-medium sm:text-[10px] text-sm font-bold ${
                        /(?=.*[A-Za-z])(?=.*\d)/.test(userInfo.password)
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      <CiWarning size={18} />
                      <span>Contains a letter and a number</span>
                    </p>
                    <p
                      className={`w-max h-max flex items-center gap-2 sm:font-medium sm:text-[10px] text-sm font-bold ${
                        userInfo.password === userInfo.confirmPassword &&
                        userInfo.password
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      <CiWarning size={18} />
                      <span>Passwords match</span>
                    </p>
                  </div>

                  <div className="w-full h-max flex flex-col items-center gap-2 mt-4">
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
                          Resetting...
                        </span>
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="w-100 rounded-lg sm:shadow-md h-max bg-none sm:bg-white flex flex-col items-start sm:items-center sm:px-10 sm:py-10 gap-4">
                <div className="flex flex-col sm:items-center text-center">
                  <h3 className="sm:text-lg text-2xl font-bold text-[#323232]">
                    Password Reset Successful
                  </h3>
                  <p className="text-xs">
                    Sign in with your new credentials to continue enjoying Wave
                    Pass
                  </p>
                </div>

                <div className="w-full flex flex-col items-center">
                  <img src={successgif} alt="Success" className="w-40 h-auto" />
                  <button
                    type="button"
                    onClick={handleProceedToLogin}
                    className="w-full sm:h-9 h-12 bg-[#27187E] text-white font-medium sm:text-xs text-sm rounded cursor-pointer mt-6 hover:bg-[#3a2a9e] transition-colors"
                  >
                    Proceed to Login
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

export default ResetPassword;
