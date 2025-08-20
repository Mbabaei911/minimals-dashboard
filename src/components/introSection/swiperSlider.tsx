import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import styles from "./swiperSlide.module.css";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  paragraph: string;
  bgImage: string;
}

const SwiperSlider = () => {
  const slides: Slide[] = [
    {
      id: 1,
      title: "Featured App",
      subtitle:
        "The Rise of Remote Work: Benefits, Challenges, and Future Trends",
      paragraph:
        "The aroma of freshly brewed coffee filled the air, awakening my senses.",
      bgImage: "/images/introSection/cover-4.webp",
    },
    {
      id: 2,
      title: "Featured App",
      subtitle: "Understanding Blockchain Technology: Beyond Cryptocurrency",
      paragraph:
        "The children giggled with joy as they ran through the sprinklers on a hot summer day.",
      bgImage: "/images/introSection/cover-5.webp",
    },
    {
      id: 3,
      title: "Featured App",
      subtitle:
        "Mental Health in the Digital Age: Navigating Social Media and Well-being",
      paragraph:
        "He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.",
      bgImage: "/images/introSection/cover-6.webp",
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      speed={600}
      slidesPerView={1}
      navigation={{
        nextEl: `.${styles.nextButton}`,
        prevEl: `.${styles.prevButton}`,
      }}
      pagination={{
        clickable: true,
        el: `.${styles.pagination}`,
        bulletClass: styles.bullet,
        bulletActiveClass: styles.bulletActive,
        renderBullet: (index, className) => {
          return `<span class="${className}"></span>`;
        },
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      allowTouchMove={true}
      loop={true}
      style={{ touchAction: "pan-y" }}
      className="  rounded-xl shadow-xl bg-black  md:col-span-1 xl:col-span-2 md:w-[100%] max-md:h-72 "
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="h-full w-full flex items-end relative overflow-hidden
                 bg-cover md:bg-contain xl:bg-auto bg-center bg-no-repeat xl:bg-repeat"
            style={{
              backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(0,0,0,.01) 0%,
            rgba(0,0,0,1) 100%
          ),
          url(${slide.bgImage})
        `,
              backgroundBlendMode: "multiply",
            }}
          >
            <div className="text-white z-10 p-8 max-w-2xl pointer-events-none">
              <p className="text-[13px] font-medium uppercase text-amber-200 drop-shadow-lg">
                {slide.title}
              </p>
              <p className="text-[18px] opacity-90 line-clamp-1 my-1 font-bold">
                {slide.subtitle}
              </p>
              <p className="line-clamp-1 text-sm font-semibold">
                {slide.paragraph}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}

      <div className={`${styles.navigationButton} ${styles.prevButton}`}>
        <FaChevronLeft size={15} className="drop-shadow-lg" />
      </div>
      <div className={`${styles.navigationButton} ${styles.nextButton}`}>
        <FaChevronRight size={15} className="drop-shadow-lg" />
      </div>

      <div className={`${styles.pagination} `}></div>
    </Swiper>
  );
};

export default SwiperSlider;
