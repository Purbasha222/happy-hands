import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#D99426",
  grey: "#D1CBBF",
};

const ReviewModal = ({
  selectedBooking,
  openReviewModal,
  setOpenReviewModal,
}) => {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
  });
  const [hoverValue, setHoverValue] = useState(undefined);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const stars = Array(5).fill(0);

  const handleClickStar = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const closeModal = () => {
    setFormData({ rating: 0, comment: "" });
    setHoverValue(undefined);
    setError("");
    setOpenReviewModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.rating) {
      setError("Please select a rating");
      return;
    }
    try {
      const reviewData = {
        ...formData,
        bookingId: selectedBooking._id,
        caretakerId: selectedBooking.caretakerId._id,
      };
      await api.post("/reviews", reviewData);
      setFormData({ rating: 0, comment: "" });
      closeModal();
      navigate(`/caretaker-profile/${selectedBooking.caretakerId._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  if (!openReviewModal || !selectedBooking) return null;

  return (
    <div
      className="fixed inset-0 bg-[#1E2B22]/45 backdrop-blur-[2px] flex items-center justify-center p-4 z-50"
      onClick={closeModal}
    >
      <div
        className="bg-[#FAF7F0] border border-[#EAE4D6] rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-[#EAF2EC] text-[#2A5C43] flex items-center justify-center hover:bg-[#D8E6DB] transition cursor-pointer"
        >
          ✕
        </button>

        <h2 className="font-['Quicksand'] font-bold text-xl text-[#2A5C43] mb-1">
          Leave a review for {selectedBooking.caretakerId.userId.name}
        </h2>

        <p className="text-xs text-[#637568] mb-4">Leave a review</p>

        {error && (
          <p className="text-sm text-rose-800 bg-rose-50 border border-rose-200/70 rounded-xl px-3 py-2 mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            {stars.map((_, index) => (
              <FaStar
                key={index}
                size={24}
                className="cursor-pointer"
                color={
                  (hoverValue || formData.rating) > index
                    ? colors.orange
                    : colors.grey
                }
                onClick={() => handleClickStar(index + 1)}
                onMouseOver={() => setHoverValue(index + 1)}
                onMouseLeave={() => setHoverValue(undefined)}
              />
            ))}
            <p className="text-sm text-[#415146] font-medium">
              ({formData.rating} Stars)
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <label className="block text-xs font-semibold text-[#2A5C43] mb-1">
              Share your experience
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Leave a review about your experience"
              rows={3}
              className="w-full bg-white border border-[#DCD6C8] rounded-xl px-3 py-2 text-sm text-[#1E2B22] focus:outline-none focus:ring-2 focus:ring-[#2A5C43] focus:border-transparent transition"
            />
          </div>
          <button
            type="submit"
            className="bg-[#2A5C43] hover:bg-[#1F4532] text-white font-semibold text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition cursor-pointer hover:scale-105 active:scale-100"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
