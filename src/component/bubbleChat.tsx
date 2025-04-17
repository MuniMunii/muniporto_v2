import {motion}from"framer-motion"
import React, { SetStateAction } from "react"
const chatAppearEffect={
    hidden:{opacity:0,scale:0.8},
    entry:(index:number)=>({opacity:1,scale:1,transition:{delay:index*0.2,duration:0.2}})
}
const date=new Date()
const minute=date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes()
const hour=date.getHours()<10?`0${date.getHours()}`:date.getHours()
const time=`${hour}:${minute}`
interface BubbleProps{
    setShowChoices?:React.Dispatch<SetStateAction<boolean>>;
    setShowCaseProject:React.Dispatch<SetStateAction<boolean>>;
    setContactAppear:React.Dispatch<SetStateAction<boolean>>;
    setIntroAppear:React.Dispatch<SetStateAction<boolean>>;
    introAppear:boolean;
    contactAppear:boolean;
    showCaseProject:boolean;
    handleSession:(session:string)=>void
}
function BubbleChoices({handleSession,setShowChoices,setContactAppear,setIntroAppear,setShowCaseProject,introAppear,contactAppear,showCaseProject}:BubbleProps){
    return (
        <motion.div key={`choices-${introAppear}-${contactAppear}-${showCaseProject}`} initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1,transition:{delay:1.4,duration:0.2}}} variants={chatAppearEffect} className="ml-auto w-fit h-fit flex justify-end z-10 isolate ">
            <div className="w-72 text-left h-fit p-3 relative flex flex-col gap-3 bg-gray-600 rounded-lg">
            <div className="right-tail"/>
            {introAppear?<motion.button id="disable" className="text-pink-200 rounded p-2 text-sm border border-slate-900 cursor-not-allowed">Tell me about yourself!</motion.button>:<motion.button onClick={()=>{setIntroAppear(true);setShowChoices?.(false); handleSession("intro")}} id="hover" whileTap={{scale:0.9}} className="text-pink-200 rounded p-2 text-sm bg-slate-900 pointer-events-auto z-30">Tell me about yourself!</motion.button>}
            {showCaseProject?<motion.button id="disable" className="text-pink-200 rounded p-2 text-sm border border-slate-900 cursor-not-allowed">I know you've been working on some project, Tell me which project have you been most proud of, and why?</motion.button>:<motion.button onClick={()=>{setShowCaseProject(true);setShowChoices?.(false);handleSession("project")}} id="hover" whileTap={{scale:0.9}} className="text-pink-200 rounded p-2 text-sm bg-slate-900 pointer-events-auto z-30">I know you've been working on some project, Tell me which project have you been most proud of, and why? </motion.button>}
            {contactAppear?<motion.button id="disable" className="text-pink-200 rounded p-2 text-sm border border-slate-900 cursor-not-allowed">How can i reach you?</motion.button>:<motion.button onClick={()=>{setContactAppear(true);setShowChoices?.(false);handleSession("contact")}} id="hover" whileTap={{scale:0.9}} className="text-pink-200 rounded p-2 text-sm bg-slate-900 pointer-events-auto z-30">How can reach i you?</motion.button>}
            </div>
          </motion.div>
    )
}
function BubbleRight({text,id}:{text:string,id:string}){
    return (
        <motion.div initial={{opacity:0,scale:0.8}} key={`bubble-${text}`} id={id} animate={{opacity:1,scale:1,transition:{delay:0.2,duration:0.2}}} variants={chatAppearEffect} className="ml-auto w-fit h-fit flex justify-end z-10">
            <div className="w-72 text-left h-fit p-3 relative flex flex-col bg-gray-600 rounded-lg">
            <div className="right-tail"/>
            <p className="text-white rounded p-2 text-sm pointer-events-auto text-left">{text}</p>
            <p className="text-right text-xs text-black/70 w-fit ml-auto">{time}</p>
            </div>
          </motion.div>
    )
}
function BubbleLeft({text,index}:{text:React.ReactNode|null,index:number|null}){
    return (
        <motion.div initial='hidden' key={`${text}-${index}`} custom={index} animate='entry' variants={chatAppearEffect} className="max-w-max h-fit flex z-0  break-words whitespace-pre-wrap">
            <div className="w-72 text-left min-h-7 h-fit p-3 relative flex flex-col bg-gray-600 rounded-lg">
            <div className="left-tail"/>
            <p className="text-pink-200 text-sm">Ramzi</p>
            <p>{text}</p>
            <p className="text-right text-xs text-black/70 w-fit ml-auto">{time}</p>
            </div>
          </motion.div>
    )
}
export {BubbleLeft,BubbleChoices,BubbleRight}