const CaretakerCard = ({
  name,
  availableShifts,
  careTypes,
  dailyRate,
  urgentRate,
  isAvailable,
  isVerified,
  experience,
  rating,
  totalReviews,
  skills,
  onBookClick,
}) => {
  return (
    <div className="relative min-w-xl bg-[#FBF3E7] text-[#3A2E27] rounded-[18px] p-5 shadow-xl font-['Inter'] overflow-hidden">
      {isVerified && (
        <span className="absolute top-3.5 -right-8 bg-[#2F5D5A] text-white text-[11px] font-semibold tracking-wide uppercase px-9 py-1 rotate-45">
          Verified
        </span>
      )}
      <div className="flex items-center gap-3 mb-2.5">
        <div className="h-12 w-12 text-white rounded-full bg-amber-600 flex items-center justify-center">
          {name?.charAt(0)}
        </div>
        <h2 className="font-['Quicksand'] font-bold text-2xl text-[#2F5D5A] m-0">
          {name}
        </h2>
      </div>
      <div className="flex flex-col gap-1 mb-2.5">
        <span
          className={`text-xs font-semibold w-fit px-2.5 py-0.5 rounded-full ${
            isAvailable
              ? "bg-[#DCEDE0] text-[#2E6B3E]"
              : "bg-[#F0E1DC] text-[#C9704F]"
          }`}
        >
          {isAvailable ? "Available now" : "Not available"}
        </span>
      </div>

      <div className="flex gap-3.5 font-['IBM_Plex_Mono'] text-[13px] mb-3">
        <span className="text-[#E8A33D] font-semibold">
          ★ {rating}{" "}
          <small className="text-[#3A2E27] opacity-60">({totalReviews})</small>
        </span>
        <span>{experience} yrs experience</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-2.5">
        {careTypes.map((type) => (
          <span
            key={type}
            className="bg-[#F3D9CE] text-[#3A2E27] text-xs px-2.5 py-1 rounded-full"
          >
            {type}
          </span>
        ))}
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-[#F3D9CE] text-[#3A2E27] text-xs px-2.5 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-1">
        {availableShifts.map((shift) => (
          <span
            key={shift}
            className="border border-[#2F5D5A] text-[#2F5D5A] text-[11px] px-2.5 py-0.5 rounded-full"
          >
            {shift}
          </span>
        ))}
      </div>

      <div className="flex justify-evenly items-center border-t border-dashed border-[#3A2E27]/15 font-['IBM_Plex_Mono']">
        <span className="font-bold text-base text-[#2F5D5A]">
          ₹{dailyRate}
          <small className="font-normal text-[11px] opacity-60">/day</small>
        </span>
        <span className="font-bold text-base text-[#C9704F]">
          ₹{urgentRate}
          <small className="font-normal text-[11px] opacity-60">/urgent</small>
        </span>

        <button
          onClick={onBookClick}
          className={
            isAvailable
              ? "rounded-full bg-[#2F5D5A] text-white p-2 mt-2 cursor-pointer"
              : "rounded-full p-2 mt-2 bg-gray-300 text-gray-500 cursor-not-allowed"
          }
          disabled={!isAvailable}
        >
          Book now
        </button>
      </div>
    </div>
  );
};

export default CaretakerCard;
