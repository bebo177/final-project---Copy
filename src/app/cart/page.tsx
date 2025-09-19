"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCart } from "@/context/CartContext";
import { removeFromCart, removeUserCart, updateQtyProductCart } from "@/services/cart.service";
import { Badge, X } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { toast } from "sonner";

export default function CartPage() {
  const {cartDetails, setCartDetails} =useCart();


async function removeCartItems(){
  const res = await removeUserCart();
  if (res?.message === "success"){
    toast.success("Cart removed successfully");
    setCartDetails(null);
  } else {
    toast.error(res?.message || "something went wrong ")
  }
}


async function removeProductFromCart(productId:string){
  const res = await removeFromCart(productId);
  console.log(res.data);

  if(res.success){
    toast.success(res.message, {position: "top-center"});
    setCartDetails(res.data);
  }else{
    toast.error(res.message, {position: "top-center"});
  }
}

async function updateQuantityProductCart(productId:string , count: number){
  const res = await updateQtyProductCart(productId, count);
  console.log(res.data);

  if(res.success){
    toast.success(res.message, {position: "top-center"});
    setCartDetails(res.data);
  }else{
    toast.error(res.message, {position: "top-center"});
  }
}


  return(
<section className="py-20">
  <div className="container mx-auto">
 {cartDetails ?(
  <>
  <section className="mb-20">
<Table className="mb-6">
  <TableHeader>
    <TableRow>
      <TableHead>Product</TableHead>
      <TableHead>Price</TableHead>
      <TableHead>Quaintly</TableHead>
      <TableHead className="text-right">Subtotal</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {
    cartDetails.data.products.map((product)=>(
    <TableRow key={product._id}>
      <TableCell className="font-medium">
        <div className="flex items-center gap-5 relative">
          <Badge
          onClick={() => removeProductFromCart(product.product._id)
          }
          className="absolute text-red-900 -top-0.5 -start-0.5 h-3 min-w-5 rounded-full px-1 font-mono tabular-nums cursor-pointer "
        >
         <X />
          </Badge>
        <Image
  src={product.product.imageCover}
  alt={product.product.title}
  width={54}
  height={54}
/>

        <h2>{product.product.title}</h2>
        </div>
        </TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>
       <div className="flex items-center gap-4">
        <Button variant=
        {"outline"}
        size={"sm"}
        onClick={()=>updateQuantityProductCart
          (product.product._id, product.count-1)
        }

        >
  -
</Button>
{product.count}
<Button
 variant={"outline"}
  size={"sm"}
   onClick={()=>updateQuantityProductCart
          (product.product._id, product.count+1)
        }

  >
  +
</Button>
       </div>
      </TableCell>
      <TableCell className="text-right">
        {product.count * product.price}
        </TableCell>
    </TableRow>

  ))}
  </TableBody>
</Table>

<div className="flex justify-between">
    <Button variant="outline">
    <Link href={"/products"}>return to shop</Link>
    </Button>

    <Button
    onClick= {removeCartItems}
    variant="destructive">
      Remove all
    </Button >
</div>
   </section>
<section className="flex justify-between">
    <div className="flex items-center gap-4 w-5/12">
    <Input placeholder="Coupon Code" />
    <Button variant="destructive">Apply coupon</Button>
    </div>
    <div className=" w-5/12 py-8 px-6 border border-gray-950" >
      <h3 className="font-bold mb-6 text-xl">cart total</h3>
      <ul className="divide-y divide-gray-950">
        <li className="py-6 flex justify-between">
           <span>Subtotal:</span>
           <span>{cartDetails.data.totalCartPrice}</span>
        </li>
        <li className="py-6 flex justify-between">
           <span>Shipping:</span>
           <span>free</span>
        </li>
        <li className="py-6 flex justify-between">
           <span>Total:</span>
           <span>{cartDetails.data.totalCartPrice}</span>
        </li>
      </ul>
      <div className="flex justify-center">
        <Button variant={"destructive"} asChild>
          <Link href={"/checkout"}>
        Proceed to checkout
        </Link>
      </Button>
      </div>
    </div>
</section>
</>
):(
 <div className=" flex flex-col items-center justify-center">
  <h2 className="text-2xl font-semibold">Your cart is empty</h2>
  <Button variant="outline">
    <Link href={"/product"}>return to shop</Link>
    </Button>
 </div>
)}

  </div>
 </section>
  );
}
