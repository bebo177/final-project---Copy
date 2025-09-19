
import * as z from "zod";

export const registerFormSchema = z.object({
   name: z.string().nonempty({message:"Name is Required"})
   .min(3,"Name must be at latest 3 characters long") ,
   email: z.email({
     message: "Please Enter A Valid Email Address. ",
   }),
   password: z.
   string()
   .nonempty({message:"Password Is Required"})
   .min(6,"Password must be at least 6 characters long"),
   rePassword: z.string()
   .nonempty({message:"rePassword is required"})
   .min(6,"rePassword must be at least 6 characters long"),
   phone: z.string().nonempty({message:"phone is required"}).regex(/^(002|\+2)?01[0-25][0-9]{8}$/, {
    message:"Invalid egyption phone number"
}),
})
.refine((data) => data.password === data.rePassword ,{
    message: "Passwords do not match",
    path:["rePassword"],
});

export type RegisterSchema = z.infer<typeof registerFormSchema>


export const formState = {
  success:false,
  error:{},
  message:null,
};

export type fromStateType= {
    success:boolean;
    error:{
        name?:string[];
        email?:string[];
        password?:string[];
        rePassword?:string[];
        phone?:string[];
    }
    message:string | null;
}
