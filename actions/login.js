"use server";
import { signIn } from "@/auth";

const loginHandler = async (FormData) => {


    const email = FormData.get("email");
    const password = FormData.get("password");
    try {
        await signIn("credentials", { email, password, redirect: false });
        // Redirect to home page after successful login
        // redirect('/');
    } catch (error) {
        // console.log(error);

        return error.cause;
    }
};

export default loginHandler;