import "./App.css";
import { motion, AnimatePresence} from "framer-motion";
import { useState } from "react";
import Pointer from "./component/pointer";
import Intro from "./component/intro";
import { BubbleChoices } from "./component/bubbleChat";
import TextAppear from "./component/textAppear";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
function App() {
  const [bubbleAppear, setBubbleAppear] = useState<boolean>(false);
  const [showChoices,setShowChoices]=useState<boolean>(false)
  const [introAppear,setIntroAppear]=useState<boolean>(false)
  const [showCaseProject,setShowCaseProject]=useState<boolean>(false)
  const [contactAppear,setContactAppear]=useState<boolean>(false)
  //Note:1 debug chat session 
  const [session,setSession]=useState<string[]>([])
  const handleSession=(session:string)=>{
      setSession(prev=>[...prev,session])
  }
  function TestingExpandingBox(){
    const [expand,setExpand]=useState<boolean>(false)
    const width=expand?"70%":"288px"
    const height=expand?"388px":"244px"
    return <motion.div key={'project-test'} initial={{width:'288px',height:'244px',scale:0.8}} animate={{width:width,height:height,scale:1}}  transition={{
      width: { duration: 0.3 },
      height: { duration: 0.3, delay: 0.3 },
    }} className=" bg-gray-600 rounded-lg relative"><div className="left-tail"></div><button onClick={()=>{setExpand(!expand)}}>Expand</button></motion.div>
  }
  const contactLink = [{name:'LinkedIn',url:'https://www.linkedin.com/in/ramzi-akbar-ramadhan-b8b05a243/',icon:<FaLinkedin/>},{name:'Github',url:'https://github.com/MuniMunii',icon:<FaGithub/>}]
  const linkMap=contactLink?.map((link,index)=>(<a id="hover" target="_blank" key={`${link.name}-${index}`} className="bg-black rounded-md px-2 py-1 flex items-center gap-2 mt-2" href={link.url}>{link.icon}{link.name}</a>))
  const introText = ["Hello!", "My Name is Ramzi!","Sometime they called me Muni", "Nice to meet you!","What do you wanna know more about me?"];
  const infoText = ["With Pleasure!","My Name is Ramzi Akbar Ramadhan","Right now i am studying at Universitas Bina Sarana Informatika","I am a student majoring in System Informations","I've been code since 2021","And i am a self-taught programmer","I am interested in Web Development","React.js,Javascript,Typescript,Github And Tailwind.css are technology i often use","And Theres also technology i sometime use like Express,Node.js,etc..","Now you know about me (｡•̀ᴗ-)✧",contactAppear&&showCaseProject?"Thank you for wanna know more about me!":"Is there anything else you want to know?"];
  const projectText = ["Sure This is my project",];
  const contactText = ["Sure Here is my contact list that you can reach.",<>Email: <span><a id="hover" href="mailto:tyuimiti@gmail.com" className="text-red-400">tyuimiti@gmail.com</a></span></>,"I use WhatsApp too, Here is my number +628998667353","Here is my other contact",linkMap,"I hope we can make a good connection! ദ്ദി・ᴗ・)✧"];
  return (
    <>
      <Pointer />
      <AnimatePresence>
        {!bubbleAppear ? (
          <Intro setBubbleAppear={setBubbleAppear}/>
        ) : null}
      </AnimatePresence>
      <div className="w-[93%] mx-auto py-6">
        <AnimatePresence>
      {(showCaseProject||introAppear||contactAppear)&&<div className="w-full z-[99] border-none h-fit py-3 fixed top-0 left-0 flex justify-center"><div className="absolute top-0 left-0 border-none z-[98] w-full h-full gradient-mask-b-30 bg-black/50 backdrop-blur-md"></div><div className="z-[99] w-fit mx-auto flex justify-center gap-3">{session.map(session=>{if(session==='intro')return <motion.a id="hover" initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} href="#intro">About Me</motion.a>;if(session==='contact')return <motion.a id="hover" initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} href="#contact">Contact Me</motion.a>;if(session==='project')return <motion.a id="hover" initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} href="#project">Project</motion.a>;})}</div></div>}
      </AnimatePresence>
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
            {bubbleAppear ? <TextAppear id="" key={'intro-screen'}  userMsg={null} text={introText} setShowChoice={setShowChoices} /> : null}
            {session.map(session=>{
              if(session==="intro"){
                return <TextAppear id="intro" key={'intro-info'}  userMsg={'Can you tell me about yourself?'} text={infoText} setShowChoice={setShowChoices} />
              }
              if(session==="contact"){
                return <TextAppear id="contact" key={'contact-info'}  userMsg={'How can i reach you?'} text={contactText}  setShowChoice={setShowChoices}/>
              }
              if(session==="project"){
                return <TestingExpandingBox/>
                // return <TextAppear id="project" key={'project-info'}  userMsg={'I know you ve been working on some project, Tell me which project have you been most proud of, and why?'} text={projectText} setShowChoice={setShowChoices} />
              }
            })}
            {showChoices ?!introAppear|| !contactAppear|| !showCaseProject ?<BubbleChoices handleSession={handleSession} introAppear={introAppear} contactAppear={contactAppear} showCaseProject={showCaseProject} setShowCaseProject={setShowCaseProject} setContactAppear={setContactAppear} setIntroAppear={setIntroAppear} setShowChoices={setShowChoices}/>:null : null}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default App;
