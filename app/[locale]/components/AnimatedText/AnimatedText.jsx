"use client";

import { GeneralContext } from "@/app/generalContext/GeneralContext";
import { useState, useRef, useContext, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const defaultVariations = {
	hidden: {
		opacity: 0.0,
		color: "rgba(230, 230, 230, 0.0)"
	},
	visible: { opacity: 1.0, color: "rgba(2, 180, 2, 0.9)", delay: 0.1 },
	exit: { opacity: 1.0, color: "rgba(2, 180, 2, 1.0)" }
};

export default function AnimatedText({ text, className }) {
	// const settings = useContext(GeneralContext);
	// const titleAnimated = settings["title-animation"];

	// const [execute, setExecute] = useState(true);

	// const ref = useRef(null);
	// const isInView = useInView(ref, { amount: 0.5, once: true });

	return (
		<motion.h2 className={className}>
			{
				// 	!execute ? (
				// 	<motion.span
				// 		ref={ref}
				// 		initial="hidden"
				// 		animate={isInView ? "visible" : "hidden"}
				// 		transition={{ staggerChildren: 0.05, delay: 0 }}
				// 		aria-hidden
				// 	>
				// 		{text.split("").map((char, index) => {
				// 			if (index === text.length - 1) {
				// 				return (
				// 					<motion.span
				// 						key={index}
				// 						variants={defaultVariations}
				// 						// onAnimationComplete={() => handleAnimComplete()}
				// 					>
				// 						{char}
				// 					</motion.span>
				// 				);
				// 			} else {
				// 				return (
				// 					<motion.span key={index} variants={defaultVariations}>
				// 						{char}
				// 					</motion.span>
				// 				);
				// 			}
				// 		})}
				// 	</motion.span>
				// ) :
				// text

				text.split("").map((char, index) => {
					return (
						<motion.span
							key={index}
							style={{
								color: `rgba(2, ${200 - index * 3}, 3)`,
								margin: char !== " " ? "0%" : "0% 2% 0% 2%"
							}}
							// variants={defaultVariations}
							// onAnimationComplete={() => handleAnimComplete()}
						>
							{char}
						</motion.span>
					);
				})
			}
		</motion.h2>
	);
}
