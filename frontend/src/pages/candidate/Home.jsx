import Navbar from "../../components/common/Navbar";
import Hero from "../../components/common/Hero";
import Features from "../../components/common/Features";
import About from "../../components/common/About";
import Footer from "../../components/common/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Footer />
    </>
  );
}

export default Home;