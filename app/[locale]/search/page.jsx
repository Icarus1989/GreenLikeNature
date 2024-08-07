import { Suspense } from "react";
import SearchLoading from "./loading";
import TranslationsProvider from "@/app/i18nProvider/TranslationsProvider";
import initTranslations from "@/app/i18n";
import SearchPrimaryComponent from "@/app/[locale]/search/components/SearchPrimary/SearchPrimary";
import {
	deeplTranslate,
	searchByQuery
} from "@/app/serverActions/ServerActions";
import styles from "./page.module.css";

const i18nNamespaces = ["search"];

export default async function SearchPage({ params: { locale } }) {
	const { t, resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<main className={styles["main"]}>
				<Suspense fallback={<SearchLoading />}>
					<SearchPrimaryComponent
						deeplTranslate={deeplTranslate}
						searchByQuery={searchByQuery}
					/>
				</Suspense>
			</main>
		</TranslationsProvider>
	);
}
