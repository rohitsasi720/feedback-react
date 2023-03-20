import { Link } from "react-router-dom";
import bulb from "../assets/idea.png";
import { FeedbackBox } from "../components/FeedbackBox";
import { UpvoteDownvote } from "../components/UpvoteDownvote";

export const Feedback = () => {
  return (
    <main>
      <section>
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
      </section>

      <section>
        <div className="container items-center px-4 pt-6 mx-auto">
          <div>
            <div className="flex items-center">
              <div className="flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
                <img
                  src={bulb}
                  alt="idea"
                  style={{ height: "20px", width: "20px", marginRight: "8px" }}
                />
              </div>
              <div className="relative flex flex-col justify-center w-full pt-4 text-xl font-semibold text-gray-900 lg:w-auto lg:static lg:block lg:justify-start">
                <span className="text-xl">Give feedback</span>
                <hr className="my-2 border-2 border-black hr"></hr>
              </div>
            </div>
            <div className="flex pt-8">
              <FeedbackBox />

              <div className="flex flex-col">
                <div className="flex pb-4 m-2 ml-16">
                  <div className="w-20 h-10">
                    <UpvoteDownvote />
                  </div>
                  <div className="h-32 max-w-3xl overflow-hidden rounded shadow-lg">
                    <div className="px-6 py-4">
                      <div className="mb-2 text-xl font-bold">
                        Lorem ipsum dolor sit amet
                      </div>
                      <p className="text-base text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Voluptatibus quia, Nonea! Maiores et perferendis
                        eaque, exercitationem praesentium nihil.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex pb-4 m-2 ml-16">
                  <div className="w-20 h-10">
                    <UpvoteDownvote />
                  </div>
                  <div className="h-32 max-w-3xl overflow-hidden rounded shadow-lg">
                    <div className="px-6 py-4">
                      <div className="mb-2 text-xl font-bold">
                        Lorem ipsum dolor sit amet
                      </div>
                      <p className="text-base text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Voluptatibus quia, Nonea! Maiores et perferendis
                        eaque, exercitationem praesentium nihil.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex pb-4 m-2 ml-16">
                  <div className="w-20 h-10">
                    <UpvoteDownvote />
                  </div>
                  <div className="h-32 max-w-3xl overflow-hidden rounded shadow-lg">
                    <div className="px-6 py-4">
                      <div className="mb-2 text-xl font-bold">
                        Lorem ipsum dolor sit amet
                      </div>
                      <p className="text-base text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Voluptatibus quia, Nonea! Maiores et perferendis
                        eaque, exercitationem praesentium nihil.
                      </p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
