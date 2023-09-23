"use client";

import { useState } from "react";
import Link from "next/link";
import { GoHome, GoSearch, GoPerson } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./layout.module.css";
import { usePathname } from "next/navigation";

import Navbar from "@/components/Navbar/Navbar";

// export default function RootLayout({ children }) {
// 	return (
// 		<html lang="en">
// 			<body className={inter.className}>
// 				{children}
// 				{/* <Navbar /> */}
// 			</body>
// 		</html>
// 	);
// }

// const links = [
// 	{ href: "/main", content:  },
// 	{ href: "/search", content: "" },
// 	{ href: "/profile", content: "" }
// ];

export default function DashboardLayout({ children }) {
	// const [x, setX] = useState(0);

	// const path = usePathname();

	// function onTap(event) {
	// 	console.log("event");

	// 	setX(event.target.closest("a").getBoundingClientRect().x);
	// }
	// const cursorVariants = {
	// 	initial: { x: 0 },
	// 	animate: { x: x }
	// };

	// console.log(path);

	return (
		<>
			{children}
			{/* <motion.nav className={styles["navbar"]}>
				<ul>
					<li onClick={() => console.log("click li")}>
						<Link
							onClick={() => console.log("RUn")}
							className={styles["navbar-button"]}
							href="/main"
						>
							{<GoHome className={styles["nav-icon"]} />}
						</Link>
					</li>
					<li onClick={() => console.log("click li")}>
						<Link
							href="/search"
							onClick={(event) => {
								console.log("event");

								return setX(
									event.target.closest("a").getBoundingClientRect().x
								);
							}}
							className={styles["navbar-button"]}
						>
							{<GoSearch className={styles["nav-icon"]} />}
						</Link>
					</li>
					<li onClick={() => console.log("click li")}>
						<Link
							href="/profile"
							onClick={(event) => {
								console.log("event");

								return setX(
									event.target.closest("a").getBoundingClientRect().x
								);
							}}
							className={styles["navbar-button"]}
						>
							{<GoPerson className={styles["nav-icon"]} />}
						</Link>
					</li>
				</ul>

				<AnimatePresence>
					<motion.div className={styles["cursor-container"]}>
						<motion.div
							className={styles["cursor"]}
							initial={{ x: 0 }}
							// variants={cursorVariants}
							animate={{ x: x }}
							// transition={{ ease: "easeOut", duration: 2 }}
						></motion.div>
					</motion.div>
				</AnimatePresence>
			</motion.nav> */}
			<Navbar />
		</>
	);
}
