const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF4E7] to-[#FBF5EE]">
      {/* TOP BLUR */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#FFD7AE] opacity-40 blur-3xl"></div>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-between gap-16 px-[7%] pb-24 pt-12 lg:flex-row">
        {/* LEFT */}
        <div className="max-w-[620px]">
          {/* BADGE */}
          <div className="mb-7 inline-flex rounded-full border border-[#F3D5B8] bg-[#FFF1E3] px-5 py-3">
            <p className="text-[13px] font-semibold tracking-[2px] text-[#C97846]">
              TRUSTED CARE • ANYTIME • ANYWHERE
            </p>
          </div>

          {/* HEADING */}
          <h1 className="mb-7 text-5xl font-bold leading-[1.05] text-[#341D10] md:text-7xl">
            Warm care for
            <br />
            the ones you love.
          </h1>

          {/* DESCRIPTION */}
          <p className="mb-10 max-w-[560px] text-[20px] leading-[1.9] text-[#705C4E]">
            Book trusted caretakers for children, pets, and elderly family
            members — all in one peaceful platform designed to make care feel
            human again.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-5">
            <button className="rounded-full bg-[#E58B57] px-9 py-4 text-[16px] font-semibold text-white shadow-xl transition hover:scale-105">
              Find a Caretaker
            </button>

            <button className="rounded-full border border-[#DDB8A0] bg-white px-9 py-4 text-[16px] font-semibold text-[#7A5C49] transition hover:bg-[#FFF7F0]">
              Become a Caretaker
            </button>
          </div>

          {/* REVIEWS */}
          <div className="mt-10 flex items-center gap-5">
            {/* AVATARS */}
            <div className="flex -space-x-3">
              <img
                src="https://i.pravatar.cc/100?img=1"
                className="h-12 w-12 rounded-full border-4 border-[#FBF5EE]"
              />

              <img
                src="https://i.pravatar.cc/100?img=2"
                className="h-12 w-12 rounded-full border-4 border-[#FBF5EE]"
              />

              <img
                src="https://i.pravatar.cc/100?img=3"
                className="h-12 w-12 rounded-full border-4 border-[#FBF5EE]"
              />

              <img
                src="https://i.pravatar.cc/100?img=4"
                className="h-12 w-12 rounded-full border-4 border-[#FBF5EE]"
              />
            </div>

            {/* TEXT */}
            <div>
              <p className="text-xl text-[#F6B400]">★★★★★</p>

              <p className="text-[16px] text-[#705C4E]">
                4.9/5 from 1,200+ families
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          {/* GLOW */}
          <div className="absolute inset-0 rounded-[50px] bg-[#FFDDB8] opacity-40 blur-3xl"></div>

          <img
            src="/home3.jpg"
            alt="care"
            className="relative z-10 h-[580px] w-[620px] rounded-[50px] object-fit scale-[0.92] shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
