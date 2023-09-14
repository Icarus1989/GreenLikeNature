import Image from "next/image";
import styles from "./page.module.css";
import List from "./ServerComponent";

export default function Home() {
	return (
		<main className={styles.main}>
			<h2>Hello Next.js!</h2>
			<List />
		</main>
	);
}
