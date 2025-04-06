import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";
const spring = {
  damping: 80,
  stiffness: 800,
  restDelta: 0.001,
};
function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
  // ini real cursor nya
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // buat ngikutin viewport
  // debugging kalo gak pake ini pointer ga bisa work kalo height nya expanding karna viewport nya udah beda
  const viewportX = useMotionValue(0);
  const viewportY = useMotionValue(0);
  // ini buat animation style
  const x = useSpring(mouseX,spring);
  const y = useSpring(mouseY,spring);
  useEffect(() => {
    if (!ref.current) return;
    // pake page biar work semua document
    // pake client buat cuma viewport
    const handlePointerMove = ({ pageX, pageY,clientX,clientY }: MouseEvent) => {
      mouseX.set(pageX);
      mouseY.set(pageY);
      viewportX.set(clientX)
      viewportY.set(clientY)
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [ref, x, y,mouseX, mouseY, viewportX, viewportY]);
  return { x, y,mouseX,mouseY,viewportX,viewportY };
}
export default function Pointer() {
  const [hover, setHover] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { x, y, mouseX, mouseY, viewportX, viewportY } = useFollowPointer(ref);
  const size = hover ? 0 : 12;
  useEffect(() => {
    
    const interval = setInterval(() => {
      const el = document.elementFromPoint(viewportX.get(), viewportY.get());
      if (el?.matches('#hover')||el?.closest('#hover')||el instanceof HTMLButtonElement) {
        console.log("Hovering on:", el?.tagName, el?.id);
        setHover(true);
      } else {
        setHover(false);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [mouseX, mouseY]);
  return (
    <motion.div
      ref={ref}
      animate={{padding:size}}
      className={`size-fit absolute rounded-full z-50 bg-pink-white border-white border-2 flex justify-center items-center`}
      style={{
        pointerEvents: 'none',
        x: useTransform(x, (v) => v - size / 2),
        y: useTransform(y, (v) => v - size / 2),
        top: 0,
        left: 0,
        transform:`translate(-50%,-50%)`
      }}
    >
      <div className="size-3 bg-pink-500 rounded-full"></div>
    </motion.div>
  );
}
