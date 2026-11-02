const ServiceCard = ({ emoji, image, title, description }) => {
  return (
    <div className="rounded-[35px] border border-[#E3ECE5] bg-white p-7 shadow-sm hover:shadow-md transition hover:-translate-y-2">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF2EC] text-3xl">
        {emoji}
      </div>

      <img
        src={image}
        className="mb-6 h-[57.5] w-full rounded-[28px] object-cover"
      />

      <h3 className="mb-4 text-3xl font-bold text-[#1E2B22]">{title}</h3>

      <p className="mb-6 text-[17px] leading-8 text-[#415146]">{description}</p>

      <button className="font-semibold text-[#2A5C43] hover:text-[#1F4532] cursor-pointer transition">
        Learn more →
      </button>
    </div>
  );
};

export default ServiceCard;
