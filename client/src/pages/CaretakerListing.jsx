import { useEffect, useState } from "react";
import api from "../utils/api";
import CaretakerCard from "../components/CaretakerCard";
import BookingModal from "../components/BookingModal";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const CaretakerListing = () => {
  const [caretakers, setCaretakers] = useState([]);
  const [error, setError] = useState("");
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/caretakers");
        setCaretakers(res.data.caretakers);
      } catch (e) {
        setError(e.response?.data?.message || "Something went wrong");
      }
    })();
  }, []);

  const handleBookClick = (caretaker) => {
    setSelectedCaretaker(caretaker);
    setOpenBookingModal(true);
  };

  const handleProfileClick = (caretaker) => {
    navigate(`/caretaker-profile/${caretaker._id}`);
  };

  return (
    <div className="min-h-screen bg-[#FBF5EE] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Banner */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3B2416] tracking-tight">
                Find a Caretaker
              </h1>
              <p className="mt-1.5 text-sm sm:text-base text-[#5F4637]">
                Connect with qualified caretakers for adult, child, and pet care
                on your schedule.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#F0E1DC] text-[#3B2416] px-4 py-2 rounded-full text-sm font-semibold self-start sm:self-center shadow-xs">
              <span>👥</span>
              <span>
                {caretakers.length}{" "}
                {caretakers.length === 1 ? "Caretaker" : "Caretakers"} Found
              </span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 text-sm text-[#C9704F] bg-[#F0E1DC] border border-[#E58B57]/30 rounded-2xl flex items-center gap-2">
            <span className="font-semibold">Notice:</span>
            <span>{error}</span>
          </div>
        )}

        {/* Caretakers Grid */}
        {caretakers.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {caretakers.map((caretaker) => (
              <CaretakerCard
                key={caretaker._id}
                name={caretaker.userId?.name || "Caretaker"}
                availableShifts={caretaker.availableShifts}
                careTypes={caretaker.careTypes}
                dailyRate={caretaker.dailyRate}
                urgentRate={caretaker.urgentRate}
                isAvailable={caretaker.isAvailable}
                isVerified={caretaker.isVerified}
                experience={caretaker.experience}
                rating={caretaker.rating}
                totalReviews={caretaker.totalReviews}
                skills={caretaker.skills}
                onBookClick={() => handleBookClick(caretaker)}
                showProfileClick={() => handleProfileClick(caretaker)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EADBCE]/70 p-8 shadow-xs">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-[#3B2416]">
              No Caretakers Available
            </h3>
            <p className="text-sm text-[#5F4637] mt-1">
              Please check back later as new caretakers join Happy Hands
              regularly.
            </p>
          </div>
        )}

        {/* Booking Modal */}
        <BookingModal
          selectedCaretaker={selectedCaretaker}
          openBookingModal={openBookingModal}
          setOpenBookingModal={setOpenBookingModal}
        />
      </main>
    </div>
  );
};

export default CaretakerListing;
