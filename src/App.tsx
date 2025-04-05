import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState,useEffect } from "react";
import Pointer from "./component/pointer";
import IntroductionTest from "./component/introduction";
function App() {
  const [bubbleAppear,setBubbleAppear]=useState<boolean>(false)
  const [testing,setTesting]=useState<number>(0)
  useEffect(()=>{console.log(testing)},[testing])
  return (
    <>
    <Pointer/>
    <div className="w-[93%] mx-auto">
      <motion.div className="h-screen">
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={()=>setBubbleAppear(!bubbleAppear)}
          className="rounded-md py-1 px-3 bg-blue-500 text-black"
        >
          Test
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={()=>setTesting(testing+1)}
          className="rounded-md py-1 px-3 bg-blue-500 text-black"
        >
          Testing
        </motion.button>
        <div className="flex flex-col w-full gap-4">
        <AnimatePresence initial={false}>
          {bubbleAppear?
          <IntroductionTest/>:null}
        </AnimatePresence>
        </div>
      </motion.div>
      <div className="w-full h-20 bg-yellow-400">as</div>
      {Array.from({length:testing}).map((_,index)=>{return <div key={index} className="w-full h-20 bg-yellow-400">as {index}</div>})}
      </div>
    </>
  );
}

export default App;
