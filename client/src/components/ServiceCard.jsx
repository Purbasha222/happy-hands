const ServiceCard = ({ emoji, image, title, description }) => {
  return (
    <div className="rounded-[35px] border border-[#F1E1D5] bg-white p-7 shadow-sm transition hover:-translate-y-2">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF0E4] text-3xl">
        {emoji}
      </div>

      <img
        src={image}
        className="mb-6 h-[230px] w-full rounded-[28px] object-cover"
      />

      <h3 className="mb-4 text-3xl font-bold text-[#341D10]">{title}</h3>

      <p className="mb-6 text-[17px] leading-8 text-[#725C4C]">{description}</p>

      <button className="font-semibold text-[#E58B57]">Learn more →</button>
    </div>
  );
};

export default ServiceCard;
