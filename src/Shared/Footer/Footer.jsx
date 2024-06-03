import useBook from '@/src/Hooks/useBook';
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { TransParentLogo } from "@/src/Assets";

const Footer = () => {
  const { categoryData } = useBook();

  return (
    <footer className="bg-[#000]">
      <div className=" text-[#fff] px-4 py-16 grid md:grid-cols-5 container gap-4">
        <div className="block">
          <Link href="/">
            <Image
              src={TransParentLogo}
              width={150}
              height={150}
              alt=""
              className="w-[150px] cursor-pointer"
            />
          </Link>
        </div>
        <div className="md:mt-[0] block mt-6">
          <ul>
            <li className="font-semibold text-lg text-[#fff]">
              <Link href="">Categories</Link>
            </li>
            {categoryData?.slice(0, 6).map((itm) => (
              <li key={itm?.id} className="mt-3 font-[300]">
                <Link
                  href={`/product?categoryName=${encodeURIComponent(
                    itm?.category
                  )}`}
                >
                  {itm?.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:mt-[0] mt-6">
          <ul>
            <li className="font-semibold text-lg text-[#fff]">
              <span>Contact Us</span>
            </li>
            <li className="mt-3 font-[300]">
              <span className="font-[400]">Address</span>
              <br />
              <small>Padma Chand Marg Daryaganj</small> <br />
              <small>Delhi-110002</small>
            </li>
            <li className="mt-6 font-[300]">
              <span className="font-[400] ">Office / Mobile</span>
              <br />
              <small>+91 98111 60149</small>
            </li>
            <li className="mt-6 font-[300]">
              <span className="font-[400] ">Email</span>
              <br />
              <small>helpdesk@nandlaldayaram.com</small>
              <br />
              <small>support@nandlaldayaram.com</small>
            </li>
          </ul>
        </div>

        <div className="md:mt-[0] mt-6">
          <ul>
            <li className="font-semibold text-lg text-[#fff]">
              <Link href="">Follow Us</Link>
            </li>
            <li className="mt-3 font-[300]">
              <Link
                href="https://www.facebook.com/nandlal.dayaram.9/"
                className="flex items-center gap-2 "
              >
                <FacebookIcon className="text-2xl " /> Facebook
              </Link>
            </li>
            <li className="mt-6 font-[300]">
              <Link
                href="https://www.linkedin.com/in/nand-lal-daya-ram-94510a282/?originalSubdomain=in"
                className="flex items-center gap-2 "
              >
                <LinkedInIcon className="text-2xl " /> LinkedIn
              </Link>
            </li>
            <li className="mt-6 font-[300]">
              <Link
                href="https://api.whatsapp.com/send/?phone=9811160149&text&type=phone_number&app_absent=0"
                className="flex items-center gap-2 "
              >
                <WhatsAppIcon className="text-2xl " /> WhatsApp
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:mt-[0] mt-6">
          <ul>
            <li className="font-semibold text-lg text-[#fff]">
              <Link href="">Join Us</Link>
            </li>{" "}
            <br />
            <li className="mt-3 font-[300]">
              <h2 className="text-2lg font-[500] text-[#fff]">
                Subscribe to our newsletters
              </h2>
              <form className="flex items-center border border-[#4c5a5f] bg-[#73c3f58b] overflow-hidden rounded-md mt-3 g">
                <input
                  type="text"
                  className="w-full text-[#fff] py-1 px-2 bg-[transparent]"
                  placeholder="email..."
                />
                <button className="bg-[#1a7dae]  px-2 py-2">Subscribe</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;