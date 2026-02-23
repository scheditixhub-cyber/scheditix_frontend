import React, { useEffect, useState } from "react";
import logo from "../../assets/LogoWrap.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PiMapPinAreaBold } from "react-icons/pi";
import { BiSolidCalendarHeart } from "react-icons/bi";
import { IoMdTime } from "react-icons/io";

const EventTicket: React.FC = () => {

  interface Ticket {
    _id: string;           
    title: string;
    coverImage: string;
    description: string;
    date: string;
    time: string;
    location: string;
    fullName: string;      
    email: string; 
    code: string;         
  }

  const BASEURL = "https://scheditix-wqb3.onrender.com/api/v1";

  const { id } = useParams<{ id: string }>();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  const getTicketById = async (eventId: string) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${BASEURL}/attendee/${eventId}`   
      );

      if (response.data.status) {
        setTicket(response.data.data);
      } else {
        setTicket(null);
      }
    } catch (error) {
      console.error("Error fetching ticket:", error);
      setTicket(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getTicketById(id);
    }
  }, [id]);

  console.log("Ticket ID from params:", id);
  console.log("Fetched ticket:", ticket);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin h-10 w-10 border-4 border-[#27187E] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Ticket not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex flex-col items-center justify-center p-4 overflow-x-hidden">

      <div className="flex items-center justify-between w-full max-w-6xl mx-auto mb-5 h-16 sm:h-20 px-4">
        <div className="w-24 sm:w-32 h-12 sm:h-14 bg-white rounded-2xl flex justify-center items-center p-2 shadow">
          <img src={logo} alt="Logo" className="object-contain h-full w-full" />
        </div>
      </div>

      <div className="w-full max-w-6xl rounded-3xl p-1.5 bg-gradient-to-r from-pink-500 via-blue-500 to-purple-600">
        <div className="relative w-full rounded-2xl bg-white shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">

            <div className="md:w-1/2 relative">
              <img
                src={ticket.coverImage}
                alt="Event"
                className="h-64 md:h-full w-full object-cover"
              />

              <div className="absolute bottom-4 left-4 text-white p-4 rounded-xl">
                <div>
                    <p className="text-gray-500">ATTENDEE</p>
                    <div className="w-2 h-2 rounded-full bg-white flex justify-center items-center">
                        <div className="w-1 h-1 rounded-full bg-green-400"></div>
                    </div>
                </div>
                <p className="font-semibold">Cynthia Chidera</p>  
                <p className="text-sm text-gray-300">
                  Cynthia12@gmail.com
                </p>
              </div>
            </div>

            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {ticket.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {ticket.description}
                </p>

                <div className="mt-6 space-y-4 text-gray-600 mt-10">
                  <div className="flex items-center gap-3">
                    <PiMapPinAreaBold className="w-6 h-6" />
                    <span>{ticket.location}</span>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex items-center gap-3">
                      <BiSolidCalendarHeart className="w-6 h-6" />
                      <span>{ticket.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <IoMdTime className="w-6 h-6" />
                      <span>{ticket.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm text-gray-400">Ticket ID</p>
                <p className="text-lg font-semibold text-indigo-700">
                  {ticket.code}   
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTicket;
