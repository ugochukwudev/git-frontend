import React, { useState } from "react";

const Popup = ({ language, description, url }: any) => {
  const [show, setShow] = useState(false);
  return (
    <>
      {
        <div className="absolute top-10 p-4 z-10 bg-blue-500 text-white w-3/12 rounded-xl border-2 left-[40%] ">
          <p className="font-bold">Languages:</p>
          <p>{language}</p>
          <p className="font-bold">Follower Url:</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi, sed.
          </p>
          <p>Description:</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            maxime distinctio, eos laborum tenetur atque? Ratione perspiciatis
            ipsa facilis beatae! Provident quo dolores, itaque ab porro in
            distinctio officiis necessitatibus!
          </p>
        </div>
      }
    </>
  );
};

export default Popup;
