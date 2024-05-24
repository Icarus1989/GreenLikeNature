import { Suspense } from "react";
import GeneralLoading from "./loading";
import TranslationsProvider from "../i18nProvider/TranslationsProvider";
import initTranslations from "../i18n";
import { searchByQuery } from "@/app/serverActions/ServerActions";
import MainPrimary from "@/app/[locale]/components/MainPrimary/MainPrimary";
import defaultList from "@/app/utils/defaults/defaultList.json";
import styles from "./page.module.css";

const i18nNamespaces = ["main"];

export default async function HomePage({ params: { locale } }) {
	const { t, resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<main
				styles={{ width: "100dvw", height: "100dvh" }}
				className={styles["main-element"]}
			>
				<Suspense fallback={<GeneralLoading />}>
					<MainPrimary
						defaultRecipes={defaultList}
						searchByQuery={searchByQuery}
					/>
				</Suspense>
			</main>
		</TranslationsProvider>
	);
}
