import Image from "next/image";
import styles from "./page.module.css";
import List from "./ServerComponent";
import tempData from "../data.json";

export default function Home() {
	// Here
	return (
		<main className={styles.main}>
			<h2>Hello Next.js!!!</h2>
			<List />
		</main>
	);
}
