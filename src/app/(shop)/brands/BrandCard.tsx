// components/brands/BrandCard.tsx
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { IBrand } from "@/interface/brand.interface";
import Link from "next/link";

export default function BrandCard({ brand }: { brand: IBrand }) {
  return (
    <Link href={`/brands/${brand._id}`}>
      <Card className="group bg-white rounded-md overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer">
        <div className="relative w-full h-40 sm:h-48">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
            placeholder="blur"
            blurDataURL="/placeholder.png"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg text-center font-bold mb-2 line-clamp-1 hover:text-red-600 transition-colors">
            {brand.name}
          </h3>
          <p className="text-gray-500 text-sm text-center">
          </p>
        </div>
      </Card>
    </Link>
  );
}
