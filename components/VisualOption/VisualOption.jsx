"use client";

import { useState, useEffect, useRef } from "react";
import { GoHome, GoBookmark } from "react-icons/go";
import TomatoLeaf from "../TomatoLeaf/TomatoLeaf";
import { motion } from "framer-motion";
import styles from "./VisualOption.module.css";

export default function VisualOption() {
	const firstInputRef = useRef(null);
	const secondInputRef = useRef(null);

	const [homeSettings, setHomeSettings] = useState({
		seasonal: true,
		saved: false
	});

	const pathVariants = {
		hidden: {
			stroke: "rgba(230, 230, 230, 0.9)",
			pathLength: 0
		},
		visible: {
			stroke: "rgba(2, 180, 2, 0.9)",
			pathLength: 1.1,
			opacity: 1.0,
			transition: {
				duration: 0.9,
				delay: 0.1
			}
		},
		exit: {
			transition: {
				duration: 0.9,
				delay: 0.1
			}
		}
	};

	const pathVariantsInverted = {
		hidden: {
			stroke: "rgba(230, 230, 230, 0.9)",
			pathLength: 1.1,
			opacity: 1.0
		},
		visible: {
			pathLength: 0,
			opacity: 0.0,
			transition: {
				duration: 1.2,
				delay: 0.1
			}
		},
		exit: {
			transition: {
				duration: 0.9,
				delay: 0.1
			}
		}
	};

	return (
		<form className={styles["options-form"]}>
			<fieldset className={styles["visual-options-fieldset"]}>
				<legend className={styles["visual-options-legend"]}>
					<TomatoLeaf />
					{<GoHome className={styles["legend-svg"]} />}
				</legend>
				<p className={styles["description"]}>
					Seleziona le ricette da visualizzare nella Home Page:
				</p>
				<div className={styles["inputs-container"]}>
					<label
						htmlFor="radioInputSeason"
						style={
							homeSettings.seasonal
								? { color: "rgba(230, 230, 230, 0.9)" }
								: { color: "rgba(123, 123, 123, 0.9)" }
						}
					>
						<motion.svg
							xmlns="http://www.w3.org/2000/svg"
							className={styles["plant-icon"]}
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<motion.path
								stroke="rgba(230, 230, 230, 0.9)"
								strokeWidth="2px"
								variants={pathVariants}
								initial="hidden"
								animate={homeSettings.seasonal ? "visible" : ""}
								exit="exit"
								className={styles["leaf-path"]}
								d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3"
							/>
							<motion.path
								// pathLength="0"
								stroke="rgba(230, 230, 230, 0.9)"
								strokeWidth="2px"
								variants={pathVariants}
								initial="hidden"
								animate={homeSettings.seasonal ? "visible" : ""}
								exit="exit"
								className={styles["leaf-path"]}
								d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3"
							/>
							<motion.path
								// pathLength="0"
								stroke="rgba(230, 230, 230, 0.9)"
								strokeWidth="2px"
								variants={pathVariants}
								initial="hidden"
								animate={homeSettings.seasonal ? "visible" : ""}
								exit="exit"
								className={styles["leaf-path"]}
								d="M12 20l0 -10"
							/>
						</motion.svg>
						<motion.svg
							xmlns="http://www.w3.org/2000/svg"
							className={styles["plant-icon-white"]}
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<motion.path
								// pathLength="0"
								stroke="rgba(230, 230, 230, 1.0)"
								strokeWidth="2px"
								variants={pathVariantsInverted}
								initial={homeSettings.seasonal ? "" : "hidden"}
								animate={homeSettings.seasonal ? "visible" : ""}
								// exit="exit"
								className={styles["leaf-path"]}
								d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3"
							/>
							<motion.path
								// pathLength="0"
								stroke="rgba(230, 230, 230, 1.0)"
								strokeWidth="2px"
								variants={pathVariantsInverted}
								initial="hidden"
								animate={homeSettings.seasonal ? "visible" : ""}
								// exit="exit"
								className={styles["leaf-path"]}
								d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3"
							/>
							<motion.path
								// pathLength="0"
								stroke="rgba(230, 230, 230, 1.0)"
								strokeWidth="2px"
								variants={pathVariantsInverted}
								initial="hidden"
								animate={homeSettings.seasonal ? "visible" : ""}
								// exit="exit"
								className={styles["leaf-path"]}
								d="M12 20l0 -10"
							/>
						</motion.svg>
						<input
							ref={firstInputRef}
							onFocus={() => {
								// firstInputRef.current.closest("label").style.color =
								// 	"rgba(230, 230, 230, 0.9)";
								setHomeSettings((prevValue) => {
									return { ...prevValue, seasonal: true, saved: false };
								});
								// return setIsActiveLeaf(true);
							}}
							onBlur={() => {
								// firstInputRef.current.closest("label").style.color =
								// 	"rgba(123, 123, 123, 0.9)";
								console.log("Blur.");
								// return setIsActiveLeaf(false);
							}}
							type="radio"
							id="radioInputSeason"
							value="season"
						/>
						SEASONAL
					</label>

					<label
						htmlFor="radioInputSaved"
						style={
							homeSettings.saved
								? { color: "rgba(230, 230, 230, 0.9)" }
								: { color: "rgba(123, 123, 123, 0.9)" }
						}
					>
						<motion.svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
							className={styles["bookmark-icon"]}
						>
							<motion.path
								fill="rgba(230, 230, 230, 0.0)"
								stroke="rgba(230, 230, 230, 0.9)"
								strokeWidth="1.5px"
								variants={pathVariants}
								initial="hidden"
								animate={homeSettings.saved ? "visible" : ""}
								exit="exit"
								d="M5 3.75C5 2.784 5.784 2 6.75 2h10.5c.966 0 1.75.784 1.75 1.75v17.5a.75.75 0 0 1-1.218.586L12 17.21l-5.781 4.625A.75.75 0 0 1 5 21.25Zm1.75-.25a.25.25 0 0 0-.25.25v15.94l5.031-4.026a.749.749 0 0 1 .938 0L17.5 19.69V3.75a.25.25 0 0 0-.25-.25Z"
							/>
						</motion.svg>
						<motion.svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
							className={styles["bookmark-icon-white"]}
						>
							<motion.path
								fill="rgba(230, 230, 230, 0.0)"
								stroke="rgba(230, 230, 230, 0.9)"
								strokeWidth="1.5px"
								variants={pathVariantsInverted}
								initial="hidden"
								animate={homeSettings.saved ? "visible" : ""}
								exit="exit"
								d="M5 3.75C5 2.784 5.784 2 6.75 2h10.5c.966 0 1.75.784 1.75 1.75v17.5a.75.75 0 0 1-1.218.586L12 17.21l-5.781 4.625A.75.75 0 0 1 5 21.25Zm1.75-.25a.25.25 0 0 0-.25.25v15.94l5.031-4.026a.749.749 0 0 1 .938 0L17.5 19.69V3.75a.25.25 0 0 0-.25-.25Z"
							/>
						</motion.svg>
						<input
							type="radio"
							id="radioInputSaved"
							value="saved"
							ref={secondInputRef}
							onFocus={() => {
								// secondInputRef.current.closest("label").style.color =
								// 	"rgba(230, 230, 230, 0.9)";
								setHomeSettings((prevValue) => {
									return { ...prevValue, seasonal: false, saved: true };
								});
								// return setIsActiveBookmark(true);
							}}
							onBlur={() => {
								// secondInputRef.current.closest("label").style.color =
								// 	"rgba(123, 123, 123, 0.9)";
								console.log("Blur.");
								// return setIsActiveBookmark(false);
							}}
						/>
						SAVED
					</label>
					<div className={styles["inputs-plate"]}></div>
				</div>
			</fieldset>
		</form>
	);
}
