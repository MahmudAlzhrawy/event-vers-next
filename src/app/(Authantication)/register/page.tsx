import Register from "@/components/Auth/Register";
import { Metadata } from "next";



export const generateMetadata = ():Metadata => {
    return {
        title: 'Register',
        description: 'Create a new account',
    };
}

export default function RegisterPage() {

    return(
        <Register />
    )
}