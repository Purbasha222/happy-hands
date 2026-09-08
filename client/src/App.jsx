import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import CaretakerListing from "./pages/CaretakerListing";
import MyBookings from "./pages/MyBookings";
import CaretakerBookings from "./pages/CaretakerBookings";
import CaretakerOnboarding from "./pages/CaretakerOnboarding";
import CaretakerProfile from "./pages/CaretakerProfile";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/caretaker-onboarding"
        element={
          <ProtectedRoute>
            <CaretakerOnboarding />
          </ProtectedRoute>
        }
      />
      <Route
        path="/caretaker-profile/:id"
        element={
          <ProtectedRoute>
            <CaretakerProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/caretakers"
        element={
          <ProtectedRoute>
            <CaretakerListing />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings/my"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings/caretaker"
        element={
          <ProtectedRoute>
            <CaretakerBookings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
