"use client";

import { useState, useEffect, forwardRef } from "react";
import { motion } from "framer-motion";
import styles from "./Modal.module.css";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosArrowForward, IoIosClose } from "react-icons/io";

export const Modal = forwardRef(function Modal(
	{ id, title, time, ingrNum, likes, onClick },
	ref
) {
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
			transition: { type: "spring", bounce: 0.4, duration: 1.6 }
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
				duration: 2.0
			}
		},
		exit: {
			opacity: 0.0,
			rotateZ: 78
		}
	};

	const { recipesList } = useAppSelector((state) => state.recipes);

	const [actualTitle, setActualTitle] = useState("");
	useEffect(() => {
		setActualTitle(ref.current.textContent);
	}, [ref]);

	const recipePresence =
		recipesList.filter((recipe) => String(recipe.id) === String(id)).length > 0;

	return (
		<motion.div key={id} className={styles["modal-general-container"]}>
			<div className={styles["modal-text-container"]}>
				<motion.label
					className={styles["modal-link-label"]}
					variants={textVariant}
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<Link
						className={styles["modal-link"]}
						href={
							id > 0
								? `/search/${id}${recipePresence ? "/saved" : ""}`
								: "/search"
						}
					>
						<IoIosArrowForward />
					</Link>
				</motion.label>

				{id > 0 && (
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
						<p className={styles["modal-text"]}>{time} min.</p>
						<p className={styles["modal-text"]}>
							<AiOutlineLike />
							{likes}{" "}
						</p>
					</motion.div>
				)}
			</div>
			<motion.button
				variants={textVariant}
				initial="hidden"
				animate="visible"
				exit="exit"
				className={styles["modal-btn"]}
				onClick={() => {
					return onClick(actualTitle);
				}}
			>
				{<IoIosClose />}
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
});
