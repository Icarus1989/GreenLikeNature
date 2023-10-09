"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const defaultVariations = {
	hidden: {
		opacity: 0.0,
		color: "rgba(230, 230, 230, 1.0)"
	},
	visible: { opacity: 1.0, color: "rgba(8, 140, 0, 1.0)", delay: 0.1 },
	exit: { opacity: 1.0, color: "rgba(2, 180, 2, 1.0)" }
};

export default function AnimatedText({ text, className }) {
	const [execute, setExecute] = useState(true);
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.5, once: true });
	return (
		<h2 className={className}>
			<motion.span
				ref={ref}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				// exit="exit"
				transition={{ staggerChildren: 0.05, delay: 0 }}
				aria-hidden
			>
				{text.split("").map((char, index) => {
					return (
						<motion.span key={index} variants={defaultVariations}>
							{char}
						</motion.span>
					);
				})}
			</motion.span>
		</h2>
	);
}
