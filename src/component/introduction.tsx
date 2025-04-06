import { BubbleLeft, BubbleRight } from "./bubbleChat"
import { useEffect, useState } from "react"
 function TextAppear({setShowChoice,text,userMsg}:{setShowChoice:React.Dispatch<React.SetStateAction<boolean>>,text:string[],userMsg:string|null}) {
    // nympen state introtext yang udah ke display
    const [displayed, setDisplayed] = useState<string[]>([]);
    const [loadingIndex, setLoadingIndex] = useState<number | null>(0);
    // useEffect dari dependencyLoadingIndex
    useEffect(() => {
      if (loadingIndex === null) return;
      const timer = setTimeout(() => {
        // manggil text sama index loading index yang udah kepanggil
        setDisplayed((prev) => [...prev, text[loadingIndex]]);
        // expresi kalo loading index lebih kecil dari length akhir introtext 
        if (loadingIndex < text.length - 1) {
          setLoadingIndex(loadingIndex + 1);
        } else {
          setLoadingIndex(null);
          setShowChoice(true)
        }
      }, 1500);
      return () => clearTimeout(timer);
    }, [loadingIndex]);
  
    return (
      <>
      {userMsg&&<BubbleRight text={userMsg}/>}
        {displayed.map((text, index) => (
          <BubbleLeft key={index} index={index} text={text} />
        ))}
        {loadingIndex !== null && (
            <div className="bg-slate-600 relative w-10 h-8 rounded-lg flex justify-center">
                <p className="animate-bounce animation-delay-150">.</p>
                <p className="animate-bounce animation-delay-200">.</p>
                <p className="animate-bounce animation-delay-[250ms]">.</p>
            </div>
        )}
      </>
    );
  }
export default TextAppear