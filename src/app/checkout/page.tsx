"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { useActionState, useEffect } from "react"
import { addressFormSchema, addressformState, addressFormType } from "@/schema/address.schema"
import { handlePayment } from "@/services/order.service"
import { useCart } from "@/context/CartContext"

export default function CheckoutPagePage() {
  const {cartDetails, setCartDetails} = useCart()
  const [action, formAction]= useActionState(handlePayment,addressformState);
const router = useRouter()
const form = useForm<addressFormType>({
  resolver: zodResolver(addressFormSchema),
  defaultValues: {
    cartId:"",
    details:"",
    city:"",
    phone:"",
    paymentMethod:"cash",
  },
});

useEffect(()=>{
if(cartDetails){
    form.setValue("cartId",cartDetails.cartId);
}
},[cartDetails , form]);

console.log(action);

useEffect(()=>{
    let timeout: NodeJS.Timeout;
    if(action){
        if(action.success && action.message){
            if(action.paymentMethod === "cash"){
                toast.success(action.message,{
                    position:"top-center",
                });
                setCartDetails(null);
                timeout = setTimeout(() => {
                router.push(action.callbackUrl="/allorders");
                },2000);
            }else {
                window.location.href = action.callbackUrl as string ;
            }
        }

         else if(!action.success && action.message){
            toast.error(action.message,{
                position: "top-center"
            });
        }
    }

return () => {
    if(timeout){
        clearTimeout(timeout);
    }
}



}, [action, router,setCartDetails,form]);

return (
<section className="py-20">
  <div className="max-w-2xl mx-auto">
    <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <Form {...form}>
      <form action={formAction}  className="space-y-8">
        {/************** cartId field  *************/}
        <FormField

          control={form.control}
          name="cartId"
          render={({ field }) => (
            <FormItem hidden>
              <FormControl>
                <Input  {...field} value={cartDetails?.cartId} />
              </FormControl>
            </FormItem>
          )}
        />
        {/************** details field  *************/}
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Address Details</FormLabel>
              <FormControl>
                <Input placeholder="Address Details" {...field} />
              </FormControl>
              <FormMessage>
                {action?.error?.details?.[0]}
              </FormMessage>
            </FormItem>
          )}
        />
        {/************** city field  *************/}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>city</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field}
                 />
              </FormControl>
               <FormMessage>
                {action?.error?.city?.[0]}
              </FormMessage>
            </FormItem>
          )}
        />
        {/************** phone  *************/}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone"
                {...field}
                 type="tel"
                 />
              </FormControl>
              <FormMessage>
                {action?.error?.phone?.[0]}
              </FormMessage>
            </FormItem>
          )}
        />
        {/************** payment method *************/}
    <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={"cash"}
                  name={field.name}
                  className="flex flex-col">
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="cash" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Cash
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="card" />
                    </FormControl>
                    <FormLabel className="font-normal">
                     Card
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  </div>
</section>
  )
}
