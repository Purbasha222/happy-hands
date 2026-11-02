import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import api from "../utils/api";
const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAvatarClick = async () => {
    try {
      const res = await api.get("/caretakers/profile");
      navigate(`/caretaker-profile/${res.data.caretaker._id}`);
    } catch (err) {
      err.response?.data?.message || "Something went wrong";
    }
  };

  return (
    <nav className="z-20 flex items-center justify-between px-[7%] py-7">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2A5C43] text-2xl text-white shadow-md">
          🤝
        </div>

        <h1 className="text-3xl font-bold text-[#1E2B22]">Happy Hands</h1>
      </div>

      <div className="flex items-center gap-8">
        <a
          href="/caretakers"
          className="text-[16px] font-medium text-[#415146] transition hover:text-[#2A5C43]"
        >
          Find Care
        </a>

        {isAuthenticated &&
          (user?.role === "caretaker" ? (
            <Link
              to="/bookings/caretaker"
              className="text-[16px] font-medium text-[#415146] transition hover:text-[#2A5C43]"
            >
              Booking requests
            </Link>
          ) : (
            <Link
              to="/bookings/my"
              className="text-[16px] font-medium text-[#415146] transition hover:text-[#2A5C43]"
            >
              My Bookings
            </Link>
          ))}
      </div>

      <div className="flex items-center gap-15">
        <Link
          to="/caretakers"
          className="rounded-full bg-[#2A5C43] hover:bg-[#1F4532] px-7 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition hover:scale-105"
        >
          Book Now
        </Link>
        {isAuthenticated ? (
          <>
            <button
              onClick={() => dispatch(logout())}
              className="rounded-full border border-[#2A5C43]/30 px-5 py-2 text-sm font-medium text-[#415146] transition hover:border-[#2A5C43] hover:text-[#2A5C43] hover:bg-[#EAF1EB]/50 cursor-pointer"
            >
              Logout
            </button>{" "}
            <div
              className="h-12 w-12 text-white rounded-full bg-[#2A5C43] hover:bg-[#1F4532] flex items-center justify-center font-bold text-lg cursor-pointer shadow-sm transition hover:scale-105"
              onClick={handleAvatarClick}
            >
              {user?.name?.charAt(0)}
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-[16px] font-medium text-[#415146] transition hover:text-[#2A5C43]"
            >
              Login
            </Link>{" "}
            <Link
              to="/signup"
              className="rounded-full bg-[#1E2B22] hover:bg-[#2A5C43] px-6 py-2.5 text-sm font-semibold text-[#FAF7F0] shadow-md transition hover:scale-105"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
