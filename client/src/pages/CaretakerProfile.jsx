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
    return <p className="px-[7%] py-10 text-[#415146]">Loading...</p>;
  if (error) return <p className="px-[7%] py-10 text-rose-700">{error}</p>;
  if (!caretaker)
    return <p className="px-[7%] py-10 text-[#415146]">Caretaker not found.</p>;

  const isOwner = loggedInUser?._id === caretaker.userId?._id;
  return (
    <div className="min-h-screen bg-[#FBF9F4] px-[7%] py-10">
      <div className="flex items-center gap-6 rounded-2xl bg-white border border-[#EAE4D6] p-8 shadow-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2A5C43] text-3xl font-bold text-white shadow-sm">
          {caretaker.userId?.name?.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1E2B22]">
            {caretaker.userId?.name}
          </h1>
          <p className="text-[#637568]">{caretaker.userId?.city}</p>
          <p className="mt-1 text-sm font-medium text-amber-700">
            ⭐ {caretaker.rating || "No rating yet"} ({caretaker.totalReviews}{" "}
            reviews)
          </p>
        </div>
        <div className="ml-auto">
          {isOwner ? (
            <button
              onClick={() => navigate(`/caretaker-profile/${id}/edit`)}
              className="rounded-full border border-[#2A5C43]/30 px-6 py-2.5 text-sm font-semibold text-[#2A5C43] hover:border-[#2A5C43] hover:bg-[#EAF2EC] transition cursor-pointer"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={() => setOpenModal(true)}
              className="rounded-full bg-[#2A5C43] hover:bg-[#1F4532] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-105 cursor-pointer disabled:cursor-not-allowed disabled:bg-stone-300 transition"
            >
              Book Now
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 rounded-2xl bg-white border border-[#EAE4D6] p-8 shadow-sm md:grid-cols-2">
        <div>
          <h3 className="mb-2 font-semibold text-[#1E2B22]">About</h3>
          <p className="text-[#415146]">
            {caretaker.bio || "No bio added yet."}
          </p>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-[#1E2B22]">Experience</h3>
          <p className="text-[#415146]">{caretaker.experience} years</p>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-[#1E2B22]">Care Types</h3>
          <div className="flex flex-wrap gap-2">
            {caretaker.careTypes.map((c) => (
              <span
                key={c}
                className="rounded-full bg-[#EAF2EC] text-[#2A5C43] border border-[#D0E2D5] px-3 py-1 text-xs capitalize"
              >
                {c === "elderly" ? "adult" : c}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-[#1E2B22]">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {caretaker.skills.map((s) => (
              <span
                key={s}
                className="rounded-full bg-[#F8F6F0] text-[#36453B] border border-[#E5DFD3] px-3 py-1 text-xs"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-[#1E2B22]">
            Available Shifts
          </h3>
          <div className="flex flex-wrap gap-2">
            {caretaker.availableShifts.map((s) => (
              <span
                key={s}
                className="rounded-full bg-[#F4F8F5] text-[#2A5C43] border border-[#2A5C43]/25 px-3 py-1 text-xs capitalize"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-[#1E2B22]">Rates</h3>
          <p className="text-[#415146]">
            Daily:{" "}
            <span className="font-semibold text-[#2A5C43]">
              ₹{caretaker.dailyRate}
            </span>
          </p>
          <p className="text-[#415146]">
            Urgent:{" "}
            <span className="font-semibold text-[#9B5135]">
              ₹{caretaker.urgentRate}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white border border-[#EAE4D6] p-8 shadow-sm">
        <h3 className="mb-4 font-semibold text-[#1E2B22]">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-[#637568]">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r._id} className="border-b border-[#EAE4D6] pb-4">
                <p className="font-medium text-[#1E2B22]">{r.userId?.name}</p>
                <p className="text-sm text-amber-700">⭐ {r.rating}</p>
                <p className="text-sm text-[#415146]">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <BookingModal
        selectedCaretaker={caretaker}
        openBookingModal={openModal}
        setOpenBookingModal={setOpenModal}
      />
    </div>
  );
};

export default CaretakerProfile;
