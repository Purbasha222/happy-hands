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
    /* Antigravity: "Added full-page wrapper with min-h-screen, flex-col, and brand background color #FBF5EE" */
    <div className="min-h-screen bg-[#FBF5EE] flex flex-col">
      <Navbar />

      {/* Antigravity: "Added responsive main container with max-w-7xl, auto margins, and standard padding" */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Antigravity: "Styled header section with responsive flex layout, brand typography, subtitle, and bookings counter badge" */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3B2416] tracking-tight">
                My Bookings
              </h1>
              <p className="mt-1.5 text-sm sm:text-base text-[#5F4637]">
                Track and manage your upcoming, ongoing, and completed care
                bookings.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#F0E1DC] text-[#3B2416] px-4 py-2 rounded-full text-sm font-semibold self-start sm:self-center shadow-xs">
              <span>📅</span>
              <span>
                {booking.length} {booking.length === 1 ? "Booking" : "Bookings"}{" "}
                Total
              </span>
            </div>
          </div>
        </div>

        {/* Antigravity: "Styled error alert banner with matching peach background, border, and text styling" */}
        {error && (
          <div className="mb-6 p-4 text-sm text-[#C9704F] bg-[#F0E1DC] border border-[#E58B57]/30 rounded-2xl flex items-center gap-2">
            <span className="font-semibold">Notice:</span>
            <span>{error}</span>
          </div>
        )}

        {/* Antigravity: "Replaced raw flex container with responsive grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3) and added empty state fallback" */}
        {booking.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {booking.map((b) => (
              /* Antigravity: "Styled each booking item wrapper with max-w-md, mx-auto, and flex-col for proper card and button alignment" */
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
                {/* Antigravity: "Styled 'Leave a Review' button with brand terracotta background #E58B57, rounded-full pill shape, hover animation, and star icon" */}
                {canReview(b) && (
                  <button
                    type="button"
                    onClick={() => handleReviewClick(b)}
                    className="mt-3 w-full py-2.5 px-4 bg-[#E58B57] hover:bg-[#C9704F] text-white font-semibold text-sm rounded-full shadow-sm hover:shadow-md transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-100"
                  >
                    <span>★</span> Leave a Review
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Antigravity: "Added clean empty state UI card when no bookings exist" */
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EADBCE]/70 p-8 shadow-xs">
            <div className="text-4xl mb-3">📅</div>
            <h3 className="text-lg font-bold text-[#3B2416]">
              No Bookings Found
            </h3>
            <p className="text-sm text-[#5F4637] mt-1">
              You haven't made any bookings yet. Browse our caretakers to
              schedule care.
            </p>
          </div>
        )}

        {/*Review Modal */}
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
