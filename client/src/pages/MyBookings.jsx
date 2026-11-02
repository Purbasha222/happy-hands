import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";
import BookingCard from "../components/BookingCard";
import ReviewModal from "../components/ReviewModal";
import Navbar from "../components/Navbar";

const MyBookings = () => {
  const [booking, setBooking] = useState([]);
  const [error, setError] = useState("");
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
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

  const sevenDaysAgo = useMemo(
    () => new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    [],
  );

  const canReview = (booking) => {
    return (
      booking.status === "completed" ||
      (booking.status === "confirmed" &&
        new Date(booking.startDate) <= sevenDaysAgo)
    );
  };

  const handleReviewClick = (booking) => {
    setSelectedBooking(booking);
    setOpenReviewModal(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E2B22] tracking-tight">
                My Bookings
              </h1>
              <p className="mt-1.5 text-sm sm:text-base text-[#415146]">
                Track and manage your upcoming, ongoing, and completed care
                bookings.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#EAF2EC] text-[#2A5C43] border border-[#D0E2D5] px-4 py-2 rounded-full text-sm font-semibold self-start sm:self-center shadow-xs">
              <span>📅</span>
              <span>
                {booking.length} {booking.length === 1 ? "Booking" : "Bookings"}{" "}
                Total
              </span>
            </div>
          </div>
        </div>

        {/* Error alert banner */}
        {error && (
          <div className="mb-6 p-4 text-sm text-rose-800 bg-rose-50 border border-rose-200/70 rounded-2xl flex items-center gap-2">
            <span className="font-semibold">Notice:</span>
            <span>{error}</span>
          </div>
        )}

        {booking.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {booking.map((b) => (
              <div
                key={b._id}
                className="w-full max-w-md mx-auto flex flex-col h-full justify-between"
              >
                <BookingCard
                  caretakerName={b.caretakerId.userId.name}
                  careType={b.careType}
                  bookingType={b.bookingType}
                  shift={b.shift}
                  startDate={b.startDate}
                  startTime={b.startTime}
                  endTime={b.endTime}
                  endDate={b.endDate}
                  address={b.address}
                  city={b.city}
                  status={b.status}
                  totalAmount={b.totalAmount}
                  specialInstructions={b.specialInstructions}
                />

                {canReview(b) && (
                  <button
                    type="button"
                    onClick={() => handleReviewClick(b)}
                    className="mt-3 w-full py-2.5 px-4 bg-[#2A5C43] hover:bg-[#1F4532] text-white font-semibold text-sm rounded-full shadow-sm hover:shadow-md transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-100"
                  >
                    <span>★</span> Leave a Review
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#FAF7F0] rounded-3xl border border-[#EAE4D6] p-8 shadow-xs">
            <div className="text-4xl mb-3">📅</div>
            <h3 className="text-lg font-bold text-[#1E2B22]">
              No Bookings Found
            </h3>
            <p className="text-sm text-[#637568] mt-1">
              You haven't made any bookings yet. Browse our caretakers to
              schedule care.
            </p>
          </div>
        )}

        {/* Review Modal */}
        <ReviewModal
          selectedBooking={selectedBooking}
          openReviewModal={openReviewModal}
          setOpenReviewModal={setOpenReviewModal}
        />
      </main>
    </div>
  );
};
export default MyBookings;
