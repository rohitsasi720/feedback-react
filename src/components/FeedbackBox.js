import { useState } from "react";
import axios from "../api/axios";

export const FeedbackBox = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [details, setDetail] = useState("");
    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const handleSubmit = async (event) => {
      event.preventDefault();
      await csrf();
      try {
        const response = await axios.post("/submit-form", {
          name,
          email,
          title,
          details,
        });
        console.log(response.data.message);
        setName("");
        setEmail("");
        setTitle("");
        setDetail("");
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <main>
      <section >
        <div
          className="max-w-sm overflow-hidden border rounded-xl"
          style={{maxWidth: "320px"}}
>
          <div className="p-6">
            <p className="flex mx-3 text-lg font-bold text-center ">New post</p>
            <span className="block pb-4 mx-3 text-gray-400">
              Have something to say ?
            </span>
            <hr className="w-full pt-2 my-2" />
            <form className="space-y-4" onSubmit={handleSubmit}>
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
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  className="block font-medium text-gray-700"
                  htmlFor="name"
                >
                  Title
                </label>
                <div className="mt-1">
                  <input
                    className="border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    placeholder="Short, descriptive title"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  className="block font-medium text-gray-700"
                  htmlFor="name"
                >
                  Detail
                </label>
                <div className="mt-1">
                  <textarea
                    className="border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-24 resize-none"
                    id="detail"
                    value={details}
                    onChange={(e) => setDetail(e.target.value)}
                    name="details"
                    placeholder="Any additional details..."
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="items-center px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-3xl"
                >
                  → Submit feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
