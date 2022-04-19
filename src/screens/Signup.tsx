import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<signUpForm>({} as signUpForm);
  const navigate = useNavigate();

  const form = {
    firstName: Joi.string().required().min(3).max(30).label("First name"),
    lastName: Joi.string().required().min(3).max(30).label("Last name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().label("Password"),
    confirmPassword: Joi.string().required().label("Confirm password"),
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
    console.log(error?.details);

    if (error) {
      const errorDetails = { [name]: error.details[0].message };
      setErrors({ ...errors, ...errorDetails });
    } else {
      const errorDetails = { [name]: "" };
      setErrors({ ...errors, ...errorDetails });
    }

    setState(element.target.value);
  };

  const handleSave = () => {
    const formData = {
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
    console.log("saved");
  };

  return (
    <div className="App max-h-screen">
      <div className="flex justify-center">
        <div className="font-semibold h-1/4 flex flex-col p-2 w-11/12 md:w-6/12 md:m-2 lg:w-4/12 xl:w-3/12">
          <h2 className="text-center text-tealprimary uppercase text-xl my-3">
            create account
          </h2>
          <div className="py-2 flex flex-col lg:p-4">
            <Input
              label="First Name"
              type="text"
              name="firstName"
              value={firstName}
              placeholder="John"
              autoFocus={true}
              onChnage={(val: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(val, setFirstName)
              }
              error={errors.firstName ?? errors.firstName}
            />
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Doe"
              onChnage={(val: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(val, setLastName)
              }
              error={errors.lastName ?? errors.lastName}
            />
            <Input
              label="Email"
              type="text"
              name="email"
              value={email}
              placeholder="john.doe@gmail.com"
              onChnage={(val: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(val, setEmail)
              }
              error={errors.email ?? errors.email}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChnage={(val: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(val, setPassword)
              }
              error={errors.password ?? errors.password}
            />
            <Input
              label="Confirm password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChnage={(val: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(val, setConfirmPassword)
              }
              error={errors.confirmPassword ?? errors.confirmPassword}
            />
          </div>
          <button
            className="p-4 text-peach bg-teal uppercase mx-8 hover:bg-tealprimary"
            onClick={() => handleSave()}
          >
            create
          </button>
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
    <React.Fragment>
      <span className="ml-2">{label}</span>
      <input
        type={type}
        className="p-2 m-2 outline-none border-white border-2 focus:border-teal"
        name={name}
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        autoComplete="off"
        autoCorrect="off"
        autoSave="off"
        onChange={onChnage}
      />
      <span className="text-red text-sm ml-2">{error ?? error}</span>
    </React.Fragment>
  );
};

type signUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
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
