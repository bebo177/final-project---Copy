
import { NextAuthOptions } from "next-auth";
 import CredentialsProvider from "next-auth/providers/credentials";



 export const authOptions: NextAuthOptions ={
    providers:[
        CredentialsProvider ({
            name:"credentials",
            credentials: {
                email: {name:"email",type:"email",placeholder:"username@domain"},
                password:{name:"password",type:"password",placeholder:"password"}

            },
            authorize:async (credentials) => {
                console.log(credentials);


                try{
                    const res = await fetch (`${process.env.API_BASE_URL}/api/v1/auth/signin`,
                        {
                            method:"POST",
                            headers:{
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: credentials?.email,
                                password: credentials?.password,
                            }),
                        }

                    );

                    const data = await res.json();
                    console.log("Signin API Response:", data);

                    if (!res.ok) {
                        throw new Error(data.message || "somethin went wrong");
                    }

                      const decoded =  JSON.parse (atob(data.token.split('.')[1]));


                  return {
                    id:decoded.id,
                    user: data.user,
                    token: data.token,
                  };
                }catch (error){
                    console.log(error);


                    throw new Error((error as  Error).message);
                }


            }

        })
    ],

callbacks:{
async jwt({token , user }){
    if (user) {
        token.user = user.user;
        token.token = user.token;
    }
    return token ;

},
async session({ session,  token }) {
    if(token){
        session.user = token.user
    }
      return session
    },
},


    pages:{
        signIn: "/login",
    },
};


export async function forgotPassword(email: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to send reset email",
      };
    }

    return {
      success: true,
      message: data.message || "Reset email sent successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function changePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to change password",
      };
    }

    return {
      success: true,
      message: data.message || "Password changed successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
