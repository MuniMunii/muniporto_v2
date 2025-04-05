import {motion}from"framer-motion"
const chatAppearEffect={
    hidden:{opacity:0,scale:0.8},
    entry:(index:number)=>({opacity:1,scale:1,transition:{delay:index*0.2,duration:0.2}})
}
function BubbleRight({args}: {args:string[]|undefined}){
    const Choices = args?.map((arg, index) => {
        return (
            <div key={index} className="w-full bg-white px-3 py-2 rounded-md">
                {arg}
            </div>
        )
    })
    return (
        <div className="w-full h-fit flex justify-end">
            <div className="w-60 h-fit p-3 relative flex flex-col gap-y-3 bg-gray-600 rounded-lg">
            <div className="right-tail"/>
            {Choices}
            </div>
          </div>
    )
}
function BubbleLeft({text,index}:{text:string,index:number|null}){
    const date=new Date()
    const time=`${date.getHours()}:${date.getMinutes()}`
    return (
        <motion.div initial='hidden' custom={index} animate='entry' variants={chatAppearEffect} className="w-full h-fit flex">
            <div className="w-60 text-left min-h-7 h-fit p-3 relative flex flex-col bg-gray-600 rounded-lg">
            <div className="left-tail"/>
            <p className="text-pink-200 text-sm">Ramzi</p>
            <p>{text}</p>
            <p className="text-right text-xs text-black/70 w-fit ml-auto">{time}</p>
            </div>
          </motion.div>
    )
}
export {BubbleLeft,BubbleRight}