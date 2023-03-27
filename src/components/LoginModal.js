import { Link } from 'react-router-dom'
import { useState } from 'react'
import useAuthContext from '../context/AuthContext'


export const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login({ email, password });
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
              to="/register"
              className="px-4 py-2 text-gray-400 border rounded border-slate-200"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>
      <section className='py-32'>
        <div className="max-w-md p-6 mx-auto overflow-hidden bg-white shadow-md rounded-xl">
          <p className="p-3 text-lg font-bold text-center">Login</p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="block font-medium text-gray-700"
                htmlFor="email"
              >
                Email
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
            {error.email && (
              <div className='flex'>
              <span className='p-2 m-2 text-sm text-red-400'>
                {error.email[0]}
              </span>
            </div>
            )}
            
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
            {error.password && (
              <div className='flex'>
              <span className='p-2 m-2 text-sm text-red-400'>
                {error.password[0]}
              </span>
            </div>
            )}
            <div>
              <button
                type="submit"
                className="items-center w-full px-4 py-2 text-base font-medium text-white bg-blue-700 border border-transparent rounded-md"
              >
                Continue with email
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}


