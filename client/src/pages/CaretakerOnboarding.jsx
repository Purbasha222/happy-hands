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
      if (err.response?.status === 409) {
        const profileRes = await api.get("/caretakers/profile");
        navigate(`/caretaker-profile/${profileRes.data.caretaker._id}`);
        return;
      }
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg border border-[#EAE4D6] p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Header */}
          <div className="text-center space-y-2 pb-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#EAF2EC] text-[#2A5C43] text-2xl shadow-inner mb-1">
              🤝
            </div>
            <h2 className="text-3xl font-bold text-[#1E2B22] tracking-tight">
              Caretaker Onboarding
            </h2>
            <p className="text-sm text-[#415146]">
              Complete your profile details to start receiving care requests
              matching your expertise.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 text-sm text-rose-800 bg-rose-50 border border-rose-200/70 rounded-xl flex items-center gap-2">
              <span className="font-semibold">Notice:</span>
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2.5">
            <div>
              <label className="block text-sm font-semibold text-[#1E2B22]">
                Care Types Provided
              </label>
              <span className="text-xs text-[#637568]">
                Select the categories of care you specialize in
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-[#EAE4D6] bg-[#FAF7F0] hover:border-[#2A5C43] hover:bg-white cursor-pointer transition-all has-checked:border-[#2A5C43] has-checked:bg-[#EAF2EC] has-checked:ring-1 has-checked:ring-[#2A5C43]">
                <input
                  type="checkbox"
                  name="careTypes"
                  value="adult"
                  onChange={(e) =>
                    handleCheckboxChange(
                      e.target.name,
                      e.target.value,
                      e.target.checked,
                    )
                  }
                  className="w-4 h-4 rounded accent-[#2A5C43] text-[#2A5C43] focus:ring-[#2A5C43] cursor-pointer"
                />
                <span className="text-sm font-medium text-[#1E2B22] flex items-center gap-2">
                  <span>👵</span> Adult
                </span>
              </label>
              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-[#EAE4D6] bg-[#FAF7F0] hover:border-[#2A5C43] hover:bg-white cursor-pointer transition-all has-checked:border-[#2A5C43] has-checked:bg-[#EAF2EC] has-checked:ring-1 has-checked:ring-[#2A5C43]">
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
                  className="w-4 h-4 rounded accent-[#2A5C43] text-[#2A5C43] focus:ring-[#2A5C43] cursor-pointer"
                />
                <span className="text-sm font-medium text-[#1E2B22] flex items-center gap-2">
                  <span>👶</span> Child
                </span>
              </label>
              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-[#EAE4D6] bg-[#FAF7F0] hover:border-[#2A5C43] hover:bg-white cursor-pointer transition-all has-checked:border-[#2A5C43] has-checked:bg-[#EAF2EC] has-checked:ring-1 has-checked:ring-[#2A5C43]">
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
                  className="w-4 h-4 rounded accent-[#2A5C43] text-[#2A5C43] focus:ring-[#2A5C43] cursor-pointer"
                />
                <span className="text-sm font-medium text-[#1E2B22] flex items-center gap-2">
                  <span>🐾</span> Pet
                </span>
              </label>
            </div>
          </div>

          {/* Available Shifts */}
          <div className="space-y-2.5">
            <div>
              <label className="block text-sm font-semibold text-[#1E2B22]">
                Available Shifts
              </label>
              <span className="text-xs text-[#637568]">
                Select your preferred working shifts
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#EAE4D6] bg-[#FAF7F0] hover:border-[#2A5C43] hover:bg-white cursor-pointer transition-all has-checked:border-[#2A5C43] has-checked:bg-[#EAF2EC] has-checked:ring-1 has-checked:ring-[#2A5C43]">
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
                  className="w-4 h-4 rounded accent-[#2A5C43] text-[#2A5C43] focus:ring-[#2A5C43] cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-medium text-[#1E2B22]">
                  ☀️ Full Day
                </span>
              </label>
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#EAE4D6] bg-[#FAF7F0] hover:border-[#2A5C43] hover:bg-white cursor-pointer transition-all has-checked:border-[#2A5C43] has-checked:bg-[#EAF2EC] has-checked:ring-1 has-checked:ring-[#2A5C43]">
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
                  className="w-4 h-4 rounded accent-[#2A5C43] text-[#2A5C43] focus:ring-[#2A5C43] cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-medium text-[#1E2B22]">
                  🌙 Full Night
                </span>
              </label>
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#EAE4D6] bg-[#FAF7F0] hover:border-[#2A5C43] hover:bg-white cursor-pointer transition-all has-checked:border-[#2A5C43] has-checked:bg-[#EAF2EC] has-checked:ring-1 has-checked:ring-[#2A5C43]">
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
                  className="w-4 h-4 rounded accent-[#2A5C43] text-[#2A5C43] focus:ring-[#2A5C43] cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-medium text-[#1E2B22]">
                  🌤️ Afternoon
                </span>
              </label>
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#EAE4D6] bg-[#FAF7F0] hover:border-[#2A5C43] hover:bg-white cursor-pointer transition-all has-checked:border-[#2A5C43] has-checked:bg-[#EAF2EC] has-checked:ring-1 has-checked:ring-[#2A5C43]">
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
                  className="w-4 h-4 rounded accent-[#2A5C43] text-[#2A5C43] focus:ring-[#2A5C43] cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-medium text-[#1E2B22]">
                  🌆 Evening
                </span>
              </label>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#1E2B22]">
              Skills
              <span className="text-xs font-normal text-[#637568] ml-2">
                (Separate skills with commas)
              </span>
            </label>
            <input
              type="text"
              name="skills"
              placeholder="e.g. CPR, First Aid, Mobility Assistance, Meal Prep"
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-[#EAE4D6] bg-[#FAF7F0] text-[#1E2B22] placeholder-[#8B9B8F] text-sm focus:outline-none focus:ring-2 focus:ring-[#2A5C43] focus:bg-white transition"
            />
          </div>

          {/* Rates (Daily & Urgent) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-[#1E2B22]">
                Daily Rate
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sm text-[#637568]">
                  ₹
                </span>
                <input
                  type="number"
                  name="dailyRate"
                  placeholder="e.g. 1000"
                  value={formData.dailyRate}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#EAE4D6] bg-[#FAF7F0] text-[#1E2B22] placeholder-[#8B9B8F] text-sm focus:outline-none focus:ring-2 focus:ring-[#2A5C43] focus:bg-white transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-[#1E2B22]">
                Urgent Rate
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sm text-[#637568]">
                  ₹
                </span>
                <input
                  type="number"
                  name="urgentRate"
                  placeholder="e.g. 1500"
                  value={formData.urgentRate}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#EAE4D6] bg-[#FAF7F0] text-[#1E2B22] placeholder-[#8B9B8F] text-sm focus:outline-none focus:ring-2 focus:ring-[#2A5C43] focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          {/* Experience and Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-[#1E2B22]">
                Experience (Years)
              </label>
              <input
                type="number"
                name="experience"
                placeholder="e.g. 3"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-[#EAE4D6] bg-[#FAF7F0] text-[#1E2B22] placeholder-[#8B9B8F] text-sm focus:outline-none focus:ring-2 focus:ring-[#2A5C43] focus:bg-white transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-[#1E2B22]">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="e.g. +91 98765 43210"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-[#EAE4D6] bg-[#FAF7F0] text-[#1E2B22] placeholder-[#8B9B8F] text-sm focus:outline-none focus:ring-2 focus:ring-[#2A5C43] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#1E2B22]">
              Bio
            </label>
            <textarea
              name="bio"
              rows={4}
              placeholder="Tell potential clients about your experience, caregiving philosophy, and strengths..."
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#EAE4D6] bg-[#FAF7F0] text-[#1E2B22] placeholder-[#8B9B8F] text-sm focus:outline-none focus:ring-2 focus:ring-[#2A5C43] focus:bg-white transition resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-6 rounded-full bg-[#2A5C43] hover:bg-[#1F4532] text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
          >
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CaretakerOnboarding;
