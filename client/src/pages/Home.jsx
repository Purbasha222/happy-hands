// ANTIGRAVITY CHANGE: Updated to warm green and cream theme
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";

const Home = () => {
  return (
    /* ANTIGRAVITY CHANGE: Warm cream page background */
    <div className="min-h-screen overflow-x-hidden bg-[#FBF9F4]">
      <Navbar />
      <Hero />
      <Services />
    </div>
  );
};

export default Home;