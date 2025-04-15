import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { loginUser } from "../utils/api.js";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

const SignIn = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const { loading, error, fetchData } = useAxios();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetchData(() => loginUser(form));
        if (res?.statusCode === 200) {
            dispatch(setUser({ user: res.data.user, token: res.data.accessToken }));
            navigate("/");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white px-4">
            <div className="flex gap-2 items-center mb-4">
                <img
                    src="https://res.cloudinary.com/dxsffcg6l/image/upload/v1744696002/Avid-Logo_hgdvr3.png"
                    className="w-12 h-12"
                />
                <h1 className="text-3xl font-bold mb-2">Sign In</h1>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
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
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>

            <p className="mt-6 text-sm text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default SignIn;
