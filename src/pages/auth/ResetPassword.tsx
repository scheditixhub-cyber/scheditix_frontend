import logo from "../../assets/logo2.svg";
import successgif from "../../assets/verify-success.svg";
import {CiLock, CiWarning} from "react-icons/ci";
import {IoEyeOutline} from "react-icons/io5";

const VerifyEmail: React.FC = () => {
    const isSuccess = true;
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
                    <main className="w-full h-[calc(100%-5rem)] flex pt-12 sm:pt-0 sm:items-center justify-center">
                        {isSuccess ? (
                            <div className="w-100 rounded-lg sm:shadow-md h-max bg-none sm:bg-white flex flex-col items-start sm:items-center sm:px-10 sm:py-10 gap-4">
                                <div className="flex flex-col items-start sm:items-center text-center">
                                    <h3 className="sm:text-lg text-2xl font-bold text-[#323232]">
                                        Reset Password
                                    </h3>
                                    <p className="text-xs">
                                        Please put in a new password
                                    </p>
                                </div>

                                <form
                                    noValidate
                                    className="w-full h-max flex flex-col gap-3 pt-4 sm:pt-0"
                                >
                                    <div className="w-full h-max flex flex-col gap-1">
                                        <p className="sm:text-xs text-sm  ">
                                            New Password{" "}
                                        </p>
                                        <div className="w-full h-max flex border-[1.5px] sm:border-[1.3px] border-[#BABABA] bg-white sm:bg-none rounded items-center justify-between pl-2">
                                            <span className="w-[10%]">
                                                <CiLock />
                                            </span>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="enter new password"
                                                className="outline-none border-none w-[80%] sm:h-9 h-12 sm:text-xs text-sm  "
                                            />
                                            <span className="w-[10%] cursor-pointer">
                                                <IoEyeOutline className="cursor-pointer" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full h-max flex flex-col gap-1">
                                        <p className="sm:text-xs text-sm  ">
                                            Re-enter new Password{" "}
                                        </p>
                                        <div className="w-full h-max flex border-[1.5px] sm:border-[1.3px] border-[#BABABA] bg-white sm:bg-none rounded items-center justify-between pl-2">
                                            <span className="w-[10%]">
                                                <CiLock />
                                            </span>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="enter new password"
                                                className="outline-none border-none w-[80%] sm:h-9 h-12 sm:text-xs text-sm  "
                                            />
                                            <span className="w-[10%] cursor-pointer">
                                                <IoEyeOutline className="cursor-pointer" />
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="w-max h-max flex items-center text-center gap-2 sm:font-medium sm:text-[10px] text-sm font-bold mt-2 sm:mt-0 text-red-500">
                                            <CiWarning size={18} />
                                            <span className=" text-red-500">
                                                Password Strength : Weak
                                            </span>
                                        </p>
                                        <p className="w-max h-max flex items-center text-center gap-2 sm:font-medium sm:text-[10px] text-sm font-bold mt-2 sm:mt-0 text-red-500">
                                            <CiWarning size={18} />
                                            <span className=" text-red-500">
                                                At least 8 characters
                                            </span>
                                        </p>
                                        <p className="w-max h-max flex items-center text-center gap-2 sm:font-medium sm:text-[10px] text-sm font-bold mt-2 sm:mt-0 text-red-500">
                                            <CiWarning size={18} />
                                            <span className=" text-red-500">
                                                Contains a number or symbol
                                            </span>
                                        </p>
                                    </div>
                                    <div className="w-full h-max flex flex-col items-center gap-2 mt-2">
                                        <button
                                            name="button"
                                            type="submit"
                                            className="w-full sm:h-9 h-12 bg-[#27187E] text-white font-medium sm:text-xs text-sm  rounded cursor-pointer"
                                        >
                                            Reset Password
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
                                        Sign in with your new credentials to
                                        continue enjoying Wave Pass
                                    </p>
                                </div>

                                <div className="w-40 h-max">
                                    <img src={successgif} alt="" />
                                    <button
                                        name="button"
                                        type="submit"
                                        className="w-full sm:h-9 h-12 bg-[#27187E] text-white font-medium sm:text-xs text-sm  rounded cursor-pointer mt-6"
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

export default VerifyEmail;
