import { Link } from "react-router-dom";
import { useState } from "react";
import useAuthContext from "../context/AuthContext";


export const RegisterModal = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const { register, error } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await register({ name, email, password, password_confirmation,error });
  };

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
        <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
          <div className="relative flex justify-between w-full text-2xl font-semibold text-gray-400 lg:w-auto lg:static lg:block lg:justify-start">
            Mozilor
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-400 border rounded border-slate-200"
            >
              LOG IN / SIGN UP
            </Link>
          </div>
        </div>
      </nav>

      <section>
        <div className="">
          <div className="max-w-md p-6 mx-auto overflow-hidden bg-white shadow-md rounded-xl">
            <p className="p-3 text-lg font-bold text-center">Register</p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block font-medium text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    className="border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              {/* {error.name && (
                <div className="text-sm text-red-500">{error.name[0]}</div>
              )} */}
              
              <div>
                <label
                  className="block font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    className="border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              {/* {error.email && (
                <div className="text-sm text-red-500">{error.email[0]}</div>
              )} */}
              
              <div>
                <label
                  className="block font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    className="border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    placeholder="Enter a password"
                    required
                  />
                </div>
              </div>
              {/* {error.password && (
                <div className="text-sm text-red-500">{error.password[0]}</div>
              )} */}
              <div>
                <label
                  className="block font-medium text-gray-700"
                  htmlFor="cpassword"
                >
                  Password confirmation
                </label>
                <div className="mt-1">
                  <input
                    className="border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="password"
                    id="password_confirmation"
                    value={password_confirmation}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="password_confirmation"
                    placeholder="Enter a password confirmation"
                    required
                  />
                </div>
              </div>
              {/* {error.password_confirmation && (
                <div className="text-sm text-red-500">{error.password_confirmation[0]}</div>
              )} */}
              <div>
                <button
                  type="submit"
                  className="items-center w-full px-4 py-2 text-base font-medium text-white bg-blue-700 border border-transparent rounded-md"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
