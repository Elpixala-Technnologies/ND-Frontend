import Image from "next/image";
import Category from "../Category/Category";
import HomeAddBanner from "../HomeAddBanner/HomeAddBanner";
import HomeBestSeal from "../HomeBestSeal/HomeBestSeal";
import HomeBestSealSlider from "../HomeBestSealSlider/HomeBestSealSlider";
import HomeSlider from "../HomeSlider/HomeSlider";
import HomeAddCard from "../HomeAddCard/HomeAddCard";
import PlayWithWrite from "../PlayWithWrite/PlayWithWrite";
import AllInOneCategory from "../AllInOne/AllInOneCategory";
import { BookStoreBannerOne } from "@/src/Assets";
import HeroSection from "../HeroSection/HeroSection";

const Home = () => {

  return (
    <>
      {/* <HomeSlider /> */}
      <section className="container">
        <HeroSection />
        {/* ====== Home Slider ======= */}
        <section className="my-8 mt-16">
          <h1 className="text-3xl text-center mt-8 font-semibold">Popular Categories</h1><br />
          <Category />
        </section>

        <div className="mt-20">
          <HomeBestSealSlider />

        </div>
        <div>
          <h1 className="text-2xl text-start mt-16 font-semibold">Our Best Sellers</h1>
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
      </section>
    </>
  );
};

export default Home;