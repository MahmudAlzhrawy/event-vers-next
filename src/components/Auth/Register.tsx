"use client"
import { useFormik } from "formik";
import * as Yup from 'yup';

export default function Register() {
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const formik = useFormik({
initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    image: ''
},
validationSchema: Yup.object().shape({
    name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
    role: Yup.string()
    .oneOf(['guest', 'organizer'], 'Role must be either guest or organizer')
    .required('Role is required'),
    image: Yup.mixed().required('Image URL is required')
}),
onSubmit: async () => {
    const formData = new FormData();
    formData.append('name', formik.values.name);
    formData.append('email', formik.values.email);
    formData.append('password', formik.values.password);
    formData.append('confirmPassword', formik.values.confirmPassword);
    formData.append('role', formik.values.role);
    if (formik.values.image) {
    formData.append('image', formik.values.image);
    }

    try {
    const res = await fetch(`${API_URL}/user/register`, {
        method: 'POST',
        body: formData,
    });

    if (res.ok) {
        const data = await res.json();
        alert('Registration successful! You can now log in.');
        window.location.href = '/login';
    } else {
        const data = await res.json();
        alert(data.message || 'Registration failed');
    }
    } catch (error) {
    alert('Network error. Please try again later.');
    console.error(error);
    }
},
});

return (
<div className="max-w-md mx-auto mt-10 p-6 bg-neutral-card rounded-xl shadow-lg">
    <h2 className="text-3xl font-extrabold text-text-heading text-center mb-6">Create an Account</h2>
    <form onSubmit={formik.handleSubmit} className="space-y-4">

    {/* Name */}
    <div>
        <label className="block text-sm font-medium text-text-body" htmlFor="name">Full Name</label>
        <input
        id="name"
        name="name"
        type="text"
        className="mt-1 w-full px-3 py-2 border border-neutral-border rounded-md focus:outline-none focus:ring-2 focus:ring-button-primary"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
        <div className="text-red-500 text-sm">{formik.errors.name}</div>
        )}
    </div>

    {/* Email */}
    <div>
        <label className="block text-sm font-medium text-text-body" htmlFor="email">Email Address</label>
        <input
        id="email"
        name="email"
        type="email"
        className="mt-1 w-full px-3 py-2 border border-neutral-border rounded-md focus:outline-none focus:ring-2 focus:ring-button-primary"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
        <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
    </div>

    {/* Password */}
    <div>
        <label className="block text-sm font-medium text-text-body" htmlFor="password">Password</label>
        <input
        id="password"
        name="password"
        type="password"
        className="mt-1 w-full px-3 py-2 border border-neutral-border rounded-md focus:outline-none focus:ring-2 focus:ring-button-primary"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
        <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}
    </div>

    {/* Confirm Password */}
    <div>
        <label className="block text-sm font-medium text-text-body" htmlFor="confirmPassword">Confirm Password</label>
        <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        className="mt-1 w-full px-3 py-2 border border-neutral-border rounded-md focus:outline-none focus:ring-2 focus:ring-button-primary"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
        )}
    </div>

    {/* Role */}
    <div>
        <label className="block text-sm font-medium text-text-body" htmlFor="role">Account Type</label>
        <select
        id="role"
        name="role"
        className="mt-1 w-full px-3 py-2 border border-neutral-border rounded-md focus:outline-none focus:ring-2 focus:ring-button-primary"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.role}
        >
        <option value="">Choose a role</option>
        <option value="guest">Guest</option>
        <option value="organizer">Organizer</option>
        </select>
        {formik.touched.role && formik.errors.role && (
        <div className="text-red-500 text-sm">{formik.errors.role}</div>
        )}
    </div>

    {/* Image Upload */}
        <div>
        <label className="block text-sm font-medium text-text-body" htmlFor="image">
            Profile Image
        </label>
        <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="mt-1 w-full px-3 py-2 border border-neutral-border rounded-md focus:outline-none focus:ring-2 focus:ring-button-primary"
            onChange={(event) => {
            const file = event.currentTarget.files?.[0];
            if (file) {
                formik.setFieldValue("image", file);
            }
            }}
            onBlur={formik.handleBlur}
        />
        {formik.touched.image && formik.errors.image && (
            <div className="text-red-500 text-sm">{formik.errors.image}</div>
        )}
    </div>

    {/* Submit Button */}
    <button
        type="submit"
        className="w-full py-2 px-4 bg-button-primary text-white rounded-md hover:bg-button-hover transition font-semibold"
    >
        Register
    </button>
    </form>
</div>
);
}
