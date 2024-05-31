import { useContext, useEffect, useState } from "react";
import useCommonApiData from "@/src/Hooks/useCommonApiData";
import {
  MdOutlineAccountBox,
  MdPayment,
  MdProductionQuantityLimits,
} from "react-icons/md";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/router";
import { AuthContext } from "../Context/UserContext";
import {  IoLocationSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { MainLogo } from "../Assets";
import Image from "next/image";
import Footer from "../Shared/Footer/Footer";

const UserdashboardLayout = ({ children }) => {
  const { handleLogout } = useCommonApiData();
  const [collapsed, setCollapsed] = useState(false); 
  const [sideNavVisible, setSideNavVisible] = useState(false);
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  const handleResize = () => {
    setCollapsed(window.innerWidth < 768);
    if (window.innerWidth < 768) {
      setSideNavVisible(false);
    } else {
      setSideNavVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleSideNav = () => {
    setSideNavVisible(!sideNavVisible);
  };

  const { user } = useContext(AuthContext);

  return (
    <div className="">

      <div className="bg-transparent flex">
        <div className="flex flex-col items-start justify-between gap-8 bg-gray-700 h-screen sticky top-0  px-5 w-56 py-10">
          <div className="flex flex-col items-start justify-center gap-6">
            <Link href={"/"}>
              <div className="text-2xl font-bold text-black flex items-start justify-start w-full gap-2">
                <Image
                  src={MainLogo}
                  alt="logo"
                  width={500}
                  height={400}
                  className="cursor-pointer hover:scale-105 duration-300 transform bg-white w-12 h-12 rounded-lg mb-12 mt-2"
                />

                <p className="hover:none text-white font-medium text-2xl leading-tight">
                  Nandlal <br /> Dayaram
                </p>
              </div>
            </Link>
            <Link
              href="/userdashboard"
              className={`w-full ${
                selected === "profile" ? "border-l-2" : ""
              } border-gray-400 rounded-sm flex items-start justify-start px-2 py-2`}
              onClick={() => setSelected("profile")}
            >
              <span className="text-white text-xl items-center justify-center flex gap-2">
                <MdOutlineAccountBox className="text-2xl" />
                Profile
              </span>
            </Link>
            <Link
              href="/userdashboard/address-book/manage-address-book"
              className={`w-full ${
                selected === "address-book" ? "border-l-2" : ""
              } border-gray-400 rounded-sm flex items-start justify-start py-2`}
              onClick={() => setSelected("address-book")}
            >
              <span className="text-white text-lg items-center justify-center flex gap-2 ">
                <IoLocationSharp className="text-2xl" />
                Address Book
              </span>
            </Link>
            <Link
              href="/cart"
              className={`w-full ${
                selected === "cart" ? "border-l-2" : ""
              } border-gray-400 rounded-sm flex items-start justify-start px-2 py-2`}
              onClick={() => setSelected("cart")}
            >
              <span className="text-white text-xl items-center justify-center flex gap-2">
                <FaShoppingCart className="text-2xl" />
                Cart
              </span>
            </Link>
            <Link
              href="/userdashboard/order"
              className={`w-full ${
                selected === "order" ? "border-l-2" : ""
              } border-gray-400 rounded-sm flex items-start justify-start px-2 py-2`}
              onClick={() => setSelected("order")}
            >
              <span className="text-white text-xl items-center justify-center flex gap-2">
                <MdProductionQuantityLimits className="text-2xl" />
                Order
              </span>
            </Link>
            <div
              className={`w-full ${
                selected === "payments" ? "border-l-2" : ""
              } border-gray-400 rounded-sm flex items-start justify-start px-2 py-2`}
              onClick={() => setSelected("payments")}
            >
              <span className="text-white text-xl items-center justify-center flex gap-2">
                <MdPayment className="text-2xl" />
                Payments
              </span>
            </div>
          </div>
          <span className="text-white text-xl items-center justify-center flex z-10 gap-2">
            <IoIosLogOut className="text-2xl" />
            <button onClick={() => handleLogout()}>Logout</button>
          </span>
        </div>

        <div className=" gap-10">
          {children}
          <div className="mt-20">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserdashboardLayout;
