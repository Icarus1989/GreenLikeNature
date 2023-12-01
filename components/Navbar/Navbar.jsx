"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
	const [x, setX] = useState(0);
	const router = useRouter();
	const [btnUrl, setBtnUrl] = useState("/");

	const pathname = usePathname();
	// console.log((pathname.split("/")[1]));
	const urlPath = `/${pathname.split("/")[1]}`;

	// function onTap(event) {
	// 	setBtnUrl(
	// 		(prevUrl) => (prevUrl = new URL(event.target.closest("a").href).pathname)
	// 	);
	// 	setX(event.target.closest("button").getBoundingClientRect().x);
	// }

	const svgs = [
		{
			path: "/",
			d: "M12.97 2.59a1.5 1.5 0 0 0-1.94 0l-7.5 6.363A1.5 1.5 0 0 0 3 10.097V19.5A1.5 1.5 0 0 0 4.5 21h4.75a.75.75 0 0 0 .75-.75V14h4v6.25c0 .414.336.75.75.75h4.75a1.5 1.5 0 0 0 1.5-1.5v-9.403a1.5 1.5 0 0 0-.53-1.144l-7.5-6.363Z",
			fill: "none",
			baseStroke: "rgba(230, 230, 230, 0.9)",
			activeStroke: "rgba(2, 180, 2, 0.9)",
			strokeWidth: "2.5px",
			initial: "hidden",
			animate: "visible",
			exit: "exit"
		},
		{
			path: "/search",
			d: "M10.25 2a8.25 8.25 0 0 1 6.34 13.53l5.69 5.69a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-5.69-5.69A8.25 8.25 0 1 1 10.25 2ZM3.5 10.25a6.75 6.75 0 1 0 13.5 0 6.75 6.75 0 0 0-13.5 0Z",
			fill: "none",
			baseStroke: "rgba(230, 230, 230, 0.9)",
			activeStroke: "rgba(2, 180, 2, 0.9)",
			strokeWidth: "2px",
			initial: "hidden",
			animate: "visible",
			exit: "exit"
		},
		{
			path: "/profile",
			d: "M12 2.5a5.25 5.25 0 0 0-2.519 9.857 9.005 9.005 0 0 0-6.477 8.37.75.75 0 0 0 .727.773H20.27a.75.75 0 0 0 .727-.772 9.005 9.005 0 0 0-6.477-8.37A5.25 5.25 0 0 0 12 2.5Z",
			fill: "none",
			baseStroke: "rgba(230, 230, 230, 0.9)",
			activeStroke: "rgba(2, 180, 2, 0.9)",
			strokeWidth: "2.5px",
			initial: "hidden",
			animate: "visible",
			exit: "exit"
		}
	];

	const pathVariants = {
		hidden: {
			pathLength: 0,
			opacity: 0.0
		},
		visible: {
			stroke: "rgba(2, 180, 2, 0.9)",
			pathLength: 1.1,
			opacity: 1.0,
			transition: {
				duration: 0.9,
				delay: 0.2
			}
		},
		exit: {
			pathLength: 0,
			opacity: 0.0
		}
	};

	const pathVariantsInverted = {
		hidden: {
			pathLength: 1.1,
			opacity: 1.0
		},
		visible: {
			pathLength: 0,
			opacity: 0.0,
			transition: {
				duration: 0.7
			}
		},
		exit: {
			pathLength: 1.1,
			opacity: 1.0
		}
	};

	return (
		<nav className={styles["navbar"]}>
			{svgs.map((elem) => {
				return (
					<Fragment key={elem.path}>
						<motion.button
							className={styles["navbar-button"]}
							// onClick={(event) => onTap(event)}
							onClick={(event) => {
								// setBtnUrl(
								// 	(prevUrl) =>
								// 		(prevUrl = new URL(event.target.closest("a").href).pathname)
								// );
								setBtnUrl((prevUrl) => (prevUrl = urlPath));
								router.push(elem.path);
								setX(event.target.closest("button").getBoundingClientRect().x);
								// Capire come regolare x con Dynamic Routes
							}}
						>
							<Link href={elem.path}>
								<motion.svg
									className={styles["nav-icon"]}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="24"
									height="24"
								>
									{elem.path === urlPath ? (
										<motion.path
											fill={elem.fill}
											stroke={elem.activeStroke}
											strokeWidth={elem.strokeWidth}
											variants={pathVariants}
											initial={elem.initial}
											animate={elem.animate}
											exit={elem.exit}
											d={elem.d}
										></motion.path>
									) : (
										<path
											fill={elem.fill}
											stroke={elem.baseStroke}
											strokeWidth={elem.strokeWidth}
											d={elem.d}
										></path>
									)}
									{elem.path === urlPath ? (
										<motion.path
											fill={elem.fill}
											stroke={elem.baseStroke}
											strokeWidth={elem.strokeWidth}
											variants={pathVariantsInverted}
											initial={elem.initial}
											animate={elem.animate}
											exit={elem.exit}
											d={elem.d}
										></motion.path>
									) : (
										<path
											fill={elem.fill}
											stroke={elem.baseStroke}
											strokeWidth={elem.strokeWidth}
											d={elem.d}
										></path>
									)}
								</motion.svg>
							</Link>
						</motion.button>
					</Fragment>
				);
			})}
			<div className={styles["cursor-container"]}>
				<motion.div
					className={styles["cursor"]}
					animate={{ x: x }}
				></motion.div>
			</div>
		</nav>
	);
}
