import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="App h-full">
      <div className="">
        <div className="text-white w-3/12 h-1/4 bg-teal rounded-lg flex flex-col p-2 m-2">
          <h5>Sign Up</h5>
          <span className="ml-2">First Name</span>
          <input
            type="text"
            className="p-2 m-2 rounded outline-none text-black"
            name="firstName"
            id="firstName"
            placeholder="John"
            value={firstName}
            minLength={3}
            maxLength={30}
            onChange={(val: React.ChangeEvent<HTMLInputElement>) =>
              setFirstName(val.target.value)
            }
          />
          <span className="ml-2">Last Name</span>
          <input
            type="text"
            className="p-2 m-2 rounded outline-none text-black"
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
            className="p-2 m-2 rounded outline-none text-black"
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
            className="p-2 m-2 rounded outline-none text-black"
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
            className="p-2 m-2 rounded outline-none text-black"
            name="password"
            id="password"
            value={confirmPassword}
            onChange={(val: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(val.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
