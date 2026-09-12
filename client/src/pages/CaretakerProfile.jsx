import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import BookingModal from "../components/BookingModal";

const CaretakerProfile = () => {
  const loggedInUser = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [caretaker, setCaretaker] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const caretakerProfile = await api.get(`/caretakers/${id}`);
        setCaretaker(caretakerProfile.data.caretaker);
        const reviewCaretakerProfile = await api.get(
          `/reviews/caretaker/${id}`,
        );
        setReviews(reviewCaretakerProfile.data.review);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return <p className="px-[7%] py-10 text-[#5F4637]">Loading...</p>;
  if (error) return <p className="px-[7%] py-10 text-[#C9704F]">{error}</p>;
  if (!caretaker)
    return <p className="px-[7%] py-10 text-[#5F4637]">Caretaker not found.</p>;

  const isOwner = loggedInUser?._id === caretaker.userId?._id;
  return (
    <div className="px-[7%] py-10">
      {/* Header card */}
      <div className="flex items-center gap-6 rounded-2xl bg-white p-8 shadow-md">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E58B57] text-3xl font-bold text-white">
          {caretaker.userId?.name?.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#3B2416]">
            {caretaker.userId?.name}
          </h1>
          <p className="text-[#5F4637]">{caretaker.userId?.city}</p>
          <p className="mt-1 text-sm font-medium text-[#E58B57]">
            ⭐ {caretaker.rating || "No rating yet"} ({caretaker.totalReviews}{" "}
            reviews)
          </p>
        </div>
        <div className="ml-auto">
          {isOwner ? (
            <button
              onClick={() => navigate(`/caretaker-profile/${id}/edit`)}
              className="rounded-full border border-[#5F4637]/30 px-6 py-2.5 text-sm font-semibold text-[#5F4637] hover:border-[#C9704F] hover:text-[#C9704F]"
            >
              Edit Profile
            </button>
          ) : (
            <button
              disabled={!caretaker.isAvailable}
              onClick={() => setOpenModal(true)}
              className="rounded-full bg-[#E58B57] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-105 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {caretaker.isAvailable ? "Book Now" : "Not Available"}
            </button>
          )}
        </div>
      </div>

      {/* Details card */}
      <div className="mt-6 grid grid-cols-1 gap-6 rounded-2xl bg-white p-8 shadow-md md:grid-cols-2">
        <div>
          <h3 className="mb-2 font-semibold text-[#3B2416]">About</h3>
          <p className="text-[#5F4637]">
            {caretaker.bio || "No bio added yet."}
          </p>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-[#3B2416]">Experience</h3>
          <p className="text-[#5F4637]">{caretaker.experience} years</p>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-[#3B2416]">Care Types</h3>
          <div className="flex flex-wrap gap-2">
            {caretaker.careTypes.map((c) => (
              <span
                key={c}
                className="rounded-full bg-[#F0E1DC] px-3 py-1 text-xs text-[#5F4637]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-[#3B2416]">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {caretaker.skills.map((s) => (
              <span
                key={s}
                className="rounded-full bg-[#F0E1DC] px-3 py-1 text-xs text-[#5F4637]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-[#3B2416]">
            Available Shifts
          </h3>
          <div className="flex flex-wrap gap-2">
            {caretaker.availableShifts.map((s) => (
              <span
                key={s}
                className="rounded-full bg-[#F0E1DC] px-3 py-1 text-xs text-[#5F4637]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-[#3B2416]">Rates</h3>
          <p className="text-[#5F4637]">Daily: ₹{caretaker.dailyRate}</p>
          <p className="text-[#5F4637]">Urgent: ₹{caretaker.urgentRate}</p>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-6 rounded-2xl bg-white p-8 shadow-md">
        <h3 className="mb-4 font-semibold text-[#3B2416]">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-[#5F4637]">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r._id} className="border-b border-[#5F4637]/10 pb-4">
                <p className="font-medium text-[#3B2416]">{r.userId?.name}</p>
                <p className="text-sm text-[#E58B57]">⭐ {r.rating}</p>
                <p className="text-sm text-[#5F4637]">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <BookingModal
        selectedCaretaker={caretaker}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default CaretakerProfile;
