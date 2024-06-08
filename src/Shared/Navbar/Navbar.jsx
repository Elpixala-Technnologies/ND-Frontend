import { MainLogo } from "@/src/Assets";
import { AuthContext } from "@/src/Context/UserContext";
import useAdmin from "@/src/Hooks/useAdmin";
import useCommonApiData from "@/src/Hooks/useCommonApiData";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaMicrosoft, FaPowerOff, FaUserAlt } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useCart } from "@/src/Context/cartContext";
import { CiSearch } from "react-icons/ci";
import { LiaUserSolid } from "react-icons/lia";
import { CartItem } from "@/src/Hoc/Material-Ui/cartItems";
import DropdownMenu from "@/src/Hoc/Material-Ui/DropdownMenu";
import { useHover } from "usehooks-ts";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { handleLogout } = useCommonApiData();
  const userEmail = user?.email;
  const [isAdmin] = useAdmin();
  const { cartData } = useCart();
  const [inputValue, setInputValue] = useState("");
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)

  const handleSearch = () => {
    console.log(inputValue);
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-[#ffffff] md:px-4 pt-3 pb-3 flex items-center text-black border-b-2 border-gray-200">
      <div className="flex items-center justify-between mx-auto w-full">
        <div className="flex gap-x-8 items-center w-2/5">
          <div className="">
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
          {/* Search Bar */}

          <div className="relative flex-1 bg-gray-50 rounded-full">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search..."
              className="px-4 text-sm py-2 focus:outline-none bg-gray-50 rounded-l-full"
            />
            <button onClick={handleSearch} className="absolute right-3 top-2">
              <CiSearch className="text-lg" />
            </button>
          </div>
        </div>

        <ul className="items-center hidden gap-2 md:flex">
          <li className="">
            {!userEmail ? (
              <>
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center gap-1 font-inter"
                >
                  <LiaUserSolid className="text-2xl" />
                  <span className="pt-0.5"> Login</span>
                </Link>
              </>
            ) : (
              <div
                className="relative flex justify-center items-center "
                onClick={handleShowDropdown}
                ref={hoverRef}
              >
                <img
                  src={user?.photoURL}
                  alt="User"
                  className="w-9 h-9 rounded-full mr-2 cursor-pointer"
                />

                <div className="absolute top-8 right-0 !z-50">
                  <DropdownMenu
                    showDropdown={showDropdown || isHover}
                    handleLogout={handleLogout}
                    user={user}
                    isAdmin={isAdmin}
                  />
                </div>
              </div>
            )}
          </li>

          <div className="w-[2px] h-5 bg-gray-300 mt-0.5"></div>

          <Link
            href="/cart"
            className="flex items-center justify-center common-hover relative gap-1"
          >
            <CartItem cartItem={cartData?.length} />
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
