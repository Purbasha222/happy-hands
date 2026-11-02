const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-bfrom-[#F2F7F3] via-[#FAF8F2] to-[#FBF9F4]">
      <div className="absolute left-1/2 top-0 h-[125] w-[125] -translate-x-1/2 rounded-full bg-[#D7E8DC] opacity-50 blur-3xl"></div>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-between gap-16 px-[7%] pb-24 pt-12 lg:flex-row">
        <div className="max-w-[155]">
          <div className="mb-7 inline-flex rounded-full border border-[#CDE0D2] bg-[#EAF2EC] px-5 py-3 shadow-xs">
            <p className="text-[13px] font-semibold tracking-[2px] text-[#2A5C43]">
              TRUSTED CARE • ANYTIME • ANYWHERE
            </p>
          </div>

          <h1 className="mb-7 text-5xl font-bold leading-[1.05] text-[#1E2B22] md:text-7xl">
            Warm care for
            <br />
            the ones you love.
          </h1>

          <p className="mb-10 max-w-[140] text-[20px] leading-[1.9] text-[#415146]">
            Book trusted caretakers for children, pets, and adult family members
            — all in one peaceful platform designed to make care feel human
            again.
          </p>

          <div className="flex flex-wrap gap-5">
            <button className="rounded-full bg-[#2A5C43] hover:bg-[#1F4532] px-9 py-4 text-[16px] font-semibold text-white shadow-xl transition hover:scale-105 cursor-pointer">
              Find a Caretaker
            </button>

            <button className="rounded-full border border-[#2A5C43]/30 bg-white px-9 py-4 text-[16px] font-semibold text-[#2A5C43] transition hover:bg-[#EAF2EC] shadow-sm hover:scale-105 cursor-pointer">
              Become a Caretaker
            </button>
          </div>

          <div className="mt-10 flex items-center gap-5">
            {/* AVATARS */}
            <div className="flex -space-x-3">
              <img
                src="https://i.pravatar.cc/100?img=1"
                className="h-12 w-12 rounded-full border-4 border-[#FBF9F4]"
              />

              <img
                src="https://i.pravatar.cc/100?img=2"
                className="h-12 w-12 rounded-full border-4 border-[#FBF9F4]"
              />

              <img
                src="https://i.pravatar.cc/100?img=3"
                className="h-12 w-12 rounded-full border-4 border-[#FBF9F4]"
              />

              <img
                src="https://i.pravatar.cc/100?img=4"
                className="h-12 w-12 rounded-full border-4 border-[#FBF9F4]"
              />
            </div>

            {/* TEXT */}
            <div>
              <p className="text-xl text-[#D99426]">★★★★★</p>

              <p className="text-[16px] text-[#415146] font-medium">
                4.9/5 from 1,200+ families
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* GLOW */}
          <div className="absolute inset-0 rounded-[50px] bg-[#D9E9DE] opacity-45 blur-3xl"></div>

          <img
            src="/home3.jpg"
            alt="care"
            className="relative z-10 h-[145] w-[155] rounded-[50px] object-fit scale-[0.92] shadow-2xl border border-[#DCE8DE]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
