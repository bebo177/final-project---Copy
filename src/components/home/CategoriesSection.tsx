import { ICategory } from "@/interface/category.interface";
import {  getCategories  } from "@/services/categories.service"
import React from 'react'
import CategoriesSlider from "./CategoriesSlider";
import SectionTitle from "../shared/SectionTitle";
import { Separator } from "@radix-ui/react-separator";

export default async function CategoriesSection() {
const { data :categories} :{data: ICategory[]} = await getCategories();
console.log(categories);

 return ( <section className="py-10">
    <div className="container mx-auto">

       <SectionTitle title={"Categories"} subtitle={"Browse By Category"} />

        <CategoriesSlider categories={categories}/>

       <Separator />
    </div>
   </section>
 );
}
