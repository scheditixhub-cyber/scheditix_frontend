import { Calendar, MapPin } from "lucide-react"
import { IoShareOutline } from "react-icons/io5";


interface EventCardProps {
  image: string
  title: string
  date: string
  location: string
  price: string
}

const EventCard = ({ image, title, date, location, price }: EventCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-3 w-[300px]">

      {/* Image */}
      <div className="relative">
        <img
          src={image}
          className="w-full h-[180px] object-cover rounded-lg"
        />

        <button className="absolute bottom-3 right-3 cursor-pointer bg-white p-2 rounded-full shadow">
          <IoShareOutline size={16} />
        </button>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-2">

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar size={14} />
          {date}
        </div>

        <h3 className="font-semibold text-sm leading-snug">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <MapPin size={14} />
          {location}
        </div>

        <div className="flex justify-between items-center pt-2">

          <span className="text-[#27187E] font-semibold">
            {price}
          </span>

          <button className="bg-[#27187E] text-white text-sm px-4 py-2 cursor-pointer rounded-lg">
            Get Ticket
          </button>

        </div>

      </div>
    </div>
  )
}

export default EventCard