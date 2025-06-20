import { useState,useEffect } from "react";
import {motion,AnimatePresence} from"framer-motion"
import { BsBoxArrowUpRight } from "react-icons/bs";
interface ExpandingBoxProps{
    id?:string
    isMobile:boolean
    content:ContentProps
}
export default function ExpandingBox({id,isMobile,content }: ExpandingBoxProps) {
    const [expand, setExpand] = useState<boolean>(false);
    useEffect(() => {
      console.log(isMobile);
    }, [isMobile]);
    const width = isMobile ? "100%" : expand ? "80%" : "288px";
    const height = isMobile ? "fit-content" : expand ? "488px" : "300px";
    return (
      <motion.div
        layout
        id={id}
        key={"project-test"}
        initial={{ width: "288px", height: "244px", scale: 0.8 }}
        animate={{ width: width, height: height, scale: 1 }}
        transition={{
          width: { duration: 0.3 },
          height: { duration: 0.3, delay: 0.3 },
        }}
        className="bg-gray-600 rounded-lg relative flex tablet:flex-row phone:flex-col gap-2 p-2"
      >
        <div className="left-tail"></div>
        <motion.div
          className={`bg-[#060a18] flex-col sm:w-full sm:max-w-72 h-full flex overflow-hidden ${
            isMobile
              ? "w-full h-full max-h-fit"
              : expand
              ? "h-full max-w-72"
              : "w-full max-w-72 h-full"
          } rounded-md`}
        >
          {/* image */}
          <motion.div
            animate={{ width: "100%", height: "240px" }}
            className={`bg-[#0B132B] font-semibold text-5xl max-h-48 p-3 rounded-md flex justify-center items-center pointer-events-none select-none`}
          >
            {/* nanti diganti kalo ada gambar */}
            <p className="flex flex-col gap-2 justify-center">
              Muni <span className="bg-pink-500 h-fit py-1 px-2">{content.title}</span>
            </p>
          </motion.div>
          {/* tittle / description */}
          <div className="p-2">
            {/* <h1 className="text-2xl font-semibold">Muni News</h1> */}
            <p className="text-center">
              {content.description}
            </p>
          </div>
          <button
            className="w-full text-center mt-auto bg-blue-600 py-2"
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? "Shrink" : "Expand"}
          </button>
        </motion.div>
        <AnimatePresence>
          {expand && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { delay: 0.1 } }}
              className="w-full h-full min-h-fit bg-gray-100 overflow-hidden rounded-md text-black relative "
            >
              {/* <h1 className="text-3xl font-semibold">Muni News</h1> */}
              <div className=" h-full text-left p-4 pb-7 text-[#557] overflow-y-auto flex flex-col gap-3">
                <div>
                  <div className="bg-gradient-to-r from-[#464668] to-[#464668]/80 py-1 px-3 text-white rounded-md">
                    <p className="flex gap-2 items-center font-semibold text-2xl">
                      Description
                    </p>
                  </div>
                  <p>
                    {content.longDesc}
                  </p>
                </div>
                <div className="h-fit">
                  <div className="bg-gradient-to-r from-[#464668] to-[#464668]/80 pt-3 pb-5 px-3 text-white rounded-md">
                    <p className="flex gap-2 items-center font-semibold text-2xl">
                      Feature
                    </p>
                  </div>
                  <ul className="custom-list">
                    {content.feature.map((content,index)=><li key={content+index}>{content}</li>)}
                  </ul>
                </div>
              </div>
              <a
                id="hover"
                target="_blank"
                href={content.linkRepo}
                className="mt-auto bg-gradient-to-r py-1 absolute bottom-0 left-0 from-[#ff9503] to-[#ff9503]/80 w-full font-semibold text-white flex justify-center items-center gap-2 text-xl"
              >
                Repository <BsBoxArrowUpRight />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }