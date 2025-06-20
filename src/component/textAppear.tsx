import { BubbleLeft, BubbleRight } from "./bubbleChat";
import { useEffect, useState,useRef } from "react";
import React from "react";
function TextAppear({
  setShowChoice,
  text,
  userMsg,
  id,
}: {
  id: string;
  setShowChoice?: React.Dispatch<React.SetStateAction<boolean>>;
  text: React.ReactNode[] | null;
  userMsg: string | null;
}) {
  // nympen state introtext yang udah ke display
  const [displayed, setDisplayed] = useState<React.ReactNode[]>([]);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(0);
   const lastItemRef = useRef<HTMLDivElement>(null);
  // useEffect dari dependencyLoadingIndex
  useEffect(() => {
    if (loadingIndex === null) return;
    const timer = setTimeout(() => {
      // manggil text sama index loading index yang udah kepanggil
      if (text) setDisplayed((prev) => [...prev, text?.[loadingIndex] ?? ""]);
      // expresi kalo loading index lebih kecil dari length akhir introtext
      if (loadingIndex < (text ?? Array).length - 1) {
        setLoadingIndex(loadingIndex + 1);
      } else {
        setLoadingIndex(null);
        setShowChoice?.(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [loadingIndex]);
   useEffect(() => {
    if (displayed.length > 0) {
      setTimeout(() => {
        lastItemRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  }, [displayed.length]);
  return (
    <>
      {userMsg && (
        <BubbleRight id={id} key={`bubble-${userMsg}`} text={userMsg} />
      )}
      {text &&
        displayed.map((text, index) => {
           const isLast = index === displayed.length - 1;
          if (React.isValidElement(text)) {
            const element = text as React.ReactElement<{ id?: string }>;
            if (element.props.id?.startsWith('target')) {
              return <div key={`target-wrapper-${index}`} ref={isLast ? lastItemRef : null}>
                  {element}
                </div>
            }
          }
          return (
            <div key={`${userMsg}-${index}`} ref={isLast ? lastItemRef : null}>
              <BubbleLeft index={index} text={text} />
            </div>
          );
        })}
      {loadingIndex !== null && (
        <div className="bg-slate-600 relative w-10 h-8 rounded-lg flex justify-center font-bold text-xl">
          <p className="animate-bounce animation-delay-150">.</p>
          <p className="animate-bounce animation-delay-200">.</p>
          <p className="animate-bounce animation-delay-[250ms]">.</p>
        </div>
      )}
    </>
  );
}
export default TextAppear;
