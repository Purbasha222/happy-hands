import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <nav className="z-20 flex items-center justify-between px-[7%] py-7">
      {/* LOGO */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E58B57] text-2xl text-white shadow-md">
          🤝
        </div>

        <h1 className="text-3xl font-bold text-[#3B2416]">Happy Hands</h1>
      </div>

      {/* NAV LINKS */}
      <div className="flex items-center gap-8">
        <a
          href="/caretakers"
          className="text-[16px] font-medium text-[#5F4637] transition hover:text-[#E58B57]"
        >
          Find Care
        </a>

        <a
          href="#"
          className="text-[16px] font-medium text-[#5F4637] transition hover:text-[#E58B57]"
        >
          Become a Caretaker
        </a>
      </div>

      {/* BUTTON */}
      <div className="flex items-center gap-15">
        <Link
          to="/caretakers"
          className="rounded-full bg-[#E58B57] px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
        >
          Book Now
        </Link>
        {isAuthenticated ? (
          <>
            <button
              onClick={() => dispatch(logout())}
              className="rounded-full border border-[#5F4637]/30 px-5 py-2 text-sm font-medium text-[#5F4637] transition hover:border-[#C9704F] hover:text-[#C9704F] cursor-pointer"
            >
              Logout
            </button>{" "}
            <div className="h-12 w-12 text-white rounded-full bg-amber-600 flex items-center justify-center">
              {user?.name?.charAt(0)}
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-[16px] font-medium text-[#5F4637] transition hover:text-[#E58B57]"
            >
              Login
            </Link>{" "}
            <Link
              to="/signup"
              className="rounded-full bg-[#3B2416] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:bg-[#2A1810]"
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
