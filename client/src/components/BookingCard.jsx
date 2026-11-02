const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const BookingCard = ({
  caretakerName,
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
}) => {
  const statusStyles = {
    pending: "bg-amber-50 text-amber-800 border border-amber-200/70",
    confirmed: "bg-emerald-50 text-emerald-800 border border-emerald-200/70",
    completed: "bg-teal-50 text-teal-800 border border-teal-200/70",
    cancelled: "bg-rose-50 text-rose-800 border border-rose-200/70",
  };
  return (
    <div className="bg-[#FAF7F0] text-[#1E2B22] border border-[#EAE4D6] rounded-[20px] p-5 shadow-sm max-w-md w-full">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-[#637568] mb-0.5">Caretaker</p>
          <h2 className="font-['Quicksand'] font-bold text-xl text-[#2A5C43] m-0">
            {caretakerName}
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
        <span className="bg-[#EAF2EC] text-[#2A5C43] border border-[#D5E4D8] text-xs px-2.5 py-1 rounded-full capitalize">
          {careType}
        </span>
        <span className="bg-[#EAF2EC] text-[#2A5C43] border border-[#D5E4D8] text-xs px-2.5 py-1 rounded-full capitalize">
          {bookingType}
        </span>
        <span className="border border-[#2A5C43]/30 bg-[#F4F8F5] text-[#2A5C43] text-xs px-2.5 py-1 rounded-full capitalize">
          {shift?.replace("-", " ")}
        </span>
      </div>

      <div className="font-['IBM_Plex_Mono'] text-[13px] text-[#1E2B22] mb-3">
        <p className="m-0">
          {formatDate(startDate)} → {formatDate(endDate)}
        </p>
        <p className="m-0 text-[#415146]">
          {startTime} - {endTime}
        </p>
      </div>

      <div className="text-sm text-[#415146] mb-3">
        <p className="m-0">
          {address}, {city}
        </p>
      </div>

      {specialInstructions && (
        <p className="text-xs text-[#637568] italic mb-3">
          "{specialInstructions}"
        </p>
      )}

      <div className="flex justify-between items-center pt-3 border-t border-dashed border-[#DCD6C8]">
        <span className="text-xs text-[#637568]">Total</span>
        <span className="font-['IBM_Plex_Mono'] font-bold text-lg text-[#2A5C43]">
          ₹{totalAmount}
        </span>
      </div>
    </div>
  );
};

export default BookingCard;
