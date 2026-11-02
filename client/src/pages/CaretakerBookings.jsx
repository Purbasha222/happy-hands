import { useEffect, useState } from "react";
import api from "../utils/api";
import CaretakerBookingCard from "../components/CaretakerBookingCard";
import Navbar from "../components/Navbar";

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
      await api.patch(`/bookings/${bookingId}/status`, {
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
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E2B22] tracking-tight">
                Booking Requests
              </h1>
              <p className="mt-1.5 text-sm sm:text-base text-[#415146]">
                Review, accept, or decline booking requests from families.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#EAF2EC] text-[#2A5C43] border border-[#D0E2D5] px-4 py-2 rounded-full text-sm font-semibold self-start sm:self-center shadow-xs">
              <span>📋</span>
              <span>
                {booking.length} {booking.length === 1 ? "Request" : "Requests"}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 text-sm text-rose-800 bg-rose-50 border border-rose-200/70 rounded-2xl flex items-center gap-2">
            <span className="font-semibold">Notice:</span>
            <span>{error}</span>
          </div>
        )}

        {booking.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {booking.map((b) => (
              <div key={b._id} className="w-full max-w-md mx-auto">
                <CaretakerBookingCard
                  customerName={b.userId.name}
                  careType={b.careType}
                  bookingType={b.bookingType}
                  shift={b.shift}
                  startDate={b.startDate}
                  endDate={b.endDate}
                  startTime={b.startTime}
                  endTime={b.endTime}
                  address={b.address}
                  city={b.city}
                  status={b.status}
                  totalAmount={b.totalAmount}
                  specialInstructions={b.specialInstructions}
                  onStatusChange={(newStatus) =>
                    handleBookingStatus(b._id, newStatus)
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#FAF7F0] rounded-3xl border border-[#EAE4D6] p-8 shadow-xs">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-lg font-bold text-[#1E2B22]">
              No Requests Yet
            </h3>
            <p className="text-sm text-[#637568] mt-1">
              You do not have any pending booking requests at this time.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CaretakerBookings;
