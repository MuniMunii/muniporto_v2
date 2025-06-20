import "./App.css";
import { motion, AnimatePresence} from "framer-motion";
import { useEffect, useState } from "react";
import Pointer from "./component/pointer";
import Intro from "./component/intro";
import { BubbleChoices, BubbleLeft } from "./component/bubbleChat";
import TextAppear from "./component/textAppear";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"
import resumePDF from "../src/assets/cv_Ramzi_Akbar_Ramadhan_2025.pdf"
import ExpandingBox from "./component/expanding_box";
import { DataProject } from "./data";
function App() {
  const [bubbleAppear, setBubbleAppear] = useState<boolean>(false);
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [introAppear, setIntroAppear] = useState<boolean>(false);
  const [showCaseProject, setShowCaseProject] = useState<boolean>(false);
  const [contactAppear, setContactAppear] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const mediaQueries = window.matchMedia("(max-width: 640px)");
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    setIsMobile(mediaQueries.matches);
    mediaQueries.addEventListener("change", handleMediaQueryChange);
    return () =>
      mediaQueries.removeEventListener("change", handleMediaQueryChange);
  }, []);
  //Note:1 debug chat session
  const [session, setSession] = useState<string[]>([]);
  const handleSession = (session: string) => {
    setSession((prev) => [...prev, session]);
  };

  const contactLink = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ramzi-akbar-ramadhan-b8b05a243/",
      icon: <FaLinkedin />,
    },
    { name: "Github", url: "https://github.com/MuniMunii", icon: <FaGithub /> },
  ];
  const linkMap = contactLink?.map((link, index) => (
    <a
      id="hover"
      target="_blank"
      key={`${link.name}-${index}`}
      className="bg-slate-900 rounded-md px-2 py-1 flex items-center gap-2 mt-2"
      href={link.url}
    >
      {link.icon}
      {link.name}
    </a>
  ));
  const introText = [
    "Hello!",
    "My Name is Ramzi!",
    "Sometime they called me Muni",
    "Nice to meet you!",
    "What do you wanna know more about me?",
  ];
  const infoText = [
    "With Pleasure!",
    "My Name is Ramzi Akbar Ramadhan",
    "Right now i am studying at Universitas Bina Sarana Informatika",
    "I am a student majoring in System Informations",
    "I've been code since 2021",
    "And i am a self-taught programmer",
    "I am also interested in Web Development",
    "React.js,Javascript,Typescript,Github And Tailwind.css are technology i often use",
    "And Theres also technology i sometime use like Express,Node.js,etc..",
    "Now you know about me (｡•̀ᴗ-)✧",
    contactAppear && showCaseProject
      ? "Thank you for wanna know more about me!"
      : "Is there anything else you want to know?",
  ];
  const projectText = [
    "Sure This is my project i was proud of!",
    ...DataProject.map((content,index)=>(<ExpandingBox key={'Project'+index} content={content} isMobile={isMobile} id={`target-${index}`}/>)),
    "Theres also many of my playground project",
    "Or I can say playing with new stuff",
    "Here is one of the example",
    <a
      href="https://munisekai-v2.vercel.app/"
      id="hover"
      target="_black"
      className="font-semibold"
    >
       Visit Here: <span className="text-cyan-400">MuniSekai</span>
    </a>,
    "You can also check my github for more!",
  ];
  const contactText = [
    "Sure Here is my contact list that you can reach.",
    <>
      Email:{" "}
      <span>
        <a id="hover" href="mailto:ramziakbar03311@gmail.com" className="text-red-400">
          ramziakbar03311@gmail.com
        </a>
      </span>
    </>,
    "Here is my other Social Medias",
    linkMap,
    "You can also download my Resume!",
    <a href={resumePDF} download={true} id="hover" className="bg-slate-900 rounded-md px-2 py-1 flex items-center gap-2 mt-2">Download Here <FaDownload/></a>,
    "I hope we can make a good connection! ദ്ദി・ᴗ・)✧",
  ];
  return (
    <>
    <SpeedInsights/>
    <Analytics/>
    <div className="bg-black/40 mask-center-radial  -z-10 fixed w-full h-full left-0 top-0"></div>
      {isMobile?null:<Pointer />}
      <AnimatePresence>
        {!bubbleAppear ? <Intro setBubbleAppear={setBubbleAppear} /> : null}
      </AnimatePresence>
      <div className="w-[93%] mx-auto py-6">
        <AnimatePresence>
          {(showCaseProject || introAppear || contactAppear) && (
            <div className="w-full z-[99] border-none h-fit py-3 fixed top-0 left-0 flex justify-center">
              <div className="absolute top-0 left-0 border-none z-[98] w-full h-full gradient-mask-b-30 bg-black/50 backdrop-blur-md"></div>
              <div className="z-[99] w-full flex justify-center gap-3">
                {session.map((session) => {
                  if (session === "intro")
                    return (
                      <motion.a
                        id="hover"
                        key={'intro-session'}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        href="#intro"
                      >
                        About Me
                      </motion.a>
                    );
                  if (session === "contact")
                    return (
                      <motion.a
                        id="hover"
                        key={'contact-session'}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        href="#contact"
                      >
                        Contact Me
                      </motion.a>
                    );
                  if (session === "project")
                    return (
                      <motion.a
                        id="hover"
                        key={'project-session'}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        href="#project"
                      >
                        Project
                      </motion.a>
                    );
                })}
              </div>
            </div>
          )}
        </AnimatePresence>
        {/* debugging */}
        {/* <motion.button
          id="hover"
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            setBubbleAppear(!bubbleAppear);
            setShowChoices(false);
          }}
          className="rounded-md py-1 px-3 bg-blue-500 text-black"
        >
          Test
        </motion.button> */}
        <div className="flex flex-col w-full gap-4">
          <AnimatePresence initial={false}>
            {bubbleAppear ? (
              <TextAppear
                id=""
                key={"intro-screen"}
                userMsg={null}
                text={introText}
                setShowChoice={setShowChoices}
              />
            ) : null}
            {session.map((session) => {
              if (session === "intro") {
                return (
                  <TextAppear
                    id="intro"
                    key={"intro-info"}
                    userMsg={"Can you tell me about yourself?"}
                    text={infoText}
                    setShowChoice={setShowChoices}
                  />
                );
              }
              if (session === "contact") {
                return (
                  <TextAppear
                    id="contact"
                    key={"contact-info"}
                    userMsg={"How can i reach you?"}
                    text={contactText}
                    setShowChoice={setShowChoices}
                  />
                );
              }
              if (session === "project") {
                // return <TestingExpandingBox />;
                return (
                  <TextAppear
                    id="project"
                    key={"project-info"}
                    userMsg={
                      "I know you ve been working on some project, Tell me which project have you been most proud of, and why?"
                    }
                    text={projectText}
                    setShowChoice={setShowChoices}
                  />
                );
              }
            })}
            {showChoices ? (
              !introAppear || !contactAppear || !showCaseProject ? (
                <BubbleChoices
                index={introAppear?16:9}
                  handleSession={handleSession}
                  introAppear={introAppear}
                  contactAppear={contactAppear}
                  showCaseProject={showCaseProject}
                  setShowCaseProject={setShowCaseProject}
                  setContactAppear={setContactAppear}
                  setIntroAppear={setIntroAppear}
                  setShowChoices={setShowChoices}
                />
              ) : <BubbleLeft text="Thats all about myself,Thank you" index={introAppear?16:9}/>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default App;
