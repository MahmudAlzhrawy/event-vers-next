import Login from "@/components/Auth/Login";
import { Metadata } from "next";



export const generateMetadata = ():Metadata => {
    return {
        title: 'Login',
        description: 'Login to your account',
    };
}

export default function LoginPage() {

    return(
        <>
            <Login/>
        </>
    )
}