"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
export default function ProductSlider({ images }: { images: string[] }) {
  const swiperOptions = {
    pagination: {
      clickable: true,
      bulletClass: "swiper-pagination-bullet !size-3 border-2",
      bulletActiveClass:
        "swiper-pagination-bullet-active !bg-red-500 border-white",
    },
    loop: true,
    modules: [Pagination],
  };
  return (
    <Swiper {...swiperOptions}>
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <Image
            src={img}
            alt={`${img}-${index}`}
            width={500}
            height={500}
            loading="lazy"
            className="w-full h-[37.5rem] object-contain mx-auto"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
