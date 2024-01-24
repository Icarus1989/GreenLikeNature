"use client";

import { useState, useEffect, forwardRef, Fragment } from "react";
import { motion, AnimatePresence, usePresence } from "framer-motion";
import styles from "./Modal.module.css";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";

import { IoRestaurantOutline } from "react-icons/io5";
import { PiFlowerTulipDuotone } from "react-icons/pi";
import RecipeSvgComponent from "./RecipeSvg";
import { IoIosArrowForward } from "react-icons/io";

// import icon

export const Modal = forwardRef(
	({ id, title, ingrNum, likes, onClick }, ref) => {
		// const containerVariant = {
		// 	hidden: {
		// 		opacity: 0.0
		// 	},
		// 	visible: {
		// 		opacity: 1.0,
		// 		transition: {
		// 			duration: 0.8
		// 		}
		// 	},
		// 	exit: {
		// 		opacity: 0.0,
		// 		transition: {
		// 			duration: 0.5
		// 		}
		// 	}
		// };

		const textVariant = {
			hidden: {
				opacity: 0.0
			},
			visible: {
				opacity: 1.0,
				transition: {
					duration: 0.8
				}
			},
			exit: {
				opacity: 0.0,
				transition: {
					duration: 0.5
				}
			}
		};

		const firstLeafVariant = {
			hidden: {
				opacity: 0.0,
				rotateZ: 78
			},
			visible: {
				opacity: 1.0,
				rotateZ: 0,
				transition: { type: "spring", bounce: 0.4, duration: 0.8 }
			},
			exit: {
				opacity: 0.0,
				rotateZ: 78,
				transition: {
					duration: 0.8
				}
			}
		};

		const secondLeafVariant = {
			hidden: {
				opacity: 0.0,
				rotateZ: 78
			},
			visible: {
				opacity: 1.0,
				rotateZ: 30,
				transition: {
					type: "spring",
					bounce: 0.4,
					duration: 1.0
				}
			},
			exit: {
				opacity: 0.0,
				rotateZ: 78
			}
		};
		// const pathVariants = {
		// 	hidden: {
		// 		pathLength: 0,
		// 		opacity: 1.0
		// 	},
		// 	visible: {
		// 		stroke: "rgba(2, 180, 2, 0.8)",
		// 		strokeWidth: "0.8px",
		// 		pathLength: 1.1,
		// 		opacity: 1.0,
		// 		transition: {
		// 			duration: 5
		// 		}
		// 	}
		// };
		// const [isPresent, safeToRemove] = usePresence();

		// useEffect(() => {
		// 	!isPresent && setTimeout(safeToRemove, 1000);
		// }, [isPresent]);
		const [actualTitle, setActualTitle] = useState("");
		// const [isVisible, setIsVisible] = useState(true);
		useEffect(() => {
			setActualTitle(ref.current.textContent);
		}, []);
		console.log(actualTitle);

		// const [isPresent, safeToRemove] = usePresence();

		// useEffect(() => {
		// 	!isVisible && !isPresent && setTimeout(safeToRemove, 1000);
		// }, [isVisible, isPresent]);

		return (
			<motion.div
				key={id}
				className={styles["modal-general-container"]}
				// variants={containerVariant}
				// initial="hidden"
				// animate="visible"
				// exit="exit"
			>
				<div className={styles["modal-text-container"]}>
					{/* <h4 className={styles["modal-title"]} ref={ref}>
						{title}
					</h4> */}
					<motion.label
						className={styles["modal-link-label"]}
						variants={textVariant}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<Link className={styles["modal-link"]} href={`/search/${id}`}>
							<IoIosArrowForward />
						</Link>
					</motion.label>

					<motion.div
						className={styles["modal-recipe-infos"]}
						variants={textVariant}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<p className={styles["modal-text"]}>
							{ingrNum} Ingr{ingrNum > 0 ? "s" : ""}
						</p>
						<p className={styles["modal-text"]}>10 min.</p>
						<p className={styles["modal-text"]}>
							<AiOutlineLike />
							{likes}{" "}
						</p>
					</motion.div>
				</div>
				<motion.button
					variants={textVariant}
					initial="hidden"
					animate="visible"
					exit="exit"
					className={styles["modal-btn"]}
					onClick={() => {
						// setIsVisible(false);
						return onClick(actualTitle);
					}}
				>
					<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M 150 110 C 127.838 110 110 127.838 110 150 C 110 172.162 127.838 190 150 190 C 172.162 190 190 172.162 190 150 C 190 127.838 172.162 110 150 110 Z M 43.653 22.504 C 36.814 22.602 31.513 24.557 28.049 28.035 C 21.864 34.222 20.496 46.205 25.82 62.113 C 31.135 78.022 42.835 96.68 59.712 113.555 C 65.882 119.725 72.35 125.225 78.742 129.985 C 85.806 105.303 105.433 85.901 130.187 79.062 C 125.429 72.521 119.853 65.978 113.61 59.733 C 96.733 42.859 78.074 31.128 62.165 25.806 C 55.176 23.479 48.932 22.432 43.653 22.504 Z M 78.594 170.128 C 72.2 174.886 65.882 180.311 59.712 186.407 C 42.835 203.283 31.141 221.942 25.834 237.851 C 20.474 253.759 21.842 265.727 28.041 271.972 C 34.212 278.141 46.256 279.555 62.091 274.127 C 77.999 268.85 96.659 257.103 113.534 240.228 C 119.63 234.133 125.058 227.813 129.815 221.42 C 105.06 214.432 85.582 194.881 78.594 170.128 Z M 221.033 169.829 C 214.267 194.659 194.79 214.285 170.11 221.348 C 174.792 227.74 180.219 234.133 186.389 240.228 C 203.265 257.103 221.925 268.775 237.834 274.127 C 253.744 279.405 265.712 278.068 271.882 271.897 C 278.127 265.727 279.466 253.685 274.113 237.775 C 268.834 221.867 257.089 203.208 240.213 186.333 C 233.969 180.089 227.574 174.589 221.033 169.829 Z M 256.345 22.504 C 251.066 22.432 244.823 23.493 237.908 25.835 C 221.998 31.143 203.339 42.859 186.465 59.733 C 180.144 66.053 174.568 72.594 169.812 79.137 C 194.493 86.049 213.97 105.527 220.959 130.207 C 227.501 125.375 234.042 119.8 240.288 113.555 C 257.162 96.68 268.834 78.022 274.187 62.113 C 279.539 46.205 278.127 34.242 271.957 28.044 C 268.463 24.557 263.185 22.594 256.345 22.504 Z"
							fillOpacity="1"
							fill="url(#closeGradient)"
						/>
						<defs>
							<radialGradient
								cx="50%"
								cy="50%"
								// x2="0%"
								// y1="0%"
								// y2="0%"
								id="closeGradient"
							>
								<stop offset="5%" stopColor="#F9A825" />
								{/* <stop offset="30%" stopColor="rgb(123, 19, 161)" /> */}
								<stop offset="15%" stopColor="#F57F17" />
								{/* <stop offset="30%" stopColor="rgb(154, 23, 202)" /> */}
								<stop offset="23%" stopColor="#F44336" />
								{/* <stop offset="99.1%" stopColor="rgb(123, 19, 161)" /> */}
								{/* <stop offset="80%" stopColor="rgb(230, 230, 230)" /> */}
								{/* <stop offset="82%" stopColor="rgb(230, 230, 230)" /> */}

								<stop offset="80%" stopColor="#D50000" />
								<stop offset="90%" stopColor="#C62828" />
								{/* <stop offset="100%" stopColor="rgb(239, 109, 215)" /> */}
								{/* <stop offset="150%" stopColor="rgb(123, 19, 161)" /> */}
							</radialGradient>
						</defs>
					</svg>
					{/* <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M 150.001 110 C 127.839 110 110.001 127.838 110.001 150 C 110.001 172.162 127.839 190 150.001 190 C 172.163 190 190.001 172.162 190.001 150 C 190.001 127.838 172.163 110 150.001 110 Z M 245.919 35.003 C 241.158 34.937 235.527 35.895 229.29 38.007 C 214.94 42.795 198.11 53.362 182.89 68.582 C 177.189 74.282 172.16 80.182 167.87 86.083 C 190.131 92.318 207.699 109.886 214.002 132.147 C 219.903 127.789 225.803 122.76 231.436 117.127 C 246.657 101.907 257.184 85.077 262.012 70.728 C 266.84 56.38 265.566 45.59 260.001 39.999 C 256.849 36.854 252.089 35.084 245.919 35.003 Z M 214.069 167.885 C 207.967 190.28 190.399 207.982 168.138 214.352 C 172.362 220.118 177.257 225.884 182.822 231.382 C 198.043 246.603 214.874 257.13 229.223 261.958 C 243.573 266.718 254.368 265.512 259.933 259.946 C 265.566 254.381 266.773 243.519 261.945 229.169 C 257.184 214.821 246.59 197.991 231.369 182.77 C 225.737 177.138 219.969 172.177 214.069 167.885 Z M 85.595 168.154 C 79.828 172.445 74.129 177.339 68.564 182.837 C 53.342 198.058 42.795 214.888 38.007 229.237 C 33.173 243.586 34.407 254.381 39.999 260.014 C 45.564 265.578 56.427 266.853 70.71 261.958 C 85.058 257.197 101.889 246.603 117.11 231.382 C 122.608 225.884 127.504 220.184 131.794 214.418 C 109.466 208.115 91.898 190.481 85.595 168.154 Z M 54.08 35.003 C 47.911 35.091 43.13 36.854 40.006 39.992 C 34.427 45.571 33.193 56.38 37.995 70.728 C 42.789 85.077 53.342 101.907 68.564 117.127 C 74.129 122.693 79.963 127.654 85.729 131.946 C 92.1 109.684 109.802 92.185 132.13 86.016 C 127.838 80.116 122.809 74.215 117.178 68.582 C 101.956 53.362 85.126 42.781 70.776 37.981 C 64.473 35.882 58.841 34.937 54.08 35.003 Z"
							fillOpacity="1"
							fill="url(#closeGradient)"
							// style={{
							// 	stroke: "rgb(0, 0, 0)",
							// 	strokeWidth: "3px",
							// 	fill: "none"
							// }}
						/>
						<defs>
							<radialGradient
								cx="50%"
								cy="50%"
								// x2="0%"
								// y1="0%"
								// y2="0%"
								id="closeGradient"
							>
								<stop offset="5%" stopColor="#F9A825" />
								<stop offset="20%" stopColor="#F57F17" />
								<stop offset="65%" stopColor="#F44336" />

								<stop offset="90%" stopColor="#D50000" />
								<stop offset="99%" stopColor="#B71C1C" />
							</radialGradient>
						</defs>
					</svg> */}
				</motion.button>

				<motion.div
					key={`${id}firstLeaf`}
					variants={firstLeafVariant}
					initial="hidden"
					animate="visible"
					exit="exit"
					className={styles["modal-first-leaf"]}
				></motion.div>
				<motion.div
					key={`${id}secondLeaf`}
					variants={secondLeafVariant}
					initial="hidden"
					animate="visible"
					exit="exit"
					className={styles["modal-second-leaf"]}
				></motion.div>
			</motion.div>
		);
	}
);

// export default function Modal({ id, title, ingrNum, likes, onClick }) {
// 	return (
// 		<div className={styles["modal-container"]}>
// 			<h4 ref={ref}>{title}</h4>
// 			<p>
// 				{ingrNum} Ingredient{ingrNum > 0 ? "s" : ""}
// 			</p>
// 			<p>{likes} </p>
// 			<Link href={`/search/${id}`}>Vedi Ricetta {"icona freccia"}</Link>
// 			<button onClick={onClick}>Close Modal</button>
// 		</div>
// 	);
// }
