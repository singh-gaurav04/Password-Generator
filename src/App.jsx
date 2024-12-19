import React, { useCallback } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const passref = useRef(null);

  const [Length, setLength] = useState(8);
  const [Isnumber, setIsnumber] = useState(false);
  const [Ischar, setIschar] = useState(false);
  const [Password, setPassword] = useState("");

  const generatorPassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (Isnumber) str += "0123456789";
    if (Ischar) str += "~!@#$%^&*-+";

    for (let i = 1; i <= Length; i++) {
      const char = Math.floor(Math.random() * str.length );
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [Length, Isnumber, Ischar]);

  useEffect(() => {
    generatorPassword();
  }, [Length, Isnumber, Ischar]);

  return (
    <div className='bg-gray-600 flex justify-center items-center h-screen '>
      <div className='bg-gray-200 p-6 flex flex-col gap-4 rounded-2xl '>
        <h1 className='text-center text-2xl'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden'>
          <input
            type='text'
            value={Password}
            placeholder='Password'
            readOnly
            ref={passref}
            className='w-full outline-none py-1 px-3 text-amber-700 font-bold'
          />
          <button
            className='p-1 px-3 text-lg bg-blue-600 shrink-0 outline-none '
            onClick={() => {
              window.navigator.clipboard.writeText(Password);
              passref.current.select();
            }}
          >
            copy
          </button>
        </div>

        <div className='flex gap-3 text-green-500 font-semibold '>
          <input
            type='range'
            min='6'
            max='15'
            value={Length}
            onChange={(e) => setLength(e.target.value)}
            className='cursor-pointer'
          />
          <h1>Length : {Length} </h1>
          <input
            type='checkbox'
            defaultChecked={Isnumber}
            onChange={() => {
              setIsnumber((prev) => !prev);
            }}
            className='cursor-pointer'
          />
          <label for='numbers'>Numbers</label>

          <input
            type='checkbox'
            defaultChecked={Ischar}
            onChange={() => {
              setIschar((prev) => !prev);
            }}
            className="cursor-pointer"
          />
          <label for='characters'>Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
