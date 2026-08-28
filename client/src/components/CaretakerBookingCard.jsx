const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const CaretakerBookingCard = ({
  customerName,
  careType,
  bookingType,
  shift,
  startDate,
  endDate,
  startTime,
  endTime,
  address,
  city,
  status,
  totalAmount,
  specialInstructions,
  onStatusChange,
}) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
    "auto-cancelled": "bg-gray-100 text-gray-600",
  };
  return (
    <div className="bg-[#FBF3E7] text-[#3A2E27] rounded-[18px] p-5 shadow-[0_6px_20px_rgba(58,46,39,0.08)] max-w-md w-full">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-[#3A2E27]/60 mb-0.5">Customer</p>
          <h2 className="font-['Quicksand'] font-bold text-xl text-[#2F5D5A] m-0">
            {customerName}
          </h2>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
            statusStyles[status]
          }`}
        >
          {status}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="bg-[#F3D9CE] text-[#3A2E27] text-xs px-2.5 py-1 rounded-full capitalize">
          {careType}
        </span>
        <span className="bg-[#F3D9CE] text-[#3A2E27] text-xs px-2.5 py-1 rounded-full capitalize">
          {bookingType}
        </span>
        <span className="border border-[#2F5D5A] text-[#2F5D5A] text-xs px-2.5 py-1 rounded-full capitalize">
          {shift?.replace("-", " ")}
        </span>
      </div>

      <div className="font-['IBM_Plex_Mono'] text-[13px] text-[#3A2E27] mb-3">
        <p className="m-0">
          {formatDate(startDate)} → {formatDate(endDate)}
        </p>
        <p className="m-0">
          {startTime} - {endTime}
        </p>
      </div>

      <div className="text-sm text-[#3A2E27]/80 mb-3">
        <p className="m-0">
          {address}, {city}
        </p>
      </div>

      {specialInstructions && (
        <p className="text-xs text-[#3A2E27]/60 italic mb-3">
          "{specialInstructions}"
        </p>
      )}

      <div className="flex justify-between items-center pt-3 border-t border-dashed border-[#3A2E27]/15">
        <span className="text-xs text-[#3A2E27]/60">Total</span>
        <span className="font-['IBM_Plex_Mono'] font-bold text-lg text-[#2F5D5A]">
          ₹{totalAmount}
        </span>
      </div>
      {status === "pending" && (
        <div className="flex justify-around items-center mt-4">
          <button
            onClick={() => onStatusChange("confirmed")}
            className="p-2 rounded-xl border border-[#2F5D5A] text-[#2F5D5A] text-xl"
          >
            <span>✅</span>Accept
          </button>
          <button
            onClick={() => onStatusChange("cancelled")}
            className="p-2 rounded-xl border border-[#3A2E27] text-[#3A2E27] text-xl"
          >
            <span>❌</span>Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default CaretakerBookingCard;
