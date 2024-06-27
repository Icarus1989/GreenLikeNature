"use client";

import { motion } from "framer-motion";

export default function AnimatedText({ text, className }) {
	const chars = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q"
	];
	return (
		<motion.h2 className={className}>
			{text.split("").map((char, index) => {
				return (
					<motion.span
						key={index}
						style={{
							color: `rgba(2, ${160 + index * 4}, ${23 + index * 4.5}, 0.9)`,
							margin: char !== " " ? "0%" : "0% 2% 0% 2%",
							gridArea: `${chars[index]}`
						}}
					>
						{char}
					</motion.span>
				);
			})}
		</motion.h2>
	);
}
