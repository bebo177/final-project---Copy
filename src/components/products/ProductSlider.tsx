"use client"
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const swiperOptions = {
    pagination: {
        clickable:true,
        bulletClass: "swiper-pagination-bullet !size-4 border-2",
        bulletActiveClass: "swiper-pagination-bullet-active !bg-red-500 bordr-white",
    },
    modules: [Pagination],
};

export default function ProductSlider({images}: {images?: string[] }) {
  return (
     <Swiper className='main-slider' {...swiperOptions}>
         {Array.isArray(images) && images.length > 0 ? (
           images.map((img,idx) => (
             <SwiperSlide key={idx}>
                 <Image
                   src={img && img.trim() !== '' ? img : '/placeholder.png'}
                   alt={`${img}-${idx}`}
                   width={500}
                   height={500}
                   className='mx-auto w-full h-[37.5rem] object-contain bg-gray-100 '
                   unoptimized
                 />
             </SwiperSlide>
           ))
         ) : (
           <div className="w-full h-[21.5rem] flex items-center justify-center bg-gray-100">
             <p className="text-gray-500">No images available</p>
           </div>
         )}
     </Swiper>
  );
}
