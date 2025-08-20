import Image from "next/image";
import React from "react";
import SwiperSlider from "./swiperSlider";
interface WelcomeBannerProps {
  userName?: string;
  welcomeMessage?: string;
  description?: string;
  buttonText?: string;
  backgroundImage?: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  userName = "Jaydon Frankie",
  welcomeMessage = "Welcome back 👋",
  description = "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything.",
  buttonText = "Go Now",
  backgroundImage = "/images/introSection/background-5.webp",
}) => {
  return (
    <div className=" md:grid md:grid-cols-3 xl:grid-cols-4  md:mt-5 md:h-72 md:w-[98%] md:gap-x-6 md:mx-auto lg:h-80 max-md:m-4">
      <div
        className="relative rounded-xl  my-4 md:my-0  max-md:mx-auto bg-cover bg-center bg-blue-400 md:col-span-2 "
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom right,
              rgba(0,0,0,0.3) 0%,
              rgba(0,0,0,0.9) 100%
            ),
            url(${backgroundImage})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
        }}
      >
        {/* Content less than md*/}
        <div className="relative z-10 h-full flex flex-col  p-8 text-white md:hidden">
          {/* Welcome text */}
          <div className="max-w-md">
            <p className="text-xl mb-2 text-center font-bold">
              {welcomeMessage}
            </p>
            <h1 className="text-xl font-bold mb-4 text-center">{userName}</h1>
            <p className="text-gray-400 text-center text-sm font-semibold ">
              {description}
            </p>
          </div>

          {/* Button */}
          <button className="mx-auto mt-5 w-fit bg-customGreen font-bold text-white px-4 py-2 rounded-lg text-sm hover:!bg-customGreenHover cursor-pointer">
            {buttonText}
          </button>

          {/* Decorative SVG at bottom */}
          <div className=" mt-14 mb-10 flex items-center justify-center">
            <Image
              src={
                "/images/introSection/unblurimageai_Screenshot 2025-08-06 112350 (2).webp"
              }
              height={250}
              width={250}
              unoptimized
              alt="intro photo"
              className=""
            />
          </div>
        </div>
        {/* Content more than md*/}
        <div className="relative z-10 h-full flex   p-8 text-white max-md:hidden">
          {/* Welcome text */}
          <div className="t">
            <p className="text-[28px] mb-2 text-nowrap font-semibold">
              {welcomeMessage}
            </p>
            <h1 className="text-[25px] font-bold mb-4 ">{userName}</h1>
            <p className="text-gray-400  text-sm font-semibold ">
              {description}
            </p>
            {/* Button */}
            <button className="mx-auto mt-5 w-fit bg-customGreen font-bold text-white px-4 py-2 rounded-lg text-sm hover:!bg-customGreenHover cursor-pointer">
              {buttonText}
            </button>
          </div>

          {/* Decorative SVG at bottom */}
          <div className="  flex items-center justify-center  lg:translate-x-5 ">
            <Image
              src={
                "/images/introSection/unblurimageai_Screenshot 2025-08-06 112350 (2).webp"
              }
              height={250}
              width={250}
              unoptimized
              alt="intro photo"
              className=""
            />
          </div>
        </div>
      </div>

      <SwiperSlider />
    </div>
  );
};

export default WelcomeBanner;
