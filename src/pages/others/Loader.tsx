import logo from "../../assets/LogoWrap.png"

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        {/* Logo / Brand */}
        {/* <h1 className="text-3xl font-bold tracking-widest text-[#27187E]">
          WAVE PASS
        </h1> */}
        <div className="flex items-center cursor-pointer gap-2 font-bold text-lg">
          <img src={logo} alt="" />
        </div>

        {/* Spinner */}
        {/* <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#27187E]/30 rounded-full"></div>

          <div className="absolute w-16 h-16 border-4 border-[#27187E] border-t-transparent rounded-full animate-spin"></div>
        </div> */}

        {/* Loading text */}
        <p className="text-gray-500 text-sm tracking-wide animate-pulse">
          Catching the next event wave...
        </p>

        {/* Wave bars */}
        <div className="flex gap-1 mt-2">
          <span className="w-2 h-6 bg-[#27187E] rounded animate-bounce"></span>
          <span className="w-2 h-8 bg-[#27187E] rounded animate-bounce [animation-delay:0.1s]"></span>
          <span className="w-2 h-10 bg-[#27187E] rounded animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2 h-8 bg-[#27187E] rounded animate-bounce [animation-delay:0.3s]"></span>
          <span className="w-2 h-6 bg-[#27187E] rounded animate-bounce [animation-delay:0.4s]"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
