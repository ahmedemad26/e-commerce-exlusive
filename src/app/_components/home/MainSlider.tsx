"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import slider1 from "@/app/assets/images/slider-image-1.jpeg";
import slider2 from "@/app/assets/images/slider-image-2.jpeg";
import slider3 from "@/app/assets/images/slider-image-3.jpeg";
import Image from "next/image";
export default function MainSlider() {
  const swiperOptions = {
    pagination: {
      clickable: true,
      bulletClass: "swiper-pagination-bullet !size-3 border-2",
      bulletActiveClass:
        "swiper-pagination-bullet-active !bg-red-500 border-white",
    },
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    modules: [Pagination, Autoplay],
  };

  const images = [
    {
      path: slider1.src,
      tittle: "Slider One",
    },
    {
      path: slider2.src,
      tittle: "Slider Two",
    },
    {
      path: slider3.src,
      tittle: "Slider Three",
    },
  ];
  return (
    <section>
      <div className="container mx-auto px-20">
        <div>
          <Swiper {...swiperOptions}>
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={img.path}
                  alt={img.tittle}
                  width={1920}
                  height={344}
                  loading="lazy"
                  className="w-full h-[21.5rem] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
