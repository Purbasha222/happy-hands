import { useEffect, useState } from "react";
import api from "../utils/api";
import BookingCard from "../components/BookingCard";

const MyBookings = () => {
  const [booking, setBooking] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/bookings/my");
        setBooking(res.data.myBooking);
      } catch (e) {
        console.log(e);
        setError(e.response?.data?.message || "Something went wrong");
      }
    })();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {error && <p>{error}</p>}
      <h1>My Bookings</h1>
      {booking.map((booking) => (
        <BookingCard
          key={booking._id}
          caretakerName={booking.caretakerId.userId.name}
          careType={booking.careType}
          bookingType={booking.bookingType}
          shift={booking.shift}
          startDate={booking.startDate}
          endDate={booking.endDate}
          address={booking.address}
          city={booking.city}
          status={booking.status}
          totalAmount={booking.totalAmount}
          specialInstructions={booking.specialInstructions}
        />
      ))}
    </div>
  );
};
export default MyBookings;
