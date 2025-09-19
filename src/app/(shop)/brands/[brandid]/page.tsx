// app/brands/[brandId]/page.tsx
import { getBrandDetailsById } from "@/services/brand.service";
import Image from "next/image";

interface Props {
  params: { brandId: string };
}

export default async function BrandDetails({ params: { brandId } }: Props) {
  const { data: brand, error } = await getBrandDetailsById(brandId);

  if (error) {
    return <p className="text-red-500 text-center mt-10">Failed to load brand details.</p>;
  }

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">{brand.name}</h1>

        <div className="w-full max-w-lg mx-auto">
          <Image
            src={brand.image}
            alt={brand.name}
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-xl shadow-lg"
            placeholder="blur"
            blurDataURL="/placeholder.png"
          />
        </div>

        <p className="text-gray-600 mt-6">
          Created at: {new Date(brand.createdAt).toLocaleDateString("en-US")}
        </p>

        {/* هنا ممكن تضيف أي منتجات مرتبطة بالبراند لو حابب */}
      </div>
    </section>
  );
}
