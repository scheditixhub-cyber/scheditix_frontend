import selectGif from "../../assets/selectGif.svg";

const CreateEvent = () => {
  // eslint-disable-next-line prefer-const
  let step = 2;
  return (
    <div className="w-full h-max flex flex-col gap-3">
      <div>
        <p className="text-lg font-medium text-[#323232]">Hello Coco</p>
        <p className="text-sm text-[#323232]">Start setting up your event</p>
      </div>
      {step === 1 ? (
        <>
          {" "}
          <div className="w-full h-max p-3 rounded flex flex-col gap-4 border-gray-300 border">
            <p className="font-medium">Event Details</p>
            <div className="w-full h-max flex flex-col gap-4">
              <div className="w-full h-max flex sm:flex-row flex-col gap-4 ">
                <div className="w-full sm:w-1/2 h-max flex flex-col gap-1 ">
                  <p className="text-xs text-[#323232]">Event Title</p>
                  <input
                    type="text"
                    className="text-xs placeholder:text-[#323232] w-full h-11 rounded-md border border-gray-300 pl-2"
                    placeholder="enter event title"
                  />
                </div>
                <div className="w-full sm:w-1/2 h-max flex flex-col gap-1 ">
                  <p className="text-xs text-[#323232]">Event Location</p>
                  <input
                    type="text"
                    className="text-xs placeholder:text-[#323232] w-full h-11 rounded-md border border-gray-300 pl-2"
                    placeholder="enter event location"
                  />
                </div>
              </div>
              <div className="w-full h-max flex sm:flex-row flex-col gap-4 ">
                <div className="w-full sm:w-1/2 h-max flex flex-col gap-1 ">
                  <p className="text-xs text-[#323232]">Event Date</p>
                  <input
                    type="date"
                    className="text-xs placeholder:text-[#323232] w-full h-11 rounded-md border border-gray-300 px-2"
                    placeholder="enter event date"
                  />
                </div>
                <div className="w-full sm:w-1/2 h-max flex flex-col gap-1 ">
                  <p className="text-xs text-[#323232]">Event Location</p>
                  <input
                    type="time"
                    className="text-xs placeholder:text-[#323232] w-full h-11 rounded-md border border-gray-300 px-2"
                    placeholder="enter event time"
                  />
                </div>
              </div>
              <div className="w-full h-max flex gap-4 ">
                <div className="w-full h-max flex flex-col gap-1 ">
                  <p className="text-xs text-[#323232]">Event Description</p>
                  <textarea
                    name=""
                    id=""
                    className="text-xs placeholder:text-[#323232] w-full h-32 rounded-md border border-gray-300 p-3"
                    placeholder="clearly and briefly describe your event"
                  ></textarea>
                </div>
              </div>
              <div className="w-full h-max flex gap-4 ">
                <div className="w-full h-max flex flex-col gap-1 ">
                  <p className="text-xs text-[#323232]">Event Description</p>
                  <div className="text-xs placeholder:text-[#323232] w-full h-max rounded-md border-dashed border-2 cursor-pointer flex items-center justify-center flex-col border-gray-300 p-3">
                    <img src={selectGif} alt="" />
                    <p>
                      Drag & drop image here <br />
                      OR
                    </p>
                    <span className="underline font-bold text-[#27187E]">
                      Upload Image
                    </span>
                  </div>
                  <p className="text-xs text-[#323232]">
                    Image size should be less than 5mb{" "}
                  </p>
                </div>
              </div>
              <button className="w-max h-max px-12 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium  flex gap-2 items-center justify-center ">
                Next
              </button>
            </div>
          </div>
        </>
      ) : step === 2 ? (
        <>
          {" "}
          <div className="w-full h-max p-3 rounded flex flex-col gap-4 border-gray-300 border">
            <p className="font-medium">Ticket Details</p>
            <div className="w-full h-max flex flex-col gap-4">
              <div className="w-full h-max flex sm:flex-row flex-col gap-4 ">
                <div className="w-full sm:w-1/2 h-max flex flex-col gap-1 ">
                  <p className="text-xs text-[#323232]">Ticket Type</p>
                  <select
                    name=""
                    id=""
                    className="text-xs placeholder:text-[#323232] w-full h-11 rounded-md border border-gray-300 pl-2"
                  >
                    <option value="">Free</option>
                    <option value="">Paid</option>
                  </select>
                </div>
                <div className="w-full sm:w-1/2 h-max flex flex-col gap-1 ">
                  <p className="text-xs text-[#323232]">
                    Ticket Quantity Location
                  </p>
                  <input
                    type="number"
                    className="text-xs placeholder:text-[#323232] w-full h-11 rounded-md border border-gray-300 pl-2"
                  />
                </div>
              </div>
              <div className="w-full h-max flex sm:flex-row flex-col gap-4 ">
                <div className="w-full sm:w-1/2 h-max flex flex-col gap-1 ">
                  <p className="text-xs text-[#323232]">
                    Ticket Purchase Quantity{" "}
                  </p>
                  <input
                    type="number"
                    className="text-xs placeholder:text-[#323232] w-full h-11 rounded-md border border-gray-300 pl-2"
                  />
                </div>
              </div>

              <button className="w-max h-max px-12 py-4 rounded-lg cursor-pointer bg-[#27187E] text-white text-sm font-medium  flex gap-2 items-center justify-center ">
                Complete
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CreateEvent;
