import { Menu, Transition } from "@headlessui/react";
import { AiOutlineShopping } from "react-icons/ai";
import { FaUserLock } from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";
import { FiLogOut, FiUser } from "react-icons/fi";
import Link from "next/link";

const DropdownMenu = ({ showDropdown, handleLogout, user, isAdmin }) => {
  const menuItems = [
    isAdmin ? { label: "Admin", href: "/admin", icon: <FaUserLock /> } : null,
    { label: "My profile", href: "/userdashboard", icon: <FiUser /> },
    {
      label: "Order",
      href: "/userdashboard/order",
      icon: <AiOutlineShopping />,
    },
    {
      label: "Address",
      href: "/userdashboard/address-book/manage-address-book",
      icon: <AiOutlineShopping />,
    },
    { label: "Contact us", href: "/", icon: <RiCustomerService2Line /> },
    { label: "Logout", onClick: handleLogout, icon: <FiLogOut /> },
  ].filter(Boolean);

  return (
    <Menu>
      <Transition
        show={showDropdown}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div
          className={`origin-top-right absolute mt-1 right-0 w-48 rounded-md shadow-lg ring-1 bg-white ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="py-1">
            {menuItems.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) =>
                  item.onClick ? (
                    <button
                      className={`block w-full text-start px-4 py-2 ${
                        active && "bg-gray-200 text-black"
                      }`}
                      onClick={item.onClick}
                    >
                      <div className="flex items-center">
                        {item.icon && <div className="mr-2">{item.icon}</div>}
                        {item.label}
                      </div>
                    </button>
                  ) : (
                    <Link
                      className={`block px-4 py-2 ${
                        active && "bg-gray-200 text-black"
                      }`}
                      href={item.href}
                    >
                      <div className="flex items-center">
                        {item.icon && <div className="mr-2">{item.icon}</div>}
                        {item.label}
                      </div>
                    </Link>
                  )
                }
              </Menu.Item>
            ))}
          </div>
        </div>
      </Transition>
    </Menu>
  );
};

export default DropdownMenu;
