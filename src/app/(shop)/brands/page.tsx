import React from 'react'

import { IBrand } from '../../../interface/brand.interface';
import BrandCard from '../brands/BrandCard';

export default async function page() {

async function getBrands() {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands', { cache: 'force-cache' })
 const finalRes = await res.json()
 console.log('data from server', finalRes.data);
    return finalRes.data
}
    const brands = await getBrands()


  return (
    <div>
      <h2 className= ' mt-5  ml-20 text-3xl font-bold'>All Brands</h2>

     <div className=" w-[90%] mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">


      {brands.map((brand: IBrand) => (
        <BrandCard key={brand._id} brand={brand} />
      ))}
    </div>
    </div>
  )
}
