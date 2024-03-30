import SettingsPrimary from "@/components/SettingsPrimary/SettingsPrimary";
import styles from "./page.module.css";
import { seasonalData, getSpoonData } from "../ServerComponent";

export default function SettingsPage() {
	return (
		<main className={styles["main"]}>
			<SettingsPrimary getSpoonData={getSpoonData} />
		</main>
	);
}
