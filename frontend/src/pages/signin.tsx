import React, { useState, type ChangeEvent } from "react";
import Logo from "../components/logo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { useNavigate, Link, redirect } from "@tanstack/react-router";
import LoadingComponent from "../components/loading";

export default function Signin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authStatus"] });
      console.log('Navigation to /')
      navigate({ to: "/" });
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  if (mutation.isPending) {
    return <LoadingComponent />;
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-white">
      <Logo />

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl  sm:w-[70%] md:w-[50%] xl:w-[36%] mt-6 p-8 shadow flex flex-col gap-4 bg-[rgba(242,243,237,0.84)]"
      >
        <h2 className="text-2xl italic font-lora text-center underline">Sign In</h2>

        {mutation.isError && (
          <p className="text-red-500 text-sm text-center">{mutation.error.message}</p>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
            required
            autoComplete="username"
            className="px-4 py-2 rounded-3xl w-full shadow shadow-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="px-4 py-2 rounded-3xl w-full shadow shadow-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-black cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-2">
          <button
            type="reset"
            onClick={() => setForm({ username: "", password: "" })}
            className="border rounded-full py-2 px-6 text-black w-full cursor-pointer hover:bg-gray-100 transition"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={!form.username || !form.password}
            className="border rounded-full py-2 px-6 bg-black text-white w-full cursor-pointer hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign In
          </button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-black font-medium underline hover:text-gray-700">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

