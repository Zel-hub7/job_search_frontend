"use client";
import React, { useEffect, useState } from "react";

const HonouringLegacySection = () => {
  // Slides array with heading & description for each slide
  const slides = [
    {
      year: 2017,
      text: "Establishment & Foundation",
      image: "/images/ab1.png",
      heading: "Now, We Look to the Future (2017)",
      description:
        "Our work today is a continuation of the paths forged by Murray and Senny. Cochrane Sinclair LLP remains dedicated to building a Canada where Indigenous sovereignty is upheld and justice serves every community. As we advocate for change and challenge unjust systems, we create a space where tradition and innovation meet — building bridges for the generations yet to come.",
    },
    {
      year: 2018,
      text: "New Horizons & Growth",
      image: "/images/ab1.png",
      heading: "Now, We Look to the Future (2018)",
      description:
        "In 2018, we continued to expand our reach and strengthen our commitment to justice, forging new paths that would support communities and foster meaningful change across regions.",
    },
    {
      year: 2019,
      text: "Global Expansion",
      image: "/images/ab1.png",
      heading: "Now, We Look to the Future (2019)",
      description:
        "By 2019, our global expansion was well underway. We broadened our collaborations and focused on advocacy that bridged traditional values with innovative legal strategies.",
    },
    {
      year: 2020,
      text: "Global Expansion",
      image: "/images/ab1.png",
      heading: "Now, We Look to the Future (2020)",
      description:
        "In 2020, despite global challenges, we strengthened our resolve and our mission. Our firm continues to stand for the rights of Indigenous communities, ensuring every voice is heard.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-5 mb-5 rounded-3xl">
      {/* Slider Image with smooth sliding transition */}
      <div className="rounded-3xl overflow-hidden bg-red-200 relative">
        <div
          className="flex transition-transform duration-500 ease-out h-60 md:h-auto"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={slide.text}
              className="w-full h-full object-cover object-top rounded-3xl flex-shrink-0"
            />
          ))}
        </div>

        {/* Mobile Overlay (below 768px): Year + short text + red dots */}
        <div className="absolute bottom-4 w-full md:hidden flex flex-col items-center">
          <div className="bg-black bg-opacity-50 inline-block px-3 py-1 rounded mb-2">
            <span className="text-xs text-white mr-2">
              {slides[activeIndex].year}
            </span>
            <span className="text-sm text-white">
              {slides[activeIndex].text}
            </span>
          </div>
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  activeIndex === index ? "bg-red-500" : "bg-red-500 opacity-50"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Container for screens 768px and above */}
      <div className="hidden md:block absolute top-32 md:left-1/2 lg:left-1/3 -translate-x-1/2 w-4/5 lg:w-1/2">
        {/* Fixed text container so its top position stays the same */}
        <div className="h-[180px]">
          <div className="text-white text-left">
            <h2 className="md:text-[36px] font-TWKEverett  font-bold mb-4">
              {slides[activeIndex].heading}
            </h2>
            <p className="text-base md:text-[20px] font-NeueHaasUnica leading-relaxed">
              {slides[activeIndex].description}
            </p>
          </div>
        </div>
        {/* Timeline line + dots */}
        <div className="relative w-full flex items-center b justify-between md:mt-4 lg:mt-28">
          <div className="absolute left-0 right-0 h-[2px] bg-[#474747] z-0" />
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                className="relative z-10 flex flex-col items-center cursor-pointer"
                onClick={() => setActiveIndex(index)}
              >
                <span className="mb-2 text-xs text-white">{slide.year}</span>
                <div
                  className={`w-4 h-4 rounded-full mb-1 ${
                    isActive ? "bg-[#FF0000]" : "bg-[#474757]"
                  }`}
                ></div>
                <span
                  className={`text-xs mt-1 ${
                    isActive ? "text-red-500" : "invisible"
                  }`}
                >
                  {slide.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HonouringLegacySection;
