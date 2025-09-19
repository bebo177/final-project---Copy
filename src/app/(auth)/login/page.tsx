"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {signIn} from "next-auth/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"

const loginFormSchema = z.object({
  email: z.email ({
    message: "Please Enter A Valid Email Address. ",
  }),password: z.
  string()
  .nonempty({message:"Password Is Required"})
  .min(6,"Password must be at least 6 characters long"),
});

type LoginFormPayload = z.infer<typeof loginFormSchema>




export default function LoginPage() {
const router = useRouter()
const form = useForm<LoginFormPayload>({
  resolver: zodResolver(loginFormSchema),
  defaultValues: {email:"",password:""},
});
async function onSubmit(values:LoginFormPayload) {
//console.log(values);
try {
const res = await  signIn('credentials',{
    email:values.email,
    password:values.password,
    redirect: false,
    callbackUrl:"/"
  });
console.log(res);


if(res?.ok){
//home
toast.success("Login successfully",{
  position: "top-center"
});
router.push("/")

}else{
//shown error
toast.error(res?.error || "somethin went wrong",{
  position: "top-center"
});

}
} catch (error) {
  console.log(error);

}
}
  return (
<section className="py-20">
  <div className="max-w-2xl mx-auto">
    <h1 className="text-3xl font-bold mb-8">Login</h1>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">



        {/************** Email field  *************/}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="username@domain.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/************** Password field  *************/}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="**********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Forgot Password Link */}
        <p className="mt-4 text-sm text-gray-500">
          Forgot your password?{" "}
          <Link
            href="/forget"
            className=" text-black hover:underline"
          >
            Reset it here
          </Link>
        </p>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  </div>
</section>
  )
}
