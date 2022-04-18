import React, { useState } from "react";
import Joi from "joi";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<error>({} as error);

  const handleChange = (
    element: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const form = Joi.object({
      firstName: Joi.string().required().min(3).max(30).label("First name"),
      lastName: Joi.string().required().min(3).max(30),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
    });
    const { name, value } = element.target;
    const validate = { [name]: value };
    //const schema = { [name]: form[name]  }
    const { error } = form.validate(validate);

    if (error) {
      const errorDetails = { [name]: error.details[0].message };
      setErrors({ ...errors, ...errorDetails });
    }

    setState(element.target.value);
  };
  return (
    <div className="App max-h-screen">
      <div className="flex justify-center">
        <div className="font-semibold h-1/4 flex flex-col p-2 w-11/12 md:w-6/12 md:m-2 lg:w-4/12 xl:w-3/12">
          <h2 className="text-center text-tealprimary uppercase text-xl my-3">
            create account
          </h2>
          <div className="py-2 flex flex-col lg:p-4">
            <span className="ml-2">First Name</span>
            <input
              type="text"
              className="p-2 m-2 outline-none capitalize border-white border-2 focus:border-teal"
              name="firstName"
              id="firstName"
              placeholder="John"
              value={firstName}
              minLength={3}
              maxLength={30}
              autoFocus={true}
              onChange={(val: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(val, setFirstName)
              }
            />
            <span className="text-red text-sm ml-2">
              {errors.firstName ?? errors.firstName}
            </span>
            <span className="ml-2">Last Name</span>
            <input
              type="text"
              className="p-2 m-2 outline-none capitalize border-white border-2 focus:border-teal"
              name="lastName"
              id="lastName"
              placeholder="Doe"
              value={lastName}
              minLength={3}
              maxLength={30}
              onChange={(val: React.ChangeEvent<HTMLInputElement>) =>
                setLastName(val.target.value)
              }
            />
            <span className="ml-2">Email</span>
            <input
              type="text"
              className="p-2 m-2 outline-none border-white border-2 focus:border-teal"
              name="email"
              id="email"
              placeholder="john.doe@gmail.com"
              value={email}
              onChange={(val: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(val.target.value)
              }
            />
            <span className="ml-2">Password</span>
            <input
              type="password"
              className="p-2 m-2 outline-none border-white border-2 focus:border-teal"
              name="password"
              id="password"
              value={password}
              onChange={(val: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(val.target.value)
              }
            />
            <span className="ml-2">Confirm password</span>
            <input
              type="password"
              className="p-2 m-2 outline-none border-white border-2 focus:border-teal"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(val: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(val.target.value)
              }
            />
          </div>
          <button className="p-4 text-peach bg-teal uppercase mx-8 hover:bg-tealprimary">
            create
          </button>
        </div>
      </div>
    </div>
  );
}

type error = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default App;
