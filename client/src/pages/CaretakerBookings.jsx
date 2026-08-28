import { useEffect, useState } from "react";
import api from "../utils/api";
import CaretakerBookingCard from "../components/CaretakerBookingCard";

const CaretakerBookings = () => {
  const [booking, setBooking] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/bookings/caretaker");
        setBooking(res.data.caretakerBooking);
      } catch (e) {
        setError(e.response?.data?.message || "Something went wrong");
      }
    })();
  }, []);

  const handleBookingStatus = async (bookingId, newStatus) => {
    try {
      const res = await api.patch(`/bookings/${bookingId}/status`, {
        status: newStatus,
      });
      setBooking((prev) =>
        prev.map((item) =>
          item._id === bookingId ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (e) {
      setError(e.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {error && <p>{error}</p>}
      <h1>My Bookings</h1>
      {booking.map((booking) => (
        <CaretakerBookingCard
          key={booking._id}
          customerName={booking.userId.name}
          careType={booking.careType}
          bookingType={booking.bookingType}
          shift={booking.shift}
          startDate={booking.startDate}
          endDate={booking.endDate}
          startTime={booking.startTime}
          endTime={booking.endTime}
          address={booking.address}
          city={booking.city}
          status={booking.status}
          totalAmount={booking.totalAmount}
          specialInstructions={booking.specialInstructions}
          onStatusChange={(newStatus) =>
            handleBookingStatus(booking._id, newStatus)
          }
        />
      ))}
    </div>
  );
};

export default CaretakerBookings;
