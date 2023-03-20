import { Link } from "react-router-dom";
import { useState } from "react";

export const RegisterModal = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        console.log(error);
      } else {
        localStorage.setItem("username", name);
        console.log(`Name: ${name} Email: ${email} Password: ${password}`);
      } 
    };


  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex text-2xl justify-between font-semibold text-gray-400 lg:w-auto lg:static lg:block lg:justify-start">
            Mozilor
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/login"
              className="text-gray-400 py-2 px-4 border border-slate-200 rounded"
            >
              LOG IN / SIGN UP
            </Link>
          </div>
        </div>
      </nav>

      <section>
        <div className="">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
            <p className="font-bold text-center text-lg p-3">Register</p>
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
                    id="cpassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="cpassword"
                    placeholder="Enter a password confirmation"
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="items-center w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-700"
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
}
