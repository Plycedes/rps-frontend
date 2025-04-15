import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { registerUser } from "../utils/api";

const SignUp = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const { loading, error, request } = useAxios();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await request(() => registerUser(form));
        if (res?.statusCode === 200) {
            navigate("/sign-in");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white px-4">
            <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full p-3 bg-primary rounded hover:bg-purple-700 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
            </form>

            <p className="mt-6 text-sm text-gray-400">
                Already have an account?{" "}
                <Link to="/signin" className="text-primary hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default SignUp;
