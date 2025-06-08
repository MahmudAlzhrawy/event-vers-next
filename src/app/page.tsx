
export default function Home() {
  return (<>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Our Application</h2>
        <p className="text-gray-600 text-center mb-4">Please log in to continue.</p>
        <a href="/login" className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
          Go to Login
        </a>
      </div>
    </div>
    <footer className="text-center text-gray-500 text-sm mt-8">
      &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
    </footer>
  </>
  );
}
