import logo from "../../assets/logo2.svg";
import { CiLock, CiMail } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { authApi } from "../../api";
import React, { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { setToken, setUser } from "../../store/userSlice";
import toast from "../../library/toast";
type loginDataType = {
  email: string;
  password: string;
};
const Login = () => {
  const [data, setData] = useState<loginDataType>({
    email: "frontend@mailinator.com",
    password: "Password1$",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data?.email || !data?.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const hide = toast.loading("Signing in...");
    setLoading(true);
    try {
      const response = await authApi.login({
        email: data.email,
        password: data.password,
      });

      if (response?.status === 200) {
        toast.success(response?.data?.message);
        dispatch(setUser(response?.data?.data));
        dispatch(setToken(response?.data?.token));

        navigate("/dashboard/overview");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      hide();
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-max bg-[#E9E7F4]">
      <div className="w-full min-h-screen h-max bg-[#E9E7F4] sm:bg-[url(/src/assets/authvector.svg)] bg-center object-center object-contain bg-size-[auto_120%] bg-no-repeat flex justify-center">
        <div className="w-full md:max-w-7xl min-h-full px-6 sm:px-20 flex flex-col items-center">
          <a href="/" className="w-full h-20  flex items-end gap-4">
            <img src={logo} alt="" />
            <p className="text-2xl font-medium bg-linear-to-r from-[#27187E] to-[#6F18AA] bg-clip-text text-transparent">
              Wave Pass
            </p>
          </a>
          <main className="w-full h-[calc(100%-5rem)] flex pt-12 sm:pt-0 sm:items-center justify-center ">
            <div className="w-100 rounded-lg sm:shadow-md h-max bg-none sm:bg-white flex flex-col items-start sm:items-center sm:px-10 sm:py-10 gap-4">
              <div className="flex flex-col sm:items-center ">
                <h3 className="sm:text-lg text-2xl font-bold text-[#323232]">
                  Unlock Your Event Access
                </h3>
                <p className="text-xs">Sign in to manage your event access</p>
              </div>

              <form
                action="submit"
                noValidate
                className="w-full h-max flex flex-col gap-3 pt-4 sm:pt-0"
                onSubmit={handleLogin}
              >
                <div className="w-full h-max flex flex-col gap-1">
                  <p className="sm:text-xs text-sm  ">Email Address </p>
                  <div className="w-full h-max flex border-[1.5px] sm:border-[1.3px] border-[#BABABA] bg-white sm:bg-none rounded items-center px-2">
                    <span className="w-[10%]">
                      <CiMail />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={data?.email}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          email: e?.target?.value,
                        }))
                      }
                      disabled={loading}
                      placeholder="enter your email address"
                      className="outline-none border-none w-[90%] sm:h-9 h-12 sm:text-xs text-sm  "
                    />
                  </div>
                </div>
                <div className="w-full h-max flex flex-col gap-1">
                  <p className="sm:text-xs text-sm  ">Password </p>
                  <div className="w-full h-max flex border-[1.5px] sm:border-[1.3px] border-[#BABABA] bg-white sm:bg-none rounded items-center justify-between pl-2">
                    <span className="w-[10%]">
                      <CiLock />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={data.password}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      disabled={loading}
                      name="password"
                      placeholder="enter your password"
                      className="outline-none border-none w-[80%] sm:h-9 h-12 sm:text-xs text-sm  "
                    />
                    <span
                      className="w-[10%] cursor-pointer pr-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <IoEyeOffOutline className="cursor-pointer" />
                      ) : (
                        <IoEyeOutline className="cursor-pointer" />
                      )}
                    </span>
                  </div>
                </div>

                <div className="w-full h-max flex flex-col items-center gap-2 mt-2">
                  <button
                    name="button"
                    type="submit"
                    disabled={loading}
                    className="w-full sm:h-9 h-12 bg-[#27187E] text-white font-medium sm:text-xs text-sm  rounded cursor-pointer disabled:cursor-not-allowed disabled:bg-[#3c24c5] disabled:animate-pulse"
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                  <p className="w-max h-max flex items-center text-center gap-6 sm:font-medium sm:text-[10px] text-sm font-bold mt-2 sm:mt-0">
                    Don't have an account?{" "}
                    <NavLink
                      to={"/signup"}
                      className="cursor-pointer text-[#27187e]"
                    >
                      sign up
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

export default Login;
