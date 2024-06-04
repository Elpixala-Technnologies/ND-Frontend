import { MainLogo } from "@/src/Assets";
import { AuthContext } from "@/src/Context/UserContext";
import useAdmin from "@/src/Hooks/useAdmin";
import useCommonApiData from "@/src/Hooks/useCommonApiData";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaMicrosoft, FaPowerOff, FaUserAlt } from "react-icons/fa";
import { MdOutlineAccountBox, MdOutlineShoppingBag, MdProductionQuantityLimits } from "react-icons/md";
import { useCart } from "@/src/Context/cartContext";
import { IoLocationSharp } from "react-icons/io5";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { handleLogout } = useCommonApiData();
  const userEmail = user?.email;
  const [isAdmin] = useAdmin();
  const { cartData } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <nav className="bg-[#ffffff] md:px-4 border-b py-2 flex items-center text-black container">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center gap-4">
          <Link className="text-2xl font-bold text-black" href="/">
            <Image
              src={MainLogo}
              alt="logo"
              width={50}
              height={40}
              className="cursor-pointer hover:scale-105 duration-300 transform"
            />
          </Link>
        </div>

        <ul className="items-center hidden gap-4 md:flex">
          <li className="border-r px-2 h-full border-[gray]">
            <Link href="/">Home</Link>
          </li>
          <li className="border-r px-2 h-full border-[gray] ">
            <Link href="/product">Shop</Link>
          </li>

          <li className="border-r px-2 h-full border-[gray]">
            {!userEmail ? (
              <>
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center gap-2 border border-gray-300 p-2 rounded-lg"
                >
                  <FaUserAlt /> Sign In
                </Link>
              </>
            ) : (
              <div
                className="relative flex justify-center items-center gap-2"
                onMouseEnter={handleMouseEnter}
              >
                <img
                  src={user?.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full mr-4"
                />

                {isHovered && (
                  <div
                    className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md z-10"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {isAdmin ? (
                      <Link href="/admin">
                        <div className=" px-4 py-2 flex items-center hover:bg-blue-200">
                          <FaMicrosoft /> Profile
                        </div>
                      </Link>
                    ) : (
                      <Link href="/userdashboard">
                        <div className=" px-4 py-2  flex items-center gap-2 hover:bg-gray-200">
                        <MdOutlineAccountBox className="text-2xl" /> Profile
                        </div>
                      </Link>
                    )}
                    <Link href="/userdashboard/address-book/manage-address-book">
                      <div className="px-4 py-2 flex  hover:bg-gray-200 items-center gap-2">
                      <MdProductionQuantityLimits className="text-2xl" />
                        Orders
                      </div>
                    </Link>
                    <Link href="/userdashboard/order">
                      <div className="px-4 py-2 hover:bg-gray-200 flex items-center gap-2">
                      <IoLocationSharp className="text-2xl" />
                        Address
                      </div>
                    </Link>
                    <button
                      className="w-full text-left px-5 py-2 flex items-center gap-2 hover:bg-gray-200"
                      onClick={handleLogout}
                    >
                      <FaPowerOff /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>

          <Link
            href="/cart"
            className="bg-[#9cb3dd43] w-[40px] rounded-full flex items-center justify-center h-[40px] common-hover relative"
          >
            <MdOutlineShoppingBag className="text-2xl text-[#335187] " />
            <p className="absolute -top-2 -right-3 text-xs bg-red-500 text-white p-1 px-2 rounded-full">
              {cartData.length}
            </p>
          </Link>
        </ul>

        {/* shop and menu button group for small device */}
        <div className="flex items-center gap-4 md:hidden">
          <Link href="/cart">
            <div className="bg-[#9cb3dd43] w-[40px] rounded-full flex items-center justify-center h-[40px]">
              <MdOutlineShoppingBag className="text-2xl text-[#335187]" />
            </div>
          </Link>

          <button className="block md:hidden" onClick={() => setOpen(!open)}>
            <AiOutlineMenu className="text-3xl" />
          </button>
        </div>

        {/* side bar for small device */}
        <aside
          style={{
            zIndex: "9999999",
          }}
          className={`${
            open ? "left-0 " : "left-[-250%]"
          } duration-300 w-full overflow-hidden fixed bg-[#172733] h-screen top-0 p-4 text-white z-10`}
        >
          <button className="float-right" onClick={() => setOpen(!open)}>
            <CloseIcon className="text-5xl" />
          </button>
          <br />
          <ul className="flex flex-col gap-6">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/product">Shop</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              {!userEmail ? (
                <>
                  <Link
                    href="/auth/login"
                    className="flex items-center justify-center gap-2 border-common-btn "
                  >
                    <FaUserAlt /> SignIn
                  </Link>
                </>
              ) : (
                <>
                  {isAdmin && (
                    <Link
                      href="/dashboard"
                      className="flex items-center  gap-2 border-common-btn "
                    >
                      <FaMicrosoft /> Dashboard
                    </Link>
                  )}
                  {!isAdmin && (
                    <Link
                      href="/userdashboard"
                      className="flex items-center  gap-2 border-common-btn "
                    >
                      <FaMicrosoft /> Dashboard
                    </Link>
                  )}
                  <button
                    className="flex items-center  w-full gap-2 my-2 border-common-btn"
                    onClick={() => handleLogout()}
                  >
                    <FaPowerOff /> Logout
                  </button>
                </>
              )}
            </li>
            <li className="flex items-center jsutif bg-[white] p-1 rounded-md gap-2">
              <input
                type="text"
                className="w-full pl-2 text-black"
                placeholder="Search"
              />
              <SearchIcon className="text-black" />
            </li>
          </ul>
        </aside>
      </div>
    </nav>
  );
};

export default Navbar;
