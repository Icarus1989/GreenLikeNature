import TranslationsProvider from "../i18nProvider/TranslationsProvider";
import initTranslations from "../i18n";
import MainPrimary from "@/app/[locale]/components/MainPrimary/MainPrimary";
import defaultList from "@/spoonTempData/testingSeasonalList.json";
import styles from "./page.module.css";

import { Inter } from "next/font/google";

import { searchByQuery } from "../serverActions/ServerActions";

const inter = Inter({ subsets: ["latin"] });

const i18nNamespaces = ["main"];

export default async function HomePage({ params: { locale } }) {
	const now = new Date();

	const { t, resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<main className={styles["main-element"]}>
				<MainPrimary
					defaultRecipes={defaultList}
					searchByQuery={searchByQuery}
				/>
			</main>
		</TranslationsProvider>
	);
}
