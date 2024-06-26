
// react.js next.js node.js mongodb

"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimation, useInView } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

const Reveal = ({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      slideControls.start("visible");
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className={cn("relative rounded-lg w-fit overflow-hidden", className)}
    >
      {children}
      <motion.div
        variants={{ hidden: { left: 0 }, visible: { left: "100%" } }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeIn", delay: 0.4 }}
        className="absolute inset-0 rounded-lg z-20 bg-stone-700 w-full h-full"
      ></motion.div>
    </div>
  );
};

export default Reveal;
