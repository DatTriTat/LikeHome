import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import HomePageContext from "../Context/HomePageContext";
function Hamburger() {
  const [menu, setOpenMenu] = useState(false);
  const openMenu = () => {
    let closeMenu = document.getElementById("closeMenu");

    if (menu) {
      closeMenu.classList.remove("opacity-0");
    } else {
      closeMenu.classList.add("opacity-0");
    }
    setOpenMenu(!menu);
  };
  return (
    <div className="flex flex-col p-5 cursor-pointer text-white">
      <div className="absolute" id="closeMenu" onClick={openMenu}>
        <div className="w-[25px]  border-b-4 border-white "></div>
        <div className="w-[25px]  border-b-4 border-white mt-1"></div>
        <div className="w-[25px]  border-b-4 border-white mt-1"></div>
      </div>
      <div className="relative w-[25px]" onClick={openMenu}>
        {!menu ? (
          <></>
        ) : (
          <>
            <motion.div
              className="absolute w-full top-[7px] border-b-4 border-white"
              animate={{ rotateZ: 45 }}
              transition={{ duration: 1 }}
            ></motion.div>
            <motion.div
              className="absolute w-full top-[7px]  border-b-4 border-white"
              animate={{ rotateZ: -45 }}
              transition={{ duration: 1 }}
            ></motion.div>
            <motion.div
              className="absolute h-[150px] w-[200px] top-[-20px] right-[-5px] bg-slate-900/20 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute top-[40px] w-full">
                <div className="flex w-full justify-center text-center">
                  <div className="flex flex-col">
                  <Link href={"/"}>
                      <span className="font-bold hover:text-red-600">
                        Home
                      </span>
                    </Link>
                    <Link href={"/account"}>
                      <span className="font-bold hover:text-red-600">
                        Account
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

export default Hamburger;