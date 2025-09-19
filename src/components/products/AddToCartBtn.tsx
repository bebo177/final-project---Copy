"use client"
import React, { useTransition } from 'react'
import { Button } from '../ui/button'
import { addToCart } from '@/services/cart.service';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { LoaderCircle } from 'lucide-react';

export default function AddToCartBtn({
    productId,
     ...props
    }: {
     productId:string;
     [key: string] : string;
} ) {
const [isPending, startTransition] =   useTransition();
const { getCartDetails } = useCart()
      async function addProductToCart(productId:string){
    startTransition(async ()=>{
                const res = await  addToCart(productId);
        console.log(res);

        if(res.success){
            toast.success(res.message, {position: "top-center"});
            getCartDetails();
        } else{
            toast.error(res.message, {position:"top-center"})
        }
    })
      }

  return (
     <Button disabled={isPending}
     onClick={()=> addProductToCart(productId)}
      {...props}>
      {isPending? <LoaderCircle className='animate-spin'/>:"Add to Cart"}
      </Button>
  )
}
