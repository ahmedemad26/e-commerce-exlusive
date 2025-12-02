import MainSlider from "./_components/home/MainSlider";
import CategoriesSection from "./_components/home/CategoriesSection";
import ProductsSection from "./_components/home/ProductsSection";
import { Suspense } from "react";
import { SkeletonCard } from "./_components/shared/SkeletonCard";

export default function Home() {
  return (
    <>
      <MainSlider />
      <Suspense fallback={<SkeletonCard />}>
        <CategoriesSection />
      </Suspense>
      <Suspense fallback={<SkeletonCard />}>
        <ProductsSection />
      </Suspense>
    </>
  );
}
