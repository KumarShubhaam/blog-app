import { useState, useRef } from 'react';
import { useForm, type ChangeHandler, type SubmitHandler, type UseFormRegisterReturn } from 'react-hook-form';
import { signup, userNameExists } from '../api/auth';
import { UserInputSchema, type UserInput } from '@blog-app/shared';
import Logo from '../components/logo';
import { useNavigate, Link } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, setError, clearErrors, formState: { isSubmitting, errors } } = useForm<UserInput>({
    // defaultValues: {
    //   name: { firstName: "", lastName: "" },
    //   username: "",
    //   password: "",
    //   email: "",
    //   gender: undefined,
    // },
    resolver: zodResolver(UserInputSchema),
  });
  const navigate = useNavigate();
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const submitForm: SubmitHandler<UserInput> = async (userInput) => {
    const result = await signup(userInput);
    if (result === null) {
      console.error('Could not sign up');
      return;
    }
    navigate({ to: "/signin" });
  };

  const validateUsernameAvailability: ChangeHandler = async (event) => {
    const currentUsername = (event.target as HTMLInputElement).value;
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    };

    debounceTimer.current = setTimeout(async () => {
      if (!currentUsername) return;
      try {
        const isTaken = await userNameExists(currentUsername.toLowerCase());
        if (isTaken) {
          setError('username', { type: 'not_available', message: 'Username already taken' });
        } else {
          clearErrors('username');
        }
      } catch {
        setError('username', { type: 'server', message: 'Could not check username availability' });
      }
    }, 1000);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-white py-8">
      <Logo />

      <form
        onSubmit={handleSubmit(submitForm)}
        className="rounded-2xl sm:w-[70%] md:w-[50%] xl:w-[36%] mt-6 p-8 shadow flex flex-col gap-4 bg-[rgba(242,243,237,0.84)]"
      >
        <h2 className="text-2xl italic font-lora text-center underline">Create Account</h2>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <InputField register={register('name.firstName')} placeholder="First Name" type="text" />
            {errors.name?.firstName && <ErrorMessage message={errors.name.firstName.message} />}
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <InputField register={register('name.lastName')} placeholder="Last Name" type="text" />
            {errors.name?.lastName && <ErrorMessage message={errors.name.lastName.message} />}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Username</label>
          <InputField
            register={register('username', { onChange: validateUsernameAvailability })}
            placeholder="Choose a username"
            type="text"
          />
          {errors.username && <ErrorMessage message={errors.username.message} />}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <InputField register={register('email')} placeholder="Enter your email" type="email" />
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <InputField register={register('password')} placeholder="Create a password" type={showPassword ? "text" : "password"} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-black cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <ErrorMessage message={errors.password.message} />}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <select
            {...register('gender')}
            className="px-4 py-2 rounded-3xl w-full shadow shadow-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black text-gray-700"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <ErrorMessage message={errors.gender.message} />}
        </div>

        <div className="flex justify-between gap-4 mt-2">
          <button
            type="reset"
            className="border rounded-full py-2 px-6 text-black w-full cursor-pointer hover:bg-gray-100 transition"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="border rounded-full py-2 px-6 bg-black text-white w-full cursor-pointer hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-2">
          Already have an account?{" "}
          <Link to="/signin" className="text-black font-medium underline hover:text-gray-700">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

type InputFieldType = {
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  register: UseFormRegisterReturn;
};

function InputField({ register, placeholder, type }: InputFieldType) {
  return (
    <input
      {...register}
      placeholder={placeholder}
      type={type}
      className="px-4 py-2 rounded-3xl w-full shadow shadow-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black"
    />
  );
}

type ErrorMessageProps = {
  message?: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  return <span className="text-red-500 text-xs block">{message}</span>;
}