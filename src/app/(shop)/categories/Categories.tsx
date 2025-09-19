
import { ICategory } from "@/interface/category.interface";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesGrid({ categories }: { categories: ICategory[] }) {
  return (
    <div className="w-[90%] mx-auto mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`/categories/${category._id}`}
          className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
        >
          <div className="relative w-full h-48 sm:h-56">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
              placeholder="blur"
              blurDataURL="/placeholder.png"
            />
          </div>

          <div className="p-4">
            <h3 className="text-lg font-bold mb-2 line-clamp-1 transition-colors">
              {category.name}
            </h3>
            <p className="text-gray-500 text-sm">
              {new Date(category.createdAt).toLocaleDateString("en-US")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
