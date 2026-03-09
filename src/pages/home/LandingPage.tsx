import Header from "../dashboard/Header";
import people from "../../assets/people.jpg";
import vector from "../../assets/Vector (1).png";
import { LuTicket } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { GoCreditCard } from "react-icons/go";
import { AiOutlineGlobal } from "react-icons/ai";
import Footer from "../dashboard/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import EventCard from "../home/ExploreCard";
import { SlidersHorizontal } from "lucide-react";
// import 'swiper/css/bundle';
import {
  IoTicketOutline,
  IoCalendarOutline,
  IoListOutline,
  IoCardOutline,
} from "react-icons/io5";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";

interface EventType {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  coverImage: string;
  price: string;
}

const BASEURL = "https://scheditix-wqb3.onrender.com/api/v1";

// const events = [
//   {
//     image: people,
//     title: "AJEMA AWARDS: CONVERGENCE...",
//     date: "February 14th, 2026 • 11:00 AM WAT",
//     location: "Eko Hotel and Suites, Lagos, Nigeria",
//     price: "₦20,000",
//   },
//   {
//     image: people,
//     title: "AJEMA AWARDS: CONVERGENCE...",
//     date: "February 14th, 2026 • 11:00 AM WAT",
//     location: "Eko Hotel and Suites, Lagos, Nigeria",
//     price: "₦20,000",
//   },
//   {
//     image: people,
//     title: "AJEMA AWARDS: CONVERGENCE...",
//     date: "February 14th, 2026 • 11:00 AM WAT",
//     location: "Eko Hotel and Suites, Lagos, Nigeria",
//     price: "₦20,000",
//   },
//   {
//     image: people,
//     title: "ACYM: Ajegunle City Youth Marathon",
//     date: "October 24th, 2026 • 11:00 AM WAT",
//     location: "Maracana stadium, Lagos, Nigeria",
//     price: "₦3,000",
//   },
//   {
//     image: people,
//     title: "LLF 8th Edition: Festival of Love",
//     date: "October 24th, 2026 • 11:00 AM WAT",
//     location: "Sail Habour Resort, Badagry, Nigeria",
//     price: "₦270,000",
//   },
// ];

const LandingPage: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${BASEURL}/event`);
        setEvents(res.data.data);
        //   console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);
  return (
    <div className="w-full flex flex-col items-center bg-[#E9E7F4]">
      <Header />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[500px] lg:h-[600px] flex items-center justify-center text-center px-4">
        {/* Background Image */}
        <img
          src={people}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative text-white max-w-2xl flex flex-col items-center px-4">
          <p className="text-sm bg-white text-[#27187E] px-5 py-2 rounded-full flex items-center gap-2 mb-6">
            <LuTicket /> The next generation of ticketing
          </p>

          {/* <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Catch the Wave to your next favorite event
          </h1> */}

          {/* <h3 className="text-3xl md:text-6xl font-bold text-white font-serif itali leading-tight">
            Catch the{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white rounded-full -rotate-2 scale-110"></span>
              <span className="relative text-purple-700 font-semibold px-3">
                Wave
              </span>
            </span>{" "}
            to your next favorite{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-white rounded-full rotate-2 scale-110"></span>
              <span className="relative text-purple-700 font-semibold px-3">
                Event
              </span>
            </span>
          </h3> */}

          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight text-center">
            Catch the{" "}
            <span className="relative inline-block">
              <svg
                className="absolute -top-2 -left-3 w-[120%] h-[140%]"
                viewBox="0 0 200 60"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 30C10 10 50 5 100 10C150 15 190 10 190 30C190 50 150 55 100 50C50 45 10 50 10 30Z" />
              </svg>

              <span className="relative text-[#3B2AA8] font-semibold px-2">
                Wave
              </span>
            </span>{" "}
            to your next
            <br />
            favorite{" "}
            <span className="relative inline-block">
              <svg
                className="absolute -top-2 -left-3 w-[120%] h-[140%]"
                viewBox="0 0 200 60"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 30C10 10 50 5 100 10C150 15 190 10 190 30C190 50 150 55 100 50C50 45 10 50 10 30Z" />
              </svg>

              <span className="relative text-[#3B2AA8] font-semibold px-2">
                event
              </span>
            </span>
          </h1>

          <p className="text-sm sm:text-base mb-6">
            Effortlessly create, manage, and book tickets for the most exciting
            events happening around you.
          </p>

          {/* SEARCH */}
          <div className="w-full max-w-xl flex bg-white rounded-full overflow-hidden">
            {/* Input */}
            <div className="flex items-center flex-1 px-3 py-2">
              <CiSearch className="text-gray-500 mr-2" size={18} />
              <input
                className="flex-1 text-black outline-none text-sm sm:text-base"
                placeholder="Search events (tech, comedy, concerts..)"
              />
            </div>

            <button className="bg-[#27187E] text-white px-4 sm:px-6 m-1.5 py-2 rounded-full text-sm sm:text-base">
              Sign Up
            </button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
            <p className="flex items-center gap-2">
              <LuTicket /> Fast Booking
            </p>

            <p className="flex items-center gap-2">
              <GoCreditCard /> Secure Payment
            </p>

            <p className="flex items-center gap-2">
              <AiOutlineGlobal /> Global Reach
            </p>
          </div>
        </div>
      </section>

      {/* EXPLORE EVENTS */}

      <section className="w-full py-20 bg-[#E9E7F4]">
        <div className="max-w-7xl mx-auto px-6">
          {/* TITLE */}

          <div className="flex flex-col items-center mb-10">
            <h1 className="text-3xl font-bold text-black">Explore Events</h1>
            <img src={vector} alt="vector" />
          </div>

          {/* FILTER TABS */}

          <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <button className="font-semibold text-black">
                Trending Events
              </button>

              <button>Events in Lagos</button>

              <button>Online Events</button>

              <button>Music Event</button>

              <button>Tech Event</button>
            </div>

            <div className="flex gap-3">
              <button className="border p-2 rounded-lg">
                <SlidersHorizontal size={18} />
              </button>

              <button className="bg-gray-200 px-4 py-2 rounded-lg text-sm">
                View All
              </button>
            </div>
          </div>

          {/* SWIPER CAROUSEL */}

          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-next",
              prevEl: ".swiper-prev",
            }}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {events.map((event) => (
              <SwiperSlide key={event._id}>
                <EventCard
                  title={event.title}
                  image={event.coverImage}
                  date={event.date}
                  location={event.location}
                  price={event.price}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* NAVIGATION BUTTONS */}

          <div className="flex justify-center gap-6 mt-8">
            <button className="swiper-prev text-4xl cursor-pointer">
              {"<"}
            </button>

            <button className="swiper-next text-4xl cursor-pointer">
              {">"}
            </button>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8 bg-white py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Card */}
          <div className="bg-[#E9E7F4] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="aspect-[16/9] p-4">
              <img
                src={people}
                alt="Concert crowd"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <div className="p-6 sm:p-8">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                Everything You Need to Create, Manage, and Attend Events
              </h1>

              <button className="bg-[#27187E] hover:bg-[#29149e] cursor-pointer text-white font-medium py-2.5 px-6 rounded-lg transition-colors">
                Create event
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-4">
            {/* Top Box */}
            <div className="bg-[#E9E7F4] p-6 rounded-xl">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4">
                <IoTicketOutline className="w-5 h-5 text-gray-700" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Simple Ticketing System
              </h3>

              <p className="text-sm text-gray-600">
                Simple Ticketing System with Seamless QR Check-in
              </p>
            </div>

            {/* Bottom Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#E9E7F4] rounded-xl p-6">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4">
                  <IoCalendarOutline className="w-5 h-5 text-gray-700" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Effortless Event Creation
                </h3>

                <p className="text-sm text-gray-600">
                  Effortless event creation and management for event organizers
                </p>
              </div>

              <div className="bg-[#E9E7F4] rounded-xl p-6">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4">
                  <IoListOutline className="w-5 h-5 text-gray-700" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Streamlined Event Listings
                </h3>

                <p className="text-sm text-gray-600">
                  Streamlined event listings for attendees / invitees
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIES */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-white to-gray-300">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Users Say About Us
          </h2>

          {/* Content */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left - Image */}
            <div className="w-full lg:w-1/2">
              <img
                src={people}
                alt="Happy couple making heart shapes with their hands"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>

            {/* Right - Testimonial */}
            <div className="w-full lg:w-1/2">
              <FaQuoteLeft className="w-8 h-8 text-gray-400 mb-4" />

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                Wave Pass made organizing our wedding so easy! From setting up
                the event to managing ticket sales, everything was
                straightforward and seamless. Our guests loved the easy ticket
                purchase process and the event details right at their
                fingertips!
              </p>

              <p className="text-sm text-gray-900 mb-6">
                <span className="font-semibold text-indigo-700">
                  Raphael & Chioma
                </span>
                , Wedding Organisers
              </p>

              <div className="flex items-center gap-4">
                {/* Avatar Stack */}
                <div className="flex -space-x-2">
                  <img
                    src={people}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src={people}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src={people}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                </div>

                <span className="text-sm font-medium text-gray-900">500+</span>

                <div className="flex gap-0.5">
                  <FaStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <FaStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <FaStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <FaStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <FaStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-12">
            <div className="w-2.5 h-2.5 rounded-full cursor-pointer bg-indigo-700"></div>
            <div className="w-2.5 h-2.5 rounded-full cursor-pointer bg-gray-300"></div>
            <div className="w-2.5 h-2.5 rounded-full cursor-pointer bg-gray-300"></div>
            <div className="w-2.5 h-2.5 rounded-full cursor-pointer bg-gray-300"></div>
            <div className="w-2.5 h-2.5 rounded-full cursor-pointer bg-gray-300"></div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-10">
            <h1 className="text-2xl font-bold text-black">
              Wave Pass Simple Pricing
            </h1>
            <img src={vector} alt="vector" />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Basic Plan */}
            <div className="flex-1 border border-gray-200 rounded-xl p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Basic Plan
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Perfect for small events or those just getting started.
              </p>

              <div className="inline-flex items-center gap-2 border border-[#27187E] rounded-full px-3 py-1 text-sm text-gray-700 mb-6">
                <IoTicketOutline className="w-4 h-4 text-[#27187E]" />
                Free Event
              </div>

              <ul className="space-y-3 text-sm text-gray-700">
                <li>• Event Creation: 1 event at a time</li>
                <li>• Unlimited events</li>
                <li>• Basic Event Listing</li>
                <li>• No fee on free events</li>
                <li>• Social Sharing tools</li>
                <li>• Check in analytics</li>
                <li>• Ticket Inventory management</li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="flex-1 border-2 border-[#27187E] bg-indigo-50/50 rounded-xl p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Pro Plan
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Perfect for small events or those just getting started.
              </p>

              <div className="inline-flex items-center gap-2 border border-[#27187E] rounded-full px-3 py-1 text-sm text-indigo-700 mb-6">
                <IoCardOutline className="w-4 h-4" />
                Paid Event
              </div>

              <ul className="space-y-3 text-sm text-gray-700">
                <li>• Event Creation: 1 event at a time</li>
                <li>• Ticket Sales: Unlimited events</li>
                <li>• Premium Event Listing</li>
                <li>• 4% + 100 per paid ticket</li>
                <li>• Social Sharing tools</li>
                <li>• Check in analytics</li>
                <li>• Secure Payment processing</li>
                <li>• Ticket Inventory management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-[#27187E] to-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Get Started Now and Bring Your Event to Life!
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base mb-8 leading-relaxed">
            Wave Pass is an intuitive platform designed to help event organizers
            effortlessly create, manage, and promote events. From weddings to
            concerts, our easy-to-use tools streamline event planning, ticket
            sales, and user engagement in one seamless experience.
          </p>
          <button className="bg-white text-indigo-900 cursor-pointer font-medium py-2.5 px-6 rounded-lg hover:bg-gray-100 transition-colors">
            Get started for free
          </button>
        </div>
      </section>
      {/* NEWSLETTER SECTION */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-[#E9E7F4]">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Stay in the Loop with Wave Pass Updates!
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Get the latest event planning tips, platform updates, exclusive
            offers, and more, straight to your inbox. Sign up for our newsletter
            and never miss out on exciting news and features.
          </p>

          <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              placeholder="enter your email address"
              className="flex-1 px-4 py-3 outline-none rounded-l-lg sm:rounded-r-none rounded-r-lg sm:rounded-l-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:none"
            />
            <button className="bg-[#27187E] cursor-pointer text-white font-medium px-6 py-3 rounded-r-lg sm:rounded-l-none rounded-l-lg sm:rounded-r-lg hover:[#27187E] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
