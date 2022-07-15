import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Joi from "joi";
import Spinner from "../icons/Spinner";
import { login } from "../services/auth.service";
import { logoutUser, setUser } from "../store/auth.store";
import { setJwt } from "../utilities";
import { setNavigation } from "../store/navigation.store";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginForm>({} as LoginForm);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const form = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().min(3).max(15).required().label("Password"),
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

  const handleLogin = async () => {
    const formData: LoginForm = {
      email: email,
      password: password,
    };
    const schema = Joi.object({ ...form });
    const { error } = schema.validate(formData);
    if (error) {
      const errorDetails = {} as errorDetails;
      for (let item of error.details) {
        if (item.context?.key) errorDetails[item.context?.key] = item.message;
      }
      setErrors({ ...errors, ...errorDetails });
      return;
    }
    try {
      setIsProcessing(true);
      const { userData, tokenData } = await login(formData);
      dispatch(setUser({ userData }));
      dispatch(setNavigation({ nav: "home" }));
      setJwt(tokenData.token);
      navigate("/", { replace: true });
    } catch {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center bg-gray-200 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10 py-5 bg-white shadow-xl rounded-md">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Login
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Provide details to access your account
            </p>
          </div>
          <div className="m-7">
            <form action="">
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
              <div className="mb-6">
                <button
                  type="button"
                  className={`w-full px-3 py-4 flex justify-center items-center text-white bg-tealsecondary rounded-md focus:outline-none ${
                    isProcessing ?? "cursor-not-allowed"
                  }`}
                  onClick={() => handleLogin()}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Spinner className="text-white h-5 w-5" />
                  ) : null}

                  {isProcessing ? "Processing..." : "Sign In"}
                </button>
              </div>
              <p className="text-sm text-center text-gray-400">
                Don't have an account yet?{" "}
                <a
                  href="/signup"
                  className="text-indigo-400 underline focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                >
                  Signup
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

type errorDetails = {
  [x: string]: string;
};

type LoginForm = {
  email: string;
  password: string;
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

export default Login;
