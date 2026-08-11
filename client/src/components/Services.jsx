import ServiceCard from "./ServiceCard";

const Services = () => {
  return (
    <section className="rounded-t-[50px] bg-[#FFFDFB] px-[7%] py-24">
      {/* TITLE */}
      <div className="mb-20 text-center">
        <p className="mb-4 text-[14px] font-semibold tracking-[3px] text-[#D98557]">
          WHAT WE OFFER
        </p>

        <h2 className="text-5xl font-bold text-[#341D10]">
          Care for every family.
        </h2>
      </div>

      {/* GRID */}
      <div className="grid gap-8 lg:grid-cols-3">
        <ServiceCard
          emoji="👶"
          image="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop"
          title="Child Care"
          description="Safe, loving babysitters and caretakers for your little ones while you work, travel, or rest peacefully."
        />

        <ServiceCard
          emoji="🐶"
          image="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop"
          title="Pet Care"
          description="Caring pet sitters, walkers, and home visits for your furry companions whenever you need support."
        />

        <ServiceCard
          emoji="👵"
          image="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop"
          title="Elderly Care"
          description="Compassionate caregivers offering companionship, daily assistance, and emotional support for seniors."
        />
      </div>
    </section>
  );
};

export default Services;
