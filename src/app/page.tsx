import CategoriesSection from "@/components/home/CategoriesSection";
import MainSlider from "@/components/home/MainSlider";
import ProductSection from "@/components/home/ProductSection";
import SkeltonCard from "@/components/shared/GridSkelton";
import { Suspense } from "react";


export default function Home() {
  return (
    <>
   <MainSlider />
   <Suspense fallback={<SkeltonCard/>}>
    <CategoriesSection />
   </Suspense>
   <Suspense fallback={<SkeltonCard/>}>
    <ProductSection />
   </Suspense>
  </>
  );
}
