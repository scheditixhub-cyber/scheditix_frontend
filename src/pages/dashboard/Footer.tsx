import logo from "../../assets/LogoWrap.png";
import { MdLocationPin, MdPhone, MdTimer } from "react-icons/md";
import { RiMailFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
      <footer className="bg-gray-100 w-full p-2 ">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-5 gap-10">
         <img src={logo} alt="" />

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-800">Quick links</h3>

          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-[#27187E] cursor-pointer">Home</li>
            <li className="hover:text-[#27187E] cursor-pointer">About us</li>
            <li className="hover:text-[#27187E] cursor-pointer">
              Explore Categories
            </li>
            <li className="hover:text-[#27187E] cursor-pointer">
              Event Categories
            </li>
            <li className="hover:text-[#27187E] cursor-pointer">
              Subscription plan
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-800">Support</h3>

          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-[#27187E] cursor-pointer">Account</li>
            <li className="hover:text-[#27187E] cursor-pointer">Faq</li>
            <li className="hover:text-[#27187E] cursor-pointer">Legal</li>
            <li className="hover:text-[#27187E] cursor-pointer">
              Privacy policy
            </li>
            <li className="hover:text-[#27187E] cursor-pointer">
              Contact us
            </li>
          </ul>
        </div>

        {/* Others */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-800">Others</h3>

          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-[#27187E] cursor-pointer">Partners</li>
            <li className="hover:text-[#27187E] cursor-pointer">
              Community program
            </li>
            <li className="hover:text-[#27187E] cursor-pointer">
              Conferences
            </li>
            <li className="hover:text-[#27187E] cursor-pointer">
              Affiliate program
            </li>
            <li className="hover:text-[#27187E] cursor-pointer">
              Subscription plan
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-800">Need any help?</h3>

          <ul className="space-y-4 text-gray-600 text-sm">
            <li className="flex items-start gap-2">
              <MdLocationPin className="text-black" size={50}/>
              <span>
                Office address: 204/205 muyibi street, Ajegunle, Olodi Apapa,
                Lagos, Nigeria.
              </span>
            </li>

            <li className="flex items-center gap-3 ">
              <RiMailFill className="text-black " size={20}/>
              <span>cynthiadymphna04@gmail.com</span>
            </li>

            <li className="flex items-center gap-3">
              <MdPhone className="text-black " size={20} />
              <span>+234901484551</span>
            </li>

            <li className="flex items-center gap-3">
              <MdTimer className="text-black " size={20} />
              <span>Office hours: 24hrs, Monday - Sunday</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © 2024 Wave pass, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-gray-700">
            <FaXTwitter className="cursor-pointer hover:text-[#27187E]" />

            <FaLinkedin className="cursor-pointer hover:text-[#27187E]" />

            <FaFacebook className="cursor-pointer hover:text-[#27187E]" />

            <FaInstagram className="cursor-pointer hover:text-[#27187E]" />
          </div>
        </div>
      </div>
    </footer>
 
  );
};

export default Footer;
