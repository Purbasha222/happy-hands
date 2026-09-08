import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const CaretakerOnboarding = () => {
  const [formData, setFormData] = useState({
    skills: [],
    careTypes: [],
    availableShifts: [],
    dailyRate: "",
    urgentRate: "",
    experience: "",
    bio: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCheckboxChange = (field, value, checked) => {
    if (checked) {
      setFormData({ ...formData, [field]: [...formData[field], value] });
    } else {
      setFormData({
        ...formData,
        [field]: formData[field].filter((item) => item !== value),
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const skillsArray = formData.skills.split(",").map((s) => s.trim());
      const payload = { ...formData, skills: skillsArray };
      const res = await api.post("/caretakers/onboarding", payload);
      navigate(`/caretaker-profile/${res.data.caretaker._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      CaretakerOnboarding
      {error && (
        <p className="text-sm text-[#C9704F] bg-[#F0E1DC] rounded-lg px-3 py-2 mb-3">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            name="careTypes"
            value="elderly"
            onChange={(e) =>
              handleCheckboxChange(
                e.target.name,
                e.target.value,
                e.target.checked,
              )
            }
          />
          Elderly
        </label>
        <label>
          <input
            type="checkbox"
            name="careTypes"
            value="child"
            onChange={(e) =>
              handleCheckboxChange(
                e.target.name,
                e.target.value,
                e.target.checked,
              )
            }
          />
          Child
        </label>
        <label>
          <input
            type="checkbox"
            name="careTypes"
            value="pet"
            onChange={(e) =>
              handleCheckboxChange(
                e.target.name,
                e.target.value,
                e.target.checked,
              )
            }
          />
          Pet
        </label>
        <label>
          <input
            type="checkbox"
            name="availableShifts"
            value="full-day"
            onChange={(e) =>
              handleCheckboxChange(
                e.target.name,
                e.target.value,
                e.target.checked,
              )
            }
          />
          Full Day
        </label>
        <label>
          <input
            type="checkbox"
            name="availableShifts"
            value="full-night"
            onChange={(e) =>
              handleCheckboxChange(
                e.target.name,
                e.target.value,
                e.target.checked,
              )
            }
          />
          Full Night
        </label>
        <label>
          <input
            type="checkbox"
            name="availableShifts"
            value="afternoon"
            onChange={(e) =>
              handleCheckboxChange(
                e.target.name,
                e.target.value,
                e.target.checked,
              )
            }
          />
          Afternoon
        </label>
        <label>
          <input
            type="checkbox"
            name="availableShifts"
            value="evening"
            onChange={(e) =>
              handleCheckboxChange(
                e.target.name,
                e.target.value,
                e.target.checked,
              )
            }
          />
          Evening
        </label>
        <label>
          Skills
          <input type="text" name="skills" onChange={handleChange} />
        </label>
        <label>Daily Rate</label>
        <input
          type="number"
          name="dailyRate"
          value={formData.dailyRate}
          onChange={handleChange}
        />
        <label>Urgent Rate</label>
        <input
          type="number"
          name="urgentRate"
          value={formData.urgentRate}
          onChange={handleChange}
        />
        <label>Experience</label>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        />
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <label>Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CaretakerOnboarding;
