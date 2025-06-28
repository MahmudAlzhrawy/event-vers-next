"use client"
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from 'yup';

export default function Login() {
const formik = useFormik({
initialValues: {
    email: '',
    password: ''
},
validationSchema: Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
}),
onSubmit: async (values) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
    });

    if (res.ok) {
    const data = await res.json();
    alert('Login successful!');
    localStorage.setItem('EventVerseToken', data.token);
    localStorage.setItem('EventVerseRole', data.data.role);
    localStorage.setItem('EventVerseId', data.data._id);


    window.location.href = '/events';
    } else {
    const errorData = await res.json();
    alert(errorData.message || 'Login failed');
    }
}
});

return (
<div className="min-h-screen bg-neutral-background flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
    <h2 className="text-3xl font-bold text-center text-textHeading mb-6">Welcome Back 👋</h2>

    <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
        <label htmlFor="email" className="block text-sm font-medium text-textBody mb-1">Email</label>
        <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full px-4 py-2 border border-neutral-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark"
            placeholder="you@example.com"
        />
        {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
        )}
        </div>

        {/* Password Field */}
        <div>
        <label htmlFor="password" className="block text-sm font-medium text-textBody mb-1">Password</label>
        <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full px-4 py-2 border border-neutral-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark"
            placeholder="********"
        />
        {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.password}</p>
        )}
        </div>

        {/* Submit Button */}
        <button
        type="submit"
        className="w-full bg-button-primary text-white py-2 rounded-md hover:bg-button-hover transition-all duration-300 font-semibold"
        >
        Login
        </button>
    </form>
    <div className="py-2 text-center">
        <p className="text-sm font-serif font-bold text-text-muted">Did you haven't an account?<Link href="/register" className="text-lg text-text-link">Sign up</Link> </p>
    </div>
    </div>
</div>
);
}
