import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import CategoryCards from "./CategoryCards";
import BestSellingProducts from "./BestSellingProducts";
import Sale from "./Sale";
import AllProducts from "./allProducts";
import NewArrival from "./NewArrival";
import ServiceFeatures from "./ServiceFeatures";
import MusicBanner from "./MusicBanner";
import Hero from "./Hero";
// import MyCarousel from "./MyCarousel";

function Home() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      <section className="container my-5">
        <Hero />
      </section>
      <Sale />
      <hr />
      <section className="my-5">
        <BestSellingProducts />
      </section>
      <hr />
      <section className="my-5">
        <CategoryCards />
      </section>
      <section className="my-5">
        <AllProducts />
      </section>
      <section className="my-5">
        <MusicBanner />
      </section>
      <section className="my-5">
        <NewArrival />
      </section>
      <section className="my-5">
        <ServiceFeatures />
      </section>
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          backgroundColor: "#000",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
        title="Back to top"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  );
}

export default Home;
