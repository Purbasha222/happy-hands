import { useEffect, useState } from "react";
import api from "../utils/api";
import CaretakerCard from "../components/CaretakerCard";

const CaretakerListing = () => {
  const [caretakers, setCaretakers] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/caretakers");
        setCaretakers(res.data.caretakers);
        console.log(res.data.caretakers);
      } catch (e) {
        setError(e.response?.data?.message || "Something went wrong");
      }
    })();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {error && <p>{error}</p>}
      <h1>Caretakers</h1>
      {caretakers.map((caretaker) => (
        <CaretakerCard
          key={caretaker._id}
          name={caretaker.userId.name}
          availableShifts={caretaker.availableShifts}
          careTypes={caretaker.careTypes}
          dailyRate={caretaker.dailyRate}
          urgentRate={caretaker.urgentRate}
          isAvailable={caretaker.isAvailable}
          isVerified={caretaker.isVerified}
          experience={caretaker.experience}
          rating={caretaker.rating}
          totalReviews={caretaker.totalReviews}
          skills={caretaker.skills}
        />
      ))}
    </div>
  );
};

export default CaretakerListing;
