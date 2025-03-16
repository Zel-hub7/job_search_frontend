"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Logo from "../../../public/images/logo1updated.png";
import PaymentButton from "./PaymentButton";
import FeatureCard from "./FeatureCard";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import ChevronDown2 from "../../../public/images/icons/ChevronDownNav.svg";
import ChevronDownRed from "../../../public/images/icons/ChevronDownNavR.svg";
import ChevronDownNavMobile from "../../../public/images/icons/ChevronDownNavMobile.svg";
import { menuData } from "./menuData";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Framer Motion
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementNavbar from "./AnnouncementNavbar";

export default function NavBar() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/"; // Only on home page

  // Desktop submenu state
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<number | null>(null);

  // Derived state: when any desktop menu item is hovered
  const isDesktopHover = activeSubmenu !== null;

  // Handle navigation loading state
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && document.querySelector("header")?.contains(anchor)) {
        setIsNavigating(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    setIsNavigating(false);
    setActiveSubmenu(null);
  }, [pathname]);

  // Handle cursor during navigation
  useEffect(() => {
    document.body.style.cursor = isNavigating ? "wait" : "auto";
  }, [isNavigating]);

  // Existing scroll effect remains unchanged
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop || (!isMobileMenuOpen && !isDesktop)) {
        setShowNav(currentScrollPos > lastScrollPos ? false : true);
      }
      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPos, isMobileMenuOpen]);

  // Desktop: Hover logic remains unchanged
  const handleMouseEnter = (menu: number) => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    setActiveSubmenu(menu);
  };

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 300);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    if (isMobileMenuOpen) {
      setMobileSubmenuOpen(null);
    }
  };

  const toggleMobileSubmenu = (index: number) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === index ? null : index);
  };

  return (
    <header
      className={`fixed left-0 top-0 z-[999] w-full transition-transform duration-300 ${
        isMobileMenuOpen ? "h-screen" : ""
      } ${showNav ? "translate-y-0" : "-translate-y-full"}`}
    >
      <AnnouncementNavbar />

      <nav className="relative h-[100%] bg-[#FCFBFA] lg:h-auto">
        <div className="flex items-center justify-between pl-[6px] sm:pl-[14px] pr-4 md:pr-8 py-[5px] sm:pr-12 md:px-4 lg:px-[36px] lgg:px-[20px] xl:px-[65px]">
          <Link
            href="/"
            passHref
            onClick={() => {
              setIsMobileMenuOpen(false);
              setMobileSubmenuOpen(null);
              setActiveSubmenu(null);
            }}
          >
            <Image
              src={Logo}
              alt="Cochrane Sinclair Logo"
              className="h-[53px] w-auto md:w-auto lg:h-[58px] lg:w-auto xl:h-[65px] xl:w-auto"
            />
          </Link>

          {/* Mobile toggle button */}
          <button
            className="flex items-center justify-center sm:-mr-2 md:mr-0 text-[#474747] lg:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Menu */}
          <div className="hidden items-center lg:flex lg:gap-[5px] xl:gap-4">
            {menuData.map((menu, index) => (
              <div
                key={index}
                className="group"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center justify-center gap-[6px] px-2 py-1 font-NeueHaasUnica font-medium transition-colors xl:gap-[10px] ${
                    activeSubmenu === index ? "text-[#FF0000]" : "text-charcoal-100"
                  }`}
                >
                  {menu.label}
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <Image
                      src={ChevronDown2}
                      alt="Dropdown Default"
                      className={`absolute transition-transform duration-200 ${
                        activeSubmenu === index
                          ? "rotate-180 opacity-0"
                          : "rotate-0 opacity-100"
                      }`}
                    />
                    <Image
                      src={ChevronDownRed}
                      alt="Dropdown Hover"
                      className={`absolute transition-transform duration-300 ${
                        activeSubmenu === index
                          ? "rotate-0 opacity-100"
                          : "-rotate-180 opacity-0"
                      }`}
                    />
                  </span>
                </button>

                {/* Desktop Submenu */}
                <div
                  className={`backdrop-blur-13 absolute left-0 top-full z-50 w-screen bg-custom-bg px-12 py-6 shadow-lg transition-opacity duration-200 lg:py-0 xl:px-[156px] ${
                    activeSubmenu === index
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                  }`}
                >
                  <div className="mx-auto max-w-screen-xl px-6 py-[56px]">
                    <div className="grid grid-cols-2 gap-[30px]">
                      {menu.content.map((item, subIndex) => (
                        <FeatureCard
                          key={subIndex}
                          title={item.title}
                          description={item.description}
                          image={item.image}
                          href={item.href}
                          onNavigate={() => setActiveSubmenu(null)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <PaymentButton>Make a Payment</PaymentButton>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="flex h-[88%] flex-col justify-between bg-[#FCFBFA] px-[23px] py-4 sm:px-12 md:px-6 lg:hidden overflow-x-hidden">
            <div className="flex-1 relative">
              <div className="absolute inset-0 hide-scrollbarnav overflow-y-auto pr-2 -mr-2">
                {menuData.map((menu, index) => (
                  <div key={index} className="border-b border-gray-200 py-4">
                    <button
                      className="flex w-full items-center justify-between text-left text-[18px] font-NeueHaasUnica font-normal text-charcoal-100 pr-1"
                      onClick={() => toggleMobileSubmenu(index)}
                    >
                      {menu.label}
                      <Image
                        src={ChevronDownNavMobile}
                        alt="Dropdown"
                        className={`h-[13px] w-[8px] transition-transform ${
                          mobileSubmenuOpen === index ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileSubmenuOpen === index && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="mb-4 mt-5 flex max-h-[48vh] flex-col gap-[12px] hide-scrollbarnav overflow-y-auto pr-2 -mr-2"
                        >
                          {menu.content.map((item, subIndex) => (
                            <div
                              key={`${index}-${subIndex}`}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setMobileSubmenuOpen(null);
                              }}
                            >
                              <Link href={item.href} legacyBehavior>
                                <FeatureCard
                                  key={subIndex}
                                  title={item.title}
                                  description={item.description}
                                  image={item.image}
                                  href={item.href}
                                />
                              </Link>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-4">
              <PaymentButton>Make a Payment</PaymentButton>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
