import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "../../library/toast";

const TicketCheckout: React.FC = () => {
  const nav = useNavigate();
  const BASEURL = "https://scheditix-wqb3.onrender.com/api/v1";

  const [quantity, setQuantity] = useState<number>(1);

  const price = 0;
  const serviceCharge = 0;

  const subtotal = quantity * price;
  const total = subtotal + serviceCharge;

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // quantity: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const savedEvent = localStorage.getItem("selectedEvent");
  const parsedEvent = savedEvent ? JSON.parse(savedEvent) : null;

  const handleCheckout = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all fields");
      return;
    }

    if (!parsedEvent?._id) {
      toast.error("Event not found");
      return;
    }

    try {
      setIsSubmitting(true);

      // const payload = {
      //   eventId: parsedEvent._id,
      //   fullName: formData.name,
      //   email: formData.email,
      //   phone: formData.phone,
      //   quantity,
      // };

      const response = await axios.post(
        `${BASEURL}/attendee/${parsedEvent._id}`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }
      );

      if (response.data.status) {
        toast.success("Ticket generated successfully 🎉");

        localStorage.setItem(
          "generatedTicket",
          JSON.stringify(response.data.data)
        );

        setTimeout(() => {
          nav(`/event_ticket/${parsedEvent._id}`);
        }, 1500);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!parsedEvent) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Event not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6">Ticket Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm text-gray-500">Ticket Type</label>
              <div className="mt-2 bg-gray-100 rounded-lg p-4 flex justify-between">
                <span className="text-gray-600">
                  {parsedEvent.ticketType || "FREE"}
                </span>
                <span className="text-gray-600">₦0.00</span>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">Purchase Quantity</label>
              <div className="mt-2 border rounded-lg p-2 flex items-center justify-between">
                <span className="text-gray-500 text-sm">Select slots</span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={decrease}
                    className="px-2 text-lg cursor-pointer"
                    disabled={isSubmitting}
                  >
                    -
                  </button>

                  <span className="bg-gray-100 px-3 py-1 rounded">
                    {quantity}
                  </span>

                  <button
                    onClick={increase}
                    className="px-2 text-lg cursor-pointer"
                    disabled={isSubmitting}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="mt-2 w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="mt-2 w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                className="mt-2 w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isSubmitting}
            className={`mt-8 w-full text-white py-4 rounded-xl cursor-pointer font-medium transition flex justify-center items-center ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#27187E] hover:bg-[#301ca1]"
            }`}
          >
            {isSubmitting ? (
              <div className="animate-spin h-5 w-5  border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              "Checkout"
            )}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <img
            src={parsedEvent.coverImage}
            alt="Event"
            className="rounded-lg mb-6 w-full h-55 object-cover"
          />

          <div className="border-t pt-4">
            <p className="text-center text-sm text-gray-500 mb-4">
              Order Summary
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>{quantity} x FREE</span>
                <span>₦{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Service charge</span>
                <span>₦{serviceCharge.toFixed(2)}</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₦{total.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center mt-6">
              🔒 Payments are secured and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCheckout;
