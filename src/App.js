import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchReposAction,
  fetchProfileAction,
} from "./redux/slices/reposSlice";
import imgPic from "./img/gith.svg";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("tweneboah");
  const repos = useSelector(state => state?.repos);
  const { loading, profileLoading, reposList, profile, error } = repos;
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfileAction(user));
    dispatch(fetchReposAction(user));
  }, [user, dispatch]);
  console.log(user);
  return (
    <>
      <section class="relative 2xl bg-gray-800 min-h-screen">
        <div class="relative container px-4 mx-auto">
          <div class="text-center mb-20">
            {/* <span class="text-lg text-blue-400 font-bold">
              Have a question?
            </span> */}
            <div class="flex justify-center">
              <img class="h-64  rounded-lg object-cover" src={imgPic} alt="" />
            </div>

            <h2 class="mt-10 mb-5 text-5xl font-bold font-heading text-indigo-300">
              GitHub Finder
            </h2>
            <div className="mt-1 flex justify-center">
              <input
                value={user}
                onChange={e => setUser(e.target?.value)}
                type="text"
                name="email"
                id="email"
                className="shadow-sm text-center focus:ring-indigo-500 p-2 focus:border-indigo-500  sm:text-sm border-gray-300 w-full rounded-md lg:w-1/2"
                placeholder="Search For User"
              />
            </div>
          </div>
          {loading ? (
            <h1 class="text-green-300 text-3xl text-center">Loading</h1>
          ) : error ? (
            <h1 class="text-red-500 text-lg text-center">{error?.message}</h1>
          ) : (
            <div class="max-w-4xl mx-auto">
              <div class="flex flex-wrap -mx-4 mb-20">
                <div class="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
                  <div class="bg-gray-600 rounded-b-lg">
                    <div class="flex justify-center">
                      <img
                        class="w-56 h-56 rounded-full"
                        src={profile?.avatar_url}
                        alt=""
                      />
                    </div>
                    <div class="px-14 py-8">
                      <div class="mb-6 py-px bg-gray-500"></div>
                      <h4 class="mb-8 lg:mb-4  text-white font-bold">
                        Name:{" "}
                        <span>
                          {profile?.name} {profile?.login}
                        </span>
                      </h4>
                      <div class="mb-6 py-px bg-gray-500"></div>
                      <h4 class="mb-8 lg:mb-4  text-white font-bold">
                        Bio: <span>{profile?.bio}</span>
                      </h4>
                      <div class="mb-6 py-px bg-gray-500"></div>
                      <h4 class="mb-8 lg:mb-4  text-white font-bold">
                        Company: <span>{profile?.company}</span>
                      </h4>
                      <div class="mb-6 py-px bg-gray-500"></div>
                      <h4 class="mb-8 lg:mb-4  text-white font-bold">
                        Location: <span>{profile?.location}</span>
                      </h4>

                      <div class="mb-6 py-px bg-gray-500"></div>
                      <h4 class="mb-8 lg:mb-4  text-white font-bold">
                        Followers: <span>{profile?.followers}</span>
                      </h4>

                      <div class="mb-6 py-px bg-gray-500"></div>
                      <h4 class="mb-8 lg:mb-4  text-white font-bold">
                        Following: <span>{profile?.following}</span>
                      </h4>

                      <div class="mb-6 py-px bg-gray-500"></div>
                      <h4 class="mb-8 lg:mb-4  text-white font-bold">
                        Repositories:{" "}
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-green-500 text-green-800">
                          {profile?.public_repos
                            ? profile?.public_repos
                            : "N/A"}
                        </span>
                      </h4>

                      <div class="mb-6 py-px bg-gray-500"></div>
                      <h4 class="mb-8 lg:mb-4  text-white font-bold">
                        Gists:{" "}
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-green-500 text-green-800">
                          {profile?.public_gists
                            ? profile?.public_gists
                            : "N/A"}
                        </span>
                      </h4>
                      <div class="mb-6 py-px bg-gray-500"></div>
                      <div class="md:text-right">
                        <a
                          target="_blank"
                          class="inline-block px-12 py-4 border border-gray-300 hover:border-gray-200 rounded-full font-bold text-white"
                          href={profile?.html_url}
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-full lg:w-1/2 px-4">
                  {reposList?.name !== "Error" &&
                    reposList?.map(repo => (
                      <>
                        <div class="py-6 px-8 mb-4 bg-gray-600 rounded-lg">
                          <div class="flex items-center">
                            <a
                              target="_blank"
                              href={repo?.html_url}
                              class="text-lg  text-indigo-400"
                            >
                              {repo?.name}
                            </a>
                          </div>
                        </div>
                      </>
                    ))}

                  <div class="py-6 px-8"></div>
                </div>
              </div>
              <div class="text-center bg-gray-900 pt-10 w-full ">
                <p class="mb-4  text-gray-300">
                  Developed by
                  <span class="p-2 text-yellow-300">
                    <a href="https://www.youtube.com/channel/UCvu6J9q1AM6q4xysGqAvVyw">
                      i-Novotek
                    </a>
                  </span>
                </p>
                <a
                  class="inline-flex text-blue-400 hover:text-blue-500 font-bold"
                  href="https://www.youtube.com/channel/UCvu6J9q1AM6q4xysGqAvVyw"
                >
                  <span className="mb-10">Watch the tutorial</span>
                  <svg
                    class="ml-4 w-4 h-5"
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.7383 1.47342L18.7383 10.9304L17.5562 10.9304L17.5562 2.89788L0.834948 19.625L0.00154682 18.7916L16.7228 2.06448L9.28125 2.06448L9.28125 0.882355L18.1472 0.882355C18.4737 0.882355 18.7383 1.14697 18.7383 1.47342Z"
                      fill="#1F40FF"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
