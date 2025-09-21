import React from "react";
import trophy from "../assets/trophy.png";
import support from "../assets/support.png";
import shipping from "../assets/shipping.png";
import guarantee from "../assets/guarantee.png";

const Footer = () => {
  return (
    <div className="w-full bg-[#FAF3EA] py-12 px-6">
      <div className="max-w-[1334px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* High Quality */}
        <div className="flex items-center">
          <img src={trophy} alt="Trophy" className="w-14 h-14 flex-shrink-0" />
          <div className="ml-4">
            <h3 className="text-lg font-semibold font-poppins">High Quality</h3>
            <p className="text-gray-500 text-sm font-poppins">
              crafted from top materials
            </p>
          </div>
        </div>

        {/* Warranty */}
        <div className="flex items-center">
          <img src={guarantee} alt="Warranty" className="w-14 h-14 flex-shrink-0" />
          <div className="ml-4">
            <h3 className="text-lg font-semibold font-poppins">Warranty Protection</h3>
            <p className="text-gray-500 text-sm font-poppins">Over 2 years</p>
          </div>
        </div>

        {/* Shipping */}
        <div className="flex items-center">
          <img src={shipping} alt="Shipping" className="w-14 h-14 flex-shrink-0" />
          <div className="ml-4">
            <h3 className="text-lg font-semibold font-poppins">Free Shipping</h3>
            <p className="text-gray-500 text-sm font-poppins">Order over 150 $</p>
          </div>
        </div>

        {/* Support */}
        <div className="flex items-center">
          <img src={support} alt="Support" className="w-14 h-14 flex-shrink-0" />
          <div className="ml-4">
            <h3 className="text-lg font-semibold font-poppins">24 / 7 Support</h3>
            <p className="text-gray-500 text-sm font-poppins">Dedicated support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
