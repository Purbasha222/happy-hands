import { useState } from "react";
import api from "../utils/api";

const shiftDefaults = {
  "full-day": { startTime: "09:00", endTime: "17:00" },
  "full-night": { startTime: "19:00", endTime: "07:00" },
  afternoon: { startTime: "12:00", endTime: "17:00" },
  evening: { startTime: "17:00", endTime: "21:00" },
};
const formatDateForInput = (date) => date.toISOString().split("T")[0];

const BookingModal = ({ selectedCaretaker, openModal, setOpenModal }) => {
  const [formData, setFormData] = useState({
    careType: "",
    bookingType: "",
    shift: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    address: "",
    city: "",
    specialInstructions: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "shift") {
      const today = new Date();
      const startDate = formatDateForInput(today);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const endDate =
        e.target.value === "full-night"
          ? formatDateForInput(tomorrow)
          : startDate;

      setFormData({
        ...formData,
        shift: e.target.value,
        startDate,
        endDate,
        startTime: shiftDefaults[e.target.value].startTime,
        endTime: shiftDefaults[e.target.value].endTime,
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const bookingData = { ...formData, caretakerId: selectedCaretaker._id };
      const res = await api.post("/bookings", bookingData);
      setOpenModal(false);
    } catch (e) {
      setError(e.response?.data?.message || "Something went wrong");
    }
  };

  if (!openModal) return null;

  return (
    <div
      className="fixed inset-0 bg-[#3A2E27]/40 flex items-center justify-center p-4 z-50"
      onClick={() => setOpenModal(false)}
    >
      <div
        className="bg-[#FBF3E7] rounded-[20px] shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white text-[#3A2E27] flex items-center justify-center hover:bg-[#F3D9CE] transition"
        >
          ✕
        </button>

        <h2 className="font-['Quicksand'] font-bold text-xl text-[#2F5D5A] mb-1">
          Booking with {selectedCaretaker.userId.name}
        </h2>
        <p className="text-xs text-[#3A2E27]/60 mb-4">
          Fill in the details below to request a booking.
        </p>
        {error && (
          <p className="text-sm text-[#C9704F] bg-[#F0E1DC] rounded-lg px-3 py-2 mb-3">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#2F5D5A] mb-1">
              Care Type
            </label>
            <select
              required
              name="careType"
              value={formData.careType}
              onChange={handleChange}
              className="w-full bg-white border border-[#3A2E27]/15 rounded-lg px-3 py-2 text-sm text-[#3A2E27] focus:outline-none focus:border-[#2F5D5A]"
            >
              <option value="">Select</option>
              <option value="child">Child</option>
              <option value="adult">Adult</option>
              <option value="pet">Pet</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2F5D5A] mb-1">
              Booking Type
            </label>
            <select
              required
              name="bookingType"
              value={formData.bookingType}
              onChange={handleChange}
              className="w-full bg-white border border-[#3A2E27]/15 rounded-lg px-3 py-2 text-sm text-[#3A2E27] focus:outline-none focus:border-[#2F5D5A]"
            >
              <option value="">Select</option>
              <option value="scheduled">Scheduled</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2F5D5A] mb-1">
              Shift
            </label>
            <select
              required
              name="shift"
              value={formData.shift}
              onChange={handleChange}
              className="w-full bg-white border border-[#3A2E27]/15 rounded-lg px-3 py-2 text-sm text-[#3A2E27] focus:outline-none focus:border-[#2F5D5A]"
            >
              <option value="">Select</option>
              <option value="full-day">Full day</option>
              <option value="full-night">Full night</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#2F5D5A] mb-1">
                Start Date
              </label>
              <input
                required
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full bg-white border border-[#3A2E27]/15 rounded-lg px-3 py-2 text-sm text-[#3A2E27] focus:outline-none focus:border-[#2F5D5A]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2F5D5A] mb-1">
                End Date
              </label>
              <input
                required
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full bg-white border border-[#3A2E27]/15 rounded-lg px-3 py-2 text-sm text-[#3A2E27] focus:outline-none focus:border-[#2F5D5A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#2F5D5A] mb-1">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                min={shiftDefaults[formData.shift]?.startTime}
                max={shiftDefaults[formData.shift]?.endTime}
                className="w-full bg-white border border-[#3A2E27]/15 rounded-lg px-3 py-2 text-sm text-[#3A2E27] focus:outline-none focus:border-[#2F5D5A]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2F5D5A] mb-1">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                min={shiftDefaults[formData.shift]?.startTime}
                max={shiftDefaults[formData.shift]?.endTime}
                className="w-full bg-white border border-[#3A2E27]/15 rounded-lg px-3 py-2 text-sm text-[#3A2E27] focus:outline-none focus:border-[#2F5D5A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2F5D5A] mb-1">
              Address
            </label>
            <input
              required
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street address"
              className="w-full bg-white border border-[#3A2E27]/15 rounded-lg px-3 py-2 text-sm text-[#3A2E27] focus:outline-none focus:border-[#2F5D5A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2F5D5A] mb-1">
              City
            </label>
            <input
              required
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full bg-white border border-[#3A2E27]/15 rounded-lg px-3 py-2 text-sm text-[#3A2E27] focus:outline-none focus:border-[#2F5D5A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2F5D5A] mb-1">
              Special Instructions
            </label>
            <textarea
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              placeholder="Anything the caretaker should know?"
              rows={3}
              className="w-full bg-white border border-[#3A2E27]/15 rounded-lg px-3 py-2 text-sm text-[#3A2E27] focus:outline-none focus:border-[#2F5D5A]"
            />
          </div>

          <div className="flex justify-between items-baseline pt-2 border-t border-dashed border-[#3A2E27]/15">
            <span className="text-xs text-[#3A2E27]/60">
              ₹
              {formData.bookingType === "urgent"
                ? selectedCaretaker.urgentRate
                : selectedCaretaker.dailyRate}
              /day
            </span>
            <button
              type="submit"
              className="bg-[#2F5D5A] text-white font-semibold text-sm px-5 py-2 rounded-full hover:bg-[#254B48] transition"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
