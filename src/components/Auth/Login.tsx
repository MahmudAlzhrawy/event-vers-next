"use client"
import { useFormik } from "formik";
import * as Yup from 'yup';
export default function Login() {
    const formik = useFormik({
        initialValues:{
            password:'',
            email:''
        },
        validationSchema:Yup.object().shape({
            email:Yup.string().email('Invalid email address').required('Email is required'),
            password:Yup.string().min(6, 'Password must be at least 6 characters')
            .required('Password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')  
        }), 
        onSubmit:async(values)=>{
            const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    email: values.email,
                    password: values.password
                })
            })
            if(res.ok){
                const data = await res.json();
                localStorage.setItem('token', data.token);
                window.location.href = '/';
            } else {
                const errorData = await res.json();
                alert(errorData.message || 'Login failed');
            }
        }
    })

    return(
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                    <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                    <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                ) : null}
            </div>
            <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>
        </form>
        </div>
    )

}