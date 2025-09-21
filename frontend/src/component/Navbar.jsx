import React, { useState } from "react";
import LOGO from "../assets/LOGO.png";
import cart from "../assets/cart.png";
import heart from "../assets/heart.png";
import search from "../assets/search.png";
import Vector from "../assets/Vector.png";
import Rectangle from "../assets/Rectangle.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full bg-white">
      {/* Navbar */}
      <div className="Navbar flex items-center justify-between max-w-[1440px] h-[100px] mx-auto px-6 md:px-12">
        {/* Logo */}
        <div className="flex items-center">
          <img className="w-[40px] h-[26px] md:w-[50px] md:h-[32px]" src={LOGO} alt="Logo" />
          <span
            className="ml-2 text-[24px] md:text-[32px] font-bold"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: 0,
            }}
          >
            Furniro
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {["Home", "Shop", "About", "Contact"].map((link) => (
            <p
              key={link}
              className="text-[14px] md:text-[16px]"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                lineHeight: "100%",
                letterSpacing: 0,
              }}
            >
              <a href="#">{link}</a>
            </p>
          ))}
        </div>

        {/* Icons + Mobile Menu Button */}
        <div className="flex items-center gap-6 md:gap-10">
          <img src={Vector} alt="User" className="w-[18px] md:w-auto" />
          <img src={search} alt="Search" className="w-[18px] md:w-auto" />
          <img src={heart} alt="Wishlist" className="w-[18px] md:w-auto" />
          <img src={cart} alt="Cart" className="w-[18px] md:w-auto" />

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden flex flex-col justify-between w-6 h-5 ml-3 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="block w-full h-[3px] bg-black"></span>
            <span className="block w-full h-[3px] bg-black"></span>
            <span className="block w-full h-[3px] bg-black"></span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4">
          {["Home", "Shop", "About", "Contact"].map((link) => (
            <p
              key={link}
              className="py-2 text-[16px]"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
              }}
            >
              <a href="#">{link}</a>
            </p>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <div className="relative w-full h-[200px] md:h-[316px]">
        <img
          src={Rectangle}
          alt="Rectangle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {/* Title */}
          <h1
            className="text-[28px] md:text-[48px] font-medium"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              lineHeight: "100%",
            }}
          >
            Shop
          </h1>

          {/* Breadcrumb */}
          <div className="flex items-center mt-2 text-[12px] md:text-[16px]">
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
              }}
            >
              Home
            </span>
            <span className="mx-2">{">"}</span>
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
              }}
            >
              Shop
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
