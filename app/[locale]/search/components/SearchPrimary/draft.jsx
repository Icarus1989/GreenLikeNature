// "use client";

// import { Fragment, useEffect, useState, useRef } from "react";
// import Link from "next/link";
// import { motion, useScroll, useMotionValueEvent } from "framer-motion";
// import SearchBar from "@/components/SearchBar/SearchBar";
// import ArticlesSection from "@/components/ArticlesSection/ArticlesSection";
// import StrawCoupleLeaves from "@/components/StrawCoupleLeaves/StrawCoupleLeaves";
// import { GoX } from "react-icons/go";
// import styles from "./SearchPrimary.module.css";

// import recipes from "../../spoonTempData/tempData.json";

// export default function SearchPrimaryComponent() {
// 	const [view, setView] = useState(false);
// 	const [query, setQuery] = useState("");
// 	const [searchTerm, setSearchTerm] = useState("");
// 	// const [leafOneDisplay, setLeafOneDisplay] = useState(false); // *
// 	// const [leafTwoDisplay, setLeafTwoDisplay] = useState(false); // *
// 	// const [leafThreeDisplay, setLeafThreeDisplay] = useState(false); // *
// 	// <--- da trasformare in unico State --->
// 	const [leavesDisplay, setLeavesDisplay] = useState({
// 		first: false,
// 		second: false,
// 		third: false
// 	});

// 	// const [leavesDisplay, setLeavesDisplay] = useState([
// 	// 	{ first: false },
// 	// 	{ second: false },
// 	// 	{ third: false }
// 	// ]);

// 	const resultsRef = useRef(null);
// 	const leafBranch = useRef(null);

// 	const data = recipes.filter((recipe) =>
// 		recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
// 	);

// 	const seasonalFrtAndVegFromContextOrRedux = ["Pears", "Peppers"];

// 	const { scrollYProgress } = useScroll({
// 		container: resultsRef
// 	});

// 	useMotionValueEvent(scrollYProgress, "change", (latest) => {
// 		if (!view) {
// 			scrollYProgress.set(0);
// 		}

// 		if (searchTerm.length > 0) {
// 			if (latest >= 0.4 && !leavesDisplay.first) {
// 				// console.log("op1");
// 				// setLeafOneDisplay(true);
// 				setLeavesDisplay((prevLeavesDisplay) => {
// 					return { ...prevLeavesDisplay, first: true };
// 				});
// 			} else if (latest < 0.4 && leavesDisplay.first === true) {
// 				// setLeafOneDisplay(false);
// 				setLeavesDisplay((prevLeavesDisplay) => {
// 					return { ...prevLeavesDisplay, first: false };
// 				});
// 				// console.log("op2");
// 			} else if (latest >= 0.8 && !leavesDisplay.second) {
// 				// console.log("op3");
// 				// setLeafTwoDisplay(true);
// 				setLeavesDisplay((prevLeavesDisplay) => {
// 					return { ...prevLeavesDisplay, second: true };
// 				});
// 			} else if (latest < 0.8 && leavesDisplay.second === true) {
// 				// console.log("op4");
// 				// setLeafTwoDisplay(false);
// 				setLeavesDisplay((prevLeavesDisplay) => {
// 					return { ...prevLeavesDisplay, second: false };
// 				});
// 			} else if (latest >= 0.98 && !leavesDisplay.third) {
// 				// console.log("op5");
// 				// setLeafThreeDisplay(true);
// 				setLeavesDisplay((prevLeavesDisplay) => {
// 					return { ...prevLeavesDisplay, third: true };
// 				});
// 			} else if (latest < 0.98 && leavesDisplay.third === true) {
// 				// console.log("op6");
// 				// setLeafThreeDisplay(false);
// 				setLeavesDisplay((prevLeavesDisplay) => {
// 					return { ...prevLeavesDisplay, third: false };
// 				});
// 			}
// 		}
// 	});

// 	console.log(leavesDisplay);

// 	useEffect(() => {
// 		window.addEventListener("blur", handleCloseTab);
// 		return () => {
// 			window.removeEventListener("blur", handleCloseTab);
// 		};
// 	}, []);

// 	function handleChange(event) {
// 		resultsRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
// 		if (event.target.value.length > 0) {
// 			scrollYProgress.set(0);

// 			setView(true);
// 		} else {
// 			// setLeafOneDisplay(false);
// 			// setLeafTwoDisplay(false);
// 			// setLeafThreeDisplay(false);
// 			setLeavesDisplay(() => {
// 				return { first: false, second: false, third: false };
// 			});
// 			setView(false);
// 		}
// 		setSearchTerm(event.target.value);

// 		// recipes
// 		// 	.filter((recipe) => recipe.title === query)
// 		// 	.map((elem) => {
// 		// 		return <li>{elem.title}</li>;
// 		// 	});
// 		// console.log(query);

// 		// Usare query fuori da questa funzione a rerender avvenuto
// 		// cambiare element in form in modo da gestire onSubmit...
// 		// ...quando verrà premuto Enter nella tastiera o a x secondi
// 		// dopo aver fermato la digitazione
// 	}

// 	function handleSubmit(event) {
// 		event.preventDefault();
// 		// setRecipesList(recipes.filter((recipe) => recipe.title.includes(query)));
// 		// Da spostare in handleChange--->
// 		setQuery(searchTerm); // <---
// 		// Aggiungere ricerca usando query impostato in handleChange
// 		console.log(
// 			// Da spostare in handleChange, come suggeriemnti
// 			recipes.filter((recipe) =>
// 				recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
// 			)
// 		);

// 		setSearchTerm("");
// 	}

// 	function handleCloseTab() {
// 		setQuery("");
// 		setSearchTerm("");
// 		scrollYProgress.set(0);
// 		// setLeafOneDisplay(false);
// 		// setLeafTwoDisplay(false);
// 		// setLeafThreeDisplay(false);
// 		setLeavesDisplay(() => {
// 			return { first: false, second: false, third: false };
// 		});
// 		setView(() => {
// 			return false;
// 		});
// 	}

// 	return (
// 		<section
// 			className={styles["container"]}
// 			onContextMenu={(event) => event.preventDefault()}
// 			tabIndex={0}
// 		>
// 			<form onSubmit={handleSubmit} className={styles["search-part"]}>
// 				<SearchBar
// 					value={searchTerm}
// 					onChange={handleChange}
// 					position="static"
// 				/>
// 			</form>
// 			<div ref={resultsRef} className={styles["results-part"]}>
// 				{!view ? (
// 					seasonalFrtAndVegFromContextOrRedux.map((elem) => {
// 						return (
// 							<Fragment key={elem}>
// 								<ArticlesSection recipes={recipes} name={elem} />
// 							</Fragment>
// 						);
// 					})
// 				) : (
// 					<motion.div>
// 						<motion.button
// 							className={styles["cancel-btn"]}
// 							onClick={handleCloseTab}
// 						>
// 							<StrawCoupleLeaves
// 								id="btnLeafOne"
// 								isActive={false}
// 								width="6dvh"
// 								topMeasure="-100%"
// 								leftMeasure="27%"
// 								scale="0.6"
// 								rotateZ={"290deg"}
// 								rotateY={"50deg"}
// 								leafWidth="6dvh"
// 								leafHeight="6dvh"
// 								filter={`brightness(0.9)`}
// 							/>
// 							<StrawCoupleLeaves
// 								id="btnLeafTwo"
// 								isActive={false}
// 								width="6dvh"
// 								topMeasure="-100%"
// 								leftMeasure="27%"
// 								scale="0.6"
// 								rotateZ={"160deg"}
// 								rotateY={"50deg"}
// 								leafWidth="6dvh"
// 								leafHeight="6dvh"
// 								filter={`brightness(1.05)`}
// 							/>

// 							<GoX className={styles["x-icon"]} />
// 						</motion.button>
// 						<motion.div className={styles["straw-plant-container"]}>
// 							<motion.svg
// 								viewBox="0 0 50 200"
// 								xmlns="http://www.w3.org/2000/svg"
// 								className={styles["straw-plant"]}
// 							>
// 								<motion.path
// 									stroke="url(#branchesGradient)"
// 									style={{
// 										pathLength: scrollYProgress
// 									}}
// 									d="M 25.358 0 C 25.358 0 28.144 5.149 29.101 7.646 C 29.961 9.889 30.525 11.716 30.978 14.25 C 31.567 17.546 32.044 22.203 31.867 25.83 C 31.708 29.081 31.047 32.128 30.251 35.02 C 29.503 37.737 28.375 40.141 27.326 42.718 C 26.248 45.367 24.877 48.013 23.858 50.7 C 22.856 53.343 21.907 55.911 21.249 58.707 C 20.554 61.657 20.067 64.782 19.87 67.98 C 19.661 71.37 19.66 74.939 20.13 78.509 C 20.631 82.31 21.652 86.558 22.936 90.117 C 24.112 93.377 26.012 96.084 27.339 99.116 C 28.645 102.101 29.89 104.844 30.85 108.166 C 31.961 112.011 32.875 116.429 33.337 120.929 C 33.845 125.88 34.252 131.366 33.528 136.674 C 32.756 142.331 30.237 148.825 28.527 153.848 C 27.153 157.883 25.295 161.189 24.322 164.595 C 23.484 167.526 22.922 170.091 22.761 172.997 C 22.59 176.083 22.913 179.497 23.465 182.611 C 24.005 185.659 24.96 188.788 25.998 191.492 C 26.927 193.911 29.251 198.133 29.251 198.133"
// 								/>
// 								<motion.path
// 									stroke="url(#branchesGradient)"
// 									style={{
// 										pathLength: scrollYProgress
// 									}}
// 									d="M 22.699 0.12 C 22.699 0.12 25.484 5.269 26.442 7.766 C 27.301 10.009 27.866 11.836 28.319 14.37 C 28.908 17.667 29.385 22.323 29.208 25.95 C 29.049 29.201 28.388 32.248 27.592 35.14 C 26.844 37.857 25.715 40.261 24.667 42.838 C 23.589 45.487 22.218 48.133 21.199 50.82 C 20.196 53.463 19.248 56.031 18.59 58.827 C 17.895 61.777 17.407 64.902 17.211 68.1 C 17.002 71.49 17.001 75.059 17.471 78.629 C 17.971 82.43 18.993 86.678 20.277 90.237 C 21.452 93.497 23.352 96.204 24.68 99.236 C 25.986 102.221 27.231 104.964 28.191 108.286 C 29.302 112.131 30.216 116.55 30.678 121.049 C 31.186 126.001 31.593 131.486 30.869 136.794 C 30.097 142.451 27.578 148.945 25.868 153.968 C 24.494 158.003 22.636 161.309 21.663 164.715 C 20.825 167.646 20.263 170.211 20.102 173.117 C 19.931 176.203 20.254 179.617 20.806 182.731 C 21.346 185.779 22.3 188.909 23.339 191.612 C 24.268 194.031 26.592 198.253 26.592 198.253"
// 								/>
// 								<motion.path
// 									ref={leafBranch}
// 									style={{
// 										pathLength: scrollYProgress
// 									}}
// 									d="M 27.712 0.039 C 27.712 0.039 29.62607526952485 3.729081004519738 30.495 5.935 C 31.542739816323888 8.59487269332988 32.76785425398221 12.170131335172089 33.382 14.964 C 33.893948545742944 17.292953687670675 34.11568968204748 19.16320461015276 34.192 21.501 C 34.27974355151612 24.189056814949147 34.15895844433225 27.27171316083156 33.687 30.195 C 33.190438850075736 33.27067475875914 32.319358340790366 36.45861560238302 31.189 39.506 C 30.022197191551534 42.65163669347128 28.16471776585436 45.70407363757484 26.737 48.763 C 25.3487895117803 51.737280884197865 24.110125123264254 54.35797419250403 22.732 57.61 C 21.07656045328869 61.51641752172914 18.455182321404926 65.81821938195206 17.579 70.641 C 16.570773079233867 76.19059525349508 16.51715331801013 84.03096679883168 17.897 89.193 C 19.00404802525145 93.33448813504032 21.168093628732795 96.89875302144705 23.678 99.644 C 25.998675214875536 102.1822726203541 32.135 105.365 32.135 105.365"
// 								/>
// 								<defs>
// 									<linearGradient
// 										id="branchesGradient"
// 										gradientTransform="rotate(90)"
// 									>
// 										<stop offset="50%" stopColor="rgba(23, 87, 23, 0.9)" />
// 										<stop offset="90%" stopColor="rgba(15, 130, 15, 0.9)" />
// 									</linearGradient>
// 								</defs>
// 							</motion.svg>
// 							{leavesDisplay.first && (
// 								<StrawCoupleLeaves
// 									id="firstLeaf"
// 									isActive={true}
// 									width="6dvh"
// 									topMeasure="23%"
// 									leftMeasure="5%"
// 									scale="0.7"
// 									rotateZ={"-23deg"}
// 									rotateY={"0deg"}
// 									leafWidth="6dvh"
// 									leafHeight="6dvh"
// 									filter={`brightness(0.7)`}
// 								/>
// 							)}
// 							{leavesDisplay.second && (
// 								<StrawCoupleLeaves
// 									id="secondLeaf"
// 									isActive={true}
// 									width="6dvh"
// 									topMeasure="80%"
// 									leftMeasure="2%"
// 									scale="0.9"
// 									rotateZ={"-60deg"}
// 									rotateY={"0deg"}
// 									leafWidth="6dvh"
// 									leafHeight="6dvh"
// 									filter={`brightness(1.0)`}
// 								/>
// 							)}
// 							{leavesDisplay.third && (
// 								<StrawCoupleLeaves
// 									id="thirdLeaf"
// 									isActive={true}
// 									width="6dvh"
// 									topMeasure="175%"
// 									leftMeasure="8%"
// 									// spostare tutte misure delle foglie nel CSS
// 									scale="1.2"
// 									rotateZ={"-123deg"}
// 									rotateY={"0deg"}
// 									leafWidth="6dvh"
// 									leafHeight="6dvh"
// 									filter={`brightness(1.23)`}
// 								/>
// 							)}
// 						</motion.div>
// 						<ul className={styles["list"]}>
// 							{data.map((elem) => {
// 								return (
// 									<li className={styles["recipe"]} key={elem.id}>
// 										<svg
// 											viewBox="0 0 20 10"
// 											className={styles["recipe-image-container"]}
// 										>
// 											<circle
// 												cx="18%"
// 												cy="50%"
// 												r="60%"
// 												fill="url(#myGradient)"
// 												stroke="url(#myGradient)"
// 											/>
// 											<defs>
// 												<linearGradient id="myGradient">
// 													<stop offset="0%" stopColor="green" />
// 													<stop offset="70%" stopColor="#232323" />
// 												</linearGradient>
// 											</defs>
// 										</svg>
// 										<img className={styles["recipe-image"]} src={elem.image} />

// 										<Link
// 											className={styles["recipe-link"]}
// 											href={`/search/${elem.id}`}
// 										>
// 											<span className={styles["recipe-title"]}>
// 												{elem.title.length > 50
// 													? `${elem.title.slice(0, 51)}...`
// 													: elem.title}
// 											</span>
// 										</Link>
// 									</li>
// 								);
// 							})}
// 						</ul>
// 					</motion.div>
// 				)}
// 			</div>
// 		</section>
// 	);
// }
