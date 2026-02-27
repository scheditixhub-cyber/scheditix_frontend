import { useState } from "react";
import logo from "../../assets/logo2.svg";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { authApi } from "../../api";
import toast from "../../library/toast";

interface Data {
  email: string;
  name: string;
  password: string;
}

interface Errors {
  email?: string;
  name?: string;
  password?: string;
  general?: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Data>({
    email: "",
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!credentials.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (credentials.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!credentials.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(credentials.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!credentials.password) {
      newErrors.password = "Password is required";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(credentials.password)) {
      newErrors.password =
        "Password must contain at least one letter and one number";
    }

    if (!agreeTerms) {
      newErrors.general = "You must agree to the terms & conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
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
      const response = await authApi.resgister(credentials);
      const email = credentials.email;
      toast.success(
        response?.data?.message || "Account created successfully! Please login."
      );
      navigate("/verify-email", { state: { email, type: "signup" } });

      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      setErrors((prev) => ({
        ...prev,
        general: errorMessage,
      }));
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
                  Unlock Your Event Access
                </h3>
                <p className="text-xs">
                  Sign up to get started with your event
                </p>
              </div>

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
                    Full Name <span className="text-red-500">*</span>
                  </p>
                  <div
                    className={`w-full h-max flex border-[1.5px] sm:border-[1.3px] bg-white sm:bg-none rounded items-center px-2 transition-colors ${
                      errors.name
                        ? "border-red-500"
                        : "border-[#BABABA] focus-within:border-[#27187E]"
                    }`}
                  >
                    <span className="w-[10%] text-gray-500">
                      <CiUser />
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={credentials.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="outline-none border-none w-[90%] sm:h-9 h-12 sm:text-xs text-sm bg-transparent"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

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
                      value={credentials.email}
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

                <div className="w-full h-max flex flex-col gap-1">
                  <p className="sm:text-xs text-sm">
                    Password <span className="text-red-500">*</span>
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
                      value={credentials.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="outline-none border-none w-[80%] sm:h-9 h-12 sm:text-xs text-sm bg-transparent"
                      disabled={isLoading}
                    />
                    <span
                      className="w-[10%] cursor-pointer text-gray-500 hover:text-[#27187E] transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? "Hide password" : "Show password"}
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
                  <p className="text-[10px] text-gray-500 mt-1">
                    Password must be at least 6 characters with at least one
                    letter and one number
                  </p>
                </div>

                <div className="w-full h-max flex items-start gap-2 mt-2 sm:mt-0">
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      if (errors.general) {
                        setErrors((prev) => ({
                          ...prev,
                          general: undefined,
                        }));
                      }
                    }}
                    className="w-4 h-4 mt-1 cursor-pointer accent-[#27187E]"
                    disabled={isLoading}
                  />
                  <p className="sm:text-xs text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="/terms" className="text-[#27187E] hover:underline">
                      terms & conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-[#27187E] hover:underline"
                    >
                      privacy policy
                    </a>
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
                        Creating account...
                      </span>
                    ) : (
                      "Sign up"
                    )}
                  </button>

                  <p className="w-max h-max flex items-center text-center gap-2 sm:font-medium sm:text-xs text-sm mt-2 sm:mt-0">
                    Already have an account?{" "}
                    <NavLink
                      to="/login"
                      className="cursor-pointer text-[#27187E] hover:underline font-semibold"
                    >
                      Sign in
                    </NavLink>
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Signup;
