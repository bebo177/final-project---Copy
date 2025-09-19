
import * as z from "zod";

export const addressFormSchema = z.object({
   cartId: z.string()
   .nonempty({message:"cartId is Required"}),

   details: z.string()
   .nonempty({message:"Address is Required"})
   .min(3,"Address must be at latest 3 characters long") ,

   city: z.string()
   .nonempty({message:"city is Required"})
   .min(3,"city must be at latest 3 characters long") ,


   phone: z.string()
   .nonempty({message:"phone is required"})
   .regex(/^(002|\+2)?01[0-25][0-9]{8}$/, {
    message:"Invalid egyption phone number"
 }),
paymentMethod: z.enum(["cash","card"],{
  message: "Payment mesthod is required",
}),



});

export type addressFormType = z.infer<typeof addressFormSchema>


export const addressformState = {
  success:false,
  error:{
    cartId:[],
     details:[],
      city:[],
      phone:[],
      paymentMethod:[],
  },
  message:null,
  callbackUrl: "",
};

export type addressfromStateType= {
    success:boolean;
    error:{
      cartId?:[];
        details?:string[];
        city?:string[];
        phone?:string[];
        paymentMethod?:[];
    }
    message:string | null;
    callbackUrl?: string;
}
