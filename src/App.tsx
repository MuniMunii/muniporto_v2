import "./App.css";
import { motion, AnimatePresence, delay } from "framer-motion";
import { useEffect, useState } from "react";
import Pointer from "./component/pointer";
import Intro from "./component/intro";
import { BubbleChoices } from "./component/bubbleChat";
import TextAppear from "./component/textAppear";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { BsBoxArrowUpRight } from "react-icons/bs";
function App() {
  const [bubbleAppear, setBubbleAppear] = useState<boolean>(false);
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [introAppear, setIntroAppear] = useState<boolean>(false);
  const [showCaseProject, setShowCaseProject] = useState<boolean>(false);
  const [contactAppear, setContactAppear] = useState<boolean>(false);
  //Note:1 debug chat session
  const [session, setSession] = useState<string[]>([]);
  const handleSession = (session: string) => {
    setSession((prev) => [...prev, session]);
  };
  // kalo project ada banyak component ini di jadiin map/reusable component
  function TestingExpandingBox({ id }: { id?: string }) {
    const [expand, setExpand] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
      console.log(isMobile);
    }, [isMobile]);
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
    const width = isMobile ? "100%" : expand ? "80%" : "288px";
    const height = isMobile ? "fit-content" : expand ? "488px" : "300px";
    return (
      <motion.div
        layout
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
          className={`bg-[#060a18] flex-col flex overflow-hidden ${
            isMobile
              ? "w-full h-full max-h-fit"
              : expand
              ? "w-60 h-full"
              : "w-full max-w-72 h-full"
          } rounded-md`}
        >
          {/* image */}
          <motion.div
            animate={{ width: "100%", height: "240px" }}
            className={`bg-[#0B132B] font-semibold text-5xl max-h-48 rounded-md flex justify-center items-center pointer-events-none select-none`}
          >
            <p className="flex flex-wrap gap-2 justify-center">
              Muni <span className="bg-pink-500 py-1 px-2">News</span>
            </p>
          </motion.div>
          {/* tittle / description */}
          <div className="p-2">
            {/* <h1 className="text-2xl font-semibold">Muni News</h1> */}
            <p className="text-center">
              A place for Journalist to write News and Searching for inpirations
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
              className="w-full h-full bg-gray-100 overflow-hidden rounded-md text-black relative "
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
                    This project was built during my internship for a company
                    focused on delivering high-quality journalism. Readers can
                    effortlessly browse through stories, while journalists can
                    easily draft and publish their content without getting lost
                    in complicated steps.
                  </p>
                </div>
                <div className="h-fit">
                  <div className="bg-gradient-to-r from-[#464668] to-[#464668]/80 py-1 px-3 text-white rounded-md">
                    <p className="flex gap-2 items-center font-semibold text-2xl">
                      Feature
                    </p>
                  </div>
                  <ul className="custom-list">
                    <li>Modal Component for interactive UI/UX</li>
                    <li>Change Theme Dark/light</li>
                    <li>Auto Save Archived News</li>
                    <li>Fetch news with Queries/Params</li>
                    <li>Etc...</li>
                  </ul>
                </div>
              </div>
              <a
                id="hover"
                target="_blank"
                href="https://github.com/MuniMunii/MuniNews"
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
      className="bg-black rounded-md px-2 py-1 flex items-center gap-2 mt-2"
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
    <TestingExpandingBox id={"target"} key={"project-1"} />,
    "Theres also many of my playground project",
    "Or I can say playing with new stuff",
    "Here is one of the example",
    <a
      href="https://munimunii.github.io/MuniSekai/#"
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
        <a id="hover" href="mailto:tyuimiti@gmail.com" className="text-red-400">
          tyuimiti@gmail.com
        </a>
      </span>
    </>,
    "Here is my other Social Medias",
    linkMap,
    "I hope we can make a good connection! ദ്ദി・ᴗ・)✧",
  ];
  return (
    <>
    <div className="bg-black/40 mask-center-radial  -z-10 fixed w-full h-full left-0 top-0"></div>
      <Pointer />
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
                  handleSession={handleSession}
                  introAppear={introAppear}
                  contactAppear={contactAppear}
                  showCaseProject={showCaseProject}
                  setShowCaseProject={setShowCaseProject}
                  setContactAppear={setContactAppear}
                  setIntroAppear={setIntroAppear}
                  setShowChoices={setShowChoices}
                />
              ) : null
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default App;
