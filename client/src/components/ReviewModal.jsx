import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#F2C265",
  grey: "#a9a9a9",
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
      className="fixed inset-0 bg-[#3A2E27]/40 flex items-center justify-center p-4 z-50"
      onClick={closeModal}
    >
      <div
        className="bg-[#FBF3E7] rounded-[20px] shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white text-[#3A2E27] flex items-center justify-center hover:bg-[#F3D9CE] transition"
        >
          ✕
        </button>

        <h2 className="font-['Quicksand'] font-bold text-xl text-[#2F5D5A] mb-1">
          Leave a review for {selectedBooking.caretakerId.userId.name}
        </h2>

        <p className="text-xs text-[#3A2E27]/60 mb-4">Leave a review</p>

        {error && (
          <p className="text-sm text-[#C9704F] bg-[#F0E1DC] rounded-lg px-3 py-2 mb-3">
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
            <p className="text-sm text-[#3A2E27]/70">
              ({formData.rating} Stars)
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <label className="block text-xs font-semibold text-[#2F5D5A] mb-1">
              Share your experience
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Leave a review about your experience"
              rows={3}
              className="w-full bg-white border border-[#3A2E27]/15 rounded-lg px-3 py-2 text-sm text-[#3A2E27] focus:outline-none focus:border-[#2F5D5A]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#2F5D5A] text-white font-semibold text-sm px-5 py-2 rounded-full hover:bg-[#254B48] transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
