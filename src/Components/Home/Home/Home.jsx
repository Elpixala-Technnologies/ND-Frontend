import Category from "../Category/Category";
import HomeAddBanner from "../HomeAddBanner/HomeAddBanner";
import HomeBestSeal from "../HomeBestSeal/HomeBestSeal";
import HomeAddCard from "../HomeAddCard/HomeAddCard";
import PlayWithWrite from "../PlayWithWrite/PlayWithWrite";
import AllInOneCategory from "../AllInOne/AllInOneCategory";
import HeroSection from "../HeroSection/HeroSection";
import BookComponent from "../../BookSalePage/BookSalePage";
import TestimonialSection from "../Testimonials/Testimonials";
import Faq from "../Faq/faq";

const Home = () => {
  return (
    <>
      {/* <HomeSlider /> */}
      <section className="container">
        <HeroSection />
        {/* ====== Home Slider ======= */}
        <Category />

        <div className="my-20">
          {/* <HomeBestSealSlider /> */}
          <h2 className=" top-5 left-5 text-3xl font-bold">NEW ARRIVAL</h2>
          <BookComponent />
        </div>
        <div>
          <h1 className="text-start mt-16 font-bold text-3xl">
            Our Best Sellers
          </h1>
          <HomeBestSeal />
        </div>
        <br />
        <HomeAddCard />
        <div className="my-4">
          <PlayWithWrite />
        </div>
        <br />
        <HomeAddBanner />
        <div className="my-4">
          <AllInOneCategory />
        </div>

        <div className="my-4">
          <TestimonialSection />
        </div>
        <div className="my-4 mb-20">
          <Faq />
        </div>
      </section>
    </>
  );
};

export default Home;
