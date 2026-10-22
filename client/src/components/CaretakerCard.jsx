const CaretakerCard = ({
  name,
  availableShifts = [],
  careTypes = [],
  dailyRate,
  urgentRate,
  isAvailable,
  isVerified,
  experience,
  rating,
  totalReviews,
  skills = [],
  onBookClick,
  showProfileClick,
}) => {
  return (
    <div
      className="group relative bg-white border border-[#EADBCE]/80 hover:border-[#E58B57]/60 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4"
      onClick={showProfileClick}
    >
      {/* Top Right Availability Badge */}
      <div className="absolute top-5 right-5">
        {isAvailable ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Available Now
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-500 border border-stone-200">
            <span className="w-2 h-2 rounded-full bg-stone-400"></span>
            Not Available
          </span>
        )}
      </div>

      {/* Header Info: Avatar, Name, Verification, Ratings & Experience */}
      <div className="flex items-start gap-4 pr-32">
        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#E58B57] to-[#C9704F] text-white flex items-center justify-center font-bold text-2xl shadow-sm shrink-0">
          {name?.charAt(0)}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-bold text-[#3B2416] group-hover:text-[#E58B57] transition-colors leading-tight">
              {name}
            </h2>
            {isVerified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2F5D5A] bg-[#2F5D5A]/10 border border-[#2F5D5A]/20 px-2 py-0.5 rounded-full">
                ✓ Verified
              </span>
            )}
          </div>

          {/* Ratings & Experience */}
          <div className="flex items-center gap-2.5 mt-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-md">
              <span>★</span>
              <span>{rating || "New"}</span>
              <span className="text-[11px] font-normal text-[#5F4637]">
                ({totalReviews || 0})
              </span>
            </span>
            <span className="text-xs text-[#5F4637] font-medium">
              • {experience} {experience === 1 ? "year" : "years"} exp
            </span>
          </div>
        </div>
      </div>

      {/* Care Types */}
      {careTypes && careTypes.length > 0 && (
        <div className="space-y-1">
          <div className="flex flex-wrap gap-1.5">
            {careTypes.map((type) => (
              <span
                key={type}
                className="bg-[#F0E1DC] text-[#3B2416] text-xs font-medium px-2.5 py-0.5 rounded-full capitalize"
              >
                {type === "adult" && "🧑 "}
                {type === "child" && "👶 "}
                {type === "pet" && "🐾 "}
                {type} Care
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Shifts Section with Title */}
      <div className="space-y-1.5">
        <span className="text-xs font-semibold text-[#5F4637] uppercase tracking-wider block">
          Shifts:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {availableShifts && availableShifts.length > 0 ? (
            availableShifts.map((shift) => (
              <span
                key={shift}
                className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border border-[#2F5D5A]/30 bg-[#2F5D5A]/5 text-[#2F5D5A]"
              >
                {shift === "full-day" && "☀️"}
                {shift === "full-night" && "🌙"}
                {shift === "afternoon" && "🌤️"}
                {shift === "evening" && "🌆"}
                <span className="capitalize">{shift.replace("-", " ")}</span>
              </span>
            ))
          ) : (
            <span className="text-xs text-stone-400 italic">
              No shifts listed
            </span>
          )}
        </div>
      </div>

      {/* Skills Section with Title */}
      <div className="space-y-1.5">
        <span className="text-xs font-semibold text-[#5F4637] uppercase tracking-wider block">
          Skills:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {skills && skills.length > 0 ? (
            skills.map((skill) => (
              <span
                key={skill}
                className="bg-[#FAF2EB] text-[#3B2416] border border-[#EADBCE] text-xs font-medium px-2.5 py-1 rounded-lg"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-stone-400 italic">
              No skills listed
            </span>
          )}
        </div>
      </div>

      {/* Bottom Row: Pricing & Actions */}
      <div className="pt-4 border-t border-[#EADBCE]/80 flex items-center justify-between gap-2 flex-wrap">
        {/* Pricing */}
        <div className="flex items-center gap-4">
          <div>
            <span className="block text-[11px] text-[#5F4637] font-medium uppercase">
              Daily
            </span>
            <span className="font-bold text-base text-[#2F5D5A]">
              ₹{dailyRate}
              <small className="font-normal text-xs text-[#5F4637]">/day</small>
            </span>
          </div>

          <div className="h-7 w-px bg-[#EADBCE]"></div>

          <div>
            <span className="block text-[11px] text-[#5F4637] font-medium uppercase">
              Urgent
            </span>
            <span className="font-bold text-base text-[#C9704F]">
              ₹{urgentRate}
              <small className="font-normal text-xs text-[#5F4637]">
                /urgent
              </small>
            </span>
          </div>
        </div>

        {/* Buttons: Review and Book */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBookClick();
            }}
            className={
              isAvailable
                ? "px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#E58B57] hover:bg-[#C9704F] rounded-full shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer hover:scale-105 active:scale-100"
                : "px-5 py-2 text-xs sm:text-sm font-semibold text-gray-400 bg-gray-200 rounded-full cursor-not-allowed"
            }
            disabled={!isAvailable}
          >
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaretakerCard;
