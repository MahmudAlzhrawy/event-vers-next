"use client"
import { useFormik } from "formik";
import * as Yup from 'yup';
export default function Register() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const formik = useFormik({
        initialValues:{
            password:'',
            email:'',
            name:'',
            role:'',
            confirmPassword:'',
            image:''
        },
        validationSchema:Yup.object().shape({
            email:Yup.string().email('Invalid email address').required('Email is required'),
            password:Yup.string().min(6, 'Password must be at least 6 characters')
            .required('Password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
            confirmPassword:Yup.string().oneOf([Yup.ref('password'), ' '], 'Passwords must match')
            .required('Confirm Password is required'),
            name:Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
            role:Yup.string().oneOf(['guest', 'organizer'], 'Role must be either guest or organizer').required('Role is required'),
            image:Yup.string().required('Image URL is required')
        }),
        onSubmit:async()=>{
            const formData = new FormData();
            formData.append('name', formik.values.name);
            formData.append('email', formik.values.email);
            formData.append('password', formik.values.password);
            formData.append('confirmPassword', formik.values.confirmPassword);
            formData.append('role', formik.values.role);
            if (formik.values.image) {
            formData.append('image', formik.values.image);
            }
            console.log(API_URL)
            const res= await fetch(`${API_URL}/user/register`,{
                method:'POST',
                body:formData
            })
            if(res.ok){
                const data = await res.json();
                console.log(data);
                alert('Registration successful! You can now log in.');
                window.location.href = '/';

            } else {
                const errorData = await res.json();
                alert(errorData.message || 'Registration failed');
            }
        }
    })

return(
<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
    <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
        <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
        />
    </div>
    <div className="mb-4">
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
    <div className="mb-4">
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
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">Confirm Password</label>
        <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
        ) : null}

    </div>
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="role">Role</label>
        <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            id="role"
            name="role"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
        >
            <option value="">Select Role</option>
            <option value="guest">Guest</option>
            <option value="organizer">Organizer</option>
        </select>
        {formik.touched.role && formik.errors.role ? (
            <div className="text-red-500 text-sm">{formik.errors.role}</div>
        ) : null}

    </div>
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="image">Image</label>
        <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            id="image"
            name="image"
            type='file'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.image}
        />
        {formik.touched.image && formik.errors.image ? (
            <div className="text-red-500 text-sm">{formik.errors.image}</div>
        ) : null}
    </div>
    <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Register</button>
    </form>   

</div>
)
}