import React, { useEffect, useState } from "react";
// import people from "../../assets/people.jpg";
import { LiaLinkedin } from "react-icons/lia";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { PiMapPinAreaBold } from "react-icons/pi";
import { BiSolidCalendarHeart } from "react-icons/bi";
import { IoMdTime } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface Event {
  _id: string;
  title: string;
  coverImage: string;
  description: string;
  date: string;
  location: string;
}

const BASEURL = "https://scheditix-wqb3.onrender.com/api/v1";

const EventDetails: React.FC = () => {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const getEventById = async (id: string) => {
    try {
      setLoading(true);

      const response = await axios.get(`${BASEURL}/event/${id}`);

      if (response.data.status) {
        const eventData = response.data.data;

        setEvent(eventData);

        localStorage.setItem("selectedEvent", JSON.stringify(eventData));
      } else {
        setEvent(null);
      }
    } catch (error) {
      console.error("Error fetching event:", error);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getEventById(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin h-10 w-10 border-4 border-[#27187E] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Event not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex justify-center items-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-6">
            <div className="w-full h-64 sm:h-72 md:h-80 rounded-xl p-[5px] bg-gradient-to-r from-pink-500 via-purple-500 via-green-500 to-indigo-600">
              <div className="rounded-xl overflow-hidden w-full h-full">
                <img
                  src={event?.coverImage}
                  alt="Event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <button
              onClick={() => nav(`/ticket_checkout/${event._id}`)}
              className="w-full bg-[#27187E] hover:bg-[#301ca1] cursor-pointer text-white py-3 rounded-lg font-semibold transition"
            >
              Get a Ticket
            </button>

            <div className="flex flex-col text-black space-y-3">
              <h3 className="font-bold text-lg">Follow Us On Our Socials</h3>

              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <LiaLinkedin className="w-6 h-6 cursor-pointer hover:text-[#27187E] transition" />
                  <BsInstagram className="w-6 h-6 cursor-pointer hover:text-[#27187E] transition" />
                  <FaFacebook className="w-6 h-6 cursor-pointer hover:text-[#27187E] transition" />
                  <BsTwitter className="w-6 h-6 cursor-pointer hover:text-[#27187E] transition" />
                </div>

                <div className="flex flex-col items-center cursor-pointer hover:text-[#27187E] transition">
                  <CiShare2 size={26} />
                  <span className="text-sm">Share</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#27187E] font-bold">
                {event.title}
              </h1>

              <p className="mt-2 text-gray-600">
                Inspiring the next generation of tech talent
              </p>
            </div>

            <div className="space-y-4 text-base sm:text-lg">
              <div className="flex items-center gap-3">
                <PiMapPinAreaBold className="w-6 h-6" />
                <span>{event.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <BiSolidCalendarHeart className="w-6 h-6" />
                <span>{event.date}</span>
              </div>

              <div className="flex items-center gap-3">
                <IoMdTime className="w-6 h-6" />
                <span>10:00 AM WAT</span>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-lg sm:text-xl mb-2">
                About this event
              </h2>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
