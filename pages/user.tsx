import React, { useState, useEffect } from "react";
import Link from "next/link";
import Popup from "./components/popup";
const User = () => {
  const [user, setuser] = useState({} as any);
  const [repository, setRepository] = useState({} as any);
  const [showPopup, setShowPopup] = useState(false);

  const fetchToken = async () => {
    const response = await fetch(
      "https://git-backend-production.up.railway.app/callback",
      {
        method: "POST",
        body: JSON.stringify({ code: window.location.search.slice(6) }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    localStorage.setItem("token", JSON.stringify(data));
    let content: any = window.localStorage.getItem("token");
    let contentData = JSON.parse(content);
    if (Object.keys(contentData.token).length > 0) {
      fetchUserDetails();
      fetchUserRepos();
    } else {
      alert("go back to homescreen to authenticate again");
    }
  };
  const fetchUserDetails = async () => {
    let content: any = window.localStorage.getItem("token");
    let contentData = JSON.parse(content);
    const response = await fetch("https://api.github.com/user", {
      method: "GET",
      //body: JSON.stringify({ code: window.location.search.slice(6) }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${contentData.token}`,
      },
    });
    const data = await response.json();
    setuser(data);
    console.log(data);
  };
  const fetchUserRepos = async () => {
    let content: any = window.localStorage.getItem("token");
    let contentData = JSON.parse(content);
    const response = await fetch(`https://api.github.com/user/repos`, {
      method: "GET",
      //body: JSON.stringify({ code: window.location.search.slice(6) }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${contentData.token}`,
      },
    });
    const data = await response.json();
    setRepository(data);
    console.log(data);
  };
  const alertRepo = () => {
    alert("");
  };
  useEffect(() => {
    fetchToken();
  }, []);
  return (
    <div className="h-[100vh] p-6 flex flex-col gap-10">
      <Link href="/">
        <p className="bg-blue-600 text-white rounded-full px-8 py-2 w-fit ">
          Go Home
        </p>
      </Link>
      <div className=" w-full p-6 flex flex-col items-center ml-auto mr-auto rounded-xl shadow-[2px_2px_4px_4px] shadow-blue-100">
        <img
          src="https://avatars.githubusercontent.com/u/95509649?v=4"
          className="w-[50px] h-[50px] rounded-full "
          alt="profile"
        />
        <p className="font-bold ">{user.name}</p>
        <p className="font-semibold">{user.location}</p>
        {user.email && <p className="font-medium">{user.email}</p>}
        <span className="flex gap-10 font-semibold">
          <li>Followers: {user.followers}</li>
          <li>Following : {user.following}</li>
        </span>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex flex-col gap-6">
            <p className="font-bold">
              Public Repositories{" "}
              {`(${
                user?.public_repos ? user.public_repos : "unable to access"
              })`}{" "}
            </p>
            {repository?.length > 0 &&
              repository?.map((item: any) => {
                let show = false;
                if (!item.private)
                  return (
                    <div
                      onClick={() => {
                        alert(item.language);
                        console.log(item.language);
                        show = true;
                        setTimeout(() => {
                          show = false;
                        }, 3000);
                      }}
                      className="border-[1px] border-gray-300 px-6 py-2 rounded-full cursor-pointer"
                    >
                      <p>{item.name}</p>
                      {show && <Popup language={item.language} />}
                    </div>
                  );
              })}
          </div>
          <div className="flex flex-col gap-6">
            <p className="font-bold">
              Private Repositories{" "}
              {`(${user?.private_repos ? user.public_repos : "not available"})`}
            </p>
            {repository?.length > 0 &&
              repository?.map((item: any) => {
                if (item.private)
                  return (
                    <div className="border-[1px] border-gray-300 px-6 py-2 rounded-full cursor-pointer">
                      <p>{item.name}</p>
                    </div>
                  );
              })}
          </div>
        </div>
      </div>
      <p className="text-pink-500">{user?.name}</p>
    </div>
  );
};

export default User;
