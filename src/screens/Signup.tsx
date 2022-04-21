import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import Spinner from "../icons/Spinner";
import { signup } from "../services/auth.service";
import { toast } from "react-toastify";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<signUpForm>({} as signUpForm);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const form = {
    firstName: Joi.string().required().min(3).max(30).label("First name"),
    lastName: Joi.string().required().min(3).max(30).label("Last name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().min(3).max(15).required().label("Password"),
    confirmPassword: Joi.any()
      .required()
      .equal(password)
      .label("Confirm password")
      .options({
        messages: { "any.only": "{{#label}} does not match with password" },
      }),
  };

  const handleChange = (
    element: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { name, value } = element.target;
    const validate = { [name]: value };

    const schemaProp = Joi.object({
      [name]: form[name as keyof typeof form] as Joi.SchemaLike,
    });

    const { error } = schemaProp.validate(validate);

    if (error) {
      const errorDetails = { [name]: error.details[0].message };
      setErrors({ ...errors, ...errorDetails });
    } else {
      const errorDetails = { [name]: "" };
      setErrors({ ...errors, ...errorDetails });
    }

    setState(element.target.value);
  };

  const handleSave = async () => {
    const formData: signUpForm = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    const schema = Joi.object({ ...form });
    const { error } = schema.validate(formData);
    if (error) {
      const errorDetails = {} as {
        [x: string]: string;
      };
      for (let item of error.details) {
        if (item.context?.key) errorDetails[item.context?.key] = item.message;
      }
      setErrors({ ...errors, ...errorDetails });
      return;
    }
    try {
      setIsProcessing(true);
      delete formData.confirmPassword;
      await signup(formData);
      toast.success("Signed up successfully!");
      navigate("/posts", { replace: true });
    } catch {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-gray-200 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10 py-5 bg-white shadow-xl rounded-md">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Sign up
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Provide details to access your account
            </p>
          </div>
          <div className="m-7">
            <form action="">
              <Input
                type="text"
                label="First name"
                name="firstName"
                placeholder="John"
                autoFocus={true}
                value={firstName}
                onChnage={(val: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(val, setFirstName)
                }
                error={errors.firstName ?? errors.firstName}
              />
              <Input
                type="text"
                label="Last name"
                name="lastName"
                placeholder="Smith"
                value={lastName}
                onChnage={(val: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(val, setLastName)
                }
                error={errors.lastName ?? errors.lastName}
              />
              <Input
                type="email"
                label="Email address"
                name="email"
                placeholder="you@company.com"
                value={email}
                onChnage={(val: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(val, setEmail)
                }
                error={errors.email ?? errors.email}
              />
              <Input
                type="password"
                label="Password"
                name="password"
                placeholder="Your password"
                value={password}
                onChnage={(val: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(val, setPassword)
                }
                error={errors.password ?? errors.password}
              />
              <Input
                type="password"
                label="Confirm password"
                name="confirmPassword"
                placeholder="Re-type your password"
                value={confirmPassword}
                onChnage={(val: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(val, setConfirmPassword)
                }
                error={errors.confirmPassword ?? errors.confirmPassword}
              />
              <div className="mb-6">
                <button
                  type="button"
                  className={`w-full px-3 py-4 flex justify-center items-center text-white bg-tealsecondary rounded-md focus:outline-none ${
                    isProcessing ?? "cursor-not-allowed"
                  }`}
                  onClick={() => handleSave()}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Spinner className="text-white h-5 w-5" />
                  ) : null}

                  {isProcessing ? "Processing..." : "Create account"}
                </button>
              </div>
              <p className="text-sm text-center text-gray-400">
                Already have an account yet?{" "}
                <a
                  href="/login"
                  className="text-indigo-400 underline focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                >
                  Login
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const Input = ({
  label,
  type,
  name,
  value,
  placeholder,
  autoFocus,
  onChnage,
  error,
}: InputProps) => {
  return (
    <div className={`${error ? "mb-0" : "mb-6"}`}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
      >
        {label}
      </label>
      <input
        type={type}
        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-tealprimary-400 focus:ring focus:ring-tealprimary focus:border-tealprimary-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        autoComplete="off"
        autoCorrect="off"
        autoSave="off"
        onChange={onChnage}
      />
      <div className="text-sm text-red-500 mt-1">{error ?? error}</div>
    </div>
  );
};

type signUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type InputProps = {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  autoFocus?: boolean;
  onChnage: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
};

export default Signup;