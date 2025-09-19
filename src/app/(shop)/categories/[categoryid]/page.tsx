// app/categories/[categoryId]/page.tsx
import React from 'react';
import Image from 'next/image';
import { getCategoryDetailsById } from '@/services/categories.service';

interface Props {
  params: { categoryId: string };
}

export default async function CategoryDetails({ params: { categoryId } }: Props) {
  const { data: category, error } = await getCategoryDetailsById(categoryId);

  if (error) {
    return <p className="text-red-500 text-center mt-10">Failed to load category details.</p>;
  }

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">{category.name}</h1>

        <div className="w-full max-w-lg mx-auto">
          <Image
            src={category.image}
            alt={category.name}
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-xl shadow-lg"
            placeholder="blur"
            blurDataURL="/placeholder.png"
          />
        </div>

        <p className="text-gray-600 mt-6">
          Created at: {new Date(category.createdAt).toLocaleDateString('en-US')}
        </p>
      </div>
    </section>
  );
}
