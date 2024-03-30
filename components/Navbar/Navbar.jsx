"use client";

import { Fragment, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Navbar() {
	const [x, setX] = useState(0);
	const router = useRouter();

	const pathname = usePathname();
	const searchParams = useSearchParams();

	const urlPath = `/${pathname.split("/")[1]}`;

	const homeRef = useRef(null);
	const searchRef = useRef(null);
	const profileRef = useRef(null);

	const svgs = [
		{
			path: "/",
			ref: homeRef,
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
			ref: searchRef,
			d: "M 10.437 17.435 C 15.839 17.435 19.246 11.589 16.545 6.911 C 13.844 2.233 7.092 2.233 4.391 6.911 C 2.838 9.6 3.292 12.743 5.056 14.891 C 6.097 16.158 7.991 17.429 10.438 17.431 M 22.522 23.382 L 14.67 16.517",
			fill: "none",
			baseStroke: "rgba(230, 230, 230, 0.9)",
			activeStroke: "rgba(2, 180, 2, 0.9)",
			strokeWidth: "3px",
			initial: "hidden",
			animate: "visible",
			exit: "exit"
		},
		{
			path: "/profile",
			ref: profileRef,
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

	useEffect(() => {
		const url =
			searchParams.length > 0 ? `${pathname}?${searchParams}` : `${pathname}`;
		console.log("URL --> " + url);
		// salvataggio localStorage o qui

		svgs.map((elem) => {
			if (elem.path === url || url.includes(elem.path)) {
				setX(elem.ref.current.closest("button").getBoundingClientRect().x);
			}
		});
		return () => {
			console.log("Saved on localStorage");
			// salvataggio localStorage qui
		};
	}, [pathname, searchParams]);

	return (
		<nav className={styles["navbar"]}>
			{svgs.map((elem) => {
				return (
					<Fragment key={elem.path}>
						<motion.button
							className={styles["navbar-button"]}
							ref={elem.ref}
							onClick={(event) => {
								router.push(elem.path);
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
					initial={{ opacity: 0.0 }}
					animate={{ x: x, opacity: 1.0 }}
				></motion.div>
			</div>
		</nav>
	);
}

// clean
