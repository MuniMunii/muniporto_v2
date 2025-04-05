import { BubbleLeft } from "./bubbleChat"
import { useEffect, useState } from "react"
export function IntroductionTest() {
    const introText = ["Hello", "My Name is Ramzi!, Sometime they called me Muni", "Nice to meet you!", "Etc 2", "Nice to meet you!", "Etc 2", "Nice to meet you!", "Etc 2", "Nice to meet you!", "Etc 2"];
    // nympen state introtext yang udah ke display
    const [displayed, setDisplayed] = useState<string[]>([]);
    const [loadingIndex, setLoadingIndex] = useState<number | null>(0);
    // useEffect dari dependencyLoadingIndex
    useEffect(() => {
      if (loadingIndex === null) return;
      const timer = setTimeout(() => {
        // manggil text sama index loading index yang udah kepanggil
        setDisplayed((prev) => [...prev, introText[loadingIndex]]);
        // expresi kalo loading index lebih kecil dari length akhir introtext 
        if (loadingIndex < introText.length - 1) {
          setLoadingIndex(loadingIndex + 1);
        } else {
          setLoadingIndex(null);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }, [loadingIndex]);
  
    return (
      <div className="flex flex-col gap-y-3">
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
      </div>
    );
  }
export default IntroductionTest