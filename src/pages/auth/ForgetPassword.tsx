import logo from "../../assets/logo2.svg";
import {CiMail} from "react-icons/ci";

const ForgotPassword = () => {
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
                                    Forgot your password?
                                </h3>
                                <p className="text-xs">
                                    Enter your email address to reset your
                                    password
                                </p>
                            </div>
                            <form
                                action="submit"
                                noValidate
                                className="w-full h-max flex flex-col gap-3 pt-4 sm:pt-0"
                            >
                                <div className="w-full h-max flex flex-col gap-1">
                                    <p className="sm:text-xs text-sm  ">
                                        Email Address{" "}
                                    </p>
                                    <div className="w-full h-max flex border-[1.5px] sm:border-[1.3px] border-[#BABABA] bg-white sm:bg-none rounded items-center px-2">
                                        <span className="w-[10%]">
                                            <CiMail />
                                        </span>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="enter your email address"
                                            className="outline-none border-none w-[90%] sm:h-9 h-12 sm:text-xs text-sm  "
                                        />
                                    </div>
                                </div>

                                <div className="w-full h-max flex flex-col items-center gap-2 mt-2">
                                    <button
                                        name="button"
                                        type="submit"
                                        className="w-full sm:h-9 h-12 bg-[#27187E] text-white font-medium sm:text-xs text-sm  rounded cursor-pointer"
                                    >
                                        Send verification code
                                    </button>
                                    <button
                                        name="button"
                                        type="submit"
                                        className="w-full sm:h-9 h-12  text-[#27187E] font-medium sm:text-xs text-sm  rounded cursor-pointer"
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
