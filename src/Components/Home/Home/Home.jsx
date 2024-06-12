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
import HeroSectionFinal from "../HeroSection2/HeroSectionFinal";

const Home = () => {
  return (
    <>
      {/* <HomeSlider /> */}
      <section className="">
        <HeroSection />
        <HeroSectionFinal />
        <section className="max-w-[1200px] sm:mx-auto mx-4">
          <Category />
        </section>

        {/* <div className="my-20 max-w-[1200px] mx-auto">
       
          <h2 className=" top-5 left-5 text-3xl font-bold">NEW ARRIVAL</h2>
          <BookComponent />
        </div> */}
        <div className="max-w-[1200px] mx-auto ">
          <h1 className="text-start mt-16 font-bold text-3xl sm:mx-0 mx-4">
            Our Best Sellers
          </h1>
          <HomeBestSeal />
        </div>
        <br />
        <section className="max-w-[1200px] mx-auto">   <HomeAddCard /></section>
       
        <div className="my-4 max-w-[1200px] mx-auto">
          <PlayWithWrite />
        </div>
        <br />
        <HomeAddBanner />
        <div className="my-4 max-w-[1200px] mx-auto">
          <AllInOneCategory />
        </div>

        <div className="my-4 max-w-[1200px] mx-auto">
          <TestimonialSection />
        </div>
        <div className="my-4 mb-20 max-w-[1200px] mx-auto">
          <Faq />
        </div>
      </section>
    </>
  );
};

export default Home;
