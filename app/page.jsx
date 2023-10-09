import Image from "next/image";
import styles from "./page.module.css";
import List from "./ServerComponent";
import tempData from "../data.json";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	// Here
	return (
		<main className={styles.main}>
			{/* {children} */}
			<List />
		</main>
	);
}
