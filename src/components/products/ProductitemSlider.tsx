"use client";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

type ProductItemSliderProps = {
  images: string[];
  productId: string;
  title: string;
};

export default function ProductItemSlider({ images, title }: ProductItemSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const validImages =
    Array.isArray(images) && images.length > 0
      ? images.filter((img) => img && img.trim() !== "")
      : ["/placeholder.png"];

  return (
    <div className="flex gap-2">
      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="w-16">
          <Swiper
            direction="vertical"
            spaceBetween={8}
            slidesPerView={3}
            onSwiper={setThumbsSwiper}
            watchSlidesProgress
            modules={[Thumbs]}
            className="h-[15.625rem]"
          >
            {validImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <Image
                  src={img}
                  alt={`thumb-${idx}`}
                  width={80}
                  height={80}
                  className="cursor-pointer rounded-md border border-gray-200 hover:border-red-500 object-contain bg-gray-100"
                  unoptimized
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Main Image */}
      <div className="flex-1">
        <Swiper
          spaceBetween={10}
          navigation
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[Navigation, Thumbs]}
        >
          {validImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={img}
                alt={`${title}-${idx}`}
                width={270}
                height={250}
                className="w-full h-[15.625rem] object-contain bg-gray-100 rounded-lg"
                unoptimized
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
