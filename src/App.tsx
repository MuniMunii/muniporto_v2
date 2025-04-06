import "./App.css";
import { motion, AnimatePresence, animate, stagger } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Pointer from "./component/pointer";
import Intro from "./component/intro";
import { BubbleChoices, BubbleRight } from "./component/bubbleChat";
import TextAppear from "./component/introduction";
function App() {
  const [bubbleAppear, setBubbleAppear] = useState<boolean>(false);
  const [showChoices,setShowChoices]=useState<boolean>(false)
  const [introAppear,setIntroAppear]=useState<boolean>(false)
  const [showCaseProject,setShowCaseProject]=useState<boolean>(false)
  const [contactAppear,setContactAppear]=useState<boolean>(false)
  //Note:1 debug chat session 
  const [session,setSession]=useState<string[]>([])
  const handleSession=()=>{
    if(!session.includes('intro')){
      setSession(prev=>[...prev,"intro"])
    }
  }
  const introText = ["Hello!", "My Name is Ramzi!","Sometime they called me Muni", "Nice to meet you!","What do you wanna know more about me?"];
  const infoText = ["Sure This is Infor", ];
  const projectText = ["Sure This is my project", ];
  const contactText = ["Sure This is contact",];
  return (
    <>
      <Pointer />
      <AnimatePresence>
        {!bubbleAppear ? (
          <Intro setBubbleAppear={setBubbleAppear}/>
        ) : null}
      </AnimatePresence>
      <div className="w-[93%] mx-auto py-6">
        <motion.button
        id="hover"
          whileHover={{ scale: 1.1 }}
          onClick={() => {setBubbleAppear(!bubbleAppear);setShowChoices(false)}}
          className="rounded-md py-1 px-3 bg-blue-500 text-black"
        >
          Test
        </motion.button>
        <div className="flex flex-col w-full gap-4">
          <AnimatePresence initial={false}>
            {bubbleAppear ? <TextAppear userMsg={null} text={introText} setShowChoice={setShowChoices} /> : null}
            {introAppear?<TextAppear userMsg={"Tell me about yourself!"} text={infoText} setShowChoice={setShowChoices} />:null}
            {showCaseProject?<TextAppear userMsg={"I know you've been working on some project, Tell me which project have you been most proud of, and why?"} text={projectText} setShowChoice={setShowChoices} />:null}
            {contactAppear?<TextAppear userMsg={"How can i reach you?"} text={contactText} setShowChoice={setShowChoices} />:null}
            {showChoices ?!introAppear|| !contactAppear|| !showCaseProject ?<BubbleChoices introAppear={introAppear} contactAppear={contactAppear} showCaseProject={showCaseProject} setShowCaseProject={setShowCaseProject} setContactAppear={setContactAppear} setIntroAppear={setIntroAppear} setShowChoices={setShowChoices}/>:null : null}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default App;
