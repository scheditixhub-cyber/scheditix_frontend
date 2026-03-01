import { IoArrowBack } from "react-icons/io5";

const CheckIn = () => {
  return (
    <div className="w-full h-max flex flex-col gap-3">
      <div className="w-full h-max p-3 rounded flex flex-col gap-4">
        <div className="w-max flex items-center gap-3">
          <IoArrowBack className="cursor-pointer" />
          <p className="font-medium">Attendee Check In </p>
        </div>
        <p className="text-xs tex-[#323232]">
          Enter ticket code to check in an attendee.
        </p>
        <div className="w-full h-max flex flex-col gap-4 border shadow-md rounded border-gray-100 sm:border-none sm:shadow-none p-4 sm:p-0">
          <div className="w-full h-max flex sm:flex-row flex-col gap-4 ">
            <div className="w-full sm:w-1/2 h-max flex flex-col gap-1 ">
              <p className="sm:text-xs text-lg font-medium text-[#323232]">
                Ticket Code{" "}
              </p>
              <input
                type="text"
                className="text-xs placeholder:text-[#323232] w-full h-11 rounded-md border border-gray-300 pl-2"
                placeholder="enter ticket code"
              />
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <p className="text-sm font-medium">Attendee Info</p>
            <div className="text-xs p-3 rounded border border-gray-300 shadow w-max h-max flex flex-col gap-2 relative">
              <p className="text-base font-medium">Cynthia Chidera Davies </p>
              <span className="text-[#737373] font-medium">09014184551</span>
              <p className="text-[#737373] font-medium">
                cynthiadymphna04@gmail.com
              </p>
              <p className="w-max h-max py-3 truncate text-[10px]">
                <span className="w-max h-max px-5 py-2 rounded-full bg-[#FFD00014] text-[#C18700] border border-[#EAD67B]">
                  Pending
                </span>
              </p>
            </div>
          </div>
          <button className="w-full sm:w-max h-max px-12 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium  flex gap-2 items-center justify-center ">
            Check In
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
