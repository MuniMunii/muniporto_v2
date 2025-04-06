import { motion } from "framer-motion"
import React, { SetStateAction, useState } from "react";
function Intro({setBubbleAppear}:{setBubbleAppear:React.Dispatch<SetStateAction<boolean>>}){
      const [hovered, setHovered] = useState(false);
    return (
        <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed w-screen h-screen flex flex-col justify-center items-center bg-black p-2"
      >
        <motion.button
          onClick={() => setBubbleAppear(true)}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          id="hover"
          className="group w-fit overflow-hidden flex justify-center items-center flex-col relative z-20"
        >
          <motion.p
            animate={{ y: hovered ? 100 : 0,transition:{
                type:'spring',
                stiffness:100,
                damping:15
            } }}
            className="text-4xl font-semibold  -z-10"
          >
            Wanna know more about Me?
          </motion.p>
          <motion.p
            animate={{ y: hovered ? 0 : -100,transition:{
                type:'spring',
                stiffness:100,
                damping:15
            }  }}
            className="text-4xl font-semibold absolute top-0 -z-10"
          >
            Start Introduction
          </motion.p>
        </motion.button>
      </motion.div>
    )
}
export default Intro