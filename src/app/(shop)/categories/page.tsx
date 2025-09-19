import React from 'react'
import CategoryCard from '../categories/Categories';

export default async function page() {


   async function getCategories() {
     const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories', { cache: 'force-cache' })
     const data = await res.json()
     console.log('data from server', data.data);

     return data.data

   }

    const categories = await getCategories()






  return (
    <>
      <h2 className= ' mt-5  ml-20  text-3xl font-bold'>All Categories</h2>

      <CategoryCard categories={categories} />
    </>
  )
}
