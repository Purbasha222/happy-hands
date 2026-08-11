import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FBF5EE]">
      <Navbar />
      <Hero />
      <Services />
    </div>
  );
};

export default Home;
