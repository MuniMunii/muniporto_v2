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
  // ini buat animation style
  const x = useSpring(mouseX,spring);
  const y = useSpring(mouseY,spring);
  useEffect(() => {
    if (!ref.current) return;
    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [ref, x, y]);
  return { x, y,mouseX,mouseY };
}
export default function Pointer() {
  const [hover, setHover] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { x, y,mouseX,mouseY } = useFollowPointer(ref);
  const size = hover ? 0 : 12;
  useEffect(() => {
    const interval = setInterval(() => {
      const el = document.elementFromPoint(mouseX.get(), mouseY.get());
      if (el instanceof HTMLButtonElement) {
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
      className={`size-fit absolute pointer-events-none rounded-full z-50 bg-pink-white border-white border-2 flex justify-center items-center`}
      style={{
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
